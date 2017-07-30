---
title: Deep_Code_Tracing
createdAt: 2017-07-30T01:56-04:00
editedAt: 2017-07-30T02:00-04:00
---

(Draft blog entry)

Let's have some fun with tracing code!

Here is a nice way to get Elasticsearch+Kibana up and running:
<code>
docker run -d -p 9200:9200 -p 5601:5601 nshou/elasticsearch-kibana
</code>

We're going to record our traces as a time-series. We unfortunately have to do a small config first, to ES know that our timestamp is ... a timestamp:
<code>
curl -v -XPUT 'http://elastic:changeme@localhost:9200/trace' -d '
{
  "mappings": {
    "trace": {
      "properties": {
        "timestamp": {
          "type": "date"
        }
      }
    }
  }
}'
</code>

Now we need to write down interesting things during our program execution. In my case, I'm working with a Rails project using RSpec. So I put this code near the top of spec/spec_helper.rb. Once executed, this code will start writing out to 'trace.log' lots and lots of tracing data:
<code>
git_sha = `git rev-parse HEAD`.chomp
trace_seq = 0
trace_log = File.new('trace.log', 'w')
trace_id = SecureRandom.uuid
trace = TracePoint.new(:line) do |tp|
  next unless tp.path.start_with?(Rails.root.to_s)
  event = {
    trace_id: trace_id,
    timestamp: Time.now.utc.round(10).iso8601(6),
    git_sha: git_sha,
    path: tp.path,
    line: tp.lineno,
    class: tp.defined_class.to_s,
    method: tp.method_id,
    seq: (trace_seq += 1)
  }
  if $rspec_example
    event.merge!({
      rspec_location: $rspec_example.location,
      rspec_description: $rspec_example.description,
      rspec_full_description: $rspec_example.full_description,
    })
  end
  trace_log.puts(event.to_json)
end
trace.enable
</code>

I have some stuff in there that is specific to RSpec. Later in the same file I put this config to track the current test being executed:
<code>
config.before :each do
  $rspec_example = example
end
config.after :each do
  $rspec_example = nil
end
</code>

Then I run my tests, which outputs trace.log. Now we load it into our ES. I do this in batches of 10k, and then POST it into ES:
<code>
cat trace.log| jq -c '. | {"index": {"_index": "trace", "_type": "trace"}}, .' | split -l 10000 - load-

for f in load-* ; do cat $f | curl -v -XPOST 'http://elastic:changeme@localhost:9200/_bulk' --data-binary @- ; done
</code>

OK! Now we can finally have some fun!

Given a file, annotate the lines with a list of the tests that touch that line:
<code>
FILEPATH=$1

curl -s -XGET "localhost:9200/trace/_search?q=%2Bpath:$FILEPATH%20%2Bline:%5B1%20TO%20100000%5D&sort=timestamp:desc&size=10000&pretty" | jq -r '.hits.hits[]._source| "\(.line) \(.rspec_location)"' | sort -u -n
</code>

Given a file and a line, list all of the tests that cover that line:
<code>
#!/bin/sh

FILEPATH=$1
LINE=$2

curl -s -XGET "localhost:9200/trace/_search?q=%2Bpath:$FILEPATH%20%2Bline:$LINE&sort=timestamp:desc&size=1000&pretty" | jq -r '.hits.hits[]._source.rspec_location' | sort -u
</code>

Ideas:
* Editor:
  * Add to quickfix all of the tests that get here
  * Highlight on the screen in a heatmap way the code that leads to the current line and the code that leads away from the current line
  * Highlight untested lines
  * Given a test, highlight lines that get executed
  * Follow a trace within the editor, stepping forward/back/in/out. Choose your own adventure for where to step next
* Given a test, generate a new copy of the codebase with only enough code to pass that one test
* Visualize (graphviz) some interesting control flows
  * Make an interactive (svg+web) trace
  * Highlight past vs future in different colors
* Record state in the trace -- local variable contents



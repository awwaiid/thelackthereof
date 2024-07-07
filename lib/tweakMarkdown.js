import('log-timestamp');

function tweakMarkdown(file) {
  if (!file._id.endsWith('.md')) return;
  console.log("TweakMarkdown! Processing: " + file._id);

  // First slice out the header
  console.log("  Extracting content");
  let content = file.body;
  // let [body, header, metadata, content] =
  //   file.body.match(/^(---\n(.*)\n---\n\n)(.*)/ms);

  // Audio tags
  console.log("  Replacing audio tags");
  content = content.replace(/audio:(\S+)/gm, '<audio controls preload="metadata" src="/$1.mp3"></audio> (<a download="$1.mp3" external href="/$1.mp3">download</a>)');
  // content = content.replace(/audio:(\S+)/gm, '<Waveform src="/$1.mp3"></Waveform>(<a download="$1.mp3" external href="/$1.mp3">download</a>)');

  // Oddmuse style external links
  console.log("  Fixing oddmuse links");
  content = content.replace(
    /\[?\[(http[^ |]+)[ |]([^\]]+)\]\]?/gm,
    '[$2]($1)'
  );

  // Oddmuse style wiki links
  content = content.replace(
    /\[\[([^\]]*)\]\]?/gm,
    (match, p1) => {
      const url = p1.replace(/ - /g, '-').replace(/ /g, '-').toLowerCase();
      return `[${p1}](/${url})`;
    }
  );

  // Oddmuse style headers
  console.log("  Fixing oddmuse headers");
  content = content.replace(/^= (.*) =$/gm, '# $1');
  content = content.replace(/^== (.*) ==$/gm, '## $1');
  content = content.replace(/^=== (.*) ===$/gm, '### $1');
  content = content.replace(/^==== (.*) ====$/gm, '#### $1');
  content = content.replace(/^===== (.*) =====$/gm, '##### $1');

  // Oddmuse style lists
  console.log("  Fixing oddmuse lists");
  content = content.replace(/^\*\* (.*)$/gm, '  * $1');
  content = content.replace(/^\*\*\* (.*)$/gm, '    * $1');
  content = content.replace(/^\*\*\*\* (.*)$/gm, '      * $1');
  content = content.replace(/^\*\*\*\*\* (.*)$/gm, '        * $1');

  // Dictionary looking thing
  console.log("  Fixing oddmuse dictionaries");
  content = content.replace(
    /^;(.+?): (.*)$/gm,
    (match, p1, p2) => "**" + p1.trim() + ":** " + p2.trim() + "\n"
  );

  // Images
  console.log("  Fixing oddmuse images");
  content = content.replace(/\bimg:([^:\s]+)(:(\S+))?/gm, '<img src="/img/$1" $3 />');
  content = content.replace(/\bleft:([^:\s]+)(:(\S+))?/gm, '<img src="/img/$1" align="left" $3 />');
  content = content.replace(/\bright:([^:\s]+)(:(\S+))?/gm, '<img src="/img/$1" align="right" $3 />');

  // Youtube embeds
  console.log("  Fixing oddmuse youtube embeds");
  content = content.replace(/\byoutube:(\S+)/gm, '<iframe width="560" height="315" src="https://www.youtube.com/embed/$1" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>');

  // Single newline is a hard-break
  // console.log("  Fixing hard breaks");
  // content = content.replace(/([^|\n])\n(\S)/gm, "$1<br />\n$2");

  // Slice the header and content back together
  console.log("  Slicing back together");
  // file.body = header + content;
  file.body = content;

  // console.log("Modified file", file);

  // if(file._id.match(/Music.md/)) {
  //   console.log(file.body);
  // }
}

export default tweakMarkdown;

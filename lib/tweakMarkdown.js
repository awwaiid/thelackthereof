
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
      const url = p1.replace(/ /g, '-').toLowerCase();
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

  // Dictionary looking thing
  console.log("  Fixing oddmuse dictionaries");
  content = content.replace(
    /^;([^:]+):/gm,
    (match, p1) => '**' + p1.trim() + ':**'
  );

  // Images
  console.log("  Fixing oddmuse images");
  content = content.replace(/\bimg:([^:\s]+)(:(\S+))?/gm, '<img src="/content/$1" $3 />');
  content = content.replace(/\bleft:([^:\s]+)(:(\S+))?/gm, '<img src="/content/$1" align="left" $3 />');
  content = content.replace(/\bright:([^:\s]+)(:(\S+))?/gm, '<img src="/content/$1" align="right" $3 />');

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

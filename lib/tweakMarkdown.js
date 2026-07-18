const DEBUG = !!process.env.DEBUG_MARKDOWN;

if (DEBUG) {
  import('log-timestamp');
}

const log = DEBUG ? (...args) => console.log(...args) : () => {};

function tweakMarkdown(ctx) {
  const { file } = ctx;

  if (!file.id || file.extension !== '.md') return;
  log('TweakMarkdown! Processing: ' + file.id);

  log('  Extracting content');
  let content = file.body;

  // Audio tags
  log('  Replacing audio tags');
  content = content.replace(/audio:(\S+)/gm, '<audio controls preload="metadata" src="/$1.mp3"></audio> (<a download="$1.mp3" external href="/$1.mp3">download</a>)');

  // Oddmuse style external links
  log('  Fixing oddmuse links');
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
  log('  Fixing oddmuse headers');
  content = content.replace(/^= (.*) =$/gm, '# $1');
  content = content.replace(/^== (.*) ==$/gm, '## $1');
  content = content.replace(/^=== (.*) ===$/gm, '### $1');
  content = content.replace(/^==== (.*) ====$/gm, '#### $1');
  content = content.replace(/^===== (.*) =====$/gm, '##### $1');

  // Oddmuse style lists
  log('  Fixing oddmuse lists');
  content = content.replace(/^\*\* (.*)$/gm, '  * $1');
  content = content.replace(/^\*\*\* (.*)$/gm, '    * $1');
  content = content.replace(/^\*\*\*\* (.*)$/gm, '      * $1');
  content = content.replace(/^\*\*\*\*\* (.*)$/gm, '        * $1');

  // Dictionary looking thing
  log('  Fixing oddmuse dictionaries');
  content = content.replace(
    /^;(.+?): (.*)$/gm,
    (match, p1, p2) => '**' + p1.trim() + ':** ' + p2.trim() + '\n'
  );

  // Images
  log('  Fixing oddmuse images');
  content = content.replace(/\bimg:([^:\s]+)(:(\S+))?/gm, '<img src="/img/$1" $3 />');
  content = content.replace(/\bleft:([^:\s]+)(:(\S+))?/gm, '<img src="/img/$1" align="left" $3 />');
  content = content.replace(/\bright:([^:\s]+)(:(\S+))?/gm, '<img src="/img/$1" align="right" $3 />');

  // Youtube embeds
  log('  Fixing oddmuse youtube embeds');
  content = content.replace(/\byoutube:(\S+)/gm, '<iframe width="560" height="315" src="https://www.youtube.com/embed/$1" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>');

  log('  Slicing back together');
  file.body = content;
}

export default tweakMarkdown;


function tweakMarkdown(file) {
  if (file.extension !== '.md') return

  // Audio tags
  file.data = file.data.replace(/audio:(\S+)/g, '<audio controls src="/$1.mp3" />');

  // Oddmuse style links
  file.data = file.data.replace(
    /\[?\[(http[^ |]+)[ |]([^\]]+)\]\]?/g,
    '[$2]($1)'
  );


  if(file.path.match(/Music.md/)) {
    console.log(file.data);
  }
}

export default tweakMarkdown;

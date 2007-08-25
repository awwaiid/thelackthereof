---
title: TLT_WIKI_CSS
createdAt: 2007-08-25T02:30-04:00
editedAt: 2007-08-25T02:38-04:00
---

/* CSS for thelackthereof.org wiki */

/* Default theme */

hr {
  border-top: 1px solid white;
  height: 0px;
}

.footer {
  clear: both;
}

.content hr {
  clear: none;
}

.gotobar {
  display: none;
}

body {
  background-color: #000000;
  color: #f8f8f8;
  margin: 0 0 5px 0;
  font-family: arial, sans-serif;
}

#shadow-holder {
  font-size: 3em;
  letter-spacing: 10px;
  padding-bottom: 0;
  padding-top: 30px;
  border-bottom: 1px solid #888;
  margin-left: 0px;
  margin-right: 0px;
  height: 60px;
  font-face: courier, courier new, monospace;
  background-color: #323245;
  color: white;
  background: url('/pics/headerbg3.png') repeat-x;
  position: relative;
  font-weight: bold;
}

#shadow-holder a {
  color: #000000;
}

.tlt-title-shadow {
  position: absolute;
  top: 19px;
  left: 79px;
  color: #444;
}

.tlt-title {
  position: absolute;
  top: 20px;
  left: 80px;
}

div.header, div.content, div.footer {
  margin-left: 5px;
  margin-right: 5px;
}
 
div.userheader {
  margin-bottom: 5px;
}

img.line {
  background-color: #fff;
  height: 2px;
  width: 100%;
}

img.logo {
  border-style:none;
  float: right;
  position: absolute;
  right: 0;
  top: 10px;
}

img.graph {
  float: left;
  margin: 0.5em;
  border: 1px solid #888;
}

.journal .comment {
  text-align: right;
  font-size: small;
}

code {
  border: 1px solid #888;
  background-color: #333340;
  white-space: pre;
  display: block;
  margin: 0.5em 2em 0.5em 2em;
  padding: 0.5em 1em 0.5em 1em;
  text-align: left;
  overflow: auto;
  -moz-border-radius-topleft: 5px;
  -moz-border-radius-topright: 5px;
  -moz-border-radius-bottomright: 5px;
  -moz-border-radius-bottomleft: 5px;
}

pre {
  text-align: left;
}

div.content pre {
  line-height: 1.1em;
}

h1 {
  border-bottom: 1px solid white;
  margin-right: 8em;
}

h2, h3 {
  margin-bottom: 0.2em;
}

div.sectionlink {
  float: right;
}

div.cal {
  font-size: 11px;
}

div.cal a.wanted {
  color: white;
}

div.cal a.exists {
  background-color: #222;
}

div.cal a.today {
  color: #ffaaaa;
}

form {
  margin-bottom: 0px;
}

div.journal h1 {
  margin: 0px;
  margin-bottom: 0.5em;
  margin-top: 1em;
  padding-top: 1em;
  padding-left: 0px;
  border-color: #747477;
  border-style: solid;
  border-width: 0px 0px 1px 0px;
  font-size: small;

}

div.journal h1 a {
  color: #fff;
}

div.journal hr {
  margin-top: 1em;
  margin-bottom: 0px;
  display: none;
}

td {
  border: 1px solid white;
}

table.user {
  border-spacing: 0px;
}

table.user td, table.user th {
  padding: 2px;
}

a:link    { color : #aaaaff; text-decoration : none; }
a:visited { color : #aaaaff; text-decoration : none; }
a:active  { color : #ff0000; text-decoration : none; }
a:hover   { color : #88ff88; text-decoration : none; }

/* nor this */
span.bar a {
        margin:0;
        padding:0 1ex 0 1ex;
        border-left:1px solid white;
    }
    span.bar a:first-child, span.bar br + a {
        padding-left:0;
        border-left:none;
    }

.journal h1 { size: large; }

ul { margin-top: 0; }

div.content, div.rc {
  margin-left: 5em;
  margin-right: 19em;
  text-align: justify;
  line-height: 1.4em;
}

li {
  text-align: left;
}

img.imgleft {
  margin-right: 0.5em;
}

img.imgright {
  margin-left: 0.5em;
}

div.rss strong {
  font-weight: normal;
}

div.sidebar {
  float: right;
  border-left: 1px solid white;
  width: 13em;
  padding-left: 5px;
  position: relative;
  top: -4em;
}

div.sidebar h3 {
  margin-top: 0px;
  margin-bottom: 0px;
  border-bottom: 1px solid white;
  margin-right: 10px;
}

div.sidebar h3 a.outside:before { content:""; }
div.sidebar h3 a.outside:after { content:""; }
div.sidebar h3 a { color: white; }

div.sidebar ul {
  margin-left: 1em;
  padding-left: 0px;
}

div.sidebar li {
  text-indent: -1em;
  list-style: none;
  font-size: 14px;
}

div.sidebar div.SimpleRc ul,
div.sidebar div.SimpleRc p {
  margin-top: 0px;
  margin-bottom: 0px;
}

div.sidebar div.SimpleRc strong {
  font-weight: normal;
  font-size: 14px;
  margin-left: 1em;
  display: none;
}

body.print div.sidebar {
  display: none;
}

body.print div.content {
  margin-left: 20px;
  margin-right: 20px;
  text-align: justify;
}

p {
  margin-top: 0px;
  margin-bottom: 1em;
}

h2 + br, h3 + br {
  display: none;
}

h2 {
  text-align: left;
}

.footer p {
  display: inline;
}

.taglist {
  font-size: 80%;
  font-weight: bold;
  margin-bottom: 1em;
  font-style: italic;
}

.journal .date {
  float: right;
}



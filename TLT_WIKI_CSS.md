---
title: TLT_WIKI_CSS
createdAt: 2006-02-24T19:31-05:00
editedAt: 2006-02-24T19:33-05:00
---

/* CSS for thelackthereof.org wiki */

/* Default theme */

hr {
  clear: both;
  border-top: 1px solid white;
  height: 0px;
}

.content hr {
  clear: none;
}

body {
  background-color: #000000;
  color: #f8f8f8;
  margin: 0 0 5px 0;
  font-family: arial, sans-serif;
}

a.tlt-title, a.tlt-title:visited {
  font-size: 1.6em;
  letter-spacing: 10px;
  padding-bottom: 0;
  padding-top: 30px;
  border-bottom: 1px solid #888;
  margin-left: 0px;
  margin-right: 0px;
  text-align: center;
  display: block;
  height: 60px;
  font-face: courier, courier new, monospace;
  background-color: #444;
  color: white;
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
  background-color: #111;
  white-space: pre;
  display: block;
  margin-top: 0.5em;
  margin-left: 2em;
  margin-right: 2em;
  padding-left: 1em;
  padding-right: 1em;
  padding-bottom: 1em;
  text-align: left;
}

pre {
  text-align: left;
}

h1 {
  border-bottom: 1px solid white;
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
  margin-top: 2px;
  padding-left: 5px;
  border: 1px solid white;
  background-color: #117;
  font-size: small;
}

div.journal h1 a {
  color: #fff;
}

div.journal hr {
  margin-top: 1em;
  margin-bottom: 0px;
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

div.content {
  margin-left: 20px;
  margin-right: 180px;
  text-align: justify;
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
  width: 155px;
  padding-left: 5px;
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
  line-spacing: 0px;
  list-style: square;
  font-size: 14px;
}

div.sidebar div.SimpleRc ul,
div.sidebar div.SimpleRc p {
  margin-top: 0px;
  margin-bottom: 0px;
}

div.sidebar div.SimpleRc strong {
  font-weight: normal;
  font-size: small;
  margin-left: 1em;
  display: none;
}

/* White Theme - all things must be in the body.white space */

body.white {
  background-color: #ffffff;
  color: #000000;
  margin: 5px 0px 5px 0px;
  font-family: arial, sans-serif;
}

body.white a.tlt-title {
  border-top: 1px solid black;
  border-bottom: 1px solid black;
}

body.white img.line {
  background-color: #000000;
  height: 2px;
  width: 100%;
}

body.white a:link {
  color : #3d3dab;
  text-decoration : none;
  font-weight: bold;
}

body.white a:visited {
  color : #3d3dab;
  text-decoration : none;
  font-weight: bold;
}

body.white h1 {
  border-bottom: 1px solid black;
}

body.white div.sidebar {
  border-left: 1px solid black;
}

body.white div.sidebar h3 {
  border-bottom: 1px solid black;
}

body.white div.sidebar h3 a { color: black; }

body.white img.logo {
  border: 1px solid black;
  background-color: #aaf;
  margin: 0.5em;
}

body.white img.equation {
  border: 1px solid black;
  background-color: #aaf;
  padding: 0.1em;
}

body.white code {
  border: 1px solid black;
  background-color: #bfbfc0;
}

body.white div.journal h1 {
  margin: 0px;
  margin-bottom: 0.5em;
  margin-top: 2px;
  padding-left: 5px;
  border: 1px solid black;
  background-color: #aaf;
  font-size: small;
}

body.white div.journal h1 a {
  color: #000;
}

body.white hr {
  border-top: 1px solid black;
}

body.white div.cal a.wanted {
  color: black;
}

body.white div.cal a.exists {
  background-color: #eee;
}

body.white div.cal a.today {
  color: #f00;
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

.content {
  line-height: 1.4em;
}



.footer p {
  display: inline;
}


.journalBody {
  -moz-column-count: 2;
  -moz-column-gap: 1em;
}


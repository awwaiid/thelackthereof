---
title: TLT_WIKI_CSS
createdAt: 2020-04-29T00:54-04:00
editedAt: 2020-04-29T00:54-04:00
---

/*
 * Globals
 */

body {
  font-family: 'Roboto', sans-serif !important;
  color: #555;
}

h1, .h1,
h2, .h2,
h3, .h3,
h4, .h4,
h5, .h5,
h6, .h6 {
  margin-top: 0;
  font-family: 'Roboto', sans-serif !important;
  font-weight: normal;
  color: #333;
}

.content p {
  margin: 0px 0px 1em;
}

/*
 * Override Bootstrap's default container.
 */

@media (min-width: 1200px) {
  .container {
    width: 970px;
  }
}


/*
 * Masthead for nav
 */

.blog-masthead {
  background-color: #428bca;
  -webkit-box-shadow: inset 0 -2px 5px rgba(0,0,0,.1);
          box-shadow: inset 0 -2px 5px rgba(0,0,0,.1);
}

/* Nav links */
.blog-nav-item {
  position: relative;
  display: inline-block;
  padding: 10px;
  font-weight: 500;
  color: #cdddeb;
}
.blog-nav-item:hover,
.blog-nav-item:focus {
  color: #fff;
  text-decoration: none;
}

/* Active state gets a caret at the bottom */
.blog-nav .active {
  color: #fff;
}
.blog-nav .active:after {
  position: absolute;
  bottom: 0;
  left: 50%;
  width: 0;
  height: 0;
  margin-left: -5px;
  vertical-align: middle;
  content: " ";
  border-right: 5px solid transparent;
  border-bottom: 5px solid;
  border-left: 5px solid transparent;
}


/*
 * Blog name and description
 */

.blog-header {
  padding-top: 20px;
  padding-bottom: 20px;
  background-color: #444;
  border-bottom: 1px solid #888;
}
.blog-header .container {
display: flex;
flex-direction: row;
align-items: center;
justify-content: space-between;
}

.blog-header .container:before,
.blog-header .container:after {
  content: none;
}

.title {
display: flex;
flex-direction: column;
justify-content: center;
align-items: flex-start;
height: 100px;
margin-left: 2em;
}

.title h1 {
  margin: 0;
  font-size: 80px;
  font-weight: bold;
}
.title a, .title a:hover, .title a:active, .title a:visited {
  color: #000;
  text-shadow: 0px 1px 0px rgba(255, 255, 255, 0.2);
  text-decoration: none;
}
.title h2 {
  font-size: 20px;
  color: #ccc;
  margin: 0;
  margin-left: 1em;
}

.blog-logo {
  margin-right: 1em;
}

/*
 * Main column and sidebar layout
 */

.blog-main {
  font-size: 18px;
  line-height: 1.5;
}

/* Sidebar modules for boxing content */
.sidebar-module {
  padding: 15px;
  margin: 0 -15px 15px;
}
.sidebar-module-inset {
  padding: 15px;
  background-color: #f5f5f5;
  border-radius: 4px;
}
.sidebar-module-inset p:last-child,
.sidebar-module-inset ul:last-child,
.sidebar-module-inset ol:last-child {
  margin-bottom: 0;
}



/* Pagination */
.pager {
  margin-bottom: 60px;
  text-align: left;
}
.pager > li > a {
  width: 140px;
  padding: 10px 20px;
  text-align: center;
  border-radius: 30px;
}


/*
 * Blog posts
 */

.blog-post {
  margin-bottom: 60px;
}
.blog-post-title {
  margin-bottom: 5px;
  font-size: 40px;
}
.blog-post-meta {
  margin-bottom: 20px;
  color: #999;
}


/*
 * Footer
 */

.blog-footer {
  padding: 40px 0;
  color: #999;
  text-align: center;
  background-color: #f9f9f9;
  border-top: 1px solid #e5e5e5;
}
.blog-footer p:last-child {
  margin-bottom: 0;
}


/* hljs */
.content .hljs {
  background-color: #111111;
}
.content pre {
  color: #fff;
}

/* Fine-tune RSS in sidebar */
.blog-sidebar .rss .time,
.blog-sidebar .rss .description img,
.blog-sidebar .rss .description code,
.blog-sidebar .rss .description .title,
.blog-sidebar .rss .description span,
.blog-sidebar .rss .description .more,
.blog-sidebar .rss .description .tweet-text
{
  display: none;
}

.blog-sidebar .rss .description blockquote {
  border: 0;
  margin: 0;
  padding: 0;
  font-size: small;
}

.journal .page {
  border-bottom: 1px solid #888;
}

.journal .date, .date {
  display: block;
  font-size: 20px;
}

.journal .page .comment { display: none; }

/*
.logo {
  vertical-align: text-top;
}
*/

@media (max-width: 1081px) {
    .container {
      padding:0;
      margin:0;
    }

    body {
      padding:0;
    }

    .navbar-fixed-top, .navbar-fixed-bottom, .navbar-static-top {
      margin-left: 0;
      margin-right: 0;
      margin-bottom:0;
    }
  .title h1 {
  font-size: 60px;
}
}

.hljs {
  font-size: 1.2vw;
}

@media (max-width: 768px) {
  .hljs {
    font-size: 2vw;
  }
.title {
  margin-left: 75px;
}

  .title h1 {
  font-size: 40px;
}
  .title h2 {
    font-size: 15px;
  }
}

.imgleft {
  float: left;
  margin: 0.5em 0.5em 0.5em 0;
}

.imgright {
  float: right;
  margin: 0.5em 0 0.5em 0.5em;
}



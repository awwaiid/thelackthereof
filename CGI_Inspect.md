---
title: CGI_Inspect
createdAt: 2009-06-26T17:54-04:00
editedAt: 2011-01-19T22:14-05:00
---

CGI::Inspect info goes here.

This, along with Continuity::Monitor::CGI, allows you to inspect a running web application.

== Code ==
The easiest way is to get it from CPAN. But if you want something a little more raw:

  # Real Darcs Repo
  darcs get http://thelackthereof.org/projects/perl/CGI-Inspect

  # Github mirror
  git clone git://github.com/awwaiid/cgi-inspect.git

== YAPC::NA 2009 Presentation ==
You can get the slides at http://thelackthereof.org/projects/perl/yapc-2009/cgi-inspect/

Abstract:

<blockquote>
One of the tried and true ways of debugging is to sprinkle 'print "Here! $val\n"' around and see what happens or if the program even reaches that point. Simple and effective! Carp::REPL lets you take this a step further by starting an interactive Read-Eval-Print Loop (REPL) at an arbitrary point in your program.

<blockquote>
I've taken this technique and mixed in a splash of Continuity to build an interactive web-based REPL and inspector for your application. The REPL lets you execute arbitrary code, the inspector gives you a GUI for traversing your callstack and manipulating your variables. It works on regular applications and CGI scripts too. You just add a single "inspect()" where you like and you'll be whackin' those bugs DOWN!

<blockquote>
In this talk I'll show you how to use the tool and how it's built... and how you can add to it with plugins.

== PPW 2008 Presentation ==
I presented the earlier incarnation of this module, ontinuity::Monitor::CGI, at PPW 2008 to about 30 people. If you missed it you can get the [[PPW 2008 Continuity-Monitor Slides]]. Here is the abstract:

<blockquote>
One of the tried and true ways of debugging is to sprinkle 'print "Here! $val\n"' around and see what happens or if the program even reaches that point. Simple and effective! Carp::REPL lets you take this a step further by starting an interactive read-eval-print loop (REPL) at an arbitrary point in your program.

<blockquote>
I've taken this technique and mixed in a splash of Continuity to build an interactive web-based REPL and inspector for your application. It works on CGI scripts too (baring some fixable browser timeouts :) ). If you're nice to it, it might even let you edit your source file, reload it, and continue execution. You just add a single "inspect()" where you like and you'll be whackin' those bugs DOWN!

<blockquote>
In this talk I'll show you how to use the tool and how it's built... and how you can add to it. And by then it'll be on CPAN :) 


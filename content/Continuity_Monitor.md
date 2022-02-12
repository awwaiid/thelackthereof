---
title: Continuity_Monitor
createdAt: 2008-10-14T11:04-04:00
editedAt: 2008-10-14T11:06-04:00
---

This, along with Continuity::Monitor::CGI, allows you to inspect a running web application.

== Development Code ==

Get the code: darcs get http://thelackthereof.org/projects/perl/Continuity-Monitor

== PPW 2008 Presentation ==
I presented this module at PPW 2008 to about 30 people. If you missed it you can get the [[PPW 2008 Continuity-Monitor Slides]]. Here is the abstract:

<blockquote>
One of the tried and true ways of debugging is to sprinkle 'print "Here! $val\n"' around and see what happens or if the program even reaches that point. Simple and effective! Carp::REPL lets you take this a step further by starting an interactive read-eval-print loop (REPL) at an arbitrary point in your program.

<blockquote>
I've taken this technique and mixed in a splash of Continuity to build an interactive web-based REPL and inspector for your application. It works on CGI scripts too (baring some fixable browser timeouts :) ). If you're nice to it, it might even let you edit your source file, reload it, and continue execution. You just add a single "inspect()" where you like and you'll be whackin' those bugs DOWN!

<blockquote>
In this talk I'll show you how to use the tool and how it's built... and how you can add to it. And by then it'll be on CPAN :) 


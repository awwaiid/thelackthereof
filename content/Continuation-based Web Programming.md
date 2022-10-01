---
title: Continuation-based_Web_Programming
tags: []
createdAt: 2004-07-20T17:16-04:00
updatedAt: 2004-07-20T17:16-04:00
---

== Web Programming is Dead! ==
Web programming sucks. For those of you who have not done any, lemme tell you... no fun. For those of you who have you may not realize the pain you're putting yourself through. Imagine that you are writing a GUI application... only every time someone pushes a button the whole program must exit and be re-started. On exit you have to save your current state somewhere, and on re-entry you have to reload the state again. It is only then that you get to find out _which_ button someone pressed, and what else changed on the display at that moment (in text boxes and such). It gets worse. The user of your application can also request that you go back in time to a previous state. This is web-programming.

Programmers make up for this by automating away most of their lives... they have magical ways to make a variable exist from one invocation of the program to another. They create state machines (aka workflows) which help them manage where in the overall application they are and where they want to go.

== Long Live Web Programming! ==
High level programming languages are meant to move beyond such limitations, however. We don't think of a TCP connection as a series of packets... and similarly there is no reason should we think of a http connection as a series of pages/transactions. The difficulty in CGI programs is that they are exited and restarted with every transfer of information. So what we need is a way of getting the program back into the exact same spot it was in before it exited, plus the new input. The most elegant way to do attain this is through a programming system which somehow supports [[Continuations]]. The language itself might support continuations, which makes the whole thing much easier.

In a continuation-like system the programming style is a bit different. Here is an example... we will display a page asking for a number, then a second page asking for another number, and finally a third page displaying their total (perlish-pseudo-code).

```
sub addTwo {
  $num1 = getNum("Enter the first number");
  $num2 = getNum("Enter the second number");
  print "The total is " . $num1 + $num2;
}
```

The flow of this program is obvious. The strange bit is that the calls to getNum actually halt the entire program, waiting for a response. Once a response is attained the program picks up where it left off, processing the result and returning the given number.

== Also See ==
* http://bitsko.slc.ut.us/blog/prevalent-continuations.html
* http://www.cincomsmalltalk.com/userblogs/avi/blogView - HREF Considered Harmful, a log discussing this (mostly Seaside)
* http://www.beta4.com/seaside2/ - Seaside, a smalltalk continuation-based web programming thingie
* http://www.perl.org.il/pipermail/perl/2004-March/004562.html
* cpan:Coro::Cont
* http://lib1.store.vip.sc5.yahoo.com/lib/paulgraham/bbnexcerpts.txt
* http://www.braino.org/blog/archives/000738.php
* http://library.readscheme.org/page6.html
* http://www.manageability.org/blog/stuff/web-based-continuations/view
* http://www.sidhe.org/~dan/blog/archives/000156.html
* http://www.webweavertech.com/ovidiu/weblog/archives/000042.html
* http://www.ds9a.nl/webcoding.html - A discussion on the same topic, but they are calling it "Synchronous Web Programming"
* http://csoki.ki.iif.hu/~vitezg/impostor/ - An implementation of "Synchronous Web Programming"


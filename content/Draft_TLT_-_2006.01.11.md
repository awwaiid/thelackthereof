---
title: Draft_TLT_-_2006.01.11
tags: []
createdAt: 2006-01-11T09:44-05:00
updatedAt: 2006-01-11T19:06-05:00
---

<blockquote><i>A brief description of my journey (so far) through continuation-land in Perl. I talk about wanting continuations, faking them, using real ones, desparing at their non-first-class nature, and finally how I am coming out of my depression to create work-arounds.</i></blockquote>

I love [[Continuation-based Web Programming]].

For the un-initiated let me give you the quick of it. A standard (CGI-style) web application is restarted for ever single request that the user makes. Users of the app don't realize this, all they see is page 1 followed by page 2 and so on. But behind the scenes, each click the user makes that goes to the application must contain not only the click, but enough context so that the app knows that this user is on step 3. The application must use tricks to manage its own high-level state between user interactions.

This is a bad thing. Or at least annoying. At the end of each state of the application it must explicitly decide what its next state will be. Its like having to having to program with GOTO instead of function calls.

Continuations change all that. While I won't go into the technical details (yet), using continuations switches things around from the programmer's point of view. Its like you suddenly have a new function, display_html_and_wait_for_input().

* Continuations in Perl

I wanted this for Perl. But Perl doesn't have continuations. The closest we have is cpan:Coro, which I was initially reluctant to use. Mostly because I wanted serializeable continuations... continuations which can be turned into a string and stuck into a file, which would enable me to run in a pure CGI environment.

** Fake Continuations

I created [[Contize]], a fake-continuation engine for perl objects. One essential aspect of continuations is the ability to pick up where you left off. So if I exit my continuation on line 127 in the middle of a for-loop, when I resume the continuation I want to be on line 128. So I cheated. I create an object which intercepts each and every method invocation of my application. Then, at any point in time, I can write to disk the steps it took to get where I am. Later I re-run the code, and when I get to a method I've already visited, I just return the cached value instead of running the method. Thus we have serializeable (and hence first-class) continuations! Very inneficiant, and several side-effects.

I've created two applications using this technique, one in Perl and one in PHP. The technique works, and the overhead isn't actually that bad. My applications are very database heavy, and the database itself tends to be the limiting factor when it comes to performance. Still, loading and storing all this data does have an affect, and the longer the application runs the larger the impact.

I've gotten so used to the side-effects of this technique that they no longer bother me. But they are there. One thing is that most of the code must be side-effect free. If I do a database interaction I must put it into its own method so that it gets cached and then not run each time the application is invoked.

** Real Continuations

Finally I began working in earnest on a continuation server using cpan:Coro, which I call [http://continuity.tlt42.org Continuity].

* I love first-class continuations

First-class continuations allow us to copy an existing continuations, and all of the state that it contains. So, for example, we could create a copy at every point in the navigation of our web-app. Then the back button and browser forking is magically fixed! We just restore one of these saved continuations.

* The downfall of first-class continuations in perl

cpan:Coro does not provide real, first-class, continuations. It has a module, cpan:Coro::Cont, which gives "continuations", but these are really just a simplified interface into coroutines. Namely, I can't create a copy of a running continuation, no matter how I try. Has to do with duplicating the C stack.

I got quite depressed.

* Coming out of the depression

Scott tried to cheer me up. He encouraged me to get on with my life -- to work with what I've got and to get some other things done. There is still alot to do on the whole toolkit. Perl6 will have continuations, and maybe they will be first-class. So we just need to be patient.

** Managing the back button

Still, in order to create advanced yet useable applications I need to somehow manage the back button and browser forking. The answer has come in the way of javascript and that whole AJAX craze. See, I can use javascript to detect that I am viewing a cached page, and then do a background request to the server to let it know what is going on. The server can give back some stuff and I can use DHTML to display the result.

** Managing forked browsers

I think I can do similar tricks for forked windows.


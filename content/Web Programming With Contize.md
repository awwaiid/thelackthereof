---
title: Web_Programming_With_Contize
tags: []
createdAt: 2004-10-17T19:01-04:00
updatedAt: 2004-10-17T19:01-04:00
---

[[Contize]] was developed specifically to abstract away some of the difficulties of creating web-based applications. Unfortunately it sigificantly altered what I would call ''intuitive'' web programming. Now various state-maintenance techniques can be replaced with more traditional (and straightforward) programming.

== The Goal ==
Eventually we are going to be writing code in a style that is remenicent of a command-line script. As a very breif example, you might see code like:
```
sub getTwo {
  my $self = shift;
  my $num1 = $self->prompt("Enter first number");
  my $num2 = $self->prompt("Enter second number");
  $self->disp("The sum is $num1 + $num2 = " . ($num1 + $num2));
}
```

From the user's view this would be three web pages. A page asking for the first number, a page asking for the second number, and a page displaying their sum. Notice that we send and receive input and output to the user in a much more direct fasion that in standard CGI script style.

== Additional Tools ==
Alone, [[Contize]] significantly changes the approach to web programming. There are, however, some other existing and important tools which we should continue to use. The idea of [[Model-View-Controller]] is still very applicable, and I will use some of that terminology here. Contize helps us build controllers. For applications which use a database as their back-end, I suggest cpan:Class::DBI or something similar for the Model component. A template system is useful for the View component, and I prefer a subset of the functionality provided by cpan:Embperl. Some of my ideas on this topic are spelled out in [[Thoughts and issues with web-based DB programming]].

== Getting Started ==
Since [[Contize]] works on objects, we need for our application to be an object. What we will do is set up a wrapper script which takes care of some initialization for us and manages an instance of our object. The wrapper needs to:
* Set up the session
* Save/Restore our main application object to the session
* Execute the main entrypoint method of our application object

The first thing you need to be able to do is save and restore an object in your session. I've been using cpan:CGI::Session for this, though it has one quirk I haven't figured out how to get around yet. This isn't a new thing for web programming really... but Contize gives us an extra trick. The object we are putting into the session gets suspended practically in the middle of an operation, and upon rentrence its execution is resumed right where it left off. So really we are storing only _one_ object (the application), and all the other pieces should be instance variables of that object. Do what you want though.

== Going On From Here ==
Well... truth be told I got tired of describing what to do and decided to do what to do. I've packaged up this wrapper script, and will continue to make improvements upon said script, under the name of [[Continuity]]. The above information is still quite appropriate if you are writing your own wrapper to utilize [[Contize]] or similar without [[Continuity]], or perhaps if you are trying to integrate [[Contize]] into a different, yet existing, framework. The information above is not nearly complete, however. So if you want to do one of these things I suggest you look at the very simple internals of [[Continuity]] and/or email me.

== See Also ==
* http://csoki.ki.iif.hu/~vitezg/impostor/ - A similar framework for Python. They use an Apache module though... cheating I'd say :)
* [[Contize]] - The Perl module on which this is based
* [[Continuation-based Web Programming]] - The concept on which this is based


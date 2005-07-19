---
title: Continuity
createdAt: 2005-06-22T18:13-04:00
editedAt: 2005-07-19T18:58-04:00
---

== Continuation-Based Web-Programming Framework for Perl ==
This is a slightly ''different'' approach to web-programming. Here we view a web application a lot more like a command-line driven program. Instead of your program being restarted with each request, we will pretend that your program picks up right where it left off. Here is a small example of a function in this context:


<code>
sub addTwo {
  my ($self) = @_;
  my $a = $self->getNum("Enter first number: ");
  my $b = $self->getNum("Enter second number: ");
  $self->disp("The sum of $a and $b is " . ($a + $b));
}
</code>

Now looking at this code it is very clear what is going on. First we prompt the user for the first number by calling the getNum method. At this point the progam is suspended, waiting for input from the user. The user sees a webpage with the prompt and an input box. Once they submit their answer, the program picks up where it left off, putting the value given into $a. The process is repeated for getting the second number and putting it into $b.

And thats the idea. This uses some Deep Magic called Continuations to make this work. Unfortunately Perl doesn't directly support this programming language concept (yet), so Continuity utilizes the [[Contize]] module to let Perl ''pretend'' that it has this power. In the tutorials we'll see how this will slightly change the way you code your applications.


== Tutorial ==
Some of you don't want to hear so much discussion... you'd rather see code. So I've started a [[Continuity Tutorials]] page so that you can dive right in. Have fun.

== Development ==
Notes / Ideas:
* Use cpan:Pixie to store stuff, or rip their storage code. Should work better than the way I'm doing it now.
* [[ClassDBI-Aware Templates]]

== Comments / Contact ==
For comments there is a link at the bottom of this page, but also feel free to email me questions and thoughts (mailto:awwaiid@thelackthereof.org). This is of course an ongoing project which needs quite a bit of refinement. Your questions, comments, and contributions will give me the feedback I need to make this system useable and clean. If enough people inquire about this project, I'll set up a mailing list.

== Related / Similar Stuff ==
* http://www.beta4.com/seaside2/ - Seaside2, a smalltalk continuation-based web programming thingie
* http://borges.rubyforge.org/ - Seaside2, ported to Ruby. pretty much.
* http://csoki.ki.iif.hu/~vitezg/impostor/ - A similar framework for Python. They use an Apache module though... cheating I'd say :)
* http://rubyforge.org/projects/wee/ - Another Ruby framework... this one doesn't necessarily need continuations, getting by with a nice callback and state serialization system
== See Also ==
* cpan:Continuity - CPAN entry for this project
* [[Contize]]
* [[Web Programming With Contize]]
* [[EPFarms Panel]]
* http://thelackthereof.org/projects/perl/Continuity/ - Current sourcecode
* http://thelackthereof.org/projects/perl/Continuity/eg/animals/ - Animals example (in progress)
* http://thelackthereof.org/dev/guess/ - Guessing Game demo
* http://thelackthereof.org/projects/perl/Continuity/eg/guess/ - Guessing game example source
* http://freshmeat.net/projects/continuityperl/ - Freshmeat entry



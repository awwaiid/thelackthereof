---
title: GOE
createdAt: 2004-05-19T01:06-04:00
editedAt: 2004-05-19T01:06-04:00
---

== Goe Object Environment ==

The goal of this project is to create a smalltalk-like environment using perl as the foundation.

See http://thelackthereof.org/projects/perl/goe/html/ for the website, though at some point this wiki will probably become more accurate. It at least has a pretty logo!

There are all sorts of neat ideas that have come out of this basic concept. Probably the coolest is using the Inline:: family of modules to allow the intermixing of languages on a per-method basis. The code browser and editors and such would all be aware of this and hide just a bit more of the complexity involved. Ultimately when adding a method (or function) to a package you would not just give it a name but give it a language.

(2003.10.19) I have been thinking lately that I haven't actually taken this treat-perl-like-smalltalk idea far enough. Its mostly conceptual I suppose... but little things like Smalltalk's way of having all instance variables private by default and all the methods public. Message-passing instead of method-calling is another one. At some point when trying various smalltalk implementations I saw one with a GUI builder that dumped static code into a method. I don't think it de-parsed the code later... it must have stuck it somewhere though of course.  But then the GUI editor sort of became an extension of the browser... it was just a more advanced interface for editing methods which draw GUI things.


== See Also ==
* http://c2.com/cgi/wiki?CanPerlBeSmalltalk
* http://minnow.cc.gatech.edu/squeak/665



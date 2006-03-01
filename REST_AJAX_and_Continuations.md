---
title: REST_AJAX_and_Continuations
createdAt: 2006-02-28T13:13-05:00
editedAt: 2006-02-28T21:36-05:00
---

Each of the three have aspects I'm interested in, along with giant cans of worms I don't care about for the present discussion.

=== REST - Representational State Transfer ===
http://en.wikipedia.org/wiki/REST
The part I care about: Each request is mostly-stateless (I except authentication). A URL refers to a noun -- a thing (or list of things) you are viewing or manipulating.

=== AJAX - Asynchronous JavaScript And XML ===
The part I care about: Fetch stuff from the server and display the result in the current page without going to another page. Change the minor-state but not the major-state of the page.

=== Continuations ===
The part I care about: Inversion of control... make it so that the server-side is an ongoing processess instead of one that terminates between each request. Effectively stop programming state machines though explicit lists of states and transfers. Instead use the language's built-in control structures.

== How They Work Together ==
Many things on a website are expected to be RESTful. This is how the web works -- we have URLs and when we go to them we see what we see.

So what I want to do then is to say use RESTful URLs. Then if you are in a complex flow, use AJAX and/or continuations.

AJAX can put the control flow on the client side, without an explicit state machine. Continuations do the same thing, except on the server-side. So continuations can do two things here -- first they can take some of the load off of the client, and second they can be a graceful fallback.

----
Some of this was inspired by an [http://ll4.csail.mit.edu/Abstracts.html#Straaten Anton van Straaten talk] at [http://ll4.csail.mit.edu/ LL4].


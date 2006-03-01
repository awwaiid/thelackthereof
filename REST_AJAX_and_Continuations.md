---
title: REST_AJAX_and_Continuations
createdAt: 2006-03-01T14:40-05:00
editedAt: 2006-03-01T14:40-05:00
---

Each of the three have aspects I'm interested in, along with giant cans of worms I don't care about for the present discussion.

=== REST - Representational State Transfer ===

The part I care about: Each request is mostly-stateless (I except authentication). A URL refers to a noun -- a thing (or list of things) you are viewing or manipulating.  

=== AJAX - Asynchronous JavaScript And XML ===

The part I care about: Fetch stuff from the server and display the result in the current page without going to another page. Change the minor-state but not the major-state of the page.

=== Continuations ===

The part I care about: Re-Inversion of control... make it so that the server-side is an ongoing processess instead of one that terminates between each request. Effectively stop programming state machines though explicit lists of states and transfers. Instead use the language's built-in control structures.

== How To Work Together ==

Many things on a website are expected to be RESTful. This is how the web works -- we have URLs and when we go to them we see what we see.

So what I want to do then is to say use RESTful URLs. Then if you are in a complex flow, use AJAX and/or continuations.

AJAX can put the control flow on the client side, without an explicit state machine. Continuations do the same thing, except on the server-side. So continuations can do two things here -- first they can take some of the load off of the client, and second they can be a graceful fallback.

I used to try to make every link on the page secretly be a button. That way when you navigated away from the page the webapp would get the chance to say "wait a second! Are you sure?" if it so desired. But thats a horrible way to do it -- well, if nothing else because its ugly.

Instead we can use some js to look for links and secretly turn them into POSTS during onclick. The js can alter the action attribute of the form to update the URL. If they open-in-new-window the onclick doesn't fire.

== Progressive enhancement. ==

Lets start with the base case -- lynx with no javascript. We have two basic things here. First we have RESTful URLs to things. Second we have POST forms for complex processes. Each page gets a PageID, so we can detect if they are trying to re-post a form (and either deal with it or abort). Generally we POST back to the current URL.

Next lets add in the ability to execute some basic javascript. We'll add onclick events to all the links on the page. When the link is clicked we'll actually POST the form, changing its action to the href from the link. This gives us the ability to intercept navigation requests when we are in the middle of a complex interaction. We can save the current user data and then decide what to do, either giving them the page they request or insisting that they complete or abort the current process.

Finally we add in complex javascript (AJAX). We divide requests into two types, simple and complex. A simple request does a full-page refresh and possibly changes the URL. A complex request does a background fetch and only updates part of the page. You should't be able to link to step-3 in a 5 step wizard, so we don't update the URL for it. Instead you get a url like http://app.com/add/wizard.

----

Some of this was inspired by a [http://ll4.csail.mit.edu/Abstracts.html#Straaten talk] by Anton van Straaten at [http://ll4.csail.mit.edu/ LL4].



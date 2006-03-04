---
title: REST_AJAX_and_Continuations
createdAt: 2006-03-04T03:54-05:00
editedAt: 2006-03-04T04:14-05:00
---

<i>Summary: The three amigos are a perfect match for one another, each making up for the other's weaknesses. REST gives us nice URLs, AJAX (and javascript as a whole) gives us more client-poser, and continuity turns the world inside-out on the server side.</i>

== The three amigos. ==

Each of the three have aspects I'm interested in, along with giant cans of worms I don't care about for the present discussion.

<b><i>REST - Representational State Transfer</i></b>
The part I care about: Each request is mostly-stateless (I except authentication). A URL refers to a noun -- a thing (or list of things) you are viewing or manipulating.  

<b><i>AJAX - Asynchronous JavaScript And XML</i></b>
The part I care about: Fetch stuff from the server and display the result in the current page without going to another page. Change the minor-state but not the major-state of the page.

<b><i>Continuations</i></b>
The part I care about: Re-Inversion of control... make it so that the server-side is an ongoing processess instead of one that terminates between each request. Effectively stop programming state machines though explicit lists of states and transfers. Instead use the language's built-in control structures.

== Desires and goals. ==

I want simple, memorable, URLs which reflect the current state of the application and a linkable jump-point. I'd like for the back button to go back to the most recent linkable spot.

I used to try to make every link on the page secretly be a button. That way when you navigated away from the page the webapp would get the chance to say "wait a second! Are you sure?" if it so desired. But thats a horrible way to do it -- well, if nothing else because its ugly.

But the point is that I want that functionality; if someone is in the middle of a complex process but then navigates to the front-page I want to make sure they get the chance to save their work (or at least that their work is transparently saved).

== Progressive enhancement. ==

Lets start with the base case -- lynx with no javascript. We have two basic things here. First we have RESTful URLs to things. Second we have POST forms for complex processes. Each page gets a PageID, so we can detect if they are trying to re-post a form (and either deal with it or abort). Generally we POST back to the current URL.

Next lets add in the ability to execute some basic javascript. We'll add onclick events to all the links on the page. When the link is clicked we'll actually POST the form, changing its action to the href from the link. This gives us the ability to intercept navigation requests when we are in the middle of a complex interaction. We can save the current user data and then decide what to do, either giving them the page they request or insisting that they complete or abort the current process.

Finally we add in complex javascript (AJAX). We divide requests into two types, simple and complex. A simple request does a full-page refresh and possibly changes the URL. A complex request does a background fetch and only updates part of the page. You should't be able to link to step-3 in a 5 step wizard, so we don't update the URL for it. Instead you get a url like http://app.com/add/wizard.

----

Some of this was inspired by a [http://ll4.csail.mit.edu/Abstracts.html#Straaten talk] by Anton van Straaten at [http://ll4.csail.mit.edu/ LL4].



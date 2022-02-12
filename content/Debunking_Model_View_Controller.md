---
title: Debunking_Model_View_Controller
createdAt: 2005-07-01T20:45-04:00
editedAt: 2005-07-01T20:45-04:00
---

= In a Web-Application Context =

As I have discussed elsewhere (see [[Thoughts and issues with web-based DB programming]]), Model-View-Controller is one way of going about complex GUI internals, even in a web-application context. It has quite a few benefits, mostly organizational, which have drawn people like myself to the mindset. I propose, however, that the MVC method and its variants actually work <i>against</i> the object-oriented nature which it is often touted as exemplifying.

It all comes down to the relationship between the Model and the View. Perhaps the raw MVC model has it correct, but implementations of the framework are not.


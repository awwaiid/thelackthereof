---
title: Web_Application_Techniques
tags: []
createdAt: 2004-11-30T23:06-05:00
updatedAt: 2004-11-30T23:06-05:00
---

These are notes in preparation for a talk I'll be giving to LUNA.

== Client / Server Structure ==
The basic structure of the web is one of clients and servers. A web server sits around waiting for someone to request a document from it. That someone is a client. The basic steps are these:
# Client requests document ("http://www.yahoo.com/")
# Server receives request
# Server looks for document and returns it to the client
# Client displays the document

Turning this into an interactive situation is quite easy, really. All we have to do is modify step 3. Instead of the webserver finding and returning a document, we have the webserver execute a program and we return the result. And voila! We now have a web-based application.

There is a hitch with this simple method of allowing a client to request the result of a computation through a webserver. In a word -- "state".


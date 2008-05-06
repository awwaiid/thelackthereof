---
title: State_Scope
createdAt: 2008-05-06T16:21-04:00
editedAt: 2008-05-06T16:26-04:00
---

The idea here is that you can group the state of an application into levels or "scopes". Variables themselves already have a scope that is used (conceptualized) in structuring programs. When dealing with web apps scope can be complex. Between invocations of a web (CGI) app, even global variables are lost. State is insetad kept outside the app, either in a filesystem or database, or in client-based communication (cookies or query params).

In order to better conceptualize the state of a program in the face of such complexity we introduce the idea of State Scope based on a zoomed-out understanding of the state change flow. We consider scope not in terms of program syntax structure, but rather in any place we can identify continuously existing state through the running (or even between runs) of the app.

Note that this reminds me of delimited continuations, but those are still only within an app's code structure.

State scope is an especially important concept when it comes to understanding and structuring continuations-based web applications. These programs straddle the fence between traditional CGI apps and continuously running desktop (command line) apps, allowing the app architect to shift at will between the two state-management mindsets. The State Scope concept helps structure the relationship between these techniques.

<graph>
digraph {
  graph [truecolor bgcolor="#ff005f00"]
  node [
    style=filled
    fillcolor="#514a9b"
    shape=box
    fontcolor="#ffffff"
    color="#888888"
    fontname="Helvetica"
    fontsize=10]
  edge [ color="#FFFFFF" ]

  "Long Term" -> "App Instance";
  "App Instance" -> "Session";
  "Session" -> "URL";
  "URL" -> "View Port";
  "View Port" -> "View Component";

  "MySQL" -> "Server Instance 1";
  "MySQL" -> "Server Instance 2";
  "Server Instance 1" -> "Session - User 1";
  "Server Instance 1" -> "Session - User 2";
  "Server Instance 1" -> "Session - User 3";
  "Session - User 2" -> "URL /login";
  "Session - User 2" -> "URL /register";
  "Session - User 1" -> "URL /profile";
  "URL /profile" -> "Window 1";
  "URL /profile" -> "Window 2";
  "Window 2" -> "Common Header Widget";
  "Window 2" -> "User Details Widget";
  "User Details Widget" -> "Reset Password Widget";
}
</graph>


---
title: HTTP_Abstraction_Layers
createdAt: 2015-10-07T22:43-04:00
editedAt: 2015-10-07T22:48-04:00
---


These are protocols or apis or libraries that roughly abstract away HTTP serving from your application. Most of them take the form of:

<code>
function(request_environment) {
   # Look at the request environment, build some output
   return [ 200, { "Content-Type": "text/html" }, [ some_output ] ]
 }
 </code>

Which is to say, an "application" is defined as a function that takes in a request and returns a response. The request is typically key-value pairs that should then be further parsed into actual parameters and POST payload. The response is typically an HTTP status, a set of headers, and a body.

Variations are mostly around the body. Instead of a static string, several of these adapters allow a callback or promise of some sort, allowing for chunked or streaming results, and possibly even server-push results.

* Common Lisp - Clack
* Clojure - Ring
* Elixir - Plug
* Haskell - Hack2
* Java - Servlets?
* Javascript - JSGI
* Lua - WSAPI
* .NET - [http://owin.org/ OWIN]
* Perl - PSGI
* Perl6 - P6SGI
* Python - WSGI
* Ruby - Rack
* Scala - SSGI
* Multiple - uWSGI



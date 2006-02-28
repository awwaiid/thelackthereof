---
title: REST_AJAX_and_Continuations
createdAt: 2006-02-28T12:26-05:00
editedAt: 2006-02-28T13:13-05:00
---

Lets get the quick overview of each

=== REST - Representational State Transfer ===
http://en.wikipedia.org/wiki/REST
* Client-Server: a pull-based interaction style: consuming components pull representations.
* Stateless: each request from client to server must contain all the information necessary to understand the request, and cannot take advantage of any stored context on the server.
* Cache: to improve network efficiency responses must be capable of being labeled as cacheable or non-cacheable.
* Uniform interface: all resources are accessed with a generic interface (e.g., HTTP GET, POST, PUT, DELETE).
* Named resources - the system is comprised of resources which are named using a URL.
* Interconnected resource representations - the representations of the resources are interconnected using URLs, thereby enabling a client to progress from one state to another.
* Layered components - intermediaries, such as proxy servers, cache servers, gateways, etc, can be inserted between clients and resources to support performance, security, etc.

er, wikipedia says:

* A stateless client/server protocol: each HTTP message contains all the information necessary to understand the request. As a result, neither the client nor the server needs to remember any communication-state between messages. In practice, however, many HTTP-based applications use cookies and other devices to maintain session state (some of those practices, like URL-rewriting, are not RESTful).
* A set of well-defined operations that apply to all pieces of information (called resources): HTTP itself defines a small set of operations, the most important of which are GET, POST, PUT, and DELETE. People often compare these with the CRUD operations required for data persistence, though POST does not fit cleanly into the comparison.
* A universal syntax for resource-identification: in a RESTful system, every resource is uniquely addressable through the resource's URI.
* The use of hypermedia both for application information and application state-transitions: representations in a REST system are typically HTML or XML files that contain both information and links to other resources; as a result, it is often possible to navigate from one REST resource to many others, simply by following links, without requiring the use of registries or other additional infrastructure.


=== AJAX - Asynchronous JavaScript And XML ===
The part I care about -- fetch stuff from the server and display the result in the current page without going to another page. Change the minor-state but not the major-state of the page.

=== Continuations ===
Inversion of control... make it so that the server-side is an ongoing processess instead of one that terminates between each request. Effectively stop programming state machines though explicit lists of states and transfers and instead use the language's built-in control structures.


---
title: Thoughts_and_issues_with_web-based_DB_programming
tags: []
createdAt: 2004-05-19T12:07-04:00
updatedAt: 2004-05-19T12:07-04:00
---

As a job I have often done web-based database programming. Over the course of time I've been annoyed by various things (like a good little programmer) and have slowly contemplated how to get rid of these annoyances. Most of the issues I have spring from lazyness, which is a [[Good Thing]] of course.

So lets see how I think things ''should'' be...

== Model-View-Controller ==
First of all we should have an [[Model-View-Controller]] (MVC) style layout. This layout, or one of its many variations, has demonstrated its ability to break a program into nice, cleanly separated components. The MVC layout does not at first seem as natural as other layouts when it comes to web-based interfaces, but this reservation mostly arrives through the view portion of the layout, which is not as syncronous as one might like. It is, however, syncronous enough to work for us, and the rest of the model is certainly appropriate.

== The Controller ==
The controller should be two levels -- the top generic level should be a simple state machine, and the second layer the actual states. These states would do the manipulation of the model and the choosing of the view. It is in the second-level controler that the business logic is contained.

== The View ==
The View should be fairly simple -- for CGI stuff a template system is good. The demand of seperating HTML and code is silly, the realy trouble is seperating business logic and code. Of course seperating HTML and code enough that a [[WYSIWYG]] editer can handle the template is a good idea... it is not necessary to go overboard here. A single second-level controler could utilize several views.

== The Model ==
The Model in this case should be an abstract view of the database, and this is the part which I don't think anyone has gotten quite right. My proposal for a model is a more abstract view of the database than what programmers currently receive. There should be a very simple way to query and update complex data. This would center around an intelligent flexible model. It would take a schema to get started, and then would arrange and structure SQL for you to do what you want, without you having to keep telling it how bits of data relate to one another. cpan:Class::DBI is a pretty interesting approach, but does not quite do what I want. Instead of a table-by-table view of the DB we want a true relational view. The thing that most people point to is object mappers, allowing the programmer to stick objects into the database. This, however, is too ''specific'' in that a class must be created or declared or customized on a per-table or per-thing (person, address, etc) basis. I think that a single class of objects is needed, and each of these should be able to describe and manipulate any table or set of tables. See [[SetDB]] for work in this direction.

== See Also ==
* http://www.javaworld.com/javaworld/jw-07-2000/jw-0721-hmvc_p.html
* http://st-www.cs.uiuc.edu/users/smarch/st-docs/mvc.html
* http://www.fourbit.com/resources/fab_mvc_clients.htm



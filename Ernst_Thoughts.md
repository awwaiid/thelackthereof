---
title: Ernst_Thoughts
createdAt: 2008-02-04T18:42-05:00
editedAt: 2008-02-05T00:35-05:00
---

== Merge the Model and View ==
The classic structure is Model-View-Controller. The Model-View separation leads to code duplication, since often the description of the data in the model is similar (or even identical) to the description of the view. For example, an address record might have a Street, City, State, and Zip. When rendered it still has all these things.

== Data Type implies View Type ==
If the datatype is a short string, then we'll probably want a short text input field. If it is a date, we'll probably want a date-selector. If it is long text we'll want a textarea.

== Problem: Multiple Views ==
In MVC it is easy to have multiple views for a single model (or accross model objects). How can this be done if the Model and View are merged?

Here are some ideas:
* Give the Model a sense of it's rendering context.
* Actually have separate view code, but more tightly integrated into the Model than in traditional MVC.


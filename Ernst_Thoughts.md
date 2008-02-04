---
title: Ernst_Thoughts
createdAt: 2008-02-04T18:36-05:00
editedAt: 2008-02-04T18:42-05:00
---

== Merge the Model and View ==
The classic structure is Model-View-Controller. The Model-View separation leads to code duplication, since often the description of the data in the model is similar (or even identical) to the description of the view. For example, an address record might have a Street, City, State, and Zip. When rendered it still has all these things.

== Data Type implies View Type ==
If the datatype is a short string, then we'll probably want a short text input field. If it is a date, we'll probably want a date-selector. If it is long text we'll want a textarea.


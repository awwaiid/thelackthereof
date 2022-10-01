---
title: Ernst_Thoughts
tags: []
createdAt: 2008-02-04T18:36-05:00
updatedAt: 2008-02-05T00:35-05:00
---

== Merge the Model and View ==
The classic structure is Model-View-Controller. The Model-View separation leads to code duplication, since often the description of the data in the model is similar (or even identical) to the description of the view. For example, an address record might have a Street, City, State, and Zip. When rendered it still has all these things.

Beyond just merging the View into the Model, in concept the View can actually be <i>derived</i> from the Model.

== Data Type Implies View Type ==
If the datatype is a short string, then we'll probably want a short text input field. If it is a date, we'll probably want a date-selector. If it is long text we'll want a textarea. At this low level the type in the Model has a nearly one-to-one correspondence with the type in the View.

This abstraction can often continue without intervention at higher levels. Lists, tuples, and unions can be expressed in the View in a straightforward mannor.

== Problem: Multiple Views ==
In MVC it is easy to have multiple views for a single model (or accross model objects). How can this be done if the Model and View are merged?

Here are some ideas:
* Give the Model a sense of it's rendering context.
* Actually have separate view code, but more tightly integrated into the Model than in traditional MVC.

== Code Selectors ==
Rather than having completely different Views (aka "modes") for a Model, instead have a more fine-grained list of attributes that are used for rendering. These attributes might be things like flags for showing or not showing a label, or indicating that the instance should be editable or read-only.

```
# Could set the attribute directly
$person->attr( show_label => 0 )->render_on($div);

# Or declare it using Code Selectors
$style->add_selector(
  '#content .editable' => {
    can_edit => 1,
    show_label => 1,
  }
);
# and then later
$person->render_on($div);
```



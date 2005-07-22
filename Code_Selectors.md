---
title: Code_Selectors
createdAt: 2005-07-22T13:14-04:00
editedAt: 2005-07-22T13:23-04:00
---

Here's an idea:

Working on GUI components, I want each component to worry about its own model/view. So working in the web-app world, I want my Person object to know how to render itself in a variety of contexts. So if I am displaying it in an editor it will get editable widgets, and if I'm displaying it in a viewer it gets just the static text, etc.

Its kinda like I want to 'skin' my object, and display a different theme depending on the context. And that reminds me of CSS. So what I need is some sort of CSS-selector-like-thingie except for code (since we are not only activating how the object looks, but how it reacts too).

CSS-style selectors is one approach, another (more straightforward?) way is to tell the object its context directly. hm.

All CSS selectors are is an order-of-evaluation and precedence of the attributes for tags. Things are described generally and then overridden again and again as it gets more specific. This reminds me of an object hierarchy... but is less tied to actually objects. We are more worried about the context of the <i>display</i> of our objects, not what the objects themselves are derived from.

So lets see. Lets have a $context var that gets passed to these objects when they are rendered. They add to and override things in the context, and themselves automatically get added or something. Then when they render sub-components they pass along the $context as well.

----

I'm working on a timesheet application. Each timesheet has rows (for each project worked on during the timesheet's time period), each row has cells, one for each day of the time period, containing the number of hours they worked on that day on that project. Additionally, in some contexts the rows are grouped by the type of project.

  /* By default, we show a non-editable version of the row */
  row {
    header: show;
    cells: hide;
    desc: show;
    editable: no;
  }

  /* When displayed in the context of a timesheet view */
  #view timesheet row {
    header: hide;
    cells: show;
    editable: yes;
  }



---
title: Code_Selectors
createdAt: 2005-07-25T14:53-04:00
editedAt: 2005-08-02T20:05-04:00
---

This is a technique to provide bits of your program with context-based implicit static parameters. You might find it as a strange sort of configuration system, analogous to how css 'configures' the presentation of HTML elements. If you find yourself passing constant parameters to a procedure so that it will know how to behave in the current context, then this method may be useful. You may also have created wrappers to effectively do the same thing, or you may have even two nearly identical copies of the same procedure.

Example:

  procedure a() {
    x(true);
  }

  procedure b() {
    x(false);
  }

  procedure x(flag) {
    if(flag) {
      print "a";
    } else {
      print "b";
    }
  }

becomes:

  selector(qw(x), {
    flag => true # By default flag is true
  });

  selector(qw(b x), {
    flag => false # But when called from b(), flag is false
  });

  procedure a() {
    x();
  };

  procedure b() {
    x();
  }

  procedure x() {
    if(selector->{flag}) {
      print "a";
    } else {
      print "b";
    }
  }

In this example the resulting code is longer than the original. But imagine that instead of just 'a' and 'b' calling 'x', there were instead like 20 things that call 'x', but you only want to pass false when 'b' calls 'x'. Or perhaps you only send false when 'a' calls 'b' calls 'c' calls 'x'.

  selector(qw(a b c x), {
    flag => false # But when called from b(), flag is false
  });

Now we're starting to encode some more serious logic here. This example is clearly contrived, but see below for the real-world problem which inspired this technique. I'll try to think up a less symbolic example while keeping the simplicity. Suggestions welcome.

----

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

I'm not actually suggesting we use selectors like this, it is a mere abstraction. Using actual selectors would be like using XML configuration files, and I am very against that. Instead I'd implement it in code at the very least. Like this:

  $context['row']['attrs'] = {
    'header' => 'show',
    'cells' => 'hide',
    'desc' => 'show',
    'editable' => 'no',
  };

  /* When displayed in the context of a timesheet view */
  $context['view']['timesheet']['row']['attrs'] = {
    'header' => 'hide',
    'cells' => 'show',
    'editable' => true,
  };

or somethin'. maybe a function call would be better, like

  context('view','timesheet', 'row', {
    'header' => 'hide',
    'cells' => 'show',
    'editable' => true,
  });

  # ... later in our row-display code, we might do
  if($header eq 'show') {
    # show the header
  }

that way it could assign things in reverse-order... cause we are really going to want to know, as a 'row', what attributes we currently have given the context of "view -> timesheet". Plus the above selectors are just the "contained in" selectors, we might also want class, id, immediate-child, sibling, etc (just think of all the [http://www.w3.org/TR/REC-CSS2/selector.html css2 selectors]).


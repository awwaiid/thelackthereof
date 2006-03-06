---
title: Code_Selectors
createdAt: 2006-03-06T14:58-05:00
editedAt: 2006-03-06T14:58-05:00
---

Lets contemplate the relationship between HTML and CSS. Imagine that each HTML tag is an object, in the OOP sense of the word. It has a set of attributes, things like align, border, color. It also has one method, render(). When render() is called the object looks at its attributes and decides on how to render itself.

Now add CSS into the mix. When the render method is invoked on our tag object it doesn't just look at its own fixed attributes, it additionally queries the CSS to discover other attribute settings it has, given its current relation to neighboring and parent tag-objects. Lets imagine that the CSS is itself a single object, and the tag-object only has to ask for specific attributes from the CSS-object. It is the CSS-object's job to figure out what attribute values to give in the current context of the tag-object.

In the HTML/CSS world we (theoretically) don't really have to use a variety of HTML tags. We could just use DIV for everything, altering the rendered result to look like any other tag through CSS attributes. Standard HTML tags are merely a set of default attribute values. This is because our conceptual tag-objects have only the one method, render(), which works the same way for every tag to apply all the attributes creating a visual result.

----

This is a technique to provide bits of your program with context-based implicit static parameters. You might find it as a strange sort of configuration system, analogous to how css 'configures' the presentation of HTML elements. If you find yourself passing constant parameters to a procedure so that it will know how to behave in the current context, then this method may be useful. You may also have created wrappers to effectively do the same thing, or you may have even two nearly identical copies of the same procedure.

Example:

<code>
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
</code>

becomes:

<code>
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
</code>

In this example the resulting code is longer than the original. But imagine that instead of just 'a' and 'b' calling 'x', there were instead like 20 things that call 'x', but you only want to pass false when 'b' calls 'x'. Or perhaps you only send false when 'a' calls 'b' calls 'c' calls 'x'.

<code>
selector(qw(a b c x), {
  flag => false # But when called from b(), flag is false
});
</code>

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

<code>
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
</code>

I'm not actually suggesting we use selectors like this, it is a mere abstraction. Using actual selectors would be like using XML configuration files, and I am very against that. Instead I'd implement it in code at the very least. Like this:

<code>
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
</code>

or somethin'. maybe a function call would be better, like

<code>
  context('view','timesheet', 'row', {
    'header' => 'hide',
    'cells' => 'show',
    'editable' => true,
  });

  # ... later in our row-display code, we might do
  if($header eq 'show') {
    # show the header
  }
</code>

that way it could assign things in reverse-order... cause we are really going to want to know, as a 'row', what attributes we currently have given the context of "view -> timesheet". Plus the above selectors are just the "contained in" selectors, we might also want class, id, immediate-child, sibling, etc (just think of all the [http://www.w3.org/TR/REC-CSS2/selector.html css2 selectors]).


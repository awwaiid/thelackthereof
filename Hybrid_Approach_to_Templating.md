---
title: Hybrid_Approach_to_Templating
createdAt: 2008-02-22T00:48-05:00
editedAt: 2008-02-22T00:48-05:00
---

Just some brain-storming here.

I've been going back and forth between an inline, DSL-style template and an external, DOM-manipulation template. Here's what the DSL looks like:

<code>
my $doc = DSL->new(
  html => [
    head => [
      title => [ 'Magical Page' ]
    ]
  ],
  body => [
    h2 => 'Page!',
    div => { id => 'counter' } => [ $count ],
    '++' => sub { $count++ },
    '--' => sub { $count-- },
  ]
);
</code>

<code>
<html>
  <head>
    <title>Magical Page</title>
  </head>
  <body>
    <h2>Page!</h2>
    <div id="counter">0</counter>
    <a id="add">++</a>
    <a id="sub">--</a>
  </body>
</html>

---------

$doc = DOM->new_from('template.html');
$doc->set('#counter' => $count);
$doc->set_callback('#add' => sub { $count++ });
$doc->set_callback('#sub' => sub { $count-- });
</code>

Each has advantages and disadvantages altering the balances between abstraction and maintainability. In the DSL it is very easy to add in loops and subroutine calls that generate various bits of the structure. Callbacks (simple ones at least) can be put inline.

In the second the HTML is separate, which also means that it can be developed separately. The HTML Designer can build and the Code Designer weaves.

My current idea is to have them both! Simply make the DSL produce a DOM. Then one can switch arbitrarily. Snippets can be generated and replace parts of the DOM, or raw HTML can be used in place of some of the inner DSL code. Either way we get the DOM tree.

Once we have the DOM tree on the server we can do some other magical things, such as only sending the tree diffs over ajax (as has been done elsewhere I'm sure).

Also in my head is that a similar hybrid approach can work for control flow. The split there is between event handling and sequential flow. The idea is to simply allow both.


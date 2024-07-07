---
title: Continuity Tutorials
tags: []
createdAt: 2004-10-17T18:56-04:00
updatedAt: 2005-07-31T11:09-04:00
---

== Do As I Do ==
Lets try a simple method. I'll show you code, then I'll talk about it. Here is our first example... it isn't exactly a hello world but it'll do.

```perl
#!/usr/bin/perl

use strict;
use Continuity;

package Addnums;
use base 'Continuity::Application';

sub main {
  my $self = shift;
  my $a = $self->getNum('Enter first number: ');
  my $b = $self->getNum('Enter second number: ');
  $self->disp("
    Total of $a + $b is: " . ($a + $b) . ".
    So there.
  ");
}

sub getNum {
  my ($self, $msg) = @_;
  my $f = $self->disp(qq{
      $msg <input name="num">
      <input type=submit value="Enter"><br>
  });
  return $f->{'num'};
}

package main;

my $c = new Continuity(
  appname => 'Addnums',
  print_html_header => 1,
  print_form => 1,
);

$c->go();
```

Here we have two modules going, and in fact you may want to split this into two scripts. All this program does is prompt for a first number, then prompt for a second number, and then show the sum. Very boring, but lovely for pointing out some features. Lets go by way of execution-flow.

First, besides doing some declaration stuff, lets look at the Main package. Here we create a new Continuity object, and give it some settings. There is only one manditory parameter, appname. This corresponds to the name of our class, the one which actually holds the application. This one is named Addnums, and you can see its definition above. Addnums doesn't want to worry about printing the standard html header, nor does it want to print out the form tags, so we ask Continuity to take care of these things.

Once we have our Continuity object set up, and have named it $c, we tell it to GO! And that it does.

```graphviz
digraph {

  addTwo -> "First getNum";
  "First getNum" -> "wait for input 1";
  "wait for input 1" -> "return 1st result";
  "return 1st result" -> addTwo;

  addTwo -> "Second getNum";
  "Second getNum" -> "wait for input 2";
  "wait for input 2" -> "return 2nd result";
  "return 2nd result" -> addTwo;

  addTwo -> "Display Result";

}
```

```graphviz
digraph {
  graph [size="8,8"];
  "Start, recieve user input" -> "Check State";
  "Check State" -> "First";
  "Check State" -> "Second";
  "Check State" -> "Sum";
  "First" -> "Display HTML for first num, next state is 'Second'";
  "Second" -> "Display HTML for second num, next state is 'Sum'";
  "Sum" -> "Display HTML for total, no next state";

  "Display HTML for first num, next state is 'Second'" -> Exit;
  "Display HTML for second num, next state is 'Sum'" -> Exit;
  "Display HTML for total, no next state" -> Exit;
}
```


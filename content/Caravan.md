---
title: Caravan
tags: ["project"]
createdAt: 2010-08-16T02:07-04:00
updatedAt: 2010-08-16T02:29-04:00
---

For my cs512 class (Advanced Data Mining), I'm re-implementing CloSpan and CISpan, and am going to add to them FloSpan (or whatever I call it). In order to do this, I've built up some common libraries and I'm calling the overall framework 'Caravan'. I've actually started from scratch twice already!

Planned algorithms:
* PrefixPan - Base algorithm, uses a prefix tree to hold sequential patterns
* CloSpan - Builds off of PrefixPan, but does Closed Sequential Patterns
* CISpan - Builds off of CloSpan, but allows a single 'diff' on top of the base data
* FloSpan - Builds off of CISpan, but uses ideas from IncSpan to allow continuous updates

See [[Introduction to Frequent Sequential Pattern Mining]] for some background information on what this is all about, and what it is good for.

## The Paper
Since this is an assignment, I'm going to be writing a paper. Someday I'll link to it.

## Get The Code
As usual, my code is in darcs, grab it with:

  # Original, modular version
  darcs get http://thelackthereof.org/projects/ocaml/caravan

  # New fancy object-oriented version
  darcs get http://thelackthereof.org/projects/ocaml/caravan2

or from my github mirror. See [[Contributing]] for general hacking info.

## Use The Code

I should put together an example usage :)

Plan/Todo:
* Command line interface
** Switch to control which algorithm
** Input in the standard binary and ascii formats
** Output in a human readable format
** Output in a machine readable format
* OCaml library interface
* C-library interface? Others?
* Validate CloSpan against the Illimine (C++) implementation
* Benchmark CloSpan against the Illimine implementation



---
title: OCaml_GrabBag
tags: ["project"]
createdAt: 2004-12-11T03:10-05:00
updatedAt: 2004-12-11T03:10-05:00
---

I wrote GrabBag as a datastructure to hold genetically evolving programs (see [[OGPF]]). Unlike most collections, this one assumes that when you add an element you don't care where it goes (unordered insertion) and that when you pull out an element you specifically want a uniformly random element.

See [http://thelackthereof.org/projects/ocaml/grabbag/ the grabbag directory] for the source code (GPLed unless you talk to me).

This particular implementation is based on a binary tree which keeps track
of how many leaves it has on both its left and right side (the actual data is stored in the leaves). This makes it
easy to find the size -- you just add those two numbers from the root of the
tree. To grab something at random we take the size (total number of things
we have), pick a random number up to that. Then we start at the root... if
the number is bigger than the left, we go right and so on until we find the
node and pull it out. We make a note of the removal by subtraction on the
way back out. 2^n nodes can thus be accessed in 2*n operations (which is equivalent to O(ln n) I believe). Adding works
similarly -- we move down the tree finding out where it is lopsided and add
the new thingie there, thereby keeping things pretty even.


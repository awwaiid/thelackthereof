---
title: VladimirBot_Module_API
createdAt: 2003-09-22T11:56-04:00
editedAt: 2003-09-22T11:56-04:00
---

[[VladimirBot]] is split into modules, each one specializing in a specific task. You could think of it as experts if you like. The modules each get a turn trying to figure out the sentence and decide whether or not they can do something with it. If they can't then the next module gets a chance... and so on.

The modules are ranked by generality (modules which accept very specific sentences get low numbers and modules which handle very broad sentences get high numbers). One module will ultimately accept everything.

I am thinking of not actually giving them a cardinal number but instead just making them ordinal. Then their "rank" would only depend on the order they were loaded.

=== Module Structure ===
Modules have to roles. The first is to parse a sentence to decide whether or not they can somehow deal with the data. The second is the actual processing and outputting. I've decided at this point not to make the modules objects.

The first thing a module should do is add itself to the global module list array. So for the VladimirBot::News module:

 push @VladimirBot::vladimir_module, 'News';

This should be done on load (outside of any function). Then, when it is this module's turn to do some processing, the following sub gets called:

 parse($sentence)

Fun, eh?



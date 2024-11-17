---
title: VladimirBot_Module_API
tags: []
createdAt: 2003-09-22T11:56-04:00
updatedAt: 2003-09-22T12:56-04:00
---

[[VladimirBot]] is split into modules, each one specializing in a specific task. You could think of it as experts if you like. The modules each get a turn trying to figure out the sentence and decide whether or not they can do something with it. If they can't then the next module gets a chance... and so on.

The modules add themselves to a global list when they are loaded, and then they get called in an order dependent upon this list. That means that the most general modules (ones that will catch sentences which other, more domain-specific modules may have caught otherwise) should be loaded first so that they effectively end up on the bottom of the stack.

### Module Structure
Modules have a main entrypoint where they get a chance to parse the current sentence. If the module can't figure the sentence out then it can give up and the next module will give it a whack. If, however, it does figure it out then the module returns the response directly.

The first thing a module should do is add itself to the global module list array. So for the VladimirBot::News module:

 push @VladimirBot::vladimir_module, 'News';

This should be done on load (outside of any function). Then, when it is this module's turn to do some processing, the following sub gets called:

 parse($sentence)

Fun, eh? So lets build a module... We can stick with our trusty news module. In this module the only thing we are looking for is the word "news." This is a very simplistic view of the conversational world, but it will serve its illustrative purpose. In all actuality each module gets to parse the sentence however it wants, so long as it gets the job done.

  package VladimirBot::News;
  use strict;
  push @VladimirBot::vladimir_module, 'News';

  sub parse {
    my $sentence = shift; # For now this is just a string, but someday it might be a
                          # magical object which knows about various syntactical aspects
                          # of the sentence
  }




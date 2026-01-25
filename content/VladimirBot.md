---
title: VladimirBot
tags: ["project"]
createdAt: 2003-10-10T01:35-04:00
updatedAt: 2003-10-10T01:42-04:00
---

## A personal information robot

Vladimir was born out of a few smaller applications needing improvement. The idea is that from the commandline, email, an IM client, or a webbrowser I should be able to access important information. Vladimir will be the conceptual center of all these interfaces -- an information robot keeping track of things for me.

In addition to talking to me, Vladimir will talk to other people too. My ultimate goal is to tell people to "email Vladimir" and set up an appointment with me. Because of this I am investigating natural language interfaces to Vladimir. Natural language is a funny thing -- not nearly as efficient as cryptic short commands, but significantly more user-friendly.

Vladimir is structured through several layers. The outer shell is a very slim interface to the command line or email or AIM (etc). These interfaces do the bare necessities of their respective protocol, getting the conversation out and passing it on to the main layer.

The main layer is more of a moderator, allowing all the modules a chance to respond to whatever input he received. An arbitrator of sorts. The modules themselves do a lot of work. They each (in turn) get a whack at handling the input and handling it in some way. One thing I'm toying around with is an idea of "context levels" to assist the moderator. Here's a rundown:

Context Levels
* 0 - None. There is no need to reference any other part of any conversation.
* 1 - Immediate. Need to reference the immediately preceding statements
* 2 - Conversation. Need to reference arbitrary parts of current conversation
* 3 - Global. Must reference part of any conversation ever.

See the [[VladimirBot Module API]] for specific information on the outer construction of a module. Modules could, of course, themselves be split into many modules... the moderator doesn't care one bit. The very important thing is that modules should decide whether they can handle the input as quickly as possible so that the moderator can give other modules a chance to try.

On the natural language front, please see my work on using an [[Earley Parser]] to write context-free, non-deterministic, complex grammars for some of the modules. I've put this over at [[VladimirBot Earley Parsing]].



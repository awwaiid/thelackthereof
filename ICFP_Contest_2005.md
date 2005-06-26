---
title: ICFP_Contest_2005
createdAt: 2005-06-26T00:19-04:00
editedAt: 2005-06-26T00:48-04:00
---

This is to help coordinate efforts on the ICFP Contest 2005.

----

I'm almost done implementing the protocol and state machines. I switched languages from Ocaml to Python in the middle, which added a few hours on. I am, however, using a different style in Python than I would normally have used. 

After I get done with the stuff mentioned above I'm going to set up the graph data structure. Then I'll work on the AI. I'll probably just use some fuzzy logic. I don't know whether I'll have time for minimax (which I have zero experience with).

  --Ben

----

Sweet. So far we've got a random-robber and a random-cop implemented, and we have pseudocode for our AI for the robber and are going to re-use some of those ideas for the cop.

We (david and I) are doing it in Perl for its flexibility and CPAN. So, for example, we are using cpan:Graph to do our graphing. Unfortunately perl is slow, though you'll have the same issue (speed) with python. Not so slow that it is too slow though. at least not yet.

----

Up to now I seem to be taking roughly the same path you are. I implemented random-cop and random-robber this morning. I was thinking about using cpan:Graph to get shortest paths and putting them into a file somehow.

I haven't done AI yet but I plan on working until about 3:00AM tonight and doing the same tomorrow.

  -- Ben


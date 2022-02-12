---
title: ICFP_Contest_2005
createdAt: 2005-06-24T10:42-04:00
editedAt: 2005-06-26T03:47-04:00
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

----

Sweet. Out of curiosity, do you come here to look for updates, or do you look at the RSS feed for the wiki, or what? Just wondering :)

--Brock

----

I'm not using RSS yet. I typically check your site every two weeks to a month. Generally when I post things anywhere I check back once or twice a day until the discussion is over.

I'm glad you asked, though. It has caused me consider using RSS once again. I'll probably just find a GUI client for Gnome.

I'd like a client where I can add an RSS feed with an expiration date, so a week after I post a comment, my computer will stop polling the comment feed (for pages that have multiple RSS feeds). It would be nice if I could say how many days rather than calculate the date in my head, too.

Know of any good clients for Gnome?

  --Ben

----

I haven't really been satisfied by any clients in particular. And I'm pretty sure there aren't any with the feature you desire :(. The client in Firebird is as good as any, so I use that from time-to-time.

I wish I was so organized or thoughtful to check back on the sites I post on :)



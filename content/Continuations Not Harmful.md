---
title: Continuations_Not_Harmful
tags: []
createdAt: 2006-05-27T13:08-04:00
updatedAt: 2006-05-27T13:08-04:00
---

There has been a debate recently about the harmfulness of continuations, specifically in a web-context.

Gilad Bracha [http://blogs.sun.com/roller/page/gbracha?entry=will_continuations_continue Will Continuations continue] (Thursday May 18, 2006)

<blockquote>
"Summary: In the short term, continuation based web servers are very nice. Seaside is the nicest one I’ve seen. But ultimately they are just a phase, and we can already see how we will outgrow that phase. Since continuation-based servers won’t be all that significant in the long term, and given the huge lead times and costs of adding continuations to the JVM, it makes little sense to support them."
</blockquote>

Ian Griffiths [http://www.interact-sw.co.uk/iangblog/2006/05/21/webcontinuations Continuations for User Journeys in Web Applications Considered Harmful] (5/21/2006) - IanG gives a short introduction to continuations, showing how it is useful over HTTP. Then he cites several things which make it a bad idea: Abandoned sessions, thread affinity, web farms, back button breaking, and browser-branching breaking.

Avi Bryant [http://smallthought.com/avi/?p=14 Ongoing Continuations] (May 21st, 2006) "Ultimately, I think all three models - state via REST, state via continuations or closures, state via Ajax - are important, and the job of a good web developer is to choose, for each user interaction, when to use which one."

Tim Bray [http://www.tbray.org/ongoing/When/200x/2006/05/19/Continuations-and-GUIs Continuations and GUIs] (2006/05/21) "This notion, that the Web GUI is insufficiently interactive and we need something richer, is widely held among developers and almost never among actual users of computers, and it’s entirely wrong."

Joe Duffy [http://www.bluebytesoftware.com/blog/PermaLink,guid,db077b7d-47ed-4f2a-8300-44203f514638.aspx Continuations down the drain. Stacks to follow?] (May 20, 2006) "... I now realize something important: the stack is evil. It's a horrible representation of state, especially for web applications." basically message-passing instead of function-calls?

David Megginson [http://www.megginson.com/blogs/quoderat/archives/2006/05/20/continuations-contd/  Continuations, cont’d] (5/20/2006) "The REST people are right, at least on this point: there’s no need to drive a continuation bulldozer through your webapp, when a little REST garden spade will work quite nicely (and won’t tear up your lawn in the process)."

Curtis Poe [http://www.oreillynet.com/onlamp/blog/2006/05/sapirwhorf_is_not_a_klingon.html Sapir-Whorf is not a Klingon] (May 21, 2006) "My friend did not understand closures because most of his work was with Java, Prolog and C (static variables don’t count)." and "Frankly, my jaw dropped when I read that. He can’t be serious that the main reason for continuations is a particular breed of Web server, can he?"

Simon Brocklehurst [http://www.psynixis.com/blog/?p=145 Tim Bray Says Web User Interfaces Are Great. I Beg To Differ.] (May 21st, 2006) "However, my argument is that “easy to learn” is only half of what you need to create a great user interface. The other half of the equation is what I call, “easy to use“; and this is where web GUIs often fall down… and fall down big-time."




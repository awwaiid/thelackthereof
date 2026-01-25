---
title: GP_for_NLP
tags: []
createdAt: 2004-10-25T23:00-04:00
updatedAt: 2004-10-25T23:00-04:00
---

So I was reading  the [http://ocw.mit.edu/OcwWeb/Electrical-Engineering-and-Computer-Science/6-863JSpring2003/CourseHome/index.htm Spring 2003 Natural Language and the Computer Representation of Knowledge] from the good folks at MIT and an idea struck me... one that I now recall already stuck Roland. Use Genetic Programming to evolve a Natural Language Processor. Roland did a first run of this [http://www-ia.hiof.no/~rolando/200302-ICCS-NLADATE.pdf here]. My idea is to use this technique for [[VladimirBot]]. Up until this point I've been trying to create an [[Earley Parser]] grammar so that Vladimir could understand all things relating to scheduling (the idea being for him to become my own personal scheduling agent). This isn't very hard to do, but not very interesting.

So, the new idea. I will create a list of things myself or others might say to Vladimir. I will also create the appropriate semantic representation I want for each of the sentences. Then I hand this off to a GP to create the grammar and translator. Perhaps, however, a simple grammar is not enough. In that case I'd get my GP to output actual code to be run. Hmm.

The biggest issue is the knowledge representation language, I think. I've been thinking about this a lot lately, which is why I was reading the MIT course. But for this domain I think a fairly simple knowledge representation will work well. The two fundamental things which need to be expressible are the obvious -- querying the existing knowledge and adding new knowledge. The real question is whether the knowledge should encompass rules in addition to facts.




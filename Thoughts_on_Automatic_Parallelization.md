---
title: Thoughts_on_Automatic_Parallelization
createdAt: 2003-09-21T05:15-04:00
editedAt: 2003-09-21T05:15-04:00
---

I talked to John Neuburger the other day and it got me to thinking again about automatically parallelizing programs. So, as promised by the title of this page, here are some of my thoughts on the subject.

All that has to be done (ha!) is to abstract a true semantic analysis of a program, and then find and apply some perallelizing transformations which we can prove are correct. Actually we then need to look at the target architecture to see which of our transformations are appropriate to use and where to apply them.

One thought I had involved parallelizing typed lambda calculus, which could then lead to an extension of OCaml (and some other languages) to be automatically parallelizing. Someone had thought along these lines log ago, however, and there are resources on the internet talking about how to use the order of reduction to your advantage... possibly parallelizing it altogether but ... okay, I'm falling asleep so I suppose I will stop now.


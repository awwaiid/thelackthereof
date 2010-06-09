---
title: Comments_on_TLT_-_2010.06.04_-_Mercurial_Bisect
createdAt: 2010-06-09T08:32-04:00
editedAt: 2010-06-09T12:11-04:00
---

=== 1 Comment. ===
Hmmm, the documentation on mercurials wiki seems to be out of date. http://mercurial.selenic.com/wiki/BisectExtension?action=show

When you run the test through -c is that using a static script from the initial revision or does that test need to be in all the revisions, possibly altering the script if it was changed in a previous revision?  I would think it uses a static script, in which case it would mean that you don't necessarily have to have the test in the 'good' revision but can create it after the fact.

-- lungching 2010-06-09 12:32 UTC



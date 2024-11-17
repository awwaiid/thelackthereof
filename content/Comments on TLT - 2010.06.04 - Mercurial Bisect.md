---
title: Comments_on_TLT_-_2010.06.04_-_Mercurial_Bisect
tags: []
createdAt: 2010-06-09T08:32-04:00
updatedAt: 2010-06-09T12:11-04:00
---

### 2 Comments.
Hmmm, the documentation on mercurials wiki seems to be out of date. http://mercurial.selenic.com/wiki/BisectExtension?action=show

When you run the test through -c is that using a static script from the initial revision or does that test need to be in all the revisions, possibly altering the script if it was changed in a previous revision?  I would think it uses a static script, in which case it would mean that you don't necessarily have to have the test in the 'good' revision but can create it after the fact.

-- lungching 2010-06-09 12:32 UTC


----

In the example I provided, my test case is actually located inside of my repository. Thus each execution is indeed running the version of the test from the currently selected revision. In this case I like that, because the test itself might have broken and I'd like to detect that case.

If, however, you need a static test, you can just point to something outside of your repository and it should work the way you describe.

-- [http://thelackthereof.org/ awwaiid] 2010-06-09 16:11 UTC



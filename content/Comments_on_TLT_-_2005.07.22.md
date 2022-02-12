---
title: Comments_on_TLT_-_2005.07.22
createdAt: 2005-09-11T02:32-04:00
editedAt: 2005-09-11T22:03-04:00
---

=== 2 Comments. ===
The idea similiar to dynamic scope, as I understand it.  Dynamic scope is very unpopular in languages these days but I guess Lisp has it.  I've only read about it, but I understand it's very useful for some applications.

-- evan from lj 2005-09-11 06:32 UTC


----

Perl has dynamic scope too ('local'). After thinking about it for a moment I understand what you mean. Definately not the same though... like with dynamically scoped variables these would be set based on the call (or composition) chain, but how they are set is much more complicated and at the same time a bit less messy.

More complicated because it could be 'somewhere in my call chain, f() was invoked' (doesn't have to be the immediate caller really). Less messy because function f() doesn't have to do anything to set it up, and none of the other functions in the call chain are poluted by this variable.

Thanks for the connection though... I hadn't noticed it.

-- [http://thelackthereof.org/ awwaiid] 2005-09-12 02:03 UTC



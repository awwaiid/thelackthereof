---
title: Comments_on_Mathematical_Markup
createdAt: 2011-08-13T14:45-04:00
editedAt: 2011-08-13T14:45-04:00
---

=== 8 Comments. ===
Thanks for the fix, planetoid

-- awwaiid 2004-02-27 00:19 UTC

----
Test comment.

-- awwaiid 2004-03-18 23:29 UTC

----
The LaTeX extension on the oddmuse site is a bit screwy, isn't it? I noticed that the comments refer to a program dvi2bitmap, whereas the actual program used is called dvi2png; whereas the program is in fact called dvipng.

Also the formulas seem not to render correctly. I.e. having $$a+b$$ would not do the trick... Is this an issue or am I the only one experiencing this?

-- filmil 2004-07-16 02:09 UTC

----
This is a tricky extension to make work... it took me several tries and some customization to make it do exactly what I wanted. It works alright... but it is not very self-diagnosing, so when something is wrong it doesn't tell you. I had to just go through a bit at a time until I figured it all out.

-- awwaiid 2004-07-17 23:36 UTC


----

This page has been recently updated, now the extension is much easier to install (thanks to the author, Todd Neal). $$e^x$$ four-ever!!

-- [http://thelackthereof.org/ awwaiid] 2005-03-15 19:13 UTC


----

... and now with the fancy MathJax library, I've abandoned the LaTeX markup extension and switched to the Javascript magicalness.

-- [http://thelackthereof.org/ awwaiid] 2010-12-03 03:25 UTC


----

MathJax seems very nice. Can you explain how you integrated it with Oddmuse? Did you write an extension module, or edit current.pl ... ?

-- Alec 2011-08-13 10:57 UTC


----

Ah, I think I've found the way: just set the HtmlHeaders item in the config file to have the MathJax runes :-)

-- Alec 2011-08-13 18:45 UTC



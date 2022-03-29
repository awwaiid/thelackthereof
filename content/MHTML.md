---
title: MHTML
tags: []
createdAt: 2006-04-04T01:48-04:00
updatedAt: 2006-04-04T01:48-04:00
---

At some point a long time ago I thought it would be cool to have macros in HTML.  I originally wrote it in Perl, but then switched over to OCaml. I used it both in an interpreted (#!/usr/bin/mhtml) context and a pre-compiled context. The idea was to add a few tags, such as <macro>, which would allow me to add some magic tags to HTML in a natural way.

I've since decided that I don't care for this much. You could consider this as a form of XML transform, along the lines of XSLT. I don't care for XSLT much either.

If nothing else this is a good example of writing such a thing in OCaml, including parsing and interpreting the macro language.

Get the code at:
* http://thelackthereof.org/projects/ocaml/mhtml/


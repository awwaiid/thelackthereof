---
title: Mutt
tags: []
createdAt: 2004-02-09T14:11-05:00
updatedAt: 2004-02-09T14:11-05:00
---

## A Guys Best Friend
I just discovered that Mutt can do transparent zlib (de)compression of my email folders! Great, eh? All I had to do was add a couple hooks:

  open-hook \\.gz$ "gzip -cd %f > %t"
  close-hook \\.gz$ "gzip -c %t > %f"
  append-hook \\.gz$ "gzip -c %t >> %f"

This is especially good for a packrat like myself, since I don't bother deleting most of my mailing-list email (even though it is probably useless). Using these compressed folders my 2003 mail folder went from 450720 megs to 128616 (about 28.5% of the original).


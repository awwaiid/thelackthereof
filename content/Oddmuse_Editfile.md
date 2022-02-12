---
title: Oddmuse_Editfile
createdAt: 2007-07-15T23:03-04:00
editedAt: 2007-07-15T23:03-04:00
---

I like to do documentation both directly in a program (like with POD) and in an associated wiki (like here). I do not, however, want to duplicate effort.

This oddmuse module allows me to expose a raw file for display and editing through the wiki interface. Changes to the file will be recorded through [[Darcs]], and after review pulled into the main tree.

Additionally it will have a documentation-only view, displaying only the HTML version of the documentation without the code, just like you were viewing it in perldoc.

A cron job will periodically pull in changes from the main source tree, so that when I update the documentation there it will be reflected on the wiki as well.



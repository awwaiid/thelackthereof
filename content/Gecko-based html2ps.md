---
title: Gecko-based_html2ps
tags: ["project"]
createdAt: 2005-02-25T10:46-05:00
updatedAt: 2005-03-02T17:18-05:00
---

This is an idea I (and lots of other people) have been toying with for a long time. Well its about time that I actually DO something about it.

## Status
Broken.

## Plan
While I'm still trying to figure out the '''best''' way to do this, I've decided that to ever get it done I may as well start with a direct way to do it. So I've grabed the firefox source and built it. I am exploring the TestGtkEmbed application and for my first trick I will make it print to postscript from the command line. I will then rip all the graphical stuff (including GTK itself) out if I can and will be left with html2ps.gecko.

Update: OK, I tried that. I got frustrated and bored, so then I moved on. My NEW attempt is to just Go For It, trying to directly implement what I desire. I have since learned that Gecko has some serious limitations when it comes to rendering things off-screen... but I'm still researching that.

## Code
* http://thelackthereof.org/projects/cpp/html2ps/ ([[Darcs]])



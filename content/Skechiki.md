---
title: Skechiki
tags: ["project"]
createdAt: 2010-03-07T22:15-05:00
updatedAt: 2010-03-10T22:44-05:00
---

## Goal
Ultimately the goal is to digitalize my long-time usage of a [http://www.moleskine.com/catalogue/classic/hard_black_cover/sketchbook__pocket.php Moleskine Pocket Sketchbook]. There are several things that can never be digitalized (battery life!), and several advantages that digitalization provides (backups!). I'll use the word "sketch" even though most of the time I'm actually taking notes... the point is that I'm doing handwriting not typing. Here is the gist of it:

* Quickly get to where I can start making a new sketch
** When someone is telling me what to buy them at subway, I don't have time to wait for a lot of loading and button pressing before I can even start writing.
* Quickly get to a recent sketch
* Use a stylus (or finger) to accurately sketch
** I should be able to sketch an actual picture, or write in a normal small font
* Flip through not-so-recent sketches
* Have enough room to generally avoid scrolling
** I never had to scroll with my Moleskine!

And some things that my Moleskine couldn't do:
* Undo/Redo
* Object-based delete
* Object-based move/resize
* Backups!
* Tag or name sketches
* Search sketches
** By tag, name, or date at least
** By sketching would be cool :)
* Link pages
** This is where the wiki bit comes in!
* Zoom?
** Not sure I want this

## Code

I've gotten a huge head start on this by building on [http://www.adebenham.com/old-stuff/gournal/ Gournal], a Perl/GTK application by Chris Debenham. Chris was targeting a much larger tablet, whereas my immediate target is the [[n900]] (and originally the [[Openmoko]]), which has a 800x480 screen but is only a few inches in size. Gournal stores individual sketches as .svgz (gziped svg), which sounds good to me.

Things I've done so far:
* Make all the icons smaller
* Move the sideways tabbar to the top
* Switch to goocanvas
** This will make it easier to do linking and other stuff, I think
* Switch to cpan:SVG::Parser instead of cpan:XML::Mini::Document
** Got a significant speedup!

Get the code:

  darcs get http://thelackthereof.org/projects/perl/skechiki/

## Resources
* https://wiki.ubuntu.com/MeetingLogs/OpWeek1003/Gooey


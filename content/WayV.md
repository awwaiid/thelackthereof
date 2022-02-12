---
title: WayV
createdAt: 2008-09-11T10:22-04:00
editedAt: 2008-09-11T10:34-04:00
---

From Mike Bennett's WayV page, WayV is...
# Experiment with human computer interaction, especially gesture based computing.
# Initially some software that does hand writing/gesture recognition. Shapes represent actions and are input via the mouse, i.e. draw a B and the "b" key press is sent to your Xterm, draw a C and xcalc starts, draw an N and Netscape starts, etc.

The main site is at http://www.stressbunny.com/wayv/ and the current version is 0.3 (released 2003-08-14).

== Code ==
You can get my modifications to this app via:

darcs get http://thelackthereof.org/projects/c/wayv

All I've done so far is to slightly improve the directional weight for pattern matching. Before a straight up and a straight down both got a score of 0 (lower is better), and then the "down" score was divided by two since the direction was correct. But 0/2 == 0 ! So I add one and scale a bit.

== Plan ==
I'm exploring data input mechanisms for the [[Openmoko]], and ran into this app. It's pretty neat, but there are some things it doesn't do or could do better that I'd like to add. I'm starting with WayV, but might end up starting a different WayV-inspired project.

Things to add:
* Per-app or other context-sensitive gestures
* Pass-through to the app below when no gesture is recognized, especially clicks
* Somehow differentiate between long and short strokes?
** This looks to be outside the gesture recognition algorithm WayV uses
** Could maybe tile a couple WayV instances
** Could maybe just include a "size" metric for the action to utilize
* Flickerless refresh
* Configure whether lines are drawn on the screen

Things to augment:
* Kenetic scrolling
** A "down" command would send down keypresses at a slowing rate
** Interrupt/augment a running key-animation upon the next press
** Could be a separate app altogether
* Config chooser
** Press aux button to get list of configs
** Hopefully context-sensing will work so this won't be necessary
** Might be nice in the meantime!


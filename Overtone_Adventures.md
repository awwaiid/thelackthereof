---
title: Overtone_Adventures
createdAt: 2013-12-23T12:55-05:00
editedAt: 2013-12-23T13:36-05:00
---

2013-12-22

So I've gone through [https://github.com/overtone/overtone/wiki/Getting-Started Overtone Getting Started] a few times, and am up and running. Only trick at all is that I already have my own jackd wrapper script to get jack started. Just like the other times that I went through this tutorial, I get to this point and say "now what?"

There are two different directions to explore. I have the REPL working, but it would be nice to be able to execute from a file and also do some interactive editing via Vim (or Emacs I suppose). The other path is to ... you know ... make some music (er... noise).

So I go on a reading spree. Things I learn:
* There is a neat [https://github.com/overtone/overtone/raw/master/docs/cheatsheet/overtone-cheat-sheet.pdf Cheat Sheet]. But I don't know how to work it.
* Read a bit about [https://github.com/overtone/overtone/wiki/Metronome-and-sequencing Sequencing] on the wiki. Learned:
** You can grab samples from freesounds, like: (def kick (sample (freesound-path 2086)))
** You can then play that with (kick). Fun!
** Something that I read before -- you kinda schedule sounds out in the future a bit. Think I saw that on a video
* The main README references some video tutorials, I'm going to check them out
* http://skillsmatter.com/podcast/scala/clojurex-unpanel-2894
** Nice! Shows some dubstep type noise to make during a 20 minute workshop
** Mentions here as I've seen elsewhere: definst uses macros to send synths to supercollider, so only a specific set of things are OK in there (not arbitrary expressions)
** Shows how to sequence things a bit

== 2013-12-23 ==

Today I'm watching [http://youtu.be/lcRQFGtFiyE Overtone and ClojureScript] which is a coding session of someone setting up an web UI to play Overtone stuff. Building a UI like this reminds me of the one-string guitar that I got at an art festival the other day. Clearly home-made, including an energy drink as the echo chamber. And very awesome. Also fun to see someone iterate through their development. Lots of interesting things in there, most of them I can read more or less but doesn't mean I could write them. One thing I noticed was (:use ...) to pull in instrument libs. I'll try that.

The Cheat Sheet is interesting, but I don't know enough to actually use a lot of the things on there. Current mission is to get the instruments working.

Ah! I need to do (use 'overtone.inst.piano) not (:use overtone.inst.piano).
* Now (piano) plays a note!
* (odoc note) shows that it takes a bunch of params
* (piano 60), (piano 65), etc plays some nice piano notes
* I looked up named parameteters in clojure. (piano :note 65) does what I want
* Achievement unlocked ... I can now use all the intstruments on the cheat sheet!
* Now when I do "(piano :note 60) (piano :note 65) (piano :note 69)" (still in REPL) it plays all three notes at once. Need to learn how to sequence things.
* I think I'll go back to that workshop video


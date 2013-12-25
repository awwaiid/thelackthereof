---
title: Overtone_Adventures
createdAt: 2013-12-25T00:17-05:00
editedAt: 2013-12-25T01:22-05:00
---

== 2013-12-22 ==

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
* At 13:40 they talk about sequencing things
* Play a piano note in 1 second (at (+ 1000 (now)) (piano))
* From their tutorial, I created:
** (defn loop-beats [time] (at (+ 500 time) (kick)) (at (+ 1000 time) (open-hat)) (apply-at (+ 1500 time) loop-beats (+ 1500 time) []))
** (loop-beats (now))
** (stop)
** I don't know exactly what that last [] is for. (odoc apply-at) says it is "argseq" but gives no explanation.
** In general this is "temorial recursion" -- delays a bit before calling back
** As far as I can tell this _does_ create new stack frames! Will eventually run out. I know this because I accidentally put the loop-beats recursion in parens which invoked it.
* Following the tutorial, I transformed it to use a metronome:
** (def metro (metronome 180))
** (defn loop-beats [m beat-num] (at (m (+ 0 beat-num)) (kick)) (at (m (+ 1 beat-num)) (open-hat)) (apply-at (m (+ 2 beat-num)) loop-beats m (+ 2 beat-num) []))
** Get it started: (loop-beats metro (metro))
** Change the temp live! (metro :bpm 200)
** Stop it (stop)
* Instruments take 'notes' (midi numbers), though some things take hz
* Symbolic notes can be turned into midi numbers via (note :a4)
* Can map a sequence of symbolic notes to midi numbers (map note [:e4 :d4 :c4])
* Now I can make a general purpose play-note-sequence function. I'll just make it play on the beat.

<code>
(defn play-song [metro beat-num notes]
  (map-indexed (fn [index n]
    (at (metro (+ index beat-num)) (piano :note (note n)))
  ) notes)
)
</code>

* (play-song metro (metro) [:e4 :d4 :c4 :d4 :e4 :e4 :e4 :a0 :d4 :d4 :d4 :a0 :e4 :e4 :e4 :a0])

* OK. Midi time! Looking at [https://github.com/overtone/overtone/wiki/MIDI Overtone wiki MIDI page]
* Fired up jack-keyboard (software midi keyboard) since I'm not at home
* Apparently software midi doesn't get immediately detected. "modprobe snd-virmidi" gave me something I can connect to in jack
* Had to restart overtone
* Now I have BUNCHES of midi connections when I do (midi-connected-devices)



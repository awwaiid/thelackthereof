---
title: Overtone_Adventures
tags: []
createdAt: 2013-12-22T02:52-05:00
updatedAt: 2014-02-09T15:41-05:00
---

## 2013-12-22

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

## 2013-12-23

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
** In general this is "temporal recursion" -- delays a bit before calling back
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

```
(defn play-song [metro beat-num notes]
  (map-indexed (fn [index n]
    (at (metro (+ index beat-num)) (piano :note (note n)))
  ) notes)
)
```

* (play-song metro (metro) [:e4 :d4 :c4 :d4 :e4 :e4 :e4 :a0 :d4 :d4 :d4 :a0 :e4 :e4 :e4 :a0])

* OK. Midi time! Looking at [https://github.com/overtone/overtone/wiki/MIDI Overtone wiki MIDI page]
* Fired up jack-keyboard (software midi keyboard) since I'm not at home
* Apparently software midi doesn't get immediately detected. "modprobe snd-virmidi" gave me something I can connect to in jack
* Had to restart overtone
* Now I have BUNCHES of midi connections when I do (midi-connected-devices)

## 2013-12-25

Good progress today -- I made a hack to get around that BUNCHES of midi issue. I also got [https://github.com/overtone/overtone/wiki/Overtone-in-vim Overtone Vim Integration] working. Well technically I already had it working (had fireplace.vim installed, etc), I just didn't know it. Now I can start up the REPL in one terminal and start up vim in another. In vim do ":Require" and it finds the running REPL and hooks into it. I also added "nnoremap <F1> :Eval (stop)<cr>" to my .vimrc, so that I can jam on F1 to make the noise stop. Here is the file I've got now:

```
(ns noise.core)
(use 'overtone.live)
(use 'overtone.inst.piano)

(on-event [:midi :note-on]
  (fn [e]
    (let [note (:note e)
          vel  (:velocity e)
          device-name (:name (:device e))]
      (if (= "VirMIDI [hw:1,0,1]" device-name)
        (piano note vel)
        ()
      ) 
    ) 
  ) 
  ::midi-keyboard-handler
)
```

So that takes midi events specifically from that device (I picked one of my 64 virtual devices at random, seems to work) piped to the piano instrument. Next I'm going to make a new instrument of my own and hook that in!

-----------------

http://ibisandbaboon.com/2013/01/13/playing-with-music-and-overtone-i/ - nice intro

http://hg.postspectacular.com/resonate-2013 - need to check out

2013-12-26

This is awesome -- In [http://tgk.github.io/2012/12/the-composing-schemer.html The Composing Schemer] the author uses "core.logic" (which I assume is a clojure lib for doing rule/inference programming) to generate melodies!

## 2013-12-26

Today I'm playing with [http://en.wikipedia.org/wiki/Open_Sound_Control Open Sound Control (OSC)], which is more general-purpose than midi but kinda similar idea. I have an android app on my phone named [https://play.google.com/store/apps/details?id=com.charlieroberts.Control&hl=en Control] which has a few existing UIs, in my case I'm playing with the multi-touch. I set it to have two touch inputs.

In my Overtone REPL I first set it up to listen for OSC events, and dump out whatever events it sees:

```
(def server (osc-server 44100 "osc-clj"))
(osc-listen server (fn [msg] (println msg)) :debug)
; Turn off with: (osc-rm-listener server :debug)
```

I got both my laptop and phone on the wifi (which allows peer-to-peer communication) and told the Control app to connect to my laptop server (192.168.0.15 port 44100, in this case). Now when I touch the screen I get a bunch of messages about the generated OSC events. They look like:

```
{:src-port 45161, :src-host 192.168.0.25, :path /multi/1, :type-tag ff, :args (0.36825398 0.3961456)}
```

From this I see that the path I want to react to is "/multi/1" and "/multi/2". Dragging my fingers around, the args are the x and y coordinates normalized to (0..1). For now I'll just make it beep a bit when it gets an event. I'm hooking the first touch up so the X axis generates a frequency, and the second touch up so that the Y axis generates a frequency (just as a test), giving:

```
(osc-handle server "/multi/1" (fn [msg]
  (let [
      x (nth (:args msg) 0)
      y (nth (:args msg) 1)]
    (demo 0.1 (saw (+ 100 (* 100 x))))
  )
))

(osc-handle server "/multi/2" (fn [msg]
  (let [
      x (nth (:args msg) 0)
      y (nth (:args msg) 1)]
    (demo 0.1 (saw (+ 100 (* 100 y))))
  )
))
```

Each touch plays for 1/10th of a second, so if I drag around these overlap a bunch. In fact, if I drag around a lot then something gets backed up and the sound is delayed.

------

BONUS

Control comes with the ability to dynamically create controls, even over OSC itself! This video shows [http://charlie-roberts.com/Control/?p=339 dynamically creating widgets in Control from SuperCollider], which should be straightforward to translate into Overtone.

[http://minimal.be/control/widget-1.html Three part tutorial on creating reactive Control interfaces]

-------

## 2014-01-15

One of my goals is to hook up my midi keyboard to an instrument and then hook up some of my midi knob controllers and/or OSC from my phone to adjust instrument parameters. I only needed one more thing to make this happen -- clojure refs. First I define an instrument that is parameterized:

```
(definst steel-drum [note 60 amp 0.8 sustain 0.1 subfreq 7]
  (let [freq (midicps note)]
    (* amp
       (env-gen (perc envp 1) 1 1 0 1 :action FREE)
       (+ (square (/ freq 2))
          (rlpf (saw freq) (* multix freq) 0.2)
       )
    )
  )
)
```

Next I'll define some refs. I give them the same name, but note that the above names were local to the steel-drum, so are irrelevant here.

```
(def sustain (ref 0.1))
(def subfreq (ref 7))
```

Now when we get a midi note we need to use these params when we trigger the instrument. As with a previous article, ignore the bit where I'm filtering down my midi device :)

```
(on-event [:midi :note-on]
  (fn [e]
    (let [note (:note e)
          vel  (:velocity e)
          device-name (:name (:device e))]
      (if (= "VirMIDI [hw:1,0,1]" device-name)
        (steel-drum note vel @sustain @subfreq)
        ()
      )
    )
  )
  ::midi-steeldrum-handler
)
```

Great! Now to modify those refs I can do (dosync (ref-set sustain 0.3)) for example. This says start a transaction, and then do an inconsiderate re-assignment of the sustain. That is, do it without regard to what any other transaction might have done. "assign" is nicer than "ref-set", but we don't need to be nice.

To access the current value we can use "@sustain" as we did above. Now what we need to do is listen to some inputs and overwrite the current values. For this I'll use OSC with a x,y touch UI. I'll use the x-coordinate as sustain and the y-coordinate as the subfreq.

```
(osc-handle server "/multi/1" (fn [msg]
  (let [
      x (nth (:args msg) 0)
      y (nth (:args msg) 1)]
    (dosync (ref-set sustain (/ x 2)))
    (dosync (ref-set subfreq (* y 20)))
  )
))
```

And with that I can drag around on my touch UI and it changes the sustain and underlying frequency of my instrument, so I simultaneously bang on my virtual keyboard and get different sounds!

--------

## Overtone + midi + jackd + a2jmidid + linux
* Show midi events, good for debugging: (event-debug-on)
* Get a list of connected devices: (midi-connected-devices)
* I have jackd set up, and can use my midi keyboard with other jack-based synths
* At this point: no connected devices listed. no events.
* Load up some "virtual" midi devices: sudo modprobe snd-virmidi midi_devs=1
* Restart overtone
* jackd connect my midi keyboard to virtual midi (I use patchage)
* Now I have connected devices! ... But there are 16 :(




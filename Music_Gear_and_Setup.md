---
title: Music_Gear_and_Setup
createdAt: 2011-08-27T10:13-04:00
editedAt: 2011-08-27T10:13-04:00
---

I've been exploring the world of Open Source Music Production! Here I detail my setup.

== Hardware ==

; [Fujitsu Lifebook T730] : My laptop, powerful enough for my needs
; [http://www.alesis.com/io2express|Alesis iO2 Express] ; A 2-input USB recorder, effectively an internal soundcard. This is way better than the intel soundcard in my laptop, none of the noise or anything. It takes XLR inputs for microphones, and 1/4" plugs for guitar (or non-XLR mics). With this I can record two things at once... not as fancy as some other setups but it's been working great for me. Probably the biggest issue is that the USB adds a touch of latency (relative to PCI, Firewire, or ExpressCard).
; [http://www.shure.com/americas/products/microphones/sm/sm57-instrument-microphone|SM57 Microphone] : Industry standard apparently, I like mine very much.
; [http://www.m-audio.com/products/en_us/Axiom49New.html|M-Audio Axiom 49 (v2) Midi Keyboard] : After doing a trial-run on a $20 Craig's List keyboard, I found one of these on sale. Works great, and has lots of knobs and sliders to play with. Besides the keyboard itself, the most enjoyable thing has been the 8 (velocity-sensitive) drum pads.
; Harmonicas, mainly [http://www.hohnerusa.com/index.php?8|Hohner Special 20] ; I like the harps :)
; Ol' Blue Guitar

== Software ==

This is where it starts getting complex.

=== Jack ===

Linux / Open Source music generally follows the unix philosophy of having many tools and open protocols to get them working together. With the command line, that's often sockets and pipes. In linux the main thing is [http://jackaudio.org/|Jack] (though I'm learning about OSC also). Jack is basically a software patch-board, allowing you to connect one program to another, so long as they know how to talk to Jack.

=== Ardour ===

I used Audacity for quite a while, but recently got turned on to Ardour. What a fantastic program!

== Configuration and Helper Scripts ==

I have one script named 'musicstuff.sh' what gets things going, primarily Jack.



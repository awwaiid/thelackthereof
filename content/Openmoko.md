---
title: Openmoko
tags: ["project"]
createdAt: 2008-09-06T10:20-04:00
updatedAt: 2008-09-18T12:49-04:00
---

I got my Openmoko on 2008-09-04!

I'll be keeping notes here for now.

== Distributions ==
I've tried several, here's a run-down.

; Om 2007.02 :
This is what the phone comes with. It is very minimal and works a little... but not much. But you can ssh into it! You might be able to make calls... but I blew it away before I got my sim card.

; Om 2008.08 :
This is the first one I installed. At first it didn't seem quite right.... but somehow it got better. Or perhaps I became more patient.

; FDOM :
Just like the latest Om distro, but with apps and some minor fixes already installed. Pretty nice!

; Qtopia :
I dropped the latest qtopia on there. It looks nice, but not being able to run gtk apps killed it for me. Again, I haven't tested the phone call abilities because it was before I had the sim card. I went back to Om 2008.08.

; Debian :
So far this is my favorite. I used their fancy install script to nuke my 8gig microSD card and set everything up. It took something like 2 hours to run, and had no issues at all. Once running, via ssh (since zhone-only is the default UI and there is no terminal to be found) I switched to xfce and have been having a wonderful time ever since. Zhone itself can run in a window in xfce. With this distro I have apt-get access to all of debian and a full linux desktop. Easier to start out full and complex and widdle back down to simplicity, I say!

== MicroSD Card ==
I got the SanDisk 8gb card, and so far it works perfectly.

== Sim Card ==
I walked in to a T-Mobile and bought a pre-paid card for testing. I can't use the internet on it, only voice, and so far it works perfectly. It is very flimsy looking though.

== Headphone Adapter ==
I got a 2.5mm -> 3.5mm adapter from radio shack that works perfectly. It is the radio shack brand (says 274-004 in the corner). I had to mess with alsa to get sound going through it. I didn't notice if it was stereo or mono yet, but definitely out of both speakers.

== GPS ==
GPS works in that I got it to give me my coordinates (this was in Om 2008.08) but didn't have any maps loaded. I haven't played with this much as far as sim-card interaction goes, and it's too cloudy to mess with it right now.

== Touch Screen ==
I installed xournal in debian. It is a bit slow, though turning off its xinput support made it faster. The resolution of the screen is great! With the stylus I can write almost as small as I could with a regular pen... well within the comfort zone for note taking and doodling.

In debian the only real finger-friendly app I've used so far has been zhone itself. And for that fingers worked great. The om 2008.08 install had several finger-friendly apps that worked pretty well... system load or feedback did make it feel a bit odd sometimes. Om 2008.08 also has apps with the magical finger scroll stuff.

== Suspend ==
After doing a full image-backup of the debian install on the microSD card and pplying the suggested suspend/resume scripts, suspend seems to work!

We'll see if it keeps working :)

== General Software ==
Debian has everything! I even got iceweasle (aka firefox) running without any problems at all.

== Perl ==
CPAN took a reallllyyyyyy long time to run... something about building up some list of something or other. But then it went much faster. The machine (I'm increasingly thinking of this as just-another-machine) crawled to a near standstill that I was only barely convinced it wasn't stuck.

But then... ROCK ON! [[Coro]] works, and thus [[Continuity]] works!

== Misc ==
The screen is 16bit color, so when you display full color images it downsamples it without dithering. For actual images this is fine, but for fancy graphics with gradients this is sometimes noticeable. You can do "convert -treedepth 5 -colors 1000 -dither infile.png outfile.png" to drop the number of colors in an image. The 1000 is just an example, you should get it as high as you can such that the image still looks good.

== TODO ==
* http://www.tinymail.org/trac/tmut - mail reader
* wordtrans-qt
* dasher
* wayv


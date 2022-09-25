---
title: Music_Gear_and_Setup
tags: ["music"]
createdAt: 2011-08-27T10:13-04:00
updatedAt: 2017-06-02T21:50-04:00
---

I've been exploring the world of Open Source Music Production! Here I detail my setup.

== Hardware ==

; [[Asus Zenbook Prime UX32VD]]: My laptop, powerful enough for my needs
; [http://www.alesis.com/io2express|Alesis iO2 Express]: A 2-input USB recorder, effectively an internal soundcard. This is way better than the intel soundcard in my laptop, none of the noise or anything. It takes XLR inputs for microphones, and 1/4" plugs for guitar (or non-XLR mics). With this I can record two things at once... not as fancy as some other setups but it's been working great for me. Probably the biggest issue is that the USB adds a touch of latency (relative to PCI, Firewire, or ExpressCard).
; [http://www.shure.com/americas/products/microphones/sm/sm57-instrument-microphone|SM57 Microphone]: Industry standard apparently, I like mine very much.
; [http://www.m-audio.com/products/en_us/Axiom49New.html|M-Audio Axiom 49 (v2) Midi Keyboard]: After doing a trial-run on a $20 Craig's List keyboard, I found one of these on sale. Works great, and has lots of knobs and sliders to play with. Besides the keyboard itself, the most enjoyable thing has been the 8 (velocity-sensitive) drum pads.
; Instruments: Harmonicas, mainly [http://www.hohnerusa.com/index.php?8|Hohner Special 20]. Acoustic guitar. Pots and pans. Semi-broken anglo concertina.

== Software ==

This is where it starts getting complex. I think I'll just highlight the things that I use on a regular basis.

I use Debian sid. Here's some stuff:

<code>
# Jack stuff
apt install jackd jack-tools jack-keyboard qjackctl pulseaudio-module-jack a2jmidid patchage

# PulseAudio helpers
apt install pulseaudio pulseaudio-module-jack pavucontrol pulseaudio-utils

# Synths
apt install zynaddsubfx qsynth fluid-soundfont-gm fluid-soundfont-gs

# Ardour, mixing
apt install ardour3 swh-lv2 calf-plugins tap-plugins

# Monitor & Visualize
apt install meterbridge freqtweak

# Overtone
apt install clojure1.4 leiningen

# Misc
apt install audacity vorbis-tools vlc
</code>

=== Jackd ===

Linux / Open Source music generally follows the unix philosophy of having many tools and open protocols to get them working together. With the command line, that's often sockets and pipes. In linux the main thing is [http://jackaudio.org/|Jack]. Jack is basically a software patch-board, allowing you to connect one program to another, so long as they know how to talk to Jack.

Jack-related software:
; qjackctl: GUI for jack daemon configuration and jack sessions.
; patchage: GUI for jack connections.
; a2jmidid: Turn Alsa midi devices into jack midi.

=== Ardour ===

I used Audacity for quite a while, but recently got turned on to Ardour. What a fantastic program! I'm using the Ardour3, using it as a multi-track non-destructive editor, mixer, and even midi sequencer a bit.

I've also been using this as the main mixing/mastering tool, hooking it in to filters. I like the LV2 calf plugins, like reverb, compression, etc.

=== Hydrogen ===

This drum machine / synthesizer is cool. Among others, I recommend getting the BigMono drum kit, in which drum hits are sampled at different velocities.

=== Overtone ===

This connects clojure to SuperCollider. Seems like a cool way to write synths and do other (possibly live) algorithmic composition. I'm also playing with connecting via OSC and midi to external devices.

=== Misc ===
; qsynth: Nice wrapper for fluidsynth, renders midi using soundfonts.
; Audacity: Good for doing quick file conversions.
; zynaddsubfx: Super powerful synthesizer (forked as yoshimi, I use that sometimes).
; non tools: non-daw, non-mixer, non-sequencer ... lightweight DAW related tools.
; Seq24: This is a fun midi sequencer that I've played with.
; [http://charlie-roberts.com/Control/ Control]: Opensource Android application for OSC UI.

== Configuration and Helper Scripts ==

I have one script named 'musicstuff.sh' what gets things going, primarily Jack. I plug in my hardware first, then fire it up. It differentiates between when I run in laptop-only mode and when I run with my io2 plugged in. I created those two profiles manually in qjackctl and saved them with the given names.

<code>
# Jack GUI and jackd itself
if grep -q io2 /proc/asound/cards ; then
  echo "Runing with iO2"
  qjackctl -s -p io2normal &
else
  echo "Running with onboard sound"
  qjackctl -s -p laptopmode &
fi

# Give jack a few seconds to get started
sleep 3

# PulseAudio -> Jack
pacmd load-module module-jack-source channels=2
pacmd load-module module-jack-sink channels=2
pacmd set-default-sink jack_out

# Nice GUI connection manager
patchage -A &

# Magical bridge between legacy ALSA midi and jack
a2jmidid -e &
</code>

I also have a shut down script (triggered from qjackctl), which just undoes the PulseAudio -> Jack:

<code>
pacmd set-default-sink 0
pactl unload-module module-jack-sink
pactl unload-module module-jack-source
</code>



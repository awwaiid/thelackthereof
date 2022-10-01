---
title: Fujitsu_Lifebook_T730
tags: []
createdAt: 2010-07-27T16:14-04:00
updatedAt: 2012-01-03T23:06-05:00
---

I recently got a [http://store.shopfujitsu.com/fpc/Ecommerce/buildseriesbean.do?series=T730 Fujitsu Lifebook T730], the package with these specs (from the website):

* Intel i5-450M Processor (2.4 GHz, 3 MB L3 cache) with Turbo Boost Technology
* 12.1" WXGA LED backlight
* Dual digitizer (pen input and capacitive multi-touch screen)
* Intel HD Graphics
* Built-in webcam with dual digital array microphones for video chat
* 4 GB DDR3 1066 MHz SDRAM memory (2 GB + 2GB)
* 160 GB S-ATA, 7200 rpm hard drive (protected by Fujitsu Shock Sensor)
* 10/100/1000 Gigabit Ethernet LAN
* Intel Centrino Advanced-N 6200 WLAN
* Bluetooth Wireless
* Modular Dual-Layer Super-Multi DVD Writer
* Embedded Fingerprint Sensor, integrated TPM, Security Panel
* Integrated ambient light sensor
* Full-size, spill-resistant keyboard with touchpad (includes scroll sensor)
* High-Definition Multimedia Interface (HDMI) port
* User-cleanable dust filter
* Main battery: Lithium ion (6-cell, 5200 mAh)
* Bundle code XBUY-T730-W7-003

Plus I got the extra battery for the swappable bay.

== Ubuntu Linux 10.04 (Lucid) on the Fujitsu Lifebook T730 ==

I thought I'd boot into windows to make sure all the hardware worked before replacing it with linux, but after it rebooted for the 4th time while doing it's configuration I gave up and killed it. I didn't even make it to the desktop. So unfortunately that means I can't do much of a comparison there.

So on to linux! I had an Ubuntu 10.04 disk, so I tried that first. Almost everything works out of the box! In fact, the only thing that doesn't work is the capacitive touch screen and screen buttons. I haven't tried the fingerprint reader, and probably won't mess with it at all. I also haven't tried the HDMI, though I'll probably give that a go eventually.

Highlights of what works, what doesn't
|| Feature || Status ||
|| Pen input || Perfect, though needs some calibration ||
|| Touch input || Perfect, after much gnashing of teeth that turned out simple. See below. ||
|| Screen buttons || Didn't work until I got [http://sourceforge.net/apps/mediawiki/fjbtndrv/index.php?title=Main_Page fjbtndrv], now they work fine ||
|| Wireless || Perfect ||
|| Touchpad || Perfect, scrollyness and all. It needs to be more sensitive though. ||
|| Webcam || Perfect ||
|| Sound || Perfect ||
|| Screen || Perfect. Fully controllable via xrandr and some wacom tool. ||
|| Suspend to RAM || Perfect. Sweetness. ||

(Note that this info probably exactly applies for Linux on the Fujitsu Lifebook T900 and TH900 and probably a few others, since they have extremely similar hardware).

== Battery Life ==
One of my hopes with the extra battery has been to get a significant boost on the battery life.

* Unoptimized, listening to pandora over wifi - 5:00 hours

== Touch Input ==
I thrashed about for a few days before I got the touch input to work -- and most of the thrashing was because I didn't try to actually follow the directions linearly, as usual. Here are the two main resources that I found useful:

* [http://linuxwacom.sourceforge.net/index.php/howto/main Linux Wacom Project HOWTO]
* [http://ubuntuforums.org/showpost.php?p=6546012&postcount=1 Ubuntu Forum LinuxWacom HOWTO post]

Now the pen/eraser inputs were listed out of the box in xinput --list, so I mistakenly believed that the issue was somewhere before X. Ubuntu switched from HAL to udev for Lucid (10.04), so I was digging around there. I also upgraded my Wacom X11 driver to the latest release, and then to the latest git. I poked at the /usr/lib/X11/xorg.conf.d/10-wacom.conf, upgrading that to the latest recommended settings. Nothing worked. I knew it worked in general because 'xxd /dev/ttyS0' showed stuff when I touched the screen.

Finally I went ahead and created an /etc/X11/xorg.conf. I was really reluctant to do that because I thought I'd end up having to have the full config, like in the old days. But no! I only had to specify the things I wanted to override, in this case some details on the touch screen. Everything else was still auto detected! Here is my _entire_ xorg.conf:

```
Section "InputDevice"
  Driver        "wacom"
  Identifier    "stylus"
  Option        "Device"        "/dev/ttyS0"          # SERIAL ONLY
  Option        "Type"          "stylus"
  Option        "ForceDevice"   "ISDV4"               # Serial Tablet PC ONLY
EndSection

Section "InputDevice"
  Driver        "wacom"
  Identifier    "eraser"
  Option        "Device"        "/dev/ttyS0"          # SERIAL ONLY
  Option        "Type"          "eraser"
  Option        "ForceDevice"   "ISDV4"               # Serial Tablet PC ONLY
EndSection

# This section is for the TabletPC that supports touch
Section "InputDevice"
  Driver        "wacom"
  Identifier    "touch"
  Option        "Device"        "/dev/ttyS0"          # SERIAL ONLY
  Option        "Type"          "touch"
  Option        "ForceDevice"   "ISDV4"               # Serial Tablet PC ONLY
EndSection


Section "ServerLayout"
        Identifier     "Default Layout"
        InputDevice    "stylus"    "SendCoreEvents"
        InputDevice    "eraser"    "SendCoreEvents"
        InputDevice    "touch"     "SendCoreEvents"    # Only a few TabletPCs support this type
EndSection
```

I haven't done calibration yet, looks like that is a bit of a manual process right now (they are transitioning codebases over at LinuxWacom). But it is close enough to be useable anyway :)

Once I got it working, I tried some plugins for firefox and also grabbed Fennec. Fun!


== Screen Buttons and Swivel Auto Rotate ==
Installing [http://sourceforge.net/apps/mediawiki/fjbtndrv/index.php?title=Main_Page fjbtndrv] made the buttons work. It also comes with a daemon named fscrotd that does the auto-rotate on swivel. Finding it was the hardest part -- it works great.

----

EDIT (By Erich.me) There is a file you can download in the T730 Driver/Utility downloads on the Fujitsu site called AutoRotationSSD_FJ_v1.00.10.003SSD_W7-32.exe that makes the Auto-Rotate function work poerfectly. I am trying out some of the other T731 Drivers and Utilities and I will post more if any of them add functionality.

(awwaiid asks) Question to Erich.me - how is an .exe useful in linux?


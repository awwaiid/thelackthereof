---
title: Fujitsu_Lifebook_T730
createdAt: 2010-07-27T22:05-04:00
editedAt: 2010-07-29T08:51-04:00
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

== Ubuntu 10.04 on the Fujitsu Lifebook T730 ==

I thought I'd boot into windows to make sure all the hardware worked before replacing it with linux, but after it rebooted for the 4th time while doing it's configuration I gave up and killed it. I didn't even make it to the desktop. So unfortunately that means I can't do much of a comparison there.

So on to linux! I had an Ubuntu 10.04 disk, so I tried that first. Almost everything works out of the box! In fact, the only thing that doesn't work is the capacitive touch screen and screen buttons. I haven't tried the fingerprint reader, and probably won't mess with it at all. I also haven't tried the HDMI, though I'll probably give that a go eventually.

Highlights of what works, what doesn't
|| Feature || Status ||
|| Pen input || Perfect, though needs some calibration ||
|| Touch input || <b>No worky yet</b> ||
|| Screen buttons || Didn't work until I got [http://sourceforge.net/apps/mediawiki/fjbtndrv/index.php?title=Main_Page fjbtndrv], now they work fine ||
|| Wireless || Perfect ||
|| Touchpad || Perfect, scrollyness and all. It needs to be more sensitive though. ||
|| Webcam || Perfect ||
|| Sound || Perfect ||
|| Screen || Perfect. Fully controllable via xrandr and some wacom tool. ||
|| Suspend to RAM || Perfect. Sweetness. ||

== Battery Life ==
One of my hopes with the extra battery has been to get a significant boost on the battery life.

* Unoptimized, listening to pandora over wifi - 5:00 hours


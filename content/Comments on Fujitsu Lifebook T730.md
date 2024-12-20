---
title: Comments_on_Fujitsu_Lifebook_T730
tags: []
createdAt: 2010-10-01T16:31-04:00
updatedAt: 2016-05-28T23:53-04:00
---

### 9 Comments.
Hi!
I got myself a T730 too (a cheaper configuration, though) and found it works pretty well with Ubuntu 10.10 RC. However I cannot get pen input and the touch screen working at the same time. The pen works out-of-the-box but stops working as soon as I create a xorg.conf like yours. Touch works perfectly with a xorg.conf. I also tried removing the definitions for the pen but it's still not responding until I delete xorg.conf completely.
What which versions of the wacom drivers and X11 are you using in your working configuration? Do you have any other tips for me?

Thanks in advance,
Lukas

-- geloescht 2010-10-01 20:31 UTC


----

Hmm... no, I don't think I ever had quite that problem while I went through all of my experiments. For versions, dpkg says:

```
ii  xorg                                            1:7.5+5ubuntu1
ii  xserver-xorg-core                               2:1.7.6-2ubuntu7.3
ii  xserver-xorg-input-wacom                        1:0.10.5-0ubuntu4
```

... I suggest you try 10.04 (even just the boot CD) with the xorg I provided and see if that works. It might indicate that I'll have an issue once I upgrade if it does :)

It's also possible that I did something that I've forgotten! Let me know if the above helps, and feel free to email me.

-- [http://thelackthereof.org/ awwaiid] 2010-10-03 04:33 UTC


----

Hi there again,

Just wanted to say I built and installed the input driver from git and now it works perfectly without any xorg.conf!

-- geloescht 2010-10-08 09:12 UTC


----

Hi!

Thank you for posting this great info about the Fujitsu T730 linux setup.  I also got one recently and the tablet/pen features "just worked" with Debian/testing.  However, My eraser seems a little quirky and I haven't tested the multitouch as yet.

HDMI video just worked.  For HDMI audio, see the alsa page; their instructions worked for me:  https://wiki.archlinux.org/index.php/Advanced_Linux_Sound_Architecture#HDMI_Output_Does_Not_Work

You say that your webcam and audio worked perfectly out of the box.  Video and audio output works for me too, but I have not been able to get the internal mic working.  Can you post your alsa version, kernel version and maybe your /etc/modprobe.d/alsa-base.conf file? 

Thanks,

Shandilya

-- Anonymous 2011-10-14 17:53 UTC


----

My mic also doesn't work, and I never came back to update the page, sorry. I too am interested in getting the mic to work -- I don't really understand why it doesn't.

I also switched from ubuntu to debian (sid!) recently, and the touch/pen worked out of the box. I should try the eraser. One other thing -- the camera is upside-down. I've got a work-around and reported it to the kernel module maintainer.

-- [http://thelackthereof.org/ awwaiid] 2011-10-16 12:57 UTC


----

My mic suddenly started working last week! Must have been an update of something... I'm now up to kernel 3.2.0 and alsa-base 1.0.23.

-- [http://thelackthereof.org/ awwaiid] 2012-06-02 01:59 UTC


----

Do all t730s have dual digitizers?  I'd like to get mine going if so - do you have a iso or installer with all of your configurations that I could download and try?

I'm not super techie but certainly bang away for a while.  Mostly interested in the touch feature .

-- Anonymous 2016-05-27 23:34 UTC


----

My dual digitizer worked perfectly on recent linux distros. I have moved on to a new laptop since then though.

-- awwaiid 2016-05-29 03:53 UTC



---
title: Ardour
tags: []
createdAt: 2013-04-14T11:57-04:00
updatedAt: 2013-04-14T11:57-04:00
---

## Building in Debian

While I do like the idea of supporting Ardour development through donations, I don't quite care for the way it is pushed on the website. So I decided to follow their path of OK-ness for not immediately paying: build from source.



That and I already had a bunch of stuff installed. Here is what I had to additionally install/upgrade (debian Unstable 2013-04-14). I basically ran "./waf configure" over and over and over, getting a little further and installing another package each time.

libboost-all-dev
libglibmm-2.4-dev
uuid-dev
libfftw3-dev
libaubio-dev
libsamplerate0-dev
lv2-dev

Right about then I remembered that Debian already has ardour2, and I figure there are probably a bunch of the same dependencies. So I did:

  apt-get build-dep ardour

... and then the configure found everything it needed.

Compile then worked perfectly, and it seems to run. Haven't done much testing though. Once I test a bit I might look into requesting debian to track ardour3 as a real package.


---
title: Linux_on_the_Compaq_v2311
tags: []
createdAt: 2005-09-02T13:19-04:00
updatedAt: 2005-09-02T13:19-04:00
---

This is the machine that Beth got, I'll toss notes here on what I had to do to make it work. Specifically I will be talking about Debian Sarge using Pure64 (purely amd64-based system).

## Specs
* Processor: AMD64
* RAM: 512mb, <i>shared with video</i>
* Storage: 60gig
* Video: ATI radeon mobile 200m or somethin'
* Wireless: broadcom chipset

## Initial Installation
Debian Sarge uses a 2.4 kernel which doesn't talk to the BIOS ACPI (apic specifically) quite right, so it helps to pass 'noapic' as a boot parameter. Otherwise the initial installation went without a hitch. The wired ethernet is detected without issue for net installs, and the vesa driver detected for X11 works OK (its just not very pretty or fast).

One other thing that helped was to allocate only 64 megs of ram to the video card in the bios. This freed up more RAM for linux to make use of... and I don't really need all that ram for the video anyway.

Once you get Debian installed, I highly recommend you compile a customized kernel, or at the very least update the the latest 2.6-debianized kernel. This machine likes 2.6 much more than 2.4, and then you don't need the 'noapic' parameter.

At one point I had to do some video parameters... uh... remove vga=770 or something.

## Video
Used proprietary ATI driver

## Wireless
Used proprietary 64-bit broadcom driver and ndiswrapper

## Suspend
Haven't gotten this going yet


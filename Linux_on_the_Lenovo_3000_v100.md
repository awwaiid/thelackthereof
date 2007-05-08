---
title: Linux_on_the_Lenovo_3000_v100
createdAt: 2007-01-04T21:00-05:00
editedAt: 2007-05-08T00:48-04:00
---

Just got a brand new Lenovo 3000 v100, and thought I'd throw up some notes.

I installed with Debian etch (nightly-build of the installer) and it got almost everything.

== Output of lspci ==

<code>
00:00.0 Host bridge: Intel Corporation Mobile 945GM/PM/GMS/940GML and 945GT Express Memory Controller Hub (rev 03)
00:02.0 VGA compatible controller: Intel Corporation Mobile 945GM/GMS/940GML Express Integrated Graphics Controller (rev 03)
00:02.1 Display controller: Intel Corporation Mobile 945GM/GMS/940GML Express Integrated Graphics Controller (rev 03)
00:1b.0 Audio device: Intel Corporation 82801G (ICH7 Family) High Definition Audio Controller (rev 02)
00:1c.0 PCI bridge: Intel Corporation 82801G (ICH7 Family) PCI Express Port 1 (rev 02)
00:1c.2 PCI bridge: Intel Corporation 82801G (ICH7 Family) PCI Express Port 3 (rev 02)
00:1d.0 USB Controller: Intel Corporation 82801G (ICH7 Family) USB UHCI #1 (rev 02)
00:1d.1 USB Controller: Intel Corporation 82801G (ICH7 Family) USB UHCI #2 (rev 02)
00:1d.2 USB Controller: Intel Corporation 82801G (ICH7 Family) USB UHCI #3 (rev 02)
00:1d.3 USB Controller: Intel Corporation 82801G (ICH7 Family) USB UHCI #4 (rev 02)
00:1d.7 USB Controller: Intel Corporation 82801G (ICH7 Family) USB2 EHCI Controller (rev 02)
00:1e.0 PCI bridge: Intel Corporation 82801 Mobile PCI Bridge (rev e2)
00:1f.0 ISA bridge: Intel Corporation 82801GBM (ICH7-M) LPC Interface Bridge (rev 02)
00:1f.1 IDE interface: Intel Corporation 82801G (ICH7 Family) IDE Controller (rev 02)
00:1f.2 SATA controller: Intel Corporation 82801GBM/GHM (ICH7 Family) Serial ATA Storage Controller AHCI (rev 02)
00:1f.3 SMBus: Intel Corporation 82801G (ICH7 Family) SMBus Controller (rev 02)
04:00.0 Network controller: Atheros Communications, Inc. Unknown device 0024 (rev 01)
0a:01.0 FireWire (IEEE 1394): Ricoh Co Ltd Unknown device 0832
0a:01.1 Generic system peripheral [0805]: Ricoh Co Ltd R5C822 SD/SDIO/MMC/MS/MSPro Host Adapter (rev 19)
0a:01.2 System peripheral: Ricoh Co Ltd Unknown device 0843 (rev 01)
0a:01.3 System peripheral: Ricoh Co Ltd R5C592 Memory Stick Bus Host Adapter (rev 0a)
0a:01.4 System peripheral: Ricoh Co Ltd xD-Picture Card Controller (rev 05)
0a:07.0 Ethernet controller: Realtek Semiconductor Co., Ltd. RTL-8139/8139C/8139C+ (rev 10)
</code>

== Wireless ==
This one uses an Atheros chipset, unlike all of the other v100's up to this point.

Someday MadWifi will support this card, the current bug is at http://madwifi.org/ticket/1001

I got it working very easily by installing the latest stable ndiswrapper (v1.33) and the windows driver from lenovo's website. Lenovo doesn't even list the atheros card for this laptop, so I had to grab it from some other laptop page, http://www-307.ibm.com/pc/support/site.wss/document.do?sitestyle=lenovo&lndocid=MIGR-66449

I slightly followed instructions at http://www.thinkwiki.org/wiki/How_to_install_ndiswrapper_for_the_ThinkPad_11a/b/g/n_Wireless_LAN_Mini_Express_Adapter -- though there wasn't much to it.

I'm not sure if it will work in 802.11n mode or not.

== Video ==
Debian set up the 1280x800 resolution out of the box.

== Audio ==
This works out of the box in many distributions... but not the one I installed. I thought briefly that it was my specific kernel, but then I found a note saying that it might just be some module parameters.
http://www.puzzle.ch/samsung_q35.html
Added "options snd-hda-intel index=0 single_cmd=1 model=laptop-eapd"
to /etc/modules.conf




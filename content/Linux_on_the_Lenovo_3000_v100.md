---
title: Linux_on_the_Lenovo_3000_v100
createdAt: 2007-01-04T00:32-05:00
editedAt: 2007-05-08T01:06-04:00
---

Just got a brand new Lenovo 3000 v100 0763-4CU, and thought I'd throw up some notes.

While trying to get the various devices to work, I discovered that there are various editions of the v100. Mine has the core2duo 7200 and atheros wifi, which seems to the biggest chipset-different bits I noticed.

I installed with Debian etch (nightly-build of the installer) and it got almost everything working. When the stable etch came out I upgraded to that and it didn't get worse. I've tried an ubuntu (7.04) install on another partition, but it doesn't do any better.

Right now the thing that I really really want is suspend-to-ram, but I can't quite get it to work. It suspends for 10-15 seconds just fine, and I can wake it up. But if I suspend it for any longer it won't wake back up.

== Overview ==

|| Device || Model         || Status || Notes                                                              ||
|| Video  || intel 945GM) || works  || graphics accelleration works. dual screen with alternate xorg.conf ||
|| Audio  || ICH7 82801G rev 02) || mostly-works || must run script to swich to headphones-only mode ||
|| Ethernet || RTL-8139 || works ||   ||
|| Wireless || Atheros  || works || svn madwifi driver, or ndiswrapper ||
|| Webcam   || 5602 ALi Corp || no-linux || works in vmware+windows w/ usb2 ||
|| Fingerprint || AuthenTec  || no-linux || haven't even tried it in windows ||
|| Suspend (ram)  ||    || no || _almost_ works! ||
|| Suspend (disk) ||    || no ||  ||
|| Firewire || Ricoh || untested || ||
|| card reader || Ricoh || untested || ||

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

== Output of lsusb ==
Bus 004 Device 002: ID 08ff:1600 AuthenTec, Inc. 
Bus 004 Device 001: ID 0000:0000  
Bus 003 Device 001: ID 0000:0000  
Bus 001 Device 005: ID 0bc2:0502 Seagate RSS LLC 
Bus 001 Device 002: ID 0402:5602 ALi Corp. 
Bus 001 Device 001: ID 0000:0000  
Bus 005 Device 002: ID 0a5c:2101 Broadcom Corp. 
Bus 005 Device 001: ID 0000:0000  
Bus 002 Device 001: ID 0000:0000  

== Wireless ==
This one uses an Atheros chipset, unlike all of the other v100's up to this point.

MadWifi now works with this card, as per http://madwifi.org/ticket/1001. I got it working by simply grabbing the [http://svn.madwifi.org/branches/madwifi-hal-0.9.30.13/ madwifi-hal-0.9.30.13] svn with a straigt make && make install.

Previously:

I got it working very easily by installing the latest stable ndiswrapper (v1.33) and the windows driver from lenovo's website. Lenovo doesn't even list the atheros card for this laptop (that I notice), so I had to grab it [http://www-307.ibm.com/pc/support/site.wss/document.do?sitestyle=lenovo&lndocid=MIGR-66449 from some other Lenovo laptop with an atheros chipset] page.

I slightly followed the [http://www.thinkwiki.org/wiki/How_to_install_ndiswrapper_for_the_ThinkPad_11a/b/g/n_Wireless_LAN_Mini_Express_Adapter ndiswrapper instructions at thinkwiki] -- though there wasn't much to it.

I'm not sure if it will work in 802.11n mode or not.

== Audio ==
This works out of the box in many distributions... but not the one I installed. I thought briefly that it was my specific kernel, but then I found a note saying that it might just be some module parameters.
http://www.puzzle.ch/samsung_q35.html
Added "options snd-hda-intel index=0 single_cmd=1 model=laptop-eapd"
to /etc/modules.conf

Turns out that it doesn't detect when the headphones are plugged in. To switch to headphones-only-mode I do:
<code>
rmmod snd-hda-intel
modprobe snd-hda-intel index=0 single_cmd=1 model=3stack-dig
</code>

which effectively loads the _wrong_ sound card driver, but one that does the trick :)


== Video ==
Debian set up the 1280x800 resolution out of the box. I've since enabled graphic accelleration and figured out a dual-monitor mode. I have to swich Xorg configs to go from single to multi-monitor. I have an experimental version that sort-of switches dynamically using xrandr... but it doesn't work.

=== Lenovo 3000 v100 945GM Xorg i810 single-screen config ===
<code>
# /etc/X11/xorg.conf (xorg X Window System server configuration file)
#
# This file was generated by dexconf, the Debian X Configuration tool, using
# values from the debconf database.
#
# Edit this file with caution, and see the /etc/X11/xorg.conf manual page.
# (Type "man /etc/X11/xorg.conf" at the shell prompt.)
#
# This file is automatically updated on xserver-xorg package upgrades *only*
# if it has not been modified since the last upgrade of the xserver-xorg
# package.
#
# If you have edited this file but would like it to be automatically updated
# again, run the following command:
#   sudo dpkg-reconfigure -phigh xserver-xorg

Section "Files"
	FontPath	"/usr/share/fonts/X11/misc"
	FontPath	"/usr/X11R6/lib/X11/fonts/misc"
	FontPath	"/usr/share/fonts/X11/cyrillic"
	FontPath	"/usr/X11R6/lib/X11/fonts/cyrillic"
	FontPath	"/usr/share/fonts/X11/100dpi/:unscaled"
	FontPath	"/usr/X11R6/lib/X11/fonts/100dpi/:unscaled"
	FontPath	"/usr/share/fonts/X11/75dpi/:unscaled"
	FontPath	"/usr/X11R6/lib/X11/fonts/75dpi/:unscaled"
	FontPath	"/usr/share/fonts/X11/Type1"
	FontPath	"/usr/X11R6/lib/X11/fonts/Type1"
	FontPath	"/usr/share/fonts/X11/100dpi"
	FontPath	"/usr/X11R6/lib/X11/fonts/100dpi"
	FontPath	"/usr/share/fonts/X11/75dpi"
	FontPath	"/usr/X11R6/lib/X11/fonts/75dpi"
	# path to defoma fonts
	FontPath	"/var/lib/defoma/x-ttcidfont-conf.d/dirs/TrueType"
EndSection

Section "Module"
	Load	"i2c"
	Load	"bitmap"
	Load	"ddc"
	Load	"dri"
	Load	"extmod"
	Load	"freetype"
	Load	"glx"
	Load	"int10"
	Load	"vbe"
EndSection

Section "InputDevice"
	Identifier	"Generic Keyboard"
	Driver		"kbd"
	Option		"CoreKeyboard"
	Option		"XkbRules"	"xorg"
	Option		"XkbModel"	"pc104"
	Option		"XkbLayout"	"us"
EndSection

Section "InputDevice"
	Identifier	"Configured Mouse"
	Driver		"mouse"
	Option		"CorePointer"
	Option		"Device"		"/dev/input/mice"
	Option		"Protocol"		"ImPS/2"
	Option		"Emulate3Buttons"	"true"
EndSection

Section "InputDevice"
	Identifier	"Synaptics Touchpad"
	Driver		"synaptics"
	Option		"SendCoreEvents"	"true"
	Option		"Device"		"/dev/psaux"
	Option		"Protocol"		"auto-dev"
	Option		"HorizScrollDelta"	"0"
EndSection

Section "Device"
	Identifier	"Intel Corporation Mobile 945GM/GMS/940GML Express Integrated Graphics Controller"
	Driver		"i810"
	VideoRam    65535
	Option          "MonitorLayout" "CRT,LFP"
	Option          "Clone"   "true"
	BusID		"PCI:0:2:0"
EndSection

Section "Monitor"
	Identifier	"Generic Monitor"
	Option		"DPMS"
EndSection

Section "Screen"
	Identifier	"Default Screen"
	Device		"Intel Corporation Mobile 945GM/GMS/940GML Express Integrated Graphics Controller"
	Monitor		"Generic Monitor"
	DefaultDepth	24
	SubSection "Display"
		Depth		1
		Modes		"1280x800"
	EndSubSection
	SubSection "Display"
		Depth		4
		Modes		"1280x800"
	EndSubSection
	SubSection "Display"
		Depth		8
		Modes		"1280x800"
	EndSubSection
	SubSection "Display"
		Depth		15
		Modes		"1280x800"
	EndSubSection
	SubSection "Display"
		Depth		16
		Modes		"1280x800"
	EndSubSection
	SubSection "Display"
		Depth		24
		Modes		"1280x800" "1280x1024" "1024x768"
	EndSubSection
EndSection

Section "ServerLayout"
	Identifier	"Default Layout"
	Screen		"Default Screen"
	InputDevice	"Generic Keyboard"
	InputDevice	"Configured Mouse"
	InputDevice	"Synaptics Touchpad"
EndSection

Section "DRI"
	Mode	0666
EndSection

Section "Extensions"
Option "Composite" "Enable"
EndSection
</code>

=== Lenovo 3000 v100 945GM Xorg i810 dual-screen config ===
<code>
Section "ServerLayout"
	Identifier     "X.org Configured"
	Screen         0 "IntScreen" 0 0
	Screen         1 "ExtScreen" LeftOf "IntScreen"
	Option          "Xinerama" "true"
	InputDevice	"Generic Keyboard"
	InputDevice	"Configured Mouse"
	InputDevice	"Synaptics Touchpad"
EndSection

Section "Files"
	RgbPath      "/etc/X11/rgb"
	ModulePath   "/usr/lib/xorg/modules"
	FontPath     "/usr/share/fonts/X11/misc"
	FontPath     "/usr/X11R6/lib/X11/fonts/misc"
	FontPath     "/usr/share/fonts/X11/cyrillic"
	FontPath     "/usr/share/fonts/X11/100dpi/:unscaled"
	FontPath     "/usr/share/fonts/X11/75dpi/:unscaled"
	FontPath     "/usr/share/fonts/X11/Type1"
	FontPath     "/usr/X11R6/lib/  X11/fonts/Type1"
	FontPath     "/usr/share/fonts/X11/100dpi"
	FontPath     "/usr/share/fonts/X11/75dpi"
	FontPath     "/var/lib/defoma/x-ttcidfont-conf.d/dirs/TrueType"
EndSection

Section "Module"
	#Load  "glx"
	Load  "extmod"
	#Load  "dri"
	Load  "dbe"
	Load  "record"
	Load  "xtrap"
	Load  "type1"
EndSection


Section "InputDevice"
	Identifier	"Generic Keyboard"
	Driver		"kbd"
	Option		"CoreKeyboard"
	Option		"XkbRules"	"xorg"
	Option		"XkbModel"	"pc104"
	Option		"XkbLayout"	"us"
EndSection

Section "InputDevice"
	Identifier	"Configured Mouse"
	Driver		"mouse"
	Option		"CorePointer"
	Option		"Device"		"/dev/input/mice"
	Option		"Protocol"		"ImPS/2"
	Option		"Emulate3Buttons"	"true"
EndSection

Section "InputDevice"
	Identifier	"Synaptics Touchpad"
	Driver		"synaptics"
	Option		"SendCoreEvents"	"true"
	Option		"Device"		"/dev/psaux"
	Option		"Protocol"		"auto-dev"
	Option		"HorizScrollDelta"	"0"
EndSection

Section "Monitor"
	#DisplaySize	  370   300	# mm
	Identifier   "ExtMonitor"
	VendorName   "ACR"
	ModelName    "Acer AL1912"
 ### Comment all HorizSync and VertSync values to use DDC:
	HorizSync    24.0 - 80.0
	VertRefresh  49.0 - 75.0
	Option	    "DPMS"
EndSection

Section "Monitor"
	Identifier	"IntMonitor"
	Option		"DPMS"
EndSection

Section "Device"
        ### Available Driver options are:-
        ### Values: <i>: integer, <f>: float, <bool>: "True"/"False",
        ### <string>: "String", <freq>: "<f> Hz/kHz/MHz"
        ### [arg]: arg optional
        #Option     "NoAccel"            	# [<bool>]
        #Option     "SWcursor"           	# [<bool>]
        #Option     "ColorKey"           	# <i>
        #Option     "CacheLines"         	# <i>
        #Option     "Dac6Bit"            	# [<bool>]
        #Option     "DRI"                	# [<bool>]
        #Option     "NoDDC"              	# [<bool>]
        #Option     "ShowCache"          	# [<bool>]
        #Option     "XvMCSurfaces"       	# <i>
        #Option     "PageFlip"           	# [<bool>]
	Identifier  "IntCard"
	Driver      "i810"
	VendorName  "Intel Corporation"
	BoardName   "Mobile 945GM/GMS/940GML Express Integrated Graphics Controller"
	BusID       "PCI:0:2:0"
	Option      "MonitorLayout" "CRT,LFP"
#	Option      "DevicePresence" "true"
	Screen      0
EndSection

Section "Device"
        ### Available Driver options are:-
        ### Values: <i>: integer, <f>: float, <bool>: "True"/"False",
        ### <string>: "String", <freq>: "<f> Hz/kHz/MHz"
        ### [arg]: arg optional
        #Option     "NoAccel"            	# [<bool>]
        #Option     "SWcursor"           	# [<bool>]
        #Option     "ColorKey"           	# <i>
        #Option     "CacheLines"         	# <i>
        #Option     "Dac6Bit"            	# [<bool>]
        #Option     "DRI"                	# [<bool>]
        #Option     "NoDDC"              	# [<bool>]
        #Option     "ShowCache"          	# [<bool>]
        #Option     "XvMCSurfaces"       	# <i>
        #Option     "PageFlip"           	# [<bool>]
	Identifier  "ExtCard"
	Driver      "i810"
	VendorName  "Intel Corporation"
	BoardName   "Mobile 945GM/GMS/940GML Express Integrated Graphics Controller"
	BusID       "PCI:0:2:0"
	Option      "MonitorLayout" "CRT,LFP"
#	Option      "DevicePresence" "true"
	Screen      1
EndSection

Section "Screen"
	Identifier	"IntScreen"
	Device		"IntCard"
	Monitor		"IntMonitor"
	DefaultDepth	24
	SubSection "Display"
		Depth		24
		Modes		"1280x800"
	EndSubSection
EndSection

Section "Screen"
	Identifier	"ExtScreen"
	Device		"ExtCard"
	Monitor		"ExtMonitor"
	DefaultDepth	24
	SubSection "Display"
		Depth		24
		Modes		"1280x1024"
	EndSubSection
EndSection
</code>







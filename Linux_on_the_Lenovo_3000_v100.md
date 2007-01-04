---
title: Linux_on_the_Lenovo_3000_v100
createdAt: 2007-01-04T00:32-05:00
editedAt: 2007-01-04T02:00-05:00
---

Just got a brand new Lenovo 3000 v100, and thought I'd throw up some notes.

I installed with Debian etch (nightly-build of the installer) and it got almost everything.

== Wireless ==
This one uses an Atheros chipset, unlike all of the other v100's up to this point.

Someday MadWifi will support this card, the current bug is at http://madwifi.org/ticket/1001

I got it working very easily by installing the latest stable ndiswrapper (v1.33) and the windows driver from lenovo's website. Lenovo doesn't even list the atheros card for this laptop, so I had to grab it from some other laptop page, http://www-307.ibm.com/pc/support/site.wss/document.do?sitestyle=lenovo&lndocid=MIGR-66449

I slightly followed instructions at http://www.thinkwiki.org/wiki/How_to_install_ndiswrapper_for_the_ThinkPad_11a/b/g/n_Wireless_LAN_Mini_Express_Adapter -- though there wasn't much to it.



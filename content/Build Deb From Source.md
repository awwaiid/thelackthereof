---
title: Build_Deb_From_Source
tags: []
createdAt: 2011-04-05T16:44-04:00
updatedAt: 2011-04-05T16:44-04:00
---

Had to fix some malloc bug in xbindkeys. Didn't want to wait for the next version, so did:
<code>
mkdir src
cd src
apt-get build-dep xbindkeys
apt-get source xbindkeys
cd xbindkeys-1.8.3
...  fix code ...
# Optional: debian/rules updateconfigs
fakeroot debian/rules binary
cd ..
dpkg -i xbindkeys_1.8.3-1_i386.deb
</code>



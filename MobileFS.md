---
title: MobileFS
createdAt: 2007-12-17T00:45-05:00
editedAt: 2008-01-21T20:50-05:00
---

This is a Fuse filesystem to ease going mobile. At home I have a central server for music files, for example. But the archive is too big to take with me. I don't usually listen to _all_ of the songs, however, really I only listen to certain ones.

So I created a caching filesystem. When I open a file it copies it to my laptop's cache. Then, when I'm disconnected and try to access the file, it falls back to this cached copy.

It is NOT meant for distributed work, this is pretty targeted for this one use case of a large amount of basically read-only data of which you want to cache only the most recently (or most frequently) used bit.

== Notes ==
Looks like it works! There are some things that need to be done though. First thing is to fix mp3 access. When XMMS or other programs look at mp3 files they jump to the end to get the id3 tag. So just opening a file can't be the trigger for caching it or every file that XMMS shows will be cached. Instead it needs to watch for reads somewhere in the middle of the file.

== Code ==
darcs get http://thelackthereof.org/projects/perl/mobilefs

== Recent Development Feed ==
<rss 5 http://thelackthereof.org/darcs-rss/feed/perl-mobilefs.rss>


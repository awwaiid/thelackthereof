---
title: MobileFS
createdAt: 2007-11-15T23:06-05:00
editedAt: 2007-12-17T00:45-05:00
---

This is a Fuse filesystem to ease going mobile. At home I have a central server for music files, for example. But the archive is too big to take with me. I don't usually listen to _all_ of the songs, however, really I only listen to certain ones.

So I created a caching filesystem. When I open a file it copies it to my laptop's cache. Then, when I'm disconnected and try to access the file, it falls back to this cached copy.

It is NOT meant for distributed work, this is pretty targeted for this one use case of a large amount of basically read-only data of which you want to cache only the most recently (or most frequently) used bit.


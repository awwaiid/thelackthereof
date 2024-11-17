---
title: AnyEvent,_Coro,_EV
tags: []
createdAt: 2011-06-07T18:51-04:00
updatedAt: 2011-06-14T23:28-04:00
---

These are some notes on AnyEvent, hopefully handy for putting together conference presentations or other articles.

## AnyEvent
"the DBI of event loop programming"

"EV, Event, Glib, Tk, Perl, Event::Lib, Irssi, rxvt-unicode, IO::Async, Qt and POE are various supported event loops/environments."

CPAN: cpan:AnyEvent

### History

How did AE come about?

### Technology

The killer combo -- libev + Coro + AnyEvent. But with AE there are many backends

### Speed

http://lists.schmorp.de/pipermail/anyevent/2010q4/000068.html

## Coro
Cooperative Multitasking for Perl


## libev (EV)

### History
* Created in 2007
* Meant to replace libevent
* Very fast
* Very cross-platform
* Very non-blocking

### Users
Things that depend/make use of libev:
* Awesome (window manager)
* i3 (window manager)
* nodejs
* coffeescript (depends on nodejs)
* unbound (caching dns server)
* multiwatch (multi-proc spawn and watchdog)
* lighttpd (optional)
* rxvt-unicode
* libevhdns (async dns resolver)

### Language bindings
* Perl
* Pythong
* Ruby
* C#
* C / C++
* Lua


## The Killer Combo?

----

http://leonerds-code.blogspot.com/2011/06/sleep-sorting-with-ioasync-and-cps.html


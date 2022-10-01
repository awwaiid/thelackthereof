---
title: Continuity-PSGI
tags: []
createdAt: 2009-09-22T14:08-04:00
updatedAt: 2009-09-22T14:08-04:00
---

```
  # blah.pl
  use Continuity;
  use Continuity::Adapt::PSGI;
  Continuity->new(
    Continuity::Adapt::PSGI->new
  )->loop;
  sub main {
    my $request = shift;
    $request->print("Hello")->next->print("world!");
  }
```

Then execute with "plackup blah.pl". This will work by magically overriding ->loop to return a subref, so when blah.pl is eval'ed it will actually do some magical inversion-of-control.


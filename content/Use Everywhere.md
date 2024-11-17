---
title: Use_Everywhere
tags: ["project"]
createdAt: 2010-03-07T23:49-05:00
updatedAt: 2010-03-07T23:49-05:00
---

I strongly believe that new versions of perl should enable all the features by default. Every time I write "use 5.010" at the top of my programs I am bothered... so now I can do:

```
use everywhere '5.010';
```

... in only the toplevel .pl and never again in any of the .pm files in the whole program. Not as good as having it on by default, but not too bad. This is what I have in EPFarms.pm:

```
use everywhere 'MooseX::Declare; use 5.010',
  matching => '^EPFarms',
  use_here => 1;
```

## Code
* darcs get http://thelackthereof.org/projects/perl/everywhere
* cpan:everywhere


---
title: Perl_hashref_iteration_example
tags: []
createdAt: 2003-11-10T11:55-05:00
updatedAt: 2010-06-08T20:57-04:00
---

Here is an example of iterating over a nested hashref datastructure in Perl.

```
$domaindb = {
  'thelackthereof.org' => {
    'owner' => 'brock',
    'services' => {
      'web' => 1,
      'dns' => 0,
      'email' => 1
    }
  },
  'brockwilcox.org' => {
    'owner' => 'awwaiid',
    'services' => {
      'web' => 1,
    }
  }
};

foreach $domain (keys %{$domaindb}) {
  print "Domain: $domain\tOwner: $domaindb->{$domain}->{owner}\n";
}
```

Which outputs:
<pre>
Domain: thelackthereof.org      Owner: brock
Domain: brockwilcox.org         Owner: awwaiid
</pre>

Fun, eh?


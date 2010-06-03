---
title: Perl_hashref_iteration_example
createdAt: 2006-03-06T15:02-05:00
editedAt: 2010-06-03T14:56-04:00
---

Here is an example of iterating over a nested hashref datastructure in Perl.

<code>
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
</code>

Which outputs:
<pre>
Domain: thelackthereof.org      Owner: brock
Domain: brockwilcox.org         Owner: awwaiid
</pre>

Fun, eh?


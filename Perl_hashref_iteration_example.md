---
title: Perl_hashref_iteration_example
createdAt: 2003-11-10T11:56-05:00
editedAt: 2006-03-06T15:02-05:00
---

Here is an example of iterating over a nested hashref datastructure in Perl.

<pre>
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
</pre>

Which outputs:
<pre>
Domain: thelackthereof.org      Owner: brock
Domain: brockwilcox.org         Owner: awwaiid
</pre>

Fun, eh?


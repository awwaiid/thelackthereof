---
title: Comments_on_Web_Programming_With_Contize
tags: []
createdAt: 2004-10-12T19:34-04:00
updatedAt: 2004-10-12T19:34-04:00
---

### 2 Comments.
Regarding the session issue, my favorite web-based programming tool (cpan:HTML::Mason) has solved this a little better with an extension called cpan:MasonX::Request::WithApacheSession.  It's a lightweight wrapper around cpan:Apache::Session, such that you can store objects using the $m API:

```
my $now = DateTime->now();
$now->add( 'minutes' => 10 );
$m->session->{expires} = $now;
```

The only problem I've seen with this so far is that you can't store cpan:Class::DBI objects directly in the session, but that'll be a problem with any session handler, b/c of the way Class::DBI overloads various operators, like scalar().

```
## Ask::Program is a Class::DBI subclass
my ($prog) = Ask::Program->search( name => $ENV{PROGRAM} );

## this doesn't work when you try to un-serialize the session:
$m->session->{program} = $prog;

## this does, but requires yet another call to Class::DBI to turn it back into an object
$m->session->{program} = $prog->id;

```

Of course, this assumes you're using mod_perl on the backend, which, if you're using Mason, you probably are anyway.  Though it occurs to me that if you're using mod_perl, there may be a lighterweight way to go about all of this anyway.

-- janjan 2004-10-12 23:12 UTC

----
I love getting comments. Have I mentioned that?

I tried Apache::Session, but my Contize objects do crazy magic just like cpan:Class::DBI. Integration with Mason would be super cool, it is now officially on my todo list :)

As per mod_perl -- mod_perl is great and all, but I've been trying to make it so that it isn't necessary for my magic. The other implementations of continuation web programming, such as Seaside2, actually implement their own web-server. This makes their job of managing various continuations very easy, at the cost of tossing out Apache alltogether.

-- awwaiid 2004-10-12 23:34 UTC



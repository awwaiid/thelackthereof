---
title: POE,_Coro,_AnyEvent,_and_Reflex
createdAt: 2011-07-03T11:02-04:00
editedAt: 2011-07-03T12:03-04:00
---

For [http://www.yapc2011.us/yn2011/ YAPC::NA 2011] I gave a talk, [http://www.yapc2011.us/yn2011/talk/3334 "POE, Reflex, Coro, AnyEvent, .... What and Why"]. Here are the [slides I used for the talk], but they are mostly just large words and there was a lot of talking. The video will appear soon I hope (if it worked), but a written form might be nice -- so here it is!

----

== Introduction ==
I hope to give you a very high-level introduction to these four technologies, and a few examples to illustrate their philosophies and usage.

One of the very simple examples I use is called 'sleep sort'. This is a fun little algorithm.

== POE ==

<code>
use strict;
use POE;

POE::Session->create(
    inline_states => {
        _start => sub {
            $_[KERNEL]->delay_add(ding => $_, $_)
                foreach @ARGV;
        },
        ding => sub {
            print "$_[ARG0]\n";
        }
    }
);

POE::Kernel->run();
</code>

== Coro ==

<code>
use strict;
use Coro;
use Coro::Timer qw(sleep);

for my $i (@ARGV) {
    async {
        sleep $i;
        print "> $i\n"
    }
}
</code>

== AnyEvent ==

<code>
use strict;
use EV;
use AE;
my @w;
for my $i (@ARGV) {
    push @w, AE::timer $i, 0,
        sub { print "> $i\n" }
}
EV::loop
</code>

== Reflex ==

<code>
use strict;
use Reflex::Timeout;
my @timeouts;
foreach my $num (@ARGV) { 
    push @timeouts, Reflex::Timeout->new( delay => $num, on_done => sub { 
        print "$num\n"
    })
}
Reflex->run_all();
</code>

== The Monster ==

<code>
use strict;
use 5.10.0;
use POE;
use AnyEvent;
use Coro;
use AnyEvent::Impl::POE;

say "First let's queue our AnyEvent stuff";
my @w;
for my $i (@ARGV) {
    push @w, AE::timer $i, 0,
        sub { print "AnyEvent: $i\n" }
}

say "Now POE";
POE::Session->create(
    inline_states => {
        _start => sub {
            $_[KERNEL]->delay_add(ding => $_, $_)
                foreach @ARGV;
        },
        ding => sub {
            print "POE: $_[ARG0]\n";
        }
    }
);

say "Then Coro";
use Coro::Timer qw(sleep);
for my $i (@ARGV) {
    async {
        sleep $i;
        print "Coro: $i\n"
    }
}

say "and REFLEX....";
use Reflex::Timeout;
my @timeouts;
foreach my $num (@ARGV) { 
    push @timeouts, Reflex::Timeout->new( delay => $num, on_done => sub { 
        print "Reflex: $num\n"
    })
}

say "We'll let POE::Kernel do the driving... and GO!\n\n";
POE::Kernel->run();
</code>


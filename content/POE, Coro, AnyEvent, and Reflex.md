---
title: POE,_Coro,_AnyEvent,_and_Reflex
tags: []
createdAt: 2011-07-03T10:33-04:00
updatedAt: 2011-07-03T16:01-04:00
---

For [http://www.yapc2011.us/yn2011/ YAPC::NA 2011] I gave a talk, [http://www.yapc2011.us/yn2011/talk/3334 "POE, Reflex, Coro, AnyEvent, .... What and Why"]. Here are the [slides I used for the talk], but they are mostly just large words and there was a lot of talking. The video will appear soon I hope (if it worked), but a written form might be nice -- so here it is!

----

== Introduction ==
I hope to give you a very high-level introduction to these four technologies, and a few examples to illustrate their philosophies and usage.

One of the very simple examples I use is called 'sleep sort'. This is a fun little algorithm first introduced by the unique minds of 4chan. The game is to write a simple command line program that takes a list of numbers as arguments, and then print them out in sorted order. The fun bit is how this is done -- for each number argument X they fork and then sleep for X seconds before printing out X. One way to put it is that this is a sort that utilizes time instead of space. Quite bizarre and amusing. Here's an example of this using fork that the reset of our samples resembles; note that it sits there forever and will require a ^C to terminate.

<code>
use 5.12.0;
foreach my $t (@ARGV) {
  if(!fork()) {
    sleep $t;
    say $t;
    exit;
  }
}
sleep while 1; # Loop forever
</code>

The examples I use are a bit different because they don't actually fork or use other processes. Instead they work with whatever their concurrency model is to watch for a timeout within the single running process. You'd do similar things with each tool to instead wait for a filehandle to be readable or some data to be ready on a socket.

I'll now go through the technologies, following the order in which they appeared on CPAN.

== POE ==
"portable multitasking and networking framework for any event loop"

First hitting CPAN in 1998, POE was actually started a few years before that by Rocco, who says he initially created it to help write games. At least partly due to its age, POE has a large community and many useful tools on CPAN. I ran into POE when wanting to create an IRC bot, for example.

<code>
# Sleep sort using POE
use 5.12.0;
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
"the only real threads in perl"

Coro was introduced back in 2001. Coro does some deep magic not only in the perl core but in the C stack itself, saving off the important parts of the current running state into a Coro::State object that represents a single thread of execution. This allows for cooperative threading with very flexible control over shared variable scope. You can think of it as threads, you can think of it as continuations/coroutines, and you can think of it a way of implementing the inversion-of-control pattern.

It was insane when introduced in 2001, just as it is insane now, with one very very strong caveat -- it works. Ten years and several major perl revisions later, it friggin WORKS and is very good at what it does. But it's deep magic comes at a price -- the perl debugger and some profiling tools (such as NYTProf) do not deal well with Coro. Maybe someday these tools will adapt to run cleanly under Coro, or Coro will adapt to run under them, or maybe some of the perl core will be adapted to make Coro less invasive. Even with this caveat, I've been happily using Coro for years.

<code>
# Sleep sort using Coro
use 5.12.0;
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
"the DBI of event loop programming"

Introduced in 2005, AnyEvent provides a simple model of event management centering around callbacks.

<code>
# Sleep sort using AnyEvent
use 5.12.0;
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
This is the newcomer to the scene, currently existing as a layer on top of POE. Rocco has tried over the years with several projects to rise above some of the nitty gritty of POE into the realm of concurrent and reactive objects, and it seems that the approach in Reflex is achieving his goals at last.

One thing that strikes me boldly about Reflex: though it is implemented on top of POE, it could just as easily be on top of AnyEvent and change (almost) nothing about the API. I think this fact strongly illustrates the level of abstraction not only of Reflex, but of POE and AnyEvent.

<code>
# Sleep sort using Reflex (in callback mode)
use 5.12.0;
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
I claimed at some point that these technologies could work together. Well... Let's Do This!

Here is sleep sort using POE, Coro, AnyEvent, and Reflex. It is a simple example, and I wouldn't be surprised if you have to do more work if you want to do more IO-like tasks rather than simple timers. It uses AnyEvent::Impl::POE, which allows POE to be the actual event loop and AnyEvent to tap in, running it's own pending events when POE lets it. Reflex sits on top of the POE event loop. Coro notices AnyEvent is loaded, so it loads Coro::AnyEvent and switches coroutines when AnyEvent lets it. I think.
<code>
# Sleep sort using POE, Coro, AnyEvent, and Reflex. srsly.
use 5.12.0;
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



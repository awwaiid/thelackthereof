---
title: TLT_Drafts
createdAt: 2011-03-12T16:55-05:00
editedAt: 2011-03-12T16:56-05:00
---

= Funky Function Filters in Perl6 =

A while back I wrote about [[TLT - 2006.03.03 - Funky Function Filters|Funky Function Filters]]. Let me refresh your memory - we have a Python and a Ruby snippet and we translate it into Perl5. The code is a toy to show some fancy shmancy lambda (unnamed functions) usage. The idea is to take a list of functions, filter them, and then with the remaining ones show what happens with parameters from -10 to 10.

Python example:
<code>
for f in filter(lambda f: f(-1)>=f(1),
                [lambda x:x, lambda x:x**2, lambda x:x**3]):
    for x in range(-10, 11):
        print x, f(x)
</code>

Ruby translation:
<code>
for f in [lambda { |x| x }, lambda { |x| x**2 }, lambda { |x| x**3 }
         ].select { |f| f.call(-1) >= f.call(1) }
    for x in -10..10
        print x, f.call(x)
    end
end
</code>

My Perl5 translation:
<code>
for my $f (grep { $_->(-1) >= $_->(1) }
        ((sub{shift}, sub{(shift)**2}, sub{(shift)**3})) {
  for my $x (-10..10) {
    print "$x: ",$f->($x),"\n";
  }
}
</code>

Today I thought I'd give a stab at a perl6 translation (using the 2011.01 Rakudo Star release). I started with the perl5 translation, then switched to perl6 idioms.

Perl6 translation:
<code>
for (* ** 1, * ** 2, * ** 3).grep({ $_.(-1) >= $_.(1) })
    -> $f {
  for -10 .. 10 -> $x {
    say "$x: { $f.($x) }"
  }
}
</code>

This is similar in some ways to the perl5 translation, though the grep now shows up on the righthand-side of the list like in Ruby. The biggest difference to me is in the list of lambdas:

<code>
(* ** 1, * ** 2, * ** 3)
</code>

I mean... what does THAT mean?! Let's take the last one, "* ** 3". Translated into english:

<code>
Whatever to-the-power-of 3
</code>

Wait wait... "whatever"? The Whatever-star is a fancy thing from perl6 that took me a while to work out, and there may still be some nuances that I'm missing. In this context it magically makes a closure... er... lambda, that takes one parameter which it puts where you see the '*'.

<code>
# Whatever-star notation
* ** 3

# Pointy-block notation
-> $x { $x ** 3 }

# Subref notation
sub ($x) { $x ** 3 }
{/code}

TODO: .... but that last one should be SLURPY!

= Picking Whatever Star =

The "Whatever Star" was at first alarming to me! I first noticed it when I learned how to shuffle an entire list:

<code>
my $shuffled = ('alice','bob','carol','dave').pick(*);
</code>

Now... I've tried ".pick(1)" which gets me one at random. Then ".pick(2)" will give me two, and not repeat. If I put in too many then it'll only give me back what it can, in this case all four names. But ".pick(*)" doesn't even look valid! The documentation says that it is the same as ".pick(Inf)". When I picked more than there were, it stopped when there was nothing to pick. So this makes sense... try to pick an infinite number and we'll just get them all. Nice. Still kinda weird about the '*' though.

So then I, mistakenly, thought that maybe "pick" was special. Maybe they hooked it up so that it could, like, "know" that it was being passed this '*', which I learned is named "Whatever". I couldn't have been closer to the truth! Except without the "special" bit. Time to do a bit of exploring!

Let's try to figure out how this works without reverting to such tedious things as reading documentation, source code, or IRC, shall we? RTFM my eye. If pick is special, then I shouldn't be able to add something that behaves similarly. Wait, let's do this formal like.

Theorem: (1,2,3,4).pick(*) is somehow special, and can't be replicated without modifying the compiler.

Proof: Let's start by assuming that it is NOT special. Then we should be able to create our own method that can behave specially when '*' is passed.

First, what class is .pick(*) working on, anyway? Let's ask rakudo.

<code>
> (1,2,3,4,5).WHAT
Parcel()
</code>

Parcel. OK, whatever that is. So all we gotta do is slap a new method on there and see what we get. *google google irc*. OK, here we go.

<code>
> use MONKEY_TYPING; augment class Parcel { method yo($x) { say "I like to eat $x." } }
!class_init_384
> (1,2,3,4,5).yo('fishies')
I like to eat fishies.
</code>

Well that was easy :) . Now for the BIG TEST!

<code>
> (1,2,3,4,5).yo(*)
I like to eat Whatever()<0xb2f5a7c>.
</code>

OMG it worked! So I actually get a parameter, and it is an instance of Whatever. Well then.

THEOREM DISPROVED.

I then decided to actually cast about for how things use this. Here's a great example, the [https://github.com/rakudo/rakudo/blob/master/src/core/Any-list.pm#L190 Rakudo Any-list pick whatever implementation]. You can see that they use multi-methods to easily deal with the Whatever case separately from other passed values.

= Debugging Gems =

I've been enjoying the blog entries of Carl Mäsak lately, and not just the [http://strangelyconsistent.org/blog/yapsi-201103-released Yapsi Release Notes]. Though those are awefully awesome.


[http://strangelyconsistent.org/blog/im-doing-science-and-im-still-alive I'm Doing Science And I'm Still Alive]
[http://strangelyconsistent.org/blog/theres-plurality-in-wrongness There's Plurality In Wrongness]

The [http://www.catb.org/jargon/html/P/programming.html Jargon File's definition of programming] defines it as "the art of debugging an empty file".
[http://perl.plover.com/yak/debruijn/ Debugging the de Bruijn Sequence]





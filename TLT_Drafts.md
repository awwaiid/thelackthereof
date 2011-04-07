---
title: TLT_Drafts
createdAt: 2011-03-13T11:06-04:00
editedAt: 2011-04-07T17:49-04:00
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

Wait wait... "whatever"? The Whatever-Star is a fancy thing from perl6 that took me a while to work out, and there may still be some nuances that I'm missing. In this context it magically makes a closure... er... lambda, that takes one parameter which it puts where you see the '*'.

<code>
# Whatever-Star notation
* ** 3

# Pointy-block notation
-> $x { $x ** 3 }

# Subref notation
sub ($x) { $x ** 3 }
</code>

TODO: .... but that last one should be SLURPY!

= Debugging Gems =

I've been enjoying the blog entries of Carl Mäsak lately, and not just the [http://strangelyconsistent.org/blog/yapsi-201103-released Yapsi Release Notes]. Though those are awefully awesome.


[http://strangelyconsistent.org/blog/im-doing-science-and-im-still-alive I'm Doing Science And I'm Still Alive]
[http://strangelyconsistent.org/blog/theres-plurality-in-wrongness There's Plurality In Wrongness]

The [http://www.catb.org/jargon/html/P/programming.html Jargon File's definition of programming] defines it as "the art of debugging an empty file".
[http://perl.plover.com/yak/debruijn/ Debugging the de Bruijn Sequence]





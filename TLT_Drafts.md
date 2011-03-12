---
title: TLT_Drafts
createdAt: 2011-03-11T10:19-05:00
editedAt: 2011-03-12T16:14-05:00
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

Today I thought I'd give a stab at a Perl6 translation (using the 2011.01 Rakudo Star release).

Perl6 translation:
<code>
for (* ** 1, * ** 2, * ** 3).grep({ $_.(-1) >= $_.(1) })
    -> $f {
  for -10 .. 10 -> $x {
    say "$x: { $f.($x) }"
  }
}
</code>

This is similar in some ways to the perl5 translation, though the grep now shows up on the righthand-side of the list like in Ruby. The biggest difference is in the list of lambdas:

<code>
(* ** 1, * ** 2, * ** 3)
</code>

I mean... what does THAT mean?! Let's take the last one, "* ** 3". Translated into english:

<code>
Whatever to-the-power-of 3
</code>

Wait wait... "whatever"? The Whatever-star is a fancy thing from Perl6 that took me a while to work out, and there may still be some nuances that I'm missing.

= Picking Whatever Star =

The "Whatever Star" was at first alarming to me, when I learned how to shuffle a list:

<code>
my $shuffled = ('alice','bob','carol','dave').pick(*);
</code>

Now... I've tried ".pick(1)" which gets me one at random. But ".pick(*)" doesn't even look valid! The documentation says that it is the same as ".pick(Inf)", or in other words "pick out as many as you can, up to infinity". This is ok because if you tell it to pick more than is there, it'll stop when there is nothing else to pick from. Nice.

So then I, mistakenly, thought that maybe "pick" was special. Maybe they hooked it up so that it could, like, "know" that it was being passed Whatever. I couldn't have been closer to the truth! Except without the "special" bit.

<code>
> use MONKEY_TYPING; augment class Array { method yo($x) { say $x } }
!class_init_384
> [1,2,3].yo(77)
77
> [1,2,3].yo(*)
Whatever()<0xc6346e8>
</code>

[https://github.com/rakudo/rakudo/blob/master/src/core/Any-list.pm#L190 Rakudo Any-list pick whatever implementation]



---
title: TLT_Drafts
createdAt: 2011-03-11T08:30-05:00
editedAt: 2011-03-11T10:18-05:00
---

Original post: [[TLT - 2006.03.03 - Funky Function Filters]]

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

Perl5 translation:
<code>
for $f (grep {$_->(-1)>=$_->(1)} (
        (sub{shift},sub{(shift)**2},sub{(shift)**3})) {
  for $x (-10,10) {
    print $x," ",$f->($x),"\n";
  }
}
</code>

Perl6 translation:
<code>
for (* ** 1, * ** 2, * ** 3).grep({ $^f.(-1) >= $^f.(1) }) -> $f {
  for -10 .. 10 -> $x {
    say "$x: {$f.($x)}"
  }
}
</code>

<code>
> use MONKEY_TYPING; augment class Array { method yo($x) { say $x } }
!class_init_384
> [1,2,3].yo(77)
77
> [1,2,3].yo(*)
Whatever()<0xc6346e8>
</code>

[https://github.com/rakudo/rakudo/blob/master/src/core/Any-list.pm#L190 Rakudo Any-list pick whatever implementation]



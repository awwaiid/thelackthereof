---
title: Perl6_Colons
createdAt: 2016-01-13T14:22-05:00
editedAt: 2016-02-09T07:39-05:00
---

I'm collecting all the ways you can use : in Perl 6.

<code>
# namespace
class A::B {
  # "Smiley" type adverb Str:D
  # Named param -- adverb with default True value
  method say-hi(Array[Str:D] :$names) {
    # precedence dropper
    say $names.map: {"hi $_"};
  }
}

# Namespace separator
my $x = A::B.new;

# Dynamic namespace
my $x = ::("A::B").new

# Type adverb (smiley)
Int:D;

# Precedence dropper
@stuff.map: { $_ + 1 };

# Invocant marker
say-hi($x: names => [<me you>]);

# Prefix operator method
my $a = 1;
$a.:<++>; # like ++$a

# signature literal
my $sig = :(Int $foo);

# signature on Callable &var
my &f:(Str) = -> Str {};

# object hashes
my $x = :{ (now) => "when?" };

# Binding
my $y := $a;

# Container identity
$y =:= $a; # True

# Compile-time (read-only) binding
my $z ::= $y;

# longname
sub infix:<ya> { ... }

# Colon-Pair syntax (often seen as adverbs)
my $x = 'cat';
:foo           # 'foo' => True
:foo(5)        # 'foo' => 5
:foo('dog')    # 'foo' => 'dog'
:foo($x)       # 'foo' => 'cat'
:foo<bar>      # 'foo' => 'bar'
:foo<bar baz>  # 'foo' => ('bar', 'baz')
:foo<$x>       # 'foo' => '$x'
:foo<<$x>>     # 'foo' => 'cat'
:foo<<$x dog>> # 'foo => ('cat', 'dog')

# Loop labels
MYLABEL: for ^100 {
  for ^200 {
    last MYLABEL;
  }
}

# Twigil for formal named param for a block (like $^x)
say { $:add ?? $^a + $^b !! $^a - $^b }( 4, 5 ) :!add
</code>



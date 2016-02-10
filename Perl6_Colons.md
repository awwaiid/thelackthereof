---
title: Perl6_Colons
createdAt: 2016-02-09T07:39-05:00
editedAt: 2016-02-09T21:00-05:00
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

# Pseudopackage representing null namespace?
say ::;

class :: is Int {...} # :: stands for an anonymous class

# Call Int method of Int class
42.Int::Int;

# T takes value's type
-> Numeric ::T \x { say T}(42);

# Treat package X as a hash
say X::.keys

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

# Numeric-prefix extraction
say (:1day) # day => 1

# False instead of true
say (:!foo) # foo => False

# Var name as key, content as value
my @foo=1,2;
:@foo # foo => [1,2]
:@foo # foo => [1,2]
:$x   # x   => 'cat'

# Base conversion via colon-pair
say :16("dead") # 57005

# binding pair in sig:
my $a;
sub b (:foo($a)! is rw) { $a = 42};
b(:foo($a));
say $a # 42

# Specific uses of longnames
use Foo:from<Perl5>;

# Loop labels
MYLABEL: for ^100 {
  for ^200 {
    last MYLABEL;
  }
}

# Twigil for formal named param for a block (like $^x)
say { $:add ?? $^a + $^b !! $^a - $^b }( 4, 5 ) :!add

# Declare vars in regex scope
my reex foo { :my $var; }

# FUTURE -- http://design.perl6.org/S05.html#Backtracking_control (some of these implemented already, Larry says he plans to do more this year)
my regex bar { a: b:? c:! :: ::> }

# Unicode character classes
say so "a" ~~ /<[:Alpha]>/

</code>



---
title: Perl6_Colons
tags: []
createdAt: 2016-01-13T14:22-05:00
updatedAt: 2017-07-23T00:35-04:00
---

I'm collecting all the ways you can use : in Perl 6.

Larry's 1st Law of Language Redesign: Everyone wants the colon
Larry's 2nd Law of Language Redesign: Larry gets the colon

A lot of these are variations on a theme, especially the theme of "colon-pair" syntax. Where two uses of the colon look different or are in a different usage context, even if they are technically the same, I'd prefer to illustrate them both.

=== Namespace ===

```
# namespace
package A::B { ... }
class A::B { ... }

# Namespace separator
my $x = A::B.new;

# Dynamic namespace
my $package_name = "A::B";
my $x = ::($package_name).new;

# Pseudopackage representing null namespace?
say :: ;

# Anonymous class
my $anon_class = class :: is Int {...}

# Current class in a compile-time var
class Who { method myname { say ::?CLASS } }

# Call Int method of Int class
42.Int::Int;

# Treat package X as a hash
say X::.keys;
```

=== Binding ===

```
# Binding
my $y := $a;

# Read-only binding
my $z ::= $y;

# Container identity
$y =:= $a; # True
```

=== Colon-Pair Syntax ===

```
# Colon-Pair syntax (often seen as adverbs)
my $x = 'cat';
:foo(5)        # 'foo' => 5
:foo('dog')    # 'foo' => 'dog'
:foo($x)       # 'foo' => 'cat'

# Value word quoting, no interpolation
:foo<bar>      # 'foo' => 'bar'
:foo<bar baz>  # 'foo' => ('bar', 'baz')
:foo<$x>       # 'foo' => '$x'

# Value word quoting with interpolation
:foo<<$x>>     # 'foo' => 'cat'
:foo<<$x dog>> # 'foo' => ('cat', 'dog')

# Numeric-prefix extraction
say (:73day) # day => 73

# Default to true value
say (:foo) # foo => True

# False instead of true
say (:!foo) # foo => False

# Var name as key, content as value
my $x = 'cat';
my @foo=1,2;
:@foo # foo => [1,2]
:$x   # x   => 'cat'

# Base conversion via colon-pair
say :16("dead") # 57005

# binding pair in sig:
my $a;
sub b (:foo($x)! is rw) { $x = 42};
b(:foo($a));
say $a # 42
```

=== Types ===

```
# T takes value's type
-> Numeric ::T \x { say T }(42);

# Type Smileys
Int:D; # Defined Int
Int:U; # Undefined Int
```

=== Signature ===

```
# signature literal
my $sig = :(Int $foo);

# signature on Callable &var, not yet implemented
my &f:(Str) = -> Str {};
```

=== Operators as Methods ===

```
my $a = 1;
$a.infix:["+"](3); # $a + 3
$a.infix:<+>(3);   # $a + 3, but shorter with quote brackets
$a.prefix:<++>;    # ++$a
$a.postfix:<++>;   # ++$a
$a.:<++>;          # Shorthand for prefix (no param)
$a.:<+>(3);        # Shorthand for infix (param provided)
```


=== Regex ===

```

  # Regex adverb
:i/a/  # Case insensitive, outside
/:i a/ # Case insensitive, inside

# Declare vars in regex scope
my regex foo { :my $var; }

# Backtracking control
# similar ones not yet implemented are :: ::> :::
/ a: b?: c*: /

# One especially interesting example you often (don't) see is :?
/ .*:? / # explicit minimal match
/ .*? /  # short version that is usually used has no colon

# Unicode character classes
say so "a" ~~ /<[:Alpha]>/
```

=== Misc ===

```
# Quote adverb
Q:w(word of the day); \# :w adverb

# Precedence dropper
@stuff.map({ $_ + 1 }); # Explicit parameter
@stuff.map: { $_ + 1 }; # Parameters come after ':'

# Invocant marker method invocation
$x.say-hi(names => [<me you>]);  # Normal way
say-hi($x: names => [<me you>]) # Invocant marker way

# Declare alternative to 'self' for current-instance in method
method wuzzup($this: $name) { say "WUZZUP $name?!" }

# object hashes, ones with complex keys
my $x = :{ (now) => "when?" };

# longname
sub infix:<ya> { ... }

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

# This one is a stretch...
# Colons instead of dashes when you invoke cli commands that use MAIN
sub MAIN ( :$filename ) { ... }

# cmd --filename=file.txt
# cmd :filename=file.txt
# cmd :filename \# filename => true
```


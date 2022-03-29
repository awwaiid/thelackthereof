---
title: Perl_6,_Adverbly
tags: []
createdAt: 2016-01-25T09:25-05:00
updatedAt: 2016-01-25T09:25-05:00
---

Work-In-Progress

There are a lot of things that Perl 6 adopted from other languages. Besides a lot of Perl 5 influence, Haskell in particular can be pointed to as strongly influential.

There are, however, a few language features which I've not seen in other languages. One I've mentioned is the Whatever Star. Another is "adverbs".

First let's talk about Pair. A Pair is exactly what it sounds -- a data structure that contains two things. In this case a Pair has a key and a value:

<code>
my $p = Pair.new(key => "age", value => 5);
say $p # output: age => 2
</code>

Pairs are very common, so they have some literal syntax to build them. The most common is "=>", sometimes called the "fat arrow", which is a binary operator that builds a Pair -- key on the left, value on the right:

<code>
my $p = age => 5;
say $p # output: age => 2
</code>

Notice that "age" wasn't put in quotes. The pair constructor auto-quotes the thing on the left, again to optimize for this common case. You can wrap the left in ()'s to force it to be a value.

Colon-Pair notation is another literal syntax for declaring a Pair, and here is where things start to get different:

<code>
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
</code>

The basic idea is you have a key that comes after the colon, and a value that comes in parenthesis or brackets after that. Unlike "=>" notation, this has a DEFAULT value of True. It also allows you to auto-quote the value side by using bracket notation (like you can do with Hashes).

Next:
* Declaring functions with named parameters
* Calling functions with named parameters
* Calling functions with adverb-syntax for named parameters
* Calling operators, which are really functions, with adverb-syntax named parameters
* Show the de-sugared version of an infix operator with adverb-syntax named parameters



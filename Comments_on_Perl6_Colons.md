---
title: Comments_on_Perl6_Colons
createdAt: 2016-01-21T00:03-05:00
editedAt: 2016-01-21T00:50-05:00
---

=== 1 Comment. ===
Some uses I know of which do not appear to be in your list:

say :: # Pseudopackage representing null namespace?

say X::.keys # The package X treated as a hash

42.Int::Int # Call Int method of Int class

-> Numeric ::T \x { say T }(42) # T takes value's type

my regex foo { :my $var; } # declare vars in regex scope

my regex bar { a: b:? c:! :: ::> } # http://design.perl6.org/S05.html#Backtracking_control (some of these implemented already, Larry says he plans to do more this year)

Fwiw you're missing a lot of colon-pair syntax variations too, eg:
say (:1day) # day => 1
say (:!foo) # foo => False
my @foo=1,2; say (:@foo) # foo => [1,2]
my @foo=1,2; say (:@foo) # foo => [1,2]
say :16("dead") # 57005

:)

-- raiph 2016-01-21 05:03 UTC



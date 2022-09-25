---
title: On_Adding_a_True_Predicate_Logic_Layer_to_Relation_Databases
tags: []
createdAt: 2004-02-13T01:52-05:00
updatedAt: 2004-02-13T01:52-05:00
---

See [[SetDB]] for more recent work regarding this subject. This predicate logic stuff was interesting and all, but way too complicated. I am now working on a much more simple and programmer-centric theory on how programming a DB should be. The remainder is here as a reminder of a method which doesn't work, or at least needs a lot more work.

----

Thesis: Relational databases are supposed to be based on [[Predicate Logic]], but they fail to appear that way. It is possible, however, to create a layer which will fix this mis-representation. This layer would have its own interface language, replacing SQL. It would also keep track of data relationships and take those into account for understanding queries. Finally, it would still be able to interface to existing relational databases (by outputting SQL).

References:
* [http://thelackthereof.org/docs/library/cs/database/Jezek,%20Karel%20and%20Toncar,%20Vladimir:%20Experimental%20Deductive%20Database.ps Jezek, Karel and Toncar, Vladimir: Experimental Deductive Databases]


Relational Databases (RDBs for short) are intended to provide a predicate logic like view of stored data. In their current state, however, RDBs do not keep track of high-level relationships and instead rely on the user (the programmer or program querying the data) to manage said relationships.


Lets first toy around a cross between some mathematical syntax and perl for our various operations.

Select all people: <code> @people = </code>$$ \{ \forall x | (person(x) \rightarrow x) \} $$<code>;</code>. The idea here would be that <code>@people</code> would be a tied array, allowing you to access the returned results arbitrarily without a big performance hit. Similarly we could return just the first result from this like this: <code>$person = </code> $$ \{ \exists x | (person(x) \rightarrow x) \} $$ <code>;</code>.

<code>@addresses = </code>$$ \{ a | \forall x (person(x) \rightarrow has\_address(x,a) \rightarrow a) \} $$<code>;
foreach $addr (@addresses) {
  print "Street: $addr->{'street'}\n";
}
</code>

<code>@addresses = </code>
$$ \forall x \forall a (person(x) \rightarrow has\_address(x,a) \rightarrow a)  $$<code>;
foreach $addr (@addresses) {
  print "Street: $addr->{'street'}\n";
}
</code>



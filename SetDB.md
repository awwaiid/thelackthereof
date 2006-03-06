---
title: SetDB
createdAt: 2004-06-12T01:31-04:00
editedAt: 2006-03-06T14:33-05:00
---

=== A Set-Theoretical Database Interface ===
There have been quite a few RDBMS->OO Mappers (see http://poop.sourceforge.net/) but none of them have satisfied me. Usually this is because they map on a table-to-object basis, whereas I want something a bit more abstract. Thus was born SetDB. SetDB allows the programmer to view a database in the same way that a database designer would -- as sets of things and relationships between the sets. In general a programmer only sees this world when composing SQL, and from then on sees only a series of rows.

SetDB is a work in progress and the state of the project reflects that fact. Just a warning!

=== Vocabulary ===
* ''Values'' are things like names or phone numbers or zip codes or such.
* A ''tuple'' holds a bunch of values.
* A ''set'' contains a bunch of same-structured tuples.
* Each table is a ''simple set''.
* Sets relate to one another through references (pointers).
* A ''schema'' is a description of simple sets, their tuples, the tuples' values, and the references between these sets.
* ''Compound sets'' are sets which can have other sets as values.
* Doing "$everyone = $db->newSet(person, [address]);" is really creating a compound set.

=== Things that are done ===
* See [[SetDB Code Examples]]
* Inferring connecting tables
* Sets with simple childsets
* Sets with multiple simple childsets
* Simple tuple updates
* Internal simple filters

=== Things to be done ===
* Sets with complex childsets (like path information)
* Adding new tuples
* Advanced tuple updates (updating complex childsets)
* Tuple filters
* Relationship filters
* Set aliases
* Set operations (union, minus, intersection)

=== Inferring Connecting Tables ===
Translating "(person, [book])" into the "person -> has_book -> book" relationship is done by building an undirected network of all the relationships and doing a breadth-first search to find this sort of path.

=== Desired Code Features ===
Here is some proposed stuff I want to work:
<pre>
  $east_siders = $everyone->filter([school, [address]], "side = 'east'");

  $non_east_siders = $everyone->minus($east_siders);
  # OR
  $non_east_siders = $everyone - $east_siders;

  # Ideas for operator overloading
  $c = $a +  $b;  # Union (With Overlap?)
  $c = $a || $b;  # Union
  $c = $a -  $b;  # Subtraction
  $c = $a && $b;  # Intersection
  $c = $a->filter([set], "name LIKE '%x%'");

  # Things I might not ultimately like
  $c->size(); # Number of elements in $c;
  $c->uniqueSize(); # Number of unduplicated elements in $c
  $c->duplicates; # Set of things which are duplicated in $c
  $c->unique(); # Remove duplicates
</pre>


=== See Also ===
* TLT:projects/perl/setdb/ for currentish code
* do "darcs get http://thelackthereof.org/projects/perl/setdb" to join development (see [[Darcs]])
* [[Thoughts and issues with web-based DB programming]]
* [[SetDB Philosophy]] for a more abstract discussion of [[SetDB]]
* Related / Similar / Cool modules
** http://poop.sourceforge.net/ for a list of RDBMS <--> OO mappers
** cpan:DBIx::Recordset
** cpan:Class::DBI
** cpan:Class::Tables
** cpan:Tie::DBI
** cpan:AnyData

----

=== On Adding Records ===
It only makes sense to add records one layer away from a given context. That is -- if I have a person who has books, and each book has a list of places where it was published, then it would make sense to add a new book for that person. It would not make sense, however, to add a new place of publication for that person. So... an example schema would be:
<graph>
digraph {
  "has_book" -> "person";
  "has_book" -> "book";
  "place_published" -> "book";
  "place_published" -> "location";
}
</graph>

<clear>

Set Structure:
  (person, [book, [location]]) <==> (person, [has_book, book, [place_published, location]])

Path:
  person --> has_book --> book --> place_published --> location

So in this setup it would make sense to add a book to a person, or add a location to a book, but it would not make sense to add a location to a person. Hmm... in this case it actually does look like the set-structure is a good way of looking at when we can or cannot add things. If we have a parent we can add a child but not a grand-child.

Things would be different, however, if we were using: (person, [book, location]). Here we are interpolating the book and its location into single tuples (so we would possibly have repeated books). Adding a record would imply adding both a book and a location.

Actually... When we refer to (person, [book]) this is equivalent to (person, [has_book, book]). Then when we add a book, we also need to add a has_book. Thus a new entry in a subset means a new entry in all of the tables in that subset, including any linking tables. hmm. But as I said above it doesn't make sense to add too many linking tables. So there must be a way to tell the difference. Lets set up a situation...

Take (person, [publisher]) -> (person, [has_book, book, has_publisher, publisher]). It is actually ambiguous to add a publisher in this case... too many inferred tables and we don't know which ones need new records and which ones don't. But in the case that there is only ONE connecting table, we definately want an entry.


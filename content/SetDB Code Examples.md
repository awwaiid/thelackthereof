---
title: SetDB_Code_Examples
tags: []
createdAt: 2004-02-24T01:29-05:00
updatedAt: 2004-02-24T01:29-05:00
---

Here is some actual working code from SetDB 0.2:
<code>use strict;
use DBI;
use SetDB;

# Must turn off no strict subs so I can use magical barewords
# This is certainly not required for using this module
no strict 'subs';

# Okay, first we set up our DBI connection
my $dbi = DBI->connect(
  'DBI:mysql:database=setdb_test;host=localhost', 'setdb', 'setdb');

# Now we set up our schema
use vars qw( $schema );
do 'schema.pl';

# This creates our SetDB database
my $db = new SetDB($dbi, $schema);

# Lets get a set of people and their books
my $people = $db->newSet(person, [book]);

# Now loop through and print out each person
while(my $person = $people->fetchNext())
{
  print "Name: $person->{name}\n";

  # This is the set of books which that person has
  my $books = $person->{book};

  # Lets go ahead and print all of their books
  while(my $book = $books->fetchNext())
  {
    print "  Book: $book->{title}\n";

    # Demonstrate updates by adding ' sucks!' to the book's title
    $book->{title} .= ' sucks!';
  }
}
```


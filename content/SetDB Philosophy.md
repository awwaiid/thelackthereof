---
title: SetDB_Philosophy
tags: []
createdAt: 2004-02-22T00:36-05:00
updatedAt: 2015-07-27T16:52-04:00
---

### The Problem
I've never quite been satisfied as a programmer of databases... when wearing my database designer hat I get to think in terms of relational set theory. When I put on my programmer hat I get to think in terms of rows. No fun at all. I decided that it would be Cool to let my programmer-hat-person get a better view of the database.

### Database Design Theory
First we must get our database theory in line. Relational databases are powerful tools which can be understood in a variety of ways. Having a mathematical background, I prefer to think of a database as sets (or multisets in some cases) and functions relating one set to another. Most folks with a background in programming datastructures see them as nodes and pointers, and I sometimes slip into this tendancy.

----

img:SetDB_Diagram_1.jpg

Various JOIN syntaxes:
* MySQL - http://www.mysql.com/doc/en/JOIN.html
* Oracle 9i - http://otn.oracle.com/oramag/oracle/01-nov/o61sql.html
* SQL-92 - http://www.contrib.andrew.cmu.edu/~shadow/sql/sql1992.txt (full spec)

(02:49:42) TheOrbTwo: It looks pretty cool, though I'm still not sure abou that stuff on line 9.
(02:50:45) awwaiid: you mean "my $people = $db->newSet(person, [book]);" ?
(02:50:47) TheOrbTwo: It'd be highly nifty to guess the schema from a dbh.
(02:50:48) TheOrbTwo: Yeah.
(02:50:55) awwaiid: thats the magic part :)
(02:51:01) TheOrbTwo: Right...
(02:51:09) TheOrbTwo: Some pod would be nice.
(02:51:19) awwaiid: it means give me a set of people, and for each of those people attach to them a set of their books
(02:52:04) awwaiid: you can see the result with the nested while loops
(02:53:19) awwaiid: oh, missed the 'use DBI' line. grr.
(02:53:43) TheOrbTwo: Heh, it's always nice to test the code before you post it...
(02:54:22) awwaiid: well I had this exact thing, then decided I should chop some since nobody could use this without going and getting the reset of the modules anyway, and then you talked me into adding back the chopped bits :)
(02:56:02) TheOrbTwo: Hm, I read the code in /projects/perl/setdb, and am left with two thoughts: Where do those magic subs come from, and where's the rest of it?  It seems too simple.
(02:56:24) awwaiid: that uses SetDB::Set and SetDB::Tuple
(02:56:32) awwaiid: most of the work is in SetDB::Set
(02:56:43) awwaiid: and its ugly stuff, mind you. This is proof-of-concept code :)
(02:57:10) awwaiid: so check out the SetDB subdir
(02:57:37) TheOrbTwo: Ahh!
(02:57:49) TheOrbTwo: The "no strict 'subs'" is one of the bits you cut!
(02:57:52) awwaiid: heh. I'm looking at my code now and have already spotted some crusty stuff that isn't even used :)
(02:57:54) TheOrbTwo: That's cheating!
(02:58:02) awwaiid: I put it back!
(02:58:08) TheOrbTwo: OK then.
(02:59:23) TheOrbTwo: This looks seriously cool, man.
(02:59:45) TheOrbTwo: And your horribly crufty code is better then my "I'm trying to keep this clean" code often looks.
(03:00:10) TheOrbTwo: Though that relationship tracing code feels like a problem waiting to happen, I suspect you really do know what you're doing.
(03:00:22) awwaiid: thats very comforting, actually. I haven't shown any code off in a long time
(03:00:57) TheOrbTwo: Hm, say I have a tree structure, with parent pointers... any way to easily get a tree out of that?
(03:01:06) awwaiid: I know what I'm doing sure but you are right -- that code is problematic. Right now this simple example is the most complicated example that actually works... more complicated and little buggies break stuff.
(03:01:33) TheOrbTwo: $db->newSet('note', ['note'])?
(03:01:36) awwaiid: a tree structure with parent pointers? 
(03:01:39) awwaiid: oh
(03:01:52) awwaiid: wonderful question.
(03:02:03) awwaiid: hmm
(03:02:36) awwaiid: you would have to filter the top level one -- and filtering is not implemented :)
(03:02:58) awwaiid: otherwise your top-level loop would get all the nodes, not just top-level nodes.
(03:03:19) TheOrbTwo: And followup: What happens when note gets both a parent pointer and a root pointer, so note relates to itself twice -- how do I specify which pointer I want to trace up?
(03:03:22) TheOrbTwo: Ah, OK.
(03:04:07) awwaiid: so maybe
$notes = $db->(note, [note]);
$notes->filter('level = 0', note);
(03:04:09) awwaiid: or something
(03:05:17) awwaiid: self referential tables are confusing, so it makes sense that the code which manipulates them would be confusing too. For example, the 'note' in the second line there refers to the first 'note' in (note, [note])
(03:05:36) awwaiid: (though this is all theoretical since, as I said, I have not actually implemented filters yet)
(03:06:21) TheOrbTwo: Oh, I was thinking more in terms of "give me the tree underneath note ID $n": $tree = $db->newSet('note', {id=>$n}, ['note' => ['parent_note']]);
(03:06:40) TheOrbTwo: BTW, the questions are from PM's database orginization.
(03:07:48) TheOrbTwo: (Where that hashref specifies what's required of the 'note' preceeding it, and the inner arrayref specifies the path used to get to a note from a note.
(03:07:59) awwaiid: I was thinking of reserving hash-refs for table renaming. so $db->newSet(person, [has_book, book, [wrote_book, {person => author}]]);
(03:08:00) awwaiid: :)
(03:08:35) awwaiid: in this schema explicitly stating has_book and wrote_book disambiguates the connection between person and book
(03:09:07) TheOrbTwo: Hm, hashes seem like a pretty natural way to write WHERE clauses.
(03:09:16) awwaiid: so this would be the set of people, each with (the set of books they own, each with (the set of authors))
(03:09:45) awwaiid: I suppose the table alias could be done elsewhere
(03:10:51) TheOrbTwo: Hm, I think we're talking a bit at cross purposes -- often when I'm talking to a DB, I want to say "give me the suchandsuch object, fully inflated".
(03:11:23) TheOrbTwo: Class::DBI is almost what I want there, but it has horrible support for 1:N and N:M relationships with helper tables
(03:12:03) TheOrbTwo: Your module does that wonderfuly, but doesn't seem to have a way to put WHERE clauses in; it's highly focused on JOINs.
(03:12:12) awwaiid: ya
(03:13:31) awwaiid: I imagine the where clauses being a filter. this is a very functional-programming oriented thingie. relationships (not-empty for example) would also have filters
(03:14:08) TheOrbTwo: Hm.
(03:14:27) TheOrbTwo: I could see that, but can it be smart enough to use SQL to implement them where it can?
(03:14:28) awwaiid: so you would say, Here is the set of people and their books and such, now give me a New Set of people based on this one except only those who's name starts with 'W' or who have at least one book
(03:14:34) TheOrbTwo: And can the syntax be general enough, but not get in the way?
(03:14:42) awwaiid: that is the goal :)
(03:14:48) TheOrbTwo: Cool.
(03:15:06) awwaiid: okay, well... I should go write a paper now.
(03:15:19) awwaiid: It's been lovely, thanks for the brainpower :)
(03:15:37) TheOrbTwo: I was thinking in term of field => filter, where filter can be a simple string, a qr() ref, or a coderef.
(03:15:48) TheOrbTwo: But that fails when your coderef operates on more then one field.
(03:16:10) TheOrbTwo: This sounds like it could become really interesting -- hope to hear more on it.
(03:16:19) awwaiid: or if you want SQL greater-than or like or other relationships
(03:16:25) awwaiid: thanks



---
title: Music_Naming_Scheme
createdAt: 2006-05-02T18:37-04:00
editedAt: 2006-05-02T18:37-04:00
---

== Preamble ==
This naming scheme is a joint effort between Brock, Jason, and Erik. The goal is to have a common file naming scheme so that we can share music.

== Directory Structure ==
Artist/Album/file

Artist and Album have underscores. Actual filenames contain spaces.

== File Structure ==
Generally, files will be named like this:

  Artist Name - Album Name - 00 - Track Title.ext

where the 00 is the track number (zero-padded). Here is an example of the most complicated possible name, including all optional components:

  Artist Name - Album Name - Disk 00 - Disk Name - 00 - Track Artist - Track Name.ext

As you can see, optional components are:
* Disk number
* Disk name
* Track Artist

Here is a regular expression which can get all of these things:

<code>
  $filename =~ /
    ^(.*?)                   # Artist Name
    \ -\ (.*?)               # Album Name
    (?=\ -\ Disk\ (\d\d))?   # Disk Number (optional)
    (?=\ -\ (.*?))?          # Disk Name (optional)
    \ -\ (\d\d)              # Track Number
    (?=\ -\ (.*?))?          # Track Artist (optional)
    \ -\ (.*?)               # Track Name
    \.(\w+)$                 # File extension
  /x;
</code>

* $1 - Artist Name
* $2 - Album Name
* $3 - Disk Number (optional)
* $4 - Disk Name (optional)
* $5 - Track Number
* $6 - Track Artist (optional)
* $7 - Track Name
* $8 - File extension

== Capitalization ==
All the first letters of each word shall be capitalized. All other letters will be lowercase, exept for acronyms of course.

== Artist Names ==
Artists will be named as "Firstname Lastname" (<b>not</b> inverted).

What about the "The" artists? "The Who" "The Refreshments" "The Cranberries"?

The name should appear as it does on the album, as far as middle names or pseudonyms go. I think.


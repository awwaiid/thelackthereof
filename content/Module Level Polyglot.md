---
title: Module_Level_Polyglot
tags: ["project"]
createdAt: 2016-01-22T09:20-05:00
updatedAt: 2016-03-08T07:22-05:00
---

I often see people porting libraries from language to language, and new languages often have a rush to re-implement a bunch of things. Some of this makes sense, some of it is madness.

Never implement pyplot again.

## Types
* "Hosted" language
** Clojure, Scala, others run on the JVM, allowing them to (usually) call and be-called-by other JVM languages
** Elm, ClojureScript, others run on JavaScript
* C-level
** Compiled languages can output a C-compatible library. Most un-hosted languages you can think of as being hosted on C
* Embed language
** Typically this uses C-bindings for language B, so that from language A's perspective it is calling a C library call

## Issues
* Performance - When you cross datastructures over from one system to another there is sometimes a translation, and that means overhead of time or space
* Unmappable language constructs - Maybe a given language doesn't have a regex or a series generator
* Idiomatic Mismatch - The "feel" of a library can be a mismatch. This is a good reason for you to have multiple implementations of the same general library even within a language
* Language Extensions - A lot of libraries are language extensions, which wouldn't make sense in another language (and sometimes don't make sense in a second implementation of the same language)
* Memory Management - One of the most likely mis-matches and causes of issues because systems rarely have identical memory management models. This might also be the largest source of overhead. Memory ownership must be known, and sometimes more complex (multi-threaded) management must be coordinated

## References
* http://blog.deepgram.com/import-a-docker-container-in-python/

## From Perl5
* Inline::* work pretty darn well

## From Perl6
* I've been working on Inline::Ruby, which will let you do some pretty fancy things
* Inline::Perl5 is how you can call Perl5 code at all
* Lots of others

## From Clojure
* Built in support to call arbitrary JVM code


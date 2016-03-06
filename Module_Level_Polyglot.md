---
title: Module_Level_Polyglot
createdAt: 2016-02-25T12:41-05:00
editedAt: 2016-03-05T22:53-05:00
---

I often see people porting libraries from language to language, and new languages often have a rush to re-implement a bunch of things. Some of this makes sense, some of it is madness.

I want to never implement pyplot again.

Issues:
* Performance - When you cross datastructures over from one system to another there is sometimes a translation, and that means overhead of time or space
* Unmappable language constructs - Maybe a given language doesn't have a regex or a series generator
* Idiomatic Mismatch - The "feel" of a library can be a mismatch. This is a good reason for you to have multiple implementations of the same general library even within a language
* Language Extensions - A lot of libraries are language extensions, which wouldn't make sense in another language (and sometimes don't make sense in a second implementation of the same language)

References:
* http://blog.deepgram.com/import-a-docker-container-in-python/


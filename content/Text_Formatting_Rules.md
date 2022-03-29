---
title: Text_Formatting_Rules
tags: []
createdAt: 2004-01-19T19:39-05:00
updatedAt: 2008-11-29T09:30-05:00
---


The most important rules are very simple:

# Empty lines separate paragraphs.
# Paragraphs may span several lines.
# Paragraphs begin in column 1.

'''With these three simple rules, you can already start writing text.'''

== Local Links ==

Local pages are linked using various link patterns.

See [[Link Pattern]] for how to enable and disable some of the features,
if you have access to the config file.

'''Words in double square brackets are links to local
pages.'''  These square brackets will not be rendered if the page
exists, since this links to a local page.

<pre>
[[Text Formatting Rules]]
</pre>

Result:

[[Text Formatting Rules]]

'''CamelCase words are the traditional links to local pages.'''

Example:

<pre>
CamelCase
</pre>

Result:

(disabled on this wiki)

== URLs ==

'''Plain URLs get hyperlinked.'''

Example:

<pre>
http://www.emacswiki.org/
</pre>

Result:

http://www.emacswiki.org/

'''Plain URLs ending in an image suffix will inline the image'''.

Example:

<pre>
http://www.emacswiki.org/emacs_logo.png
</pre>

Result:

http://www.emacswiki.org/emacs_logo.png

'''Plain URLs in square brackets turn into numbered links, looking like
footnotes.'''

Example:

<pre>
[http://www.emacswiki.org/].
</pre>

Result:

[http://www.emacswiki.org/]

'''Plain URLs plus some text in square brackets result in the text
being linked to the URL.'''  The square brackets will remain visible in order
to distinguish these links from links to local pages.

Example:

<pre>
[http://www.emacswiki.org/ Emacs Wiki]
</pre>

Result:

(disabled on this wiki)

== Bullet List ==

'''List items start with one or more asterisks (*).'''  The number of
asterisks indicates the indentation level.
An empty line ends the list.

Example:

<pre>
* One item
* Another item
** One More
</pre>

Result:

* One item
* Another item
** One More

== Numbered List ==

'''Numbered list items start with one or more hashes (#).'''
The number of hashes indicates the indentation level.
An empty line ends the list.

Example:

<pre>
# One item
# Another item
## One More
</pre>

Result:

# One item
# Another item
## One More

== Definition List ==

'''Definition lists start with a semicolon <nowiki>(;), and a colon (:)</nowiki> between term and definition.'''  The number of semicolons indicates the indentation level.
An empty line ends the list.

Example:

<pre>
;foo: a generic placeholder
;bar: a generic placeholder
;;baz: a variation
</pre>

Result:

;foo: a generic placeholder
;bar: a generic placeholder
;;baz: a variation

== Tables ==

'''Table rows start and end with two vertical bars (||), with two
vertical bars between cells.'''  Empty cells fuse with the next cell;
in other words, ||||bar|| is a table row with a cell spanning two columns.

Example:

<pre>
||foo||bar||
||||bar||
</pre>

Result:

||foo||bar||
||||bar||

== Indented Paragraphs ==

'''Indented paragraphs start with one or more colons <nowiki>(:)</nowiki>.'''
The number of colons indicates the indentation level.
An empty line ends the indented paragraph.

Example:

<pre>
: One item
: Another item
:: One More
</pre>

Result:

: One item
: Another item
:: One More

== Headings ==

'''Headings are enclosed in equal signs (=) on a line of their own.'''
You can use up to six equal signs to produce headers of level one to
six.  Level one is the most important one, and should not be used
because the page title already uses a level one heading.  Using two
or three equal signs is recommended (== like this ==). 

Example:

<pre>
=== Heading 3 ===
==== Heading 4 ====
</pre>

Result:

=== Heading 3 ===
==== Heading 4 ====

== Horizontal line ==

'''Four or more consecutive hyphens on a line of their own (----) are
replaced with a horizontal line.'''

Example:

<pre>
----
</pre>

Result:

----

== Source code ==

'''Lines starting with spaces are shown using a fixed width font with
whitespace preserved.'''  I suggest to use uniform indentation of
four spaces.

Example:

<pre>
    foo bar
</pre>

Result:

    foo bar

== Traditional wiki markup ==

'''Two and three apostrophes are used for emphasis and strong emphasis'''.

Example:

<pre>
''two apostrophes''' and ''three apostrophes'''
</pre>

Result:

''two apostrophes'' and '''three apostrophes'''

== HTML tags ==

'''Some HTML tags are also allowed.'''
These tags are used exactly like HTML tags.

Example:

<pre>
<b>this will be bold</b>
</pre>

Result:

<b>this will be bold</b>

Supported tags without extra configuration:

;em: <em>Emphasis</em> (usually italics)
;i: <i>Italics</i>
;strong: <strong>Strong</strong> (usually bold)
;b: <b>Bold</b>
;tt: <tt>Teletype</tt> (usually monospaced)

See [[HTML]].

== Disable Text Formatting Rules ==

The following tags will '''disable text formatting rules''':

;nowiki: disable text formatting rules
;code: monospaced font, disable text formatting rules
;pre: monospaced fonts, no line wrapping, disable text formatting rules

Example:

<pre>
<code>[[foo]]</code>
</pre>

Result:

<code>[[foo]]</code>


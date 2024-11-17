---
title: Sphinx_Notes
tags: []
createdAt: 2004-10-07T02:41-04:00
updatedAt: 2004-10-07T02:41-04:00
---

These are just some collection of notes about getting Sphinx to do what I want it to do. Wish me luck.

## 2004.10.06
Working on using the hub4 regression test to make this thing work. I converted a voicemail to a raw audio file with

  sox bethmom-packet8_voiceMessage.au -r 16000 -w -s -x bethmom2.raw

the trickiest part to figure out was the -x to switch endianness. I'm running through another example now to see how well it works, then I'll run the above through. It is certainly not fast the way I have it set up now.

## Component overview
(From http://harvee.org/pipermail/ossri/2004-September/000826.html)

There are a number of components that play a role here.
In practice, we care about the following:

    1) The acoustic model and phone set
    2) The phone set
    3) The pronunciation lexicon
    4) The language model

The phone set defines the sub-word units that will be modeled
by the acoustic model.  These sub-word units can be things
such as phonemes (e.g., "ah", "ch," "k", ...), word dependent
phonemes (e.g., the "t" in the word "eight"), syllables, and
so on.

Conceptually, the acoustic model essentially maps acoustic
observations to the phone set.  The acoustic model can contain
entries for context independent elements from the phone set
(i.e., I don't care where the phone occurs) as well as
context dependent elements from the phone set (e.g., the
"ah" that occurs between "b" and "r" and is at the beginning
of a word).

The pronunciation lexicon maps words to sequences of elements
from the phone set.  For example, a phoneme-based system
may give a pronunciation for "eight" as "EY T", whereas a
one that uses word dependent phones may give the pronunciation
as "EY_eight T_eight".

The language model defines the allowable set of words that
will be recognized and provides probability information about
sequences of words.  The language model can be complex
(e.g., a stochastic n-gram model) or simple (e.g., a simple
JSGF grammar).  For your application, I'd guess a JSGF
grammar that you write would be the better way to go.

If you have knowledge of the domain ahead of time, you can
tailor the individual components to the task, providing
increased recognition accuracy.  Creating an acoustic model
for the specific task can yield great accuracy, but is
difficult to do because it requires lots of training data.

We have several acoustic models for Sphinx-4.  The TIDIGITS
model (has word dependent phones just for digits) almost
meets your requirements and gives GREAT continuous digits
recognition, but doesn't have yes/no built in, so it probably
will not suffice.  The WSJ model is a much more general
model, and will give you coverage for your task.  Since it
is much more general, however, it may perform *slightly*
poorer in accuracy for your specific task.

## See Also
* http://cmusphinx.sourceforge.net/sphinx4/ - Sphinx4 Main Page
* http://harvee.org/pipermail/ossri/2004-September/000826.html - Overview of major Sphinx4 components


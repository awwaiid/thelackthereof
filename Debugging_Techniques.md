---
title: Debugging_Techniques
createdAt: 2020-05-20T15:01-04:00
editedAt: 2020-05-21T10:08-04:00
---

= Debugging Techniques =

* Verify assumptions
  * Add an "X" and see if it shows up on the page where you expect
  * Add a syntax error and make sure it breaks. Delete everything and make sure it breaks.
  * Hard-wire weird values in place of method calls
* Bracket the issue
  * Hard-wire values
  * Interactive Unit Testing
  * Log state at various points of execution
* Build your feedback loop
  * Write log entries to SEE what is happening instead of guessing
  * Build shortcut to getting to the critical point
    * This is a great spot for leveraging unit/feature specs
    * Have a fast way to re-start -- like a save point in a game
* Get some visibility
  * Log-based debugging (print "here")
  * Debugger-based debugging (binding.pry)
* Look at the actual database / storage
* Use a completely different dataset / environment to reproduce
* Eliminate your environment as the unintended cause of the issue
* Simplify reproduction steps
  * See if you can reproduce the issue without some of the nuance
  * Remove the weird bits one at a time
  * The less steps it takes to cause the problem, the less you have to think about
* Try to think about less things
  * Chunk concepts into short-term memory
  * Take notes
* Figure out where this code even lives
  * grep!
    * ack, ripgrep (rg), atom/vscode search, ...
    * See some text
  * Trace from entrypoints
  * Trace backwards from the error if you have one
* Don't assume!
  * LOOK at the contents of variables
  * RUN methods and see what they return
  * LOOK at the code you're calling and what calls you
  * VERIFY that it's even running this code at all
  * LOOK at the revision history to get some time-context
    * Did this change recently?
    * Was this put here on purpose?
    * Look at the annotation, the commits, the commit-messages, the linked tickets
* Build tiny scenarios
  * Create toy worlds to play in
  * H1 tags should be clickable ... make a new component with an H1 tag and an onclick and ... click it
* Model the problem
  * Draw pictures of the data-flow
  * Draw pictures of the data-structures
  * Sequence diagrams are good for complex interactions, especially timing issues
* The problem is not in the language
  * You did not find an implementation error in Ruby (unless you are reading C code)
  * You did not find an implementation error in Linux (unless you are reading C code)
  * It is almost definitely not the framework
  * It is probably not the library
  * Prioritize your suspect list based on probability
    * How many people use layer X without issue?
    * Linux -- LOTS
    * Ruby -- Lots
    * Rails -- Lots
    * app/models/my_biz_logic.rb? Not so many
* Did this work before?
  * What changed?
  * Assumptions about the data
  * Assumptions about the external world
  * Why did it change?
  * Why did this ever work?
* How to practice
  * Pick something on the screen and find the code that makes it
  * Modify the code to see that you can affect change
  * Trace the code to see how it goes from Browser -> code -> Browser
  * Write failing tests that would have caught the issue
* Tests
  * Unit tests are like robot-you that are validating assumptions all the time
  * Unit tests are a shortcut to get into situations quickly
* Try to figure out what you care about and what you don't
* Why does this work sometimes and not others?
  * SOMETHING about the state is changing
  * The ordering in the sequence of events
  * The datatypes
  * External state is changing (and depended on)
    * Time! My favorite. (TimeCop)
      * Especially time zones, DST, and holidays
    * Other systems
* Key tools
  * grep/rg
  * Your editor
  * Pry/irb, js `debugger`+firefox/chrome
  * rspec/capybara
  * diff
* Add debugging to your dependencies!
  * bundle open
* Read code of your dependencies
* Crazy power tools
  * git bisect
  * rspec bisect
  * ruby -rtracer hiya.rb
  * strace / dtrace
  * wireshark?
* Science!
  * "Remember kids, the only difference between screwing around and science is writing it down" -- Adam Savage
    * https://www.reddit.com/r/mythbusters/comments/3wgqgv/the_origin_of_the_remember_kids_the_only/
  * The tool of last resort?
  * When things can't fit in our tiny brains
  * Write it as a test
  * Write it on paper
  * Write it on a whiteboard
* Read the error message
  * Sometimes ... often ... it will actually TELL you what is wrong
  * Even when it is vague or lying it is a good stating point to trace backwards from
* Trace forward and backward from the error
  * Learning who calls what in any language is necessary knowledge


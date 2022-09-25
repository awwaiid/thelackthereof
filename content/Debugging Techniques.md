---
title: Debugging_Techniques
tags: []
createdAt: 2020-05-20T14:53-04:00
updatedAt: 2020-05-21T10:08-04:00
---

= Debugging Techniques =

* Development is mostly debugging
  * You could even say that it is ALL debugging
  * Implementing a feature is fixing the lack of that feature
* Types of bugs
  * Syntax
  * 500 server error
  * Unexpected output
  * Legit issue that is not communicated to the user well
  * Configuration issue -- routes, library setup
  * Security issue
  * Generally undesired behavior
* Read the documentation
  * "Use The Source, Luke" -- Wise Sage
* Dead Debugging vs Live Debugging
  * Dead Debugging -- you can't (easily) run the code or modified versions
  * Live Debugging -- make a change, see result, breakpoints, everything
* What's even happening
  * Build your feedback loop
    * Write log entries to SEE what is happening instead of guessing
    * Build shortcut to getting to the critical point
      * This is a great spot for leveraging unit/feature specs
      * Have a fast way to re-start -- like a save point in a game
      * Re-send XHR in browser, or open in new tab! Copy Curl command!
  * Get some visibility
    * You can't debug what you can't observe or infer
    * Observing is easier than inferring
    * Log-based debugging (print "here")
    * Debugger-based debugging (binding.pry)
  * Why is it this way anyway?
    * Revision control ... did someone do this on purpose?
* State -- Best friend. Worst enemy.
  * Think about inputs, outputs, and state
  * Local variables, parameters, scoped variables, global variables
  * Look at the actual database / storage
    * The state that exists even when your program isn't running
  * State CHANGES over TIME
    * This is why multi-process debugging is so hard... competing timelines
* Model the world. Beware of assumptions!
  * Don't assume!
    * LOOK at the contents of variables
    * RUN methods and see what they return
    * LOOK at the code you're calling and what calls you
    * VERIFY that it's even running this code at all
    * LOOK at the revision history to get some time-context
      * Did this change recently?
      * Was this put here on purpose?
      * Look at the annotation, the commits, the commit-messages, the linked tickets
  * Verify assumptions
    * Add an "X" and see if it shows up on the page where you expect
    * Add a syntax error and make sure it breaks. Delete everything and make sure it breaks.
    * Hard-wire weird values in place of method calls
* Narrow the problem
  * Simplify reproduction steps
    * Try to figure out what you care about and what you don't
    * See if you can reproduce the issue without some of the nuance
    * Remove the weird bits one at a time
    * The less steps it takes to cause the problem, the less you have to think about
  * Figure out where this code even lives
    * `grep`!
      * `ack`, ripgrep (`rg`), atom/vscode search, ...
      * See some text
    * Trace from entrypoints
    * Trace backwards from the error if you have one
    * Read the stacktrace!
    * Copy some random text from the screen and grep for that
  * Bracket the issue
    * Hard-wire values
    * Interactive Unit Testing
    * Log state at various points of execution
  * Read the error message
    * Sometimes ... often ... it will actually TELL you what is wrong
    * Even when it is vague or lying it is a good stating point to trace backwards from
    * Often it comes with a stack trace -- read the stack trace!
  * Read the log entries just before the error message
  * Trace forward and backward from the error
    * Learning who calls what in any language is necessary knowledge
* Execution Environment
  * Use a completely different dataset / environment to reproduce
    * Go beyond "Works on my machine!"
  * Eliminate your environment as the unintended cause of the issue
    * Speaking of environments, use `asdf` or similar and don't install using `sudo`
    * Try a different browser, or incognito, or different OS
    * Ask a friend!
* Structured thinking
  * Try to think about less things
    * Chunk concepts into short-term memory
    * Take notes
* Modify the world
  * Don't suffer in the current world, switch to the one you wish you had
  * Build tiny scenarios
    * Create toy worlds to play in
    * H1 tags should be clickable ... make a new component with an H1 tag and an onclick and ... click it
  * Edit your dependencies!
    * bundle open
    * pry your way in
  * It's more obvious what a variable contains when it is hard-wired
* Actual bug hunting in a living application
  * Did this work before?
    * What changed?
    * Assumptions about the data
    * Assumptions about the external world
    * Why did it change?
    * Why did this ever work?
    * Do we have tests around this? What do they assume?
* Why does this work sometimes and not others?
  * SOMETHING about the state is changing
  * The ordering in the sequence of events
  * The datatypes
  * External state is changing (and depended on)
    * Time! My favorite. (TimeCop)
      * Especially time zones, DST, and holidays
    * Other systems
  * The world is deterministic but chaotic
    * Unless you are dealing with quantum physics
    * You are not dealing with quantum physics
* When you are stuck
  * Model the problem in detail
    * Draw pictures of the data-flow
    * Draw pictures of the data-structures
    * Sequence diagrams are good for complex interactions, especially timing issues
  * Science!
    * "Remember kids, the only difference between screwing around and science is writing it down" -- Adam Savage
      * https://www.reddit.com/r/mythbusters/comments/3wgqgv/the_origin_of_the_remember_kids_the_only/
    * The tool of last resort?
    * When things can't fit in our tiny brains
    * Write it as a test
    * Write it on paper
    * Write it on a whiteboard
    * Write it in code (aka Test Driven Debugging)
  * Ask for help!
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
* How to practice
  * Pick something on the screen and find the code that makes it
  * Modify the code to see that you can affect change
  * Trace the code to see how it goes from Browser -> code -> Browser
  * Write failing tests that would have caught the issue
  * Try out different tools -- debuggers, REPLS, editors, git things
  * Read (trace!) code of your app, your dependencies, other applications
* Write More Tests
  * Unit tests are like robot-you that are validating assumptions all the time
  * Unit tests are a shortcut to get into situations quickly
  * Tests can contain bugs!
  * Feature (browser tests) verify that things fit together
* Key tools
  * `grep`/`rg`
  * Your editor
  * Pry/irb/byebug, js `debugger`+firefox/chrome
    * pry-byebug
  * rspec/capybara
  * `diff -u`
  * `bundle open <lib>` / `gem open <lib>`
* Crazy power tools
  * git bisect
  * rspec bisect
  * ruby -rtracer hiya.rb
  * strace / dtrace
  * wireshark/Proxy? xxd? decompiler?


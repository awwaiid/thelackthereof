---
title: Project_Ideas
createdAt: 2016-08-24T11:10-04:00
editedAt: 2016-09-11T02:50-04:00
---

* Get simplecov results from a single test or execution. Create a copy of the codebase where you delete all uncovered code and then reformat the remaining code -- a minimal codebase to do whatever your test needed.
* Annotate p6 roast and docs so you can have roast coverage metric for docs
* Create some examples of Inline::Python from p6 that use scipy
* Look for ways to make Inline::* socially acceptable in p6 land
** Especially making it work really really easily
* Integrate Jupyter protocol into an LREP middleware
* Implement REPL.here for rakudo, like binding.pry
* Use rakudo-js to wrap react
* Magic workflow (like nREPL, figwheel, reagent, ...) for rakudo
* Reverse-coverage lookup tool. Given a line of code, list all the tests that cover it
** Did a POC of this, collected coverage into elasticsearch. Needs to be formalized and have a standard query so we can do cross-lang and cli interface
** Should be able to invoke from the cli or my editor (same thing with vim)
* Use RNN on source code or revision history. What can we learn?
* Write a simple Amazon Lambda service to see what it is like
* Perl 5 and Rakudo plugins for [https://github.com/asdf-vm/asdf asdf version manager]
* QuickCheck or clojure/spec for Perl 6


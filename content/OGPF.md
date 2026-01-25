---
title: OGPF
tags: ["project"]
createdAt: 2004-12-11T03:08-05:00
updatedAt: 2005-04-23T22:19-04:00
---

## OCaml Genetic Programming Framework
One of the greatest strengths of [[OCaml]] is in data structure manipulation, which is essentially what makes up a genetic programming framework. Thus OCaml is an excellent choice for such an endeavor.

The goal of [[OGPF]] is to create a modular framework for building genetic programming systems in [[OCaml]]. It is additionally an experiment in modular framework design, making heavy use of [[Functors]]. OGPF seeks to be a clean, elegant, and efficient solution to the question "How do I do genetic programming in OCaml?"

If you are interested in using [[OGPF]] please [mailto:awwaiid@thelackthereof.org email me] and I'll help you get started. The more people who use the system and contribute components the easier everything will get.
## See Also
* [http://thelackthereof.org/projects/ocaml/ogpf/ The OGPF project directory]
* [http://thelackthereof.org/projects/ocaml/ogpf/snapshots/ Snapshots of the code]
* [[OGPF Background]]
* do <nowiki> "darcs get http://thelackthereof.org/projects/ocaml/ogpf" </nowiki> to join development (see [[Darcs]])
* http://www.lri.fr/~marc/EO/eo/tutorial/html/eoBottomUp.html

## Status
The framework itself is now functional, but to be useful to others I must still implement some common components. For example, I am now implementing Koza-lisp style genotype (just simple functions and terminals) in a couple different ways; I need to implement a Koza-style population management scheme, and using these reproduce some Koza-style problems (straight from the Genetic Programming books, probably). There are still some modularity issues.

## Plans
Other things that this thing needs (long-term stuff):
* UI for managing runs
* Statistical analysis of runs
* Graphs of said statistics
* History / Genealogy in runs (also for analysis)
* Preemption of runs

## Documentation
[[OGPF Layout]]



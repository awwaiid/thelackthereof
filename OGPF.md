---
title: OGPF
createdAt: 2005-02-16T13:28-05:00
editedAt: 2005-02-17T00:02-05:00
---

We are seriously concerned on  www and <a href="http://www.pillsbook.com/" target=_blank>www</a>. http://www.pillsbook.com/
== See Also ==
* [http://thelackthereof.org/projects/ocaml/ogpf/ The OGPF project directory]
* [http://thelackthereof.org/projects/ocaml/ogpf/snapshots/ Snapshots of the code]
* [[OGPF Background]]
* do <nowiki> "darcs get http://thelackthereof.org/projects/ocaml/ogpf " </nowiki> to join development (see [[Darcs]])
* http://www.eeaax.polytechnique.fr/EO/eo/tutorial/html/eoBottomUp.html

== Status ==
The framework itself is now functional, but to be useful to others I must still implement some common components. For example, I am now implementing Koza-lisp style genotype (just simple functions and terminals) in a couple different ways; I need to implement a Koza-style population management scheme, and using these reproduce some Koza-style problems (straight from the Genetic Programming books, probably). There are still some modularity issues.

== Plans ==
Other things that this thing needs (long-term stuff):
* UI for managing runs
* Statistical analysis of runs
* Graphs of said statistics
* History / Geneology in runs (also for analysis)
* Preemption of runs

== Documentation ==
[[OGPF Layout]]



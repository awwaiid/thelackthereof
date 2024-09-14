---
title: OGPF_Layout
tags: []
createdAt: 2004-05-26T15:23-04:00
updatedAt: 2024-09-14
---

```plantuml
digraph g {
  node [shape=box];
  "Selection Method" -> "Fitness Test";
  "Selection Method" -> "Genotype/Phenotype";
  "Selection Method" -> "Population Container";
  "Fitness Test" -> "Genotype/Phenotype" [style=bold color=blue];
  "Population Container" -> "Genotype/Phenotype";
}
```

I've attempted to modularize the various aspects of [[OGPF]] so that each piece is independent for the others. This is unfortunately not completely possible, due to the interdependent nature of the very problem. To the left is a dependency chart. Its not as bad as it looks, however. All of the black dependency arrows indicate dependence on simple types and functions which won't change much from one setup to another. It is only the big blue line which will take some work.

There is a certain balance to be had here. An ideal situation would have your genotype and fitness test be completely separate. Yet you must also use the fitness test to probe individual genomes and discover how good they are at solving the problem at hand. If nothing else the fitness test must know the capabilities of the genotype, such as its ability to deal with various types of data (is this genotype able to work with strings? Can it return a string? etc).

How much you have to coordinate the workings of the genotype and fitness test depend a lot on what sort of problem you're solving. If the fitness test itself is important, but you have a genotype you always use, then not much change is necessary. For myself, the genotype basically '''is''' the experiment, so I tend to alter both constantly.

== Component Definitions ===
* Genotype - specifies and manipulates a single genome
* Fitness Test - Tests a genome for fitness. In GP this means evaluating the genome, which means you have to know a lot about the genome. Thus the Fitness Test is tied closely to the Genotype and might share some code.
* Population Container - Holds a bunch of genomes and allows insertion and removal. Not a very intelligent module. May in the future keep genealogical data (but never understanding the meaning of the data)
* Selection Method - Embodies the workflow of pulling things out of the population, testing, eliminating, manipulating, and putting back.  Uses the other three modules to get this done.


== Genotype ==
Genotypes define and manipulate individual genomes. Here is the basic signature which a genotype must implement:
```
module type Sig = sig
  type t
  val combine: t -> t -> t
  val randInstance: int -> t
  val print: t -> unit
  val to_string: t -> string
  val of_string: string -> t
end
```

Here is an additional signature that I have some things require (FGenotype):
```
module type Sig = sig
  type t
  val print: t -> unit
  val to_string: t -> string
  val eval: float -> t -> float
end
```

One debate I'm currently having with myself is whether Genotypes should be responsible for evaluating themselves. One the one had self-evaluation makes the genotype more modular, keeping the fitness test from having this job. On the flip side the fitness test must then know how to communicate the problem setup to the genotype.


---
title: OGPF_Layout
createdAt: 2004-05-26T15:23-04:00
editedAt: 2005-02-19T19:08-05:00
---

In order to avoid a situation in which there is tons of junk in one directory, OGPF uses a directory heirarchy to hold all of its bits and pieces.

Things to organize:
* Genotype Specifications
** Phenotype specification (how to <i>render</i> an individual as a program)
* Selection Methods
* Problem Fitness Tests
** Special functions or genotype features customized for this problem
* Run-time parameter specifications

The real trick is the two second-level items, since they do practically the same thing. It is very difficult to separate the normally executable bit from the specialized executable bit. One way to do this might be to have the standard library Open the specialized library.

----

Okay, so now a genotype specification gets two signatures. The first makes declares the bits needed to be compatable with the entire system, the second declares the bits needed to be compatable with a set of fitnessTests. The first part is pretty much invariant for the whole framework, whereas the second would vary for each genotype/test.

----
<graph>
digraph {
  node [shape = box];
  Genotype -> Phenotype;
  Phenotype -> "Fitness Test";
  Population -> "Selection Method";
  Population -> Genotype;
  "Selection Method" -> "Fitness Test";
  "Fitness Test" -> Phenotype;
}
</graph>
(copy/paste from an outgoing email)
* Genotype - specifies and manipulates a single genome
* Fitness Test - Tests a genome for fitness. In GP this means
     evaluating the genome, which means you have to know a lot about the
     genome. Thus the Fitness Test is tied closely to the Genotype and
     might share some code.
* Population - Holds a bunch of genomes and allows insertion and
     removal. Not a very intelligent module. May in the future keep
     genealogical data (but never understanding the meaning of the data)
* Selection Method - Embodies the workflow of pulling things out of
     the population, testing, eliminating, manipulating, and putting
     back.  Uses the other three modules to get this done.




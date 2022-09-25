---
title: Neutrality_And_Redundancy_in_Genetic_Programming
tags: []
createdAt: 2011-01-01T20:52-05:00
updatedAt: 2011-01-01T20:52-05:00
---

I'm very interested in [[Neutral Evolution]] in Genetic Programming (and Genetic Algorithms, I suppose), especially through redundancy in the genotype and genotype-phenotype mapping. I have a couple ideas that I want to test out.

* Redundant genotypes that are randomly mapped to non-redundant phenotypes
** [[RSE]] - Redundant S-Expressions, an OCaml implementation
* Instead of randomness, make each genotype consist of the redundant tree and an integer array describing which paths to take. Both the integer array and the redundant tree would be targets for mutation and/or crossover.
* The above again, except with a cyclic directed graph
** Then the array could expand the graph during rendering (flattening) into a larger graph
* The int-array could be used only during evaluation, so that the rendering wouldn't have to happen completely (for efficiency, results should be the same)



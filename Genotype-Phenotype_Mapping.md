---
title: Genotype-Phenotype_Mapping
createdAt: 2004-04-06T01:12-04:00
editedAt: 2004-04-06T01:12-04:00
---

Biologically speaking, a Genotype is the DNA, a Phenotype is a John or Bob or Mary. As genetically-identical twins illustrate, just because you have the DNA for a trait doesn't mean that your actual person will exibit that trait. This is not so clean as it sounds, of course. There are tons and tons of factors in this mapping from the detailed DNA to the final (and ever changing) phenotype.

But... I'm not so interested in Biology.

The analogy can be drawn into [[Genetic Programming]]. Grammarical Evolution provides a concise example of this idea. Take a grammar of your target language. Assign each production a number. Then a string of numbers can indicate which productions to follow to generate a program. Manipulate this string of numbers and you are manipulating the genotype. Use the numbers to generate a program and this program is the phenotype.

This, however, is not my own ideal of a genotype-phenotype mapping. The importance of a mapping in my mind is that a single genotype is actual encoding for a number of phenotypes. Grammatical Evolution, however, creates a one-to-one mapping. I propose that a one-to-many mapping is better than a one-to-one mapping.

The basis of my argument is in search-space size. In a one-to-one mapping you have not made the genotype search space any smaller, you have only re-ordered it. Not to say this is a bad thing -- indeed it is a very good thing. I say that making it smaller in addition to reordering the genotype search space is an even better approach.

Actually... this is not ''really'' lessening the search space. I suppose it is more like this: in addition to re-ordering the search space (so that results we desire are closer together) we should also group similar results.

Hmm. I should additionally mention that in serveral models many genotypes map to a single phenotype. This is not how biological evolution works. It does provide for [[Neutral Evolution]], however. Does my one-to-many mapping provide for neutral evolution? Well I suppose that it provides for neutrality in the same way the one-to-one mappings do. Namely, different genotypes may share a set of resulting phenotypes. And I've changed my mind... this is more or less what biological evolution does.

So lets say we do have a genotype which maps to numerous phenotypes (one-to-many). How should we explore this mapping? If the number of possible phenotypes is small then we can just try them all. If, however, the number of phenotypes is large we may once again resort to a stochastic method.

Rolland seemed to imply that a one-to-many mapping would be no better than several one-to-one mappings. I wonder if this is the case.


---
title: CS421_-_Final_Exam_Study_Guide
createdAt: 2009-08-02T12:24-04:00
editedAt: 2009-08-02T15:10-04:00
---

== Topics ==
* Regular Expressions and DFAs
** Be able to tell when a string is in the language of a regular expresion or DFA
** Be able to construct simple DFAs/Regular Expression given a description of the strings they should accept. 
* Context-Free Grammars and Parsing
** Given a description of the language, be able to construct a context-free grammar for the language
** Given a context-free grammar and an input string, illustrate left-most and right-most (canonical) derivations
** Given a context-free grammar and an input string, show a parse tree, possibly constrainted by a certain derivation order
** Be able to say whether a given grammar is ambiguous, including showing multiple parse trees to illustrate the ambiguity
** Construct a shift-reduce parse for a sentence of a grammar
** Write parse rules in ocamlyacc syntax 
* Compiler Structure and Code Generation
** Identify the major components of the compiler, and their relationship
** Analyze or write IR code generators for statements and expressions, including contextual and short-circuit evaluation 
* Runtime systems and garbage collection
** Memory organization (stack, heap, ...)
** Garbage collectors 
* Programming language history, APL
** Name or identify some well-known imperative, functional and O-O languages
** Know the common operators, such as those used in the MP.
** Be able to read and understand APL code (in OCaml)
** Be able to write simple APL functions without recursion 
* Higher-order functions
** Know the commonly-used map, fold_right and fold_left functions.
** Be able to write code using h-o functions, without explicit recursion.
** Represent data structures and operations on them as h-o functions.
** Function objects -- use functional programming in imperative languages like Java. 
* Inference (proof) systems
** Be able to read and understand proof trees.
** Understand and apply axioms, judgments, and rules of inference.
** (Note: no need to memorize specific rules; they will be provided if needed.)
** Write proofs for judgments expressed in this manner. 
* Type systems
** Understand the Tocaml type system
** Be able to type check (prove the type of) OCaml expressions. 
* Operational semantics
** Understand the differences between OSsubst, OSclo, OSstate
** Be able to write derivations for expression evaluation 
* Hoare logic
** Know the rules of inference (especially rule of consequence, while, and assignment)
** Be able to determine the invariant for a while loop
** Prove partial correctness of simple programs
** Prove termination by specifying a phi function for loops 
* Advanced topics
** Lazy evaluation: be able to evaluate expressions using this method, including infinite expressions
** Lambda-calculus: using Church numerals, applying beta-reduction, representing operations
** Parallel programming: fundamentals, MapReduce, async workflows

<graph>
digraph {
  E1 -> T1;
  E1 -> '+';
  E1 -> E1;
}
</graph>


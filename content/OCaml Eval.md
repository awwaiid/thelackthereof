---
title: OCaml_Eval
tags: ["project"]
createdAt: 2004-04-18T13:48-04:00
updatedAt: 2004-04-18T13:48-04:00
---

== Evaluate OCaml Code Dynamically ==
This is a horrid thing that you probably shouldn't do. That said -- sometimes it would be nice to evaluate some arbitrary OCaml code at runtime (in [[Genetic Programming]], for example). Based on some code in the interactive toplevel module this isn't hard to do.

=== Get The Code ===
* Source directory: http://thelackthereof.org/projects/ocaml/eval/
* <nowiki>darcs get http://thelackthereof.org/projects/ocaml/eval/</nowiki>

=== Usage ===

  evaltest.ml
  -----------
  open Eval

  let _ =
    eval_reset();
    evalp "let add1 x = x +1;;";
    let n : int = eval "n" "let n = add1 2;;" in
    print_string "n = ";
    print_int n;
    print_newline()

  Result:
  brock@ihd103:~/tmp$ ocamlc -o evaltest toplevellib.cma eval.ml evaltest.ml 
  brock@ihd103:~/tmp$ ./evaltest 
  n = 3

Just like magic. Be sure to compile toplevellib.cma in with your stuff. Oh, and I'm pretty sure this only works in bytecode. Sorry.


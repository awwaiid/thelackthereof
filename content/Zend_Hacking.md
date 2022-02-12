---
title: Zend_Hacking
createdAt: 2005-06-17T17:12-04:00
editedAt: 2005-06-17T17:12-04:00
---

Zend (PHP) isn't really documented all that much, besides the source itself. It looks like once you understand the beast the documentation wouldn't be all that necessary -- silly I know, but thats the way it looks.

Well I'm going to try writing a Zend extension. So I'm having a look at APD and eAccelerator and Zend itself to see what is going on in there. They make it relatively easy to do an extension, with magical build scripts and such.

Tips / Documentation recommendations are appreciated if anyone out there knows of some magical wiki in the sky diagraming and analyzing all the components.

== Goal ==
Well for anyone who doesn't know, I am obsessed with [[Continuation-based Web Programming]]. To this end I've created [[Contize]] for Perl and PHP (which is just a hack, not really continuations). I've examined cpan:Coro::Cont to see if I can get these continuations to serialize, but even the author of that module things it isn't possible. At work I'm doing all of this in PHP, so this is an experiment to see if I can hack up Zend to do (serializable) continuations.

So I want a few functions:
* contize($function_name) - Indicate a function/object that I want to be a continuation
** or perhaps call($func_name, $arg_array) - like callcc
* yield $val - Indicate where the continuation exits
* $serial = serialize_continuation($function_name) - Serialize the continuation
* unserialize_continuation($serial) - De-Serialize the continuation

So maybe like:
  make_continuation("func");
  $result = func($p1, $p2, ...);
  $s = serialize_continuation("func");
  unserialize_continuation($s);
  func($p1, $p2, ...);
  # ...
  function func($p1, $p2, $p3) {
    # stuff
    yield $result1;
    # stuff
    yield $result2;
    # stuff
    return $result3 ;
  }

== Files ==
* http://lxr.php.net/source/ZendEngine2/zend_globals.h - especially see the Zend Executor Globals (and maybe the compiler gloabals too)

== Notes ==
OK, I have a basic thing going now. Just ripped stuff out of various examples and grabbed call_user_func_array.
* hold the current status of a call
* hold the return state, or a set of pointers, so we can jump directly out of a func

call -- save the current state for a later yield. Initialize/restore the continuation state for the function we're calling

yield -- save all the state between the call and here. restore the state of the initial call, pretending the parameter to yield was returned from the function like it exited normally

So we need two storage areas -- one for current state and one for continuation state. The current state might end up being pointers or something. both should be stacks so that we can have nested continuations.

Should the continuation state be stored by-name of the function?

I should look at other documentation on partial continuations to see if there is a standard naming scheme for all of this.

----

OK, here's an idea -- we abuse the exception handler framework a bit. So the code pretends to be like this:

try {
  ccall('func',$p1,$p2,...);
} catch(cont) {
  // Do nothing, just continue
}

And I'm interested in this because it is easy enough to save the current state stuff, but not so easy to escape during the middle of the computation.


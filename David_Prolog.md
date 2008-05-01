---
title: David_Prolog
createdAt: 2008-05-01T00:57-04:00
editedAt: 2008-05-01T01:12-04:00
---

<code>

;; David E Smith
;; CS-396 Homework Four
;; "Logic is a Fickle Master, Part 2"
;; 2008/04/28

; ---------------------------------------------

; boolean (load-facts <filename>)
;   As defined in the assignment.
;   Takes the filename of the fact file as argument,
;   loads in the file.

; list (prove <goal or goal list>)
;   As defined in the assignment.
;   Takes a goal (in the form of a list), or
;   a list of goals, and tries to prove them
;   using normal prolog satisfaction
;   techniques.

; ---------------------------------------------

; ***** Begin provided code

;; load-file is a simple function that loads the definitions from a file
;; It recursives calls itself, reading one line at a time; on the recursive return, it cons'es
;; all of the lines together in a giant list, which it returns to caller.
(define load-file
  (lambda (port)
    (let ((nextrec (read port)))
      (cond
        ((eof-object? nextrec) '()) ;; If I've read off the end, return empty list
        (else
          (let* ((nascent-db (load-file port))) ;; Recursive call to finish reading file
            ;; Now add the line read at this level to growing list
            (cons nextrec nascent-db)
          )
        )
      )
    )
  )
)

;;; UNIFICATION  is the heart of the prolog system.  The essential task is to find a consistent set of bindings 
;;; between two clauses, which (for lack of better terms) we call the GOAL and the MATCHTO.  Typically, the GOAL 
;;; the thing you're trying to prove at the moment, and the MATCHTO is the clause in the fact base that you are 
;; currently attempting to prove the goal with.  Of course, MATCHTO can be either a rule or a fact.  In the former case,
;; if I get a successful unification between the GOAL and the head of the rule (used as MATCHTO), then I need to go on 
;; and recursively prove the antecedent...with any forward bindings made during unification.  If the latter case, life
;; is simple: I just return the bindings used to match the fact to my caller (in the appropriate format).

;;; PLEASE NOTE:  Because #f (false) also equates to "empty list", its not a very reliable return value!  So this function
;; returns #t to indicate failure.  Success, of course, is indicated by return of the proper bindings (if any). 

;; the UNIFY function is the matcher.  It takes a predicate, possibly with variables, to be matched; and a 
;; fact or head of rule to be matched to.  It tries to unify them; if success, it returns a package
;; ( (local bindings) (forward bindings)).  The former are definite bindings of variables in the goal
;; to literals in the matchto.  The latter are bindings of variables in the matchto to either literals or 
;; variables in the goal.  The latter need to be propagated to the consequent of the rule (if matchto is 
;; the head of a rule) before the antecedent is (recursively) proved during the proof process.
;; so if the goal is:  (loves harry ?x)
;; and we matchto (loves harry cindy) we get back (((?x cindy)) ())
;; but if we matchto (loves ?z ?q) we get back ( () ((?q ?x) (?z harry)) 
;; if the match fails return #t to indicate failure.
(define unify (lambda (goal matchto)
                (unifyhelp goal matchto '( () () ))))

;; the meat of unification.  Wrapper just passes emtpy bind list to start things off.
(define unifyhelp 
  (lambda (goal matchto binds) 
    (cond ((and (null? goal) (null? matchto)) binds  ) ;; both empty. We're done!
          ((or (null? goal) (null? matchto)) #t)  ;; one but not other empty -> fail
          ((eq? (car goal) (car matchto)) ;; elements match, call with cdrs
           (unifyhelp (cdr goal) (cdr matchto) binds))
          ;; if variable in target, put checkto see its unbound so far, if so add to forward binds
          ((isvar? (car matchto)) 
           (unifyhelp (cdr goal) 
                      (deep-replace (car matchto) (car goal) (cdr matchto))
                      (list (car binds) (cons (list (car matchto) (car goal)) (cadr binds)))))
          ;; if var in goal matched to literal in target, check to see that it's unbound, add to
          ;; local bindings.
          ((isvar? (car goal)) ;; var in goal matched to literal in matchto
           (unifyhelp (deep-replace (car goal) (car matchto) (cdr goal)) 
                      (cdr matchto) 
                      (list (cons (list (car goal) (car matchto)) (car binds)) (cadr binds))))
          (else #t) ;; if nothing matched, fail!
          )))

;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;
;;  MAKING VARIABLES IN THE FACT BASE UNIQUE
;;;;;;;;;;;;

;;  OVERVIEW:  It is a given that variables in the fact base are independent, i.e., when you see ?x in one clause, it's
;;  different from the ?x that appears in another clause.  But the fact that these two variables LOOK the same can be
;;  a huge pain in the butt in the unification process.  To avoid huge headaches, its best to just make all variables
;; in the fact base unique right from the start!  The UNIQUE function (aided by its helpers) below does this.  Simply
;; put, it takes every variable it finds in an input clause, and replaces it with a unique, newly-generated variable.  
;; Of course, appearances of the same variable within the same clause must be replaced by the same new unique variable
;; name!  This makes writing this function tricky; it has to carry the bindings that it's made so far along with it
;; as it goes, so it can do the right thing when it encounters a variable later.

;; UNIQUE is a function that just replaces each var in a list with a unique version of the var. To avoid
;; name confusion during unification. So (unique '((loves ?x ?y ?x) :- (bites ?x ?y)) yields something like
;; (loves ?x323 ?y432 ?x323) :- (bites ?x323 ?y432).
;; Several helper functions break this multiple recursion down into nice chunks.  Uses gensym to create new names.
;; Should be called  during Load-Facts to immediately clean up the fact base as it is loaded from the file!!
(define unique
  (lambda (alist)
    (unique-help alist '())))

;; takes a list of preds to work on, plus bindings so far. Returns the the fixed list.
(define unique-help
  (lambda (alist binds)
    (cond ((null? alist) ())
          ((list? (car alist)) ; we have a list of preds to replace in! Do first one, then pass binds to rest
           (let* ((subfirst (unique-one (car alist) binds)))
             (cons (car subfirst) (unique-help (cdr alist) (cadr subfirst)))))
          (else ; its the :- symbol.  Just cons it on when returning.
           (cons (car alist) (unique-help (cdr alist) binds))))))

;; Uniquifies vars in a single predicate.  So (loves ?x ?y ?x) becomes (loves ?x23 ?y56 ?x23. Returns 
(define unique-one
  (lambda (apred binds)
    (cond ((null? apred) (list '() binds))
          ((assoc (car apred) binds) ; its a var that's been bound so far. replace with bound val
           (let ((therest (unique-one (cdr apred) binds)))
             (list (cons (cadr (assoc (car apred) binds)) (car therest)) (cadr therest))))
          ((isvar? (car apred)) ; its a new unbound variable
           (let* ((newsym (gensym (car apred)))
                  (therest (unique-one (cdr apred) (cons (list (car apred) newsym) binds))))
             (list (cons newsym (car therest)) (cadr therest))))
          (else ; its some non-var.  Just cons it one unchanged
           (let ((therest (unique-one (cdr apred) binds)))
             (list (cons  (car apred) (car therest)) (cadr therest)))))))
		
;; isvar? is a helper fn.  that returns true if the argument starts with the character '?'
(define isvar? 
  (lambda (symbol)
    (char=? (car (string->list (symbol->string symbol))) #\?)
    ))

;;  Another simple helper function.  Deep-replace does a replace of a TARGET item withe a NEWONE item in some input list. The
;; reason it is "deep" is that the input list may be mulitply nested, ie, it replaces the target item no matter how deeply it's
;; buring in the nested input list.  Used to replace variables with values in goal lists as we go along. There are lots of ways to
;; implement this simple function; this is just one way to do it...
(define deep-replace 
  (lambda (target newone alist)
    (cond ((null? alist) ())
          ((not (pair? alist)) ;; I'm looking at an atom
           (if (eq? alist target)
               newone
               alist))
          (else (cons (deep-replace target newone (car alist))
                      (deep-replace target newone (cdr alist)))))))


; ***** End provided code

; ---------------------------------------------

; Eew global variable!
; But this one defines our entire universe.
; Seems like the best solution.
(define factbase '())

; boolean (load-facts <filename>)
;   As defined in the assignment.
;   Takes the filename of the fact file as argument,
;   loads in the file.
(define load-facts
  (lambda (filetoload)
    ; Eew set-bang!
    ; But we must redefine our global variable!
    (set! factbase (map unique (load-file (open-input-file filetoload))))
  )
)

; list (prove <goal or goal list>)
;   As defined in the assignment.
;   Takes a goal (in the form of a list), or
;   a list of goals, and tries to prove them
;   using normal prolog satisfaction
;   techniques.
(define prove
  (lambda (goallist)
    (if (pair? (car goallist))
      (check-goals goallist factbase)
      (check-goals (list goallist) factbase)
    )
  )
)

(define check-goals
  (lambda (goallist currentfactlist)
    (let ((result (cons-goals goallist currentfactlist)))
      ; This is wrong, goals are interdependant.
      (if (member #t result)
        "fail"
        result
      )
    )
  )
)

(define cons-goals
  (lambda (restofgoals currentfactlist)
    (if (null? restofgoals)
      restofgoals
      (cons 
        (check-rules (car restofgoals) currentfactlist currentfactlist)
        (cons-goals (cdr restofgoals) currentfactlist)
      )
    )
  )
)

(define check-rules
  (lambda (goal restoffacts currentfactlist)
    (if (null? restoffacts)
      #t
      (let ((currentfact (car restoffacts)))
        (display currentfactlist)
        (newline)
        (if (member ':- currentfact)
          (let (
              (goallist (cddr currentfact))
              (result (unify goal (car currentfact)))
            )
            (if (eq? result #t)
              (check-rules goal (cdr restoffacts) currentfactlist)
              (let ((replacedfacts (replace-helper currentfactlist (cdr result))))
                (let ((ruleresult (check-goals goallist replacedfacts)))
                  (if (eq? ruleresult "fail")
                    (check-rules goal (cdr restoffacts) currentfactlist)
                    (car ruleresult)
                  )
                )
              )
            )
          )
          (let ((result (unify goal currentfact)))
            (if (eq? result #t)
              (check-rules goal (cdr restoffacts) currentfactlist)
              (car result)
            )
          )
        )
      )
    )
  )
)

; Something's wrong with this.
(define replace-helper
  (lambda (currentfactlist replacementlist)
    (if (null? replacementlist)
      currentfactlist
      (deep-replace (caar replacementlist) (cdar replacementlist) (replace-helper currentfactlist (cdr replacementlist)))
    )
  )
)

; ---------------------------------------------

(load-facts "factlist.txt")
(display factbase)
(newline)
;(prove '(woman jane))
;(prove '(woman katy))
;(prove '(woman ?x))
;(prove '(loves ?x y))
;(prove '(loves ?x ?t))
;(prove '(loves ?x katy))
;(prove '(loves hank ?e))
;(prove '(loves tim ?x))
;(prove '((near jane ?x) (eats ?y ?u)))
;(prove '((eats ?x quiche) (loves ?x katy)))




</code>


<code>

; Test Suite!

(define test
  (lambda (name expect actual)
    (string-append
      (if (equal? expect actual)
          "pass"
          "fail"
      )
      " ... " name
    )
  )
)

(test "Replace-helper 1"
  (replace-helper '((man ?x ?x ?y)) '((?x joe) (?y steve)))
  '((man joe joe steve))
)

(test "Katy is rich (given)"
      (prove '(rich katy))
      '(())
      )

(test "Jane is a woman" #t (prove '(woman jane)))

(test "John loves mary?" '(((?x mary))) (prove '(loves john ?x)))

(test "John loves mary y?" '(((?y mary))) (prove '(loves john ?y)))


(test "Eck-1 jane is woman" (prove '(woman jane))
"fail")
(test "Eck-2 katy is woman" (prove '(woman katy))
'())
(test "Eck-3 katy is first found woman" (prove '(woman ?x))
'((?x katy)))
(test "Eck-4 Someone loves y" (prove '(loves ?x y))
"fail")
(test "Eck-5 ?x loves ?t" (prove '(loves ?x ?t))
'((?t mary) (?x john)))
(test "Eck-6 Who loves katy?" (prove '(loves ?x katy))
'((?x tim)))
(test "Eck-7 Who does hank love?" (prove '(loves hank ?e))
'((?e katy)))
(test "Eck-8 Who does tim love?" (prove '(loves tim ?x))
'((?x katy)))
(test "Eck-9 Someone near jane... and someone else eats?"
      (prove '((near jane ?x) (eats ?y ?u)))
      '((?x landfill) (?y hank) (?u quiche)))
(test "Eck-10 Who eats quiche and loves katy? freak."
      (prove '((eats ?x quiche) (loves ?x katy)))
      '((?x hank)))

</code>



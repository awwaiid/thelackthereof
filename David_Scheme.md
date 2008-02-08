---
title: David_Scheme
createdAt: 2008-02-08T00:09-05:00
editedAt: 2008-02-08T01:32-05:00
---

<code>
; ---------------------------------------------
; Part I

(define ndelete
  (lambda (inputlist count)
    (ndelete-recurse inputlist (- count 1) (- count 1))))

; Recursive helper for ndelete, we need it cause we need to both track the
; current count and the total count.
(define ndelete-recurse
  (lambda (inputlist totalcount currentcount)
    ; If our list is null, we're done recursing. Return null, regardless of count.
    (if (null? inputlist)
        inputlist
        ; If the count is zero, we should skip our car.
        (if (zero? currentcount)
            (ndelete-recurse (cdr inputlist) totalcount totalcount)
            (cons (car inputlist) (ndelete-recurse (cdr inputlist) totalcount (- currentcount 1)))))))

(define deep-member?
  (lambda (needle haystack)
    (if (member needle (steamroller haystack)) 
        #t
        #f)))

; Flattens a nested list, as in the reference to it in the assignment.
(define steamroller
  (lambda (inputlist)
    ; If our input is not a pair, just return it. If it is a pair, it has a car and cdr.
    (if (pair? inputlist)
        ; If the car of our list is a pair, we have a nested list, take it apart.
        ; If not, then still take apart the cdr, but the just shove the car on there.
        (if (pair? (car inputlist))
            ; Any reasonable solution to this problem needs an append, right?
            (append (steamroller (car inputlist)) (steamroller (cdr inputlist)))
            (cons (car inputlist) (steamroller (cdr inputlist))))
        inputlist)))

; ***** PROVIDED CODE *****
;; Implements the elegant and naturally recursive mergesort algo
;; Idea is that, given a list, we split in two, mergesort these two, then 
;; merge together the resulting sorted lists.
(define mergesort
  (lambda (alist)
    (if (null? (cdr alist))
        alist
        (let ((splits (splitter alist)))
          (merge (mergesort (car splits)) (mergesort (cadr splits)))))))
; ***** END PROVIDED CODE *****

(define splitter
  (lambda (inputlist)
    (cdr (splitter-recurse 0 inputlist))))

; We need to track the depth as we recurse into the list.
; Then, as we come back out, count twice as fast.  When we
; reach 0, time to switch lists.
(define splitter-recurse
  (lambda (depth inputlist)
    ; Terminating case is null input, return how deep we are.
    (if (null? inputlist)
        (list depth '() '())
        (let ((recursion (splitter-recurse (+ depth 1) (cdr inputlist))))
          ; Are we building on the left or the right?
          (if (> (car recursion) 1)
              (list (- (car recursion) 2) '() (cons (car inputlist) (caddr recursion)))
              (list 0 (cons (car inputlist) (cadr recursion)) (caddr recursion)))))))

(define merge
  (lambda (list1 list2)
    ; We need to make sure that we aren't comparing against a null list.
    (cond 
      ((null? list1)
          ; If both lists are null, we have our terminating case.
          (if (null? list2)
              '()
              (cons (car list2) (merge '() (cdr list2)))))
      ((null? list2)
          (cons (car list1) (merge (cdr list1) '())))
      ; Are we comparing numbers?
      ((number? (car list1))
          (if (and (number? (car list2)) (> (car list1) (car list2)))
              (cons (car list2) (merge list1 (cdr list2)))
              (cons (car list1) (merge (cdr list1) list2))))
      ((number? (car list2))
          (cons (car list2) (merge list1 (cdr list2))))
      ; Guess not.  Strings or symbols.  You're truly evil if else.
      ((string>? 
        (if (string? (car list1))
            (car list1)
            (symbol->string (car list1)))
        (if (string? (car list2))
            (car list2)
            (symbol->string (car list2))))
          (cons (car list2) (merge list1 (cdr list2))))
      ; The leftmost is in list1.
      (else
          (cons (car list1) (merge (cdr list1) list2))))))

; ---------------------------------------------
; Part II

; Yay4Metaquoting
(define fn-maker
  (lambda (fn-spec)
    (let ((name (cadar fn-spec)) (params (cdadr fn-spec)) (body (cdaddr fn-spec)))
      (eval `(define ,name (lambda ,params ,@body))))))

; ---------------------------------------------
; Part III

; ***** PROVIDED CODE *****

;; Simply checks to make sure a proposed placement position is on the board and not occupied. Returns false if 
;; the proposed position won't work.
(define checkposition
  (lambda (xpos ypos)
    (not (or (invalid? xpos) (invalid? ypos) 
             (not (eq? (nth (nth ttboard ypos) xpos) '_)) ))))

;; Just a little helper function to check to see if an x,y position is even on the board.
(define invalid?
  (lambda (pos)
    (if (or (< pos 1) (> pos 3))
        #t
        #f)))

;; Helper function.  Returns nth element in an input list.
(define nth 
  (lambda (alist num)
    (if (eq? num 1) (car alist) (nth (cdr alist) (- num 1)))))

;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;
;; Here is my skeleton for checkwin.  You can decide whether you want to use it or not.  The bottom
;; line is that we need a way to check rows, cols, diags in the board --- and yet only rows are easily
;; accessible in our board represention.   The answer: build yourself linear reprs
;; of cols and diags first, then check to see if there is a "win" along any of them!  
;; So make-cols makes me a list of the cols; make-diags makes me a list of the diags.  I then just
;; check each for winner (all x's or all o's) and or the result together.  If one of the results is positive,
;; it returns the symbol (x or o) for which it was positive.  Hence whole function returns #f (no winner) or the
;; winning symbol!
(define checkwin
  (lambda ()
    (let ((rows ttboard)
          (cols (make-cols))
          (diags (make-diags)))
      (or (findwinners rows) (findwinners cols) (findwinners diags)))))

; ***** END PROVIDED CODE *****

(define ttboard '((_ _ _) (_ _ _) (_ _ _)))

(define ttnew-game
  (lambda ()
    (set! ttboard '((_ _ _) (_ _ _) (_ _ _)))))

(define ttstat
  (lambda ()
    (begin 
      ; I feel so dirty.
      (display (car ttboard))
      (display "\n")
      (display (cadr ttboard))
      (display "\n")
      (display (caddr ttboard)))
      (display "\n")
    ttboard))

(define ttplay
  (lambda (gamepiece rownum colnum)
    ; Why are these backwards?!
    (if (checkposition colnum rownum)
        (let ((trash (set! ttboard
          (cond
            ; I hate to abuse cond like this, but 3x3 is not worth recursing!
            ((eq? rownum 1)
                (list (rowplaypiece gamepiece colnum (car ttboard)) (cadr ttboard) (caddr ttboard)))
            ((eq? rownum 2)
                (list (car ttboard) (rowplaypiece gamepiece colnum (cadr ttboard)) (caddr ttboard)))
            (else
                (list (car ttboard) (cadr ttboard) (rowplaypiece gamepiece colnum (caddr ttboard))))))))
          (ttstat))
        (display "Can't place a piece there! Try again!"))))

; Plays a piece on a particular column.
; Takes in the piece, the column number, and the whole row.
; Returns the new row with the piece in place.
(define rowplaypiece
  (lambda (gamepiece colnum rowtochange)
    (cond
      ; I hate to abuse cond like this, but 3x3 is not worth recursing!
      ((eq? colnum 1)
          (cons gamepiece (cdr rowtochange)))
      ((eq? colnum 2)
          (list (car rowtochange) gamepiece (cddr rowtochange)))
      (else
          (list (car rowtochange) (cadr rowtochange) gamepiece)))))

(define make-cols
  (lambda ()
    ttboard))

(define make-diags
  (lambda ()
    ttboard))

(define findwinner
  (lambda (liststocheck)
    (cond
      ((null? liststocheck)
          #f)
      ((and (eq? (caar liststocheck) (cadar liststocheck)) (eq? (caar liststocheck) (caddar liststocheck)))
          #t)
      (else
          (findwinner (cdr liststocheck))))))

; ---------------------------------------------
; Some of the code below is based on work by individuals
; other than the author, David E Smith.  However, it is 
; believed that this code is highly cursory in nature.

; Test Suite!

(define test
  (lambda (name expect actual)
    (string-append name " ... "
      (if (equal? expect actual)
          "OK"
          "Fail"
      )
    )
  )
)


(define x '(1 2 3 4 5 6 7 8 9 10))

(define y '(((a) b) (c d (d (f g) h)) i))

(test "Eck ndelete 1" '(1 2 4 5 7 8 10)
      (ndelete x 3))

(test "Eck ndelete 2" '(1 2 3 4 5 6 7 8 9 10)
      (ndelete x 222))

(test "Eck ndelete 3" '(((a) b) i)
      (ndelete y 2))

(test "ndelete all" '()
      (ndelete '(a b c d e f) 1))

(test "ndelete every 3rd" '(a c e)
  (ndelete '(a b c d e f) 2))

(test "ndelete too big" '(a b c d e f)
      (ndelete '(a b c d e f) 7))

(test "Eck deep-member? 1" (deep-member? 3 x) #t)

(test "Eck deep-member? 2" (deep-member? 444 x) #f)

(test "Eck deep-member? 3" (deep-member? 'f y) #t)

(test "Eck deep-member? 4" (deep-member? 'foo y) #f)

; Even though it is in there, we are only supposed to look for atoms
(test "complex deep-member 1" #t
      (deep-member? '(f g) y))

(test "complex deep-member 2" #f
      (deep-member? '(g h) y))

(define z '(a f c d f g e g h e g e e))

(test "Eck steamroller 1" z '(a f c d f g e g h e g e e))

(test "Steamroller deeply" '(a b c d e f g h i j k l m n o p)
      (steamroller '(a (b (c (d (e (f (g) h) i) j) (k (l (m (n (o (p)))))))))))

(test "Eck splitter 1" (splitter z) '((a f c d f g e) (g h e g e e)))

(test "Eck splitter 2" (splitter '(a) ) '((a) ()))

(test "simple split" '((a b c) (d e f))
      (splitter '(a b c d e f)))

(test "uneven split" '((a b c) (d e))
      (splitter '(a b c d e)))

(test "example split" '((a f c d f g e) (g h e g e e))
      (splitter '(a f c d f g e g h e g e e)))

(test "empty split" '(() ())
      (splitter '()))

(test "single split" '((a) ())
      (splitter '(a)))

(define x '(1 3 5 7 9))
(define y '(2 4 6 8 10))

(test "Eck merge 1" (merge x y) '(1 2 3 4 5 6 7 8 9 10))

(define x1 '(12 23 2 5 64 23 6756 234 2 42 535))

(test "Eck mergesort 1" (mergesort x1) '(2 2 5 12 23 23 42 64 234 535 6756))

(define x2 '(how does he do that cool stuff?))
(define x3 '(I can "go" 4 "about" 123 sodas k?))

(test "Eck mergesort 2" (mergesort x2) '(cool do does he how stuff? that))

(test "Eck mergesort 3" (mergesort x3) '(4 123 "about" can "go" i k? sodas))

(define temp '((name: addtwo) (args: x) (body: (+ x 2)))) 
(fn-maker temp)    

(test "Eck func maker 1" (addtwo 5) 7)

(define test-spec
  '((name: mult-sum-three) (args: x y z) (body: (* (+ x y z) 3))))
(fn-maker test-spec)

(test "Eck func maker 2" (mult-sum-three 1 2 3) 18)

(set! ttboard '((_ o _) (_ x _) (_ _ x)))

(test "Premaid board - Ech checkposition 1" (checkposition 2 2) #f)
(test "Premaid board - Ech checkposition 2" (checkposition 23 555) #f)
(test "Premaid board - Ech checkposition 3" (checkposition 1 1) #t)

(ttnew-game)

(test "Eck TTT - Empty board" (ttstat) '((_ _ _) (_ _ _) (_ _ _)))

(test "Eck TTT - move 1" (ttplay 'x 3 3) '((_ _ _) (_ _ _) (_ _ x)))
(test "Eck TTT - move 2" (ttplay 'o 2 3) '((_ _ _) (_ _ o) (_ _ x)))

;(test "Eck TTT - move 3" (ttplay 'x 2 3) Can't place a piece there! Try again!
(ttplay 'x 2 3)
(test "Eck TTT - move 3" (ttstat) '((_ _ _) (_ _ o) (_ _ x)))

(test "Eck TTT - move 4" (ttplay 'x 1 1) '((x _ _) (_ _ o) (_ _ x)))
;(test "Eck TTT - move 5" (ttplay 'o 33 -45) Can't place a piece there! Try again!
(test "Eck TTT - move 6" (ttplay 'o 3 1) '((x _ _) (_ _ o) (o _ x)))
;(test "Eck TTT - move 7 (win)" (ttplay 'x 2 2) '(the winner is: x)

</code>


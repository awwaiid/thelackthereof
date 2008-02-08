---
title: David_Scheme
createdAt: 2008-02-07T21:16-05:00
editedAt: 2008-02-07T21:17-05:00
---

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

; The splitter could either be unstable, reverse a list, or do a
; length check, right?  Since reversing a list is no faster than
; finding the length of a list, I made the merge sort unstable.
(define splitter
  (lambda (inputlist)
    ; Our terminating case is 0 or 1 items.
    (cond
      ((null? inputlist)
          (list '() '()))
      ((null? (cdr inputlist))    
          (list inputlist '()))
      (else
          ; The return value is funky since it's nested, let's put it
          ; in a let so we can mess with its pieces.
          (let ((recursion (splitter (cddr inputlist))))
            (list (cons (car inputlist) (car recursion))
              (cons (cadr inputlist) (cadr recursion))))))))

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

; Part II

; Yay4Metaquoting
(define fn-maker
  (lambda (fn-spec)
    (let ((name (cadar fn-spec)) (params (cdadr fn-spec)) (body (cdaddr fn-spec)))
      (eval `(define ,name (lambda ,params ,@body))))))



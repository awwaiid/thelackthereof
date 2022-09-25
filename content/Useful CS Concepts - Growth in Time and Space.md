---
title: Useful_CS_Concepts_-_Growth_in_Time_and_Space
tags: []
createdAt: 2015-10-11T20:57-04:00
updatedAt: 2015-10-11T20:57-04:00
---

Lets say you are solving a problem with 100 inputs. How much longer will it take (time) and how much more memory will you use (space) to solve the problem with 101 inputs? How much time & space will you use to solve it with 1000 inputs? A million inputs?

Why and when do you care?

How can I find the answer experimentally?

== Problem Size and Growth ==
Most problems have some inputs and some outputs. Solving the problem takes some amount of time, and intermediate values take up some amount of space.

When I say "time" I mean one of two things -- either how many steps it takes to solve a problem, or how much wall-clock (that is -- the clock on the wall next to you) time it takes to solve the problem. These are more or less the same thing... the main difference is that if it takes 100 "steps" maybe that is 100 seconds. But if your computer is playing a video or something at the same time, maybe 100 "steps" will take 500 seconds instead.

When I say "space" I mean the memory storage that you use to help solve your problem. This would be things such as temporary variables with partial solutions. Mostly people focus time when discussing problem size, and less about space. I think that's because time slowdowns hit people more frequently than huge memory usage, but I'm not sure.

When we increase the amount of input that we are trying to solve, we say the problem has "grown". As it grows, the amount of time and space it takes to solve the problem will change. Sometimes it won't change by much, and sometimes it will (unintuitively) take WAY longer or WAY more space to solve a problem with only a LITTLE more input! We give these growth-rates names to help us understand, for a particular problem and solution, how much longer or how much more space we'll use when the number of inputs gets bigger.

There are a lot of these "growth rates", and I'm going to go over the most common and useful ones. If you were to just pick three to learn, you should pick Linear Growth, Polynomial Growth, and Exponential Growth.

== Constant Growth ==
The time/space doesn't increase with problem size. This is usually because the problem size itself can't really increase.

An example of this is determining whether a number is even or odd. 

== Logarithmic Growth ==
It takes more time/space to solve larger problems, but it doesn't grow as fast as the problem size.

A great example of this is binary search over a sorted list. 

== Linear Growth ==
Solves the problem in a growing amount of time/space, incremental with the problem size.  

== Loglinear Growth ==
Problem difficulty grows a bit faster than linear, but not as fast as polynomial. I almost left this one out, but this is how fast common sorting algorithms run. 

== Polynomial Growth ==
Problem difficulty grows quite a bit faster than the input size 

== Exponential Growth ==
Problem difficulty grows WAY faster than the input size 

== References ==
* [https://en.wikipedia.org/wiki/Big_O_notation#Orders_of_common_functions Wikipedia: Big 'O' of common functions]

--------------------------------

Reorganizing data can change everything
Reorganizing your algorithm can change everything




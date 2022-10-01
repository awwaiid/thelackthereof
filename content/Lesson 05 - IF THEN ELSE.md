---
title: Lesson_05_-_IF_THEN_ELSE
tags: []
createdAt: 2005-02-08T13:00-05:00
updatedAt: 2005-02-08T13:00-05:00
---


```
  $num = int(rand(10)) + 1;
  print "Try to guess my number! You get one try.\n";
  print "Your guess: ";
  $guess = <>;
  chomp $guess;
  if ($guess == $num) {
    print "You guess my number!!\n";
  } else {
    print "Sorry... you guessed $guess, but my number was $num.\n";
  }
```

  


---
title: TLT_-_2018-11-12_-_Destroy_Things
tags: ["blog"]
createdAt: 2018-11-12T23:02-05:00
updatedAt: 2018-11-12T23:02-05:00
---

I think it's important to learn through destruction. I like to proble the edges of things, and one of the best ways of knowing where IS the edge is to go over it. So ... let's go over the edge.

First we need a nice fresh ubuntu:

<code>
    awwaiid@zokei:~$ docker run -it ubuntu bash
    root@1cf14a7465fd:/# █
</code>

Now, this isn't a completely isolated machine or anything, but it'll do. Keep in mind that this is running as root on your machine (if you're running a Linux host at least, this is probably safer on osx), so you should be a little afraid. Fear will keep you on your toes!

Let's cause a little destruction! Make sure you are INSIDE of this new ubuntu container, and then:

<code>
    root@1cf14a7465fd:/# rm -rf /
</code>

They always joke that you shouldn't do that. Turns out our lovely ubuntu is trying to help us not hurt ourselves, so we have to pass a special flag:

<code>
    root@1cf14a7465fd:/# rm -rf --no-preserve-root /
</code>

WHOA! Whole lot of errors. Many of them are very good things about how you can't remove stuff in /sys/devices because of it being a read-only filesystem (remember that running as root bit?). And now the fun begins.

<code>
    root@1cf14a7465fd:/# ls
    bash: ls: command not found
</code>

Oh right. "ls" is a command that is an executable program that lives at /bin/ls. Correction: LIVED. But no longer. That's ok ... tab completion still works!

<code>
    root@1cf14a7465fd:/# cd <tab><tab>
    dev/  etc/  proc/ sys/
    root@1cf14a7465fd:/# cd etc
    root@1cf14a7465fd:/etc# █
</code>

Great! So we can git directory lists. Let's look at some files

<code>
    root@1cf14a7465fd:/# cat <tab><tab>
    hostname     hosts        resolv.conf  
    root@1cf14a7465fd:/# cat resolv.conf
    bash: cat: command not found
</code>

Oh right. No "cat" command either. What commands DO we have? Well, we have any bash built-in. And we have bash as a programming language with loops and all that. Now we start to get fancy.

<code>
    root@1cf14a7465fd:/# while read p; do echo $p; done < /etc/hostname
    1cf14a7465fd
</code>

Nice. We can now look at the contents of files. But if we are ever going to rebuild our system we'll also need to write files. Easy!

<code>
    root@1cf14a7465fd:/etc# echo 'echo "hello!"' > hello.sh
    root@1cf14a7465fd:/etc# . /etc/hello.sh
    hello!
</code>

We cheated a bit with that "." to "source" the file. I'm not sure how to make it executable, since we no longer have chmod. Maybe we'll try that next time.

Enjoy your broken docker container!



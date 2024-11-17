---
title: TLT - 2011-10-16 - Misc Posts
tags: []
createdAt: 2011-03-11T08:23-05:00
updatedAt: 2011-10-16T09:10-04:00
---

# Debugging Gems
Tags: Perl, Debugging, Programming, Science

I've been enjoying the blog entries of Carl Mäsak lately, and not just the [http://strangelyconsistent.org/blog/yapsi-201103-released Yapsi Release Notes]. Though those are awefully awesome.


[http://strangelyconsistent.org/blog/im-doing-science-and-im-still-alive I'm Doing Science And I'm Still Alive]
[http://strangelyconsistent.org/blog/theres-plurality-in-wrongness There's Plurality In Wrongness]
[http://strangelyconsistent.org/blog/fail-firmly Fail Firmly]

The [http://www.catb.org/jargon/html/P/programming.html Jargon File's definition of programming] defines it as "the art of debugging an empty file".
[http://perl.plover.com/yak/debruijn/ Debugging the de Bruijn Sequence]

http://www.circlemud.org/cdp/hacker/hacker-4.html - "When you find a bug ... your first impulse will be to change the code, kill the manifestation of the bug, and declare it fixed. Not so fast! The bug you observe is often just the symptom of a deeper bug. You should keep pursuing the bug, all the way down. You should grok the bug and cherish it in fullness before causing its discorporation."

http://www.ibm.com/developerworks/web/library/wa-debug/index.html

----------------

# Timestamp Fix
Tags: Perl, Hacking, Programming

In MJD's talk at PPW, he mentioned that one of the things he likes best about the (historical) perl community is a get-things-done attitude when it comes to code. He showed a little snippet that wasn't necessarily the most sustainable or quickest execution way, but worked. Inspiring!

Recently I did a clean install to an SSD drive, and copied all of my stuff over. Unfortunately I messed it up, and reset all of my file modification timestamps. I don't trust those much, but they are handy sometimes -- so today I decided to fix them.

First I mounted my old disk at /mnt and used find to get a list of files that I want to fix, which are all in my 'tlt' directory. After some trial and error (and verification!), I ended up with this:

```
find /home/awwaiid/tlt ! \( -newer wiki_data/visitors \) -printf '%p\n' > files.txt
```

Then I started looking at rsync to see if it could somehow just sync timestamps. Nothing immediately obvious, and the internet didn't help, so I decided I'd just do it with a perl script. I only have to do this once, so it doesn't have to be particularly fast or clean or anything. I built it up experimentally -- I had to look up how to do 'stat' and such since I don't do that often. And I think I've <i>never</i> used ustat.

```
#!/usr/bin/env perl

use v5.14;
use File::Slurp;
use File::stat;

# Generated with:
# find /home/awwaiid/tlt ! \( -newer wiki_data/visitors \) -printf '%p\n' > files.txt
# Where wiki_data/visitors was the last file transferred
my @files = read_file('files.txt', chomp => 1);

foreach my $file (@files) {
  print "Working on $file\n";
  if(-f "$file" && system("cmp -s \"$file\" \"/mnt$file\"") == 0) {
    print "Match!\n";
    my $s1 = stat($file);
    my $s2 = stat("/mnt$file");
    if($s1->mtime != $s2->mtime) {
      print "S1: " . $s1->mtime . " S2: " . $s2->mtime . "\n";
      utime($s2->atime(), $s2->mtime(), $file)
        || warn "couldn't touch $file: $!";
    }
  }
}
```

After doing some experiments to make sure it isn't going to eat my data much, I kicked it off! I piped the output to fixes.txt and started tailing that. But just tailing the file got boring, so before long I started to wonder how long this was going to take and how far it had gotten. Well... using 'wc' will give me a line-count of the two files. Each line of the original file will (mostly) generate 3 lines in the output file. So all we have to do is count output lines, divide by 3, and then divide by the total, and va la! Let's toss that into watch so we can watch the percentage grow.

```
watch -x perl -E '
  $files = `wc -l files.txt`;
  $fixes = `wc -l fixes.txt`;
  say ((($fixes / 3) / $files)*100)
'
```

So we have all SORTS of lazyness going on here. My favorite is that 'wc -l files.txt' actually returns a number AND the file name. But we just pretend it is a number, which works :)

This is a bit slow. But it is working! It's at 33% now, and by the time I get back from a short walk it will be completely done. Hopefully my files won't have all been eaten :)



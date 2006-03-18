---
title: Unison_Backup_Setup
createdAt: 2006-03-18T03:00-05:00
editedAt: 2006-03-18T03:17-05:00
---

I use [http://www.cis.upenn.edu/~bcpierce/unison/ Unison] to keep my important files syncronized between machines. This is a description of how I have it arranged and to some degree automated.

I put all my important files into a directory called 'tlt'. This happens to exactly correspond with the root http directory of [http://thelackthereof.org/ my website]. Most things in the directory are fine to be on the web, but things that shouldn't be published are locked through file permissions and .htaccess files. I put this 'tlt' directory into my home directory:

* /home/awwaiid/
** tlt/
*** private/ - holds private files
**** mail/ - holds my mail
**** dotfiles/ - holds my homedir .config files

I then symlink a few key directories and files from my home directory into this folder. So, for example:

* /home/awwaiid/mail -> /home/awwaiid/tlt/private/mail
* /home/awwaiid/.muttrc -> /home/awwaiid/tlt/private/dotfiles/.muttrc
* /home/awwaiid/projects/ -> /home/awwaiid/tlt/projects/

And so on. So to get all my settings from one machine to another, I just need to get a copy of this 'tlt' directory and make a few key symlinks. To backup all my stuff I must back up this tlt directory. This is where unison comes in.

Unison is kinda like rsync, except smarter. It keeps a database on each machine so that it can remember what the directories looked like during the most recent syncronization. So if you delete a file on one machine it knows, and if you delete it on one machine and modify it on another it can tell that there is a conflict which you must resolve by hand. After you've syncronized two hosts, resolving all conflicts, you have an identical set of files on each host. We use the notation host1->host2 meaning a syncronization between host1 and host2 initiated from host1.

I have three machines on which I want an up-to-date copy of 'tlt'. They are my own computer (Feline), my website host (Mirabel), and my laptop (Jill). Generally I will sync Feline->Mirabel and Jill->Mirabel, but I could do other combinations (and often do Jill->Feline).

Lets say I am using Feline and want to sync with Mirabel. If you simply run 'unison' it will interactively prompt you for the local and remote directory you wish to syncronize, and step you through the initial sync. It'll remember too, and when you re-run it will sync what it can and ask you about conflicts. Try it a couple times, its fun.

It stores its settings in preference files inside of ~/.unison/. Here is the preference file I use for Feline->Mirabel.

<code>
# Unison preferences file
# Located at feline:/home/awwaiid/.unison/mirabel.prf
# It knows how to sync feline->mirabel
root = /home/awwaiid/tlt/
root = ssh://awwaiid@epfarms.net//home/awwaiid/tlt
ignore = Path dev
ignore = Path tmp
rshargs = -C
</code>

OK, heres another tip -- most of the time there aren't any conflicts. So there is a flag for unison which lets it run in batch mode. Guess what it is?

<code>
awwaiid@feline:~$ unison -batch mirabel
</code>

This runs unison, from feline to mirabel, syncing my tlt directory on each and skipping any conflicts and giving a report.


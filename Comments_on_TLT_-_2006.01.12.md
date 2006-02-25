---
title: Comments_on_TLT_-_2006.01.12
createdAt: 2006-02-24T19:50-05:00
editedAt: 2006-02-25T03:44-05:00
---

=== 2 Comments. ===
I really enjoyed this post. I think it's good to look at what developers should have to worry about and what they should be able to leave to the framework.

I think programming for the back button every time is a pretty good idea. A lot of usability problems are caused by people going back to a page that was generated from an old state. I have this problem on Reddit. As you may or may not have noticed yet, whether or not a page has been viewed by a logged-in user is stored on the server, and regardless of what computer you're on, the links you've already seen are the visted (purple) color. The CSS, though, says to show the link the color the server tells it to, regardless of whether the browser says it's visited. Apparently, they either left out this detail, or they decided that since multiple users could be using a computer, they didn't want the chance that something would come up as read if someone *else* read it.

This presents a problem when the back button is pressed - since the page is what it was before you clicked it, and was not reloaded, it displays the just-visited link in blue.

This whole problem could be avoided, if the web developer saw the back button as a "command", GO BACK TO PAGE X, given to his/her application.

I'm wondering what the usable implementation of this is. If a user sees a page already come up, he will make judgements on it and start trying to click before it even updates itself. I don't think anything could be done to have the browser detect "back" and clear the page before the user sees the old page. I thought about this, and it seems the hack for the browser might be to send all of the initial pages visibly empty with JavaScript to get and render the page. Then when they click back, they'll be presented with an empty page, until it goes back to the server, and the server tells the client what to display.

This has both pros and cons:

Pros:

- Continuations work well (Biggie)
- Users aren't presented with old data (Biggie)
- When users are pressing back many successive times, they don't have to wait for the browser to render the page

Cons:

- Back is slower
- More programming

Issues:

- What message do they get when they go to a page that no longer matters, such as a piece of data they just deleted? Do they get sent to the main page? Does it say "Record not found"? I'm for the latter.

Can you think of any other examples of why the back button is useful, while at the same time presents many usability problems, which could be rectified by the server side handling "back"?


I think there's a lot to be learned from this, philosophically. When you click back in the browser, you're going back to the previous navigation state. This is not always the same as going back to the previous program state. When you want to go to the previous program state, it's Undo.

-- [http://www.benatkin.com/ ben_atkin] 2006-01-15 22:42 UTC


----

There are two continuation-based Web frameworks I am aware of.  The first is Seaside, written in Smalltalk, and the powere behind Dabble DB.  The other is Wee, written in Ruby.  Both languages have built in continuations.

-- [http://www.jamesbritt.com james] 2006-02-25 00:50 UTC



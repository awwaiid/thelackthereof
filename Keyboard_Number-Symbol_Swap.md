---
title: Keyboard_Number-Symbol_Swap
createdAt: 2011-10-21T15:00-04:00
editedAt: 2011-10-21T15:08-04:00
---

(Instructions for doing this on other OSes or setups are welcome!)

The idea here is that we use the symbols at the top of the keyboard a lot more often than the numbers at the top of the keyboard. In my case because I write a lot of perl :)

Here are the various configurations that you can set to switch the number keys and symbol keys in Linux/X11 -- effectively making it so you don't press shift for the symbols but you DO for the numbers.

== Configuration ==

The first, .Xmodmap, is what actually switches things. The others are to make other applications be OK with the new setup.

From: ~/.Xmodmap
<code>
! Swap the numbers and symbols
keycode  10 = exclam 1
keycode  11 = at 2
keycode  12 = numbersign 3
keycode  13 = dollar 4
keycode  14 = percent 5
keycode  15 = asciicircum 6
keycode  16 = ampersand 7
keycode  17 = asterisk 8
keycode  18 = parenleft 9
keycode  19 = parenright 0

! And the curleys while we're at it
keycode  34 = braceleft bracketleft
keycode  35 = braceright bracketright
</code>

Once you put your .Xmodmap in place (and do "xmodmap .Xmodmap" to load it), your buttons are swapped! But you might find, as I did, that other applications with key-modifiers expected those same keys to be numbers. Some of them you can just hold down an extra 'shift' for, but some you can't. And that's no fun anyway.

I did try to do some fancy stuff with xmodmap and then with x11 xkb configuration to make it so that alt+n (no shift) still sent the number key. But I gave up. Suggestions welcome.

First thing that I fixed is my [[XMonad Window Manager]]. It uses alt+n to switch workspaces, so I made it so it can additionally use alt+symbol.

From: ~/.xmonad/xmonad.hs
<code>
-- This is in my keybinding section
-- Also switch to spacial workspace for symbol keys
[((m .|. modm, k), windows $ f i)
    | (i, k) <- zip myWorkspaces symbolKeys
    , (f, m) <- [(W.greedyView, 0), (W.shift, shiftMask)]]

-- ... later in the file ...
-- symbol keys, sorted by order of switching
symbolKeys = [ xK_exclam, xK_at, xK_numbersign
             , xK_dollar, xK_percent, xK_asciicircum
             , xK_ampersand,  xK_asterisk,  xK_parenleft
             , xK_parenright]
</code>

Next is screen. It uses ctrl-a, N to switch to the Nth window. ctrl-a, shift-N works, but is no fun. So this will make it so you do ctrl-a, symbol.

From: ~/.screenrc
<code>
# Allow switching using symbols
bind !  select 1
bind @  select 2
bind \# select 3
bind $  select 4
bind %  select 5
bind \^ select 6
bind &  select 7
bind *  select 8
bind (  select 9
bind )  select 0
</code>

Mike does the same thing with Gnome Terminal. He fixed his using the GUI, and it produced this gconf file. You might be able to just drop it in.

From: ~/.gconf/apps/gnome-terminal/keybinding/%gconf.xml
<code>
<?xml version="1.0"?>
<gconf>
        <entry name="switch_to_tab_9" mtime="1300280884" type="string">
                <stringvalue>&lt;Alt&gt;parenleft</stringvalue>
        </entry>
        <entry name="switch_to_tab_8" mtime="1300280880" type="string">
                <stringvalue>&lt;Alt&gt;asterisk</stringvalue>
        </entry>
        <entry name="switch_to_tab_7" mtime="1300280878" type="string">
                <stringvalue>&lt;Alt&gt;ampersand</stringvalue>
        </entry>
        <entry name="switch_to_tab_6" mtime="1300280876" type="string">
                <stringvalue>&lt;Alt&gt;asciicircum</stringvalue>
        </entry>
        <entry name="switch_to_tab_5" mtime="1300280873" type="string">
                <stringvalue>&lt;Alt&gt;percent</stringvalue>
        </entry>
        <entry name="switch_to_tab_4" mtime="1300280871" type="string">
                <stringvalue>&lt;Alt&gt;dollar</stringvalue>
        </entry>
        <entry name="switch_to_tab_3" mtime="1300280867" type="string">
                <stringvalue>&lt;Alt&gt;numbersign</stringvalue>
        </entry>
        <entry name="switch_to_tab_2" mtime="1300280865" type="string">
                <stringvalue>&lt;Alt&gt;at</stringvalue>
        </entry>
        <entry name="switch_to_tab_10" mtime="1300280859" type="string">
                <stringvalue>&lt;Alt&gt;parenright</stringvalue>
        </entry>
        <entry name="switch_to_tab_1" mtime="1300280849" type="string">
                <stringvalue>&lt;Alt&gt;exclam</stringvalue>
        </entry>
</gconf>
</code>

== Results of Usage ==

2011.03.18
* Entering passwords is tricky
* I find it very difficult to type :) because I type it so often and fast
* Most of the time I find myself still pressing shift when I don't need to
* Less often is not pressing shift when I need numbers
* Vim line-number or count-based operations have become annoying
* Mike noted that "select count(*)" is easier to type :)

2011.10.21
* I am now also using xbindkeys to make 'shift+shift' (left+right) toggle the setup. That way I can easily switch it back if some other poor fool is trying to use my laptop. On my desktop it isn't a problem since I have the number pad.
* I'm still using this full time, and the main annoying thing is using other people's broken keyboards :)



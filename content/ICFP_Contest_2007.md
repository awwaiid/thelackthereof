---
title: ICFP_Contest_2007
createdAt: 2007-07-15T23:11-04:00
editedAt: 2007-07-31T23:33-04:00
---


== The Task ==
Read the full description on the ICFP website, but here is a summary: an alien crash landed on earth and we must fix his DNA. We were provided a 22-page specification for how the alien DNA gets translated into RNA and how the RNA can then be rendered as an image.

They provided the initial DNA and the image that it produces when the DNA->RNA->image transfer works correctly. They also provided the target image -- the exact pixel-by-pixel goal for fixing the alien. The fix takes the form of DNA that is pre-pended onto the provided DNA, which immediately brings to mind the idea that your new DNA will build off of the existing technology.

They also provided a prefix to get you started.

== The Team ==
Though I invited everyone I talked to, it ended up being just Jason and myself which worked out great. Jason was able to dedicate the entire 72 hours to the project, and we did a bit of planning beforehand to figure out what resources we'd need, where we'd hang out, etc. I more or less pushed him into using Perl, though he didn't seem to mind :)

== Friday ==
After getting the (completely insane) specification we went to breakfast and mulled a bit. Got back and divided the task into two parts, DNA->RNA and RNA->Image. This was a very clean way to separate the code. I worked on the DNA->RNA while Jason took the RNA->Image.

The first implementation of DNA->RNA I did was in Perl, and I never quite got the bugs out but I made a lot of progress. Unfortunately it was very very slow. So sometime in the afternoon I started over in OCaml (making heavy use of the recently released Vec library).

Meanwhile Jason began building the RNA->Image library. He was able to produce images almost immediately using Imagemagick.

== Saturday ==
All of Saturday was spent perfecting our implementation of the DNA->RNA->Image spec. My DNA->RNA implementation continued to have bugs, but the extra prefix they provided helped a lot. It turned out to be a self-check prefix, which tried out various things in both the DNA->RNA stage and (assuming that part worked) in the RNA->Image stage.

Jason's image library was working ok, but he did end up switching to Imager once he started dealing with lots of alpha transparency and such. Perl got in his way quite a bit on Saturday, the same old confusion about arrays vs arrayrefs (and arrays of arrayrefs)... oh to have Perl6. In any case he got it going, though at some point switched from keeping his own bitmap to just drawing directly on an Imager object.

== Sunday ==
We finally got the self-check to run perfectly, after fixing a few more bugs in both parts of our program. Then Jason set to work building techniques for getting us closer to the target image. His idea was to break the image into a grid and flood fill each square with the most common color.

Speaking of flood fill... we found out on Sunday that the flood fill algorithm that comes with Imager had a subtle bug. It took us four freakin hours to fix! gar! On the other hand, one nice thing about Imager is its Inline:: support, which allowed us to drop down to C to speed up a few critical spots in our RNA->Image conversion.

Probably the coolest thing that came out of Jason's stuff was an nifty algorithm for selecting a specified color. The specification doesn't allow you to just pick any RGBA color you like, instead we get a set of 8 or so predefined colors and must mix them together. The trick is that each color you add averages with the existing ones. Add in a red (255,0,0) and a blue (0,255,0) and you'd get purple (127,127,0). Throw in a green (0,0,255) and you'd get some shade of grey around (80,80,80) or so. His algorithm would calculate how many of each red, green, or blue (or the other colors they provided) you'd need to get some given color.

Meanwhile I spent quite a bit (probably too much) of time optimizing the DNA->RNA stage for speed. Unfortunately almost all of my ideas didn't pan out. At the same time I started running through random ideas and reverse engineering of the original DNA. At some point I happened upon a static image in the code which provided some hints and two more DNA prefixes.

One of the prefixes turned night into day in the image, getting us much closer to the target. That is what ultimately got us our final score. I uploaded this prefix and noticed that there were some folks with a prefix that was slightly shorter (and shorter prefix == more points). So I studied ours and saw that there was an extra bit that could be removed and bumped us up a notch. I spent some time looking for other manipulations of this prefix but didn't get anything better.

The second prefix pointed us to a user manual. The manual page had fairly specific instructions for finding other manual pages, but I never did figure it out. My understanding was that it was really easy, so I either overlooked it or tried it and messed it up somehow.

Come about 2 in the morning we saw that we weren't going to get any farther with either of our approaches. Jason had grids getting flood filled with colors, but it didn't provide an advantage as far as number of pixesl correct over the night-to-day prefix. And I dug around more in the code but didn't make any further breakthroughs.

So we called it a night! It was great fun!

== Tools ==
We used darcs to share code. It's in apt-get, and here are the basics:

  # Initial get
  darcs get http://server/path

  # Pull updates
  darcs pull

  # Pull updates from a different server
  darcs pull http://server/path

  # Record your local changes (the -l is for also adding new files)
  darcs rec -l

We used other common unix command line tools, such as grep and less and xxd and imagemagick.

Programming languages: Perl, OCaml, C (using Inline::C).



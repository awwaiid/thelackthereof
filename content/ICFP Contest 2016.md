---
title: ICFP_Contest_2016
tags: []
createdAt: 2016-08-12T23:22-04:00
updatedAt: 2016-08-12T23:34-04:00
---

== Challenge: Folding Origami ==
This year the ICFP will be held in Nara, Japan. The contest was organized by members of The University of Electro-Communications. I checked out their website since that sounded like a weird school name, and see that they are also hosting "The Joint Conference of the 8th International Conference on ESP in Asia & the 3rd International Symposium on Innovative Teaching and Research in ESP in Japan". Unfortunately "ESP" here is for "English for Specific Purposes" rather than the usual usage.

Unlike other years, the contest started at 00:00 UTC, which is 8:00pm Thursday, and lasted until 8:00pm Saturday. This was a nice schedule to start with, getting to roll into the contest right after work, but it did leave me jazzed up on Sunday night after it was over.

I was joined at my house by Mike, and Jason joined us remotely from Portland. We coordinated by google hangouts, irc, and github. Near the end I turned on the github-notification hook that posted to irc upon pushes, and should have done that a lot earlier.

First we read through the problem, which was very tricky to wrap our heads around as usual, despite it's somewhat minimalistic Japanese aesthetic. We drew on the whiteboards and drew on paper and folded some paper. Apparently I'm not supposed to use scissors to do origami, who knew?

The rough idea is that we are given the shadow, or "silhouette", of a folded origami flattened to 2D. We then need to reconstruct it by starting with an unfolded paper and then trying to fold it until we get the same shadow. During the lightning round we were given 101 problems of this form. After the lightning round we could submit new problems of our own invention and solve problems submitted by other contestants. We submit our solutions as we go and acquire points based on how well we solved a problem, how big in bytes was our solution, and how easy it was to solve (based on how many others solved it). They even provided a nice leaderboard.

I talked Mike into programming in [http://perl6.org Perl 6] :) . While he and Jason worked on understanding the rules of folding and solving a few problems by hand, I whipped up a [https://github.com/awwaiid/icfp2016/blob/master/lib/Problem/Grammar.pm#L35 problem parser] using Perl 6 Grammars, which worked perfectly. I had fortunately practiced a bit before. I built a simple caching API layer to get problems from the contest server, just shelling out to curl basically.

After that I did a very basic visualization using cpan:Imager (via [https://github.com/niner/Inline-Perl5 Inline::Perl5]), which Mike then took over and worked on. Then (and we're talking Friday or Saturday) I started working on modeling folding of an origami. And then I got stuck.

right:g_polygon.jpg:width=200 I didn't realize it until I was taking a shower on Monday morning after the contest, but I was attempting to implement too general of a solution for part of it. The rough idea is to consider an origami as a bunch of polygons. You start off with one, and then when you fold it you end up with two, one of which you reflect along the fold line.

So I set out to chop up a polygon given a line, and unfortunately didn't think through my goal clearly enough -- I tried to split ANY polygon. That includes funky looking concave polygons that when you cut with a single line might split into a bunch of pieces. What I realized after the contest was that a single cut starting from a solid piece of paper can never end up that way -- there is no way to cut it into a funky shape! So I lost a lot of time there.

The other thing that cost time was reflection. We cast about for some off the shelf libraries, but got mad at them, so I just started to implement reflection myself. I even thought I had it working, but sometime early on Sunday I realized something was fishy. I switched to an off-the-shelf implementation via cpan:Math::Geometry::Planar and presto! Worked much better. Should have used that from the beginning.

right:origami_fold.jpg:width=200 Meanwhile Mike was both improving the visualization, especially around setting a useful viewport for shadows that had been moved far away from the axis origins. He also went through and generated images for the existing problem, which helped us pick out good test cases. Jason kept at it too, starting to hand-generate us some problems to submit once we got past the lightning round, and hand-solving some of the problems that were provided.

After visualizations were working, Mike connected the dots between problems and the origami modeling to calculate a score, making further use of the Planar library. This gave us the final ingredient we needed for automated exploration of simple folds in origami space.

Finally, late on Sunday, we got to where I wanted to be by Saturday morning. Given a problem we could start with an unfolded square and then randomly fold, keeping the improvements. Basic hill-climbing, in other words. I consider this stumbling across the finish line ... but we made it :)

Code: https://github.com/awwaiid/icfp2016


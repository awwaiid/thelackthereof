---
title: Efficient_CSS_Algorithm
createdAt: 2005-09-08T12:40-04:00
editedAt: 2005-11-03T17:11-05:00
---

While thinking about [[Code Selectors]] I started contemplating how CSS gets applied to a webpage. Based on my readings, it is done <i>the hard way</i>. (stick link in here to mozilla's description of the process). I've also been using the improved PHP fork of html2ps, but the more CSS you use the slower it gets. So here is an idea for a CSS algorithm, at least for the context selector.

Example CSS:

  #a .b c {
    a1: 5;
    a2: 10;
  }

  .b c {
    a1: 10;
    a2: 20;
  }

During the parsing of the CSS text, we create a data structure which is element-centric. So maybe something like:

  $css{c}{context}{'.b'}{context}{'#a'}{attrs} = {
    a1 => 5,
    a2 => 10,
  };

  $css{c}{context}{'.b'}{attrs} = {
    a1 => 10,
    a2 => 20,
  };

Then if we have some markup:

  <div id="a">
    <div class="b">
      <c>This is content</c>
    </div>
  </div>
  <div class="b">
    <c>This is more content</c>
  </div>

We traverse the tree. Lets traverse down to the first 'c' tag. Now we traverse the css hash-tree we built, starting with the current node. We go through the 'c' tag's list of contexts...

Each node has three things -- its tag name, its ID, and its class list.

== See Also ==
* http://www.dillo.org/CSS.v1.txt
* http://cthedot.de/cssutils/
* http://www.w3.org/Style/CSS/SAC/
* http://ajax.sourceforge.net/cypress/
* http://search.cpan.org/~iamcal/CSS-1.07/



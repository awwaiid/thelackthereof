---
title: Autobiography
draft: true
tags: []
createdAt: 2004-05-15T10:24-04:00
updatedAt: 2024-11-17
---

I think it would be nice to write an autobiography. Actually I think it would be neat to write 5 autobiographies, one every 20 years. I've missed the 20-year mark already, so I figure I can start on the first one now. I also want to get started on such a project sooner than later since I will surely forget things, more than I have already forgotten that is.

I'm also happy for this to be a semi-autobiography, so if there is anyone out there who has some good contributions... add them here! I'd be happy to do the same for you. Whoever you are.

So here is the plan: First I will record a timeline of events, a pretty factual account. Then (randomly) I will elaborate on some of these.

## Timeline
* 1980-07-18 : Parents married
* 1980-12-14 : Born
* 1987 : Family got first computer (Apple ][e)
* 1995 : Switch from Dysart to Peoria school district
* 1998 : Began using GNU/Linux all the time
* 1999-01 : Family moved to Idaho, he remained in Surprise
* 1999-05 : Graduated from Centennial HS
* 1999-09 : Began attending NAU as a CSE Major
* 1999-09 : Met Beth
* 2000 Summer : Went to LLNL, worked for Jean S
* 2001-01 : Officially switched to a Philosophy major
* 2001 Summer : Worked at LLNL again
* 2002 Summer : Worked at AzSites / 944 Magazine
* 2002-09 : Began working at IHD
* 2003-05-17 : Married!
* 2004-05-08 : Graduated from NAU
* 2004-05-09 : Moved to Boston for a month, deal on job fell through
* 2004-06 : Moved to Phoenix
* 2004-09 : Moved to Flagstaff, began working for Norchem
* 2005-05 : Moved to Phoenix, began working for SWCA
* 2005-05 : Became leader of Phoenix Perl Mongers
* 2007-05 : Moved to DC, began to work at Liquidity Services
* 2007 : Revive DC Perl Mongers
* 2013 : Began working for Optoro
* 2017 : Began working for Framebridge

## Family Tree

```plantuml
digraph G {
  // size = "6,20";
  graph [rankdir = "LR"];
  start = regular;
  overlap = false;
  concentrate = false;
  ranksep = "0.05 equally";
  ratio = "auto";
  //   edge [weight=100];

  { rank=same
    "Kay Flynn";
    "Letha Huffman";
    "Russle Eugene Wilcox";
    "Joseph Wesley Rosson";

  }
  {
    rank=same
    "Lance Hiller";
    "Penny Rosson"
    "Kandy Kay Rosson"
    "Russle Brock Wilcox";
    "Joseph Rosson Jr (Jody)";
    "Peggy Wilcox";
    "Cindy Wilcox";
    "Billy Wilcox";
    "Wesley Wilcox";
    "Harley Wilcox";
    "Michael Allan McCollum";
    "Catherine Cannon"
  }

  {
    rank=same
    "Robert McCollum";
    "Michael McCollum";
    "Russle Brock Wilcox Jr" [style = "filled", color = "lightgrey"];
    "Elizabeth Ann McCollum"
    "Renee Hiller";
    "Karisma Kay Wilcox";
    "Preston Hiller";
    "Amy Hiller";
    "Jason Wesley Wilcox";
    "Heidi Hiller";
    "Levi Brent Wilcox";
    "Garrett Ray Wilcox";
  }

  "Russle Brock Wilcox" -> "Russle Eugene Wilcox";
  "Peggy Wilcox" -> "Russle Eugene Wilcox";
  "Cindy Wilcox" -> "Russle Eugene Wilcox";
  "Billy Wilcox" -> "Russle Eugene Wilcox";
  "Wesley Wilcox" -> "Russle Eugene Wilcox";
  "Harley Wilcox" -> "Russle Eugene Wilcox";

  "Russle Brock Wilcox" -> "Letha Huffman";
  "Peggy Wilcox" -> "Letha Huffman";
  "Cindy Wilcox" -> "Letha Huffman";
  "Billy Wilcox" -> "Letha Huffman";
  "Wesley Wilcox" -> "Letha Huffman";
  "Harley Wilcox" -> "Letha Huffman";

  "Kandy Kay Rosson" -> "Joseph Wesley Rosson";
  "Kandy Kay Rosson" -> "Kay Flynn";
  "Penny Rosson" -> "Joseph Wesley Rosson";
  "Joseph Rosson Jr (Jody)" -> "Joseph Wesley Rosson";

  "Renee Hiller" -> "Penny Rosson";
  "Preston Hiller" -> "Penny Rosson";
  "Amy Hiller" -> "Penny Rosson";
  "Heidi Hiller" -> "Penny Rosson";

  "Renee Hiller" -> "Lance Hiller";
  "Preston Hiller" -> "Lance Hiller";
  "Amy Hiller" -> "Lance Hiller";
  "Heidi Hiller" -> "Lance Hiller";


  "Russle Brock Wilcox Jr" -> "Russle Brock Wilcox";
  "Russle Brock Wilcox Jr" -> "Kandy Kay Rosson";
  "Karisma Kay Wilcox" -> "Russle Brock Wilcox";
  "Karisma Kay Wilcox" -> "Kandy Kay Rosson";
  "Jason Wesley Wilcox" -> "Russle Brock Wilcox";
  "Jason Wesley Wilcox" -> "Kandy Kay Rosson";
  "Levi Brent Wilcox" -> "Russle Brock Wilcox" [style=dashed];
  "Levi Brent Wilcox" -> "Kandy Kay Rosson" [style=dashed];
  "Levi Brent Wilcox" -> "Billy Wilcox";
  "Garrett Ray Wilcox" -> "Russle Brock Wilcox" [style=dashed];
  "Garrett Ray Wilcox" -> "Kandy Kay Rosson" [style=dashed];
  "Garrett Ray Wilcox" -> "Billy Wilcox"

  "Elizabeth Ann McCollum" -> "Michael Allan McCollum";
  "Elizabeth Ann McCollum" -> "Catherine Cannon";
  "Michael McCollum" -> "Michael Allan McCollum";
  "Michael McCollum" -> "Catherine Cannon";
  "Robert McCollum" -> "Michael Allan McCollum";
  "Robert McCollum" -> "Catherine Cannon";

  edge [color = blue];
  "Russle Brock Wilcox Jr" -> "Elizabeth Ann McCollum" [label = "5/17/2003"];
  "Russle Brock Wilcox" -> "Kandy Kay Rosson" [label = "7/18/1980"];
  "Lance Hiller" -> "Penny Rosson";
  "Joseph Wesley Rosson" -> "Kay Flynn";
  "Russle Eugene Wilcox" -> "Letha Huffman";
  "Michael Allan McCollum" -> "Catherine Cannon";

}
```


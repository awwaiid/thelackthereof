---
title: Graph_Module
createdAt: 2005-06-22T16:57-04:00
editedAt: 2005-06-22T17:40-04:00
---

The graph module uses GraphViz to draw graphs. Here are some examples I've put together, but much fancier thinges are possible. See http://www.research.att.com/sw/tools/graphviz/refs.html for GraphViz documentation, and see http://www.research.att.com/sw/tools/graphviz/examples/ for some examples.


<graph>
digraph {
  "node0" [
    shape=plaintext
    label=<<TABLE>
      <TR><TD>foo</TD></TR>
      <TR><TD>caption</TD></TR>
      </TABLE>
    >
  ];
}
</graph>


<graph>
  digraph {
    n1 -> n2;
    n2 -> n3;
    n3 -> n1;
  }
</graph>
<graph>
  digraph {
    node [shape=box];
    rankdir=LR;
    n1 -> n2;
    n2 -> n3;
    n3 -> n1;
  }
</graph>

<graph>
digraph G {

	subgraph cluster_0 {
		style=filled;
		color=lightgrey;
		node [style=filled,color=white];
		a0 -> a1 -> a2 -> a3;
		label = "process #1";
	}

	subgraph cluster_1 {
		node [style=filled];
		b0 -> b1 -> b2 -> b3;
		label = "process #2";
		color=blue
	}
	start -> a0;
	start -> b0;
	a1 -> b3;
	b2 -> a3;
	a3 -> a0;
	a3 -> end;
	b3 -> end;

	start [shape=Mdiamond];
	end [shape=Msquare];
}
</graph>



----


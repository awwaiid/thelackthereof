---
title: Graph_Module
createdAt: 2018-12-15T12:29-05:00
editedAt: 2018-12-15T12:29-05:00
---

The graph module uses GraphViz to draw graphs. Here are some examples I've put together, but much fancier thinges are possible. See http://www.research.att.com/sw/tools/graphviz/refs.html for GraphViz documentation, and see http://www.research.att.com/sw/tools/graphviz/examples/ for some examples.

<graph abc>
  digraph {
    a -> b - > c;
  }
</graph>
<graph>
digraph {
  rankdir=LR;
  node [ shape=plaintext fontsize=10 ];
  struct1 [
    label=<<TABLE border="0" cellborder="1" cellspacing="0" cellpadding="0" width="75">
      <TR><TD bgcolor="lightgrey">foo</TD></TR>
      <TR><TD>columnx</TD></TR>
      <TR><TD>id</TD></TR>
      <TR><TD port="barid1">bar_id</TD></TR>
      <TR><TD>baz</TD></TR>
      </TABLE>
    >
  ];
  struct0 [
    label=<<TABLE border="0" cellborder="1" cellspacing="0">
      <TR><TD bgcolor="lightgrey">bar</TD></TR>
      <TR><TD port="barid0">id</TD></TR>
      <TR><TD>name</TD></TR>
      <TR><TD>date</TD></TR>
      </TABLE>
    >
  ];
  struct1:barid1 -> struct0:barid0;
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


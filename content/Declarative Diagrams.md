---
title: Declarative Diagrams
image: https://www.plantuml.com/plantuml/png/IybCBqeio51mLwZcAahCoqx9BBBr2UBAoqz9LOZcAiv8B4YrJSglu8hbKb18LD2rKqW24SbSjG00.png
tags: []
createdAt: 2022-10-01
updatedAt: 2024-09-07
---

I love diagrams! I love code! Mashing them together is delightful :)

The idea here is to write some markup, like we do with HTML, and just like with HTML/CSS we let the computer do the heavy lifting to decide what pixels go where. I long ago fell in love with GraphViz. More recently I've expanded that love to PlantUML! Let's take a look.

[List of Awesome Diagramming tools](https://github.com/shubhamgrg04/awesome-diagramming)

## GraphViz (via PlantUML)

We'll start off with some simple GraphViz. This is basically a set of nodes and edges plus a bunch of hints about how we want it arranged. So we can be simple:
```
digraph G {
  a -> b -> c
}
```

```plantuml
digraph G {
  a -> b -> c
}
```

And then we can make it a bit more complex:

```
digraph G {

  /***** Standard preamble I copy/paste all the time *****/

  rankdir=LR // Left-to-right
  compound=true // Allow edges between clusters, we're not using this yet

  node [
    shape=rect
    style="filled,rounded"
    fillcolor=gold
  ]

  /***** Now the nodes and edges *****/

  a
  -> b
  -> c

  b -> d [ label="alt" ]
}
```

```plantuml
digraph G {

  /***** Standard preamble I copy/paste all the time *****/

  rankdir=LR // Left-to-right
  compound=true // Allow edges between clusters, we're not using this yet

  node [
    shape=rect
    style="filled,rounded"
    fillcolor=gold
  ]

  /***** Now the nodes and edges *****/

  a
  -> b
  -> c

  b -> d [ label="alt" ]
}
```

Now lets say we want that `d` to be directly below the `b` node. This is where there is some trickstyness involved. Generally when you are using a declarative system you are giving up control over some of these nitty gritty details. Still ... there are hints that we can give. In this case what we'll do is to say that the edge between `b` and `d` is not a "constraint", which means that they layout won't make `d` a "child" (separate rank) of `b`.

```
digraph G {

  /***** Standard preamble I copy/paste all the time *****/

  rankdir=LR // Left-to-right
  compound=true // Allow edges between clusters, we're not using this yet

  node [
    shape=rect
    style="filled,rounded"
    fillcolor=gold
  ]

  /***** Now the nodes and edges *****/

  a
  -> b
  -> c

  b -> d [ label="alt" constraint=false ]
}
```

```plantuml
digraph G {

  /***** Standard preamble I copy/paste all the time *****/

  rankdir=LR // Left-to-right
  compound=true // Allow edges between clusters, we're not using this yet

  node [
    shape=rect
    style="filled,rounded"
    fillcolor=gold
  ]

  /***** Now the nodes and edges *****/

  a
  -> b
  -> c

  b -> d [ label="alt" constraint=false ]
}
```

This is not quite what we want though, since now `d` is basically a top-level node. What we can do instead is put `b` and `d` into a group together and declare that all the members of that group have the same "rank".

```
digraph G {

  /***** Standard preamble I copy/paste all the time *****/

  rankdir=LR // Left-to-right
  compound=true // Allow edges between clusters, we're not using this yet

  node [
    shape=rect
    style="filled,rounded"
    fillcolor=gold
  ]

  /***** Now the nodes and edges *****/

  a
  -> b
  -> c

  {
    rank=same
    b -> d [ label="alt" ]
  }
}
```
```plantuml
digraph G {

  /***** Standard preamble I copy/paste all the time *****/

  rankdir=LR // Left-to-right
  compound=true // Allow edges between clusters, we're not using this yet

  node [
    shape=rect
    style="filled,rounded"
    fillcolor=gold
  ]

  /***** Now the nodes and edges *****/

  a
  -> b
  -> c

  {
    rank=same
    b -> d [ label="alt" ]
  }
}
```

## PlantUML

PlantUML is a funny sort of super-language. For the most part it looks at the content of your markup and guesses what sort of diagram you want. It can do this since the syntax of each diagram is different enough to be distinguishable. Starting with my favorite, a sequence diagram, this is the exact and complete code:

```
browser -> server : Request page
server -> database : Query for matching post
database -> server : Search results
server -> browser : Rendered page
```
```plantuml
browser -> server : Request page
server -> database : Query for matching post
database -> server : Search results
server -> browser : Rendered page
```

Now we can compare that to this activity diagram. Each part of this code corresponds to a part of the diagram, and it should be very readable even without reading the documentation.
```
start

if (Sunny outside?) then (yes)
  :Go for a walk;
else (no)
  :Stay inside;
endif
:Eat ice cream;

stop
```
```plantuml
start

if (Sunny outside?) then (yes)
  :Go for a walk;
else (no)
  :Stay inside;
endif
:Eat ice cream;

stop
```

## Mermaid

I don't like it as much as PlantUML when it comes to the syntax, but Mermaid is increasingly popular and available. Specifically, you can put Mermaid directly in markdown and github will render it!

```
graph TD;
    A-->B;
    A-->C;
    B-->D;
    C-->D;
```
```mermaid
graph TD;
    A-->B;
    A-->C;
    B-->D;
    C-->D;
```


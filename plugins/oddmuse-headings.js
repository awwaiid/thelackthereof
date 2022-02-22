var u = require('unist-builder')
// var inspect = require('unist-util-inspect')
// var findAndReplace = require('mdast-util-find-and-replace');

function findAndReplace(tree, from, to) {
  if(tree.children) {
    tree.children = tree.children.map(node => findAndReplace(node, from, to));
  }

  if(tree.type == "text") {
    // console.log("was", tree.value);
    // tree.value = tree.value.replace(from, to);
    let m = tree.value.match(from);
    if (m) {
      return to(m);
    }
    // console.log("now", tree.value);
  }

  return tree;
}

function oddmuseHeadings(tree) {
  // console.log("oddmuseHeadings input", inspect(tree));
  // console.log("oddmuseHeadings input", tree);
  // tree = findAndReplace(tree, 'sugar', 'thugar');

  // In today's sugary exploration, let's take a look at a shorthand for object key expansion in Javascript (ECMAScript 2015+, es6+). For an overview of the TON of delicious sugar that was added to Javascript at around es6, check out [[http://es6-features.org/#PropertyShorthand es6-features.org]].

  // Replace links like [[URL text]] and [[URL|text]]
  // This eats the whole text though

  tree = findAndReplace(tree, /^= (.*) =$/,         m  => u("heading", { depth: 1 }, [u("text", m[1])]));
  tree = findAndReplace(tree, /^== (.*) ==$/,       m  => u("heading", { depth: 2 }, [u("text", m[1])]));
  tree = findAndReplace(tree, /^=== (.*) ===$/,     m  => u("heading", { depth: 3 }, [u("text", m[1])]));
  tree = findAndReplace(tree, /^==== (.*) ====$/,   m  => u("heading", { depth: 4 }, [u("text", m[1])]));
  tree = findAndReplace(tree, /^===== (.*) =====$/, m  => u("heading", { depth: 5 }, [u("text", m[1])]));


  return tree;
}

module.exports = function () {
  return oddmuseHeadings;
};


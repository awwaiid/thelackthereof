---
title: Sugary_Sunday_-_JS_Variable_Key_Expansion
createdAt: 2020-06-21T13:58-04:00
editedAt: 2020-06-21T14:02-04:00
---

= Sugary Sunday - Javascript Object Property Shorthand =

In today's sugary exploration, let's take a look at a shorthand for object key expansion in Javascript (ECMAScript 2015+, es6+). For an overview of the TON of delicious sugar that was added to Javascript at around es6, check out [[http://es6-features.org/#PropertyShorthand es6-features.org]].

Most of the "scripting" languages (Python, Ruby) have "dictionaries" or "hashes", a datastructure of key-value pairs. In JS these are called "objects", and they do a lot of other things beyond this basic data-storage behavior. In JSON -- JavaScript Object Notation -- you can see the basic literal declaration syntax. Let's build an addressbook, keyed (indexed) by name.

```
let addressBook = {
  "alice": {
    "street": "123 Elsewhere Lane",
    "zip": "32341"
  },
  "bob": {
    "street": "221 Baker Street",
    "zip": "00234"
  },
  "clarence": {
    "street": "P.O. Box 17",
    "zip": "88877"
  }
};

console.log("Bob's info", addressBook["bob"]);
```

For our first dash of sugar, we can remove the string notation on keys. They are still strings! We can also access `bob` using property notation.

```
let addressBook = {
  alice: {
    street: "123 Elsewhere Lane",
    zip: "32341"
  },
  bob: {
    street: "221 Baker Street",
    zip: "00234"
  },
  clarence: {
    street: "P.O. Box 17",
    zip: "88877"
  }
};

console.log("Bob's info", addressBook.bob);
```

Pretty fun. But that's not what we're here for. Let's say we have a variable, `doug`, which contains an address entry. We might do something like this:

```
let doug = {
  street: "6453 Canyon Canyon",
  zip: "53425"
};

let addressBook = {
  doug: doug
};
```

It's that last bit where we can add The Sugar. Remember that the key is actually a string, `"doug"`, whereas the value is a reference to the variable `doug` (which contains an address). What we can do here when these two things are exactly the same is collapse them!

```
let addressBook = {
  doug
};
```

This crazy bit of sugar does something pretty strange -- it uses the *NAME* of the variable as the stringified key! In most circumstances and languages the name of a variable doesn't really matter to the running of the program. This sugary feature sort of breaks the 4th wall, reaching into the source code and lifting the specific variable name into the key (property) of the object.

== Real World Example ==

In VueJS a component can use other components inside the template, but only if they are declared first. Here's a snippet extracted and summarized from the covidcanidoit.com codebase:

```
<template>
  <div>
    <SearchBar />
    <SearchResults />
  </div>
</template>

<script>
// Importing alone does NOT register the components for use in the template
import SearchBar from "@/components/SearchBar.vue";
import SearchResults from "@/components/SearchResults.vue";

export default {
  components: { SearchBar, SearchResults }
};
</script>
```

Pretty slick. If you wanted to, you can give the components local-names (or I suppose register a single component with several names, weirdo).

```
components: { coolSearch: SearchBar, coolSearchResults: SearchResults }
```

Providing a "list" of components in VueJS is done by providing this object, which gives VueJS not only the component but also the NAME of the component, without VueJS needing to reach inside the component to ask it what its official name is.

== BONUS ==

I like to sprinkle `console.log` all over the place while exploring code. In addition to static strings, I often throw in the contents of variables. But generally I want to know the NAME of the variable, in addition to the content. So I used to do:

```
function addAddress(newAddress, otherStuff) {
  console.log("Adding newAddress:", newAddress, "otherStuff:", otherStuff);
  // ...
}
```

Using today's sugary shorthand, I now usually do this:

```
function addAddress(newAddress, otherStuff) {
  console.log("Adding", { newAddress, otherStuff });
  // ...
}
```

This will output something like:

```
Adding
{ newAddress: { street: "...", zip: "..." }, otherStuff: ... }
```

You can see that the variable name is handily provided. Here when I had multiple variables I want to log it is even more handy.

*DELICIOUS!*


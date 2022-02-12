---
title: VueJS_Notes
createdAt: 2020-02-16T17:06-05:00
editedAt: 2020-02-16T17:12-05:00
---

= VueJS Notes =

* Vuex
  * Makes me think of Software Transactional Memory
  * Mutations are synchronous
  * Since JS is single-threaded, that means they are atomic
    * Even if they modify the state LOTS
  * Actions are a transaction that get committed
  * Actions are built out of multiple mutations
  * Actions can be async
  * At the end of an Action the state must be committed
    * Where is the intermediate state stored?
    * How are conflicts resolved?
  * ...
  * Based on experimentation, there is NO implicit transaction for an Action
  * In an action, each Mutation is executed immediately
  * I guess you could build something to make an Action have local-state transaction
* Sugar
  * One of the ways I like to learn and think about things is "what part of this is sugar?"
  * Attributes in components can use (mis-use?) xml namespaces to indicate the usage of the attribute
  * `v-bind:value="foo"`
    * SUGAR: Drop the `v-bind` and you end up with `:value="foo"`
  * `v-on:click="doStuff"`
    * SUGAR: Replace `v-on:` with `@` and end up with `@click="doStuff"`
  * Not Vue specific, but there are many oft-used JS sugar things
  * My favorite is implicit-object (aka hash) key
    * Take `{ "Person": Person }`, where `Person` is a scoped variable
    * First, it is well-known that you can drop the quotes
    * `{ Person: Person }`
    * With new JS you can also collapse this down further, since the key and the value-name match
    * `{ Person }`


---
title: "TypeScript, a gentle intro"
description: "Why I'm the 'guy that adds TS everywhere'."
datetime: "1 Dec, 2022"
tags: ["tech"]
---

At CreditPer, we inherited a codebase that is.. beyond explanation. All JavaScript, no hint of TypeScript.

One of the pros mentioned regarding JavaScript is that it is very easy to learn. But it is also a really big con… **Anyone** can learn a bit of it and then write code that is just.. not good.

JavaScript makes it very easy to write garbage. Ever wondered why it has a garbage collector? Well now you know. _(sarcasm if it wasn’t obvious)._

## Why even consider TypeScript?

Ask yourself, how confident are you in your JS code? Especially the one that you haven’t written a test for, and have not manually run yet.

Chances are, you’re not so confident. You expect to run it manually to see if it throws an exception somewhere, and then you will update your code, and repeat this process until it works without throwing errors.

TypeScript **will not** prevent all errors, but it sure will reduce the ones that make you go “oho, forgot to do this small thing, no biggie”.

But it is a biggie, a big biggie, because you chose to use JS when we have TS.

## TypeScript is just types for JS

Yesn’t.

We tend to think that just because we have worked in a few `*.{ts,tsx}` files, that we have experienced TypeScript. We believe just because we worked in a few TS codebases, we **know** what TS has to offer.

This wasn’t the case for me, and I’m willing to argue that it will be similar for other people too.

## Types are the foundation

The niceties that a good type system provides, are all built on the foundation of types.

This is what one mostly thinks of when they hear TS, they think it’s just:

```rust
const myNumber = 1;         // JS
const myNumber: number = 1; // TS, just add type
```

This indeed is nice. These primitive types are indeed the foundation of other TS features, and one should absolutely learn to use them.

**Note:** Avoid `any`, especially if the type is a primitive type. If one could’ve added the type `string` but chose to add `any`, I infer that there is a gap in one’s understanding of TS.

This is what I was doing in Angular projects, and it shows I just didn’t understand why TS exists, let alone not utilizing it properly.

## Types answer the question of “What” is something

Here’s my attempt at badly showing the difference between JS/TS through an analogy.

### JavaScript

Here’s something, pick it up from the top handle.

### TypeScript

Here’s a **bag** that **has a** handle at the top. Pick it up from the top handle.

### Comparison

Both are somewhat similar. TS only adds a bit of context i.e. **what** _something_ is. This context, albiet small, can be used to infer a lot of details.

First, if we look at the JS code, we are given something. We don’t know what it is. It can be a bag, a table, a dog, **any**thing. We simply proceed to grab the top handle, expecting it to be there.

Okay, but what if we got a dog, which won’t have a handle? Well, JS is really intuitive and we’d get `undefined` _(sarcasm, again)._ And if you went further and tried to access something inside of it, you’d then get:

```
cannot read property `handle` of undefined
at (wowie/powie/oopie/howie)
at (wow/you/are/reading/this)
at (this/is/an/exception)
at (despise/these/runtime/errors)
at (treat/errors/as/values/pls)
...
```

This is what JS accustomes you to. To treat runtime exceptions as normal. But in this era, this is not what we should consider normal.

**TypeScript** on the other hand, tells us that **something** is a bag that has a handle. Very nice. We now know that it has a handle. Knowing this, we can be sure that when we try to pick it up, there will be a handle for us to grab.

If **something** is a dog, we’ll know that it does not have a handle, and we don’t need to even **attempt** to grab a handle because we already know dogs don’t have handles.

Knowing it ahead of time, without needing to try grabbing the handle, is proactive. Think of proactive being compile-time. Reactive approach would then be handling errors at runtime.

JS works by just expecting stuff to be there. There is no context provided, while TS creates contracts that allow or disallow certain behaviours.

## Conclusion

The type system of TypeScript is easy enough to promote rapid development, and offers code confidence that you just cannot get with JS.

For a really gentle introduction, you don’t even need to **migrate**. I’ve followed the below steps to add TS support in any existing project:

1. Add TS deps (`typescript` with `@types/node`).
2. Copy over build config to `tsconfig.json` (we had gulp files, so I copied over the glob patterns to `tsconfig.json`).
3. switch over to building with `tsc` compiler.
4. Do a small run just to check there are no errors at startup
5. If all is up and running, switch over to TS
6. Implement **all new features in TS** (this is the nice part, no one said that you need to convert existing code to TS, but at least we can now write newer code in TS, and not add more JS).

## Resources

[tsconfig bases](https://github.com/tsconfig/bases): plug a base so you don’t worry about configuring TS’s runtime configuration

[Official TS Handbook](https://www.typescriptlang.org/docs/handbook/intro.html): For those that like reading

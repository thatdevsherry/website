---
title: "Compromising on code quality"
description: "It's not a good idea."
datetime: "12 November, 2021"
tags: ["non-tech"]
---

If we are given a short deadline to push out a product, what parts of the development flow are we able to cut corners on?

Where is the boundary for how much corners we can cut, **without** significant consequences? What is the bare-minimum we **need** to do, and how does it affect the long-term maintenance of a project?

The question is, is compromising code quality **actually** a corner we can cut?

## Early days of my career

During my not-so-extensive career in software development, I have jumped across many tech-stacks, although not to the extent of most front-end developers testing out each new JS framework.

This experience didn't really teach me a lot about code quality, partly because I was working as **just** a programmer and wasn't involved in code quality discussions.

## First experience with code quality

My first real experience with code quality came when I started programming in Rust. I was a really good programmer. How do I know? I didn't write tests. My reasons were naive, but I want to ask, isn't this how all of us think when we start off a new project in a new language or framework?

1. The project has just started, so code will change a lot. I shouldn't bother with tests right now.
2. I've just started learning the language, spending time learning and writing tests will cost me more time.

This turned out to be a really bad decision. Bugs are always around. Without tests, you're reduced to simply changing the code and hoping that fixes the problem. Manual testing is all you have.

## Looking up to mentors

One gem I found on YouTube is Dave Farley, from [Continuous Delivery](https://www.youtube.com/@ContinuousDelivery). I'd like to quote one of his thoughts on writing tests:

> While running it manually or watching it execute in your debugger have a place, if they're the only way that you're testing your code, you're wasting a lot of your time.

I feel quite embarrassed to say that I was in that place, but it turned out to be a great learning opportunity for me. I **did** spend a lot of time trying to fix bugs, only to have even more creep in from my changes.

## Testing is automation, and automation is good (most of the time)

My personal view of why we should write automated tests is simple, efficient feedback equals better code. In my example, I had no automated feedback. That in turn made me write bad code as I had no feedback to tell me whether my code is okay or bad.

As developers, we like to automate things that become repetitive. Writing automated tests also gives a good return-on-investment, but we fail to realise that.

## Concluding thoughts

This isn't totally on just the programmers though, I feel you have to go through managing a project without tests, to realise the importance of them.

Other than that, I can only say that the lead engineers or the developers themselves setup quality checks to not push out code without tests. This has to be done from the start. If that's not possible, they need to be introduced, gradually.

---
title: "Reducing exceptions in TypeScript"
description: "Making TypeScript work like Rust."
datetime: "1 Dec, 2022"
updatedDate: "1 Dec, 2022"
tags: ["tech"]
---

Practices I’ve developed for myself when working with different areas of a project in TypeScript. These are all presented with my limited view.

The reason for these flows is because I started re-learning [Rust](https://www.rust-lang.org/) and I absolutely love how it tells me to handle each and every case. It gives a whole new level of confidence in my code.

## Error as object

Once I used Rust’s `Result<T,E>` type, I wanted to use it everywhere. I started to hate JS/TS’s exceptions because it took away my confidence from code. One then tends to wrap all their functions in `try-catch` blocks out of fear.

I started making a `Result<T,E>` type of my own in projects, which is simply a small type with generics and nothing more than an object with `data` or `error` property.

```tsx
type Ok<T> = {
  data?: T;
  error?: never;
};

type Error<E> = {
  data?: never;
  error?: E;
};

export type Result<T, E> = Ok<T> | Error<E>;

export const Ok = <T,>(value: T): Ok<T> => ({ data: value });

export const Err = <E,>(value: E): Error<E> => ({ error: value });
```

However, I soon found out that there are existing libs that provide this flow. One such example is [true-myth](https://github.com/true-myth/true-myth).

## Working with external APIs

When working with any third-party API, that I do not have control over, instead of just doing

```tsx
/**
* Just assume `response` **will** be of type `CustomResponse`.
*
* Note: intentionally not checking for `data` to keep example concise.
*/
const response: CustomResponse = axios.verb(..).data;
```

I like to introduce a parser that actually checks if the response maps properly

```tsx
const response: unknown = axios.verb(..).data;
const { data, error } = parseApiResponse(response);
if (error) return Err(error);
return Ok(data);

/**
* Parse input into a `CustomResponse`, returning error if failing instead
* of throwing an exception later on because we accessed a property that
* does not exist.
*/
const parseApiResponse = (response: unknown): Result<CustomResponse, MyError> => {..}
```

Third-party libraries might update their response anytime. To make sure our code does not throw an exception at runtime, the parser will allow us to handle this case and keep the control flow in our hands.

Note that this can also be used for internal services as well. If one is not using a mono-repo, in which case you can have a single type which gets used by both API and the API consumer, we have no way of completely making sure that the API response **will** be exactly the same as the type we define.

Implementation of parser is up to us. One can utilize great libraries like [Zod](https://github.com/colinhacks/zod) which makes validation a breeze.

## A note on exceptions

The above practices mentioned still do not remove exceptions from our code. It merely wraps code that possibly throws an exception, and returns the error as a value, rather than exploding with exception.

The flow that `Result` type provides me is to separate out functions that can throw an exception, and only have the `try-catch` in them.

For example, let’s take an example of a function completely wrapped in `try-catch`, which is a bad practice, but I’ve come across it often, especially in JS.

```tsx
const someFunction = () => {
  try {
    ..
    iThrowException();
    ..
  } catch (err) {
    // handle err
  }
};
```

We figure out exactly which parts can throw. We’ll then separate them out and wrap them in a `Result` type.

```tsx
// using `any` to make example concise.
const iThrowException = (): Result<any, string> => {
  try {
    ..
    return Ok(value)
  } catch (err) {
    /**
    * We can return detailed error as we have separated this function
    * and know exactly why it can fail.
    *
    * Compare this with the previous example where try-catch was wrapping
    * the entirety of a function which forces us to return a generic error
    * in the catch block as we don't know which part of the function threw
    * the exception.
    */
    return Err('detailed error')
  }
};

const someFunction = () => {
  ..
  const { data, error } = iThrowException();
  // handle `Result`
  ..
};
```

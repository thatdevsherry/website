---
title: "Moving faster with OpenAPI Specification"
description: "Always pair OAS with anything REST."
datetime: "7 January, 2022"
tags: ["tech"]
---

During my recent job, a **REST-based** project was being rewritten from scratch. Plenty that can go wrong, but there was one problem that was specifically screaming at my face:

> **Project Manager:** Why are these frontend stories not in **Done**?
>
> **Frontend team:** We’re still waiting for the backend APIs for testing

What do I find wrong about this?

> Frontend stories should not be dependent on a backend API, or more specifically, they should not depend on the backend **implementation being written first**

I should make it clear that this article is about a project using **REST**. GraphQL works differently so this doesn’t apply to it.

## Parallel Development of Frontend and Backend

I find the **waiting for APIs** to be an excuse. Especially because we now have [**OpenAPI Specification**](https://swagger.io/resources/open-api/), which eliminates the backend implementation dependency for frontend.

Having frontend rely on backend API's **implementation** is insanely inefficient. OAS (OpenAPI Spec) has streamlined the entire process.

Without OAS, we’d be going like this:

1. Frontend & Backend discuss the API request/response
2. Both start implementation
3. Frontend **needs** to test out its integration because things can change, so there is back-and-forth between the frontend and backend team

With OAS, we can now go like this:

1. Frontend & Backend discuss the API request/response
2. They write down their discussed flow in the OAS file
3. Backend & Frontend now have the OAS file as their shared specification. They can work independently

Couple of advantages with OAS:

- Without OAS, frontend needs to constantly check-in with backend to ask and adjust itself for changes introduced in the API, since API can change its structure during development
- With OAS however, frontend team can adjust new changes, without ever speaking to the backend team. If any change is made, the backend team can update the OAS, and frontend can adjust itself to the updated OAS
- It is a specification. It forces the knowledge out from backend/frontend team and into a digital document. No need to wait for APIs, if one side conforms to the OAS, they’re good and don’t need to wait for the other side to finish their implementation

Now, I’m not saying that OAS is everything and we shouldn’t **test integrations**, but we **should** have OAS in our REST projects. I like to think of OAS as supplementing integration testing.

## Credit

I began researching more on how we can utilise OAS after reading how [Sadapay uses it](https://sadapay.pk/minimising-testing-at-sadapay/). They’ve gone one step ahead by using generators to eliminate API structure discrepancies.

---
title: "My view on usage of Kuickpay consumer number"
description: "How Kuickpay consumer numbers can be best utilized."
datetime: "23 May, 2022"
tags: ["tech"]
---

At my current job at [CreditPer](https://www.creditper.pk/), I was introduced to an online payment platform called [Kuickpay](https://kuickpay.com/). I’ve already used it to pay for a few bills, but I never really looked into how it worked.

## Typical flow

1. Generate a payment request from the billing company
2. The billing company generates a **reference number** _(referred to as **Consumer Number** in Kuickpay terms)_
3. Through bank’s online portal, select to pay bill through **Kuickpay**
4. Enter the consumer number
5. Bill details are fetched and displayed
6. Pay the bill
7. Bill is marked paid

This is pretty simple. You get a reference number, enter it, and your bill is paid.

What is interesting, is how the **consumer number** is used.

## Consumer Number

A Consumer Number **(CN)** is used to pay for a specific bill.

### Consumer Number Format

The total length of a consumer number, according to their website, is 13.

However, I have seen consumer numbers in the wild that are both below and above the 13 digit limit.

I got my hands on their merchant API documentation, and found out that the **preferred CN length is 13 - 18**.

**CN Format:**`[ XXXXX ][ YYYYYYY { YYYYYY } ]`

- First 5 digits are assigned uniquely to each merchant i.e. static for each company.
- Remaining 7-13 digits can be used to make permutations.
- Max permutations range from $10^7$ for 7 digits to $10^{13}$ for 13 digits, as each digit is a number from 0-9.

**Note** that I saw the CN length discrepancy in the wild. Kuickpay might want to update their docs to indicate we shouldn’t always expect a 13 digit CN 😄.

### Ways to use CN

There are basically three ways (imo) to use CNs, you can either:

- Use a new CN for each payment ❌
- Associate a single CN to a single customer ✅
- Use a single CN for multiple customers ✅

**Note** that this is agnostic of the merchant’s business model. No matter how a merchant links CNs with their internal data model, the use case for CN itself remains the same i.e. managing payments.

Also, **customer** referred in this article is not solely a person. It is any model that has payments linked to it. For electricity bill, **customer** would be **the house or flat**. For loans (CreditPer), the loan model is the **customer**.

**Editor Note:** Sorry if these terms are confusing. I’ve used them interchangeably throughout this article.

### New CN for each payment ❌

![One Kuickpay Consumer Number per payment](/assets/kuickpay_cn_per_payment.avif)

This is a bad approach. We would be assigning each payment a unique CN. CNs have a limit, and we would run out of CNs the fastest if we are to associate CNs as unique ID for each payment.

### Single CN for each customer ✅

![Single Kuickpay Consumer Number for each customer](/assets/kuickpay_cn_single_user.avif)

In this flow, we can associate a single CN for a single customer. This is the implementation that I’ve seen with merchants that have recurring payments e.g. electricity bill, rent etc.

A single CN is assigned to a customer (or the model that has payments linked), and that CN automatically points to a new bill as it comes out. This is better than the first approach, as we are now associating a CN as unique ID for each specific customer, rather than for just each payment.

I like to think of CN as being a **pointer** in this approach. The CN of the customer automatically points to their new bills as they are generated.

There are a few things to note:

- If a CN automatically points on each new bill, and the user decides not to use kuickpay for future payments, the CN is assigned but not being used
- If a CN only points to a bill when the user asks, the CN is still taken after the first kuickpay payment request, and keeps itself assigned to the specific customer

In both cases, we restrict a single CN for a single customer.

In this approach, we will run out of CNs if our number of customers that used kuickpay once reaches $10^{7} - 10^{13}$.

### Single CN for multiple customers ✅

![Single Kuickpay Consumer Number for multiple customers](/assets/kuickpay_cn_across_users.avif)

This flow is what I personally liked. It is the slowest to run out of CNs. This is simply because it does not associate a CN as being unique to a customer.

In the previous approach, each customer that uses kuickpay once, will get themselves a CN assigned, even if they decide to not use kuickpay after that.

But in this approach, we can think of having a pool of CNs. When a customer decides to use kuickpay for a payment, a CN from the pool that is not currently being used, is assigned to that specific payment. Once that payment is made (either through kuickpay, **or any other method**), the CN is released back into the pool for reuse.

The logic is as follows:

1. Check if there is any available CN in the generated pool
1. If so, assign it
1. If not, generate a new CN and assign it

This is simply an extension of the previous approach. Remember the analogy of **CN being a pointer?** This only extends that logic across multiple customers.

**Note** that it is not necessary to pay the bill through kuickpay. Suppose a customer selects kuickpay for a payment and gets a CN. If they pay that bill by any other means, when the bill is being marked as paid, we can check if there is any CN associated, and release it back into the pool.

This way, at any point in time, all CNs point to a valid bill. This flow makes the use of CNs the most efficient out of other approaches.

The only way to run out of them is when we reach a time-frame where $10^{7} - 10^{13}$ unpaid bills are selected to be paid through kuickpay, and are awaiting payment. A new CN cannot be generated until one of them gets paid.

## One Big Problem

The last approach does seem cool, but it comes at the cost of a really bad user experience.

> I, as a user, would have to enter a new CN each time I want to pay a bill.

Suppose I pay my electricity bill through kuickpay. I would have to enter a new beneficiary/bill in my bank portal as I would be getting a new CN for each bill payment, which is bad UX.

We would need to have an approach in-between. But it depends on the business flow.

### Limited Bills Example

![Kuickpay Consumer Number completion](/assets/kuickpay_cn_completion.avif)

Take CreditPer as an example. It provides loans. Each loan has limited repayments. We can assign a single CN for each loan. Once a loan is paid off, we can free up the CN.

The UX in this case is that the customer would enter a new kuickpay CN for each loan, which makes sense. A single customer cannot have a single CN, because they can have multiple loan payments, and a single CN cannot point to multiple loan payments at the same time.

### Electricity Bill Example

Taking electric bill as an example, we could add a check that if the user has not used kuickpay for their bill payment for a few consecutive bills, we can then free up the CN. However, this approach seems to be **over-engineering**, and the **CN per customer** would be better than trying to add unnecessary complexity with the **CN across customers** approach.

## Concluding thoughts

Both the **single CN for each customer** and **single CN across customers** are valid approaches, and largely depend on the business model.

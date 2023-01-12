---
title: "Breaking down a loan"
description: "Simple breakdown of how a loan is calculated."
datetime: "2 July, 2022"
tags: ["non-tech", "finance"]
---

After joining [CreditPer](https://www.creditper.pk/), I had to get myself comfortable with the business side of things i.e. finance. Grasping the domain knowledge is mandatory as an engineer because the software we build revolves around that domain.

**Note:** The flow I discuss in this article is my limited view of how loans work. This is by no means a comprehensive (or 100% correct) flow, but just the knowledge I have gathered **as of now**. Plus it is related to how CreditPer handles loans, which may be different than normal flows.

I’m only discussing how the numbers are broken down. [Investopedia](https://www.investopedia.com/) and internet has better definitions of all the terms, so I won’t be talking about that.

## Journey of a loan

By journey of a loan, I refer to the entire flow from the start of the loan i.e. down payment, up to the maturity date of the loan.

## Split into Down payment and Amount Financed

![Market price split into down payment and amount financed](/assets/mp_to_dp_and_af.avif)

For a given [market price](https://www.investopedia.com/terms/m/market-price.asp) of a product, we split that price into two parts, **[down payment](https://www.investopedia.com/terms/d/down_payment.asp)** and **[amount financed](https://www.investopedia.com/terms/a/amount-financed.asp)**.

### Down payment

It can either be a fixed price or a percentage of the market price. Also called **equity**, as the customer is paying this money in exchange for partial equity of the product.

### Amount Financed

Market price minus down payment. This is the remaining amount that is going to be financed.

## Capitalization

![How Capitalization works](/assets/capitalization.avif)

After splitting the market price into down payment and amount financed, we now need to add profit and all other charges.

Now, the profit and charges can add up into either the down payment or the amount financed.

> The process of adding up profit and charges into the amount financed is called capitalization (or EMI capitalization). A loan that adds the profit and charges into down payment is referred to as a non-capitalized loan.

## Amount Financed converted to repayments

![Amortization](/assets/amortization.avif)

Once we have the entire loan amount, we can proceed to [amortize the loan](https://www.investopedia.com/terms/a/amortized_loan.asp) i.e. split it into multiple payments, called **[EMIs](https://en.wikipedia.org/wiki/Equated_monthly_installment)**. It is also referred by other terms such as **repayments, installments** etc.

## End Result

The EMI formula gives us **fixed** monthly payments.

The formula for calculating fixed payments being, _(taken from investopedia)_:

$$
Total \space Payment=Loan \space Amount \times \Bigg[\frac{i \times \big(1+i\big)^n}{\big(1+i\big)^n-1}\Bigg]
$$

$$where \space i=monthly \space profit \space rate, n = tenure$$

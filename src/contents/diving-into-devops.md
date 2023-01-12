---
title: "Diving into DevOps"
description: "Initial interaction with IaC."
datetime: "20 April, 2022"
tags: ["tech"]
---

During my brief time working with a company, I started working on the backend of one of their projects.

## Initial Stages

Initially, we had no deployment mechanism. We were opening up [ngrok](https://ngrok.com/) tunnels for the frontend team.

After a while, our team lead was able to spin up a staging server, along with a Gitlab CI pipeline that automatically deploys the latest code.

This was a good improvement, since we now didn’t need to keep our machines open with ngrok tunnels.

## Room for improvement

Our Gitlab CI pipeline was only for the **staging** environment. This meant we had to push our code to `main`, and then to `staging` for the changes to go live.

Now, this can be fixed by setting up a deployment for `main` branch, and treating it as the **development deployment**.

Seeing that we’ll probably be doing this soon, I wanted to dive in and see if we can incorporate **Infrastructure-as-code** tools for it.

This way, we can setup IaC for the development environment, and then easily extend it over to `staging` and `production` environments.

## Researching IaC

I knew a bit about **Terraform**, so I started with that.

I wrote a small IaC configuration that sets up a machine on the cloud. But that was the easy part. After I was done with that, I came across the question:

> How do I **setup** the machine to install all the required software and application code?

If I could do that, I can theoretically destroy my whole infrastructure, and recreate it again without problems.

## Ways to configure a server

I thought of doing this the naive way i.e. configuring the server **after** provisioning it. I came across [Terraform provisioners](https://www.terraform.io/language/resources/provisioners/syntax) but they were not recommended, since it’s quite hard to manage their state and to know if all the commands were successful.

I started diving into it more and I found another HashiCorp Product, [Packer](https://www.packer.io/).

It allows creating custom images that have all our custom configuration, and then it’s a matter of simply deploying that image onto a server.

I had to simply switch my naive way the other way around, from:

1. Provision Infrastructure
2. apply custom configuration

to:

1. Apply custom configuration; create custom image
2. Provision infrastructure and use the custom image

## Concepts

### Mutable and Immutable Infrastructure

My naive approach was to provision a machine first, and then modify it by installing software and configuring it. This approach is called **mutable infrastructure**, whereby we make changes to a server after its deployed.

I also found that our **staging** environment is a **mutable infrastructure**. We have an AMI that has most of the configuration, but whenever we run the CI pipeline, we are pushing the latest application code onto it and restarting our application.

On the other side, immutable infrastructure is one where we never modify existing resources. If we want to update our application, we create a brand new server with the latest code, and delete the old one (replacing/re-creating).

### [Single instance of infrastructure code](https://infrastructure-as-code.com/book/2021/11/19/snowflakes-as-code.html)

When we’re using `git`, we mostly have a base branch e.g. `dev` or `main`, which acts like the upstream branch. Newest code is first pushed in `dev`, where it is then moved to branches like `staging`.

As for `git`, our goal is to keep the branches largely similar, by pushing to a base branch and copying those changes to other branches. Similarly for IaC, our goal is to keep the infrastructure code as similar as possible.

But does this mean we run the same big machines for `development` environment as we do for `production`?

Not really. The point of this concept is to keep the general infrastructure similar, but we don’t need the exact resource configuration.

For example, our IaC would provisions 5 AWS EC2 instances to run 5 different services. This is going to be the same across all environments.

What’s different however, is the configuration of those EC2 instances. For `development` environment, we would be running smaller instances e.g. `t3.small`, whereas in `production` environment we’d be running them on bigger instance type like `t3.2xlarge`.

## Concluding thoughts

I found these new methods to give more confidence. For example, traditional deployments are mutable, and the process of **deployment** doesn't instil confidence. It's seen as a scary and potentially failing job.

However, an immutable deployment adds more confidence, just because you know that you can potentially destroy the infrastructure/resource and re-create it again.

These methods might look weird and unnecessary (why even destroy and recreate), but it's exactly what adds confidence. Just knowing you can do crazy things and recreate the same environment shows the power & control over deployments, the same way **VCS** gives control over code management.

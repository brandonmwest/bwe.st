---
layout: post
title: "Building a RESTish API, Part One"
category: api, development
---
{% include JB/setup %}

About a month ago, I had a great discussion for the [Voices of the Elephpant podcast](/API/2012/06/27/voices-of-the-elephpant-podcast/) with a [group of developers](http://twitter.com/#!/brandonmwest/elephpant-podcast/members) that know a TON about APIs. Being the only person in the group that had never created or worked on an open API made me pause and wonder why I had never given it a shot, so I've decided to give it a shot. I've spent a lot of years as a consumer of APIs, but as a developer I wanted to take a peek under the hood and understand more about what was going on from the provider's perspective. I'll be using this blog in an attempt to organize my thoughts, share my approach, and document what I learn.

## Starting Criteria

### Separation of Concerns

It's extremely tempting to build an API as a component of a specific product that will consume it, but I wanted to make sure that this new API was a discrete entity, for several reasons. First, I wanted to experience the API the same way that developers implementing it will experience it, which is independently and decoupled. Second, this approach will force me to create a robust wrapper that will let me interact with the resource model, and which I can then provide to early adopters. As a hypothesis, I also think this development path will protect me from scope creep in the product itself. If I have to build a new API endpoint or method in order to do something new, I believe I will be much more honest in weighing the benefits of that particular feature, which I hope will make me focus on shipping code.

### OAuth

I've always appreciated how easy and how standard it is to setup OAuth as a consumer, and I wanted developers using my API to have the same familiar implementation. I also wanted to support three-legged authentication, wherein a user can grant a third party consumer access to her resources. For an example, consider an application that will follow certain twitter users on your behalf. Before that can happen, you need to tell twitter that it's okay for that application to manipulate your followers. From what I have seen at hackathons, allowing this sort of authentication can greatly increase the number of apps built on your platform by allowing for easier mashups.

## Things I Didn't Care About

### Scale

I found a lot of information about how to optimize a stack for serving an API at scale, and it's nice to know that there are lots of options. I will be absolutely thrilled if I have to solve problems of scale at some point, but that point is not now.

### Pure REST

Being strictly RESTful is a noble goal, but right now my goal is to ship code. I am going to try and keep an open mind, and if during the course of development from the product side I believe it might be easier to have links for manipulating resource state as part of the API payloads, I'll give it a shot.

## Things I've Learned So Far

### OAuth is Tricky

OAuth is not easy to fit in your head. It's pretty complex thing, and it takes a while to understand it. I'm still a bit fuzzy on some parts, and that's after implementing an OAuth2 provider. Give yourself plenty of time to consider OAuth. Authentication is a crucial part of an API, so be sure to make a choice with which you'll be happy.

### Build Your Docs in Parallel

As you build out your API methods, you should be documenting them. You'll be able to ensure consistency, and if you use an interactive documentation platform, you'll get a couple added benefits: you'll get to test your API response as you go, and you'll have a JSON description of your entire API, which can be quite handy for scripting things such as static documentation. I'm using [iodoctor](http://iodoctor.net) as a GUI for building [I/O Docs](http://github.com/mashery/iodocs), which I am then running locally (and will deploy to Heroku at some point). It's far less tedious and far more beneficial to write the documentation as you go.

### Write Integration Tests

Integration tests will eventually help you monitor your endpoints and give you way to test response times, etc, but at the beginning they are also a great way to enforce consistency and make sure that a change to a model doesn't inadvertently change a returned value or some such problem. Unit test your models and controllers, and unit test your client wrapper library, but integration is really the only way to test an HTTP API.

---

That's all I've got for now, but stay tuned for part two.

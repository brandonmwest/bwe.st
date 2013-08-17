---
layout: post
title: "Cheat Codes for Good Documentation"
description: ""
category: Documentation 
tags: [docs, opinion, development]
---
{% include JB/setup %}
<div style="float:left;margin:0 10px 10px 0" markdown="1">
![Still my favorite Programming Manual](/assets/images/image00.gif)
</div>

<small markdown="1">[Originally posted July 25, 2013](http://blog.sendgrid.com/cheat-codes-for-good-documentation/)</small>

Everybody, especially developers, loves working on documentation. They understand the importance of docs and its impact on customer adoption and customer experience, and they always consider docs when planning and releasing code. Wait, why are you laughing?

Many companies have some kind of trouble with documentation. Lots of common problems make docs difficult to wrangle; information gets out of date or lacks completeness, the content is poorly organized or inconsistent, readers can’t find what they’re looking for, and code samples might be broken. If you walk through most engineering departments and ask for volunteers to help update docs, you’ll be met with silence if not outright derision.

The truth is that there are no cheat codes for creating a culture that values documentation or for creating quality content, but I’d like to share some practical things I’ve learned while trying to do just that at SendGrid, and hopefully give you a few extra lives (or at least some extra quarters) for your game.

# Why Docs Matter

[Programmable Web’s API survey](http://blog.programmableweb.com/2013/01/07/api-consumers-want-reliability-documentation-and-community/) finds that “complete and accurate documentation” rates as the most important factor for people that consume APIs. It’s rated even higher than uptime and reliability. Think about that for a moment; how many people are on the ops team responsible for uptime and responsiveness? How many people are part of the customer service team making sure customers have a quick turnaround? And how many people are working on your customer-facing docs, which is as important if not more?

Looking internally, poor documentation will cause all kinds of problems as a codebase and customer base grows. Even if you manage to get customers in spite of bad docs, they’ll be calling, chatting, and emailing tech support regularly to supplement (or, for some customers, replace) the documentation. [Kevin Burke](http://kev.inburke.com/) from Twilio sums it up nicely in a blog post titled [Don’t Skimp on Documentation](http://www.twilio.com/engineering/2012/01/18/dont-skimp-on-documentation): “Just like quick-and-dirty coding decisions can lead to technical debt, poor documentation can lead to operational debt.” Early on in a company, crossover between your engineers and your support team means bad docs can slow down shipping code. And with good documentation, new hires have a reliable source of information to help them understand the product on which they’ll be working.

Docs are, in a way, your marketing materials for developers. I don’t mean you should fill your docs with marketing speak or choose phrases based on SEO goals; rather, I mean that if your docs are good, you’ll earn the trust and respect of your target audience. If your docs are bad, it doesn’t give the impression that your service is reliable and well-architected.

# What Makes Good Documentation?

If there’s one thing that I can state objectively, it’s that you can’t please everyone. No matter what criteria you define or how perfectly structured you think the document you’re working on might be, somebody will be able to find something they don’t like about it.

Everything else is subjective and at some point involves opinion and anecdotal experience. I know the SendGrid documentation can be improved; I think you’d have trouble finding a harsher critic of our documentation than myself. That said, I think we are accomplishing our goals and moving in the right direction. The following observations are things I have learned while figuring out that direction and how to turn the sails that way.

# Docs Goals

The following goals are broad, but they provide a quick measuring stick for determining what should and should not be in the documentation. If the content you’re working on doesn’t accomplish at least one and preferably more than one of these goals, step back and give it some more thought.

<div style="margin:0 auto" markdown="1">![It Is Dangerous to Go Alone](/assets/images/image02.png)</div>
## Make the User a Hero

Give the user the weapons they need to do the thing they need to do, quickly. Your docs should empower readers to understand and implement your platform so they can slay whatever code daemons they might be fighting.

## Let Customers Self-serve

Developers are people who need to get things done. They don’t want to call or email or use live chat to figure out how to do something if they can avoid it, because it slows things down. Good documentation is the light source that allows developers to venture into the unknown without fearing grues.

## Reduce Support Overhead

Just as devs don’t want to call or email or use live chat, reducing the number of support tickets and calls means less overhead for a business as well. Be there for your customers when they need you, but enable them to need you less.

# Categories of Documentation

![Types of Koopas](/assets/images/image09.png)

To accomplish these goals, we need to provide a variety of types of documentation. I’ve ended up boiling everything down to four categories.

## Descriptive

Probably the most traditional marketing piece of docs. These describe the problems you solve, how you solve them, and what benefits the customer will see by implementing your solution.

## Technical Reference &amp; Code

The nitty gritty details of how things work, including a description of all the API endpoints, methods, and parameters, along with example calls and responses. Also includes example code.

## Tutorials

Designed to take a user from square one to a working system that accomplishes a defined use-case.

## Interactive

Systems like [Mashery I/O Docs](https://github.com/mashery/iodocs), [Swagger](https://developers.helloreverb.com/swagger/), etc that let you test API calls or write code directly in the browser. Lets people try out the system without needing to write code (or needing to be able to write code).

# A Lot of Documentation is an Engineering Problem

![Pipedream](/assets/images/image05.png)

Let’s look at those categories again. The “descriptive” category should mostly be covered by the marketing team. It doesn’t really need to be technical, but should guide people to more technical sections of the documentation that might be relevant to their demographic. Reference and code requires engineering resources, either to pass technical details to a writer or to actually write code samples. Tutorials require engineers to design and build the solutions. And interactive systems require engineering resources for implementation (and possibly maintenance).

3 out of the 4 categories require development resources, and we’ve found that to be true in practice and not just theory: the SendGrid docs site right now has around 230 HTML pages, but there are more than 2,100 code blocks. Coders wrote those code blocks, not tech writers. If your content will be consumed by developers, you will have developers involved with creating docs from a content standpoint. And of course if you want to customize the platform that your docs site is built on, you’ll need a developer.

The good news is that because a lot of good documentation is engineering, there are lots of software development principles that can be applied, and keeping those things in mind will make developers reading those docs feel at home. At the same time, it will make your documentation codebase easier to maintain.

# Documentation as Software

## Structure and Consistency

![Donkey Kong](/assets/images/image03-300x300.png)

Conventions are a requirement for all engineering projects. Things like file locations, naming conventions, camelCase vs. snake_case, tabs vs. spaces for indenting and so on all have to be agreed upon to keep everyone sane and give everyone an idea of what to expect. For the same reasons, your documentation should have a clearly defined structure, and formatting conventions should be consistent between pages. Sections that have child content should be easily identifiable. Descriptions of parameters should look the same from page to page. Code samples should be well-formatted and easy to read.

Having a clear organizational structure and keeping a consistent feel across pages is the basis for a good documentation experience and helps the reader find the specific information he or she needs quickly. The structure of the content informs its context as much as the words do.

## Docs are Mutable

![TMNT](/assets/images/image08.png)

Your documentation is dynamic and by necessity evolves just as much as your platform’s codebase and data models, and that has some implications for your architecture. The most important consideration is version control. Being able to branch, tag, and rollback will make life a lot easier.

You’ll need to build smart constraints into the system. For SendGrid, the goal was to have a static site, which led us to choose [Jekyll](http://jekyllrb.com) as our platform (that’s a blog post for another time) and that in itself provided constraints for us to build within. Things like automated link checks and validity tests for markup can help keep things under control as a project grows.

The game can change as things evolve. A single-page docs site that works well for a couple endpoints might become unwieldy when you have twenty of them. Consider what your docs might look like in two years and use that to inform your design decisions.

## Don’t Repeat Yourself
![Stupid toadstool](/assets/images/image04.png)

Every coder knows this one. If you have to change something, you don’t want to be searching through the docs to find other instances of that thing to change. Repetition also makes your search results less meaningful, and having the same information in multiple places can distract your audience. Use hyperlinks instead.

## Keep Things Loosely Coupled

Only document the things that you can control, or at least the things where you can tap into the change flow. Inaccurate information is worse than no information because it creates false hope and then disappointment. You shouldn’t try to document third party systems, but should instead provide links to that party’s own documentation when possible. Also try to avoid screenshots and documenting your web interface. If your UI requires documentation, you should probably simplify it (easy for me to say) and in cases where you can’t simplify it, build guidance into the UX. Your web interface will change a lot, and updating all those screenshots isn’t fun. (But if you have to, you could probably automate it....)

## Tighten the Feedback Loop

![RC Pro-Am](/assets/images/image07.png)

Treat your docs as an access point for your community and make sure you provide channels for them to submit feedback and suggest improvements. Speak with your support team regularly to assess what is working and what might need shoring up based on the types of questions customer are asking. Good engineers know that iteration is a big part of a successful product, and a big part of successful iteration is a working feedback loop.

## Boss Fight

![Mother Brain](/assets/images/image01.png)

Let’s recap. The goals of docs are: Make the User a Hero, Allow Customers to Self-Serve, and Reduce Support Overhead.

The categories of docs that accomplish these goals are: Descriptive, Technical Reference &amp; Example Code, Tutorials, Interactive Docs

Documentation relies on developers because a lot of documentation is code, and the platform that supports the documentation is code.

Treating documentation as software can help make it easier to maintain and easier to read. Make sure your docs architecture addresses these needs: Clear Structure, Consistent Interface, Version Control, Smart Constraints

For your content, make sure that things you can’t control are loosely coupled and that you don’t repeat yourself.

You’ve leveled up. Go out and test your might! 

<audio src="/assets/levelup.ogg" type="audio/ogg" controls="controls"></audio>


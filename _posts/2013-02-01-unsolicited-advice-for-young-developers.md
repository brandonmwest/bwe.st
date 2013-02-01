---
layout: post
title: "Unsolicited Advice for Young Developers"
description: ""
category: opinion
tags: [development, work, opinion]
---
{% include JB/setup %}

I had some great mentors when I was a young developer, but there are still a few things that I wish I had known when I was starting out. Of course this is purely my opinion; if you disagree, I'd love to hear your perspective.

##Work Where You Can Fail

This is the single most important thing you can do as a developer (and for a lot of other roles, too). Your job as a developer requires you to learn new skills and apply them to software. If it doesn't, then stop reading right now and go look for a new job. If you are going to be applying new and possibly untested things that you think might help improve your work, then it is vital that you can try those things out in an environment where failure is okay. 

A big part of whether failure is okay is cultural. If the culture where you work is risk-averse and employees are punished for making mistakes, get out. You will make mistakes. That's how you learn and improve. If you can't make mistakes, your growth as a developer will be stunted. If your managers are doing their job correctly and hiring people smarter than themselves, they should trust those people to take their tasks and run with them.

Operationally, things should be structured in a way that provides access to sandboxes to play in. If you are editing code that is in production (yes, this still happens at lots of companies), then experimentation and failure are not okay because they directly impact your business or your client. Assuming that you are already using version control, your organization will also ideally recommend or require unit and integration testing and will use Continuous Integration to build projects and execute those tests. These tools will bolster your confidence and encourage you to try new things, because they ultimately mitigate the risk of changing things. And if you do manage to sneak a bug into production in spite of these tools, you've identified a weakness in the process that can then be addressed; encouraging failure makes your software better in a direct way.

##Product, Not Consulting

You can learn a lot from consulting, including some product skills, but there are a few reasons why I would encourage developers to take jobs working with product rather than doing client or spec work, which is what you'd do at a consulting shop.

Consulting doesn't scale horizontally. If a consultancy wants to make more money, they either need to increase the productivity of their employees to bill more hours or add more employees. Compared to a product-focused startup, where the business is working towards some kind of exit, consultancies are a bit like a hamster wheel; is there a goal you are progressing toward that doesn't end with the project you're currently on? Which company do you think offers the most growth opportunities, company A with $10m/year in revenue from consulting and 50 employees, or company B with $10m/year in revenue from product and 15 employees? In which company will be it easier to have your input heard? And in the unlikely case that company A even gives employees stock, which one would you rather have equity in? Actual equity beats sweat equity every time.

If you're going to do client work, then you're better off as a freelancer as soon as your resume allows. Take a look at what your hourly wage is and compare that to the rate at which the business is billing your hours to customers. The best way to get more of that pie is to be the guy billing those hours, whether you are working them or not. And when a client turns out to be awful, you can fire them.

Consulting work won't teach you nearly as much about what makes a product successful. To a consultant, the measure of success is whether the project was delivered on time and within budget, and then it's handed off to the client. If you're working on a product, you can't just hand it off to someone when it is done; you need to help it grow, market it, sell it, figure out how it can be better, and iterate. Those are great things to learn or to watch happen even if you are not directly involved in them. They make you more than a developer, and to maximize your potential you will need to be more than a developer.

##More Diverse Skills, Fewer Languages

The customer doesn't care what language or platform your software is built on, they care if it solves a problem or otherwise delivers value. There's certainly a lot of value in learning other languages and platforms, and I encourage everyone to do so, but make sure you spend time learning to communicate, market, and grow a product. It is time well-spent and will pay dividends later on in your career.

In addition to more general skills beyond develop, don't focus purely on hard skills. Practice and read about soft skills like communication, working with teams, influence, and all of the things that are required to get ahead in the world but that aren't taught in engineering schools.

It's important to be an awesome developer, but I would argue that an average developer with more product skills and more soft skills actually has a better chance of success in the longterm.
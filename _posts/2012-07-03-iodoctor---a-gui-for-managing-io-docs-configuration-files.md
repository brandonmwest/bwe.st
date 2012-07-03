---
layout: post
title: "iodoctor: A GUI for Managing I/O Docs Configuration Files"
category: api
tags: [api, open source, development, iodocs]
---
{% include JB/setup %}

## The Important Stuff

A few months ago I released [iodoctor](http://iodoctor.net), a GUI for creating and editing [I/O Docs](https://github.com/mashery/iodocs) configuration files. You can use it as a hosted service, or you can [snag the code](https://github.com/brandonmwest/iodoctor) and use/modify it how you see fit. There might be a few bugs still, so check out the issues page on github before you go too deep.

## The Backstory

Last October, I was hanging out with [Amit](http://ajot.me), an awesome evangelist from [Mashery](http://www.mashery.com), at a hackday for [The Combine](http://www.thecombine.org). We were kicking around a few ideas for hacks, and I expressed my desire to have a GUI for creating and editing. I had implemented a handful of endpoints in [I/O Docs for SendGrid](http://docs.sendgrid.com/apiworkshop), and by the time I was done, I had written a few thousand lines of JSON by hand. Needless to say, that doesn't scale.

In February, where I attended [API Hackday](http://apihackday.com) in New York, hosted at Mashery's office. I had spent a little time figuring out how I could take structured HTML form data and translate it into hierarchical JSON (solution: use [form2js](https://github.com/maxatwork/form2js/)), I had managed to successfully parse an I/O Docs config.json and turn it into forms. I spent most of my time at the hackathon working on the output side of things, turning the forms back into JSON that could be used with I/O Docs and wiring it up with some javascript so the UI didn't suck.

## Plans

* The JavaScript is pretty much a bunch of spaghetti that is tightly coupled to the DOM. Not ideal, but hey, it works. I want to refactor and use a JS MVC framework to fix things.

* Perhaps support exporting to different schemas, such as the [Google API Discovery](https://developers.google.com/discovery/v1/using) schema.

* Interactive docs are good, but static documentation with additional information is also valuable, for a lot of reasons.

* The UI could use a bit of tweaking to make it more efficient to build out the API definition. Things like copying a method, defaulting data type to string, etc. I don't think these changes are worth doing until the JavaScript has been refactored.
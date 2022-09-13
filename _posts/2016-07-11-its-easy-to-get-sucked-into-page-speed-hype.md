---
published: true
title: Its easy to get sucked into Page Speed hype
layout: post
date: 2016-07-11 20:07:07
categories: development
description: 'Page speed is important, but just be careful you don''t get sucked into it'
image: 'http://www.csrhymes.com/img/page-speed.png'
---
There is a great tool available called Page Speed insights. It gives you an easy to use tool that you can use to measure the speed of your site out of 100. It gives you hints and tips about how you can improve the score of your site, through compressing JavaScript, reducing server response time and eliminating render blocking JavaScript and CSS. The idea being it gives visitors to your website the best experience.

![Medium.com page speed score](/img/page-speed.png)

Medium.com scores 59/100, but what does this really mean?

Firstly, I have to say that I would always want to try and give the best experience to visitors to any site I work on. As a user of slow broadband I also want to benefit from fast loading websites.

My question, is can a computer generated algorithm truly give a true score of how visitors will experience your site?

You could argue that Page Speed insights offers you an unbiased view that you can use to compare different sites against each other. The counter argument is that this is written by Google, for Google search engine. It does not take other search engines into account and their ranking factors.

The next thing to consider is that a lot of sites are better because of the level of interaction they provide. You could argue that Page Speed insights actually discourages developers from enhancing their site with additional JavaScript because they need to focus on load time.

Page Speed encourages you to compress images to reduce load time, but if I am researching for a big expensive purchase online I want to see super high res images and I want to be able to zoom in and look closer.

> My question, is can a computer generated algorithm truly give a true score of how visitors will experience your site?

As shown above, Medium.com gets 59 / 100. But how does the scale work? Is it a linear scale? Do you have to make 10 times the improvement to get from 90 to 100 as you do from 1 to 10? If you reach 100, when you test tomorrow will it drop down again due to changes in the way it tests or based on all sites improving?

Another practice I have seen is where people go out to try and deliberately out smart page speed to artificially increase their score. The result of this can be very hacky code that is extremely difficult to maintain and then doesn’t follow other web guidelines, with inline CSS and JavaScript to delay the loading of JavaScript, leading to the page re-rendering after it has finished loading to meet the guideline to prevent render blocking JavaScript. Crazyness.

Its also worth noting that somethings are beyond the skill of any developer. If you pay for cheap, slow hosting, then no matter what your developer does you will get a slow server response time. Investing in your hosting by upgrading the server’s CPU, RAM and solid state storage, or even load balancing across multiple servers can provide a noticeable difference to the speed of your site, even with the same code base.

Page Speed is important, but think about what people use your site for and what the visitor wants. If your content is great enough then they may just be willing to wait a whole 2 seconds for a great experience. For a developer, its a balancing act, trying to get the best of both worlds to give the best overall experience.

---
title: Choosing a frontend framework is confusing
layout: post
date: 2017-04-01 13:07:07
categories: development
description: 'Choosing a frontend framework to learn is confusing.'
image: 'http://www.csrhymes.com/img/im-confused.jpg'
published: true
---

My job title is frontend web developer, and I am confused. I am in a situation where there are now so many different options for me to start learning that I don't know where to start. I always find a good place to start is the beginning, so here goes a little history lesson. 

![Code](/img/im-confused.jpg)

## Back in the day

My original skillset was learning basic HTML and CSS to create simple standalone web pages. This was great as each page was its own entity and was self contained and changes to one page didn't affect another. The issue came with repeating parts of the page, such as headers, footers and navigation. One way around this was to use iframes to include static files, but fortunatley server side scripting languages developed and became mainstream, allowing you to piece bits of pages together server side and then display the single page to the user. I chose to learn PHP as this was what they were using at work at the time, its still popular to this day. 

The next thing that came along to me was JavaScript, making the rendered page interactive rather than a static page. JavaScript came with a really useful tool called AJAX, which allows you to transmit data from the frontend to the server side and back. This meant you didn't need to keep reloading the page and provide a better user experience. 

Along with JavaScript, the native language for the browser, was a really useful library called jQuery that allowed you to do a lot of things a bit easier and quicker, as well as providing a wide reach of browser support. 

Those days were nice and simple. A bit of PHP, HTML, CSS and JavaScript were all the tools you needed to get by. 

## Fast forward to the current day

Now, the toolset you need is actually still the same, PHP, HTML, CSS and JavaScript, except each has evolved. 

PHP used to be written at the top of each page and would then have various PHP tags dotted throughout the content where you wanted to echo the content out. This has been replaced with a more modern OOP and Class based thinking and even PHP templating systems so you don't have to keep writing `<?php echo $name; ?>`, now its more like {%raw%}`{{ name }}`{%endraw%} depending on the tempalting engine of course. 

Many developers no longer write CSS as the final CSS output, instead they use pre processors such as Sass or Less, allowing the use of variables, functions and extending existing classes. This saves a lot of time for the developer and makes it easier to reuse. 

JavaScript has a new version, which is not currently supported in all browsers, but is able to be converted into the browser accepted format through tools such as Babel. This new version offers a load of useful tools which will help strenthen the performance and usage of JavaScript into the future. There are also other languages that can be converted into JavaScript, such as CoffeScript, JSX and TypeScript.

## Command line tools

Along with all these technologies evolving, there has been a huge rise in command line tools. 

One tool I couldn't live without is Git. This is a version control system but one that allows branching and allowing multiple developers to work together on a project. You run it locally and on the server so you can push your changes to the central repository and then pull from the central repository on the server to get the latest changes. 

Along with Git, I use Composer. This manages my PHP dependencies, so rather than copying and pasting files into a project you include them in your composer file and it goes off and gets them for you and works with Git to version control them. 

For JavaScript I use NPM (Node Package Manager) to pull down, manage and version control all the packages I need. This includes other packages, such as gulp, which are used to process, combine and minify files that the browser will use. 

## Surely, thats complicated enough? 

Surely thats enough to learn and keep up to date on for a frontend developer, but it doesn't include the biggest changes. 

One of the biggest changes is the ability to process JavaScript on the server, rather than only in the browser, provided by Node.js. This means there is a whole new tech stack to learn, instead of just a new language. 

The other big change is the move to using JavaScript extensivley in the frontend as well. There are too many frontend JavaScript frameworks to mention all of them, but some of the largest include Angular and React. If you want to cause a fight at a dev conference, shout out loud that React is better than Angluar and the ensuing fight would last for months. 

Trying to stay on top of all these new frameworks is almost impossible. Trying to stay up to date with one on its own is difficult enough. These frameworks are relativley new compared to other technoligies in the internet and as such are being written, published, rewritten, published and rewritten and republished on a regular basis. They are evolving fast to try and pack in new features, improve processing speed and browser support. 

## So, I'm confused

Hopefully now you can understand why I am confused. I work a full time job and have a family to look after, but I want to keep my skills up to date. I don't know where to start, let alone having time to start learning everything I need to learn as a modern frontend developer. Who's to say what I pick to learn doesn't become unsupported in a couple of years and I'll have to start from scratch all over again. 

## What am I going to do?

I asked this very question to some friends on twitter and the response was to learn the new version of JavaScript first. 

<blockquote class="twitter-tweet" data-lang="en"><p lang="en" dir="ltr"><a href="https://twitter.com/chrisrhymes">@chrisrhymes</a> <a href="https://twitter.com/sternjobname">@sternjobname</a> ES2015+ first, because the other two utilise it and it helps a lot to understand the new language features.</p>&mdash; Christopher Ford (@Lord_Chancellor) <a href="https://twitter.com/Lord_Chancellor/status/841926584810520577">March 15, 2017</a></blockquote>
<script async src="//platform.twitter.com/widgets.js" charset="utf-8"></script>

This makes so much sense as it means that I will have a good grounding for the future, which can then be applied to whatever framework I choose. 

Now I'm off to buy some books, read some blogs and get learning!
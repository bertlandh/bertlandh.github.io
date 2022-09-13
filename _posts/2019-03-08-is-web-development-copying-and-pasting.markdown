---
layout: post
title:  "Is web development just copying and pasting?"
date:   2019-03-08 21:00:07
description: "Does this mean web development is just copying and pasting other people’s work into your website?"
image: '/img/copy-and-paste.jpg'
hero_image: /img/copy-and-paste.jpg
hero_height: is-large
published: true
tags: webdev dependencies packages
---

It seems it’s impossible to make a website these days without using some kind of package manager, whether its npm for your frontend dependencies or something like composer for your php dependencies. If you need to do something a bit tricky then, chances are, someone else had the same problem and created a package to solve that problem so you can just add it to your dependencies,  install it and away you go. But does this mean web development is just copying and pasting other people’s work into your website? 

Some people don’t like packages at all and would rather write everything from scratch so they know what everything does and they know that only the code that is needed is in their finished product. I don’t have a problem with that. I kind of admire the determination and control they have. 

I used to be a bit like this, as I had the idea that using other peoples packages was kind of like cheating, just copying someone else’s work into yours. 

## If you can't beat them, join them...

But eventually it seemed like everyone was doing it. Every blog, forum and tutorial would start along similar lines of, pull in this package to do X, this library to do Y, so it seemed like there was no choice but to learn about packages.

Once I started learning about composer and npm I realised how powerful they were. Rather than spending hours of my own time solving a problem I could use a package that would do something I needed. I could build upon what someone else had done and keep on developing faster solutions. 

Once I was used to the idea of pulling packages into my project there was no stopping me. Why should I spend time writing a function to do what I needed when I can pull in a library to do that for me? Feature Z sounds a bit tricky to develop, I can just pull in package A and all would be good. 

## Dependency Hell

But the end result was not as I expected. Rather than being in developer heaven, I was in dependency hell. 

My vendor folder was huge and my node modules folder was a black hole of recursive dependencies and my project had so many packages included it was bloated beyond belief, with a huge JavaScript file, despite many attempts at minification. 

I had been greedy, lazy and irresponsible, trying to take as many shortcuts as I possibly could to make my life easier, but only resulting in making it more difficult. 

## Finding the middle ground

So I realised that there must be a middle ground. Somewhere where I pull in essential packages and really think hard about what else I include. I learnt a lot about JavaScript and realised many package developers work very hard to allow you to only pull in the bits of their packages that you want to. 

You don’t need to pull in the entire package if you only want one feature. Just import the feature you need into your compiled JavaScript file so you are not forcing your visitors to download code that will never run. 

I used to use Foundation by Zurb and my habit was to include their compiled JavaScript library just in case I needed every feature at some point in the future, but then I realised that if the project I was working on just needed an accordion then I only needed the core package and the accordion JavaScript modules. You could then add additional modules as and when you needed them. 

Package managers like composer and npm also offer the facility of saving dependencies as either production or development, meaning you can specify which should be pulled down for your local development only and which are only needed for production. An example of this is phpunit. You don’t want this on your production server, only on your local development environment where you run the tests, so just add it to the require-dev section of your composer.json. 

I think everyone needs to learn how useful package and dependency managers, but also to spend some time learning about the best ways of using them, and whether you really need to include the whole package or spend a little bit of time cherry picking just the features you need to include. 

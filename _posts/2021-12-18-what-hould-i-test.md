---
layout: post
title: What should I test?
description: You might often hear that you should write tests, but what should you test? Where do you start with tests?
date: 2021-12-18 09:00:07
hero_image: /img/what-should-i-test.jpg
hero_height: is-large
hero_darken: false
image: /img/what-should-i-test.jpg
tags: Testing PHP JavaScript
---

You might often hear developers say that you should write tests. Great, let's go! But what should you test and where do you start? I don't know all the answers, but here are some tips for getting started. 

I recently started working an existing application which was very different to what I had been working on previously. When I write a brand new application, one of the first things I do is to get the test tool up and running and start writing tests alongside writing the application code. I would often start with writing some smaller unit tests and then feature or end to end tests to ensure the process worked as a whole. 

When you start working on an existing project that has little test coverage it's not so easy to figure out where to start with your tests. It can seem a very daunting task as there is so much existing code and features to test. 

So what should you do? Just ignore tests and carry on coding? 

The truth is you probably won't get the opportunity to spend weeks solely writing tests as you still need to work on new features and produce visible output to your customer. 

## Start small

Some tests are better than none at all. 

Sometimes the smallest, simplest test is the most useful test. This tweet by Nuno Maduro says it all. Write a simple test that "ensures your application boots" and it "ensures your homepage can be loaded". 

<blockquote class="twitter-tweet"><p lang="en" dir="ltr">Does your <a href="https://twitter.com/laravelphp?ref_src=twsrc%5Etfw">@laravelphp</a> application have 0 tests? Here is one test you can easily add to get started. It&#39;s probably the most important test — in web projects — and it has an enormous value.<br><br>✓ Ensures your application boots. ✅<br>✓ Ensures the home page can be loaded. 💨 <a href="https://t.co/BclTaFcig8">pic.twitter.com/BclTaFcig8</a></p>&mdash; Nuno Maduro (@enunomaduro) <a href="https://twitter.com/enunomaduro/status/1468901807585955848?ref_src=twsrc%5Etfw">December 9, 2021</a></blockquote> <script async src="https://platform.twitter.com/widgets.js" charset="utf-8"></script>

## Feature tests

So we have proven that the application boots, but should we write feature or unit tests next? In my opinion it is better to start writing feature (or end to end) tests rather than unit tests. If you inherit an application that has little or no test coverage, then writing a feature test then you can quickly cover more of your code by writing fewer tests. 

Even the best documentation can't provide you with the level of detail that the code is written at. It may describe a feature at top level, such as "Users can log in with a email address and a password", so you should be able to write a feature test that calls the login endpoint, pass in the email address and password, then assert that the user is logged in successfully. 

## Unit tests

Hopefully all the tests will pass, but if they don't then this will prompt you to dig into the code a bit deeper. This will allow you to learn more about specific functions, which you can then write unit tests for to prove they are doing what they are supposed to be doing. 

It's actually very difficult to write a unit test without understanding the code in detail. When you start working on an application you won't have that in depth knowledge of what each method does, in fact you won't even know what the method names are without spending time digging through the code. 

You will gain this knowledge over time, but you may not remember it all, so this is where writing unit tests will help you out, acting as a kind of documentation for your code. It will allow you to construct scenarios that you code should handle. 

Building on the example of users logging in, you could write a specific unit test that asserts the user has entered a valid email address in the log in form, otherwise a validation error should be thrown. 

## Happy path

Start by writing tests for the happy path. 

The happy path assumes that everything has gone as you expect and the user has entered the correct information and the process completes from start to finish. For example, the user entered their email address in the email field, instead of entering it in the password field, and they successfully logged in. 

You may say, what value is there in testing this? We know it works as our application is up and running and people are quite happily using it. This is true, but code won't stay the same forever and at some point you may add a new feature, such as allowing logins with social media accounts, and you want to write this happy path test to ensure that existing users will still be able to log in as they did before. 

Sometimes everyone is so excited about testing the new feature, that the existing functionality can be overlooked. Testing existing functionality is also known as regression testing. 

> Regression testing (rarely, non-regression testing) is re-running functional and non-functional tests to ensure that previously developed and tested software still performs after a change.

[https://en.wikipedia.org/wiki/Regression_testing](https://en.wikipedia.org/wiki/Regression_testing)

## Write tests for bugfixes

It's tempting to jump straight into a bug, fix the code and then move on. Instead, take some time to write a test that replicates the bug. This will allow you to prove that the bug does in fact exist and that you know what triggers it. Once you have established this, you can then work on the fix and use your test to prove whether the bug has been resolved or not. 

Having a test for a bug also saves a lot of effort as you can run the automated test with the specific scenario over and over again, without having to manually set up the database or visit a specific screen and perform a specific action to replicate it. 

## Tests for new features

If you have to develop a new feature then this is a great time to write tests for it. One way of ensuring that tests will definitely be written for this new feature is to use Test Driven Development (TDD). TDD encourages you to write the tests first and then write the code that makes the tests pass. 

TDD may not be everyone's cup of tea, but I recommend trying it out and seeing how you get on. I often find that it makes you think about what you are trying to accomplish and you can end up with a different solution than if you were to just build it as you go. 

## Write tests when you update packages

Quite often there will be a new major version of the framework you are using released. Rather than jumping straight in and updating the framework, ask for a bit more time to write some more tests to cover the areas that will be specifically effected by the upgrade. 

This will allow you to have confidence it worked before the upgrade, and that the issues are caused specifically by the upgrade and not an existing issue. I have spent many hours debugging an issue that I was sure was caused by updating a package, only to eventually realise it had nothing to do with the upgrade. 

If the tests fail after the upgrade then it will provide you with a checklist of what you need to work on to make the upgrade work. 

## Start small, build test coverage over time

These are some of the ideas for how you can build up test coverage over time. Eventually you will realise that tests are there to help you and you will have more confidence in your application. 

The next developer that inherits your application will thank you for the tests too!

<a href="https://stocksnap.io/photo/goldengatebridge-sanfrancisco-II0IJP2AC7">Photo</a> by <a href="https://stocksnap.io/author/burstshopify">Burst</a> on <a href="https://stocksnap.io">StockSnap</a>
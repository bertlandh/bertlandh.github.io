---
title: First impressions of Vue.js
layout: post
date: 2017-05-20 13:07:07
categories: development
description: 'First impressions of Vue.js javascript framework'
image: 'http://www.csrhymes.com/img/vuejs.jpg'
published: true
---

I've been looking into different JavaScript frameworks for a while and there seems to be a big following for Vue.js throughout the Laravel community. Therefore, I thought I had better give it a look and see what its all about.  

![Code](/img/vuejs.jpg)

## Getting Started
The first thing I liked about Vue.js is that you can get started straight away by simply including a script tag into your page. You don't need to spend hours getting a development environment set up or cloning down a starting package and working through all the files to try and understand what everything does. 

## Documentation
The next thing I would say is that the documentation is very clear and easy to understand. Each page of the documentation is very concise and to the point, but it is written in a way to help you learn the framework from scratch. The examples are written using standard HTML and JavaScript, which makes it instantly accessible for most web developers. You don't need to know TypeScript or JSX to start using it. 

## Reactivity
The best thing about Vue is the reactivity. You create a new instance of Vue with a parent html element and now you can easily update the content. With JQuery you have to select the element and then update it. With Vue, its linked so you update the value in Vue and it instantly updates the value in the browser. 

After using JQuery for many years it seems like magic. It just works. It feels like you should have to do a lot more steps to do than you actually have to. Its a great experience.
 
## Functionality
All the basic functionality you will need is built in. There are loops, such as v-for, and conditional statements, v-if, and a way to get the value from an input using v-model. 

If you need to perform a function when a button is clicked, you simply give the button a v-on:click="method-name" property and it is tied to the method you create. No need to add an event listener to a particular button with a particular ID. You can even reuse the method multiple times by adding the property to what ever element needs it. 

## Components
To help you create reusable code, you can break things down into components. From reading other frameworks code this seems like common functionality and it is for good reason. You can even nest components within components.  

One thing that I really like about Vue is the slot functionality. This allows you to insert the content on the page into your component, meaning you can easily pass content to it from a CMS by rendering it out on the page and then letting Vue re render it as needed. 

As well as a generic slot, you can also create named slots. This allows you to be more specific by saying this content goes in this section of the component and this other content goes in this section. 

## Template strings
I have been reading about ES2015 or ES6 for a while and wanted to get started using it. Vue lets you define the html template in the JavaScript and when combined with ES6 it allows you to create multi line, readable templates using template strings. You can then use double curly braces inside the template strings to insert your variables. 

This makes it easy to output and update dynamic content. 

As a side note, I've found the new arrow functions to be very useful as they keep the context of this rather than having a new context inside the function. 

## Summary
I'm just getting started with Vue js but I can see why people are so excited about it. It has a certain way of using it but if you agree with that methodology then it really excels. 

The thing I find hardest is having to go back to JQuery sometimes and having to do a lot more work to do something that is so simple in Vue js. 

If you want to learn more then I suggest reading through the documentation to get the basics and then I would say take a look at the Learning Vue js series on Laracasts as it has some great examples of how you can use it. 
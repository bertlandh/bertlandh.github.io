---
title: Organising Your Code
layout: post
date: 2016-08-10 20:07:07
categories: development
description: 'Its easy to start writing code without thinking about the organisation, but take some time to plan and it will reward you later'
image: 'http://www.csrhymes.com/img/code.jpg'
---

Its easy to start writing code without thinking about the organisation, but take some time to plan and it will reward you later. Sometimes a new project is so exciting you just want to start coding and making things work, thinking that you will sort out the structure at a later date. After all, who cares as long as it works, right?

![Code](/img/code.jpg)

Coding is a creative process and once you are in your flow you don't want to interrupt it. A couple of files can suddenly grow into a few files, followed by a couple of JavaScript libraries and then some css files, images and all of a sudden you find yourself in a right mess.

Spending some time sorting out your file structure can save you a lot of time, as well as your sanity in future.

## File Structure

A really simple step you can take before starting is to create a range of empty folders in your project folder. You can start with a folder for JavaScript, a folder for CSS and a folder for images. Simple but effective.

This simple step causes you to think about where your files will live and how you are going to categorize them. For example, if you are writing a blog, you might want to create a posts folder and put all your post files in there. It will make you think about where your files will be and make your url paths more logical in the end.

The next step you can think about is the libraries you want to include. It used to be simple to download a JavaScript file and then save it in the JavaScript directory, but modern libraries can often be split into many different files.

You don't need to manually copy and paste these files in anymore. Use a package manager.  

## Use a package manager

A package manager or dependency manager takes care of importing all the files you need. There are tools such as [npm](https://www.npmjs.com/) or [bower](https://bower.io/) that can be used to pull in packages into your project for you to use.

There is a bit of work to be done before you can use the package managers, as in you may have to install them on your system first, but once you have installed them once you can reuse them on all your projects.

You start out by initialising the package manger in your project and then you can start adding the dependencies. The package manager will then go off and install the packages into a directory for you.

The other big benefit is that the packages are under version control. Packages are updated with bug fixes and enhancements, so to make the most of it you just need to run the update command and the packages will be automatically updated.

## Use a methodology

Another tool in your tool box is methodologies. The traditional way to write a web page was to write the HTML in the index.html file, along with some in line styles and then a bit of JavaScript spread throughout the page. Then you may start including a programming language such as PHP within the same file. This quickly becomes a nightmare of unmaintainable and non reusable code.

The world has moved on from this and now people tend to think more logically about the way they code. There are many different methodologies that fit different circumstances so its best to do some research to see what suits your project. A common methodology for organising code is MVC (Model, View, Controller), where each part of your code performs a specific purpose. I'm not going into this in much detail now, but there is a wealth of information already available online.

## Use a framework

Another way is to start with a framework, such as [Laravel](http://laravel.com/) for PHP, or [Foundation](http://foundation.zurb.com/) for frontend. These frameworks are a great starting point and mean that you have a place to start from and an existing folder structure to follow.

Frameworks are useful in the fact that they provide a lot of commonly used methods, but just research how they work first as, to get the most benefit, you need to work in they way they want, otherwise you will find yourself trying to undo the work they have done to make it work your way. Then there is no point using a framework.

This blog is created using Jekyll, hosted on GitHub pages. Its a good system to use as it provides a lot of basic functionality, such as liquid templating and support for pages and posts, but you remain in control of the frontend HTML, JavaScript and CSS.

I'll say it again, use the benefits of a framework to your advantage.

## All organised now?

Hopefully you will spend a bit of time planning before jumping in to your next project, even if it is a simple sketch on a bit of spare paper. You will thank yourself later, trust me!

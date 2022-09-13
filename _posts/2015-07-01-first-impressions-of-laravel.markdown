---
layout: post
title:  "First impressions of Laravel"
date:   2015-07-01 20:54:07
categories: development laravel php
description: "What is pinterest and what do I need to do to get my site ready for pinners?"
image: http://www.csrhymes.com/img/macbook-coffee.jpg
---

A friend of mine has recently introduced me to the Laravel php framework, and I have to say I am very impressed! I have been developing with php for a few years now, but it has mostly been building on top of what others have already built and I hadn’t really started my own project from scratch. This time, I thought I would use Laravel for my new project. 

![Getting started with Laravel](/img/macbook-coffee.jpg "Getting ready for Laravel")

## Getting started

The Laravel website contains some great documentation explaining how to get started with [Laravel](http://laravel.com). It explains how to create a new project using the Laravel framework. There are two main ways to start, either by installing the Laravel command line tools (through composer), or by using composer directly. I decided to use composer directly by running the below.

	composer create-project laravel/laravel --prefer-dist

This then downloads all of the relevant directories, files and dependancies for Laravel. You then need to change a few directory permissions and you are ready to go. 

## Homestead

If you are new to composer, or maybe you are not sure about how to install all the services you need for a web server, then Laravel has another tool to help you get started called [Homestead](http://laravel.com/docs/5.1/homestead). Homestead is a box, or virtual machine, for [Vagrant](https://www.vagrantup.com/). Vagrant is a great tool that allows you to bring up, provision and bring down virtual machines that you can use to develop with. 

Homestead has everything you need to start using Laravel already installed. 

## The Basics

So once you have your development environment setup, you can start with the basics. Laravel begins with routing. Routing basically dictates where to go when you visit a page. The routing is incredibly powerful and much easier to use than other traditional methods such as rewrite rules, from the simplest route, such as returning some data directly to the browser, to a function within a container. 

Laravel utilises MVC (model, view, controller) and is great to use because of it. When you start using it you may start thinking, where do I put this bit of code and that bit of code, but forcing yourself to use MVC gets you into good habits. The controller tells the model what data it needs, the model goes and gets the data and then it is returned to the view to display it back to the end user. I’m sure I’ve over simplified this, but hey, that’s the way it makes sense to me. 

I started off making a simple form, with the html in the view, the validation logic in the controller and the model to communicate with the database. From this alone, I quickly realised the benefits of Laravel as it does a lot of things for you, such as ensuring the data is database safe and exception handling if something doesn’t go as expected. The syntax you use is very nice and seems quite a natural language, although there is quite a lot of initial learning it seems quite quick to pick up. 

Laravel makes use of the blade templating engine which makes writing your views even easier. If your controller returns some data to your view, you can reference it by putting it in double curly braces.


## Migrations

After mentioning data, it is worth highlighting another great aspect of Laravel, which is [migrations](http://laravel.com/docs/5.1/migrations). Traditionally, I would have logged in to my database using a GUI and then started creating tables and manually adding fields into the table. Migrations allow you to write simple code to create and edit tables in your database. Even better than that, it also provides version control. 

Simply create a new migration and then write the actions you want to perform in it and then run the migration. This will add the changes, such as a new field, to the database table, but it also allows you to revert the migration and undo your last change. Another benefit of this system is that you can use migrations on another server to synchronise the structure of the database on that server with your server. 

## Elixir

One of the other features I have recently discovered is elixir. This is a service that provides an api to run gulp tasks. This allows you to process your files, such as javascript, sass, less and css, and output processed, combined and minified files ready for use. 

The feature that stood out to me was the versioning function. This automatically creates a version number for each of the files you specify to ensure that users of your site will always be using the most up to date version of the file and not a cached file. 

## So many other features

There are so many other features available that all I can say is go and start reading the documentation yourself to find out what it can offer you. I’m pretty sure it will make your life easier. 

Another thing to be aware of is the [Laracasts.com](https://laracasts.com/) site that offers great tutorial videos. This is a subscription site but it is well worth the investment and has videos on almost every subject I’ve needed help on. 

## Any other tips?

One thing I would mention is that there seems to be quite a few differences between major releases, such as 4 and 5. From initial experience of the two, I would definitely start with the newest version and learn that as there are even more features built into the newest releases. 

Just make sure which version of the documentation you are reading as sometimes Google searches will take you to an older version of the documentation. 

If you need help, then ask. There seems to be a great Laravel community online willing to help each other out. Just make sure you offer help back to other newcomers when you become a seasoned pro!
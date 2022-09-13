---
title: Why do I always use Laravel?
layout: post
date: 2018-05-22 19:09:07
categories: development
description: 'Why do I always use Laravel when starting a new PHP project?'
image: 'https://www.csrhymes.com/img/why-do-i-always-use-laravel.jpg'
published: true
---

I often get asked why I use Laravel for a lot of projects. I get comments such as its too big for this project, its overkill, you can write something better yourself that's simpler and easier to use. 

![Laravel](/img/why-do-i-always-use-laravel.jpg)

Its true, quite often when you start a project it is a very simple goal you are trying to achieve and you may start out with a single PHP file that can do what you need, but the more you work on an idea, the bigger it grows in your mind. You start adding a simple feature, which inspires you with another feature and pretty soon, your single file has become a monster, a monster that needs to be refactored, both for performance and for your own sanity. 

## Its easy to use

The first reason I start a new project with Laravel is because it's easy. As a web developer, maybe I shouldn’t be admitting this, but sometimes you want to start with something that has already done the hard work for you. If you want to compile your sass and JavaScript, then you can use Laravel Mix with a simple npm install. If you want to use a templating language then you can use blade, if you want to build authentication into your project, it's there waiting to be used. If you want to write some browser tests then you can use Laravel Dusk. 

Laravel has all these features available to you, but its not opinionated, it doesn’t force you to use them if you don’t need them, they are just ready if you do need them. 

## MVC

The second reason I use Laravel is the MVC methodology it uses. I have been working with PHP for over 10 years and I have seen some pretty awful code. I should know awful code, as I wrote a lot of it myself. I didn’t know any better at the time, it was just the way I learnt to write code. I would create a php file, add some php functions into the top of the file, insert some html lower down and then intermix the html with more php variables and echos. 

Learning Laravel helped me write better code. I’m still learning but compared to the way I used to write code, it's so much easier to understand and maintain than it used to be. 

## Blade Tempalting

I do a lot of work with WordPress and it annoys the hell out of me, especially after using blade templating language where all you need to write is {% raw %} {{ $variable }} {% endraw %} rather than `<?php echo $variable; ?>`. I really dislike writing <?php tags for some reason. 

But the biggest issue I have with WordPress is the fact you are using functions everywhere, but you have no idea where the function comes from. There are no classes or namespaces, it's just `<?php the_title(); ?>`, which may be fine for a beginner, but there is no way of altering what that function does. You can’t extend that method and improve it for your own purposes, you are stuck with it. 

## Extending functionality

Laravel has a lot of classes and methods, but in my experience, you are always able to extend an existing class and modify the methods you need to to do what you need. The classes are written in such a way that you can extend the functionality without the fear of breaking some other functionality you are relying on.   

## Eloquent

Going back to MVC, this enables you to separate out the different parts of your code to perform different tasks. You can create a simple model that communicates with the database by writing eloquent relationships between your tables instead of writing massive sql queries. You can have a clean blade template that focuses on displaying the view without a load of php all over the place. You can have a separate controller for each resource, making it obvious to a person looking at the code what each controller handles. 

## Solid foundations

Sometimes the biggest issue with a new project is the fact that it is a new project. You don’t have the benefit of hindsight. You don’t know what features you will be adding over the lifecycle of your project. If you use Laravel as the foundation then you have a solid foundation to build upon. 

My old code sometimes felt like it was held together with pieces of string and sticky tape covering the cracks. Using Laravel gives me more confidence that I can build a project in a secure and maintainable way. It is also supported by a great community, so I know there will be updates and patches in future. 

As well as the many official Laravel packages, there are also many community created packages available that are easily integrated into Laravel with a composer require. 

## Documentation

Finally, one of the big reasons why I like using Laravel so much is the documentation. The documentation is written in a way that makes it easy to understand and learn. I’ve used a lot of JavaScript libraries in the past and there documentation is often hard to follow, or not as upto date as it should be, or has been overwritten without access to the previous documentation. The Laravel docs site provides you with the ability to choose which version you are using and it's all there. 

If you need additional help learning Laravel then there is a great video tutorial site called Laracasts, which also has a fantastic forum on it as well. 

Hopefully this has given you enough reasons to consider using Laravel in future projects. Its true, there is a lot to learn, but in my opinion, you will become a better developer as a result of it. 

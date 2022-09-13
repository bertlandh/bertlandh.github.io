---
layout: post
title:  "Why build a package?"
date:   2019-06-08 08:00:07
description: "Creating you project can seem like the difficult part, but letting people know its there can be even harder"
image: '/img/why-build-a-package.jpg'
hero_image: /img/why-build-a-package.jpg
hero_height: is-large
published: true
tags: webdev packages Laravel
---

In my day to day job I make use of a lot of packages. This got me thinking it would be good to create a package of my own, so I have decided to build a Laravel package. It’s got a long way to go yet before it’s ready, but I thought I would write down my thoughts about the benefits of building a package while it is still fresh in my mind. 

## What is a package?

Let’s start by defining what a package is. This is how I define a package as I couldn’t see an official definition of a package anywhere. 

> A self contained, portable piece or pieces of functionality that you can import into your project and use.
>
> -- <cite>Chris Rhymes</cite>

That sounds both suitably accurate and vague at the same time. Let me know if anyone finds the official definition as I would be interested to read it. Packages can vary from something as minimal as formatting dates, to something that will allow you to log in to your web app using a twitter account. Many packages even use other packages within them, these are called dependencies. 

## Why separate out the code into a package?

So now we understand a bit more about packages, why build one? I’m working on a Laravel package at the moment and there are some key reasons why a package is better than just writing the code directly into a new Laravel project. 

For this example, I wanted to create a way of writing a simple page with some text content  stored in the database. 

I started with a fresh Laravel installation and then created Models, Views and Controllers directly in the project as I would with any other project. I create a model to access the page content in the table, I create a controller to be able to store and update the page content, then I create views for the user interface. 

But then I considered that I might want to use this again in another project that also needs some simple text pages. That’s fine, I could just copy and paste the models, views and controller from project A into project B.  

But what if I needed it in another project? Then I would have to copy the code from A to B and to C. 

So now I have three projects using the same code. That’s just about manageable, but then I think about a nice new feature I can add to project C, so I write the feature directly in project C, but then I consider that project A needs it to so I copy it to project A. 

I then work a bit more on project B and realise there is a bug with the controller. I fix the bug in B and then try to apply the fix to A and C, but these have a newer version of the controller with the additional feature so the bug fix doesn’t work in these cases. 

Hopefully, you can now see this is not a good place to be in. 

Writing a package allows us to extract the functionality out of the projects and have a master version. You can then update the master version and apply the update to all of your projects, hopefully using something like composer to do all the hard work for you. 

## Defining versions of your package

The other advantage of it being a package is that you can create versions. You could develop a package and just store everything in master branch in git, but this means every time you update your projects it will always use the latest version of your package, which may contain a feature that hasn’t been fully tested and could potentially break a project that was using an older version of your package.  

You can use git tags in your package repo to specify specific commits as a version and then define the version you require in each of your project’s composer.json file. 

You can then install version 1 in project A and B, but version 2 in project C. Any potentially breaking changes in version 2 will not affect projects A and B. 

## Laravel makes it easy to start building a package

I was quite worried about getting started with building a package for Laravel, but it turns out there is really great built in support for packages. If you check out the [Laravel docs](https://laravel.com/docs/5.8/packages) then there is a page dedicated to building Laravel packages. All of the functionality you expect is available straight out of the box, such as creating a config file, database migrations, routes, views and even publishing frontend assets. 

I would encourage you to read the docs page fully, but the majority of the set up is done from within your package’s service provider. You define the service providers and facades in the extras section in your packages composer.json and it just works. 

```json
"extra": {
    "laravel": {
        "providers": [
            "ChrisRhymes\\MyPackage\\ServiceProvider"
        ],
        "aliases": {
            "MyPackage": "ChrisRhymes\\MyPackage\\Facade"
        }
    }
},
```

## Laravel Package Development Tip

One thing I’ve discovered to make development a bit easier is to define your repository as a url in a Laravel installation and then add it to the require section as usual. 

```json
"repositories": [
    {
        "type": "path",
        "url": "../my-package"
    }
],
```

This way you can develop it in a folder outside of the Laravel installation without the need to keep pushing your code up to github, gitlab or bitbucket and not need to keep doing composer update to get the latest version. 

Good luck with your package development and hopefully I will be launching mine soon too. 

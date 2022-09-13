---
layout: post
title: Run Laravel artisan commands in PHP Storm
description: How to run Laravel artisan commands in PHP Storm
date: 2021-07-02 18:00:07
hero_image: /img/run-artisan.jpg
hero_height: is-large
hero_darken: false
image: /img/run-artisan.jpg
tags: PHP Laravel Artisan
---

PHP Storm has a built in terminal window which you can use to run Laravel artisan commands, but there is a quick configuration change that you can do to make it even easier to run artisan commands. 

* Open Preferences > Tools > Command Line Tool Support
* Click the plus icon
* Select `Laravel` from the Choose tools dropdown and press OK

![Command line tools](/img/run-artisan/command-line-tools.jpg)

* Set an alias, I've used `artisan` in this example
* Choose your PHP Interpreter or use the default project interpreter
* Set the `Path to script` as the location of your Laravel app's artisan file
* Press `OK`

![Tool Settings](/img/run-artisan/tool-settings.jpg)

* Press control twice to open Run Anything  
* Type the alias you entered, `artisan` in my example, and a list of artisan commands will appear, along with the available options. 
* The list of available commands will filter down as you type
* Enter the command and press enter and it will run the command for you in the PHP Storm terminal

![Run Anywhere](/img/run-artisan/run-anywhere.jpg)

For more information, take a look at the [PHP Storm docs website](https://www.jetbrains.com/help/phpstorm/laravel.html#use_artisan_cli)

<a href="https://stocksnap.io/photo/laptop-apple-EUUXASKH48">Photo</a> by <a href="https://stocksnap.io/author/55737">Ghost Presenter</a> on <a href="https://stocksnap.io">StockSnap</a>
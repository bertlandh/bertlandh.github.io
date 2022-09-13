---
layout: post
title:  "Creating your first Laravel package"
date:   2019-08-10 08:00:07
description: "I've always been interested in making a package for Laravel so I thought I would make a simple example package and share what I learnt"
image: '/img/creating-first-laravel-package.jpg'
hero_image: /img/creating-first-laravel-package.jpg
hero_height: is-large
published: true
tags: webdev showdev laravel php
---

I've always been interested in making a package for Laravel so I thought I would make a simple example package and share what I had learnt from the process. The package is very simple and just contains some extra collection methods, so I decided to call it [extra-collect](https://github.com/chrisrhymes/extra-collect).

## Folder Structure

I started by making a new folder and running composer init to generate a composer.json file. I followed the commands to add the name, `chrisrhymes/extra-collect` and description `A Laravel package containing a collection of collections`. 

As per most PHP packages, I created a src directory where all the php files will live. I then created a file called ExtraCollectServiceProvider.php in the src directory. Here is the file structure so far.

```
/src/ExtraCollectServiceProvider.php
composer.json
```

## Autoloader

I then added the following to the composer.json to autoload the service provider and any php classes with the ChrisRhymes\ExtraCollect namespace from the src directory.

```json
"autoload": {
    "psr-4": {"ChrisRhymes\\ExtraCollect\\": "src/"}
}
```

## Automatic Package Discovery

The next step was to sort the automatic package discovery. Since Laravel 5.5 you can add some additional or "extra" lines into your composer.json to allow Laravel to automatically register your service provider when the package is installed.

I followed the example in the Laravel docs site and added the package's service provider class to the providers array. If you have any facades you can register them in the aliases array, but since I don’t have any in this package, I didn't.

```json
"extra": {
    "laravel": {
        "providers": [
            "ChrisRhymes\\ExtraCollect\\ExtraCollectServiceProvider"
        ],
        "aliases": {
        }
    }
}
```
    
## Service Provider

I now focused on the service provider class. The service provider needs to extend the `Illuminate\Support\ServiceProvider` class and have boot and register methods. I added the new collection methods to the boot method in the service provider, which meant I needed to add a use statement for the `Illuminate\Support\Collection` class as well.

If you are using an IDE then it will probably complain that it can’t find the `Illuminate\Support\ServiceProvider` or the `Illuminate\Support\Collection` classes. To resolve this, I added the Laravel Framework as a dev dependency so it could find the classes. 

```bash
composer require --dev laravel/framework
```

This then created a vendor folder for me and installed the Laravel Framework package for me which then stopped the IDE from complaining as it can now find the classes. 

## .gitignore

Obviously, you don't want the vendor folder as part of your package so that's why I added it as a dev dependency. To avoid the vendor folder being included in the project when I pushed it up to GitHub I created a `.gitignore` file and added the vendor directory, and whilst I was there, added the composer.lock file to the `.gitignore` as well. 

## Tests

Before I pushed up my package to GitHub, I wanted to make sure that the code worked as expected, so I thought it would be a good idea to create some tests. The service provider makes use of some Laravel classes so I needed a way of including the framework with my tests. 

Luckily there is a package to do just that called [Orchestral TestBench](https://github.com/orchestral/testbench), so I used composer to install the package 

```bash
composer require --dev "orchestra/testbench=^3.8"
```

The package states you have to extend the Orchestral TestCase instead of the Laravel TestCase, so I created a tests directory with a TestCase class that did just that. 

Within the TestCase class, I added the getPackageProviders method and included my packages service provider class so it can be used within the tests.

```php
protected function getPackageProviders($app)
{
    return [
        ExtraCollectServiceProvider::class
    ];
}
```

As the tests are in the tests directory and not the src directory, the classes won't be autoloaded. To resolve this I added the following to the composer.json file so anything with the Test namespace would be loaded from the tests directory.

```json
"autoload-dev": {
    "psr-4": {
        "ChrisRhymes\\ExtraCollect\\Test\\": "tests/"
    }
}
```
   
I then created the tests, one class for each of the collection methods, ensuring that the test class extended my new TestCase class. Each test collects an array and applies the relevant collection method, before testing the output is what is expected. 

I then created a phpunit.xml file stating where the tests can be found and to use the php classes ending in `Test.php`. 

Finally, I added the following script to my composer.json file to run the test using composer test command

```json
"scripts": {
    "test": "phpunit"
}
```

I ran `composer test` and luckily all the tests passed.

## Readme

I created a simple readme file to help explain to others how the collection methods work. I decided to follow the documentation style of the official Laravel docs [Collections page](https://laravel.com/docs/5.8/collections) with a usage example and the expected output. 

## Deploying and Installing the Package

With the example package ready to go, I created a new repository in GitHub (called extra-collect as per the composer.json name), added the git remote repo to my directory, commited the files and pushed them up to GitHub. 

I was very excited to start using the package and see how it worked. I had a Laravel project already set up and ready to go on my dev machine so I added my new package in the require section of the composer.json file before running `composer update`

```json
"chrisrhymes/extra-collect": "dev-master"
```

But something went wrong, composer couldn't find my package. It was there, publicly available on GitHub, but then I realised composer needs a bit more help. 

I needed to tell composer where the package lived using packagist. I signed up for a packagist account and then added my new package, linking it to the GitHub repo. I was pleasantly surprised how quick and easy it was to use. 

I tried `composer update` again and this time it found the package, installed it and registered the packages service provider automatically. I could now start using my custom collection methods from within a Laravel project. 

One last note is that I would suggest you tag a release for your package in GitHub so people can specify a version number instead of using dev-master as per the example above. 

I hope you have found this a useful guide to getting started with creating your first Laravel package.  


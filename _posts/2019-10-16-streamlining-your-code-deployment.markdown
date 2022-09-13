---
layout: post
title: Streamlining your code deployment
date: 2019-10-16 19:00:07
description: One of the scariest things as a developer is pushing new code live, but luckily there are some steps you can take to make it easier
image: /img/code-deployment.jpg
hero_image: /img/code-deployment.jpg
hero_height: is-large
published: true
tags: webdev pipelines php beginners
---

One of the scariest things as a developer is pushing new code live, hoping it all works as expected and remembering to do all the deployment steps and in the correct order too! But luckily there are some steps you can take to make it easier, which will probably have an unexpected side effect of allowing you to push your code more often. 

## Making a list

One of the simplest things you can do is to make a list of the steps you need to do. This will allow you to read through it before you start and take some time to think about the order of the steps and what needs to be done before another step. For example, you will probably want to deploy your new code before you run any database migration scripts as, chances are, the migration script is in your new code. 

You can write the list using pen and paper, but I personally find it easier to write the list in a text editor as it allows you to easily add and remove items as well as reorder them. I tend to use a text editor and write in markdown format so I can publish my list somewhere when I am happy with it. 

I would avoid using Word or other wysiwyg editors as it can unexpectedly change characters such as double hyphen to a dash, changing double quotes to a random character or adding random html tags around blocks of text. It may look ok but can cause major headaches if you copy and paste it into a terminal. 

Here is an example of a simple list for a php project

* Clone the latest master branch with git in a new build folder
* Install php dependencies with composer
* Link in the .env file into the new build folder
* Update the web server document root to point to the latest build folder

## Test out your list

Having a list also lets you try out your process locally or on a staging server, if you are lucky enough to have a staging server. This should provide you with visibility of any show stoppers that you can research and fix before you do the live deployment. 

This will allow you to check the commands are correct, but also in the correct order. You can then do some touch testing to ensure everything behaves as expected on the staging version of the site before you push up to master for real. 

## Create a script

If you take a look through your list you will probably see a lot of items that are the same for each deployment, such as doing a git pull and running composer install for a php project. Rather than having to type these commands in manually each time and risk typing them incorrectly (I wish I had a pound for every time I spelt git wrong (seriously, it's a three letter word and I still spell it wrong...)) or losing your place in the list and accidentally running a command before another command, you can create a bash script that will run these commands for you. 

Pretty much anything you can do in the command line can be turned into a bash script. You can even pass variables in when you run the script which can be used to change what the script does. 

For example, if we have a script file called deploy, we can run `./deploy 123` and then use the parameter in the script. `$1` is the first parameter we pass in `123`. 

```bash
#!/bin/bash

BUILD = $1

mkdir /var/www/my-project/$BUILD
cd /var/www/my-project/$BUILD
git clone https://github.com/my-username/my-project.git .
composer install
ln -s /var/www/my-project/.env /var/www/my-project/$BUILD/.env
rm /var/www/my-project/current
ln -s /var/www/my-project/current /var/www/my-project/$BUILD/public
```

This script results in the directory `/var/www/my-project/builds/123` being created, then cloning the project, running composer install, linking the `.env` file and then updating the symlink to the latest build directory. 

The other benefit of doing this process with a script is that it immediately runs one command after the other so the deployment process is sped up.

When it removes the `/var/www/my-project/current` symlink, you don't have to wait the time it takes for someone to type the command in and then run it. This means that users may not notice your site going down in the time between the link is removed and then recreated to point to the latest build.

As a little side note, if you use Laravel then check out [Laravel Envoy](https://laravel.com/docs/master/envoy) as it may suit your needs more than bash scripts.

## What about a pipeline?

Many services such as GitHub, Bitbucket and GitLab offer a pipeline service. This allows you to run automated scripts each time you push your code up to the repository. 

You could start by creating a deploy script like above so the composer install is all done in the pipeline rather than on your server, but you could extend the pipeline to ssh into your server and deploy the code as well. 

You can even configure it to do different things for different branches. If you have a develop branch you could make it run phpunit tests as part of the script for this branch, ensuring your code passes the tests before you merge it into master. 

This is an example script taken from [bitbucket-pipelines.yaml](https://confluence.atlassian.com/bitbucket/php-with-bitbucket-pipelines-873907835.html) file which will use a base image running php 7.1, install composer and then run phpunit. 

```yaml
image: php:7.1.1
pipelines:
  default:
    - step:
        script:
          - apt-get update && apt-get install -y unzip
          - curl -sS https://getcomposer.org/installer | php -- --install-dir=/usr/local/bin --filename=composer
          - composer install
          - vendor/bin/phpunit
``` 

Any failures in the pipeline, whether its from tests or composer can’t access another repository, will normally stop the pipeline and send you a notification so you can investigate the issue, push a fix and then rerun the pipeline.

As with bash script variables, pipelines also offer access to variables that you can use in your script. These vary based on the service you choose so it's best to spend some time reading up on the options. 

Most pipeline services offer a starter template to get you going and then you can customise it you your needs. 

As per the list mentioned at the beginning of this article, it's good practice to test out the pipeline script on a staging server a few times to find out any issues and if there are any show stoppers.  

## Continuous Integration / Continuous Delivery

You may have heard the terms CI/CD being battered around, but unsure what this really means. It's a concept of pushing code often, multiple times per day in fact, and using pipelines to run tests and generate builds that can then be continuously deployed (or delivered) to the server. 

This allows you to find any issues in the tests and push up smaller iterative changes more often. Of course, this relies on you spending a bit of time and effort ensuring you have good test coverage of your code. 

You may feel that all this automation is overkill for your project, and you might be right, but personally, I find it reassuring that the same process is happening each time you push your code and the tests are running before the code is deployed. Its reassuring that you know the deployment is automated and there is less room for human error. 

Of course, it doesn't guarantee that everything will work every time, but at least there is more chance that the issue will be caught earlier, before the code has even been put onto your production web server. 









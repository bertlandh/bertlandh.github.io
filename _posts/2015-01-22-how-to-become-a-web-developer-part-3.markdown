---
layout: post
title:  "How to become a web developer - Part 3"
date:   2015-01-22 20:38:07
categories: training learning developer
description: "Making sure your web development work is backed up with version control, such as Git."
---

One of the biggest lessons I learnt was to make sure you have all your code backed up. When working on a project you may add and remove lots of lines of code in a couple of hours and its easy to make a mistake and delete the wrong line and for some reason the all mighty UNDO funtion doesn't bring it back.

## Git

So how can you back up your code to ensure you can get back anything you may delete by mistake? Personally, I use Git. [Git](http://git-scm.com/) is described as:

> Git is a free and open source distributed version control system designed to handle everything from small to very large projects with speed and efficiency.

Git allows you to work on your code locally, commit changes, roll back changes, push your changes to a repository and pull your code onto your web server.

This is a really good workflow as it ensures that when you start your local development it is using exactly the same code as your web server. You then commit your changes to git, along with a commit message detailing what you have changed, merge them in (or create a pull request) and then push them to your repository. The repository is where you code is stored.

## Repos

There are great and easy to use online services such as [bitbucket](https://bitbucket.org) and [GitHub](https://github.com) where you can store your repositories in the cloud. Lets call them repos as I can't be bothered to type repositories again (I know I just did...). There are both public and private repos available. Public are designed for sharing and working with others and private are for code you don't want to share. There is normally a charge for creating private repos so check before you create your account with your chosen service.

Github also offers an awesome [pages service](https://pages.github.com/) where you can host your website for free (which is what I use to host this site).

Anyway, once the code is safely in the repo you can then pull the latest code from your web server to update your changes.

## Branching and Merging

The other great thing about Git is that you can create branches of your code. This means that you can work on a bug fix or enhancement on a separate branch to the code running on your website, make your changes on that branch and then merge the changes back into your live (or master) branch.

This also means that you can work on different projects at the same time. For example, you cna be working on a branch to add a new menu to your site, but in the mean time you may notice a bug with your contact form. You just create a new branch for your bug fix and work on that branch, but it means that you don't need to push any changes to your new menu live at the same time as your bug fix. The menu code can site in its own branch, not affecting the bug fix.

Once the work on the branch is complete you can merge your branch into your master branch. Git detects changes to files, line by line and character by character. Therefore if there are any conflicts between what you are merging in and the existing code it will tell you. You can then merge in whichever version of the code is correct. This ensures you don't automatically overwrite anything.

## Pull Requests

An alternative workflow might be to create a pull request, rather than just merging in your changes directly. This is basically asking for permission to merge your changes in. This is especially useful if you are wotking with a team as it allows others to view your changes and test out your code and flag any potential issues before the code is merged. It may seem a bit over the top if you are working on your own but is quite a good workflow to follow as it ensures you check your changes before merging.

## Forking

Another useful feature of Git is that it allows you to fork a repository. Forking allows you to create your own copy of a repo and work on it without affecting anyone else. This allows you to build on what someone else has done and enhance it to suit your own needs. If you have fixed an issue with a forked repo you can create a pull request to merge your fork back into the master repo.

## Getting started

There is quite a lot to learn about Git and finding the correct workflow for you. Hopefully I haven't scared you off and you see the benefits of using version control. Its definitely something you want to get into the habit of using and you will probably experience a scenario like the one mentioned above, where you want to roll back or undo your changes, and think to yourself "I'm soooooo glad I'm using version control".

In my next post I'll talk a bit about using frameworks to get you off to a quicker start.
---
layout: post
title:  "Where is the best place to put your project documentation?"
date:   2019-02-22 21:00:07
categories: development web development documentation
description: "If you want someone else to use it you probably want to spend a decent amount of time on the documentation"
image: 'https://www.csrhymes.com/img/writing-documentation.jpg'
hero_image: /img/writing-documentation.jpg
hero_height: is-large
published: true
tags: webdev documentation
---

Making a project, library or package sometimes seems like the hard part, but if you want someone else to use it you probably want to spend a decent amount of time on the documentation to help others get started using your package. People won’t know how to use a feature if you don’t even take the time to write about it as they won’t even know it is there. 

So what are the different methods of writing documentation?

## Readme

A readme is the best place to start. A readme is normally a one page summary of the key features and how to get started installing and using your project. The readme is important as it is normally the landing page for your code repository on GitHub so try and make it succinct and to the point. 

A readme is normally written in markdown format so allows for basic formatting, such as headings, paragraphs, tables and code snippets, so make sure you add code examples where required. 

If your readme gets quite long then try and a contents section with links to the headings and subheadings to allow the reader to quickly jump to the section they need. 

If your readme gets too long and you need to split it into separate pages, then where can you go next?

## Wiki

If you are looking for a quick and easy solution then why not use a wiki. Most git hosting services allow you to turn on a wiki and start writing pages. Like a readme, a wiki usually allows markdown format, as well as links between pages. Check with your git host as to the type of markdown they use and the best way of linking pages together. 

Start with a contents page with links to other pages and try and ensure there is an easy way to get back to the contents page or to continue to the next page of the documentation. 

If you are happy with a basic but functional docs site then you can stop here, but what if you want to include live examples, such as CSS or JavaScript examples, then a wiki just won’t cut it. 

## GitHub Pages

If you want to make a more custom site with in line examples (not server side code I’m afraid) then you can use GitHub Pages to host your project site for free (other alternatives are available, such as BitBucket pages). 

GitHub pages allows you to either make your own html pages from scratch or use Jekyll. If you use Jekyll then it will build your html from your markdown files when you push up to GitHub. If you make your own HTML pages or use an alternative static site builder then you will need to compile the HTML on your local machine and then push up the compiled HTML, CSS and JavaScript. 

I personally use Jekyll to host my sites and projects, but I have also used VuePress in another situation to compile markdown using JavaScript. VuePress also allows you to use your own Vue components if you wanted a way of showcasing them. 

If you do go to all the effort of making a dedicated site for your documentation then you will want to let people know that it exists. As stated above, GitHub pages only allow frontend code but it also allows you to use certain Jekyll plugins (if you are using Jekyll) to allow some additional functionality, such as a sitemap, seo optimisation and an RSS feed, to make your life a bit easier and make your site more visible to search engines. 

One final thing is to ensure you add a link to your documentation site from your GitHub repo description and in the readme as well. This will allow people searching for your package to find your documentation site, as well as the code in GitHub. 


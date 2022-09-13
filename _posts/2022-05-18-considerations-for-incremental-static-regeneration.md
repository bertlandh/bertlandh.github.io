---
title: Considerations for Incremental Static Regeneration in Next.js
description: Some considerations when implementing Incremental Static Regeneration and On-Demand Revalidation in Next.js
layout: post
date: 2022-05-18 19:00:07
hero_image: /img/considerations-for-isr.jpg
hero_height: is-large
hero_darken: false
image: /img/considerations-for-isr.jpg
tags: JavaScript Next WebDev
---

Next.js offers a feature called Incremental Static Regeneration (ISR) that allows you to generate a static page when the page is first visited, rather than generating a static copy at build time. This is a really handy feature as it allows you to reduce your build time, but still benefit from having a cache of a page generated so future visitors will have a faster response time. 

What are some of the considerations that you need to make when implementing [ISR](https://nextjs.org/docs/basic-features/data-fetching/incremental-static-regeneration)?

## Keeping servers in sync

When you develop your site locally you only have one server running, but when you host your Next.js site in production then you may have multiple load balanced servers. When you deploy a Next site that uses Server Side Rendering (SSR) or Static Site Generation (SSG) you generally build the site and then copy the same code across the different servers.

When you use ISR, you need to consider that the cached or static page is generated in the `.next` directory on each server. Therefore, a static version of a page on one server may be different to a version on another server.  

You may need to use a shared network drive to keep a single version of the cache across the load balanced servers.

## Clearing the cached page

ISR allows you to set a revalidate time, which tells Next that once a cached page is older than the revalidate time then regenerate it. The revalidation is done in the background, which means that the user that requests the page will see an old version of the page. The user who next visits the page will then be presented with the new generated revalidated version of the page. 

This is great as it means that the user doesn't have to wait to be served a page, but if you have pages that don't get many visits then they may be quite out of date before the page is revalidated for the next user. 

If your pages don't get updated very often then maybe it's not a big deal and setting a high value for the revalidate time as the content won't change, but if your content changes often then you might have to set a lower revalidate time. 

## On demand revalidation

Next also offers another feature (currently in beta) that allows you to request a page is updated by sending an API request to your Next site. This is called [on demand revalidation](https://nextjs.org/docs/basic-features/data-fetching/incremental-static-regeneration#on-demand-revalidation-beta). 

When you edit a page in your CMS, you can get it to send an API request to your Next site and ask it to revalidate in the background. This means a user will see the new version of the page straight away, rather than the request after that. 

Going back to the previous point about the servers being in sync, if you have load balanced servers then the request will only be sent to one of the servers and the cache will only be updated on one server. You will probably need to have some kind of network storage to keep the .next directory in sync across all the servers. That way, if one server is sent an on demand revalidation request, then it will update the cache for all the servers. 

## On demand revalidation for bulk urls

Some pages are single pages, such as a blog post, so when that single page is updated then you can send an on demand revalidate request for that single page and it will be updated. But, what if you edit the blog post title or url? This means that you also need to update the blog homepage too so that also shows the updated title and url. 

The blog homepage may be paginated, so you may need to edit all of the blog index pages when a new blog post is added.

You may also have a category page that shows all posts with a particular tag, so these will need to be updated too. 

Suddenly, your request to revalidate a single page has turned into multiple requests to revalidate multiple pages. The logic to work out what pages need to be updated can start to get complicated in your CMS.

## Clearing all cached pages

You may also have a latest posts section on your site in the sidebar or footer of the page. Or have footer links on every page. 

Suddenly, changing one link in a footer menu means that you need to ask for all of the pages in your site to be revalidated. As far as I can see, there is no way of doing this currently in Next. 

You could queue up all of your url's in your CMS and then send them all to Next one after the other to get them to revalidate on demand, but you are then sending a lot of traffic to your frontend server, which will then send a lot of traffic back to your CMS to get the page data. If you have a lot of pages and you are not careful about it, you could end up creating a denial of service attack on your own webserver. 

## Balance

I think you need to work out a balance for your own site. Some sites are only updated every few days or so, but others have content regularly updated that could affect multiple or all pages. You need to work out how to best make use of these tools that Next.js have made available to you that balance both the performance benefits of ISR, alongside keeping pages as fresh and up to date as possible.

<a href="https://stocksnap.io/photo/sunset-trees-5NWOTP6VY0">Photo</a> by <a href="https://stocksnap.io/author/srahn">Stephen Rahn</a> on <a href="https://stocksnap.io">StockSnap</a>
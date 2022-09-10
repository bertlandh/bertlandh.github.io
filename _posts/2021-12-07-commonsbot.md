---
layout: post
title: Uploading with Commonsbot
description: Using a Python script to upload metadata and image to Wikimedia Commons
date: 2021-12-07 18:00:00
hero_image: /img/taoist_immortal.png
image: /img/taoist_immortal.png
hero_height: is-large
hero_darken: true
---

A few months ago, as part of our [WikiProject Vanderbilt Fine Arts Gallery](https://www.wikidata.org/wiki/Wikidata:WikiProject_Vanderbilt_Fine_Arts_Gallery), we received permission to upload Public Domain works from the [Vanderbilt Fine Arts Gallery](https://www.library.vanderbilt.edu/gallery/) to [Wikimedia Commons](https://commons.wikimedia.org/), where they will be more accessible to the public. 

To make this happen, I put in some more work on [Commonsbot](https://github.com/HeardLibrary/linked-data/tree/master/commonsbot), a Python script that I'd been hacking away at for about a year. It's now nominally functional, and I used it to upload just under 300 high-resolution images of two-dimensional works. 

There are existing tools for uploading images to Commons, but Commonsbot not only uploads the images with metadata based on the [Artwork template](https://commons.wikimedia.org/wiki/Template:Artwork), but it also adds [Structured data on Commons](https://commons.wikimedia.org/wiki/Commons:Structured_data) that backlinks the Commons media item to its corresponding Wikidata item. It also generates the necessary CSV data for another script I wrote, [VanderBot](http://vanderbi.lt/vanderbot), to create a P18 (image) link from the Wikidata item to the new Commons media item.

For example, one of our works whose [image was uploaded to Commons](https://commons.wikimedia.org/wiki/File:Unsigned_album_paintings_depicting_Taoist_immortals_-_Vanderbilt_Fine_Arts_Gallery_-_1995.008.tif) is now linked to its Wikidata item: <https://www.wikidata.org/wiki/Q104032737>. 

We can now do fun stuff with the images like create SPARQL-based visualizations such as an [image grid showing Kress collection works donated to the Gallery in the 1960's](https://w.wiki/4XWG). 
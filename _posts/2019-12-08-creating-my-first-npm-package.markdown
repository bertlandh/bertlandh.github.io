---
layout: post
title: Creating my first npm package
date: 2019-12-08 19:00:07
description: I've been a web developer for over 12 years, but I had never made my own npm package before
image: /img/bulma-block-list.jpg
hero_image: /img/bulma-block-list.jpg
hero_height: is-large
published: true
tags: showdev npm css webdev
---


I've been a web developer for over 12 years now and I use so many different npm packages every day throughout both my day job and my side projects, but I had never made my own npm package before. I decided that I wanted to see what it’s all about and how you go about creating your own package and deploying it to npm. 

## The idea

I enjoy using the Bulma frontend framework to build user interfaces with. It's simple to use, responsive and has many sass variables that allow you to easily customise your design. For a recent project I wrote some simple css to create a block style list to make it stand out a bit more than a bullet point list. 

This gave me an idea to create a simple package that allowed users to create a block style list easily, but also make use of the Bulma sass variables so they could customise it themselves. 

## package.json

After doing a bit of reading I started out by creating a new folder, changing into that folder and then running `npm init`. This guided me through the process of creating the package.json file including the name, version, keywords and licence. 

I then did a bit more research and found that it was a good idea to add the homepage and bugs tags to the package.json as well, especially if you are going to publish the package to npm. This allows users to navigate directly to the repo on GitHub to look at the code, as well as check out the issue log. I created a new repo on GitHub and updated the homepage and bugs section to point to the freshly created repo. 

Finally, I then added the author details and I was ready to start developing. One thing to note with npm is that you need a public facing email address. 

## Creating the scss

It seems to be standard practice to create a src directory with your raw code in it and a dist directory with the compiled code in. In my case, I created the block-list.scss file in the src directory and a block-list.css file (to be compiled from the scss file) in the dist directory. 

After a bit of research into Bulma I realised that I needed a way of being able to use their sass variables in my own block-list.scss file. Luckily there is a section of the [documentation](https://bulma.io/documentation/customize/with-node-sass/) that tells you all about customisation, including information on getting started with node-sass. 

```bash
npm install node-sass --save-dev
npm install bulma --save-dev
```

I started off by adding Bulma and node-sass to the dev-dependencies of my new package as per the instructions and copied the provided scripts section into the package.json and customised it to fit my needs. This gave me a way of easily compiling the scss file into the css file. 

```json
"scripts": {
  "css-build": "node-sass --omit-source-map-url src/block-list.scss dist/block-list.css",
  "css-watch": "npm run css-build -- --watch",
  "start": "npm run css-watch"
}
```

As I didn't want to import the whole of Bulma into my package I read on until I got to the section about importing only what you need. 

```scss
// Import only what you need from Bulma
@import "../node_modules/bulma/sass/utilities/_all.sass";
@import "../node_modules/bulma/sass/base/_all.sass";
```

I imported the `utilities/_all.sass` and `base/_all.sass` files into my scss file so I could use the Bulma variables I needed to extend. 

I created my .block-list class styles and then ran `npm start` to compile the scss file into the css file. 

## Creating a demo page

I wanted to be able to demo what the possibilities were with the block-list so I created a demo html page. I put it in the dist folder so I could easily use the block-list.css file I had just created. 

I created a simple layout using Bulma columns to demo the alignment, sizes, colours, outline and rounded corner possibilities. 

Once the demo page was built and the scss file was finished I decided to commit what I had done so far and push it up to GitHub. I use GitHub pages to host project pages for my other projects as well as my own website, but it had been a while since I had created a project page. When it came to creating a demo page using GitHub pages, I realised that the index.html page needed to be either in the root of the directory or within the docs directory. 

I decided to go with the docs directory so I renamed the dist directory to docs and pushed back up to GitHub, then setting th eGitHub pages to build from the docs directory. 

Not having a dist directory may be breaking with convention, but then I thought that a compiled version of the css won’t be of any use to users of the package anyway as they won’t be able to then overwrite the default Bulma variables. 

Anyway, the [demo page](https://www.csrhymes.com/bulma-block-list/) was now up and running. 

![Bulma Block List](/img/bulma-block-list.jpg)

## Creating the Readme

I created a readme file with some basic instructions to get started and then added a link to my demo page for more guidance. The instructions didn't include anything about npm as it wasn't published to npm yet. 

## Publishing to npm

Before I could publish to npm, I needed to create an account. I visited the npmjs.org website and signed up for a free account. 
Next I googled how to create your first npm package and an link to an article on [dev.to](https://dev.to/therealdanvega/creating-your-first-npm-package-2ehf) popped up

I read through the article and got to the section called "Publishing NPM Package" which told me everything I needed to do. I swapped back to my terminal and ran `npm adduser`. I proceeded to log in with my new npm account and then all that was left was to run `npm publish`. 

A few seconds later my package was [published on npm](https://www.npmjs.com/package/bulma-block-list) and was now available to use. 

I created a new folder on my computer, ran `npm init`, filled in some test information and then ran `npm i -S bulma-block-list` to test out my new package. The package downloaded and was now available in the node_modules directory. 

## Making a change and pushing the new version

It was after this point that I realised, maybe I should update my readme to include the instructions for npm. I updated the readme, commited the changes in git and then pushed up to GitHub. The changes were there on GitHub, but not in the npm page. 

I then tried to run npm publish to update the readme on npm, but it returned a 403 error, "You cannot publish over the previously published version 0.1.0". 

Unlike GitHub which displays the master branch version of the readme, npm updates are versioned, like releases and tags in GitHub. 

This made sense to me now. I updated the version to 0.1.1 in the package.json file, pushed to GitHub and then ran `npm publish` one more time. This time there were no errors and the new version published as expected. The readme was now correct on both GitHub and npm. 

## Learning Curve

Even with years of experience there is always a bit of a learning curve every time you do something new. I am going to spend a bit more time reading up on npm and the different parts of the package.json. I generally only use the title, scripts, the dependencies and dev-dependencies in everyday use, but there are a lot more sections that can be added, like the homepage, bugs and author sections. There is probably a lot to learn about adding the best keywords to give your package greater visibility too. 

If you have any tips that would help me or others out in future, then please add them in the comments below!


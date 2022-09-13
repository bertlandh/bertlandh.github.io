---
layout: post
title: Bulma Blade UI
description: Introducing Bulma Blade UI Laravel package
date: 2021-02-13 09:30:07
hero_image: /img/bulma-blade-ui.jpg
hero_height: is-large
hero_darken: true
image: /img/bulma-blade-ui.jpg
tags: laravel components bulma
---

I would like to introduce a new Laravel package I have been working on for a little while called Bulma Blade UI. It offers a set of reusable Blade components with the Bulma html structure and CSS classes, as well as basic authentication views for use with Laravel Fortify, ready to go with minimal setup. 

[Bulma Blade UI](https://github.com/chrisrhymes/bulma-blade-ui)

## A bit of personal history

I'll admit it, it took me a long time to get my head around the benefits of using Blade components when they were introduced. I was so used to writing lots of html and using Blade includes when I needed to. If I didn't write all of the html every time it felt like I was cheating and not being a true developer. 

The syntax was also a bit strange to me, with the `<x-component></x-component>` style tags compared to the standard Blade style tags, such as `@include()`. 

## Seeing is believing

But I recently saw how a co-worker had used components in their project and it made the view so much cleaner and readable by using components. Instead of massive chunks of repeating html, there was a single line for a component. 

**Before**

```html
<div class="field">
    <label class="label" for="username">Username</label>
    <div class="control">
        <input id="username" name="username" type="text" class="input " value="myusername">
    </div>
</div>
```

**After**

```html
<x-bbui::input label="Username" name="username" value="myusername"></x-bbui::input>
```

I owe a big thank you to my colleague for this wake up call!

I could now see the potential for how components could drastically increase my productivity, by writing less, as well as making views much leaner and easier to read. 

## Bulma Blade UI 

Tailwind is a massively popular frontend framework and there is an excellent component package called [Blade UI Kit](https://blade-ui-kit.com/). I have nothing bad to say against Tailwind and I can see why so many developers love using it, but I personally prefer to use Bulma. 

I searched for "Bulma Fortify" and found there were a few packages that offered authentication views for Bulma and Laravel, but there didn't seem to be a package that contained reusable Bulma components. Initially I was just going to create form input components, but then I thought it would be useful to add some additional components too, such as cards, messages and notifications. 

Once I had all of these components I then used them to build some Laravel authentication views in the package too. 

## Initial release

I have now released the Laravel package on [GitHub](https://github.com/chrisrhymes/bulma-blade-ui) as an alpha release. It has a set of unit tests and I have tested it myself in a new project but now I am looking for other developers to try out the package and give some feedback and raise any issues they have with the package. 

If you are a developer that uses Bulma and Laravel then I would appreciate your feedback and let me know how it can be improved!
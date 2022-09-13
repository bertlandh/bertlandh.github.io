---
layout: post
title: Building a Cookery Blog with Bulma Clean Theme
description: How to build a cookery blog using Bulma Clean Theme
date: 2021-03-25 19:00:07
hero_image: /img/recipe-example.jpg
hero_height: is-large
hero_darken: true
image: /img/recipe-example.jpg
tags: bulma blogging cookery recipes
---

Version 0.11 of Bulma Clean Theme has a new recipe layout you can use in your posts or pages. This post will explain how to use the new layout and build your very own cookery blog.

To make it as easy as possible to create a recipe page, the recipe is generated from page's front matter. This means that you only have to enter the information once and it will be used to create the page content, but it will also be used to generate [recipe schema data](https://developers.google.com/search/docs/data-types/recipe) for the recipe to help your site show up in search engines for recipe searches. 

If you add any additional content to the page, such as the story behind the recipe, it will appear below the recipe details. 

Start by using the recipe layout in your page or blog post's front matter and add a title and an image

```yaml
layout: recipe
title: My recipe title
image: /path/to/recipe-image.jpg
hero_image: /path/to/recipe-hero-image.jpg
```

Then create a list in the front matter for the ingredients:

```yaml
ingredients:
    - 1tsp vegetable oil
    - 2 Carrots, finely diced
    - 1 Onion, finely diced
```
Next add the method steps:

```yaml
method:
    - Heat the vegetable oil in a large pan on a medium heat, then add the carrots, onion and celery and cook for five to ten minutes to soften, stirring occasionally
    - Add the crushed garlic and cook for 2 more minutes, stiffing occasionally
```

Then specify the additional information about your recipe, such as the prep time, cook time, keywords, etc. The times need to be in a specific format for the recipe schema which uses [ISO 8601](https://en.wikipedia.org/wiki/ISO_8601), basically P for period, T for time, 1H for one hour and 1M for one minute. 

```yaml
prep_time: PT0H10M
cook_time: PT1H
total_time: PT1H10M
keywords: recipe,cooking
recipe_yield: 4
recipe_category: Main course
recipe_cuisine: Italian
calories: 500 calories
```

When you build the page, this data will be inserted into the recipe template and the schema will be generated in the background. 

More information and an example page can be found on the [Bulma Clean Theme demo site](https://www.csrhymes.com/bulma-clean-theme/example-recipe/).

Have fun and enjoy building your cookery blog!

Photo by <a href="https://stocksnap.io/author/36317">Janko Ferlic</a> from <a href="https://stocksnap.io">StockSnap</a>
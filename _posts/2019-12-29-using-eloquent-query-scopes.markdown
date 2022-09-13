---
layout: post
title: Using Eloquent Query Scopes in Laravel
date: 2019-12-29 15:00:07
description: Getting started with Eloquent Query Scopes to simplify your queries and keep Controllers clean
image: /img/using-eloquent-query-scopes.jpg
hero_image: /img/using-eloquent-query-scopes.jpg
hero_height: is-large
published: true
tags: laravel webdev php database
---

If you are writing eloquent queries in your Laravel project and find yourself writing the same logic in your queries over and over again then query scopes might be of use to you. Scopes offer you a way of extracting a part of a query from your controller and into your model to simplify your queries and keep them cleaner. 

Laravel has local and global [scopes](https://laravel.com/docs/6.x/eloquent#query-scopes), but this article only discusses local scopes. 

## Published and Draft Posts

Lets start with a blog as the first example. For a blog you will have posts, but some posts may be published and some may be drafts. We will set a boolean flag to decide if the post is published or not, with true for published and false for draft. 

```php
$publishedPosts = Post::where('published', true)->get();

$draftPosts = Post::where('published', false)->get();
```

This seems simple enough, but to make this a bit more readable and easier to write we can refactor these queries by using scopes. We can add a couple of methods to our Post model that start with `scope` and then the name you want to use, such as `scopePublished` and `scopeDraft` so you can call `published()` and `draft()` in your eloquent queries. 

```php
<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Post extends Model
{
    public function scopePublished($query)
    {
        return $query->where('published', true);
    }

    public function scopeDraft($query)
    {
        return $query->where('published', false);
    }
}

```

With this in place, we can then rewrite our queries to use these new scopes, making them cleaner and easier to read.  


```php
$publishedPosts = Post::published()->get();

$draftPosts = Post::draft()->get();
```

## Updating the published logic

This may seem a bit over the top to do this for one instance, but imagine you have multiple queries throughout your project that use this same logic. What happens if you need to change the logic of how you determine if a post is published? 

For example, you want to add a `published_at` date time to your posts table so you can determine when the post was published as well as if its published or not. We can remove the `published` boolean flag and use the `published_at` for both the date time and to determine if the post is published.

If you don't extract this logic to a scope in your model then you will have to update every instance in your project. With a scope you can update the logic in one place, in your model, and the rest of the queries can remain unchanged. 

```php
<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Post extends Model
{
    public function scopePublished($query)
    {
        return $query->whereNotNull('published_at');
    }

    public function scopeDraft($query)
    {
        return $query->whereNull('published_at');
    }
}
```

### Date Mutators

As a side note, if you add a date time column to your table, such as `published_at`, then it is worth adding it to the `$dates` property of your model to [convert it to an instance of Carbon](https://laravel.com/docs/6.x/eloquent-mutators#date-mutators). This allows you to pass in a UNIX timestamp, date string a date-time string or a DateTime/Carbon instance to the field when saving.

```php
class Post extends Model
{
    protected $dates = ['published_at'];
}
```

It will also allow you to use Carbon format() method when displaying the field.

```php
$post->published_at->format('d/m/Y');
```

## Post Types

If we expand on our post example a little more, you may have some posts that are news and others are special offers that are displayed on different parts of your site. This way you can reuse a lot of your exisitng code to create and manage posts. 

We can store this in the posts table as a string, such as `news` or `special_offers`, in the type table and then make a dynamic scope that accepts a parameter to help us filter out the posts we want. 

```php
<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Post extends Model
{
    public function scopeType($query, $type)
    {
        return $query->where('type', $type);
    }
}

```

We can then create a query using this scope.

```php
$newsPosts = Post::type('news')->get();
```

## Chaining query scopes

We now have a way of getting published posts and a way of getting news posts. With scopes, we can also chain them together in different combinations to get the posts we want, such as published news posts or draft special offer posts. 

```php
$publishedNewsPosts = Post::published()->type('news')->get();

$draftSpecialOfferPosts = Post::draft()->type('special_offers')->get();
```

If we had an additional type of posts, such as `tutorials` and wanted to get published posts for news or tutorials type then we could use the `orWhere` helper for this.

```php
$posts = Post::published()->type('news')->orWhere->type('tutorials')->get();
```

Hopefully this will give you some ideas for how you can use query scopes in your future Laravel projects. 
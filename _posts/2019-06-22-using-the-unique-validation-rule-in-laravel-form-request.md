---
layout: post
title:  "Using the unique validation rule in a Laravel Form Request"
date:   2019-06-22 08:00:07
description: "Using the unique validation rule in Laravel to ensure that a field is unique in the database, such as a post title"
image: '/img/unique-validation-rule.jpg'
hero_image: /img/unique-validation-rule.jpg
hero_height: is-large
published: true
tags: webdev Laravel validation
---

Sometimes you want to ensure that a field is unique in the database so that someone can’t add the same item twice, such as the title for a post. Laravel provides a couple of handy tools for this, including the Unique validation rule, but there is a bit more configuration required to other validation rules to make the most of its abilities. 

Let’s start with how the field is defined in the database before moving on to populating it.

## Database Migrations

When you know you have a field that you want to be unique, such as the post title in this example, you can define that the field needs to be unique in the migration. 

```php
$table->string('title')->unique();
```

This will generate an index in the database which will prevent two rows in the table having the same title when you try and save a record. This works just fine, but you will hopefully want to handle this exception in a more user friendly manner when someone is trying to save their post. This is where validation rules come into play. 

## Form Request Validation

If you have a form that the user has to fill in to create the post then you can either validate directly in the controller method for store and update, or you can move the validation into a form request class. I personally prefer to move the validation into a form request class as this leaves your controller a bit cleaner and the validation rules are in one place.

You can use the artisan command to generate a form request class, in our case we will call it StorePostRequest

```php
php artisan make:request StorePostRequest
```

And then we can inject the newly created class into your store and update methods in the PostController

```php
<?php

namespace App\Http\Controllers;

use App\Http\Requests\StorePostRequest;

class PostController extends Controller
{
    public function store(StorePostRequest $request)
    {
        // Store model
    }

    public function update(StorePostRequest $request, Post $post)
    {
        // Update model
    }
}
```

Now we can add the unique validation rule to the StorePostRequest class. We want to make the title a required attribute and then ensure that the title is unique in the posts table. The rule has a format of unique:table,column.

```php
public function rules()
{
    return [
	    'title' => 'required|unique:posts,title'
    ];
}
```

Sorted. If we try and create two posts with the same title then it will return a validation error. 

## But what happens when we try and edit the post? 

When we try and update the post it will again check that the title is required and that there is not a post with the same title, which is what we want right? 

What actually happens is that it checks against the posts table and finds the model we saved previously, which has the same title as the post we are trying to update, so it returns a validation error. 

To get around this we need to update our validation rule to let it know that it needs to check that the title is unique in the table, except against the model we have saved previously. 

There is another value we can add to the unique validation rule which is except to say which model to ignore. We could write this a couple of ways but I prefer the second as I find it a bit more readable when I come back to it later. 

```php
public function rules()
{
    return [
	    'title' => "required|unique:posts,title,{$this->post->id}"
    ]; 
}
```

Or

```php
use Illuminate\Validation\Rule;

public function rules()
{
    return [
	    'title' => [
		    'required',
		    Rule::unique('posts', 'title')->ignore($this->post)
	    ]
    ]; 
}
```

What we are doing here is telling the unique rule to ensure the title in posts is unique, but ignore this post so we can update the post with the same title as the current saved model without generating a validation error.

But where does `$this->post` come from? There is no variable set in the StorePostRequest class which sets `$this->post`. Instead we have to look up the inheritance chain a couple of levels. 

The StorePostRequest extends FormRequest, which extends Request which has a getter method which will return the post that is passed to the route when we call `$this->post`. So `$this->route($key)`, where `$key` is `post` in this case.

I hope this helps explain a bit more about making the most out of the unique validation rule. For more information about using the URI parameters in the form request, see the [Authorizing Form Requests](https://laravel.com/docs/5.8/validation#authorizing-form-requests) section of the Laravel documentation. 

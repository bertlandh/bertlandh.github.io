---
layout: post
title:  "Using Laravel Eloquent's Many to Many Relationship"
date:   2019-04-06 08:00:07
description: "Just this week I discovered that there is a much easier way to define and use many to many relationships"
image: '/img/many-to-many-relationships.jpg'
hero_image: /img/many-to-many-relationships.jpg
hero_height: is-large
published: true
tags: webdev laravel relationships eloquent
---

The more time you spend reading the Laravel docs, the more things you will find that will save you time and effort. I have been using Laravel for many years but this week I discovered I had been using the many to many relationship in a sub optimal way, and by that I mean I avoided it at all costs. 

It must have been due to something I learned at university but I can remember being taught about database relationships and that you should avoid many to many relationships in your tables and instead you should have a link or pivot table between them. 

So whenever I designed my databases I would avoid many to many directly between tables and set up another table to link them together. When using Laravel I would then define each relationship separately, so one to many from the first table to the link table, then one to many from the second table to the link table, and the inverse from the link table to the other tables. 

Just this week I discovered that there is a much easier way to define and use many to many relationships, i.e. properly. To make this easier to understand I will use an example. 

## Many To Many Example

As I am feeling hungry right now, let’s consider types of bread and sandwich fillings, sorry if this makes you hungry too (hopefully it will give you a hunger to learn…). There are many types of bread and there are many types of sandwich filler. One type of bread, let’s say wholemeal bread, can have many sandwich fillers, such as cheese, ham, lettuce and marmite. But inversely, marmite can be used with white bread, wholemeal bread, bagels, etc. as marmite is always good with every type of bread. So we have a many to many relationship between them.

## Creating Models, Migrations and Controllers

In Laravel, we need to create a model for types of bread, lets call it Bread as Laravel uses singular names for Models, and a model for sandwich fillers, called SandwichFiller. 

First we need to create the models, migrations and controllers for these two. I recently found another useful shortcut where you can create the model, migration and resource controller in one go by using -mcr. 

```php
php artisan make:model Bread -mcr
php artisan make:model SandwichFiller -mcr
```

For simplicity we are only going to give each table a `name` field, along with the id and timestamps in the migration. 

Next, we also need to make a migration for the link table to connect them together. I might be wrong, but I don’t see a need to create a model for the link table as we won’t be accessing it directly. 

```php
php artisan make:migration create_bread_sandwich_filler_table --create=bread_sandwich_filler
```

In this migration we need to add a column for `bread_id` and `sandwich_filler_id`, along with the id and timestamps. Notice the name is `bread_sandwich_filler` instead of `sandwich_filler_bread`. This is due to the Laravel naming convention where it orders the models alphabetically. 

We can then run php artisan migrate to create these new tables. 

## Defining Relationships

Now we are ready to start defining the relationship. If we open the Bread model we can define the many to many relationship with the sandwich fillers. 

```php
class Bread extends Model
{

    public function sandwichFillers()
    {
        return $this->belongsToMany(SandwichFiller::class);
    }

}
```

Then we can define the relationship in the SandwichFiller model

```php
class SandwichFiller extends Model
{

    public function breads()
    {
        return $this->belongsToMany(Bread::class);
    }

}
```

Even though we have created the `bread_sandwich_filler` table we don’t need a model or define the relationship with this in any way. It just works. 

## Retrieving Relations

Now we have the migrations and models, we can retrieve the relations. For Bread we can do something such as 

```php
$bread = Bread::find($id);

foreach($bread->sandwichFillers as $filler) {
	echo $filler->name;
}
```

And for SandwichFiller

```php
$sandwichFiller = SandwichFiller::find($id);

foreach($sandwichFiller->breads as $bread) {
	echo $bread->name;
}
```

## Syncing Relations

This was the bit that really saved me time, the meat in the sandwich if you will, and the reason I wanted to share this with you. Rather than manually adding and removing items from the `bread_sandwich_filler` table you can use sync by passing an array of id’s into it. 

If we have a list of sandwich fillers that we need to relate to a type of bread, such as cheese, ham, pickle and lettuce to add to crusty bread to make a ploughmans sandwich, we can use sync to do this for us. 

If we know cheese is id 1, ham is id 2, pickle is id 3 and lettuce is id 4, we can do the following.

```php
$bread = Bread::whereName(‘Crusty Bread’)->first();

$bread->sandwichFillers()->sync([1, 2, 3, 4]);
```

If we decide that we want to replace the pickle with marmite (which has id 5) we can simply do the following:

```php
$bread->sandwichFillers()->sync([1, 2, 3, 5]);
```

This is so much easier than trying to work out which items need adding or removing from the `bread_sandiwch_filler` table manually. It takes care of all the logic for you. When I found this out I could remove about 10 lines of code from my controller and replace it with the one line sync command. 

I hope you have found this interesting and can save you some time in future, but apologies if its left you wanting a sandwich. 




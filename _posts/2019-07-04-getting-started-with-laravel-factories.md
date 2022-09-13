---
layout: post
title:  "Getting started with Laravel factories"
date:   2019-07-04 19:00:07
description: "If you want to start writing some tests for your Laravel project then chances are you will need to write some factories at some point"
image: '/img/laravel-factories.jpg'
hero_image: /img/laravel-factories.jpg
hero_height: is-large
published: true
tags: webdev Laravel testing factories
---

If you want to start writing some tests for your Laravel project then chances are you will need to write some factories at some point. When I first heard the term factory I had no idea what it meant and what it did, let alone the benefits they can bring to your tests. 

**Edit:** This article refers to factories up to and including Laravel 7. For information on refactoring to Laravel 8 factories, please check out this article: [Refactoring to Laravel 8 Class Model Factories]({% post_url 2021-07-20-refactoring-to-class-factories %})

Imagine you have a controller for a product that has a store method to save a new product's details. A product might have a product code, title, price, description and a tagline which are all sent in the request to the store method. 

If you wanted to test this endpoint you could create an array of properties and then send them in your post request. 

```php
$product = [
    'product_code' => 'ABC123',  
    'title' => 'My Amazing Product', 
    'price' => 100, 
    'description' => 'This product will change the way you wash your dishes forever',
    'tagline' => 'Voted best in category'
];

$response = $this->post(route('products.store'), $product);

// Your assertions here
$response->assertSuccessful();
```

This works fine. 

But then if you want to use the product in another test, such as testing updating the product then you either have to duplicate the array in the next test method, or you could extract it to the tests setUp() method and make it `$this->product` so it's reusable. 

If you have another test class to test adding a product to a category then what do you do then? How can you reuse your product? How can you define the relationship between different models? Luckily factories have an answer to these questions. 

## Creating a factory

Instead of manually making an array you can make a factory class. There is an artisan command that will allow you to easily make a factory for your product model.

```php
php artisan make:factory ProductFactory --model=Product
```

This will generate a new ProductFactory.php file in the database/factories directory and associate it with your Product model. In this file we can add the field names as the array keys and the desired values as the array values. 

```php
use Illuminate\Support\Str;
use Faker\Generator as Faker;

$factory->define(App\Product::class, function (Faker $faker) {
    return [
        'product_code' => 'ABC123',
        'title' => 'My Amazing Product', 
        'price' => 100, 
        'description' => 'This product will change the way you wash your dishes forever',
        'tagline' => 'Voted best in category'
    ];
});
```

## Defining values using Faker

We could use the static values that we used in the array we defined previously, but factories allow us to use Faker to provide us with some test data that is different each time we generate a new model using the factory. 

So for product code we could use something like numerify to generate different product codes. This will generate a code beginning with ABC followed by three digits, replacing the hashes. 

```php
'product_code' => $faker->numerify('ABC###')
```

But what if we wanted to ensure that the product codes were unique? Faker has a unique method we can chain in which ensures the generated content is not in the table yet. 

```php
'product_code' => $faker->unique()->numerify('ABC###')
```

For the title we could use words to generate some words. If you want an array of words then you simply need to state how many words you want, but as we want some product text we add true as the second argument. 

```php
'title' => $faker->words(3, true)
```

For the price we could use randomNumber, but as its currency we probably want the number to two decimal places, so we will use randomFloat. We also want a realistic min and max value so we can pass these in as the next two arguments. 

```php
'price' => $faker->randomFloat(2, 10, 100)
```

For the description, we could use words again and set it to a higher value or we could use paragraph, but instead lets get some more realistic looking text using realText. We need to set the maximum length of characters we want. Lets say a maximum of 200 characters is fine four our case. 

```php
'description' => $faker->realText(200)
```

Finally, for the tagline we could use something that is a bit more fun than words or real text, called catch phrase.

```php
'tagline' => $faker->catchPhrase
```

Here is our updated ProductFactory.

```php
use Illuminate\Support\Str;
use Faker\Generator as Faker;

$factory->define(App\Product::class, function (Faker $faker) {
    return [
        'product_code' => $faker->unique()->numerify('ABC###'),
        'title' => $faker->words(3, true), 
        'price' => $faker->randomFloat(2, 10, 100), 
        'description' => $faker->realText(200),
        'tagline' => $faker->catchPhrase
    ];
});
```

So now we have our factory we can update our test to use this instead, with the factory helper. 

```php
$product = factory(\App\Product::class)->make();

$response = $this->post(route('products.store'), $product->toArray());

$response->assertSuccessful();
```

There are a couple of points to note in this example. 

Firstly, we used `factory()->make()` instead of `factory()->create()`. They may sound similar, but make will make a new model for you to use in your test, whereas create will create it and persist it in your database. Using create might cause you issues if you have validation where product codes need to be unique as it won't allow you to store the new product as the product code is already in the database. 

The second point to note is that the `$this->post()` expects the second parameter to be an array so we have to use the `$product->toArray()` method on the end to convert it from an object. 

## Factory States

This seems to be working as we want now, but lets say we want to add a flag to our product to say it's out of stock. Once we have added the field to our database we can update the product factory with a new field. 

```php
'out_of_stock' => $faker->boolean()
```

This will randomly set the out of stock flag to true or false. 

But what if we wanted to create a product that was always out of stock? One way we can do this is by overriding the value when we use the factory helper in our test.

```php
$product = factory(\App\Product::class)->make(['out_of_stock' => true]);
```

If we wanted to make this more reusable we could instead create a state in the factory. The state method sets the model as the first argument, the name of the state as the second argument and the values that will be overridden in the third.

```php
$factory->state(\App\Product::class, 'out_of_stock', [
    'out_of_stock' => true
]);
```

In our test we can call the factory and then apply the state before we call make().

```php
$product = factory(\App\Product::class)->states('out_of_stock')->make();
```

Where this becomes really powerful is when we have multiple states in our factory we can apply them together. For example, if we have a state where the price is free for a product we could overwrite the price.

```php
$factory->state(\App\Product::class, 'free', [
    'price' => 0.00
]);
```

So when we want out of stock and free products we can apply both states to the product in our test. 

```php
$product = factory(\App\Product::class)->states(['out_of_stock', 'free')->make();
```

## Making multiple models

Another little tip, lets say we want 10 products instead of just one, we don't need to call the factory 10 times, we just add a count to the factory helper as its second argument and it will make 10 products for us. 

```php
$products = factory(\App\Product::class, 10)->make();
```

## Relationships in Factories

We are making good progress with our product tests, but now we want a product to belong to a category. Factories allow us to test with relationships by using another factory. 

Once we have added the categories table to the database and defined the relationships in the product and category models we can make a category factory

```php
php artisan make:factory CategoryFactory --model=Category
```

For simplicity, the category only has a title and a description, so we can use word for the title and realText for the description. 

```php
use Illuminate\Support\Str;
use Faker\Generator as Faker;

$factory->define(App\Category::class, function (Faker $faker) {
    return [
        'title' => $faker->word,
        'description' => $faker->realText(100)
    ];
});
```

Now we can add the category_id to the product factory, but how do we link the product to the category? 

Instead of using faker like the other fields, we can use the factory we just made from within the ProductFactory. 


```php
use Illuminate\Support\Str;
use Faker\Generator as Faker;

$factory->define(App\Product::class, function (Faker $faker) {
    return [
        'product_code' => $faker->unique()->numerify('ABC###'),
        'title' => $faker->words(3, true), 
        'price' => $faker->randomFloat(2, 10, 100), 
        'description' => $faker->realText(200),
        'tagline' => $faker->catchPhrase,
        'out_of_stock' => $faker->boolean,
        'category_id' => factory(\App\Category::class)
    ];
});
```

Somehow the above works as is. It seems to know that it expects the id so you don't need to use `factory()->create()` or even `factory()->create()->id` to then get the category id. 

Now when you run your test that creates a product it knows that it should belong to a category and make a category for you as well without you doing anything extra in your test. 

If, for a particular test scenario, you want to create products that belong to a certain category then you can define the category first and then override the category id on your product to be the category you just made. 

```php
$category = factory(\App\Category::class)->create();

$products = factory(\App\Product::class, 10)->create(['category_id' => $category->id]);
```

You could then assert that the category has 10 products. 

```php
$this->assertEquals(10, $category->fresh()->products->count());
```

Hopefully this article has given you some ideas of how you can get started with using factories in your tests and make writing tests a bit easier in future. 

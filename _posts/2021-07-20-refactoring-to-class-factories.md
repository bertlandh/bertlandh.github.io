---
layout: post
title: Refactoring to Laravel 8 Class Model Factories
description: How to refactor Laravel factories to Laravel 8 Class Model Factories
date: 2021-07-20 19:00:07
hero_image: /img/laravel-factories.jpg
hero_height: is-large
hero_darken: false
image: /img/laravel-factories.jpg
tags: PHP Laravel Testing
---

Laravel 8 introduced new class based model factories and if you have an existing project you can use the legacy factories package to keep using the old factories. I have tended to keep the factories as they were and continue development, but after working on a fresh Laravel 8 project and using the new class based syntax I decided to go back and update the factories in the older Laravel apps. This article explains how I went about refactoring the factories to classes. 

In this scenario we have a Laravel app that allows you to create a post. The post has a title, content, author and is either published or not published. 

## Original Factory

Here is the PostFactory in the previous format. It defines the default state, with the publish value set to false. It has a state called published where the publish value is set to true. 

```php
// database/factories/PostFactory.php

<?php

/** @var \Illuminate\Database\Eloquent\Factory $factory */

use App\Post;
use Faker\Generator as Faker;

$factory->define(Post::class, function (Faker $faker) {
    return [
        'title' => $faker->words(3, true),
        'content' => $faker->text,
        'author_id' => factory(User::class),
        'publish' => false,
    ];
});


$factory->state(Post::class, 'published', function (Faker $faker) {
    return [
        'publish' => true,
    ]
});
```

Here is a very basic example showing the factory being used in a test, using the factory() helper method. The second test in the example has the published state applied to it. 

```php
// tests/Unit/PostTest.php

<?php

namespace Tests\Unit;

use App\Post;
use Tests\TestCase;

class PostTest extends TestCase
{
    public function test_post_is_not_published()
    {
        $post = factory(Post::class)->make();

        $this->assertFalse($post->published);
    }

    public function test_published_post_is_published()
    {
        $post = factory(Post::class)->state('published')->make();

        $this->assertTrue($post->published);
    }
}
```

## Refactoring the Factory

There are a few changes that are needed to refactor to the new factory class, so let's go through them one by one.

### Namespace

First we can remove the `@var` declaration and replace it with a namespace.

```php
// Remove
/** @var \Illuminate\Database\Eloquent\Factory $factory */

// Add
namespace Database\Factories;
```

### Class

The new factories are classes so we need to define the class and make it extend the factory class. 

Ensure you extend `Illuminate\Database\Eloquent\Factories\Factory;` and not the old factory `Illuminate\Database\Eloquent\Factory`. This caught me out more than once.

To define that this factory is to be used with the Post model we need to add the protected model property, setting the value as the Post::class. 

```php
<?php

namespace Database\Factories;

use App\Post;
use Faker\Generator as Faker;
use Illuminate\Database\Eloquent\Factories\Factory;

class PostFactory extends Factory
{
    protected $model = Post::class;
}
```

### FakerPHP

If you have an older Laravel app you may be using `fzaninotto/Faker` in your composer.json file, which is now archived. Take this opportunity to update your composer.json to use `fakerphp/faker` and run `composer update`. 

In the old factories we passed in Faker into the functions, but now faker is available using `$this->faker` from the parent Factory class. This means we can also remove the following line.

```php
// Remove
use Faker\Generator as Faker;
```

### Factory definition

Now we are ready to provide our factory definition. This is done via a `definition` method on the class. 

We still return an array, like the previous factory did, but we need to update `$faker` to `$this->faker`. 

We also need to update the relationship for the author_id so it no longer uses the `factory()` helper, from `factory(User::class)` to `User::factory()`. This means that we will also have to update the UserFactory.php to use the new class based approach.

```php
public function definition()
{
    return [
        'title' => $this->faker->words(3, true),
        'content' => $this->faker->text,
        'author_id' => User::factory()),
        'publish' => false,
    ];
}
```

### Factory State

Previously we defined our published state using the `$factory->state()` syntax. Now we can create a new method on the class which returns `$this->state()`. 

```php
public function published()
{
    return $this->state(function (array $attributes) {
        return [
            'publish' => true,
        ]
    });
}
``` 

## Updating the Model

Before we can use the factory in our test, we need to update our Post model to tell it to use the HasFactory trait. This helps connect the model to the new factory class. 

```php
<?php

namespace App\Post;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Post extends Model
{
    use HasFactory;
}
```

## Composer.json Changes

To use the new factories you need to add the namespace for the database factories to the autoload section of the composer.json.

```json
"autoload": {
    "psr-4": {
        "App\\": "app/",
        "Database\\Factories\\": "database/factories/",
        "Database\\Seeders\\": "database/seeders/"
    }
},
```

You can then run `composer dump-autoload` to update the autoloader.

## Updating The Test

Finally, we are ready to update our test to use the new factory class. 

We start by removing the `factory()` helper and use the `Model::factory()` syntax instead. So `factory(Post::class)` becomes `Post::factory()`. 

Next we can update the way we set states by chaining the published state method we created. So `factory(Post::class)->state('published')` becomes `Post::factory()->published()`. 

```php
// tests/Unit/PostTest.php

<?php

namespace Tests\Unit;

use App\Post;
use Tests\TestCase;

class PostTest extends TestCase
{
    public function test_post_is_not_published()
    {
        $post = Post::factory()->make();

        $this-assertFalse($post->published);
    }

    public function test_published_post_is_published()
    {
        $post = Post::factory()->published()->make();

        $this-assertTrue($post->published);
    }
}
```

## Updating All Tests

I use PHP Storm and have found that the `Replace in files` function is very useful replacing `factory(Post::class)` with `Post::factory()` over many files. 

Where it gets a bit more tricky is when you have to apply states, updating `->state('published')` to `->published()`. To be honest, I ended up changing the states manually. 

The other difficulty I found was when creating multiple factories. The syntax for this changed quite a lot from `factory(Post::class, 3)` to `Post::factory()->count(3)`. 

Let me know in the comments if you have a reliable way of updating states and multiples. 

For more information on [Model Factories](https://laravel.com/docs/8.x/database-testing#defining-model-factories) check out the Laravel docs website. 
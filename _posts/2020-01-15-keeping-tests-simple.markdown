---
layout: post
title: Keeping Tests Simple in Laravel
description: How can we keep tests in a Laravel application simple and quick to write?
date: 2020-01-15 15:00:07
hero_image: /img/keeping-tests-simple.jpg
hero_height: is-large
image: /img/keeping-tests-simple.jpg
tags: laravel webdev php testing
---

When developing a Laravel web application it can often start out quite simple, but can grow in complexity over time. This complexity can also end up being reflected in your tests. Sometimes to run an end to end test you can end up spending longer creating the scenario for the test than the actual test. How can we keep tests simple and quick to write?

Lets start by defining an example app for this article. The app will have news articles. Each article can be public or private. Private articles are available to signed in users / members of the site. 

Imagine we have a resource controller for articles called ArticleController and we want to test viewing an index page of articles and then test viewing public and private articles listed out on the index page.

## Testing the index page

To test the index page we need to create an article, send a get request to the articles index route, assert it is successful and that we can see the title on the page. 

```php
<?php

namespace Tests\Feature;

use Tests\TestCase;

class ArticleIndexTest extends TestCase
{
    public function testViewIndex()
    {
        factory(Article::class)->create([
            'title' => 'My first news article',
            'private' => 'false'
        ]);

        $response = $this->get(route('articles.index'));
        $response->assertSuccessful();
        $response->assertSee('My first news article');
    }
}

```

This seems nice and simple so far. The scenario set up is just a factory creating a new article. 

Next, we want to add a new test to check that guest users can't see a private article.

```php
public function testCannotSeePrivateArticle()
{
    factory(Article::class)->create([
        'title' => 'My first private article',
        'private' => true
    ]);

    $response = $this->get(route('articles.index'));
    $response->assertSuccessful;
    $response->assertDontSee('My first private article');
}
```

Let's say that the business now wants to add draft and published article status as well. We could update our tests with this additional column when making the articles like this.

```php
factory(Article::class)->create([
    'title' => 'My first private article',
    'private' => true,
    'published' => true
]);
```

This seems fine, but the set up is starting to grow bit by bit. One way of taking this out of individual tests is to create some factory states. 

## Using Factories States in Tests

Factory states allow you to overwrite the default values you specify in your factory. You may have a factory like this where it randomly selects whether a post is private or public when it is created, or have it always set the published value to false. 

```php
use Faker\Generator as Faker;

$factory->define(App\Article::class, function (Faker $faker) {
    return [
        'title' => $faker->words(3, true),
        'private' => $faker->boolean(),
        'published' => false
    ]
});
```

With factories you can also define a state, such as private or published.

```php
use Faker\Generator as Faker;

$factory->define(App\Article::class, function (Faker $faker) {
    return [
        'title' => $faker->words(3, true),
        'private' => $faker->boolean(),
        'published' => false
    ]
});

$factory->state(App\Article::class, 'public', [
    'private' => false
]);

$factory->state(App\Article::class, 'private', [
    'private' => true
]);

$factory->state(App\Article::class, 'published', [
    'published' => true
]);

```

We can now refactor our tests to use the factory state instead of manually overriding the private and published values. 

```php
factory(Article::class)->states('private', 'published')->create([
    'title' => 'My first private article',
]);
```

For more information on factories, check out my post [Getting started with Laravel factories](/2019/07/04/getting-started-with-laravel-factories.html).

## Assigning Factories to Variables

We can do one more thing to slim down our test set up a little more and that is to assign it to a variable so we can use the values in a test later. Here we assign the factory to `$article` so we can call `$article->title` in the test.

```php
public function testCannotSeePrivateArticle()
{
    $article = factory(Article::class)->states('private', 'published')->create();

    $response = $this->get(route('articles.index'));
    $response->assertSuccessful;
    $response->assertDontSee($article->title);
}
```

If for some reason we needed 10 articles created we can now do this easily by adding a second parameter inside the `factory()` helper. We can access the individual article by using array keys, such as `$articles[0]->title` to get the value of the first article. 

```php
public function testCannotSeePrivateArticle()
{
    $articles = factory(Article::class, 10)->states('private', 'published')->create();

    $response = $this->get(route('articles.index'));
    $response->assertSuccessful;
    $response->assertDontSee($articles[0]->title);
}
```

## Using the setUp() Method

Let's imagine that we had 10 different tests in our ArticleIndexTest class and each of the tests needed a public and a private article for their scenario. We could create these in each test, but instead we could also extract this up a level to the setUp method on the test and make the variables scoped to the whole class instead of just the individual test. 

The setUp runs before each test in your class so each test will have access to a private article and a public article. 

```php
<?php

namespace Tests\Feature;

use Tests\TestCase;

class ArticleIndexTest extends TestCase
{
    private $privateArticle;
    private $publicArticle;

    public function setUp()
    {
        parent::setUp();

        $this->privateArticle = factory(Article::class)->states('private', 'published')->create();
        $this->publicArticle = factory(Article::class)->states('public', 'published')->create();
    }

    public function testViewIndex()
    {
        $response = $this->get(route('articles.index'));
        $response->assertSuccessful();
        $response->assertSee($this->privateArticle->title);
    }
}

```

Ensure you add the `parent::setUp();` so it runs the set up in the TestCase class as well.

## Data Providers

Another method to consider is using data providers in your tests. If you have multiple scenarios that you want to test then this may be made easier with data providers. 

We can create a method that returns an array and then add this to the test method by specifying it as a dataProvider in the doc block of the test method. Each item in the array will be pulled into the test one after the other, allowing you to reuse the same test multiple times. 

Lets assume that we want to create a new article but before it is created we need to ensure the required fields are present in the request. Therefore, we create a form request, add the validation rules and then inject the form request into the store method. We want to ensure that each validation rule works as expected, but rather than writing a separate test for each validation rule we can make use of data providers. 

The below example tests creating an article, passing in empty title, description and content then testing there is a validation error that matches the input. 

```php
<?php

namespace Tests\Feature;

use Tests\TestCase;

class CreateArticleTest extends TestCase
{
    /**
    * @dataProvider articleInputs
    */
    public function testCreateArticle($input)
    {
        $response = $this->post(route('articles.store'), [
            $input => ''
        ]);

        $response->assertStatus(422);
        $response->assertSessionHasErrors($input);
    }

    public function articleInputs()
    {
        return [
            ['title'],
            ['description'],
            ['content'],
            ['type']
        ];
    }
}
```

For more information on using data providers, check out [Tidying Up Your PHPUnit Tests with Data Providers](https://tighten.co/blog/tidying-up-your-phpunit-tests-with-data-providers) which explains them in much more detail. 

## Unit Tests instead of Feature Tests

Sometimes it is worth asking youself if it is more effective to test the individual parts of the request instead of the request as a whole.

Laravel offers both feature and unit tests. Feature tests are normally used to test a larger section of code, such as a full request, but unit tests are designed to test smaller, isolated parts of code. Writing smaller unit tests may be a better solution as they will help you understand that each part of the system. 

Unit tests can also help you debug issues easier as it will show you exactly which method caused the error, rather than you having to debug the whole request. 

This is a very simplified example to demonstrate, but we can test a simple method that creates a slug from the article title in the Article model.

First we have to create the accessor method in the Article model, `getSlugAttribute()`.

```php
<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Str;

class Article extends Model
{
    public function getSlugAttribute()
    {
        return Str::slug($this->title, '-');
    }
} 
```

Then we can test this method in isolation, without the need to create an entire post request and all the set up that goes with it. 

```php
<?php 

namespace Test\Unit;

use App\Article;
use Tests\TestCase;

class ArticleTest extends TestCase
{

    public function testCreateSlug()
    {
        $article = factory(Article::class)->make([
            'title' => 'Example Article Title'
        ]);
        
        $this->assertEquals('example-article-title', $article->slug);
    }
}
```

## Making debugging easier

Hopefully these ideas will help you tidy up your tests and make them easier to understand and help you, and other developers working on your app, easily understand what your app should do, as well as encorage you to write more tests in future.

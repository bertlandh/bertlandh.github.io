---
title: Using Pest to test Laravel Livewire validation rules
description: How to use Pest to test a Laravel Livewire component's validation rules
layout: post
date: 2022-08-12 18:00:07
hero_image: /img/testing-livewire-validation.jpg
hero_height: is-large
hero_darken: false
image: /img/testing-livewire-validation.jpg
tags: Testing Livewire Pest
---

Last year I wrote a post about [testing Laravel Livewire validation rules](/2021/05/25/testing-validation-rules-in-a-livewire-component.html) with PHP Unit. This post uses the same techniques as that post, but shows how to transfer it to Pest instead of PHP Unit.

## What is Pest?

If you haven't heard of Pest before then here is a description from the [Pest website](https://pestphp.com/).

> Pest is a Testing Framework with a focus on simplicity. It was carefully crafted to bring the joy of testing to PHP.

Rather than writing standard PHP classes, it allows you to write tests in a more readable way, using `test()` or `it()` to describe the test in a more fluent way. If you have written tests in JavaScript before then this may seem very familiar to you.

## Using Pest with Laravel and Livewire

Pest is a PHP testing framework built on top of PHP Unit and is not framework specific. Instead there are a range of plugins that allow you to use it with different tools and frameworks.

To get started with Laravel we can run the below commands to install Pest and the [Pest plugin for Laravel](https://pestphp.com/docs/plugins/laravel), then use artisan to set up our Laravel project to start using Pest.

```bash
composer require pestphp/pest --dev --with-all-dependencies
composer require pestphp/pest-plugin-laravel --dev
php artisan pest:install
```

For Livewire, we need to install the [Pest plugin for Livewire](https://pestphp.com/docs/plugins/livewire).

```bash
composer require pestphp/pest-plugin-livewire --dev
```

We can then run `./vendor/bin/pest` or `php artisan test` to run our tests.

## Converting the test

Below is the test from the original article ([Testing validation rules in a Livewire component]()).

```php
<?php

namespace Tests\Feature;

use App\Http\Livewire\ProfileForm;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class ProfileValidationTest extends TestCase
{
    use RefreshDatabase;

    /**
    * @test
    * @dataProvider validationRules
    **/
    public function test_validation_rules($field, $value, $rule)
    {
        $user = User::factory()->create();
        $anotherUser = User::factory()->create(['email' => 'duplicate@email.com'])

        Livewire::actingAs($user)
            ->test(ProfileForm::class, ['user' => $user])
            ->set($field, $value)
            ->call('save')
            ->assertHasErrors([$field => $rule]);
    }

    public function validationRules()
    {
        return [
            'name is null' => ['user.name', null, 'required'],
            'name is too long' => ['user.name', str_repeat('*', 201), 'max'],
            'email is null' => ['user.email', null, 'required'],
            'email is invalid' => ['user.email', 'this is not an email', 'email'],
            'email is not unique' => ['user.email', 'duplicate@email.com', 'unique'],
            'bio is null' => ['user.bio', null, 'required'],
            'bio is too short' => ['user.bio', str_repeat('*', 8), 'min'],
            'bio is too long' => ['user.bio', str_repeat('*', 1001), 'max'],
        ];
    }
}
```

To summarise, we create a test that accepts the field to test, the value and the validation rule that we expect to fail. This data is then passed into the test using a data provider, reusing the same test for the multiple datasets.

## Writing a Pest test

The first thing that stands out is that you don't need to create a PHP class, just a PHP file that ends in `Test.php`

As we need a user for the email we need to use the RefreshDatabase trait.

```php
<?php

use Illuminate\Foundation\Testing\RefreshDatabase;

uses(RefreshDatabase::class);
```

Next we need to use the Livewire pest function to test our Livewire component, so let's include that in our use statements, as well as the ProfileForm Livewire component we want to test.

```php
<?php

use App\Http\Livewire\ProfileForm;
use Illuminate\Foundation\Testing\RefreshDatabase;
use function Pest\Livewire\livewire;

uses(RefreshDatabase::class);
```

Now we can start writing our test. We want to test the validation rules on the profile form component.

Rather than using the Livewire facade, we can use the `livewire()` function from the Pest Livewire plugin. We pass in the Livewire component class we want to test, then we can chain on other methods, such as set, call, assertSet, etc. as we would normally.

```php
<?php

// use ...

it('tests the ProfileForm validation rules', function () {
    livewire(ProfileForm::class)
        ->call('save')
        ->assertHasErrors();
})
```

Rather than using a data provider, Pest has a `with()` method to chain on the dataset for your test. This is called an [inline dataset](https://pestphp.com/docs/datasets#inline-datasets).

You can also create reusable, [shared datasets](https://pestphp.com/docs/datasets#shared-datasets) using `dataset('my-dataset', [])` and then call it in the `with('my-dataset')` after the `it()`.

The dataset is an array, but as per the PHP Unit data provider, it's beneficial to set a description for each dataset item so you can easily understand which dataset passes and which may fail.

Now we can put it all together and create the finished test.

```php
<?php

use App\Http\Livewire\ProfileForm;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use function Pest\Livewire\livewire;

uses(RefreshDatabase::class);

it('tests the ProfileForm validation rules', function (string $field, mixed $value, string $rule) {
    $user = User::factory()->create();
    $anotherUser = User::factory()->create(['email' => 'duplicate@email.com']);

    $this->actingAs($user);

    livewire(ProfileForm::class, ['user' => $user])
        ->set($field, $value)
        ->call('save')
        ->assertHasErrors([$field => $rule]);
})->with([
    'name is null' => ['user.name', null, 'required'],
    'name is too long' => ['user.name', str_repeat('*', 201), 'max'],
    'email is null' => ['user.email', null, 'required'],
    'email is invalid' => ['user.email', 'this is not an email', 'email'],
    'email is not unique' => ['user.email', 'duplicate@email.com', 'unique'],
    'bio is null' => ['user.bio', null, 'required'],
    'bio is too short' => ['user.bio', str_repeat('*', 8), 'min'],
    'bio is too long' => ['user.bio', str_repeat('*', 1001), 'max'],
]);
```

## Other Pest features

Have a read through the Pest docs to see the full range of features available. I'm still getting started with using it myself, but one of the really nice features I have found is the ability to run `beforeEach()` so you can do your set up in one method and it will be run [before each](https://pestphp.com/docs/setup-and-teardown#beforeeach) test in the file.

An example of this is creating an admin user for all of the tests that need an admin user. Each test in the file will have access to `$this->adminUser`.

```php
<?php

use App\Models\User;
use function Pest\Laravel\get;

beforeEach(function () {
    $this->adminUser = User::factory()
        ->create(['is_admin' => true]);
});

it('allows an admin to view manage users page', function () {
    actingAs($this->adminUser)
        ->get('/manage-users')
        ->assertOk();
});
```

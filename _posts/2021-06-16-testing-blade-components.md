---
layout: post
title: Testing Laravel Blade Components
description: How to test Laravel Blade Components
date: 2021-06-16 16:00:07
hero_image: /img/testing-blade-components.jpg
hero_height: is-large
hero_darken: false
image: /img/testing-blade-components.jpg
tags: PHP Laravel Testing
---

Recently I built a Laravel package containing Blade Components for use with the Bulma frontend framework, called [Bulma Blade UI](https://github.com/chrisrhymes/bulma-blade-ui). As part of building the package I wanted to ensure that there were tests to ensure that, firstly, the components rendered without errors, and secondly, that the attributes overrode the settings as expected. 

## Testing a Blade Component

Laravel allows you to render your component in a test using `$this->blade()`. It accepts the html/template string you wish to render as the first argument and the parameters as the second argument. You can then create assertions against the response, such as `assertSee()`, `assertDontSee()` or `assertSeeInOrder()`. 

Below is an example for the message component, which tests that the title appears before the content and that the classes `message` and the default type of `is-info`.  

```php
/** @test */
public function it_renders_the_message_component()
{
    $view = $this->blade(
        '<x-bbui::message :title="$title">The message content</x-bbui::message>',
        ['title' => 'The message title']
    );

    $view->assertSeeInOrder(['The message title', 'The message content']);
    $view->assertSee('message is-info');
}
```

If you have a Blade Component with a class you can use `$this->component()` instead of `$this->blade()`, passing in the component class instead of the template as the first argument. 

## Orchestra Testbench

When I wrote the tests in the Laravel package I followed the Orchestra Testbench instructions and extended the `Orchestra\Testbench\TestCase`. When I first ran the tests it triggered the following error `Error : Call to undefined method Tests\Components\MessageTest::blade()`. 

After a bit of research I found I needed to use the `InteractsWithViews` trait in my test. As the majority of tests in the package were component tests I decided to use this in the test case so that all of the other tests that extend the TestCase class had access to it too. This is shown below.

```php
<?php

namespace Tests;

use BulmaBladeUi\BulmaBladeUiServiceProvider;
use Illuminate\Foundation\Testing\Concerns\InteractsWithViews;
use Orchestra\Testbench\TestCase as Orchestra;

class TestCase extends Orchestra
{
    use InteractsWithViews;

    protected function getPackageProviders($app)
    {
        return [
            BulmaBladeUiServiceProvider::class,
        ];
    }
}
```

## Testing an input with errors

Laravel also offers the `$this->withViewErrors()` method that allows you to pass in an array of errors to your component so you can test that the error message is displayed. 

The below example tests an input component, passing in an error for the input with the name 'test'. It ensures that the error message is displayed and that the classes `help` and `is-danger` are set. These classes are Bulma classes that are used to display error messages with red text.

```php
/** @test */
public function input_component_renders_error_message()
{
    $view = $this->withViewErrors(['test' => 'The test field is required'])
        ->blade(
            '<x-bbui::input :label="$label" :name="$name"></x-bbui::input>',
            ['label' => 'The Input Label', 'name' => 'test']
        );

    $view->assertSee('The test field is required');
    $view->assertSee('class="help is-danger"', false);
}
```

## A Trait for Input Tests

When I was writing a test for the input component I wanted to test the following:

* It can be rendered
* The id and for are generated and rendered correctly
* The error message is rendered when there is an error
* It won't render without the label
* The required attribute is rendered when set
* The wire model is rendered when set

I wrote these tests for the input and then moved onto the textarea component tests. I soon realised that most of the components need the same tests so I extracted the tests into a [trait](https://github.com/chrisrhymes/bulma-blade-ui/blob/master/tests/Components/BaseInputComponentTests.php) and the component tests could all use this trait, saving me lots of time and increasing consistency. 

I updated the template string in the trait's tests to use `$this->component` in the opening and closing tags. I just had to ensure that I set the component property in the test classes that used this trait. 

```php
<?php

namespace Tests\Components;

use Tests\TestCase;

class InputTest extends TestCase
{
    use BaseInputComponentTests;

    protected $component = 'input';
}
```
If I need to add tests specific to a component, they can be added to the component's test class. 

If you want to see more examples of the tests then these are available in the [Bulma Blade UI GitHub repo](https://github.com/chrisrhymes/bulma-blade-ui).

<a href="https://stocksnap.io/photo/city-sunset-0VHJUGBJDP">Photo</a> by <a href="https://stocksnap.io/author/candacemcdaniel">Candace McDaniel</a> on <a href="https://stocksnap.io">StockSnap</a>
---
layout: post
title: Testing validation rules in a Laravel Livewire component
description: How to test validation rules in a Laravel Livewire component using a Data Provider
date: 2021-05-25 19:00:07
hero_image: /img/testing-livewire-validation.jpg
hero_height: is-large
hero_darken: false
image: /img/testing-livewire-validation.jpg
tags: PHP Laravel Livewire Validation
---

Testing validation rules can become quite tiresome pretty quickly if you have to write each test manually. Luckily I've found a nice method that allows you to simplify your validation rule tests when using Laravel Livewire components. For this example we have a form that allows a user to update their profile information with a Livewire ProfileForm component.

In Livewire you can define validation rules by setting a rules array (shown below) and then validate using `$this->validate()`. In this example we are [binding to a User model](https://laravel-livewire.com/docs/2.x/properties#binding-models) that has a name, email and bio.  

```php
protected $rules = [
    'user.name' => 'required|max:200',
];
```

In our example we need to do something a bit more complicated so instead of using the rules array we are going to create a rules function instead, allowing us to use the `Illuminate\Validation\Rule::class`. Here are the rules we have set and the save() method that will validate the input.

```php
// App\Http\Livewire\ProfileForm.php

use Illuminate\Validation\Rule;

protected function rules() 
{
    return [
        'user.id' => 'required',
        'user.name' => 'required|max:200',
        'user.email' => ['required', 'email', Rule::unique('users')->ignore($this->user->id)],
        'user.bio' => 'required|min:20|max:1000',
    ];
}

public function save()
{
    $this->validate();

    // Save the user data
    $this->user->save();
}
```

So how can we go about testing each of these rules? There are 8 different validation rules in this simple example, but you don't want to have to write 8 separate tests for each rule. Instead, we can make use of a data provider to pass the data to be tested into the test, along with the expected validation rule. 

## Creating the data provider

A data provider is essentially a method that returns an array. What we want to do is return the field to be tested, the example data to be tested and the validation rule that should be triggered. Here is an example for testing the user's name is required. 

```php
public function validationRules()
{
    return [
        ['user.name', null, 'required'],
    ];
}
```

We can also set the array key to make the output a bit clearer as to what dataset has failed. This little bit of extra work can save you headaches trying to narrow down which test has failed, rather than counting through the different datasets. 

```php
public function validationRules()
{
    return [
        'name is null' => ['user.name', null, 'required'],
    ];
}
```

## Using the data provider

To use the data provider you need to specify it in the doc block for your test `@dataProvider validationRules`. You can then set the method parameters to match the data you are passing in from the data provider. In our case we are passing in the field, the value and the rule. 

```php
/**
* @test
* @dataProvider validationRules
**/
public function test_validation_rules($field, $value, $rule)
{
}
```

## Testing the Livewire validation rules

Now we are ready to test the validation rules in the Livewire component. Livewire allows you to test a component by specifying the component class, including acting as a specific user, and you can then set values and call methods before making your assertions. 

Here is the overview of how the test will work:

* Act as a specified user
* Test our ProfileForm component, setting the user as the specified user
* Set the field and the value passed in through the data provider
* Call the save method
* Assert that an error is triggered, but more specifically, the field has the expected validation rule error

```php
Livewire::actingAs($user)
    ->test(ProfileForm::class, ['user' => $user])
    ->set($field, $value)
    ->call('save')
    ->assertHasErrors([$field => $rule]);
```

Finally we can put it all together and create our test and our data provider. There is a second user in the test so we can also test the unique validation rule. 

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

Hopefully this method will help you effectively test your validation rules on your Laravel Livewire components. 

<a href="https://stocksnap.io/photo/overhead-citylights-6FOTSJ06WB">Photo</a> by <a href="https://stocksnap.io/author/burstshopify">Burst</a> on <a href="https://stocksnap.io">StockSnap</a>
---
layout: post
title: Testing Laravel Validation Responses
description: How to test Laravel validation rules to help you debug your application easier
date: 2020-04-10 20:00:07
hero_image: /img/testing-laravel-validation.jpg
hero_height: is-large
image: /img/testing-laravel-validation.jpg
tags: laravel testing php 
---

Last week I was working on a project that used the `requiredIf` validation rule. No matter how many times I write tests, I always end up referring to the Laravel testing docs to make sure I use the correct assertion methods and pass in the correct arguments. This post will go through a couple of the validation testing methods I use to test validation rules and how they can be improved to help me debug issues. 

## The Scenario

For this post I'm going to use a scenario of a recipe site where users can log a change request. What information the user needs to complete depends on the type of change request the user logs. If they want to change the ingredients they need to complete a list of ingredients. If they want to change the summary then the user needs to provide the new summary. 

Here are the validation rules in the form request for storing a new change request.

```php
public function rules()
{
	return [
		'recipe_id' => 'required|integer|exists:recipes,id',
		'change_type' => 'required|in:ingredients,summary',
		'ingredients' => 'nullable|requiredIf:change_type,ingredients|array',
		'ingredients.*' => 'required',
		'summary' => 'nullable|requiredIf:change_type,summary'
	]
}
```

## AssertSessionHasNoErrors
If you are writing a feature test then you can write a test to ensure that everything works as expected and no validation errors are returned, testing the response with asserting the session has no errors. 

```php
public function test_can_create_ingredients_change_requests()
{
	$response = $this->post(route('change-request.store'), [
		'recipe_id' => 1,
		'change_type' => 'ingredients',
		'ingredients' => [
			'Flour',
			'Eggs',
			'Milk'
		]
	]);
	$response->assertSessionHasNoErrors();
}
```

This is a simple assertion but it proves that no validation errors are returned when trying to create an ingredients change type. To test more fully you will want to test that it also works as expected for a summary type change request. 

```php
public function test_can_create_summary_change_requests()
{
	$response = $this->post(route('change-request.store'), [
		'recipe_id' => 1,
		'change_type' => 'summary',
		'summary' => 'This recipe uses basic ingredients but packs a fantastic flavour!'
	]);
	$response->assertSessionHasNoErrors();
}
```

## Updating the Validation Rules

If we make a change to the validation rules by adding a maximum length to the summary text of 60 characters the second test will now fail. Here is our updated rule. 

```php
'summary' => 'nullable|requiredIf:change_type,summary|max:60'
```

The failed test has a helpful error message telling us exactly why it failed. 

```
Session has unexpected errors: 
[
    "The summary may not be greater than 60 characters."
]
Failed asserting that true is false.
```

We can add a little more to our tests to make the tests more specific if we want to test for exact failures. 

## AssertSessionDoesntHaveErrors

If you were to read the two methods of `assertSessionHasNoErrors` and `assertSessionDoesntHaveErrors` in a test then you might assume they are interchangeable as they sound very similar. The big difference is that you can pass arguments into `assertSessionDoesentHaveErrors` to be more specific with your test. 

The Laravel docs provides the following guide for this assertion method.

```php
$response->assertSessionDoesntHaveErrors($keys = [], $format = null, $errorBag = 'default');
```

If I'm honest, it takes me a little while to remember what the arguments mean. If you create custom error bags you can change the `$errorBag` from default to your own error bag and the `$keys` is an array of fields you want to test. I don't think I have ever set `$format` to anything other than the default value of null. If you have modified the format please feel free to add to the comments explaining when you would do this. 

We can now pass in the keys we want to ensure don't have errors in our test. If one of these does have an error then the message will state which of these keys does have an error. 

```php
public function test_can_create_summary_change_requests()
{
	$response = $this->post(route('change-request.store'), [
		'recipe_id' => 1,
		'change_type' => 'summary',
		'summary' => 'This recipe uses basic ingredients but packs a fantastic flavour!'
	]);
	$response->assertSessionDoesntHaveErrors([
		'recipe_id',
		'change_type',
		'summary'
	]);
	$response->assertSessionHasNoErrors();
}
```

The `assertSessionHasNoErrors` can still be useful as a secondary assertion, just to double check that there aren't any other validation errors being returned. 

## AssertSessionHasErrors

We can also test the opposite to the previous tests. Rather than testing that everything works, we can test that the validation rules will return a validation failure when we expect them to. These work better as more granular unit tests instead of feature tests.

To test a validation error is returned we can use `assertSessionHasErrors`. 

```php
$response->assertSessionHasErrors(array $keys, $format = null, $errorBag = 'default');
```

We can use this method to ensure that the summary field returns validation errors to prove it is required and that it is under 60 characters.

```php
public function test_summary_is_required_when_summary_change_type()
{
	$response = $this->post(route('change-request.store'), [
		'recipe_id' => 1,
		'change_type' => 'summary',
		'summary' => null
	]);
	$response->assertSessionHasErrors(['summary']);
}

public function test_summary_is_shorter_than_60_characters()
{
	$response = $this->post(route('change-request.store'), [
		'recipe_id' => 1,
		'change_type' => 'summary',
		'summary' => 'This recipe uses basic ingredients but packs a fantastic flavour!'
	]);
	$response->assertSessionHasErrors(['summary']);
}
```

This is a good start as each test will prove that there are validation errors for each scenario, but it doesn't actually test that the request is definitely hitting the validation rule we want to test. It could in some cases, be hitting a different validation rule for the summary and still failing. 

To test more specifically we can add the message we expect to be returned is returned to the $keys array. 

```php
public function test_summary_is_required_when_summary_change_type()
{
	$response = $this->post(route('change-request.store'), [
		'recipe_id' => 1,
		'change_type' => 'summary',
		'summary' => null
	]);
	$response->assertSessionHasErrors([
		'summary' => 'The summary field is required when change type is summary.'
	]);
}

public function test_summary_is_shorter_than_60_characters()
{
	$response = $this->post(route('change-request.store'), [
		'recipe_id' => 1,
		'change_type' => 'summary',
		'summary' => 'This recipe uses basic ingredients but packs a fantastic flavour!'
	]);
	$response->assertSessionHasErrors([
		'summary' => 'The summary may not be greater than 60 characters.'
	]);
}
```

There is a list of the default validation messages in a language file in the `resources/lang/en/validation.php` file in a Laravel project and can also be viewed in the Laravel/Laravel repo on [GitHub](https://github.com/laravel/laravel/blob/master/resources/lang/en/validation.php) which you can use to help write your tests. 

## In Conclusion

Hopefully this will give you an idea of where to get started with testing validation rules, as well as helping you get some more granular error messages from your tests to help make it easier to debug your code. 

If you want to read more about Laravel testing, please consider reading about [using Factories and Factory States](/2019/07/04/getting-started-with-laravel-factories.html) and [techniques to clean up your tests](/2020/01/15/keeping-tests-simple.html). 



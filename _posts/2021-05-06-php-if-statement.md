---
layout: post
title: The PHP if statement
subtitle: PHP Fundamentals
description: An introduction to the PHP if statement
date: 2021-05-06 19:00:07
hero_image: /img/php-if.jpg
hero_height: is-large
hero_darken: false
image: /img/php-if.jpg
tags: PHP Code Beginner
series: php_fundamentals_series
---

This is the first of a series of posts I will write that go back to basics and introduce the fundamentals of PHP. In this article I'm going to start with the PHP if statement. 

The if statement is pretty simple right. If this then do that, else do something else. Sorted? There is a bit more to it than that...

The purpose of an if statement is to have a condition, or test, and if that passes then run the code within that section. If it doesn't pass then that code doesn't get run. You can also specify an else, which will run if the condition or test fails. It is very simple in principle but is a very powerful tool.

There is actually a bit more to consider about the humble if statement in PHP. Let's start with the syntax. 

## Syntax

There are a few different ways you can write an if statement in PHP and end up with the same result. Below provides a few different ways you might see if statements in PHP.

### With Curly Brackets

This example uses brackets to help split up the sections of the if statement. If you have an IDE or a good text editor you can normally click on the opening bracket and it will highlight the opening and closing bracket so you can see where each section starts and ends.

```php
$myVar = true;

if ($myVar === true) {
    echo "It is true";
} else {
    echo "It is false";
}
```

### With Colons

Sometimes it's easier not to use curly brackets and use colons instead. If you are not using a templating tool (such as Blade or Twig) and you have a mix of PHP and html in your file then this may be preferred option for you. I have seen this approach used quite often when working with WordPress. 

```php
<?php
if ($myVar === true): ?>
    <p>It is true</p>
<?php else: ?>
    <p>It is false</p>
<?php endif; ?>
```

### Ternary Statement

Sometimes you may want to use an easier, more shorthand approach when you have a simple condition. In this case, you can use a ternary statement. The first part is the condition, followed by what should happen if the condition passes (after the `?`), and lastly what happens if the condition fails (after the `:`). 

```php
$myVar = true;
echo $myVar ? "It is true" : "It is false";
```

It is also possible to remove the "It is true" section of the ternary statement if you want to use the value in the condition and that condition returns true. For example:

```php
$myVar = "It is true";
echo $myVar ?: "It is false"; // It is true

$myVar = false;
echo $myVar ?: "It is false"; // It is false
```

### Without Brackets or Colon

If you really want, you don't actually have to write the brackets or the colons. It will run the code on the line directly after the if statement if the condition passes. Personally, I would avoid using this approach as it can be harder to read and process what is happening.

```php
$myVar = true; 

if ($myVar === true)
    echo "It is true";

if ($myVar !== true)
    echo "It is false";
```

## Else If

You may have spotted a potential issue with the above examples. We have assumed that if `$myVar` is not true, then it must be false, echoing out "It is false". But this may not be the case, it could be `null` or it could be a string, an integer, etc. 

If we want to make sure that `$myVar` is actually false before echoing out "It is false" then we can use an else if to add another condition check. 

```php
$myVar = true;

if ($myVar === true) {
    echo "It is true";
} elseif ($myVar === false) {
    echo "It is false";
}
```

You can also add a further else onto the end to catch the cases that don't fit into the if or else if conditionals.

```php
$myVar = true;

if ($myVar === true) {
    echo "It is true";
} elseif ($myVar === false) {
    echo "It is false";
} else {
    echo "It is neither true or false";
}
```

You can add multiple elseif statements if you want to, but then you may want to use an alternative, such as switch statement, instead.

### ElseIf or Else If

When using curly brackets you can use `elseif` or `else if` and they both do the same thing. But if you are using colons then you can only use `elseif`, as `else if` will trigger a parse error in PHP.

## Null Coalesing Operator

In PHP7 there was the introduction of the null coalesing operator `??`. Although this is not specifically an if statement, it is useful to test if the first item is null. If it isn't null, then the condition is used, otherwise it will use the second item (after the `??`). 

```php
$myVar = 'This is a string';
echo $myVar ?? "It is null"; // This is a string

$myVar = null;
echo $myVar ?? "It is null"; // It is null

// The equivalent of this ternary statement
echo isset($myVar) ? $myVar : "It is null";
```

## In summary

Hopefully this will give you a bit more background into the PHP if statement and what is possible. There are different options available to you so think about which suits your needs for your situation. 

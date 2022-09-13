---
layout: post
title: The PHP switch statement
subtitle: PHP Fundamentals
description: An introduction to the PHP switch statement
date: 2021-05-15 09:00:07
hero_image: /img/php-switch.jpg
hero_height: is-large
hero_darken: false
image: /img/php-switch.jpg
tags: PHP Code Beginner
series: php_fundamentals_series
---

In the previous article we discussed the if statement, where it said you can have many different elseif statements if you wanted to handle many different scenarios, but it gets to a point where you should consider swapping to a switch statement. 

```php
$myVar = 'green';

if ($myVar === 'red') {
    echo 'It is red';
} elseif ($myVar === 'blue') {
    echo 'It is blue';
} elseif ($myVar === 'green') {
    echo 'It is green';
}
```

This can be rewritten using a switch statement. Each condition you want to match has a case where you pass in the variable you want to match. Within the case, you put the code you want to run if the condition matches. Then you need to add a break, otherwise the code will continue to check for matches in the rest of the switch statement. 

```php
$myVar = 'green';

switch ($myVar) {
    case 'red':
        echo 'It is red';
        break;
    case 'blue':
        echo 'It is blue';
        break;
    case 'green':
        echo 'It is green';
        break;
}
```

## Default case

A very useful feature of the switch statement is allowing a default if none of the other cases match. Sometimes you don't know what the variable will be and it allows you to catch this edge case. You could even use it to throw an exception to deliberately stop any further code running.

```php
$myVar = 'orange';

switch ($myVar) {
    case 'red':
        echo 'It is red';
        break;
    case 'blue':
        echo 'It is blue';
        break;
    case 'green':
        echo 'It is green';
        break;
    default:
        throw new Exception('It is not a matching colour');
}

// Fatal error: Uncaught Exception: It is not a matching colour
```

## Multiple case matching

Sometimes you want to do the same thing for multiple matching cases. If you were to use an if statement you would need to either repeat the code multiple times or use an or (`||`) in your condition.

```php
$myVar = 'green';

if ($myVar === 'red' || $myVar === 'green') {
    echo 'It is red or green';
}
```

In a switch statement you can do this easily by listing multiple cases one after the other, then adding your code to run with a break after;

```php
$myVar = 'green';

switch ($myVar) {
    case 'red':
    case 'green':
        echo 'It is red or green';
        break;
    case 'blue':
        echo 'It is blue';
        break;
}
```

## Returning from a switch case

Sometimes you don't need a break in a switch statement. This is when you directly return from the switch statement. The example below has a switch statement in a function, returning the result from the matching case.

```php
function findTheColour($colour)
{
    switch ($colour) {
        case 'red':
            return 'It is red';
        case 'blue':
            return 'It is blue';
        case 'green':
            return 'It is green';
        default:
            return 'It does not match';
    }
}

echo findTheColour('green'); // It is green
```

I know that some developers (such as me) think it looks strange not having the breaks in a switch statement as it's nice to break up the code. 

## Alternative syntax

As with an if statement, you can also use colons instead of brackets and end the switch with endswitch.

```php
switch ($myVar):
    case 'red':
        echo 'It is red';
        break;
    case 'blue':
        echo 'It is blue';
        break;
    case 'green':
        echo 'It is green';
        break;
endswitch;
```

You can also use semicolons instead of colons after the case if you wanted to.

```php
case 'red';
```

## Using an Array instead

Some people don't like using switch statements as they can seem a bit verbose. There is a potential alternative using an array to provide the options if it is a simple scenario.

```php
$colours = [
    'red' => 'It is red',
    'green' => 'It is green',
    'blue' => 'It is blue',
];

$myVar = 'green';

echo $colours[$myVar]; //It is green
```

The above will work fine for red, green or blue, but if it is an unknown colour, such as orange, then you will end up with an undefined index error. 

You could use a null coalescing operator (PHP 7.0 onwards) to catch this error and return a default response.

```php
echo $colours[$myVar] ?? 'It does not match';
```

## Match

PHP 8.0 has introduced the match statement. It offers shorter syntax and it returns a value. There is a great article about the differences between match and switch on  [stitcher.io](https://stitcher.io/blog/php-8-match-or-switch) by Brent. 
---
layout: post
title: The PHP array
subtitle: PHP Fundamentals
description: What is a PHP array and how to use it, add values and remove values
date: 2021-07-03 12:00:07
hero_image: /img/array.jpg
hero_height: is-large
hero_darken: false
image: /img/array.jpg
tags: PHP Beginner Code
series: php_fundamentals_series
---

Arrays are a useful toolt to store multiple values. You can access a specific value in an array using a key. By default, if you don't specify keys, they will be numeric and start at zero (not one);

```php
$myArray = ['Red', 'Blue', 'Green'];

echo $myArray[0]; // Red
echo $myArray[1]; // Blue
echo $myArray[2]; // Green
```

If you try and use an array key that doesn't exist then you will get a PHP notice.

```php
echo $myArray[3]; // Notice: Undefined offset: 3
```

## Alternative syntax

The short way of defining an array is using square brackets, but it's useful to know the other syntax too, with the word `array` and brackets. 

```php
$myArray = array('Red', 'Blue', 'Green');
```

## Add a new value to an array

You can add a new value to an array using empty square brackets, which will add the new value to the end of the array.

```php
$myArray = ['Red', 'Blue', 'Green'];

$myArray[] = 'Yellow';

var_dump($myArray);
// array(4) { [0]=> string(3) "Red" [1]=> string(4) "Blue" [2]=> string(5) "Green" [3]=> string(6) "Yellow" }
```

## Removing a value from an array

You can remove an item from an array using `unset()`.

```php
$myArray = ['Red', 'Blue', 'Green', 'Yellow'];

unset($myArray[3]);

var_dump($myArray); 
// array(3) { [0]=> string(3) "Red" [1]=> string(4) "Blue" [2]=> string(5) "Green" }
```

You can also use array_splice() to remove an item from an array. This takes the array as the first argument, the offset or where to start, and the length or how many items you want to remove. 

```php
$myArray = ['Red', 'Blue', 'Green', 'Yellow'];

array_splice($myArray, 3, 1);

var_dump($myArray); 
// array(3) { [0]=> string(3) "Red" [1]=> string(4) "Blue" [2]=> string(5) "Green" }
```

You can also specify a forth argument with array_splice() to add a replacement value to the array at the same time as removing values.

```php
$myArray = ['Red', 'Blue', 'Green', 'Yellow'];

array_splice($myArray, 3, 1, 'Purple');

var_dump($myArray); 
// array(4) { [0]=> string(3) "Red" [1]=> string(4) "Blue" [2]=> string(5) "Green" [3]=> string(6) "Purple" }
```

## Specifying keys

You can specify the keys if you want to, using the format `['key' => 'value']`, defining this `key` has this `value`. 

```php
$myArray = [
    'red' => 'Red', 
    'blue' => 'Blue', 
    'green' => 'Green',
];

echo $myArray['red']; // Red
```

## Multi-dimensional array

You can also have a multi-dimensional array, an array that contains an array. You can access values using the keys, one after the other, such as `$myArray['top-level-key']['next-level-key']`.

```php
$myArray = [
    'red' => [
        'label' => 'Red',
        'hexcode' => '#FF0000',
    ],
    'blue' => [
        'label' => 'Blue',
        'hexcode' => '#0000FF',
    ],
    'green' => [
        'label' => 'Green',
        'hexcode' => '#00FF00',
    ]
];

echo $myArray['red']['label']; // Red
echo $myArray['red']['hexcode']; // #FF0000
```

## Looping over an array

One thing that is very useful with an array is the ability to iterate or loop over it. If we use the same example as above we can use a foreach loop to do this. 

```php
foreach ($myArray as $colour) {
    echo "<p>{$colour['label']}: {$colour['hexcode']}</p>";
}

// Red: #FF0000
// Blue: #0000FF
// Green: #00FF00
```

## Array functions

There are many built in functions for PHP arrays so if you are using an array in your code you can probably find a function that will do what you need, or even combine multiple functions to achieve what you need. 

For more information on PHP functions, you can check out the [array functions PHP documentation](https://www.php.net/manual/en/ref.array.php). 
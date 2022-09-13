---
layout: post
title: The PHP foreach loop
subtitle: PHP Fundamentals
description: What is the PHP foreach loop and how to use it
date: 2021-10-09 11:00:07
hero_image: /img/foreach-loop.jpg
hero_height: is-large
hero_darken: false
image: /img/foreach-loop.jpg
tags: PHP Beginner Code
series: php_fundamentals_series
---

An alternative to the for loop, the foreach loop is used to iterate or loop over an array. The foreach loop allows you to loop through the items in the array without setting a limit for it to stop like you do in a for loop. 

Once the foreach loop has looped through every item it will finish. If there are ten items in the array, then it will loop ten times. 

## Basic Foreach Loop

The foreach loop accepts an array as the first argument and then you give a name for the individual array item. 

* In the example below we are passing in `$trees` (the array) as the first argument.
* We setting the individual array item with `as $tree` that can be used within the foreach loop. 
* If you don't set both arguments then you will get a syntax error. 
* If the first argument isn't an array then you get an invalid argument warning. 

```php
$trees = ['oak', 'ash', 'birch', 'maple'];

foreach ($trees as $tree) {
    echo $tree . ' ';
}

// oak ash birch maple
```

## Breaking out of a foreach loop

If you want to, you can break out of a foreach loop rather than looping through every item in the array by using the `break` keyword. In the following example we check if the `$tree` is equal to `ash` then break the loop.

```php
$trees = ['oak', 'ash', 'birch', 'maple'];

foreach ($trees as $tree) {
    echo $tree . ' ';

    if ($tree === 'ash') {
        break;
    }
}

// oak ash
```

## Using the index in the Foreach loop

You can also use the index in the foreach loop. Here we have an array with the tree names as the key and a count as the value. The first argument is the array, then after the as you have a syntax that looks similar to the array syntax, `as $key => $value` where the first variable is the array key and the second is the array value. 

```php
$trees = [
    'oak' => 4, 
    'ash' => 3, 
    'birch' => 8, 
    'maple' => 6,
];

foreach ($trees as $tree => $count) {
    echo "There are $count $tree trees";
    echo '</br>';
}

// There are 4 oak trees
// There are 3 ash trees
// There are 8 birch trees
// There are 6 maple trees
```

## Modifying the original value

If you want to modify the values in an array you can use a foreach loop to do this by putting the `&` before the second argument. In this example we add 1 to each of the original values in the array. 

```php
$myValues = [1, 2, 3, 4];

foreach ($myValues as &$myValue) {
    $myValue = $myValue + 1;
}

print_r($myValues);

// Array ( [0] => 2 [1] => 3 [2] => 4 [3] => 5 )
```

There are also other PHP array methods that can be considered for such a use case instead of foreach, such as [array_map()](https://www.php.net/manual/en/function.array-map.php) and [array_walk()](https://www.php.net/manual/en/function.array-walk.php)

## Foreach loop with an array of objects

So far we have talked about an array, but what about an array of objects? 

Here we have a `Tree` class or object that has `name` and `count` properties. The constructor sets these properties when a `new Tree()` class is created. 

```php
class Tree
{
    public $name;
    public $count;

    public function __construct($name, $count)
    {
        $this->name = $name;
        $this->count = $count;
    }
}
```

Next we can create an array of these Tree classes and then loop over the array. Rather than having to use the index within the foreach loop, the tree name we can access the Tree's properties (`count` and `name`) using the arrow syntax, such as `$tree->count`.

```php
$trees = [
    new Tree('oak', 4),
    new Tree('ash', 3)
];

foreach ($trees as $tree) {
    echo "There are $tree->count $tree->name trees";
    echo '<br>';
}
```

There are lots of use cases for a foreach loop so hopefully this introduction will give you ideas to put the foreach loop to use in your code.
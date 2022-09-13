---
layout: post
title: The PHP for loop
subtitle: PHP Fundamentals
description: What is the PHP for loop and how to use it
date: 2021-09-13 19:00:07
hero_image: /img/for-loop.jpg
hero_height: is-large
hero_darken: false
image: /img/for-loop.jpg
tags: PHP Beginner Code
series: php_fundamentals_series
---

If you have something you want to repeat then consider using a PHP for loop, saving you from copying and pasting the same code multiple times. Adding the code into a loop means you only have to write it once, and you also only have to maintain the code in one place in future.

The PHP for loop allows you to loop a defined number of times, until a defined condition is no longer true. 

```php
for ($i = 0; $i < 10; $i++) {
    echo $i;
}

// 0123456789
```

This is what is happening:
* Define a variable `$i` as zero `$i = 0;`
* Keep looping if the variable $i is less than 10 `$i < 10;`
* Each loop, add 1 to `$i` (increment) `$i++;`
* If `$i` is no longer less than 10, then stop the loop and don't add 1 to `$i`

## Breaking a for loop

You can also break out of a for loop using the `break` keyword. In the example below, if the variable `$i` is equal to 5 then it will break out of the loop, ignoring the `$i < 10;` that we set previously in the loop definition.

```php
for ($i = 0; $i < 10; $i++) {
    echo $i;

    if ($i === 5) {
        break;
    }
}

// 012345
```

## Without any expressions

If you really wanted to you can leave the expressions empty in the for loop and define the variable before the loop, define the break inside the loop and increment the variable inside the loop as well. 

```php
$i = 0;

for (; ; ) {
    if ($i === 5) {
        break;
    }

    echo $i;
    $i ++;
}

// 01234
```

I honestly can't think of a reason why you would do this though, except maybe if you don't like your work colleagues very much...

## Looping through an array

You can loop through an existing array using a for loop if we wanted to, using `$i` as the array key. The for loop variable needs to be initially defined as zero as array keys begin at zero `$i = 0;`. We can then use php's `count()` function to count the length of the array. 

```php
$trees = ['oak', 'ash', 'birch', 'maple'];

for ($i = 0; $i < count($trees); $i++) {
    echo $trees[$i] . ' ';
}

// oak ash birch maple
```

The downside to this code is that the `count($trees)` runs before each loop to check if the condition is still true. Instead, we can calculate the length of the array once and then pass that into the for loop.  

```php
$trees = ['oak', 'ash', 'birch', 'maple'];
$treesCount = count($trees);

for ($i = 0; $i < $treesCount; $i++) {
    echo $trees[$i] . ' ';
}

// oak ash birch maple
```

Also consider using a foreach loop for looping through an array as this will loop over the length of the array without calculating the length. 

## Avoid using $i

Many examples use `$i` as a variable in for loops, such as the php.net docs (also this article, oops), but try and use a more descriptive name as it will help you out when reading your code at a later date, and more importantly, if you have a for loop inside another for loop then you could end up overwriting the original `$i` variable, causing an infinite loop. 

```php
// Don't do this
for ($i = 1; $i <= 10; $i++) {
    echo $i;

    // Some more code here

    for ($i = 0; $i <= 10; $i ++) {
        echo $i;
    }
}

// 1012345701234570123457012345701234570123457012345701234570123457012345701234570123457012345 etc, etc,
```

Instead, use descriptive variable names for you loop so you can better distinguish each variable in each loop. In this example we have 5 trees and each tree has 10 leaves. Don't worry about the `<br />` tag, that is just for formatting. 

```php
for ($trees = 1; $trees <= 5; $trees++) {
    echo 'Tree ' . $trees . ' has leaves '; 

    for ($leaves = 1; $leaves <= 10; $leaves ++) {
        echo $leaves . ', ';
    }

    echo '<br />';
}

// Tree 1 has leaves 1, 2, 3, 4, 5, 6, 7, 8, 9, 10,
// Tree 2 has leaves 1, 2, 3, 4, 5, 6, 7, 8, 9, 10,
// Tree 3 has leaves 1, 2, 3, 4, 5, 6, 7, 8, 9, 10,
// Tree 4 has leaves 1, 2, 3, 4, 5, 6, 7, 8, 9, 10,
// Tree 5 has leaves 1, 2, 3, 4, 5, 6, 7, 8, 9, 10,
```

For loops are very powerful tools, allowing you to save time and write cleaner and more maintainable code. Hopefully this introduction will get you thinking about how you could benefit from using them in future.
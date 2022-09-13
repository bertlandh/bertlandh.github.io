---
layout: post
title: Using the HTTP Client and Data Transfer Objects in Laravel 7
description: An introduction to using the HTTP client and Data Transfer Objects in Laravel 7
date: 2020-06-28 10:00:07
hero_image: /img/data-transfer-object.jpg
hero_height: is-large
hero_darken: false
image: /img/data-transfer-object.jpg
tags: laravel http guzzle
---

Recently I have been working on a project retrieving some data from an API in a Laravel project. I was using Laravel to retrieve and display data from a Moodle installation and started using the HTTP Client in Laravel 7 and wondered if I could convert the retrieved data from an array into a more predictable object. I asked my colleagues and one of them recommended I take a look at the Spatie package called data transfer object. 

To help explain the benefits of the data transfer object package I'm going to use a simpler explanation than delving into the Moodle web service. After a quick Google search I found the [JSONPlaceholder api](https://jsonplaceholder.typicode.com/) that we can use. 

## Laravel HTTP Client

Laravel 7 comes with the Http Client which allows you to easily request data. We can send a get request using the Http facade like this, using the `->json()` method on the end to return the json.

```php
use Illuminate\Support\Facades\Http;

$users = Http::get('https://jsonplaceholder.typicode.com/users')
    ->json();
dd($users);
```

If you want to use the same base uri for all our requests then we can make use of the withOptions and set it once in a constructor and then only have to set the path after the base uri. This helps clean our code up a little bit and make it more obvious what the request is doing.

```php
<?php

namespace App\Http\Controllers;

use Illuminate\Support\Facades\Http;

class ExampleController extends Controller
{
    private $http;

    public function __construct()
    {
        $this->http = Http::withOptions([
            'base_uri' => 'https://jsonplaceholder.typicode.com/'
        ]);
    }

    public function index()
    {
        $users = $this->http->get('users')
            ->json();
        dd($users);
    }
}
```

This is also really useful if you need to send an authorization bearer token with each request in your class.

```php
public function __construct()
{
    $this->http = Http::withOptions([
        'base_uri' => 'https://jsonplaceholder.typicode.com/'
    ])->withToken('my-token');
}
```

### Data Transfer Object

Now we have an array of users, we can look at how we can add some types to it. Lets install the [Data Transfer Object](https://github.com/spatie/data-transfer-object) package.

```
composer require spatie/data-transfer-object
```

Here is an extract of a user returned from the /users endpoint for reference. 

```json
{
    "id": 1,
    "name": "Leanne Graham",
    "username": "Bret",
    "email": "Sincere@april.biz",
    "address": {
        "street": "Kulas Light",
        "suite": "Apt. 556",
        "city": "Gwenborough",
        "zipcode": "92998-3874",
        "geo": {
            "lat": "-37.3159",
            "lng": "81.1496"
        }
    },
    "phone": "1-770-736-8031 x56442",
    "website": "hildegard.org",
    "company": {
        "name": "Romaguera-Crona",
        "catchPhrase": "Multi-layered client-server neural-net",
        "bs": "harness real-time e-markets"
    }
}
```

We can create a class to map this data into. You can store them wherever you want but in this example I'm going to create a class called User in the app/Objects directory. The class needs to extend `Spatie\DataTransferObject\DataTransferObject`. We need to look at each property and then define what type of data it is. 

```php
<?php

namespace App\Objects;

use Spatie\DataTransferObject\DataTransferObject;

class User extends DataTransferObject
{
    /** @var integer */
    public $id;

    /** @var string */
    public $name;

    /** @var string */
    public $username;

    /** @var string */
    public $email;
    
    /** @var array **/
    public $address;

    /** @var string */
    public $phone;
    
    /** @var string */
    public $website;
    
    /** @var array **/
    public $company;
}
```

We can now map a user into this object. 

```php
$users = $this->http->get('users')
            ->json();
$user = new \App\Objects\User($users[0]);
```

This package does a few really helpful things for us. 

* If the data returned isn't the correct type it will return an exception. For example, if the id is null instead of an integer. 
* If there are properties you are expecting, such as username, that aren't in the json it will throw an exception. 
* If there are additional properties that are returned that are not in your object then that will also throw an exception.

This helps you ensure the data you expect is being returned. It's probably best having an exception thrown at this point as its before you try and use the data in your application. Unpredictable data can cause all kinds of issues in an application, from not being displayed in a view, to causing serious application errors. 

## Objects with their own Data Transfer Objects

We could leave the User object as it is, but we can make it even more specific by creating an Object class for Address and Company instead of leaving them as an array.

Here is the Address object class. The address also has another object of Geo. 

```php
<?php

namespace App\Objects;

use Spatie\DataTransferObject\DataTransferObject;

class Address extends DataTransferObject
{
    /** @var string */
    public $street;

    /** @var string */
    public $suite;

    /** @var string */
    public $city;

    /** @var string */
    public $zipcode;

    /** @var \App\Objects\Geo */
    public $geo;
}
```

Now we can update the User object class with the address class we just created. 

```php
// app/Objects/User.php

/** @var \App\Objects\Address */
public $address;
```

This will now ensure the address follows the definition we created in the Address object class. 

### Nested Data Transfer Objects

If a user had multiple addresses instead of just one address then we could update the User object class to say it should expect an array of Addresses.

```php
// app/Objects/User.php

/** @var \App\Objects\Address[] */
public $address;
```

Notice that I am using the full namespace. This is required for the automatic nested type casting to work. 

## Using the Object

Now we have defined our objects and ensured the type casting is correct we can easily use the data in a nice object syntax and know what type the data will be in. 

```php
$users = $this->http->get('users')
            ->json();
$user = new \App\Objects\User($users[0]);

var_dump($user->id); // int(1)
var_dump($user->name); // string(13) "Leanne Graham"
var_dump($user->address->street); // string(11) "Kulas Light"
```

Hopefully you can see the benefits Laravel Http Client and Spatie Data Transfer Object can bring to your application. 

Image from [StockSnap.io](https://stocksnap.io/photo/abstract-flowing-YQJBSB8CIR)
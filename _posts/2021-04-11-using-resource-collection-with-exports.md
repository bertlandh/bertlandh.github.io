---
layout: post
title: Using Laravel Resource Collections with exports
description: How to use Laravel Resource Collections with exports
date: 2021-04-11 19:00:07
hero_image: /img/resource-collection.jpg
hero_height: is-large
hero_darken: true
image: /img/resource-collection.jpg
tags: Laravel Exports Resource Collections
---

Sometimes you need to get data out of your Laravel app so it can be analysed. There are many ways of doing this, such as exporting rows from the database, or using a package such as Laravel Excel, but this example will utilise Laravel Resource Collections. 

In this example we are going to create an export of User information into Excel using [Laravel Resource Collection](https://laravel.com/docs/8.x/eloquent-resources#resource-collections) and Spatie's simple excel package. Laravel Resources are normally used to transform your data for use in an API, but you can also create an array from the resource for use in our export. 

The users table has been updated so a user belongs to a company. The companies table has a name for the company in this example. 

```php
// App/Models/User.php

public function company()
{
    return $this->belongsTo(\App\Models\Company::class, 'company_id', 'id');
}
```

## Creating the User Resource

To create the user resource we can use the artisan command:

```bash
php artisan make:resource UserResource
```

We can then specify the data we want to include for each user. We will add the name, email and the company name.

```php
<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class UserResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return array
     */
    public function toArray($request)
    {
        return [
           'name' => $this->name,
           'email' => $this->email,
           'company' => $this->company->name,
        ];
    }
}
```

## Converting the User Resource to an array

When you return the UserResource it will provide you with a json response with the users within the data key. This is perfect for use with an API.

```php
return UserResource::collection(User::get());
```

Each user is listed with their name, email and company. The keys are what we defined in the UserResource toArray() method so if we wanted to add additional data, for example such as a company phone number that is added in future, then we can update the UserResource and the results will be updated accordingly. 

```json
{
    "data": [
        {
            "name": "Zechariah Olson DDS",
            "email": "dreynolds@example.net",
            "company": "Boyle Ltd"
        }
    ]
}
```

We can modify this statement slightly to provide an array of just the user data we need without the data key by using the `resolve()` method. 

```php
return UserResource::collection(User::get())->resolve();
```

We can also update the query from `User::get()` to `User::cursor()` to return a [lazy collection](https://laravel.com/docs/8.x/eloquent#cursors) and help reduce the amount of memory when we have many users to export. Cursor allows us to only load the current model we are iterating over, rather than loading all models at once. 

```php
return UserResource::collection(User::cursor())->resolve();
```

## Exporting to Excel

Now we are ready to make use of the [Simple Excel](https://github.com/spatie/simple-excel) package from Spatie to convert our array into an Excel file. 

```bash
composer require spatie/simple-excel
```

The simple excel package provides a writer to help us easily create an excel file using `SimpleExcelWriter::create()` but since the file could be very large if our Laravel app has numerous users we can use the `SimpleExcelWriter::streamDownload()` method instead to allow us to stream the download directly to the browser. 

Once we have our writer instance we can add rows of data to the file using the `->addRows()` method which expects an array. This is where we pass in our UserResource, with the resolve method so it is converted into an array. 

Finally we add `->toBrowser()` to return the response to the browser and allow the file to download. 

```php
// App/Controllers/UserController.php

public function export()
{
    return SimpleExcelWriter::streamDownload('users-export.xlsx')
        ->addRows(
            UserResource::collection(User::cursor())
                ->resolve()
        )
        ->toBrowser();
}
```

## Other possibilities

Once you have created the resource you can reuse it as it was originally intended as an API response, but you could also use it with another Spatie package called [array to xml](https://github.com/spatie/array-to-xml) to convert your array into an XML file instead of a CSV or Excel file.

Photo by <a href="https://stocksnap.io/author/mattbangophotos">Matt Bango</a> from <a href="https://stocksnap.io">StockSnap</a>
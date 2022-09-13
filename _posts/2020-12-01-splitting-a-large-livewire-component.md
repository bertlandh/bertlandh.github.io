---
layout: post
title: Splitting a large Laravel Livewire Component
description: Splitting up a large Laravel Livewire component into more manageable chunks
date: 2020-12-01 18:00:07
hero_image: /img/splitting-livewire.jpg
hero_height: is-large
hero_darken: false
image: /img/splitting-livewire.jpg
tags: laravel livewire php
---

Sometimes, no matter what solution you use to build your system, there comes a point where everything tends to grow a bit big and edges towards being unmanageable. Luckily Livewire offers a solution to this problem. 

## What is Livewire? 

[Laravel Livewire](https://laravel-livewire.com/) offers a way to build dynamic interfaces, but instead of using a JavaScript library such as Vue or React, it allows developers to write their code in PHP components and Blade template files. It's fantastic. If you haven't used it before then I suggest you check it out.

## What is the problem?

Lots of tutorials and examples tell you how to build something small, like a contact form or a todo list. This is absolutely fine as it allows the example to show the build from start to finish, but sometimes you get given a specification for a very large and complex system and are asked to build it. 

Let's use the example of a holiday car rental site. When you want to make your booking you need to store details of the customer, such as their name and address, the type of car you want to hire, as well as any extras such as additional insurance or even hotels for your stay.

One way of approaching this would be to create a single, large component with all the logic in and then a single view file that just keeps on getting longer and longer. It will probably work just fine, but there are some tools available that let you split this up into more manageable chunks. 

## Splitting the Component Class with Traits

Livewire v2 comes with a great feature of PHP called traits. Traits allow you to create a file that can be used within a class, giving the class the methods and properties of the trait, but allowing you to reuse the same trait from within multiple classes. This allows us to split the logic up between several smaller, more manageable files and 'use' them in the main component. 

If we go back to our holiday car rental, we might need a trait that contains our methods for getting vehicle data, another for getting location information, such as addresses, or another for storing the customer's details. 

But Livewire traits take things even further too. 

Rather than just allowing us to define our own methods we can make use of a naming convention to hook into the Livewire lifecycle hooks too. 

We have said we will create a trait that is concentrated on vehicle information, but how do we make that data available to the rest of the component? We could call a method from the mount method of the main component class, but we could also do this in the trait by using the mount method of the trait. 

If our trait was called `VehicleInformation`, then we can create a `mountVehicleInformation` method in our trait where we set the vehicle data to a public variable and it is then available to the main component. 

```php
trait VehicleInformation
{
    public $vehicles;

    public function mountVehicleInformation()
    {
        $this->vehicles = $this->getVehiclesData();
    }

    public function getVehiclesData()
    {
        // Get the vehicles data from somewhere
    }
}
```

From the example above, we can make use of `$this->vehicles` from with the main component class and `$vehicles` from within the blade view. 

## Splitting validation rules

Livewire gives us a way of creating rules as an array, which are validated when `$this->validate();` is called. 

```php
class HolidayRental extends Component
{
    use VehicleInformation;

    public $vehicleType;

    protected $rules = [
        'vehicleType' => 'required',
        'startDate' => 'required|date',
    ];

    public function submit()
    {
        $this->validate();
    }
}
```

This works really nicely, but if we have a very large component, we could end up with may validation rules being defined in the main component class. 

To help with the pattern we were using with traits, we could also extract the validation rules to the traits. There doesn't seem to be anything built in to Livewire traits for this right now, but one method I have discovered is to define separate arrays in each trait and merge them in the constructor for the main component. 

```php
trait VehicleInformation
{
    public $vehicles;

    protected $vehicleInformationRules = [
        'vehicleType' => 'required',
    ];

    public function mountVehicleInformation()
    {
        $this->vehicles = $this->getVehiclesData();
    }

    public function getVehiclesData()
    {
        // Get the vehicles data from somewhere
    }
}
```

```php
class HolidayRental extends Component
{
    use VehicleInformation;

    public $vehicleType;

    protected $rules = [
        'startDate' => 'required|date',
    ];

    public function __construct()
    {
        // Merge the component rules with rules from our trait
        $this->rules = array_merge($this->rules, $this->vehicleInformationRules);

        parent::__construct();
    }

    public function submit()
    {
        $this->validate();
    }
}
```

This also makes our validation rules more reusable across different components if needed. 

## Splitting the views

The view for the component is defined in the render method of the component. This is a single blade file.

```php
class HolidayRental extends Component
{
    ...
    public function render()
    {
        return view('livewire.holiday-rental');
    }
}
```

For some reason it didn't seem immediately obvious to me that you can use standard blade `@include()` from within the main `livewire.holiday-rental` blade view to include partials or sections of the form. I think this was due to my previous experience using Vue components where you have to play around passing state or syncing state between parent and child components. I was over thinking things. Blade files are views and the state is managed in the class so you can include as many subviews as you need and it will render them together. 

## Reusable sub components

One last thing to consider is how you can use the `@include()` tag to pass additional settings to a subview. In our example for holiday rentals we may need a search for hotels or car parks. We could build a single search results view that has a search box and displays an image, a title and a description for each result, but we could set what wire model the search box needs and which results to show by setting this in the `@include()` tag.

```php
// livewire/holiday-rental.blade.php

<h2>Find a Hotel</h2>

@include('livewire.partials.search', ['searchModel' => 'hotelSearch', 'results' => $hotels])

<h2>Find a Car Park</h2>

@include('livewire.partials.search', ['searchModel' => 'carParkSearch', 'results' => $carParks])

```
{% raw %}
```php
// livewire/partials/search.blade.php

<input wire:model="{{ $searchModel }}>

@foreach($results as $result)
<div>
    <img src="{{ $result->image_path }}" alt="{{ $result->title }}" />
    <h3>{{ $result->title }}</h3>
    <p>{{ $result->description }}</p>
</div>
@endforeach

```
{% endraw %}

## Planning it all out

Taking sometime to plan out and structure your project before you start diving into the code can bring benefits later on, reducing repetition and making your code more reusable and easier to maintain. I was lucky that I had some time available to spend a few days building a prototype to try out the above techniques before I started building my project for real. Hopefully it will pay off in the long run. 

If there are any other techniques that you know of then please share them in the comments and hopefully you will enjoy working with Livewire as much as I do.

Photo by <a href="https://stocksnap.io/author/31632">Sasha • Instagram.com/sanfrancisco</a> from <a href="https://stocksnap.io">StockSnap</a>
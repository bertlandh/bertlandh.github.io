---
layout: post
title: Creating a simple report in Laravel
date: 2019-09-27 19:00:07
description: Recently I was tasked with creating a report in a Laravel project and I thought I would share some of the things I learned along the way
image: /img/create-a-simple-report-in-laravel.jpg
hero_image: /img/create-a-simple-report-in-laravel.jpg
hero_height: is-large
published: true
tags: webdev laravel database
---

Recently I was tasked with creating a report in a Laravel project and I thought I would share some of the things I learned along the way. I’m going to use a shop as an example with an orders table that contains the orders, but these principles should apply to pretty much any report. Firstly I want to get the number of orders for the previous week and then I want to get a count of orders by week and year so I can put this data into a report.

## Orders last week

The first request is to show how many orders there have been in the past week. Sounds simple right, but even this has a few challenges you need to be aware of. 

We could start by creating a query that filters the orders that are greater than the start of the week and less than the end of the week. 

```php
$ordersLastWeek = Order::where('created_at', '>', '2019-09-16')
                        ->where('created_at', '<', '2019-09-22')
                        ->count();
```

This returns us a number thanks to using count() instead of get(), but we have hard coded the dates in our query which is less than ideal as we would have to change the query each week. 

Luckily we can make use of Carbon to automatically calculate the start and end dates for our query. We can start by finding the current date and time using now(), then subtract a week and then find the start of the week and the end of the week. We can also tell the database we only want the created_at column in this query by adding a select() rather than getting all of the fields in the order. 

```php
$ordersLastWeek = Order::select('created_at')
                        ->where('created_at', '>', now()->subWeek()->startOfWeek())
                        ->where('created_at', '<', now()->subWeek()->endOfWeek())
                        ->count();
```

If we wanted to display the orders from the week before last we can change `subWeek()` to `subWeeks(2)`. 

## Orders By Week

Now we need to get a little more complicated. We need a count of orders for each week and year. 

I initially thought I could make use of the count() method like the previous query but it turns out this doesn't work as I had expected. I could return the count of all orders, but I couldn't use it with groupBy(). 

If I only had a few orders I could get all of the orders and then loop through them with some collection methods in PHP to calculate the week and year for each item and then group them how I wanted.  

```php
// Please don't do this
$ordersByWeek = Order::all()->map(function($item) {
                        $item->week = $item->created_at->weekOfYear;
                        $item->year = $item->created_at->year;
                        return $item;
                    })
                    ->groupBy(['year', 'week'])
                    ->map
                        ->map(function($week) {
                        return $week->count();
                    });
```

Just to explain, I'm getting all the orders, then looping through each of the orders and set the week and year using carbon methods based on the created_at, before grouping by year and week and then looping through the weeks and returning a count of the orders for that week. 

This works, but its not very efficient and could start using a lot of memory very quickly as the number of orders starts to grow. Instead, we need to make use of the power of the database. The rest of the article assumes you are using mysql as your database connection as different databases may need slightly different syntax or methods, but the principles should still apply. 

We need a way of querying the database to get a count of orders. We can make use of DB::raw() in our select statement to count the order ids. To do this we need to use a mysql aggregate function called count(). We then give this the name of quantity using `as`.  

`DB::raw('count(id) as quantity)`

We can use DB::raw() once more to get the week number and year from the created_at date using mysql's year() and week() methods. 

`DB::raw('week(created_at) as week')`

We can then group by the calculated year and week values to get the quantity of orders for each year and week. 

```php
use Illuminate\Support\Facades\DB;

$ordersByWeek = Order::select([
                    DB::raw('count(id) as quantity'),
                    DB::raw('week(created_at) as week'),
                    DB::raw('year(created_at) as year')
                ])
                ->groupBy(['year', 'week'])
                ->get()
                ->toArray();

return $ordersByWeek;
```

The toArray() method on the end converts the result to an array to simplify the response. Something like the below would be returned in a json response format.

```json
[
    {
        "quantity": 3,
        "week": 36,
        "year": 2019
    },
    {
        "quantity": 2,
        "week": 37,
        "year": 2019
    }
]
```

You could further customise the above query to only show a particular year by using the when() method. This checks if year is in the request() sent to your controller. Laravel has some handy tools for [comparing dates](https://laravel.com/docs/5.8/queries#where-clauses) built in, such as whereDate(), whereMonth(), whereDay() and whereYear(). 

```php
$ordersByWeek = Order::select([
                    DB::raw('count(id) as quantity'),
                    DB::raw('week(created_at) as week'),
                    DB::raw('year(created_at) as year')
                ])
                ->when(request('year'), function ($query) {
                    $query->whereYear('created_at', request('year'));
                })
                ->groupBy(['year', 'week'])
                ->get()
                ->toArray();
```

The when() method also allows you to set a third parameter which will run if the test returns false, so you could filter by the current year by default if year is not in the request().

```php
$ordersByWeek = Order::select([
                    DB::raw('count(id) as quantity'),
                    DB::raw('week(created_at) as week'),
                    DB::raw('year(created_at) as year')
                ])
                ->when(request('year'), function ($query) {
                    $query->whereYear('created_at', request('year'));
                }, function ($query) {
                    $query->whereYear('created_at', now()->format('Y'));
                })
                ->groupBy(['year', 'week'])
                ->get()
                ->toArray();
```

Hopefully this post has provided you with a starting point to start accessing some key metrics from your Laravel project and show you how you can refactor your queries to make them a bit more reusable, especially by using the when() method, instead of having to write separate queries for similar requests. 
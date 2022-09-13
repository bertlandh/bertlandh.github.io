---
layout: post
title: Testing a Laravel Console Command
description: Testing a Laravel Console Command with PHPUnit Tests in Laravel 8
date: 2021-01-31 09:30:07
hero_image: /img/testing-console-commands.jpg
hero_height: is-large
hero_darken: false
image: /img/testing-console-commands.jpg
tags: laravel testing php artisan 
---

I recently discovered that you can test an artisan console command very easily in Laravel 8 and make assertions on the output. In this example we are going to make a console command to import some products into our database from a csv file and then test they are all added as expected. 

First we need to create a console command using artisan.

```bash
php artisan make:command ImportProducts
```

In this newly created class, we are going to use the [Spatie Simple Excel](https://github.com/spatie/simple-excel) package to read the csv file and then import the products. We are going to use the product_code as the unique identifier and we are going to update or create the product name and description. 

The console command expects a file location as an argument. It also has a confirm to ensure the user wants to run the command. After each product is added it will output the message Imported and then the product code.

```php
<?php

namespace App\Console\Commands;

use App\Models\Product;
use Illuminate\Console\Command;
use Spatie\SimpleExcel\SimpleExcelReader;

class ImportProducts extends Command
{
    protected $signature = 'import:products {file}';
    protected $description = 'Import products into the products table';

    public function __construct()
    {
        parent::__construct();
    }

    public function handle()
    {
        $file = $this->argument('file');

        if(!$this->confirm('Do you really wish to import products?')) {
            $this->error('Import cancelled');
            return 1;
        }

        $this->info('Starting import');

        $rows = SimpleExcelReader::create($file)->getRows();

        $rows->each(function (array $row) {
            Product::updateOrCreate(
                ['product_code' => $row['product_code']],
                ['name' => $row['name'], 'description' => $row['description']]
            );
            $this->info("Imported {$row['product_code']}");
        });

        $this->info('Products imported');
        return 0;
    }
}
```

## Running the command

To run the console command manually we can run the following:

```bash
php artisan import:products /path/to/csv-file.csv
```

## Creating a test

Next we can create a test using artisan. You could say this is a unit test as it's a console command, but as we are testing the whole process of the import from start to finish I personally think it should be a feature test. 

```bash
php artisan make:test ImportProductsTest
```

We want to ensure we `use RefreshDatabase;` in our test class as we need to create the products table to test importing the data into the database.

## Creating a test file

The command expects a file to import so we will create a csv file in `Tests/Files/import-products.csv` with the below test content.

```csv
product_code,name,description
ABC123,yPhone3,The latest and greatest yPhone
ABC111,yPhone3S,A smaller and more compact version of the yPhone
```

## Testing the file is required

First we are going to test that the file is required. If we run the command without a file we get a RuntimeException, so let's test this is what we expect.

```php
public function test_importing_without_a_file()
{
    $this->expectException(Symfony\Component\Console\Exception\RuntimeException::class);
    $this->artisan('import:products');
}
```

## Testing cancelling the import

We added a confirmation to ensure that we really want to run the command, so we can test that the command stops running and outputs the 'Importing cancelled' message, as well as not outputting the 'Products imported' message.

The `expectsConfirmation` method has two arguments, the first being the expected output and the second being the response you want to give. 

The `expectsOutput` allows you to test that the message you expect is outputted.

To test a message isn't output we can use the `doesntExpectOutput` method. 

Lastly, we can test the exit code using the `assertExitCode`.

```php
public function test_cancel_import_products_command()
{
    $this->artisan('import:products ' .__DIR__.'/../Files/import-products.csv')
        ->expectsConfirmation('Do you really wish to import products?', 'no')
        ->expectsOutput('Import cancelled')
        ->doesntExpectOutput('Products imported')
        ->assertExitCode(1);
}
```

## Testing the import process

Now we have tested without a file and cancelling the command, we can test running the command from start to finish and ensure that it outputs all the messages we expect to see and returns the correct exit code. 

```php
public function test_import_products_command()
{
    $this->artisan('import:products ' .__DIR__.'/../Files/import-products.csv')
        ->expectsConfirmation('Do you really wish to import products?', 'yes')
        ->expectsOutput('Starting import')
        ->expectsOutput('Imported ABC123')
        ->expectsOutput('Imported ABC111')
        ->expectsOutput('Products imported')
        ->assertExitCode(0);
}
```

We can go one step further and ensure that the data we imported was actually inserted into the database correctly (using `$this->assertDatabaseHas()`) by adding the following to the test.

```php
$this->assertDatabaseHas('products', [
    'product_code' => 'ABC123',
    'name' => 'yPhone3',
    'description' => 'The latest and greatest yPhone',
]);

$this->assertDatabaseHas('products', [
    'product_code' => 'ABC111',
    'name' => 'yPhone3S',
    'description' => 'A smaller and more compact version of the yPhone',
]);
```

## Running the test

Finally, we need to run the test. This is done using `php artisan test` or `vendor/bin/phpunit`. 

```bash
php artisan test

   PASS  Tests\Feature\ImportProductsTest
  ✓ import products command
  ✓ cancel import products command
  ✓ importing without a file

  Tests:  3 passed
  Time:   0.24s
```

For more information on testing console commands, please refer to the [Laravel docs](https://laravel.com/docs/8.x/console-tests).

Photo by <a href="https://stocksnap.io/author/193">Caleb George</a> from <a href="https://stocksnap.io">StockSnap</a>
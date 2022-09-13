---
layout: post
title: Creating multi-worksheet Excel files with Simple Excel
description: How to create multi-worksheet Excel files with Spatie's Simple Excel package
date: 2021-10-13 19:00:07
hero_image: /img/multi-worksheet-hero.jpg
hero_height: is-large
hero_darken: true
image: /img/multi-worksheet-hero.jpg
tags: PHP Laravel Tutorial
---

Recently I had to create a large data export for a project. I like using Spatie's Simple Excel package to do this as it is very simple to use and works well when exporting large amounts of data to a CSV or Excel file with the ability to stream a download to the browser. This particular project had an additional requirement though, exporting multiple worksheet's of data at once. Luckily, this package allows you to do this too.

## The writer object

The [Simple Excel](https://github.com/spatie/simple-excel) package uses the [box/spout](https://github.com/box/spout) package under the hood. In the readme it states that you can get to the underlying writer using `->getWriter()`.

```php
$writer = SimpleExcelWriter::create($pathToCsv)->getWriter();
```

If we jump to the box/spout package docs, there is a section on [Playing with sheets](https://opensource.box.com/spout/docs/#playing-with-sheets). The docs show we can see how to get the current sheet, set a name for the current sheet and how to create a new sheet. 

## Naming a worksheet

To name a worksheet we can use `getCurrentSheet()` to get the current sheet with the writer and then use `setName()` to set the name. 

```php
$writer = SimpleExcelWriter::streamDownload('your-export.xlsx')->getWriter()
$nameSheet = $writer->getCurrentSheet();
$nameSheet->setName('Names');
```

## Creating a new worksheet 

To create a new sheet we can use `addNewSheetAndMakeItCurrent()` and we can then use `setName()` once more to set the name of this new sheet.

```php
$addressSheet = $writer->addNewSheetAndMakeItCurrent();
$addressSheet->setName('Addresses');
```

## Bringing it all together

Now we know how to do the individual tasks we can bring it all together. 

* Create a streamDownload using SimpleExcelWriter
* Get the writer, get the current sheet and name it 'Names'
* Add rows of data to the 'Names' sheet
* Create a new sheet and make it the current sheet, before naming it 'Addresses'
* Add the header row to 'Addresses'
* Add rows of data to the 'Addresses' sheet
* Finally, return the stream to the browser

```php
use Spatie\SimpleExcel\SimpleExcelWriter;

$stream = SimpleExcelWriter::streamDownload('your-export.xlsx');

$writer = $stream->getWriter();

// Set the name of the current sheet to Names
$nameSheet = $writer->getCurrentSheet();
$nameSheet->setName('Names');

// Add rows to the Names sheet
$stream->addRows([
    ['first_name' => 'Boaty', 'last_name' => 'Mc Boatface'],
    ['first_name' => 'Dave', 'last_name' => 'Mc Dave'],
]);

// Create a new sheet and set the name to Addresses
$addressSheet = $writer->addNewSheetAndMakeItCurrent();
$addressSheet->setName('Addresses');

// Manually add header rows to the Addresses sheet
$stream->addRow(['house_number', 'postcode']);

// Add rows to the Addresses sheet
$stream->addRows([
    ['house_number' => '1', 'postcode' => 'AB1 2BC'],
    ['house_number' => '2', 'postcode' => 'AB1 2BD'],
]);

return $stream->toBrowser();
```

For more information on creating exports in Laravel, check out [Using Laravel Resource Collections with exports]({% post_url 2021-04-11-using-resource-collection-with-exports %}).

When creating a single worksheet, the Simple Excel package normally creates the header row for us, but it seems when you create a new sheet you need to define the new headers for your data. 

Here are a couple of screenshots of the outputted Excel file:

![The Names Excel worksheet](/img/multi-worksheet1.jpg)

![The Addressed Excel worksheet](/img/multi-worksheet2.jpg)

<a href="https://stocksnap.io/photo/business-reports-LABXT2BYKU">Photo</a> by <a href="https://stocksnap.io/author/775">Wilfred Iven</a> on <a href="https://stocksnap.io">StockSnap</a>
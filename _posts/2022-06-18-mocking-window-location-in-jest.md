---
title: Mocking window.location in Jest
description: How to mock window.location in Jest tests
layout: post
date: 2022-06-18 09:00:07
hero_image: /img/mocking-window-location-jest.jpg
hero_height: is-large
hero_darken: false
image: /img/mocking-window-location-jest.jpg
tags: JavaScript Jest Testing
---

Recently I had to write some tests for a piece of JavaScript code that used `window.location`. This left me trying to figure out how to mock the `window.location` so that I could pass in dummy data and ensure that the data I got back was what was expected. Here was how I managed to solve the issue.

I found a few different articles about mocking but some said they only worked in older versions of jest so I had to find a more up to date solution. There were also some packages that give this functionality, but I proffered to try and work it out without a package. 

## Make a new Object

In the end it turns out the simplest way was to delete it and make it as a new object, thanks to this post on [Stack Overflow](https://stackoverflow.com/a/60697570).  

```ts
delete global.window.location;
global.window = Object.create(window);
global.window.location = {};
```

Using typescript in the test helped me see what keys were required in my location object, so I added all of these in and passed in some dummy values that I could use in my tests. 

```ts
global.window.location = {
    ancestorOrigins: null,
    hash: null,
    host: 'dummy.com',
    port: '80',
    protocol: 'http:',
    hostname: 'dummy.com',
    href: 'http://dummy.com?page=1&name=testing',
    origin: 'http://dummy.com',
    pathname: null,
    search: null,
    assign: null,
    reload: null,
    replace: null,
};
```

Now I could set some data in the initial mock and know what the initial state should be and what the end result should be. 

## Before Each

As this was quite a lot of setup code I decided to move this into a `beforeEach()` method so it will be run before each test. 

This also helps ensure each test isn’t affected by any previous tests which could cause anomalous results. 

Now, when I want a different initial state in a test, I can just overwrite the part that needs updating for that test instead of overwriting everything. 

```ts
describe('removeValueFromParam', () => {
    it('removes a specific value from a given param', () => {
        // Overwrite the default href for this test
        window.location.href = 'http://dummy.com/?page=1&name=testing%2Ctest';

        removeValueFromParam('name', 'testing');

        expect(window.location.href).toEqual('http://dummy.com/?page=1&name=test')
    });
});
```

## To string

The tests kept failing on certain tests. I realised it was failing when the `window.location` was coming back as undefined instead of a string. Somewhere in the code it was calling `window.location.toString()` but the mock I had created didn't have this method.

To match this functionality, I then added a `toString()` method to my mock. I could hard code a response and make a specific test pass. 

```ts
// Mock window.location
global.window.location = {
    href: 'http://dummy.com?page=1&name=testing',
    /*
    * Other settings
    */
    toString: () => {
        return 'http://dummy.com?page=1&name=testing';
    },
};
```

The issue now was that different tests needed different responses from the `toString()` method, so I decided to look up what the standard method does.

> The `toString()` stringifier method of the Location interface returns a string containing the whole URL. It is a read-only version of Location.href.
- [https://developer.mozilla.org/en-US/docs/Web/API/Location/toString](https://developer.mozilla.org/en-US/docs/Web/API/Location/toString)

Therefore, I just needed to return the location.href to match the default behaviour. 

```ts
// Mock window.location
global.window.location = {
    href: 'http://dummy.com?page=1&name=testing',
    /*
    * Other settings
    */
    toString: () => {
        return global.window.location.href;
    },
};
```

Now, the tests were all passing. If your code makes use of other methods in `window.location` then you should be able to add these to your mock too. 

<a href="https://stocksnap.io/photo/building-abstract-NEPRKIHBVQ">Photo</a> by <a href="https://stocksnap.io/author/thebuildingenvelope">The Building Envelope</a> on <a href="https://stocksnap.io">StockSnap</a>
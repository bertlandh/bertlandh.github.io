---
layout: post
title:  "Getting started with Cordova Hybrid Apps"
date:   2015-02-05 20:36:07
categories: apps cordova development
description: "Are you a web developer but fancy getting started with apps? Cordova could be your way in to hybrid apps!"
---

If you are a web developer but fancy getting started with apps then Cordova could be the way forward for you.

## So what is Cordova?

Cordova is platform for building native mobile applications using HTML, JavaScript and CSS. This means that you don't need to learn objective-C or Java to develop your app. Instead you write it like a webapp and then compile it into a native app using Cordova.

This may sound familiar to you if you have heard of PhoneGap before. PhoneGap was built on Cordova but PhoneGap seems to have fallen out of favour now with more community support for Cordova.

## So where do I start

Install, install, install, install (this may take some time...)

So there is a lot of things you need to install before you can get started and make your first app. The list of things to install depends on what platform you are going to develop for. Cordova supports Android, iOS, Windows Phone and Blackberry. I don't currently have a Mac so I have concentrated my development on Android.

For Android, before you install Cordova you need to install the following:

- [Java Development Kit](http://www.oracle.com/technetwork/java/javase/downloads/jdk7-downloads-1880260.html)
- [Apache Ant / Win Ant](https://code.google.com/p/winant/)
- [Android Studio & Android SDK](http://developer.android.com/sdk/index.html)

This took me a few hours to get it all downloaded, installed and configured. Each site has some fairly easy instructions to follow, just remember (or even better, write down) the location that each package is installed to. To install Android Studio you need to know the location you have installed Java and you may need to add the location of the Android SDK to your environment variables if it isn't added automatically.

For iOS you need to install the following (and you WILL need a Mac for this):

- [iOS SDK and XCode](https://itunes.apple.com/us/app/xcode/id497799835?mt=12)

Once you have these installed and set up you can then install the Cordova Comand Line. Phew!

Oh wait a minute, you need to install [Node.js](http://nodejs.org/) as well which you use to install Cordova.

Oh yeah, you also need to install [Git](http://git-scm.com/)... Check out my [previous post about getting started with GIT](http://www.csrhymes.com/training/learning/developer/2015/01/22/how-to-become-a-web-developer-part-3.html).

Right, ready to go now??? No more to install??? At least for the next five minutes anyway.

## Installing Cordova

Things get a bit easier now. For linux and Mac OSX type the following and press enter:

    $ sudo npm install -g cordova

For Windows type the following and press enter:

    C:\>npm install -g cordova

In theory this should install everything you need and all work fine.

The issue I had with this was that I was trying to do this from within a company network that had a proxy server. If this is the case for you then make sure that you configure your proxy settings for both node.js and git.

## Your first project

So everything is now installed and you are all ready to go. To create your first project, navigate to where you want the project to be on your computer and then type the following:

    cordova create hello com.example.hello HelloWorld

This basically says use cordova to create a new app with the name com.example.hello in the hello directory with the display name HelloWorld. This will create a load of files and folders ready for you to start your development.

Now you need to add platforms, as in what you are developing the app to run on, such as Android and iOS.

    cordova platform add android
    cordova platform add ios

This will create the relevant folders within the platforms folder where your compiled app will live. Don't edit anything in here though. YOu need to do your work in the www folder.

## www folder

As the name of the folder may hint at, this is where you add your web based code (HTML, JavaScript and CSS). Thoughtfully, Cordova provides some example files in here for you to get started.

One thing you may notice is that the files are all relative. Rather than the image being in the '/img/' folder, it is in the 'img/' folder. This took me a while to get used to.

## Building and installing the app

Once you are ready to test your app out you can build it by running the build command:

    cordova build android

This produces an app file that you can then use to test with, but there is a better way than manually installing this on your device each time you change it. Use the run command instead:

    cordova run android

This command compiles your app and then either installs it on whatever device you have plugged in to your computer or it will install and run on the emulator. The emulator takes quite a long time to get started and you can't test all of the features such as camera, gyro, etc.

## Installing on Android devices

There are a couple of things to be aware of before you can install your app on Android.

1. You need to get your device into developer mode and then enable USB debugging
2. You need to install the relevant USB driver for the device before it will install correctly

## Installing on iOS devices

Some things to be aware of for iOS devices.

1. You need to be a member of the iOS developer program
2. You need to create a provisioning profile in the [iOS provisioning portal](https://developer.apple.com/ios/manage/overview/index.action)
3. Blah, blah, blah stuff about certificates and whatever, can't I get my app on my iPhone yet without jumping through more hoops.

## Get developing!

That's a very brief guide to getting started with Cordova. I look forward to seeing your apps in the app store any day now! Good luck!

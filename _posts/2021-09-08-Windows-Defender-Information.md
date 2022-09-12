---
layout: post
title: Windows Defender Information
description: Gathers basic Windows Defender Information such as product version and signature version using the built-in cmdlet `Get-MpComputerStatus` found in the defender module.
date: 2021-09-08 14:00:00
hero_image: https://en.wikipedia.org/wiki/The_Defender_(1989_film)#/media/File:The_Diemert_Defender.png
image: https://en.wikipedia.org/wiki/The_Defender_(1989_film)#/media/File:THE_DEFENDER_(1998).jpg
hero_height: is-large
hero_darken: true
---

Gathers basic Windows Defender Information such as product version and signature version using the built-in cmdlet `Get-MpComputerStatus` found in the defender module.

# Requirements

* Windows 10/Server 2016 or higher
* The Windows Defender service must be running

----

	if (-Not(Get-Command Get-MpComputerStatus -ErrorAction SilentlyContinue)) {
		throw "Unable to find Get-MpComputerStatus. Available on Windows 10/Server 2016 or higher"
	}

	$DefenderStatus = (Get-Service WinDefend -ErrorAction SilentlyContinue).Status

	if ($DefenderStatus -ne "Running") {
		throw "The Windows Defender service is not currently running"
	}

	Get-MpComputerStatus





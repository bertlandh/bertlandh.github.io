---
title: "Windows Defender Information"
categories:
  - Edge Case
tags:
  - content
  - css
  - edge case
  - lists
  - markup
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





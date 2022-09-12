---
layout: post
title: Windows Update Last Installed
description: Installs the PSWindowsUpdate module, then runs the following cmdlets
date: 2021-12-10 18:00:00
hero_image: /img/wikidata_iiif.png
image: /img/wikidata_iiif.png
hero_height: is-large
hero_darken: true
---


Installs the PSWindowsUpdate module, then runs the following cmdlets:
* Get-WULastResults
* Get-WURebootStatus

	& '.\Install and Import Module.ps1' -ModuleName "PSWindowsUpdate"

	# Store results in a temp variable
	$lastResults = Get-WULastResults

	#organize results in a PSCustomObject
	[PSCustomObject]@{
		LastInstallationDate = [DateTime] $lastResults.LastInstallationSuccessDate
		LastScanSuccessDate  = [DateTime] $lastResults.LastSearchSuccessDate
		IsPendingReboot      = [Bool] (Get-WURebootStatus -Silent)
	}
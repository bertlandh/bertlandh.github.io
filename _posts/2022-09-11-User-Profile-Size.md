---
layout: post
title: User Profile Size
description: Recursively scans every folder in `C:\Users`, then adds up the size of every file to get an approximate size for every user's profile.
date: 2022-09-11 17:00:00
hero_image: https://upload.wikimedia.org/wikipedia/en/9/90/Java_roaming_profile_bloat.PNG
image: https://upload.wikimedia.org/wikipedia/commons/a/af/User_profile_personal_details.png
hero_height: is-large
hero_darken: true
show_sidebar: false
toc: true
toc_title: PowerShell
---


Recursively scans every folder in `C:\Users`, then adds up the size of every file to get an approximate size for every user's profile.

This scanner may take a while to run!

	$ErrorActionPreference = "SilentlyContinue"

	$UserFolders = Get-ChildItem -Path "C:\Users" -Force -Directory

	ForEach ( $Folder in $UserFolders ) {

		[UInt64]$FolderSize = ( Get-Childitem -Path $Folder.FullName -Force -Recurse | Measure-Object -Property "Length" -Sum ).Sum
		
		[PSCustomObject]@{
			FolderName    = $Folder.BaseName
			FolderPath    = $Folder.FullName
			Size          = $FolderSize
		}

	}
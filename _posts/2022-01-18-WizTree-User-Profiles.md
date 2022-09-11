---
layout: post
title: WizTree - User Profiles
description: Uses [WizTree](https://wiztreefree.com) to retrieve a list of user profiles and how large they are.
date: 2022-01-17 18:00:00
hero_image: /img/anonymous_artist_graph.png
image: /img/vanderbot_abraham.png
hero_height: is-large
hero_darken: true
---

Uses [WizTree](https://wiztreefree.com) to retrieve a list of user profiles and how large they are.

Please consider purchasing an [Enterprise License](https://wiztreefree.com/donate#enterprise) for WizTree.

# Requirements
WizTree must be installed on the target. A package for it is available in the [Package Library](https://www.pdq.com/package-library/).

	# Parameters
	## Verbose
	Enables Verbose log messages.

	[CmdletBinding()]
	param (
	)

	. '.\WizTree Functions.ps1'

	# Make sure WizTree is installed.
	Test-WizTree

	# Run WizTree.
	# https://wiztreefree.com/guide#cmdlinecsv
	$ArgumentList = '"{0}" /export="{1}" /admin=1 /exportfiles=0' -f "$env:SystemDrive\Users", "$PWD\$WizTreeOutput"
	Invoke-WizTree -ArgumentList $ArgumentList

	# Define the CSV processing code that is unique to each script.
	$ScriptBlock = {

		# Locate user profiles.
		if ( ($FileName -split '\\').Count -eq 4 ) {

			[PSCustomObject]@{
				'Profile' = $FileName
				'Size'    = $Size
			}

		}

	}

	# Process the CSV.
	Read-WizTreeCsv -ScriptBlock $ScriptBlock | Sort-Object -Property 'Size' -Descending

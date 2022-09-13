---
layout: post
title: WizTree - Largest Files
description: Uses [WizTree](https://wiztreefree.com) to retrieve a list of the largest files on the target.
date: 2022-01-17 18:00:00
hero_image: /img/screened_wordlists.png
image: /img/wordle_guess.png
hero_height: is-large
hero_darken: true
---


Uses [WizTree](https://wiztreefree.com) to retrieve a list of the largest files on the target.

Please consider purchasing an [Enterprise License](https://wiztreefree.com/donate#enterprise) for WizTree.

# Requirements
WizTree must be installed on the target.

# Parameters
## Entries
The number of entries you would like the list to contain.

**Make sure this is less than or equal to Row Limit!**

Defaults to 10.

## Path
The folder you would like WizTree to search.

Defaults to `$env:SystemDrive`, which is usually 'C:'.

## Verbose
Enables Verbose log messages.



	[CmdletBinding()]
	param (
		[UInt32]$Entries = 10,
		[String]$Path = $env:SystemDrive
	)

	. '.\WizTree Functions.ps1'

	# Make sure WizTree is installed.
	Test-WizTree

	# Run WizTree.
	# The output is still sorted by largest folder, even though /exportfolders=0 removes folders from the output.
	# I couldn't find a way to get it to sort by largest file. If that was possible, this script would be WAY simpler :)
	# https://wiztreefree.com/guide#cmdlinecsv
	$ArgumentList = '"{0}" /export="{1}" /admin=1 /sortby=1 /exportfolders=0' -f $Path, "$PWD\$WizTreeOutput"
	Invoke-WizTree -ArgumentList $ArgumentList

	# Initialize the List that will store the results.
	# .Insert() only works if there are already items in the List, so we have to pre-populate it.
	$global:LargestFiles = New-Object System.Collections.Generic.List[Object]
	for ( $Count = 1; $Count -le $Entries; $Count ++ ) {

		$global:LargestFiles.Add(
			@{
				'FileName' = ''
				'Size'     = 0
			}
		)

	}

	# Define the CSV processing code that is unique to each script.
	$ScriptBlock = {

		# Is it larger than the smallest value in the List?
		if ( $Size -gt $global:LargestFiles[-1].Size ) {

			# Check each entry in the List, starting with the largest.
			foreach ( $Index in 0..($global:LargestFiles.Count - 1) ) {

				if ( $Size -gt $global:LargestFiles[$Index].Size ) {

					# Add a new entry to the List above the entry it is larger than.
					Write-Verbose "Index: $Index, Size: $Size, File Name: $FileName"
					$global:LargestFiles.Insert($Index,
						@{
							'FileName' = $FileName
							'Size'     = $Size
						}
					)

					break

				}
				
			}

			# Keep the List to the maximum number of entries.
			if ( $global:LargestFiles.Count -gt $Entries ) {

				# Remove the last record in the List.
				$global:LargestFiles.RemoveAt($Entries)

			}

		}
		
	}

	# Process the CSV.
	Read-WizTreeCsv -ScriptBlock $ScriptBlock

	# Output the results.
	foreach ( $Entry in $global:LargestFiles ) {

		[PSCustomObject]$Entry

	}

---
layout: post
title: User Last Logged On
description: Queries the Security Event Log to determine the last time each user logged on to the target machine
date: 2022-02-17 18:00:00
hero_image: /img/qt_py_rp2040_sensor.jpg
image: /img/qt_py_rp2040.jpg
hero_height: is-large
hero_darken: true
---

Queries the Security Event Log to determine the last time each user logged on to the target machine.

# Requirements

* Enable "Audit logon events" in Group Policy
  * Windows Settings\Security Settings\Local Policies\Audit Policy
* Configure your retention policy to keep the amount of history you want
  * Administrative Templates\Windows Components\Event Log Service\Security

# Parameters

## Lowercase

Transforms the Username field to lowercase so it groups properly in Inventory. If you don't want this behavior, remove `-Lowercase` from the Parameters field.


# This script requires that Audit Logon events are enabled in Group Policy and those events are kept for the amount of history preferred

	[CmdletBinding()]
	param (
		[Switch]$Lowercase
	)

	$UserArray = New-Object System.Collections.ArrayList

# Query all logon events with id 4624 
	Get-EventLog -LogName "Security" -InstanceId 4624 -ErrorAction "SilentlyContinue" | ForEach-Object {

		$EventMessage = $_
		$AccountName = $EventMessage.ReplacementStrings[5]
		$LogonType = $EventMessage.ReplacementStrings[8]

		if ( $Lowercase ) {

			# Make all usernames lowercase so they group properly in Inventory
			$AccountName = $AccountName.ToLower()

		}

		# Look for events that contain local or remote logon events, while ignoring Windows service accounts
		if ( ( $LogonType -in "2", "10" ) -and ( $AccountName -notmatch "^(DWM|UMFD)-\d" ) ) {
		
			# Skip duplicate names
			if ( $UserArray -notcontains $AccountName ) {

				$null = $UserArray.Add($AccountName)
				
				# Translate the Logon Type
				if ( $LogonType -eq "2" ) {

					$LogonTypeName = "Local"

				} elseif ( $LogonType -eq "10" ) {

					$LogonTypeName = "Remote"

				}

				# Build an object containing the Username, Logon Type, and Last Logon time
				[PSCustomObject]@{
					Username  = $AccountName
					LogonType = $LogonTypeName
					LastLogon = [DateTime]$EventMessage.TimeGenerated.ToString("yyyy-MM-dd HH:mm:ss")
				}  

			}

		}

	}
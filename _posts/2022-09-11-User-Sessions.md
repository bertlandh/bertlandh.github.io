---
layout: post
title: User Sessions
description: Calculates how long users were logged in based on audit events.
date: 2022-09-11 14:00:00
hero_image: https://upload.wikimedia.org/wikipedia/commons/thumb/3/39/Thunderbird_102_screenshot.png/1024px-Thunderbird_102_screenshot.png
image: https://upload.wikimedia.org/wikipedia/commons/thumb/5/5b/HTTP_logo.svg/1024px-HTTP_logo.svg.png
hero_height: is-large
hero_darken: true
---

Calculates how long users were logged in based on audit events.

# Requirements

* Enable "Audit logon events" in Group Policy.
  * Windows Settings\Security Settings\Local Policies\Audit Policy
* Configure your retention policy to keep the amount of history you want.
  * Administrative Templates\Windows Components\Event Log Service\Security

# Parameters

## Lowercase

Transforms the Username field to lowercase so it groups properly in Inventory. If you don't want this behavior, remove `-Lowercase` from the Parameters field.

	[CmdletBinding()]
	param (
		[Switch]$Lowercase
	)

	$Logons = @{}
	$LogonTypes = @{
		2  = 'Local'
		10 = 'Remote'
	}
	$IndexTable = @{
		4624 = @{
			'AccountName' = 5
			'LogonId'     = 7
		}
		4647 = @{
			'AccountName' = 1
			'LogonId'     = 3
		}
	}
	$Params = @{
		'LogName'     = 'Security'
		'InstanceId'  = [Array]$IndexTable.Keys
		'ErrorAction' = 'SilentlyContinue'
	}

	# Query all logon and logoff events.
	Get-EventLog @Params | ForEach-Object {

		$EventMessage = $_
		$TimeGenerated = $EventMessage.TimeGenerated
		# InstanceId is Int64, but hashtable keys have to be Int32.
		$InstanceId = [Int32]$EventMessage.InstanceId
		$IndexData = $IndexTable.$InstanceId
		$AccountName = $EventMessage.ReplacementStrings[$IndexData.AccountName]
		$LogonId = $EventMessage.ReplacementStrings[$IndexData.LogonId]

		# Skip Windows service accounts.
		if ( $AccountName -match '^(DWM|UMFD)-\d' ) {

			Return

		}

		# Make usernames lowercase so they group properly in Inventory.
		if ( $Lowercase ) {

			$AccountName = $AccountName.ToLower()

		}

		switch ( $InstanceId ) {

			# Logoff.
			4647 {

				# Temporarily store the time and Id in a hashtable so it can be matched to its logon event.
				$Logons.$AccountName = @{
					'Time' = $TimeGenerated
					'Id'   = $LogonId
				}

			}

			# Logon.
			4624 {

				# Skip this logon event if there's no logoff event with a matching username.
				if ( -not $Logons.$AccountName ) {

					Return

				}

				$SessionData = $Logons.$AccountName

				# Skip logon events that don't match the logoff event's Logon ID.
				if ( $SessionData.Id -ne $LogonId ) {

					Return

				}

				$LogonType = [Int32]$EventMessage.ReplacementStrings[8]

				# Skip logon events that don't match the list of logon types.
				if ( $LogonType -notin $LogonTypes.Keys ) {

					Write-Verbose "Skipping ID $LogonId because it is Logon Type $LogonType"
					Return

				}
				
				$SessionLength = $SessionData.Time - $TimeGenerated
				$Logons.Remove($AccountName)

				[PSCustomObject]@{
					'Username'       = $AccountName
					'Logon Time'     = $TimeGenerated
					'Logoff Time'    = $SessionData.Time
					'Session Length' = $SessionLength
					'Logon Type'     = $LogonTypes.$LogonType
					'Logon ID'       = $LogonId
				} 

			}

		} 

	}

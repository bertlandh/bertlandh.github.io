---
layout: post
title: Windows Defender Threat Detection
description: Gather active and past malware threats that Windows Defender detected in the system using the built-in cmdlet `Get-MpThreatDetection` found in the defender module. By default the `Get-MpThreatDetection` command will generate no output if there is no active or history of threats. This isn't very helpful in generating reports since you'll have no output to generate any reports. Once deployed, utilize an eicar text file to generate a false positive and base your reports on that output.
date: 2021-09-07 14:00:00
hero_image: https://wikimediafoundation.org/wp-content/uploads/2021/09/WP20Symbols_Coatlicue-.png?resize=1024,802
image: https://wikimediafoundation.org/wp-content/uploads/2021/09/Cholas_en_el_Gran_Poder.jpg
hero_height: is-large
hero_darken: true
---

Gather active and past malware threats that Windows Defender detected in the system using the built-in cmdlet `Get-MpThreatDetection` found in the defender module. By default the `Get-MpThreatDetection` command will generate no output if there is no active or history of threats. This isn't very helpful in generating reports since you'll have no output to generate any reports. Once deployed, utilize an eicar text file to generate a false positive and base your reports on that output.

# Requirements

* Windows 10/Server 2016 or higher
* The Windows Defender service must be running


	if (-Not(Get-Command Get-MpThreatDetection -ErrorAction SilentlyContinue)) {
		throw "Unable to find Get-MpThreatDetection. Available on Windows 10/Server 2016 or higher"
	}

	$DefenderStatus = (Get-Service WinDefend -ErrorAction SilentlyContinue).Status

	if ($DefenderStatus -ne "Running") {
		throw "The Windows Defender service is not currently running"
	}

	Get-MpThreatDetection




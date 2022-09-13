---
layout: post
title: Powershell Windows Updates
description: A guide to powershell and windows updates using PSWindowsUpdate
date: 2022-09-12 16:45:00
hero_image: https://upload.wikimedia.org/wikipedia/commons/6/6b/PowerShell_Core_7.1.5_with_Windows_Terminal.png
image: https://upload.wikimedia.org/wikipedia/commons/3/3d/Kon-Boot_with_Automatic_Powershell_Script_Execution_feature.png
hero_height: is-large
hero_darken: true
---

## 1st: We need to install the PSWindowsUpdate module,
	[Net.ServicePointManager]::SecurityProtocol = [Net.SecurityProtocolType]::Tls12
	Install-PackageProvider -Name NuGet -MinimumVersion 2.8.5.201 -Force


## Step2: Job that silently installs C++ 2015-2019 runtime
	Your code goes here!

## Step3: Powershell
	[Net.ServicePointManager]::SecurityProtocol = [Net.SecurityProtocolType]::Tls12
	Install-Module PSWindowsUpdate -Force

	import-module PSWindowsUpdate -force
	get-wulist -microsoftupdate

	$GWU = Get-WuList -MicrosoftUpdate


## Step4: Install ALL available updates [no reboot]
	import-module PSWindowsUpdate -force
	get-wulist -microsoftupdate -acceptall -install -ignorereboot
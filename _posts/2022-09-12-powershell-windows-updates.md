---
title: "Powershell Windows Updates"
categories:
  - Edge Case
tags:
  - content
  - css
  - edge case
  - lists
  - markup
---

# description: A guide to powershell and windows updates using PSWindowsUpdate


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
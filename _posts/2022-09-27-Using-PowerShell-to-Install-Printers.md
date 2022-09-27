---
layout: post
title: Using PowerShell to Install Printers.
menubar_toc: true
show_sidebar: false
toc_title: Contents
subtitle: Using PowerShell to Install Printers.
description: Using PowerShell to Install Printers.
date: 2022-09-27 14:25:00
image: /img/2022-09-27-Using-PowerShell-to-Install-Printers-766-1200x800.jpg
hero_image: /img/2022-09-27-Using-PowerShell-to-Install-Printers-435-800x600.jpg
hero_height: is-large
hero_darken: true
---

# Installing any Printer with Just PowerShell

Let us take a look at what we need to do when we need to install a printer. It can get a little tricky here, and I will be honest with you, research into this contributed to 87.5%. We will need to manually do the things. I am assuming that you have gone to the printer vendor and got the drivers you need, and we are just using PowerShell to get them onto machines.


## Add Drivers
Adding Printer Drivers to the DriverStore
```powershell
pnputil.exe -i -a \\moafaicfs\Homefolders\bhope\core\Printers\HP_Color_LaserJet_Pro_MFP_M477fdw\*.inf
```


## Install Driver 
After adding a printer driver to the driver repository, you should install it:

```powershell
Add-PrinterDriver -Name "HP Color LaserJet Pro MFP M477 PCL-6"
```



## Create an IP port 
```powershell
$portName = "IP_192.168.3.9"
$checkPortExists = Get-Printerport -Name $portname -ErrorAction SilentlyContinue
if (-not $checkPortExists) {
Add-PrinterPort -name $portName -PrinterHostAddress "192.168.3.9"
}
```


## Install and Share
```powershell
Add-Printer -Name hp3027_Office1_Buh -DriverName "HP LaserJet 100 color MFP M175 PCL6" -PortName IP_192.168.2.15 -Shared -ShareName "hp3027_1_BUh" –Published
```


## Install 
```powershell
Add-Printer -Name HP_Color_LaserJet_Pro_MFP_M477_PROJECTS -DriverName "HP Color LaserJet Pro MFP M477 PCL-6" -PortName IP_192.168.3.9
```



## Rename Printer 
To rename the printer, just run the command:

```powershell
Rename-Printer -Name "hp3027_1_Buh" -NewName "hp3027_F1_Salary"
```



## Remove Printer 
How to Remove a Printer Using PowerShell?
To remove a printer, you need to run the following PowerShell command:

```powershell
Remove-Printer -Name "hp3027_L1_O1"
```


## Remove Driver 
You can remove a specific driver using the Remove-PrinterDriver cmdlet:
```powershell
Remove-PrinterDriver -Name "HP Universal Printing PCL 6"
```



## Set default printer

Windows 10 uses the latest printer that was used for printing as the default printer. If you want to use a fixed default printer, run the command:

```powershell
Set-ItemProperty -Path "HKCU:\SOFTWARE\Microsoft\Windows NT\CurrentVersion\Windows" -Name "LegacyDefaultPrinterMode" -Value 1 –Force
```


## To set the default printer, use the following commands:

```powershell
$wsnObj = New-Object -COM WScript.Network
$wsnObj.SetDefaultPrinter("HP_Color_LaserJet_Pro_MFP_M477_PROJECTS")
```





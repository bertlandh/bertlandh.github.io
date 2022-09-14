---
layout: post
title: Deploy Office 365 (for IT Pros)
description: A guide to powershell and windows updates using PSWindowsUpdate
date: 2022-09-13 16:30:00
hero_image: https://upload.wikimedia.org/wikipedia/commons/6/6b/PowerShell_Core_7.1.5_with_Windows_Terminal.png
image: https://upload.wikimedia.org/wikipedia/commons/3/3d/Kon-Boot_with_Automatic_Powershell_Script_Execution_feature.png
hero_height: is-large
hero_darken: true
---

Deploy Office 365 (for IT Pros)
  
To download 32bit office  
  
networkSharePath\office\Office365&gt; .\setup.exe /download Configuration-32.xml  
  
create a file save it as add the content below download Configuration-32.xml  
  
\<Configuration&gt;  
  \<Add OfficeClientEdition="32" Channel="Current" SourcePath="networkSharePath\office\Office365\86" AllowCdnFallback="FALSE"&gt;  
    \<Product ID="O365BusinessRetail"&gt;  
      \<Language ID="en-us" /&gt;  
    \</Product&gt;  
  \</Add&gt;  
  \<Property Name="SharedComputerLicensing" Value="0" /&gt;  
  \<Property Name="SCLCacheOverride" Value="0" /&gt;  
  \<Property Name="AUTOACTIVATE" Value="0" /&gt;  
  \<Property Name="FORCEAPPSHUTDOWN" Value="FALSE" /&gt;  
  \<Property Name="DeviceBasedLicensing" Value="0" /&gt;  
  \<Updates Enabled="TRUE" /&gt;  
  \<RemoveMSI /&gt;  
  \<Display Level="None" AcceptEULA="TRUE" /&gt;  
\</Configuration&gt;  
  
To Remove 32bit Office  
networkSharePath\office\Office365&gt; .\setup.exe /configure uninstall-Office365ProPlus-32.xml  
  
create a file save it as add the content below download uninstall-Office365ProPlus-32.xml  
\<Configuration&gt;  
\<Remove OfficeClientEdition="86"&gt;  
\<Product ID="O365BusinessRetail"&gt;  
\<Language ID="en-us"/&gt;  
\</Product&gt;  
\</Remove&gt;  
\<Display Level="None" AcceptEULA="TRUE"/&gt;  
\</Configuration&gt;  
  
To install 32bit  
networkSharePath\office\Office365&gt; .\setup.exe /configure Configuration-32.xml  
  
\<Configuration&gt;  
  \<Add OfficeClientEdition="32" Channel="Current" SourcePath="networkSharePath\office\Office365\86" AllowCdnFallback="FALSE"&gt;  
    \<Product ID="O365BusinessRetail"&gt;  
      \<Language ID="en-us" /&gt;  
    \</Product&gt;  
  \</Add&gt;  
  \<Property Name="SharedComputerLicensing" Value="0" /&gt;  
  \<Property Name="SCLCacheOverride" Value="0" /&gt;  
  \<Property Name="AUTOACTIVATE" Value="0" /&gt;  
  \<Property Name="FORCEAPPSHUTDOWN" Value="FALSE" /&gt;  
  \<Property Name="DeviceBasedLicensing" Value="0" /&gt;  
  \<Updates Enabled="TRUE" /&gt;  
  \<RemoveMSI /&gt;  
  \<Display Level="None" AcceptEULA="TRUE" /&gt;  
\</Configuration&gt; 
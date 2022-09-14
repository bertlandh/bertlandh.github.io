---
layout: post
title: Deploy Office 365 (for IT Pros)
description: The Office Deployment Tool (ODT) is a command-line tool that you can use to download and deploy Microsoft 365 Apps to your client computers. The ODT gives you more control over an Office installation: you can define which products and languages are installed, how those products should be updated, and whether or not to display the install experience to your users.
date: 2022-09-13 16:30:00
hero_image: https://picsum.photos/1200/800
image: https://picsum.photos/200/300
hero_height: is-large
hero_darken: true
---

# Deploy Office 365 (for IT Pros)
  
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
  
Get More Help below  
\<!-- [https://docs.microsoft.com/en-us/deployoffice/overview-office-deployment-tool](https://docs.microsoft.com/en-us/deployoffice/overview-office-deployment-tool) --&gt;  


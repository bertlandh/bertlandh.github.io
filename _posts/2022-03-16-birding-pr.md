---
layout: post
title: PowerShell
description: Installing PowerShell on Windows
date: 2022-02-17 18:00:00
hero_image: /img/humacao_beach.jpg
image: /img/pearly_eyed_thrush.jpg
hero_height: is-large
hero_darken: true
---


There are multiple ways to install PowerShell in Windows. Each install method is designed to support different scenarios and workflows. Choose the method that best suits your needs.  
>- [Winget](https://docs.microsoft.com/en-us/powershell/scripting/install/installing-powershell-on-windows?view=powershell-7.2#winget) - Recommended way to install PowerShell on Windows clients  
>- [MSI package](https://docs.microsoft.com/en-us/powershell/scripting/install/installing-powershell-on-windows?view=powershell-7.2#msi) - Best choice for Windows Servers and enterprise deployment scenarios  
>- [ZIP package](https://docs.microsoft.com/en-us/powershell/scripting/install/installing-powershell-on-windows?view=powershell-7.2#zip) - Easiest way to "side load" or install multiple versions  
>>- Use this method for Windows Nano Server, Windows IoT, and Arm-based systems  
  
>- [.NET Global tool](https://docs.microsoft.com/en-us/powershell/scripting/install/installing-powershell-on-windows?view=powershell-7.2#dotnet) - A good choice for .NET developers that install and use other global tools  
>- [Microsoft Store package](https://docs.microsoft.com/en-us/powershell/scripting/install/installing-powershell-on-windows?view=powershell-7.2#msstore) - An easy way to install for casual users of PowerShell but has limitations  
  
Note  
The installation commands in this article are for the latest stable release of PowerShell. To install a different version of PowerShell, adjust the command to match the version you need. The following links direct you to the release page for each version in the PowerShell repository on GitHub.  
>- Stable release: [https://aka.ms/powershell-release?tag=stable](https://aka.ms/powershell-release?tag=stable)  
>- LTS release: [https://aka.ms/powershell-release?tag=lts](https://aka.ms/powershell-release?tag=lts)  
>- Preview release: [https://aka.ms/powershell-release?tag=preview](https://aka.ms/powershell-release?tag=preview)  
  
Download links for every package are found in the **Assets** section of the Release page. The **Assets** section may be collapsed, so you may need to click to expand it.  
**Install PowerShell using Winget (recommended)**  
Winget, the Windows Package Manager, is a command-line tool enables users to discover, install, upgrade, remove, and configure applications on Windows client computers. This tool is the client interface to the Windows Package Manager service. The winget command-line tool is bundled with Windows 11 and modern versions of Windows 10 by default as the **App Installer**.  
Note  
See the [winget documentation](https://docs.microsoft.com/en-us/windows/package-manager/winget) for a list of system requirements and install instructions. Winget does not currently run on Windows servers.  
The following commands can be used to install PowerShell using the published winget packages:  
Search for the latest version of PowerShell  
PowerShell  
winget search Microsoft.PowerShell  
Output  
Name               Id                           Version Source  
---------------------------------------------------------------  
PowerShell         Microsoft.PowerShell         7.2.6.0 winget  
PowerShell Preview Microsoft.PowerShell.Preview 7.3.0.6 winget  
Install PowerShell or PowerShell Preview using the id parameter  
PowerShell  
winget install --idMicrosoft.Powershell --sourcewinget  
winget install --idMicrosoft.Powershell.Preview --sourcewinget  

**Installing the MSI package**  
To install PowerShell on Windows, use the following links to download the install package from GitHub.  
>- [PowerShell-7.2.6-win-x64.msi](https://github.com/PowerShell/PowerShell/releases/download/v7.2.6/PowerShell-7.2.6-win-x64.msi)  
>- [PowerShell-7.2.6-win-x86.msi](https://github.com/PowerShell/PowerShell/releases/download/v7.2.6/PowerShell-7.2.6-win-x86.msi)  
  
Once downloaded, double-click the installer file and follow the prompts.  
The installer creates a shortcut in the Windows Start Menu.  
>- By default the package is installed to $env:ProgramFiles\PowerShell\\<version&gt;  
>- You can launch PowerShell via the Start Menu or $env:ProgramFiles\PowerShell\\<version&gt;\pwsh.exe  
  
Note  
PowerShell 7.2 installs to a new directory and runs side-by-side with Windows PowerShell 5.1. PowerShell 7.2 is an in-place upgrade that replaces PowerShell 7.0 and lower.  
>- PowerShell 7.2 is installed to $env:ProgramFiles\PowerShell\7  
>- The $env:ProgramFiles\PowerShell\7 folder is added to $env:PATH  
>- Folders for previously released versions are deleted  
  
If you need to run PowerShell 7.2 side-by-side with other versions, use the [ZIP install](https://docs.microsoft.com/en-us/powershell/scripting/install/installing-powershell-on-windows?view=powershell-7.2#zip) method to install the other version to a different folder.  

**Support for Microsoft Update in PowerShell 7.2**  
PowerShell 7.2 has support for Microsoft Update. When you enable this feature, you'll get the latest PowerShell 7 updates in your traditional Microsoft Update (MU) management flow, whether that's with Windows Update for Business, WSUS, Microsoft Endpoint Configuration Manager, or the interactive MU dialog in Settings.  
The PowerShell 7.2 MSI package includes following command-line options:  
>- USE_MU - This property has two possible values:  
>>- 1 (default) - Opts into updating through Microsoft Update, WSUS, or Configuration Manager  
>>- 0 - Do not opt into updating through Microsoft Update, WSUS, or Configuration Manager  
  
>- ENABLE_MU  
>>- 1 (default) - Opts into using Microsoft Update for Automatic Updates  
>>- 0 - Do not opt into using Microsoft Update  
  
  
Note  
Enabling updates may have been set in a previous installation or manual configuration. Using ENABLE_MU=0 does not remove the existing settings. Also, this setting can be overruled by Group Policy settings controlled by your administrator.  
For more information, see the [PowerShell Microsoft Update FAQ](https://docs.microsoft.com/en-us/powershell/scripting/install/microsoft-update-faq?view=powershell-7.2).  

**Install the MSI package from the command line**  
MSI packages can be installed from the command line allowing administrators to deploy packages without user interaction. The MSI package includes the following properties to control the installation options:  
>- ADD_EXPLORER_CONTEXT_MENU_OPENPOWERSHELL - This property controls the option for adding the Open PowerShell item to the context menu in Windows Explorer.  
>- ADD_FILE_CONTEXT_MENU_RUNPOWERSHELL - This property controls the option for adding the Run with PowerShell item to the context menu in Windows Explorer.  
>- ENABLE_PSREMOTING - This property controls the option for enabling PowerShell remoting during installation.  
>- REGISTER_MANIFEST - This property controls the option for registering the Windows Event Logging manifest.  
>- ADD_PATH - This property controls the option for adding PowerShell to the Windows PATH environment variable.  
  
The following example shows how to silently install PowerShell with all the install options enabled.  
PowerShell  
msiexec.exe /package PowerShell-7.2.6-win-x64.msi /quiet ADD_EXPLORER_CONTEXT_MENU_OPENPOWERSHELL=1ADD_FILE_CONTEXT_MENU_RUNPOWERSHELL=1ENABLE_PSREMOTING=1REGISTER_MANIFEST=1USE_MU=1ENABLE_MU=1ADD_PATH=1  
For a full list of command-line options for Msiexec.exe, see [Command line options](https://docs.microsoft.com/en-us/windows/desktop/Msi/command-line-options).  
**Installing the ZIP package**  
PowerShell binary ZIP archives are provided to enable advanced deployment scenarios. Download one of the following ZIP archives from the [current release](https://aka.ms/powershell-release?tag=stable) page.  
>- [PowerShell-7.2.6-win-x64.zip](https://github.com/PowerShell/PowerShell/releases/download/v7.2.6/PowerShell-7.2.6-win-x64.zip)  
>- [PowerShell-7.2.6-win-x86.zip](https://github.com/PowerShell/PowerShell/releases/download/v7.2.6/PowerShell-7.2.6-win-x86.zip)  
>- [PowerShell-7.2.6-win-arm64.zip](https://github.com/PowerShell/PowerShell/releases/download/v7.2.6/PowerShell-7.2.6-win-arm64.zip)  
  
Depending on how you download the file you may need to unblock the file using the Unblock-File cmdlet. Unzip the contents to the location of your choice and run pwsh.exe from there. Unlike installing the MSI packages, installing the ZIP archive doesn't check for prerequisites. For remoting over WSMan to work properly, ensure that you've met the [prerequisites](https://docs.microsoft.com/en-us/powershell/scripting/install/installing-powershell-on-windows?view=powershell-7.2#powershell-remoting).  
Use this method to install the ARM-based version of PowerShell on computers like the Microsoft Surface Pro X. For best results, install PowerShell to the to $env:ProgramFiles\PowerShell\7 folder.  

**Install as a .NET Global tool**  
If you already have the [.NET Core SDK](https://docs.microsoft.com/en-us/dotnet/core/sdk) installed, you can install PowerShell as a <a href="https://docs.microsoft.com/en-us/dotnet/core/tools/global-tools">.NET Global tool</a>.  
  
dotnet tool install --global PowerShell  
The dotnet tool installer adds $env:USERPROFILE\.dotnet\tools to your $env:PATH environment variable. However, the currently running shell doesn't have the updated $env:PATH. You can start PowerShell from a new shell by typing pwsh.  

**Installing from the Microsoft Store**  
PowerShell 7.2 can be installed from the Microsoft Store. You can find the PowerShell release in the [Microsoft Store](https://www.microsoft.com/store/apps/9MZ1SNWT0N5D) site or in the Store application in Windows.  
Benefits of the Microsoft Store package:  
>- Automatic updates built right into Windows  
>- Integrates with other software distribution mechanisms like Intune and Configuration Manager  
>- Can install on Windows systems using x86, x64, or Arm64 processors  
  
**Known limitations**  
By default, Windows Store packages run in an application sandbox that virtualizes access to some filesystem and registry locations. Changes to virtualized file and registry locations do not persist outside of the application sandbox.  
This sandbox all blocks any changes to the application's root folder. Any system-level configuration settings stored in $PSHOME cannot be modified. This includes the WSMAN configuration. This prevents remote sessions from connecting to Store-based installs of PowerShell. User-level configurations and SSH remoting are supported.  
The following commands need write to $PSHOME. These commands are not supported in a Microsoft Store instance of PowerShell.  
>- Register-PSSessionConfiguration  
>- Update-Help -Scope AllUsers  
>- Enable-ExperimentalFeature -Scope AllUsers  
>- Set-ExecutionPolicy -Scope LocalMachine  
  
For more information, see [Understanding how packaged desktop apps run on Windows](https://docs.microsoft.com/en-us/windows/msix/desktop/desktop-to-uwp-behind-the-scenes).  
  
*From \<[https://docs.microsoft.com/en-us/powershell/scripting/install/installing-powershell-on-windows?view=powershell-7.2#zip](https://docs.microsoft.com/en-us/powershell/scripting/install/installing-powershell-on-windows?view=powershell-7.2#zip)&gt;*  


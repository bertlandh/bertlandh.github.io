---
layout: post
title: Oacle VirtualBox vboxmanage Powershell.
menubar_toc: true
show_sidebar: false
toc_title: Contents
subtitle: VBoxManage is the command-line interface to Oracle VM VirtualBox.
description: VBoxManage is the command-line interface to Oracle VM VirtualBox.
date: 2022-09-16 16:30:00
image: /img/2022-09-16-oracle-virtualbox-vboxmanage-powershell-594-1200x800.jpg
hero_image: /img/2022-09-16-oracle-virtualbox-vboxmanage-powershell-770-800x600.jpg
hero_height: is-large
hero_darken: true
---

Oracle's VirtualBox

VBoxManage is the command-line interface to Oracle VM VirtualBox.

## . .\1variables.ps1

```powershell
#
# Add Virtual Box bin-path to PATH environment variable if necessary:
#
if ( (get-command VBoxManage.exe -errorAction silentlyContinue) -eq $null) {
   $env:path="C:\Program Files\Oracle\VirtualBox;$env:path"
}


$createvmName = 'win10clinet' 
$createvmOstype = 'Windows10_64' 
$createvmBasefolder = 'C:\data\vm' 
$storageattachDvddriveMedium = '..\..\repo\iso\unattended_X21-67510WIN10.iso'



$createmediumFilename = $createvmBasefolder +"\" +$createvmName +"\" + $createvmName +".vdi"
$createmediumSize = 15360

$storageattachHddMedium = $createmediumFilename
#$storageattachDvddriveMedium = '..\repo\iso\X21-30350MSSERVER2016.ISO'

$vmName=$createvmName
$vmPath="$createvmBasefolder\$vmName"

#
#  Default user name is vboxuser
#
$userName='tq84'
$fullUserName='Tee Queue Eighty-Four'

#
#  Default password is changeme
#
$password='theSecret'

#
#  Location of the isoFile
#
$isoFile= $storageattachDvddriveMedium

#
#  Size of harddisk in megabytes:
#
$hdSizeMb = $createmediumSize

#
#  Path of shared folder
#
#$sharedFolder = "$pwd\sharedFolder"
$sharedFolder = "$vmPath\sharedFolder"
```



## . .\2remove-vm.ps1

```powershell
VBoxManage controlvm $vmName poweroff
VBoxManage unregistervm $vmName --delete
rmdir -recurse $vmPath
rmdir -recurse $sharedFolder
```



## . .\3detect.ps1

```powershell
VBoxManage.exe unattended detect --iso=$isoFile
```



## . .\4createvm.ps1

```powershell
$osType = 'Windows10_64' # A Windows 10 installation!
# $osType = 'WindowsNT_64' # An «other» Windows installation

VBoxManage createvm --name $vmName --ostype $osType --basefolder $createvmBasefolder --register

#VBoxManage createvm --name $createvmName --ostype $createvmOstype --basefolder $createvmBasefolder --register


if (! (test-path $vmPath\$vmName.vbox)) {
   echo "I expected a .vbox"
   return
}
```


## . .\5create-hd.ps1

```powershell
#VBoxManage createmedium --filename $vmPath\hard-drive.vdi --size $hdSizeMb
VBoxManage createmedium --filename $createmediumFilename --size $createmediumSize

if (! (test-path $createmediumFilename)) {
#if (! (test-path $vmPath\hard-drive.vdi)) {
   echo "I expected a .vdi"
   return
}
```


## . .\6create-sata.ps1

```powershell
# VBoxManage storagectl    $vmName --name       'SATA Controller' --add sata --controller IntelAHCI
# VBoxManage storageattach $vmName --storagectl 'SATA Controller' --port 0 --device 0 --type hdd --medium $vmPath/hard-drive.vdi

VBoxManage storagectl    $vmName --name       'SATA Controller' --add sata --controller IntelAHCI
VBoxManage storageattach $vmName --storagectl 'SATA Controller' --port 0 --device 0 --type hdd --medium $storageattachHddMedium
```


## . .\7create-ide.ps1

```powershell
VBoxManage storagectl    $vmName --name       'IDE Controller' --add ide
VBoxManage storageattach $vmName --storagectl 'IDE Controller' --port 0 --device 0 --type dvddrive --medium $isoFile
```


## . .\8enable-apic.ps1

```powershell
VBoxManage modifyvm $vmName --ioapic on
```



## . .\9boot-device-order.ps1

```powershell
VBoxManage modifyvm $vmName --boot1 dvd --boot2 disk --boot3 none --boot4 none
```


## . .\10allocate-memory.ps1
```powershell
VBoxManage modifyvm $vmName --memory 4096 --vram 128
```

## . .\11prepare-shared-folder.ps1

```powershell
$null = mkdir $sharedFolder
VBoxManage sharedfolder add $vmName --name shr --hostpath $sharedFolder --automount
```



## . .\12clipboard-mode.ps1

```powershell
VBoxManage modifyvm  $vmName --clipboard-mode bidirectional
```


## . .\13vboxsvga.ps1

```powershell
VBoxManage modifyvm  $vmName --graphicscontroller vboxsvga
```


## . .\14install.ps1

```powershell
VBoxManage unattended install $vmName      `
  --iso=$isoFile                           `
  --user=$userName                         `
  --password=$password                     `
  --full-user-name=$fullUserName           `
  --install-additions                      `
  --time-zone=CET                          `
  --post-install-command='VBoxControl guestproperty set installation_finished y'
```


## . .\15list-vms.ps1

```powershell
VBoxManage list vms
```



## . .\16remove-menues.ps1

```powershell
VBoxManage setextradata $vmName GUI/RestrictedRuntimeMenus ALL
```



## . .\17set-firmware.ps1

```powershell
VBoxManage modifyvm $vmName --firmware efi
```


## . .\18start-vm.ps1

```powershell
VBoxManage startvm $vmName
```



## . .\19video-mode-hint.ps1

```powershell
VBoxManage controlvm $vmName setvideomodehint 1200 900  32
```



## . .\20wait-for-finished-installation.ps1

```powershell
VBoxManage guestproperty wait $vmName installation_finished
```




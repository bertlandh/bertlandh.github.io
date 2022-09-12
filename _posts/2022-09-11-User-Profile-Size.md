

Recursively scans every folder in `C:\Users`, then adds up the size of every file to get an approximate size for every user's profile.

This scanner may take a while to run!

	$ErrorActionPreference = "SilentlyContinue"

	$UserFolders = Get-ChildItem -Path "C:\Users" -Force -Directory

	ForEach ( $Folder in $UserFolders ) {

		[UInt64]$FolderSize = ( Get-Childitem -Path $Folder.FullName -Force -Recurse | Measure-Object -Property "Length" -Sum ).Sum
		
		[PSCustomObject]@{
			FolderName    = $Folder.BaseName
			FolderPath    = $Folder.FullName
			Size          = $FolderSize
		}

	}
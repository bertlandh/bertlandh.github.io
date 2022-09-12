


Installs the PSWindowsUpdate module, then runs the following cmdlets:
* Get-WULastResults
* Get-WURebootStatus

	& '.\Install and Import Module.ps1' -ModuleName "PSWindowsUpdate"

	# Store results in a temp variable
	$lastResults = Get-WULastResults

	#organize results in a PSCustomObject
	[PSCustomObject]@{
		LastInstallationDate = [DateTime] $lastResults.LastInstallationSuccessDate
		LastScanSuccessDate  = [DateTime] $lastResults.LastSearchSuccessDate
		IsPendingReboot      = [Bool] (Get-WURebootStatus -Silent)
	}
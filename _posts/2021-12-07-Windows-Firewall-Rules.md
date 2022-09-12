



This scanner returns Windows Firewall Rule information. Requires Windows Server 2012/Windows 8 or higher.

## Parameters

```powershell
-Enabled
```

Returns only enabled rules if used.


	[cmdletBinding()]
	param(
		[parameter()]
		[switch]
		$Enabled
	)

	process {
		
		if ([version](Get-CimInstance Win32_OperatingSystem).Version -lt 6.3.0) {
			throw "This scanner is only available on Server 2012/Windows 8 or higher"
		}
		
		$Properties = @(
			"Name"
			"DisplayName"
			"Description"
			"Profile"
			"Direction"
			"Action"
		)

		switch ($Enabled) {
			$true {
				Get-NetFirewallRule -PolicyStore ActiveStore -PolicyStoreSourceType GroupPolicy,Local -Enabled True | Select-Object $Properties
			}
			$false {
				$Properties += @{Name = "Enabled"; Expression = { [System.Convert]::ToBoolean([String]$_.Enabled) } }
				Get-NetFirewallRule -PolicyStore ActiveStore -PolicyStoreSourceType GroupPolicy,Local | Select-Object $Properties
			}
		}

	}
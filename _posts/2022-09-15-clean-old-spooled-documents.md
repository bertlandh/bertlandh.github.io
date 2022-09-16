---
layout: post
title: Clean old spooled documents.
menubar_toc: true
show_sidebar: false
toc_title: Contents
subtitle: Flushes the Windows printer queue when it's full and stuck. Can now handle all Windows date formats.
description: This script will delete old spooled documents that are stuck in queue. By default time is 2 hours old, but you could adjust it via $Date variable.
date: 2022-09-15 16:30:00
image: /img/2022-09-15-clean-old-spooled-documents-475-1200x800.jpg
hero_image: /img/2022-09-15-clean-old-spooled-documents-47-800x600.jpg
hero_height: is-large
hero_darken: true
---


## Requirements:  
Must run as administrator

## Batch File Execution
```dos
echo Stopping print spooler.
echo.
net stop spooler
echo Deleting old print jobs...
echo.
FOR %%i IN (%systemroot%\system32\spool\printers\*.*) DO DEL %%i
echo Starting print spooler.
echo.
net start spooler
```
    

## PowerShell Execution
```powershell
$Date = (Get-Date).AddHours(-2)

Stop-Service spooler
Sleep 5
Get-ChildItem -Path "C:\Windows\System32\spool\PRINTERS" | Where-Object { $_.LastWriteTime -lt $Date } | Remove-Item -Verbose
Start-Service spooler
```


---
layout: post
title: Batch Commands
description: One liner commands for windows cheat sheet
date: 2022-09-11 17:30:00
hero_image: https://upload.wikimedia.org/wikipedia/commons/1/1d/ReactOS-0.4.13_choice_command_667x434.png
image: https://upload.wikimedia.org/wikipedia/commons/2/29/Linux_command-line._Bash._GNOME_Terminal._screenshot.png
hero_height: is-large
hero_darken: true
show_sidebar: false
toc: true
toc_title: Batch Commands
---

## BATCH: Get the date into ISO 8601 standard date format (yyyy-mm-dd) and store it in the "CUR_DATE" variable
FOR /f %%a in ('WMIC OS GET LocalDateTime ^| find "."') DO set DTS=%%a
set CUR_DATE=%DTS:~0,4%-%DTS:~4,2%-%DTS:~6,2%

## BATCH: Identify Windows operating system version and store it in the "WIN_VER" variable
## Thanks to UJSTech for this ( http://community.spiceworks.com/topic/post/2898378 )
for /f "tokens=3*" %%i IN ('reg query "HKLM\SOFTWARE\Microsoft\Windows NT\CurrentVersion" /v ProductName ^| Find "ProductName"') DO set WIN_VER=%%i %%j

## Example Windows version of above command & returned string:
   Windows XP Professional SP3:     Microsoft Windows XP
   Windows Server 2003 Enterprise:  Microsoft Windows Server 2003
   Windows Vista Home Premium:      Windows Vista (TM) Home Premium
   Windows Vista Ultimate:          Windows Vista (TM) Ultimate
   Windows 7 Home Premium:          Windows 7 Home Premium
   Windows 7 Professional:          Windows 7 Professional
   Windows 7 Enterprise:            Windows 7 Enterprise
   Windows 7 Starter:               Windows 7 Starter
   Windows 8.1 Professional:        Windows 8.1 Pro
   Windows Server 2008 R2 Standard: Windows Server 2008 R2 Standard
   Windows Server 2012 R2 Standard: Windows Server 2012 R2 Standard
   Windows 10 Professional:         Windows 10 Pro

 
## BATCH: Check SMART status of all disks with title, index, caption and status
wmic diskdrive get Availability,Index,Caption,Status

## BATCH: Install global shared printer (system-wide)
rundll32 printui.dll,PrintUIEntry /ga /n "\\SERVER\PRINTER"

## BATCH: Show IPCONFIG output for only a single adapter (long version first, short version second)
netsh interface ip show addresses eth0
netsh int ip sh ad eth0

## BATCH: Add static route to the host 192.168.1.83 via the gateway of 172.16.1.1, on interface #11, and persist across reboots (-p)
route add 192.168.1.83 mask 255.255.255.255 172.16.1.1 metric 31 if 11 -p

## BATCH: Add static route to the 192.168.1.0/24 subnet via the gateway of 172.16.1.1, on interface #11, and persist across reboots (-p)
route add 192.168.1.0 mask 255.255.255.0 172.16.1.1 metric 31 if 11 -p

## BATCH: Flush all static routes; active, takes effect immediately:
route -f
## BATCH: Flush all static routes; persistent routes only, takes effect at reboot:
reg delete HKLM\SYSTEM\CurrentControlSet\Services\Tcpip\Parameters\PersistentRoutes /va /f

## BATCH: Kill all browsers
taskkill /f /im iexplore.exe /im firefox.exe /im chrome.exe /im palemoon.exe /im opera.exe

## BATCH: Kill Firefox
wmic process where name="firefox.exe" call terminate

## BATCH: Get list of ALL installed products
wmic product get identifyingnumber,name,version /all
wmic product get name, vendor, version /all

## BATCH: Find out if .NET 3.5 is installed
reg query "HKLM\SOFTWARE\Microsoft\NET Framework Setup\NDP\v3.5"| findstr Install

## BATCH: Remotely get installed version of Firefox on all domain computers
psexec \\* cmd /c (cd "C:\Program Files (x86)\Mozilla Firefox\" ^& firefox -v ^| more)

## BATCH: Uninstall programs, various examples
## BATCH: /nointeractive doesn't prompt user to remove the program
wmic product where description="Symantec" uninstall
wmic product where name="Symantec" uninstall
wmic product where version='65.39.83' uninstall

## BATCH: Uninstall programs using wildcards
wmic product where "name like 'java%%Runtime%%'" uninstall /nointeractive
wmic product where "name like 'java%%platform%%'" uninstall /nointeractive
wmic product where "name like 'java%%tm%%'" uninstall /nointeractive

## BATCH: Remove ALL "Microsoft Visual C++ Redistributable" runtimes.
wmic product where "name like 'Microsoft Visual C%%'" call uninstall /nointeractive

## BATCH: Remotely determine logged in user
wmic /node:remotecomputer computersystem get username

## BATCH: List running processes
wmic process list brief

## BATCH: Kill a process
wmic process where name="cmd.exe" delete

## BATCH: Determine open shares
net share
wmic share list brief

## BATCH: Display remote machines MAC address
wmic /node:machinename nic get macaddress

## BATCH: List remote systems running processes every second
wmic /node:machinename process list brief /every:1

## BATCH: Display remote systems System Info
wmic /node:machinename computersystem list full

## BATCH: Disk drive information
wmic diskdrive list full
wmic partition list full

## BATCH: BIOS info
wmic bios list full

## BATCH: Get system model number
wmic csproduct get name

## BATCH: Get system serial number
wmic product get serialnumber

## BATCH: Get hard drive physical serial numbers (first option gives serial number printed on the hard drive case). Last one gets it from a remote system
wmic path win32_physicalmedia get SerialNumber
wmic diskdrive get serialnumber,name,description
wmic /node:REMOTE-COMPUTER-NAME bios get serialnumber

## BATCH: Create a single folder for every day in the year
for %%m in (01,02,03,04,05,06,07,08,09,10,11,12) do for %%d in (01,02,03,04,05,06,07,08,09,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31) do mkdir "2018-%%m-%%d"
for %%m in (04,06,09,11) do rmdir /s /q "2018-%%m-31"
for %%d in (29,30,31) do rmdir /s /q "2018-02-%%d"

## BATCH: List all installed Microsoft hotfixes/patches
wmic qfe

## BATCH: Look for a particular patch
wmic qfe where hotfixid="KB958644" list full

## BATCH: Remotely List Local Enabled Accounts and Disabled domain accounts
wmic /node:<remote computer name> USERACCOUNT WHERE "Disabled=0 AND LocalAccount=1" GET Name
wmic /node:<remote computer name> USERACCOUNT WHERE "Disabled=1 AND LocalAccount=0" GET Name

## BATCH: Start a service remotely
wmic /node:machinename 4 service lanmanserver CALL Startservice
sc \\machinename start lanmanserver

## BATCH: List services
wmic service list brief
sc \\machinename query

## BATCH: Disable startup service
sc config example disabled

## BATCH: List user accounts
wmic useraccount list brief

## BATCH: Enable RDP remotely
wmic /node:"machinename 4" path Win32_TerminalServiceSetting where AllowTSConnections=0" call SetAllowTSConnections 1"

## BATCH: List number of times a user logged on
wmic netlogin where (name like "%%Admin%%") get numberoflogons

## BATCH: Query active RDP sessions
qwinsta /server:192.168.1.1

## BATCH: Remove active RDP session ID 2
rwinsta /server:192.168.1.1 2

## BATCH: Remotely query registry for last logged in user
reg query "\\computername\HKLM\SOFTWARE\Microsoft\Windows NT\CurrentVersion\WinLogon" /v DefaultUserName

## BATCH: List all computers in domain "blah" (limited to first 6000 results); dump the output in "output.txt"
dsquery computer "OU=example,DC=blah" -o rdn -limit 6000 &gt; output.txt

## BATCH: Reboot immediately
shutdown /r /t 0

## BATCH: Shutdown
shutdown /s /t 0

## BATCH: Remotely reboot machine
shutdown /m \\192.168.1.1 /r /t 0 /f

## BATCH: Copy entire folder and its contents from a remote source to local machine
xcopy /s \\remotecomputer\directory c:\local

## BATCH: Find location of file with string "blah" in file name
dir c:\ /s /b | find "blah"

## BATCH: Determine name of a machine with known IP
nbtstat -A 192.168.1.1

## BATCH: Find directory named blah
dir c:\ /s /b /ad | find "blah"

## BATCH: Command line history
F7

## BATCH: Determine the current user (aka whoami Linux equivalent)
echo %USERNAME%

## BATCH: Determine who is apart of the administrators group
net localgroup administrators

## BATCH: Add a user where travis is the username and password is blah
net user travis blah /add

## BATCH: Add user travis to administrators group
net localgroup administrators travis /add

## BATCH: List user accounts
net user

## BATCH: Map a network share with a given drive letter of T:
net use T: \\serverNameOrIP\shareName

## BATCH: List network connections and the programs that are making those connections
netstat -nba

## BATCH: Display contents of file text.txt
type text.txt

## BATCH: Determine PC name
hostname

## BATCH: Run cmd.exe as administrator user
runas /user:administrator cmd

## BATCH: Determine whether a system is 32 or 64 bit
wmic cpu get DataWidth /format:list

## BATCH: Information about OS version and other useful system information
systeminformation

## BATCH: Startup applications
wmic startup get caption,command

## BATCH: Recursively unzip all zip folders, you'll need unzip.exe for this
FOR /R %a (*.zip) do unzip -d unzipDir "%a"

## BATCH: Variable extraction
Syntax
      %variable:~num_chars_to_skip%
      %variable:~num_chars_to_skip,num_chars_to_keep%

This can include negative numbers:

      %variable:~num_chars_to_skip,-num_chars_to_keep%
      %variable:~-num_chars_to_skip,num_chars_to_keep%
      %variable:~-num_chars_to_skip,-num_chars_to_keep%

## BATCH: Start at the first character of a variable (reading left-to-right, position 0, AKA the left-most character) and echo 5 characters starting from there. This command will output 'abcde'
set ALPHABET=abcdefghijklmnopqrstuvwxyz
echo %ALPHABET:~0,5%
abcde

## BATCH: Start at the fifth character of a variable (reading left-to-right) and echo 3 characters starting from there. This command will output 'fgh'
set ALPHABET=abcdefghijklmnopqrstuvwxyz
echo %ALPHABET:~5,3%
fgh

## BATCH: Start at the first character of a variable (reading left-to-right, position 0, AKA the left-most character) and echo all characters EXCEPT omit the last 2 characters. This command will output 'abcdefghijklmnopqrstuvwxyz'
set ALPHABET=abcdefghijklmnopqrstuvwxyz
echo %ALPHABET:~0,-2%
abcdefghijklmnopqrstuvwxyz

## BATCH: Find all files bigger than 100MB starting at C:\
forfiles /P C:\ /S /M * /C "cmd /c if @fsize GEQ 104857600 echo @path"

## BATCH: Find all files bigger than 1GB starting at C:\
forfiles /P C:\ /S /M * /C "cmd /c if @fsize GEQ 1073741824 echo @path"

## BATCH: Find all files greater than 200MB and modified since 01/17/2016
forfiles /P D:\ /M *.* /S /D +"01/17/2016" /C "cmd /c if @fsize gtr 209715200 echo @path @fsize @fdate @ftime"
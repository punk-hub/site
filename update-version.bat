@echo off
echo Current version:
type version.txt
echo.
set /p newversion=Enter new version: 
echo %newversion% > version.txt
echo Version updated to %newversion%
echo.
echo Don't forget to update the version numbers in your HTML files!
pause

@echo off
echo Copying setup files to their respective directories...

REM Check if git is available
git --version >nul 2>&1
if %errorlevel% neq 0 (
    echo WARNING: Git is not installed or not available in PATH
    echo Please install Git and ensure it's in your PATH to use submodules
    echo Continuing with file copying only...
    echo.
) else (
    echo Git detected, initializing and updating submodules...
    git submodule update --init --recursive
    if %errorlevel% neq 0 (
        echo WARNING: Failed to update submodules
        echo Please check your Git configuration and try again
        echo.
    ) else (
        echo Submodules updated successfully!
        echo.
    )
)

REM Create directories if they don't exist
if not exist "data\" mkdir "data\"
if not exist "logs\" mkdir "logs\"
if not exist "d2bs\" mkdir "d2bs\"

REM Copy JSON files to data directory
if exist "+setup\cdkeys.json" copy "+setup\cdkeys.json" "data\" >nul
if exist "+setup\patch.json" copy "+setup\patch.json" "data\" >nul
if exist "+setup\profile.json" copy "+setup\profile.json" "data\" >nul
if exist "+setup\schedules.json" copy "+setup\schedules.json" "data\" >nul
if exist "+setup\server.json" copy "+setup\server.json" "data\" >nul

REM Copy log files to logs directory
if exist "+setup\Console.rtf" copy "+setup\Console.rtf" "logs\" >nul
if exist "+setup\exceptions.log" copy "+setup\exceptions.log" "logs\" >nul
if exist "+setup\keyinfo.log" copy "+setup\keyinfo.log" "logs\" >nul

REM Copy ini file to d2bs directory
if exist "+setup\d2bs.ini" copy "+setup\d2bs.ini" "d2bs\" >nul

echo Setup files copied successfully!
pause
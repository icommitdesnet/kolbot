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

REM Set base directories
set "SETUP_DIR=+setup"
set "DATA_DIR=data"
set "LOGS_DIR=logs"
set "D2BS_DIR=d2bs"
set "STARTER_DIR=d2bs\kolbot\libs\starter"
set "SYSTEMS_DIR=d2bs\kolbot\libs\systems"
set "CONFIG_DIR=d2bs\kolbot\libs\config"

REM Create directories if they don't exist
if not exist "%DATA_DIR%\" mkdir "%DATA_DIR%"
if not exist "%LOGS_DIR%\" mkdir "%LOGS_DIR%"
if not exist "%D2BS_DIR%\" mkdir "%D2BS_DIR%"
if not exist "%STARTER_DIR%\" mkdir "%STARTER_DIR%"
if not exist "%SYSTEMS_DIR%\automule\config\" mkdir "%SYSTEMS_DIR%\automule\config"
if not exist "%SYSTEMS_DIR%\channel\" mkdir "%SYSTEMS_DIR%\channel"
if not exist "%SYSTEMS_DIR%\cleaner\" mkdir "%SYSTEMS_DIR%\cleaner"
if not exist "%SYSTEMS_DIR%\crafting\" mkdir "%SYSTEMS_DIR%\crafting"
if not exist "%SYSTEMS_DIR%\follow\" mkdir "%SYSTEMS_DIR%\follow"
if not exist "%SYSTEMS_DIR%\gambling\" mkdir "%SYSTEMS_DIR%\gambling"
if not exist "%SYSTEMS_DIR%\mulelogger\" mkdir "%SYSTEMS_DIR%\mulelogger"
if not exist "%SYSTEMS_DIR%\pubjoin\" mkdir "%SYSTEMS_DIR%\pubjoin"
if not exist "%SYSTEMS_DIR%\torch\" mkdir "%SYSTEMS_DIR%\torch"

REM Function to copy file if it doesn't exist
REM Usage: call :CopyIfNotExists "source" "destination" "description"
goto :main

:CopyIfNotExists
if exist "%~1" (
    if not exist "%~2" (
        copy "%~1" "%~2" >nul
        echo Copied %~3
    ) else (
        echo %~3 already exists - skipping
    )
)
goto :eof

:main
REM Copy JSON files to data directory
call :CopyIfNotExists "%SETUP_DIR%\data\cdkeys.json" "%DATA_DIR%\cdkeys.json" "cdkeys.json to data directory"
call :CopyIfNotExists "%SETUP_DIR%\data\patch.json" "%DATA_DIR%\patch.json" "patch.json to data directory"
call :CopyIfNotExists "%SETUP_DIR%\data\profile.json" "%DATA_DIR%\profile.json" "profile.json to data directory"
call :CopyIfNotExists "%SETUP_DIR%\data\schedules.json" "%DATA_DIR%\schedules.json" "schedules.json to data directory"
call :CopyIfNotExists "%SETUP_DIR%\data\server.json" "%DATA_DIR%\server.json" "server.json to data directory"

REM Copy log files to logs directory
call :CopyIfNotExists "%SETUP_DIR%\logs\Console.rtf" "%LOGS_DIR%\Console.rtf" "Console.rtf to logs directory"
call :CopyIfNotExists "%SETUP_DIR%\logs\exceptions.log" "%LOGS_DIR%\exceptions.log" "exceptions.log to logs directory"
call :CopyIfNotExists "%SETUP_DIR%\logs\keyinfo.log" "%LOGS_DIR%\keyinfo.log" "keyinfo.log to logs directory"

REM Copy ini file to d2bs directory
call :CopyIfNotExists "%SETUP_DIR%\d2bs.ini" "%D2BS_DIR%\d2bs.ini" "d2bs.ini to d2bs directory"

REM Copy system files to their respective directories
call :CopyIfNotExists "%SETUP_DIR%\automule\MuleConfig.js" "%SYSTEMS_DIR%\automule\config\MuleConfig.js" "MuleConfig.js to automule config directory"
call :CopyIfNotExists "%SETUP_DIR%\automule\TorchAnniMules.js" "%SYSTEMS_DIR%\automule\config\TorchAnniMules.js" "TorchAnniMules.js to automule config directory"
call :CopyIfNotExists "%SETUP_DIR%\channel\ChannelConfig.js" "%SYSTEMS_DIR%\channel\ChannelConfig.js" "ChannelConfig.js to channel directory"
call :CopyIfNotExists "%SETUP_DIR%\cleaner\CleanerConfig.js" "%SYSTEMS_DIR%\cleaner\CleanerConfig.js" "CleanerConfig.js to cleaner directory"
call :CopyIfNotExists "%SETUP_DIR%\crafting\TeamsConfig.js" "%SYSTEMS_DIR%\crafting\TeamsConfig.js" "TeamsConfig.js to crafting directory"
call :CopyIfNotExists "%SETUP_DIR%\follow\FollowConfig.js" "%SYSTEMS_DIR%\follow\FollowConfig.js" "FollowConfig.js to follow directory"
call :CopyIfNotExists "%SETUP_DIR%\gambling\TeamsConfig.js" "%SYSTEMS_DIR%\gambling\TeamsConfig.js" "TeamsConfig.js to gambling directory"
call :CopyIfNotExists "%SETUP_DIR%\gameaction\GameActionConfig.js" "%SYSTEMS_DIR%\gameaction\GameActionConfig.js" "GameActionConfig.js to gameaction directory"
call :CopyIfNotExists "%SETUP_DIR%\mulelogger\LoggerConfig.js" "%SYSTEMS_DIR%\mulelogger\LoggerConfig.js" "LoggerConfig.js to mulelogger directory"
call :CopyIfNotExists "%SETUP_DIR%\pubjoin\PubJoinConfig.js" "%SYSTEMS_DIR%\pubjoin\PubJoinConfig.js" "PubJoinConfig.js to pubjoin directory"
call :CopyIfNotExists "%SETUP_DIR%\torch\FarmerConfig.js" "%SYSTEMS_DIR%\torch\FarmerConfig.js" "FarmerConfig.js to torch directory"

REM Copy custom config files to their respective directories
call :CopyIfNotExists "%SETUP_DIR%\config\_CustomConfig.js" "%CONFIG_DIR%\_CustomConfig.js" "_CustomConfig.js to config directory"

REM Copy starter config files to their respective directories
call :CopyIfNotExists "%SETUP_DIR%\starter\AdvancedConfig.js" "%STARTER_DIR%\AdvancedConfig.js" "AdvancedConfig.js to starter directory"
call :CopyIfNotExists "%SETUP_DIR%\starter\StarterConfig.js" "%STARTER_DIR%\StarterConfig.js" "StarterConfig.js to starter directory"

echo Setup files copied successfully!
pause
@echo off
setlocal

set "REPO_ROOT=%~dp0.."
set "BACKEND_DIR=%REPO_ROOT%\services\audio-engine"
set "DESKTOP_DIR=%REPO_ROOT%\apps\desktop"

REM Run from repository root to launch backend + desktop dev shell.
start "soundwave-backend" cmd /k "cd /d ""%BACKEND_DIR%"" && python -m uvicorn audio_engine.main:app --reload --port 8000"

if not exist "%DESKTOP_DIR%\package.json" (
	echo Could not find desktop package.json at:
	echo   %DESKTOP_DIR%\package.json
	exit /b 1
)

npm --prefix "%DESKTOP_DIR%" run tauri:dev
set "EXIT_CODE=%ERRORLEVEL%"

if not "%EXIT_CODE%"=="0" (
	echo.
	echo Failed to launch desktop app. Ensure dependencies are installed in apps\desktop:
	echo   npm install
	exit /b %EXIT_CODE%
)

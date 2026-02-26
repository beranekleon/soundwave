@echo off
setlocal

for %%I in ("%~dp0..") do set "REPO_ROOT=%%~fI"
set "DESKTOP_DIR=%REPO_ROOT%\apps\desktop"

if not exist "%DESKTOP_DIR%\package.json" (
  echo Could not find desktop package.json at:
  echo   %DESKTOP_DIR%\package.json
  exit /b 1
)

echo Launching soundwave backend...
start "soundwave-backend" cmd /k call "%~dp0dev\start-backend.bat"

echo Launching soundwave desktop...
start "soundwave-desktop" cmd /k "npm --prefix ""%DESKTOP_DIR%"" run tauri:dev"

echo.
echo Started both processes in separate terminals:
echo   - soundwave-backend
echo   - soundwave-desktop

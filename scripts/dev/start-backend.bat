@echo off
setlocal

for %%I in ("%~dp0\..\..") do set "REPO_ROOT=%%~fI"
set "BACKEND_DIR=%REPO_ROOT%\services\audio-engine"

set "BACKEND_VENV=%BACKEND_DIR%\.venv\Scripts\activate.bat"
if not exist "%BACKEND_VENV%" (
  set "BACKEND_VENV=%REPO_ROOT%\.venv\Scripts\activate.bat"
)

cd /d "%BACKEND_DIR%"

if exist "%BACKEND_VENV%" (
  call "%BACKEND_VENV%"
  echo Activated Python venv: %BACKEND_VENV%
) else (
  echo WARNING: No Python venv found. Using system Python.
)

python -m uvicorn audio_engine.main:app --reload --port 8000

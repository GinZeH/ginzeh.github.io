@echo off
title GinZeH Blog - Development Server
setlocal enabledelayedexpansion

echo.
echo ============================================
echo   GinZeH Blog Development Server
echo ============================================
echo.

set "PROJECT_DIR=C:\Code\GinZeHBlog\ginzeh.github.io"

echo [1/5] Checking project directory...
if not exist "%PROJECT_DIR%" (
    echo ERROR: Project directory not found: %PROJECT_DIR%
    pause
    exit /b 1
)
echo OK: Project directory exists

echo.
echo [2/5] Changing to project directory...
cd /d "%PROJECT_DIR%"
if %errorlevel% neq 0 (
    echo ERROR: Failed to change directory
    pause
    exit /b 1
)
echo OK: Current directory: %cd%

echo.
echo [3/5] Checking Node.js installation...
node --version >nul 2>&1
if %errorlevel% neq 0 (
    echo ERROR: Node.js is not installed or not in PATH
    echo Please install Node.js from: https://nodejs.org/
    pause
    exit /b 1
)
for /f "tokens=1" %%a in ('node --version 2^>nul') do set "NODE_VERSION=%%a"
echo OK: Node.js version: %NODE_VERSION%

echo.
echo [4/5] Checking pnpm installation...
pnpm --version >nul 2>&1
if %errorlevel% neq 0 (
    echo WARNING: pnpm not found, using npm instead...
    set "PKG_MANAGER=npm"
) else (
    for /f "tokens=1" %%a in ('pnpm --version 2^>nul') do set "PNPM_VERSION=%%a"
    echo OK: pnpm version: %PNPM_VERSION%
    set "PKG_MANAGER=pnpm"
)

echo.
echo [5/5] Checking dependencies...
if not exist "node_modules" (
    echo WARNING: Dependencies not installed, installing...
    call %PKG_MANAGER% install
    if !errorlevel! neq 0 (
        echo ERROR: Failed to install dependencies
        pause
        exit /b 1
    )
    echo OK: Dependencies installed successfully
) else (
    echo OK: Dependencies already installed
)

echo.
echo ============================================
echo   Starting development server...
echo ============================================
echo.
echo Site URL: http://localhost:4321/
echo CMS Admin: http://localhost:4321/admin/index.html
echo.
echo Press Ctrl+C to stop the server
echo.

call npx tinacms dev -c "astro dev"

if !errorlevel! neq 0 (
    echo.
    echo ============================================
    echo   ERROR: Server failed to start!
    echo ============================================
    echo Error code: !errorlevel!
    echo.
    echo Troubleshooting:
    echo 1. Make sure Node.js version >= 18.17.0
    echo 2. Make sure dependencies are installed
    echo 3. Check if ports 4321 and 4001 are in use
    echo.
    pause
    exit /b !errorlevel!
)

echo.
echo ============================================
echo   Server stopped
echo ============================================
echo.
pause
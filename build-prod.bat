@echo off
title GinZeH Blog - Production Build
setlocal enabledelayedexpansion

echo.
echo ============================================
echo   GinZeH Blog Production Build
echo ============================================
echo.

set "PROJECT_DIR=C:\Code\GinZeHBlog\ginzeh.github.io"

echo [1/4] Checking project directory...
if not exist "%PROJECT_DIR%" (
    echo ERROR: Project directory not found: %PROJECT_DIR%
    pause
    exit /b 1
)
echo OK: Project directory exists

echo.
echo [2/4] Changing to project directory...
cd /d "%PROJECT_DIR%"
if %errorlevel% neq 0 (
    echo ERROR: Failed to change directory
    pause
    exit /b 1
)
echo OK: Current directory: %cd%

echo.
echo [3/4] Checking dependencies...
if not exist "node_modules" (
    echo WARNING: Dependencies not installed, installing...
    pnpm install
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
echo [4/4] Starting build...
echo.

pnpm build

if !errorlevel! equ 0 (
    echo.
    echo ============================================
    echo   BUILD SUCCESSFUL!
    echo ============================================
    echo.
    echo Build output: %cd%\dist
    echo.
) else (
    echo.
    echo ============================================
    echo   BUILD FAILED!
    echo ============================================
    echo.
    pause
    exit /b 1
)

pause
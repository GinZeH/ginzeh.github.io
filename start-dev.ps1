<#
.SYNOPSIS
Starts the GinZeH Blog development server with TinaCMS.

.DESCRIPTION
This script checks for required dependencies and starts the development server.
#>

$ErrorActionPreference = "Stop"

Write-Host "`n============================================" -ForegroundColor Cyan
Write-Host "    GinZeH Blog Development Server" -ForegroundColor Cyan
Write-Host "============================================`n" -ForegroundColor Cyan

$projectDir = "C:\Code\GinZeHBlog\ginzeh.github.io"

# Check project directory
Write-Host "[1/5] Checking project directory..." -ForegroundColor Yellow
if (-not (Test-Path -Path $projectDir -PathType Container)) {
    Write-Host "ERROR: Project directory not found: $projectDir" -ForegroundColor Red
    Read-Host "Press Enter to exit"
    exit 1
}
Write-Host "OK: Project directory exists`n" -ForegroundColor Green

# Change to project directory
Write-Host "[2/5] Changing to project directory..." -ForegroundColor Yellow
Set-Location -Path $projectDir -ErrorAction Stop
Write-Host "OK: Current directory: $(Get-Location)`n" -ForegroundColor Green

# Check Node.js
Write-Host "[3/5] Checking Node.js installation..." -ForegroundColor Yellow
try {
    $nodeVersion = (node --version)
    Write-Host "OK: Node.js version: $nodeVersion`n" -ForegroundColor Green
}
catch {
    Write-Host "ERROR: Node.js is not installed or not in PATH" -ForegroundColor Red
    Write-Host "Please install Node.js from: https://nodejs.org/" -ForegroundColor Red
    Read-Host "Press Enter to exit"
    exit 1
}

# Check pnpm
Write-Host "[4/5] Checking pnpm installation..." -ForegroundColor Yellow
try {
    $pnpmVersion = (pnpm --version)
    Write-Host "OK: pnpm version: $pnpmVersion`n" -ForegroundColor Green
}
catch {
    Write-Host "WARNING: pnpm not found, using npm instead..." -ForegroundColor Yellow
}

# Check dependencies
Write-Host "[5/5] Checking dependencies..." -ForegroundColor Yellow
if (-not (Test-Path -Path "node_modules" -PathType Container)) {
    Write-Host "WARNING: Dependencies not installed, installing..." -ForegroundColor Yellow
    try {
        pnpm install
        Write-Host "OK: Dependencies installed successfully`n" -ForegroundColor Green
    }
    catch {
        Write-Host "ERROR: Failed to install dependencies" -ForegroundColor Red
        Read-Host "Press Enter to exit"
        exit 1
    }
}
else {
    Write-Host "OK: Dependencies already installed`n" -ForegroundColor Green
}

# Start development server
Write-Host "============================================" -ForegroundColor Cyan
Write-Host "    Starting development server..." -ForegroundColor Cyan
Write-Host "============================================`n" -ForegroundColor Cyan
Write-Host "Site URL: http://localhost:4321/" -ForegroundColor White
Write-Host "CMS Admin: http://localhost:4321/admin/index.html`n" -ForegroundColor White
Write-Host "Press Ctrl+C to stop the server`n" -ForegroundColor Gray

try {
    npx tinacms dev -c "astro dev"
}
catch {
    Write-Host "`n============================================" -ForegroundColor Red
    Write-Host "    ERROR: Server failed to start!" -ForegroundColor Red
    Write-Host "============================================`n" -ForegroundColor Red
    Write-Host "Error: $_" -ForegroundColor Red
    Write-Host "`nTroubleshooting:" -ForegroundColor Yellow
    Write-Host "1. Make sure Node.js version >= 18.17.0" -ForegroundColor Yellow
    Write-Host "2. Make sure dependencies are installed" -ForegroundColor Yellow
    Write-Host "3. Check if ports 4321 and 4001 are in use" -ForegroundColor Yellow
    Read-Host "`nPress Enter to exit"
    exit 1
}

Write-Host "`n============================================" -ForegroundColor Cyan
Write-Host "    Server stopped" -ForegroundColor Cyan
Write-Host "============================================`n" -ForegroundColor Cyan
Read-Host "Press Enter to exit"
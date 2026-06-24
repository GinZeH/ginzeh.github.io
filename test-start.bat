@echo off
chcp 65001 >nul
title Test Script

echo 测试脚本开始...
echo.

echo 1. 当前目录: %cd%
echo.

echo 2. 检查 Node.js...
node --version
if %errorlevel% neq 0 (
    echo Node.js 未找到
    pause
    exit /b 1
)

echo.
echo 3. 检查 pnpm...
pnpm --version
if %errorlevel% neq 0 (
    echo pnpm 未找到
    pause
    exit /b 1
)

echo.
echo 4. 进入项目目录...
cd /d "C:\Code\GinZeHBlog\ginzeh.github.io"
echo 当前目录: %cd%

echo.
echo 5. 检查 node_modules...
if exist "node_modules" (
    echo node_modules 存在
) else (
    echo node_modules 不存在
)

echo.
echo 按任意键继续测试启动命令...
pause

echo.
echo 6. 尝试启动服务器...
echo 请手动观察是否有错误...
npx tinacms dev -c "astro dev"

echo.
echo 服务器已停止
pause
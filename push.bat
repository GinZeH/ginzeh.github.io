@echo off
chcp 65001 > nul
setlocal enabledelayedexpansion

title 自动推送至 GitHub

echo ==============================================
echo          自动推送脚本 v1.0
echo ==============================================
echo.

set "repo_path=C:\Code\GinZeHBlog\ginzeh.github.io"
cd /d "%repo_path%" || (
    echo 错误：无法进入目录 %repo_path%
    pause
    exit /b 1
)

echo 当前目录: %cd%
echo.

echo 正在检查 Git 状态...
git status

echo.
echo 正在添加所有更改...
git add .

echo.
echo 正在提交更改...
for /f "tokens=1-4 delims=/ " %%a in ("%date%") do (
    set "today=%%d-%%b-%%c"
)
for /f "tokens=1-2 delims=:" %%a in ("%time%") do (
    set "now=%%a:%%b"
)
git commit -m "Auto-update from Tina CMS [%today% %now%]"

echo.
echo 正在推送到 GitHub...
git push origin master

echo.
echo ==============================================
echo              推送完成！
echo ==============================================
echo.
pause
@echo off

echo ====================================
echo       PLAYWRIGHT API TESTING
echo ====================================

echo.
echo [1] Prepare Allure History...

if exist allure-results (
    rmdir /s /q allure-results
)

mkdir allure-results

if exist allure-history (
    xcopy allure-history allure-results\history /E /I /Y > nul
)

echo.
echo [2] Execute Playwright Tests...

npx playwright test

echo.
echo [3] Generate Allure Report...

npx allure generate allure-results --clean -o allure-report

echo.
echo [4] Update Allure History...

if exist allure-report\history (
    if exist allure-history (
        rmdir /s /q allure-history
    )

    xcopy allure-report\history allure-history /E /I /Y > nul
)

echo.
echo ====================================
echo          REPORT COMPLETED
echo ====================================

echo.
echo Opening Allure Report...

npx allure open allure-report

pause
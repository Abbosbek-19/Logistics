@echo off
title TransLog - Transport Logistika Boshqaruv Tizimi
echo ========================================================
echo   TransLog - Transport Logistika Boshqaruv Tizimi
echo ========================================================

if not exist node_modules (
    echo Kutubxonalar o'rnatilmoqda, kuting...
    call npm install
)

echo Server ishga tushirilmoqda: http://localhost:5000
start http://localhost:5000
npm run dev
pause

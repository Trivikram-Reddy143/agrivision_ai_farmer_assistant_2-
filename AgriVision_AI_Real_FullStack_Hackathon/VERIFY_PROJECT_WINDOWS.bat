@echo off
setlocal
cd /d "%~dp0"
node tests\self-test.mjs
if errorlevel 1 exit /b 1
cd backend
if not exist .env copy .env.example .env >nul
if not exist node_modules (
  echo Installing backend dependencies...
  call npm install
  if errorlevel 1 exit /b 1
)
call npm run seed
if errorlevel 1 exit /b 1
call npm start

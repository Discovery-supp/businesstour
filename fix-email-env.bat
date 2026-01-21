@echo off
echo Modification du fichier .env pour utiliser l'email de test Resend...
echo.

powershell -Command "(Get-Content .env) -replace 'RESEND_FROM_EMAIL=reservations@businesstours.com', 'RESEND_FROM_EMAIL=onboarding@resend.dev' | Set-Content .env"

echo.
echo ✓ Email d'envoi change vers: onboarding@resend.dev
echo.
echo Redemarre 'netlify dev' puis teste avec: node test-email-simple.js
echo.
pause

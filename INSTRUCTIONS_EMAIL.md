# Instructions pour résoudre le problème d'email

## Problème identifié

Le domaine `businesstours.com` n'est probablement pas vérifié dans Resend. Pour envoyer des emails depuis un domaine personnalisé, il faut d'abord le vérifier.

## Solution rapide : Utiliser l'email de test Resend

### Option 1 : Via le script batch
1. Double-clique sur `fix-email-env.bat`
2. Redémarre `netlify dev`
3. Teste avec : `node test-email-simple.js`

### Option 2 : Modification manuelle

Ouvre le fichier `.env` et change cette ligne :
```
RESEND_FROM_EMAIL=reservations@businesstours.com
```

Par :
```
RESEND_FROM_EMAIL=onboarding@resend.dev
```

Puis :
1. Redémarre `netlify dev` (arrête avec Ctrl+C et relance)
2. Teste avec : `node test-email-simple.js`

## Vérifier que netlify dev est en cours

Avant de tester, assure-toi que `netlify dev` est en cours d'exécution dans un terminal.

Tu devrais voir quelque chose comme :
```
◈ Netlify Dev ◈
◈ Server now ready on http://localhost:8888
```

## Tester l'envoi

Dans un **nouveau terminal** (sans arrêter netlify dev), exécute :
```bash
node test-email-simple.js
```

## Vérifier les logs

Si l'email ne part toujours pas, regarde les logs dans le terminal où `netlify dev` est en cours. Tu devrais voir les erreurs éventuelles.

## Pour utiliser ton propre domaine plus tard

1. Va sur [Resend Dashboard](https://resend.com/domains)
2. Clique sur "Add Domain"
3. Ajoute `businesstours.com`
4. Configure les enregistrements DNS (SPF, DKIM) dans ton hébergeur de domaine
5. Attends la vérification
6. Remets `RESEND_FROM_EMAIL=reservations@businesstours.com` dans `.env`

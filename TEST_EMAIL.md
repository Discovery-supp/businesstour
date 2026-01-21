# Test d'envoi d'email

Ce guide explique comment tester l'envoi d'email de confirmation.

## Méthode 1 : Via le script de test (Recommandé)

1. **Démarrer le serveur Netlify** :
   ```bash
   npx netlify dev
   ```

2. **Dans un autre terminal, exécuter le script de test** :
   ```bash
   node test-email-script.js
   ```

3. **Vérifier la boîte de réception** de `scongodiscovery18@gmail.com`

## Méthode 2 : Via une requête HTTP directe

Si `netlify dev` est en cours d'exécution sur `http://localhost:8888` :

```bash
curl -X POST http://localhost:8888/.netlify/functions/test-email \
  -H "Content-Type: application/json" \
  -d '{"email":"scongodiscovery18@gmail.com"}'
```

## Méthode 3 : Via le navigateur (si en production)

1. Ouvrir la console du navigateur (F12)
2. Exécuter ce code :

```javascript
fetch('/.netlify/functions/test-email', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({ email: 'scongodiscovery18@gmail.com' }),
})
  .then(r => r.json())
  .then(d => console.log(d))
  .catch(e => console.error(e));
```

## Configuration requise

Avant de tester, assurez-vous que :

1. ✅ **Resend est configuré** :
   - `RESEND_API_KEY` est définie dans `.env` (local) ou dans Netlify (production)
   - `RESEND_FROM_EMAIL` est définie

2. ✅ **Le serveur Netlify est démarré** (pour les tests locaux) :
   ```bash
   npx netlify dev
   ```

## Dépannage

### Erreur : "Failed to send email"

- Vérifiez que `RESEND_API_KEY` est correcte
- Vérifiez que `RESEND_FROM_EMAIL` est valide
- Vérifiez votre quota Resend (100 emails/jour en gratuit)

### Erreur : "Connection refused"

- Assurez-vous que `netlify dev` est en cours d'exécution
- Vérifiez que le port 8888 n'est pas utilisé par un autre processus

### L'email n'arrive pas

- Vérifiez le dossier spam
- Vérifiez les logs Netlify Functions pour voir les erreurs
- Vérifiez que l'adresse email de destination est correcte

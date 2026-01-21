# Debug - Email non reçu

Si tu n'as pas reçu l'email, vérifie les points suivants :

## 1. Vérifier que le serveur Netlify est démarré

```bash
npx netlify dev
```

Le serveur doit être accessible sur `http://localhost:8888`

## 2. Vérifier les variables d'environnement

Assure-toi que dans `.env` tu as :
```
RESEND_API_KEY=re_LEkR16oA_CjKbmwyG5kUBKh9PEmLpKBfx
RESEND_FROM_EMAIL=reservations@businesstours.com
```

## 3. Vérifier le domaine dans Resend

⚠️ **IMPORTANT** : Si tu utilises `reservations@businesstours.com`, tu dois :

1. Aller sur [Resend Dashboard](https://resend.com/domains)
2. Ajouter le domaine `businesstours.com`
3. Configurer les enregistrements DNS (SPF, DKIM)
4. Attendre la vérification du domaine

**Alternative rapide pour tester** :
- Utilise un email de test de Resend : `onboarding@resend.dev`
- Ou utilise ton email personnel pour les tests

## 4. Tester avec le script simple

```bash
node test-email-simple.js
```

## 5. Vérifier les logs Netlify

Quand tu exécutes `netlify dev`, regarde les logs dans le terminal. Tu devrais voir :
- Les requêtes vers `/test-email`
- Les erreurs éventuelles de Resend

## 6. Vérifier le quota Resend

- Va sur [Resend Dashboard](https://resend.com)
- Vérifie que tu n'as pas dépassé le quota (100 emails/jour en gratuit)

## 7. Vérifier la boîte spam

Les emails peuvent arriver en spam, surtout si le domaine n'est pas vérifié.

## Solution rapide : Utiliser l'email de test Resend

Modifie temporairement `.env` :
```
RESEND_FROM_EMAIL=onboarding@resend.dev
```

Puis redémarre `netlify dev` et teste à nouveau.

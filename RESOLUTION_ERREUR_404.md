# 🔧 Résolution de l'Erreur 404 - Tables Supabase

## ❌ Problème Actuel

L'erreur `404` signifie que la table `bookings` n'existe pas encore dans votre projet Supabase.

## ✅ Solution en 4 Étapes

### Étape 1 : Redémarrer le Serveur (IMPORTANT)

Le serveur doit être redémarré pour charger les nouvelles variables d'environnement :

1. **Arrêtez le serveur** : Appuyez sur `Ctrl+C` dans le terminal
2. **Redémarrez** :
   ```bash
   npm run dev
   ```

### Étape 2 : Vérifier la Connexion Supabase

1. Allez sur : **https://mdqorcieguqtxykshbgm.supabase.co**
2. Connectez-vous à votre compte
3. Vérifiez que vous êtes dans le bon projet

### Étape 3 : Créer les Tables

1. Dans Supabase, cliquez sur **"SQL Editor"** dans le menu de gauche
2. Cliquez sur **"New query"** (Nouvelle requête)
3. Ouvrez le fichier **`SCRIPT_SQL_COMPLET.sql`** dans votre projet
4. **Copiez TOUT le contenu** (Ctrl+A puis Ctrl+C)
5. **Collez** dans l'éditeur SQL de Supabase (Ctrl+V)
6. Cliquez sur **"Run"** (ou appuyez sur Ctrl+Enter)
7. Vous devriez voir : **"Success. No rows returned"**

### Étape 4 : Vérifier les Tables

1. Dans Supabase, cliquez sur **"Table Editor"** dans le menu de gauche
2. Vous devriez voir 3 tables :
   - ✅ `bookings`
   - ✅ `contacts`
   - ✅ `newsletter_subscriptions`

## 🧪 Tester

1. Retournez dans votre application
2. Allez sur `/booking`
3. Remplissez le formulaire de réservation
4. Soumettez
5. Vérifiez dans Supabase → Table Editor → `bookings` que la réservation apparaît

## ⚠️ Si l'Erreur Persiste

### Vérifier l'URL Supabase

Si vous voyez une URL différente dans l'erreur (comme `hjcfspyavknreghrscsi`), cela signifie :

1. **Le serveur n'a pas été redémarré** → Redémarrez avec `npm run dev`
2. **Le cache du navigateur** → Appuyez sur `Ctrl+Shift+R` pour forcer le rechargement
3. **Mauvais projet Supabase** → Vérifiez que vous utilisez le bon projet

### Vérifier le Fichier .env

Le fichier `.env` doit contenir :
```
VITE_SUPABASE_URL=https://mdqorcieguqtxykshbgm.supabase.co
VITE_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

## 📋 Checklist Complète

- [ ] Serveur redémarré (`npm run dev`)
- [ ] Connecté à Supabase (https://mdqorcieguqtxykshbgm.supabase.co)
- [ ] SQL Editor ouvert
- [ ] Script `SCRIPT_SQL_COMPLET.sql` copié
- [ ] Script collé dans Supabase
- [ ] Bouton "Run" cliqué
- [ ] Message "Success" affiché
- [ ] Tables visibles dans Table Editor
- [ ] Test de réservation effectué

## 🎯 Résultat Attendu

Après avoir créé les tables, vous devriez voir :
- ✅ Plus d'erreur 404
- ✅ Les réservations sauvegardées dans Supabase
- ✅ Les messages de contact sauvegardés
- ✅ Les abonnements newsletter sauvegardés

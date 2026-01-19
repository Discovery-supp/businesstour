# 🚀 Guide Simple : Créer les Tables Supabase

## 📍 Étape 1 : Accéder à Supabase

1. Ouvrez votre navigateur
2. Allez sur : **https://mdqorcieguqtxykshbgm.supabase.co**
3. Connectez-vous à votre compte Supabase

## 📍 Étape 2 : Ouvrir l'Éditeur SQL

1. Dans le menu de gauche, cliquez sur **"SQL Editor"** (ou "Éditeur SQL")
2. Cliquez sur le bouton **"New query"** (Nouvelle requête) en haut à droite

## 📍 Étape 3 : Copier le Script SQL

1. Ouvrez le fichier `supabase-schema.sql` dans votre éditeur de code
2. **Sélectionnez TOUT le contenu** (Ctrl+A)
3. **Copiez** (Ctrl+C)

## 📍 Étape 4 : Coller et Exécuter

1. Dans l'éditeur SQL de Supabase, **collez** le script (Ctrl+V)
2. Cliquez sur le bouton **"Run"** (Exécuter) en bas à droite
   - Ou appuyez sur **Ctrl+Enter**

## 📍 Étape 5 : Vérifier le Résultat

Vous devriez voir un message de succès comme :
```
Success. No rows returned
```

## 📍 Étape 6 : Vérifier les Tables Créées

1. Dans le menu de gauche, cliquez sur **"Table Editor"**
2. Vous devriez voir 3 tables :
   - ✅ **bookings**
   - ✅ **contacts**
   - ✅ **newsletter_subscriptions**

## ✅ C'est Fait !

Maintenant, retournez dans votre application et testez une réservation. Les données seront sauvegardées dans Supabase !

---

## 🔧 Si Vous Avez une Erreur

### Erreur : "relation already exists"
- Les tables existent déjà, c'est normal
- Vous pouvez ignorer cette erreur ou supprimer les tables existantes et réessayer

### Erreur : "permission denied"
- Vérifiez que vous êtes bien connecté à votre projet Supabase
- Assurez-vous d'utiliser le bon projet

### Erreur : "syntax error"
- Vérifiez que vous avez copié TOUT le script
- Assurez-vous qu'il n'y a pas de caractères manquants

---

## 📞 Besoin d'Aide ?

Si vous rencontrez des problèmes, vérifiez :
1. Que vous êtes bien connecté à Supabase
2. Que vous avez copié TOUT le contenu du fichier `supabase-schema.sql`
3. Que vous avez cliqué sur "Run" après avoir collé le script

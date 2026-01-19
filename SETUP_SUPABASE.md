# Configuration Supabase - Business Tours

## ✅ Configuration Complétée

Le fichier `.env` a été créé avec vos identifiants Supabase :
- **URL** : https://mdqorcieguqtxykshbgm.supabase.co
- **Anon Key** : Configurée

## 📋 Étapes pour Finaliser la Configuration

### 1. Créer les Tables dans Supabase

1. Connectez-vous à votre projet Supabase : https://mdqorcieguqtxykshbgm.supabase.co
2. Allez dans **SQL Editor**
3. Copiez le contenu du fichier `supabase-schema.sql`
4. Exécutez le script SQL

### 2. Vérifier les Tables Créées

Vous devriez avoir 3 tables :
- ✅ `bookings` - Pour les réservations
- ✅ `contacts` - Pour les messages de contact
- ✅ `newsletter_subscriptions` - Pour les abonnements newsletter

### 3. Vérifier les Politiques RLS (Row Level Security)

Les politiques suivantes doivent être actives :
- **bookings** : Insertion publique autorisée, lecture pour utilisateurs authentifiés
- **contacts** : Insertion publique autorisée
- **newsletter_subscriptions** : Insertion publique autorisée, lecture pour utilisateurs authentifiés

## 🧪 Tester la Connexion

1. Redémarrez le serveur de développement :
   ```bash
   npm run dev
   ```

2. Testez une réservation :
   - Allez sur `/booking`
   - Remplissez le formulaire
   - Soumettez
   - Vérifiez dans Supabase que la réservation apparaît dans la table `bookings`

3. Testez le contact :
   - Allez sur `/contact`
   - Envoyez un message
   - Vérifiez dans Supabase que le message apparaît dans la table `contacts`

4. Testez la newsletter :
   - Allez sur n'importe quelle page
   - Abonnez-vous à la newsletter dans le footer
   - Vérifiez dans Supabase que l'email apparaît dans la table `newsletter_subscriptions`

## 🔍 Vérification dans Supabase

1. Allez dans **Table Editor** dans votre dashboard Supabase
2. Vous devriez voir les 3 tables créées
3. Les données insérées depuis l'application apparaîtront ici

## ⚠️ En Cas d'Erreur

Si vous rencontrez des erreurs :

1. **Erreur "relation does not exist"** :
   - Les tables n'ont pas été créées
   - Réexécutez le script SQL

2. **Erreur "new row violates row-level security policy"** :
   - Les politiques RLS ne sont pas correctement configurées
   - Vérifiez que les politiques dans `supabase-schema.sql` sont actives

3. **Erreur de connexion** :
   - Vérifiez que le fichier `.env` contient bien les bonnes valeurs
   - Redémarrez le serveur de développement

## 📝 Notes

- Le fichier `.env` est dans `.gitignore` et ne sera pas commité
- Les données sont stockées de manière sécurisée avec RLS activé
- Les utilisateurs non authentifiés peuvent créer des réservations/contacts, mais ne peuvent pas les lire

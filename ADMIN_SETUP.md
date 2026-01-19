# Configuration du Tableau de Bord Admin

## Étapes pour accéder au dashboard administrateur

### 1. Créer un compte

1. Accédez à l'URL : `/signup` ou cliquez sur "Pas de compte? Créer un compte" sur la page de connexion
2. Remplissez le formulaire d'inscription avec votre email et mot de passe
3. Cliquez sur "Créer le compte"

### 2. Attribuer le rôle admin

Après la création du compte, vous devez attribuer manuellement le rôle admin à votre utilisateur dans Supabase :

#### Option A : Via l'interface Supabase (Recommandé)

1. Allez sur [votre tableau de bord Supabase](https://supabase.com/dashboard)
2. Sélectionnez votre projet
3. Allez dans "Table Editor" → "auth.users"
4. Trouvez votre utilisateur par email et copiez son `id`
5. Allez dans "SQL Editor"
6. Exécutez cette requête :

```sql
-- Remplacez 'VOTRE_USER_ID' par l'ID copié
INSERT INTO user_roles (user_id, role)
VALUES ('VOTRE_USER_ID', 'admin')
ON CONFLICT (user_id)
DO UPDATE SET role = 'admin';
```

#### Option B : Via SQL après inscription

La page de succès d'inscription affiche automatiquement la requête SQL à exécuter avec des instructions détaillées.

### 3. Se connecter

1. Accédez à `/login`
2. Entrez votre email et mot de passe
3. Cliquez sur "Se connecter"
4. Vous serez automatiquement redirigé vers le tableau de bord admin

## Fonctionnalités du Dashboard Admin

Une fois connecté en tant qu'admin, vous pouvez :

- ✅ Voir toutes les réservations
- ✅ Filtrer par statut (En attente, Confirmées, Complétées)
- ✅ Voir les statistiques en temps réel
- ✅ Modifier le statut des réservations
- ✅ Voir les détails complets des clients et des tours

## Données de test

Des données de test ont été ajoutées :
- 3 tours (Paris, Lyon, Côte d'Azur)
- 4 réservations avec différents statuts

## Sécurité

- ⚠️ Seuls les utilisateurs avec le rôle "admin" peuvent voir les réservations
- ⚠️ Les politiques RLS (Row Level Security) sont actives
- ⚠️ Les utilisateurs non-admin ne peuvent pas accéder au dashboard

## Accès rapide

- Page de connexion : `/login`
- Page d'inscription : `/signup`
- Dashboard admin : `/admin` (nécessite d'être connecté en tant qu'admin)

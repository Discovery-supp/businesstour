# 🔄 Migration Multi-Tours - Guide

## ✅ Modifications Apportées

### 1. Schéma Base de Données

Nouveaux champs ajoutés à la table `bookings` :
- `is_multi_tour` (BOOLEAN) : Indique si la réservation contient plusieurs tours
- `tours` (JSONB) : Détails de tous les tours avec prix, montant payé et reste
- `amount_paid` (DECIMAL) : Montant total payé (70%)
- `remaining_amount` (DECIMAL) : Montant total restant (30%)

### 2. Structure JSONB `tours`

```json
[
  {
    "destination": "turkey",
    "tour_type": "vip",
    "month": "Février",
    "price": 2000,
    "amount_paid": 1400,
    "remaining_amount": 600
  },
  {
    "destination": "dubai",
    "tour_type": "standard",
    "month": "Mars",
    "price": 1000,
    "amount_paid": 700,
    "remaining_amount": 300
  }
]
```

## 📋 Étapes de Migration

### Étape 1 : Exécuter le Script SQL

Dans **Supabase SQL Editor**, exécutez :

```sql
-- Voir le fichier : supabase-multi-tours-schema.sql
```

Ce script ajoute les nouveaux champs à la table `bookings`.

### Étape 2 : Vérifier les Données

Après migration, vérifiez que les anciennes réservations fonctionnent toujours :
- Les anciennes réservations auront `is_multi_tour = false`
- Le champ `tours` sera `NULL` pour les anciennes réservations
- Les champs `destination`, `tour_type`, `month` restent pour compatibilité

### Étape 3 : Tester

1. Créez une réservation avec **1 tour** → `is_multi_tour = false`
2. Créez une réservation avec **2+ tours** → `is_multi_tour = true`
3. Vérifiez que les montants sont correctement calculés

## 🔍 Requêtes Utiles

### Voir toutes les réservations multi-tours
```sql
SELECT * FROM bookings WHERE is_multi_tour = true;
```

### Voir les détails des tours d'une réservation
```sql
SELECT 
  id,
  email,
  is_multi_tour,
  tours,
  amount_paid,
  remaining_amount,
  total_amount
FROM bookings
WHERE id = 'votre-id';
```

### Calculer le total des montants restants à payer
```sql
SELECT 
  SUM(remaining_amount) as total_remaining
FROM bookings
WHERE payment_status = 'succeeded';
```

## ⚠️ Notes Importantes

- Les anciennes réservations continuent de fonctionner (rétrocompatibilité)
- Le champ `tours` est optionnel (NULL pour les anciennes réservations)
- Les champs `destination`, `tour_type`, `month` restent pour compatibilité avec l'ancien système
- Pour les multi-tours, ces champs contiennent les infos du **premier tour**

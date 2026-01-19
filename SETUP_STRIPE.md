# 💳 Configuration Stripe - Business Tours

## ✅ Installation Complétée

Les packages Stripe ont été installés :
- ✅ `@stripe/stripe-js`
- ✅ `@stripe/react-stripe-js`

## 📋 Configuration Requise

### 1. Créer un Compte Stripe

1. Allez sur [https://stripe.com](https://stripe.com)
2. Créez un compte (gratuit)
3. Accédez au **Dashboard**

### 2. Obtenir les Clés API

1. Dans le Dashboard Stripe, allez dans **Developers** → **API keys**
2. Vous verrez deux clés :
   - **Publishable key** (commence par `pk_test_` pour le test)
   - **Secret key** (commence par `sk_test_` pour le test) - ⚠️ Ne jamais exposer côté client

### 3. Configurer le Fichier .env

Ouvrez le fichier `.env` et ajoutez votre clé publique :

```env
VITE_STRIPE_PUBLISHABLE_KEY=pk_test_votre_cle_ici
```

**Exemple :**
```env
VITE_STRIPE_PUBLISHABLE_KEY=pk_test_51AbCdEfGhIjKlMnOpQrStUvWxYz1234567890
```

### 4. Redémarrer le Serveur

Après avoir ajouté la clé, redémarrez le serveur :

```bash
# Arrêtez le serveur (Ctrl+C)
# Puis redémarrez
npm run dev
```

## 🧪 Tester le Paiement

### Mode Test (Recommandé pour le développement)

Stripe fournit des cartes de test :

**Carte de test qui fonctionne :**
- Numéro : `4242 4242 4242 4242`
- Date d'expiration : N'importe quelle date future (ex: `12/25`)
- CVC : N'importe quel 3 chiffres (ex: `123`)
- Code postal : N'importe quel code postal (ex: `12345`)

**Carte de test qui échoue :**
- Numéro : `4000 0000 0000 0002`
- Utilisez cette carte pour tester les erreurs de paiement

### Autres Cartes de Test

- **3D Secure** : `4000 0025 0000 3155`
- **Carte refusée** : `4000 0000 0000 0002`
- **Carte insuffisante** : `4000 0000 0000 9995`

Voir toutes les cartes de test : [https://stripe.com/docs/testing](https://stripe.com/docs/testing)

## 🔄 Flux de Paiement

1. **Utilisateur remplit le formulaire de réservation**
2. **Validation du formulaire**
3. **Affichage du formulaire de paiement Stripe** (si Stripe est configuré)
4. **Utilisateur entre ses informations de carte**
5. **Stripe traite le paiement**
6. **Réservation sauvegardée dans Supabase avec confirmation de paiement**

## ⚠️ Important - Mode Production

### Backend Requis

Pour la production, vous **DEVEZ** créer un backend pour :
1. Créer les PaymentIntents de manière sécurisée
2. Stocker la clé secrète Stripe (jamais côté client)
3. Gérer les webhooks Stripe pour confirmer les paiements

### Étapes pour la Production

1. **Créer un backend** (Node.js, Python, etc.)
2. **Installer Stripe SDK côté serveur**
3. **Créer une route API** pour créer les PaymentIntents
4. **Configurer les webhooks** Stripe
5. **Utiliser les clés de production** (`pk_live_...` et `sk_live_...`)

## 📝 Notes

- ⚠️ **Ne jamais** exposer votre clé secrète (`sk_...`) côté client
- ✅ La clé publique (`pk_...`) peut être utilisée côté client
- 🔒 Les informations de carte ne sont jamais stockées sur vos serveurs
- 💳 Stripe gère toute la sécurité PCI-DSS

## 🐛 Dépannage

### Erreur : "Stripe publishable key not found"
- Vérifiez que `VITE_STRIPE_PUBLISHABLE_KEY` est dans le fichier `.env`
- Redémarrez le serveur après avoir ajouté la variable

### Erreur : "Invalid API Key"
- Vérifiez que vous avez copié la bonne clé
- Assurez-vous qu'il n'y a pas d'espaces avant/après la clé

### Le formulaire de paiement ne s'affiche pas
- Vérifiez que Stripe est configuré (clé dans `.env`)
- Vérifiez que le montant total est supérieur à 0
- Vérifiez la console du navigateur pour les erreurs

## 📚 Ressources

- [Documentation Stripe](https://stripe.com/docs)
- [Stripe Testing](https://stripe.com/docs/testing)
- [Stripe React Elements](https://stripe.com/docs/stripe-js/react)

# Configuration de l'Email de Confirmation

Ce guide explique comment configurer l'envoi d'emails de confirmation pour les réservations.

## Service utilisé : Resend

Nous utilisons [Resend](https://resend.com) pour envoyer les emails de confirmation. Resend offre un plan gratuit généreux (100 emails/jour).

## Étapes de configuration

### 1. Créer un compte Resend

1. Allez sur [https://resend.com](https://resend.com)
2. Créez un compte gratuit
3. Vérifiez votre email

### 2. Obtenir votre API Key

1. Une fois connecté, allez dans **API Keys**
2. Cliquez sur **Create API Key**
3. Donnez un nom (ex: "Business Tours Production")
4. Copiez la clé API (elle commence par `re_...`)
5. ⚠️ **Important** : Sauvegardez cette clé, elle ne sera affichée qu'une seule fois

### 3. Configurer le domaine d'envoi (Optionnel mais recommandé)

Pour envoyer depuis votre propre domaine (ex: `noreply@businesstours.com`) :

1. Allez dans **Domains**
2. Cliquez sur **Add Domain**
3. Ajoutez votre domaine (ex: `businesstours.com`)
4. Suivez les instructions pour ajouter les enregistrements DNS
5. Une fois vérifié, vous pourrez utiliser `noreply@businesstours.com`

**Note** : Pour tester rapidement, vous pouvez utiliser l'email par défaut de Resend (ex: `onboarding@resend.dev`)

### 4. Configurer les variables d'environnement

#### En local (`.env`)

Ajoutez ces variables dans votre fichier `.env` :

```env
RESEND_API_KEY=re_votre_cle_api_ici
RESEND_FROM_EMAIL=noreply@businesstours.com
```

**Note** : Si vous n'avez pas encore configuré de domaine, utilisez l'email par défaut de Resend ou votre email personnel pour les tests.

#### Sur Netlify

1. Allez dans votre projet Netlify
2. Cliquez sur **Site settings** → **Environment variables**
3. Ajoutez les variables suivantes :
   - `RESEND_API_KEY` : Votre clé API Resend
   - `RESEND_FROM_EMAIL` : L'email d'envoi (ex: `noreply@businesstours.com` ou `onboarding@resend.dev` pour les tests)

### 5. Tester l'envoi d'email

1. Faites une réservation de test sur votre site
2. Vérifiez que l'email de confirmation arrive dans la boîte de réception
3. Si l'email n'arrive pas, vérifiez les logs Netlify Functions pour voir les erreurs

## Format de l'email

L'email de confirmation inclut :
- ✅ Détails de la réservation (entreprise, email, téléphone, nombre de participants)
- ✅ Liste des tours réservés (destination, type, mois, prix)
- ✅ Détails financiers (prix total, montant payé, reste à payer)
- ✅ Mode de paiement (Stripe ou Cash)
- ✅ Prochaines étapes selon le statut du paiement

## Dépannage

### L'email n'est pas envoyé

1. **Vérifiez les logs Netlify** :
   - Allez dans **Functions** → **send-booking-confirmation**
   - Vérifiez les logs pour voir les erreurs

2. **Vérifiez les variables d'environnement** :
   - Assurez-vous que `RESEND_API_KEY` est correctement configurée
   - Vérifiez que `RESEND_FROM_EMAIL` est valide

3. **Vérifiez votre quota Resend** :
   - Le plan gratuit offre 100 emails/jour
   - Vérifiez votre utilisation dans le dashboard Resend

### L'email arrive en spam

1. **Configurez votre propre domaine** (recommandé)
2. **Ajoutez les enregistrements SPF et DKIM** dans votre DNS
3. **Vérifiez votre réputation d'envoi** dans Resend

## Coûts

- **Plan gratuit** : 100 emails/jour, 3 000 emails/mois
- **Plan Pro** : $20/mois pour 50 000 emails/mois
- Plus d'infos : [https://resend.com/pricing](https://resend.com/pricing)

## Alternative : Utiliser un autre service

Si vous préférez utiliser un autre service (SendGrid, Mailgun, etc.), vous devrez modifier la fonction `netlify/functions/send-booking-confirmation.cjs` pour utiliser leur SDK.

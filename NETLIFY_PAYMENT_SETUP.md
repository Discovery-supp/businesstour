# 💳 Configuration Paiement Stripe sur Netlify

## ⚠️ Problème : Le paiement ne s'affiche pas en production

Si le formulaire de paiement ne s'affiche pas sur Netlify, vérifiez ces points :

## ✅ 1. Variables d'Environnement sur Netlify

Allez dans **Netlify Dashboard → Site Settings → Environment variables** et ajoutez :

### Variables Frontend (Build-time)
```
VITE_STRIPE_PUBLISHABLE_KEY=pk_test_51SrZYQPb3JKhuIdjadsecBW5KtNvGaEBkArvasnmXBwRDzPfnihgbPdfwKyXjkdnDMz5FX5oBQYAA53KSrsK28fx00580KoE8q
VITE_SUPABASE_URL=https://niwftjjdxrevahfpfvgd.supabase.co
VITE_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im5pd2Z0ampkeHJldmFoZnBmdmdkIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Njg4MTg2MTAsImV4cCI6MjA4NDM5NDYxMH0.4RlKyjMFjnIderRiAxq547HtQ2V4CJ85mMi0hfJwMNk
```

### Variables Backend (Runtime - pour les Functions)
```
STRIPE_SECRET_KEY=sk_test_... (votre clé secrète Stripe)
SUPABASE_URL=https://niwftjjdxrevahfpfvgd.supabase.co
SUPABASE_SERVICE_ROLE_KEY=<ta-clé-service-role>
```

⚠️ **Important** : 
- Les variables `VITE_*` sont accessibles côté client (build-time)
- Les variables sans `VITE_` sont **seulement** côté serveur (Functions)

## ✅ 2. Vérifier que les Functions sont déployées

1. Dans Netlify Dashboard → **Functions**
2. Vous devriez voir :
   - `create-payment-intent`
   - `stripe-webhook`

Si elles n'apparaissent pas :
- Vérifiez que le dossier `netlify/functions/` est bien dans votre repo
- Redéployez le site

## ✅ 3. Tester la Function

Testez directement l'URL de la function :
```
https://<ton-site>.netlify.app/.netlify/functions/create-payment-intent
```

Vous devriez voir une erreur JSON (normal, car il faut un POST), mais **pas** une 404.

## ✅ 4. Vérifier les Logs

1. Netlify Dashboard → **Functions** → Cliquez sur `create-payment-intent`
2. Regardez les **logs** pour voir les erreurs

Erreurs courantes :
- `STRIPE_SECRET_KEY is not defined` → Ajoutez la variable
- `500 Internal Server Error` → Vérifiez les logs pour plus de détails

## ✅ 5. Redéployer après Configuration

Après avoir ajouté les variables :
1. **Trigger a new deploy** (Netlify Dashboard → Deploys → Trigger deploy)
2. Attendez la fin du déploiement
3. Testez à nouveau

## 🐛 Debug en Production

Ouvrez la **console du navigateur** (F12) et regardez :
1. Les erreurs réseau (onglet Network)
2. Les erreurs JavaScript (onglet Console)

Vous devriez voir :
- `Creating payment intent at: /.netlify/functions/create-payment-intent`
- Si erreur 404 → Function non déployée
- Si erreur 500 → Vérifiez les logs Netlify

## 📝 Checklist

- [ ] Variables `VITE_STRIPE_PUBLISHABLE_KEY` configurée
- [ ] Variable `STRIPE_SECRET_KEY` configurée (sans VITE_)
- [ ] Functions visibles dans Netlify Dashboard
- [ ] Site redéployé après configuration
- [ ] Console navigateur vérifiée pour erreurs
- [ ] Logs Netlify Functions vérifiés

## 🔗 URLs Importantes

- **Dashboard Netlify** : https://app.netlify.com
- **Functions** : https://app.netlify.com/sites/<ton-site>/functions
- **Environment Variables** : https://app.netlify.com/sites/<ton-site>/configuration/env

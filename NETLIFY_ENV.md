# Variables d'environnement Netlify

Ajoutez ces variables dans **Netlify → Site settings → Environment variables** :

## Stripe
```
VITE_STRIPE_PUBLISHABLE_KEY=pk_test_...
STRIPE_SECRET_KEY=sk_test_...
STRIPE_WEBHOOK_SECRET=whsec_...
```

## Supabase (Webhook)
```
SUPABASE_URL=https://niwftjjdxrevahfpfvgd.supabase.co
SUPABASE_SERVICE_ROLE_KEY=...
```

## Supabase (Frontend)
```
VITE_SUPABASE_URL=https://niwftjjdxrevahfpfvgd.supabase.co
VITE_SUPABASE_ANON_KEY=...
```

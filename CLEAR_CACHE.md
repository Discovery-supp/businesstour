# Instructions pour Corriger les Erreurs

## Erreur : showSuccess is not defined

Cette erreur est probablement due au cache de Vite. Pour la corriger :

1. **Arrêtez le serveur de développement** (Ctrl+C dans le terminal)

2. **Supprimez le cache et redémarrez** :
   ```bash
   # Supprimer le dossier node_modules/.vite
   Remove-Item -Recurse -Force node_modules\.vite -ErrorAction SilentlyContinue
   
   # Redémarrer le serveur
   npm run dev
   ```

3. **Dans le navigateur** :
   - Appuyez sur `Ctrl+Shift+R` (ou `Cmd+Shift+R` sur Mac) pour forcer le rechargement
   - Ou ouvrez les DevTools (F12) → Onglet Network → Cochez "Disable cache"

## Erreur : Table 'bookings' n'existe pas

Cette erreur est normale si vous n'avez pas encore créé les tables dans Supabase.

**Solution** :
1. Allez sur https://mdqorcieguqtxykshbgm.supabase.co
2. Cliquez sur **SQL Editor** dans le menu de gauche
3. Copiez tout le contenu du fichier `supabase-schema.sql`
4. Collez-le dans l'éditeur SQL
5. Cliquez sur **Run** (ou appuyez sur Ctrl+Enter)
6. Vérifiez que les 3 tables sont créées dans **Table Editor**

Après avoir créé les tables, les erreurs Supabase disparaîtront.

## Warning : Input non contrôlé

Ce warning est mineur et n'affecte pas le fonctionnement. Il peut être ignoré ou corrigé en s'assurant que toutes les valeurs d'input sont initialisées avec une string vide `''` au lieu de `undefined`.

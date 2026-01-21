# Guide : Ajouter des Images pour les Salons et Foires

## 📁 Emplacement des Images

Placez vos images dans le dossier : `public/salons/`

**Note** : Les images dans le dossier `public` sont accessibles directement via l'URL `/salons/nom-image.jpg`

## 📝 Format des Images

- **Format recommandé** : JPG ou PNG
- **Taille recommandée** : 800x600 pixels (ratio 4:3)
- **Poids** : Optimisez les images pour le web (max 500KB par image)

## 🖼️ Nommage des Images

Nommez vos images selon cette convention :
- `salon-1.jpg` - Pour le premier salon
- `salon-2.jpg` - Pour le deuxième salon
- `salon-3.jpg` - Pour le troisième salon
- etc.

## 📋 Étapes pour Ajouter vos Images

1. **Préparez vos images** :
   - Redimensionnez-les à 800x600 pixels
   - Optimisez-les pour le web (utilisez un outil comme TinyPNG)

2. **Placez-les dans le dossier** :
   ```
   public/salons/
   ├── salon-1.jpg
   ├── salon-2.jpg
   ├── salon-3.jpg
   ├── salon-4.jpg
   ├── salon-5.jpg
   └── salon-6.jpg
   ```

3. **Mettez à jour le code** (optionnel) :
   Si vous voulez utiliser des imports directs au lieu de chemins relatifs, décommentez les imports en haut de `src/pages/SalonsPage.tsx` et utilisez-les dans le tableau `salons`.

## 🔧 Utilisation avec Vite

Les images dans le dossier `public/` sont servies directement et accessibles via des chemins absolus (commençant par `/`). Elles ne sont pas optimisées par Vite, mais sont plus faciles à gérer et à remplacer.

## 💡 Alternative : Images Externes

Si vous préférez utiliser des URLs externes (CDN, etc.), modifiez simplement le champ `image` dans le tableau `salons` de `src/pages/SalonsPage.tsx` :

```typescript
{
  id: '1',
  name: 'Salon International...',
  image: 'https://votre-cdn.com/image.jpg', // URL externe
  // ...
}
```

## ⚠️ Note

Si une image ne charge pas, un placeholder avec une icône sera affiché automatiquement.

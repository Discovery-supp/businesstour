# Ajouter l'image de fond pour la section CTA

## Instructions

1. **Télécharge l'image de l'événement** (la photo de la conférence avec le public)

2. **Renomme l'image** en : `conference-background.jpg`

3. **Place l'image** dans le dossier : `public/images/conference-background.jpg`

   Si le dossier `public/images` n'existe pas, crée-le d'abord.

4. **Format recommandé** :
   - Format : JPG ou PNG
   - Taille : Au moins 1920x1080 pixels pour une bonne qualité
   - Poids : Optimise l'image (max 500KB recommandé)

## Alternative : Utiliser une URL externe

Si tu préfères utiliser une image hébergée ailleurs, modifie dans `src/pages/HomePage.tsx` :

```tsx
backgroundImage: 'url(https://ton-url-image.com/image.jpg)',
```

## Vérification

Une fois l'image ajoutée :
1. Redémarre le serveur de développement (`npm run dev`)
2. Va sur la page d'accueil
3. Scroll jusqu'à la section "Prêt à Transformer Votre Vision en Réalité?"
4. Tu devrais voir l'image en arrière-plan avec un overlay sombre pour la lisibilité

## Personnalisation

Si tu veux ajuster l'overlay (la couche sombre par-dessus l'image), modifie dans `HomePage.tsx` :

```tsx
// Plus sombre (texte plus lisible)
<div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/70 to-black/80"></div>

// Plus clair (image plus visible)
<div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/40 to-black/50"></div>
```

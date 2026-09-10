# Pixel Draw

Adaptation web simplifiée d'un ancien projet **TIC-80**, réécrite en HTML/CSS/JS
pur pour être jouable directement dans un navigateur, sans installation ni
console fantasy — pour une meilleure accessibilité.

Le principe mélange **puzzle** et **dessin en pixel art** : un modèle est affiché
en référence, et la palette ne contient que le nombre exact de pixels de chaque
couleur nécessaires pour le reproduire. À toi de les placer au bon endroit.

## Jouer

Ouvre simplement [`index.html`](index.html) dans un navigateur — aucun serveur
requis, tous les chemins sont relatifs.

## Fonctionnement

- **Grille 16 × 16** : glisse le doigt ou la souris pour colorier plusieurs
  cases d'un trait.
- **Modèle à reproduire** : affiché au-dessus de la grille, avec une animation
  d'éclosion (bouton « Animer l'éclosion »).
- **Palette limitée** : 3 couleurs, chacune avec un compteur qui décroît à
  mesure que tu poses des pixels. Quand une couleur atteint 0, elle est épuisée —
  c'est la contrainte de puzzle.
- **Outils** :
  - *Annuler* — revient en arrière (historique de 25 étapes).
  - *Gomme* — retire des pixels et récupère le stock de la couleur.
  - *Effacer* — vide toute la grille.
  - *Télécharger* — exporte le dessin en PNG (rendu net, sans lissage).
- **Retours visuels** : animation « pop » et éclat de particules à chaque pixel
  posé. Respecte `prefers-reduced-motion`.
- **Pensé mobile** : zoom désactivé, `touch-action` géré, capture du pointeur
  pour un tracé fluide au doigt.

## Architecture

```
dessinPixel/
├── index.html            structure HTML
├── LICENSE               licence MIT
├── README.md
└── assets/
    ├── css/style.css     styles, thème et animations
    └── js/app.js         logique du jeu (grille, palette, outils, export)
```

Aucune dépendance, aucun build.

## Licence

Projet sous licence MIT — voir [LICENSE](LICENSE).

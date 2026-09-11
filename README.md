# Pixel Draw

Adaptation web d'un ancien projet **TIC-80 / Solar2D**, réécrite en HTML/CSS/JS
pur pour être jouable directement dans un navigateur, sans installation ni
console fantasy — pour une meilleure accessibilité.

Le principe mélange **puzzle** et **dessin en pixel art** : un modèle est affiché
en miniature, et la palette ne contient que le nombre exact de pixels de chaque
couleur nécessaires pour le reproduire. À toi de les placer au bon endroit,
case par case, jusqu'à ce que ta grille corresponde au modèle.

## Jouer

Ouvre [`index.html`](index.html) à la racine dans un navigateur — aucune
dépendance, aucun serveur requis (chemins relatifs).

## Versions

Le dépôt garde l'historique des itérations du projet, chacune dans son propre
dossier autonome (structure `index.html` + `assets/css` + `assets/js`) :

- **Racine** (`index.html`) — version courante : prototype de dessin en pixel
  art (grille libre, modèle unique à reproduire avec un stock de couleurs
  limité).
- [`v1/`](v1/) — version antérieure : le jeu *PixArt Puzzle* complet issu du
  cahier des charges ([`idea/charge.md`](idea/charge.md)) — 9 dessins, 3
  écrans, sélection paginée, progression sauvegardée. Ouvrir
  [`v1/index.html`](v1/index.html). Ajouter `?dev` à l'URL affiche le bouton
  « Résoudre » (outil de développement).
- [`alpha/`](alpha/) — version antérieure : implémentation de référence
  ayant servi de base à `v1/` (§12 du cahier des charges). Ouvrir
  [`alpha/index.html`](alpha/index.html).

## `v1/` — PixArt Puzzle (détail)

### Écrans

- **Titre** — logo, mascotte pixel art, toute la zone est cliquable.
- **Sélection** — vignettes 3 × 2 paginées, rendues à partir des vraies grilles ;
  états *terminée* (✓), *verrouillée* (🔒), *bientôt disponible* (ruban).
- **Jeu** — modèle + total de pixels, grille interactive avec repères
  arc-en-ciel sur les bords, palette avec stock restant, barre d'outils.

### Règles

- **Clic court** sur une case : pose la couleur sélectionnée si son stock est
  > 0. Si la case contenait une autre couleur, celle-ci est recréditée.
- **Appui long (≥ 300 ms)** : efface la case, quel que soit le mode.
- **Glisser** : peint / efface en continu sur plusieurs cases.
- **Molette** au-dessus de la grille : fait défiler la couleur active.
- **Effacer** : bascule un mode gomme (le bouton clignote en arc-en-ciel).
- **Solution** : encadre quelques secondes les cases erronées ou manquantes.
- Le compteur « restants » = nombre de cases qui diffèrent encore du modèle ;
  à 0 → victoire (confettis).

### Progression

Les puzzles sont ordonnés ; le premier est débloqué, chaque suivant se débloque
quand le précédent est terminé. La progression est sauvegardée dans le
navigateur (`localStorage`), avec repli silencieux si le stockage est
indisponible (navigation privée…).

### Contenu

**9 dessins jouables**, répartis sur 3 pages de sélection :

| Page | Dessins |
|------|---------|
| 1 | Star · Cat2 · Cat1 · Puzzle1 · Flower1 · Flower2 |
| 2 | Elephant · *(Puzzle2)* · Sugar1 · *(Planet1)* · *(Cake1)* · *(Batman)* |
| 3 | *(Flower#3)* · Snake#1 · *(Bird#1)* · *(Icone#1)* · *(Fish#1)* |

Les entrées entre parenthèses sont des emplacements « BIENTÔT » (nom et
difficulté réels, grille pas encore portée).

Les grilles proviennent de [`alpha/`](alpha/) (portées depuis
`Solar2D/data/drawMap1-3.lua` du dépôt `GT-Steeve/puzzleGame`). Au chargement,
`colorsNb` est **systématiquement recalculé par comptage réel** des cases de
chaque grille (§4.4) ; les 9 puzzles ont été vérifiés, stock total = nombre
exact de cases à colorier, Flower2 compris.

## Architecture

```
dessinPixel/
├── index.html                 version courante — prototype de dessin en pixel art
├── assets/
│   ├── favicon.svg            icône d'onglet
│   ├── css/style.css
│   └── js/app.js
├── v1/                         ancienne version — jeu PixArt Puzzle complet
│   ├── index.html
│   └── assets/
│       ├── favicon.svg
│       ├── css/style.css      styles, thème, animations
│       └── js/app.js          logique + données des 9 puzzles (DATA)
├── alpha/                      ancienne version — implémentation de référence
│   ├── index.html
│   └── assets/
│       ├── favicon.svg
│       ├── css/style.css
│       └── js/app.js
├── LICENSE                     licence MIT
├── README.md
├── patchNote.txt               historique des versions
└── idea/
    └── charge.md                cahier des charges de référence
```

## Licence

Projet sous licence MIT — voir [LICENSE](LICENSE).

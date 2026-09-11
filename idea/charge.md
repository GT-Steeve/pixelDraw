# PixArt Puzzle — Cahier des charges

Document de transmission pour reconstruire le jeu (version HTML5) sur un autre poste ou avec un autre outil (Cursor, Windsurf, Claude en local, etc.). Il décrit le concept, les mécaniques, le format de données et la direction artistique d'une implémentation de référence déjà réalisée en HTML/CSS/JS (canvas, sans dépendance externe).

Projet source analysé : dépôt `GT-Steeve/puzzleGame`, version **Solar2D** (Lua), un jeu de coloriage pixel-art "à numéros" conçu à l'origine pour un enfant de 3 ans.

---

## 1. Concept du jeu

Le joueur reproduit un dessin en pixel-art caché en posant des carrés de couleur sur une grille vierge, case par case, jusqu'à ce que la grille corresponde exactement au modèle affiché en miniature. Chaque couleur est disponible en stock limité (un nombre fixe de pixels par couleur, correspondant exactement au nombre de cases de cette couleur dans le modèle).

---

## 2. Écrans

### 2.1 Écran titre
- Fond décoratif, mascotte en pixel-art (ex. une petite étoile dans la palette du jeu).
- Texte d'accroche clignotant du type « Touche ici pour commencer ».
- Toute la zone est cliquable → mène à l'écran de sélection.

### 2.2 Écran de sélection
- Titre « Choisis ton dessin » + compteur global « X / Y terminés ».
- Grille de vignettes **3 colonnes × 2 lignes** (6 emplacements par page), paginée avec flèches gauche/droite et indicateur « page / total ».
- Chaque vignette réelle affiche : miniature rendue à partir de la grille du puzzle (pixels réels, pas une image statique), nom, pastille de difficulté (Easy / Normal / Hard).
- États d'une vignette :
  - **Terminée** → badge ✓.
  - **Verrouillée** (puzzle réel pas encore débloqué) → cadenas 🔒, miniature grisée, clic = petite secousse + message « Termine le dessin précédent pour débloquer celui-ci ! ».
  - **Bientôt disponible** (puzzle prévu mais pas encore intégré) → ruban « BIENTÔT », cadenas, clic = message « Bientôt disponible ! ».
  - **Case vide** → simple croix, non cliquable (pas de contenu prévu à cet emplacement).

### 2.3 Écran de dessin (le jeu)
Disposition en 3 zones (empilées verticalement sur mobile) :
1. **Modèle** (gauche) : mini-rendu du puzzle complet + nombre total de pixels.
2. **Grille interactive** (centre) : la grille vierge à colorier, avec des **repères arc-en-ciel** le long du bord haut et gauche (une teinte différente par colonne/ligne, formule `hue = (index * 47) % 360`) pour aider à se repérer visuellement entre le modèle et la grille.
3. **Palette de couleurs** (droite, ou en bas sur mobile) : une pastille par couleur disponible dans ce puzzle, avec son stock restant affiché (« ×N »), la couleur sélectionnée est mise en évidence.

Barre du haut : bouton retour, nom + difficulté du puzzle, compteur de pixels restants à poser.

Barre d'outils (bas) :
- **Effacer** : bascule un mode suppression (le curseur change, le bouton clignote en arc-en-ciel tant qu'actif).
- **Solution** : encadre pendant quelques secondes toutes les cases mal placées ou manquantes, avec un contour qui change de couleur en boucle.
- **Retour**.
- (optionnel, outil de test/démo) un bouton qui termine instantanément le puzzle — utile en développement, à cacher ou retirer en version finale destinée à l'enfant.

Écran de victoire : overlay avec confettis, message « Terminé ! », bouton vers le dessin suivant (si débloqué) et bouton retour à la sélection.

---

## 3. Règles d'interaction (le cœur du gameplay)

- **Clic court sur une case** :
  - Si le mode suppression est actif → efface la case (la couleur retourne dans le stock).
  - Sinon → pose la couleur actuellement sélectionnée, **seulement si son stock est > 0**. Si la case contenait déjà une autre couleur, cette couleur est recréditée dans son propre stock avant la pose. Si la case contient déjà exactement la couleur choisie, rien ne se passe.
- **Appui long (≥ 300 ms) sur une case** : efface toujours la case, quel que soit le mode actif (raccourci pratique pour un enfant qui n'a pas besoin de changer de mode).
- **Molette de la souris au-dessus de la grille** : fait défiller la couleur sélectionnée dans la palette (utile sur ordinateur ; sur tactile, on touche directement une pastille).
- **Sélection d'une couleur** : clic/tap sur sa pastille dans la palette.
- Un compteur « restants » = nombre de cases qui diffèrent encore entre la grille du joueur et le modèle. Quand il atteint 0 → victoire.

---

## 4. Modèle de données

### 4.1 Palette de couleurs

Palette fixe à 18 teintes (héritée du projet source, style "fantasy console" façon TIC-80) :

| Index | Hex       | Index | Hex       |
|------:|-----------|------:|-----------|
| 0     | `#1a1c2c` | 9     | `#3b5fc9` |
| 1     | `#5d275d` | 10    | `#41a6f6` |
| 2     | `#b13e53` | 11    | `#73eff7` |
| 3     | `#ef7d57` | 12    | `#f4f4f4` |
| 4     | `#ffcd75` | 13    | `#94b0c2` |
| 5     | `#a7f070` | 14    | `#566c86` |
| 6     | `#38b764` | 15    | `#333c57` |
| 7     | `#257179` | 16    | `#e9babb` |
| 8     | `#29366f` | 17    | `#f2664c` |

L'index **99** est réservé et signifie « case vide » (ni couleur du modèle, ni couleur posée par le joueur).

### 4.2 Format d'un puzzle

Chaque puzzle est un objet avec :

```json
{
  "id": "identifiant-unique",
  "name": "Nom affiché",
  "difficulty": "Easy | Normal | Hard",
  "colors": [0, 6, 7, 16],
  "colorsNb": [69, 54, 30, 2],
  "grid": [[99, 99, 0, ...], ...]
}
```

- `grid` : tableau 2D (lignes × colonnes) d'indices de couleur (0–17, ou 99 pour vide). Recadré sur la boîte englobante du dessin (pas de marge de 99 inutile autour).
- `colors` : liste ordonnée des couleurs utilisées → détermine l'ordre d'affichage dans la palette du jeu.
- `colorsNb` : nombre de pixels de chaque couleur — **doit être recalculé en comptant réellement les occurrences dans `grid`** (le stock total doit toujours être exactement égal au nombre de cases non-99, sinon le puzzle devient impossible à finir). Ne pas se fier aveuglément à des valeurs déjà présentes dans une source externe sans les revérifier.

### 4.3 Exemple complet (« Snake#1 », 15×15)

```json
{
  "id": "page3-2",
  "name": "SNAKE#1",
  "difficulty": "Easy",
  "colors": [0, 6, 7, 16],
  "colorsNb": [69, 54, 30, 2],
  "grid": [
    [99,99,99,99,0,0,0,0,0,99,99,99,99,99,99],
    [99,99,99,0,6,6,6,6,6,0,99,99,99,99,99],
    [99,99,99,0,6,6,6,6,6,6,0,99,99,99,99],
    [99,99,0,6,0,6,6,6,0,6,0,99,99,99,99],
    [99,99,0,6,0,6,6,6,0,6,7,0,99,99,99],
    [99,99,0,16,6,6,6,6,6,16,7,0,99,99,99],
    [99,99,99,0,7,7,7,7,7,7,0,99,99,99,99],
    [99,99,99,99,0,0,0,0,0,0,0,99,99,99,99],
    [99,99,0,0,6,6,0,6,6,7,0,0,99,99,99],
    [99,0,6,6,0,0,6,6,7,7,0,6,0,99,99],
    [0,6,6,0,7,7,7,7,7,0,6,0,6,0,99],
    [0,6,6,6,0,0,0,0,0,6,6,6,0,7,0],
    [0,7,6,6,6,6,6,6,6,6,6,7,0,7,0],
    [0,0,7,7,7,7,7,7,7,7,7,0,0,7,0],
    [99,99,0,0,0,0,0,0,0,0,0,99,99,0,99]
  ]
}
```

### 4.4 Où trouver d'autres dessins

Les grilles complètes de tous les puzzles existent déjà dans le dépôt d'origine, en Lua, ici :
`Solar2D/data/drawMap1.lua`, `drawMap2.lua`, `drawMap3.lua`
(dépôt : `github.com/GT-Steeve/puzzleGame`, branche/dossier `Solar2D`).

Chaque entrée Lua a la même structure que le JSON ci-dessus (`grid`, `data.colors`, `data.name`, `data.difficulty`, etc.) — il suffit de convertir la syntaxe de table Lua en tableau/JSON, puis de **recalculer `colorsNb`** par comptage réel plutôt que de recopier les valeurs Lua (un des puzzles de la source, « Flower2 », contient d'ailleurs une petite incohérence dans ses totaux d'origine).

---

## 5. Progression et sauvegarde

- Les puzzles réels sont ordonnés (toutes pages confondues) ; le premier est toujours débloqué.
- Un puzzle est débloqué dès que le précédent de la liste est marqué terminé.
- Les emplacements « Bientôt disponible » ne comptent pas dans cette chaîne de déblocage — ce sont juste des cases réservées pour de futurs dessins.
- La progression (liste des puzzles terminés) est sauvegardée **localement dans le navigateur** (`localStorage`), donc propre à chaque appareil/navigateur. Prévoir un repli silencieux si le stockage est indisponible (navigation privée, etc.) : le jeu doit rester jouable, juste sans mémoire d'une session à l'autre.

---

## 6. Animations et retours visuels

- **Pose d'un pixel** : petite explosion de particules colorées (façon feu d'artifice) centrée sur la case.
- **Suppression d'un pixel** : particules qui convergent vers le centre de la case (effet inverse).
- **Bouton Solution** : contour pulsant en dégradé de teintes (cycle de couleurs dans le temps) autour de chaque case erronée, pendant quelques secondes.
- **Victoire** : confettis tombants sur toute la zone de jeu + bannière de félicitations.
- Respecter `prefers-reduced-motion` : proposer une version statique ou très atténuée des animations pour les utilisateurs qui le demandent.

---

## 7. Direction artistique (référence)

L'implémentation de référence choisit une identité "atelier pixel-art pour enfant", volontairement différente d'un style générique :

- **Typographies** : `Baloo 2` (titres, rond et enfantin), `Nunito` (texte courant), `Press Start 2P` (accents pixel : logo, compteurs numériques, difficulté) — via Google Fonts.
- **Palette d'interface** (distincte de la palette de jeu ci-dessus) : fond crème chaud, encre violet/indigo comme couleur d'accent, corail en secondaire, avec une variante sombre complète (respect de `prefers-color-scheme`).
- **Mise en page** : une carte centrale façon "console" avec un bandeau du haut composé de bandes fines reprenant les vraies couleurs de la palette de jeu (comme une bande de nuancier peinture) — clin d'œil direct au contenu du jeu plutôt qu'une décoration générique.
- Cellules de la grille assez grandes pour de petits doigts (jusqu'à ~34px de côté sur les petites grilles), avec redimensionnement automatique selon la taille du puzzle (grille pouvant aller jusqu'à ~38×38 cases).

Cette direction est une proposition ; à adapter librement si une autre identité visuelle est souhaitée — l'essentiel à conserver, ce sont les mécaniques décrites en section 3.

---

## 8. Pile technique recommandée

- Un seul fichier HTML autonome (CSS + JS inline), rendu de la grille en `<canvas>` (`imageSmoothingEnabled = false` pour un rendu pixel-art net), pas de dépendance de build.
- Gestion tactile ET souris via les Pointer Events (`pointerdown` / `pointerup` avec mesure du temps écoulé pour distinguer clic court / appui long).
- Pas de framework nécessaire ; JS natif suffit largement vu la taille du projet.
- Alternative fidèle à l'esprit d'origine : reporter ces mêmes règles dans **Solar2D** (comme le projet source), auquel cas la section 4 (format de données) et la section 3 (règles d'interaction) restent la spécification à suivre à l'identique — seule la couche de rendu (`display.*` au lieu de `canvas`) change.

---

## 9. Arborescence suggérée

```
pixart-puzzle/
├── index.html          # le jeu (structure + styles + logique)
├── data/
│   └── puzzles.json     # tous les puzzles (voir format en 4.2), séparés du code si le projet grossit
└── README.md            # résumé du concept + captures d'écran
```

(Dans l'implémentation de référence, `puzzles.json` est simplement inclus en dur dans `index.html` pour rester un fichier unique facile à partager — à séparer si le nombre de dessins devient important.)

---

## 10. Dessins à intégrer

**Déjà portés et jouables** (grilles réelles vérifiées) : Star, Cat2, Cat1, Puzzle1, Flower1, Flower2, Elephant, Sugar1, Snake#1 — 9 dessins au total, répartis sur 3 pages de sélection.

**Prévus mais pas encore portés** (noms et difficultés réels de la source, grilles à extraire depuis `drawMap2.lua` / `drawMap3.lua` en suivant la section 4.4) : Puzzle2 (Hard), Planet1 (Normal), Cake1 (Hard), Batman (Normal), Flower#3 (Easy), Bird#1 (Normal), Icone#1 (Normal), Fish#1 (Easy).

---

## 11. Pistes d'évolution (reprises des notes de développement d'origine)

- Musique et effets sonores.
- Un « œil magique » : survoler la mini-grille quelques secondes pour reproduire de mémoire.
- Limiter le nombre d'indices/marquages disponibles pour augmenter la difficulté.
- Petit quiz sur le nom des couleurs pour débloquer davantage de dessins.
- Support manette/clavier plus poussé pour l'accessibilité.

---

## 12. Référence de démonstration

Une implémentation HTML5 complète suivant exactement cette spécification a été réalisée et testée (souris, tactile, thème clair/sombre). Elle peut servir de référence de comportement en cas de doute sur une règle du jeu.

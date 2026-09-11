(function(){
  "use strict";
  var $ = function(s){ return document.querySelector(s); };

  /* ============================================================
     1. Palette de jeu (§4.1) — 18 teintes, index 99 = case vide
     ============================================================ */
  var PALETTE = [
    '#1a1c2c','#5d275d','#b13e53','#ef7d57','#ffcd75','#a7f070',
    '#38b764','#257179','#29366f','#3b5fc9','#41a6f6','#73eff7',
    '#f4f4f4','#94b0c2','#566c86','#333c57','#e9babb','#f2664c'
  ];
  var EMPTY = 99;
  var DEV = /[?&]dev/.test(location.search);
  var reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var _cs = getComputedStyle(document.documentElement);
  function css(v){ return _cs.getPropertyValue(v).trim(); }

  /* ============================================================
     2. Données puzzles (§4.2 / §4.4)
     Grilles portées depuis Solar2D/data/drawMap1-3.lua (GT-Steeve/puzzleGame),
     recadrées sur la boîte englobante. colorsNb est TOUJOURS recalculé ici
     par comptage réel des occurrences dans la grille (voir buildPuzzle).
     ============================================================ */
  var DATA = {"page1":[{"id":"page1-1","name":"Star","difficulty":"Easy","colors":[0,2,3,4,5,6,9,10,11],"colorsNb":[64,11,21,20,27,22,12,5,3],"grid":[[99,99,99,99,99,99,99,99,99,0,99,99,99,99,99,99,99,99,99],[99,99,99,99,99,99,99,99,0,2,0,99,99,99,99,99,99,99,99],[99,99,99,99,99,99,99,0,2,2,3,0,99,99,99,99,99,99,99],[99,99,99,99,99,99,99,0,2,3,3,0,99,99,99,99,99,99,99],[99,99,99,99,99,99,0,2,3,3,3,4,0,99,99,99,99,99,99],[99,99,99,99,99,99,0,3,3,3,4,4,0,99,99,99,99,99,99],[0,0,0,0,0,0,3,3,3,4,4,4,5,0,0,0,0,0,0],[0,2,2,2,2,3,3,0,4,4,4,0,5,5,6,6,6,9,0],[99,0,2,2,3,3,3,0,4,4,5,0,5,6,6,6,9,0,99],[99,99,0,3,3,3,4,0,4,5,5,0,6,6,6,9,0,99,99],[99,99,99,0,3,4,4,4,5,5,5,6,6,6,9,0,99,99,99],[99,99,99,99,0,4,4,5,5,5,6,6,6,9,0,99,99,99,99],[99,99,99,99,0,4,5,5,5,6,6,6,9,9,0,99,99,99,99],[99,99,99,0,4,5,5,5,6,6,6,9,9,9,10,0,99,99,99],[99,99,99,0,5,5,5,6,0,0,0,9,9,10,10,0,99,99,99],[99,99,0,5,5,5,0,0,99,99,99,0,0,10,10,11,0,99,99],[99,99,0,5,5,0,99,99,99,99,99,99,99,0,11,11,0,99,99],[99,99,0,0,0,99,99,99,99,99,99,99,99,99,0,0,0,99,99]],"rows":18,"cols":19},{"id":"page1-2","name":"Cat2","difficulty":"Normal","colors":[0,2,3,4],"colorsNb":[121,58,195,128],"grid":[[99,99,99,99,0,0,0,99,99,99,99,99,99,99,99,99,99,99,99,99,0,0,0,99],[99,99,99,0,2,2,2,0,0,99,99,99,99,99,99,99,99,99,0,0,2,2,2,0],[99,99,99,0,2,3,3,2,2,0,0,0,0,0,0,0,0,0,2,2,3,3,2,0],[99,99,99,0,2,3,3,0,0,2,3,2,3,2,3,2,3,2,0,0,3,3,2,0],[99,99,99,0,2,3,0,3,3,2,3,2,3,2,3,2,3,2,3,3,0,3,2,0],[99,99,99,0,2,0,3,3,3,3,3,2,3,2,3,2,3,3,3,3,3,0,2,0],[99,99,99,99,0,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,0,99],[99,99,99,99,0,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,0,99],[99,99,99,99,0,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,0,99],[99,99,99,0,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,0],[99,99,99,0,2,2,3,0,0,0,3,3,3,3,3,3,3,0,0,0,3,2,2,0],[99,99,99,0,3,3,3,3,3,3,3,0,3,0,3,0,3,3,3,3,3,3,3,0],[99,99,99,0,2,2,3,3,4,4,4,4,0,4,0,4,4,4,4,3,3,2,2,0],[99,99,99,0,3,3,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,3,3,0],[99,99,99,99,0,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,0,99],[99,99,99,99,0,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,0,99],[99,99,99,99,99,0,0,4,4,4,4,4,4,4,4,4,4,4,4,4,0,0,99,99],[99,99,99,99,0,3,3,0,0,4,4,4,4,4,4,4,4,4,0,0,3,3,0,99],[99,0,0,99,0,2,3,3,3,4,4,4,0,0,0,4,4,4,3,3,3,2,0,99],[0,2,2,0,3,3,3,3,3,4,4,4,4,4,4,4,4,4,3,3,3,3,3,0],[0,2,3,0,2,2,2,3,3,4,4,4,4,4,4,4,4,4,3,3,2,2,2,0],[99,0,3,0,3,3,3,3,3,3,4,4,4,4,4,4,4,3,3,3,3,3,3,0],[99,99,0,0,2,2,2,3,3,3,4,4,4,4,4,4,4,3,3,3,2,2,2,0],[99,99,99,0,0,3,3,3,3,3,4,4,4,4,4,4,4,3,3,3,3,3,0,99],[99,99,99,99,99,0,0,2,3,3,0,4,0,4,0,4,0,3,3,2,0,0,99,99],[99,99,99,99,99,99,99,0,0,0,0,0,0,0,0,0,0,0,0,0,99,99,99,99]],"rows":26,"cols":24},{"id":"page1-3","name":"Cat1","difficulty":"Easy","colors":[0,13,4,2],"colorsNb":[85,173,8,21],"grid":[[99,99,99,99,99,99,99,99,99,99,99,0,0,0,0,99,99,99,99],[99,99,99,99,99,99,99,99,0,0,0,13,13,13,13,0,99,99,99],[99,99,99,99,99,99,0,0,13,13,13,13,13,13,0,0,99,99,99],[99,99,99,99,99,0,13,13,13,13,13,13,13,13,13,0,99,99,99],[99,99,99,0,0,13,13,13,13,13,13,13,13,13,13,13,0,99,99],[99,99,0,13,13,13,13,13,13,13,13,13,13,13,13,13,0,99,99],[99,0,13,13,13,13,13,13,13,13,13,13,0,0,13,13,13,0,0],[99,0,13,13,0,13,13,13,13,13,13,13,0,0,4,4,13,0,99],[99,99,0,0,13,13,0,0,13,13,13,13,13,13,4,4,0,0,0],[99,99,0,13,13,13,0,0,13,13,0,13,13,13,13,13,13,0,99],[99,0,0,0,13,4,4,13,13,13,13,13,13,13,13,13,0,99,99],[99,99,0,13,13,4,4,13,13,13,13,13,13,13,0,0,99,99,99],[99,99,99,0,13,13,13,13,13,13,13,2,2,2,2,2,0,99,99],[99,0,99,99,0,0,0,2,2,2,2,2,2,2,2,13,0,99,99],[0,13,0,99,99,0,2,2,2,2,2,13,2,13,13,13,13,0,99],[0,13,13,0,99,0,13,13,13,13,2,13,2,13,13,13,13,0,99],[99,0,13,13,0,13,13,13,13,13,13,13,13,13,13,13,13,0,99],[99,99,0,13,0,13,13,13,13,13,13,13,13,13,13,13,0,99,99],[99,99,99,0,0,13,13,13,13,13,13,13,13,13,13,13,0,99,99],[99,99,99,99,0,0,13,13,13,0,13,13,0,13,13,0,99,99,99],[99,99,99,99,99,99,0,0,0,0,0,0,99,0,0,99,99,99,99]],"rows":21,"cols":19},{"id":"page1-4","name":"Puzzle1","difficulty":"Hard","colors":[0,10,6,4,3,2,1,9],"colorsNb":[344,57,56,52,44,32,35,36],"grid":[[99,99,99,99,99,99,0,0,0,0,0,0,99,99,99,99,99,0,0,0,0,0,0,99,99,99,99,99,99],[99,99,99,99,99,0,0,10,6,4,3,0,0,99,99,99,0,0,3,4,6,10,0,0,99,99,99,99,99],[99,99,99,99,99,0,10,6,4,3,2,1,0,0,99,0,0,1,2,3,4,6,10,0,99,99,99,99,99],[99,99,99,99,99,0,6,4,0,0,0,9,10,0,99,0,10,9,0,0,0,4,6,0,99,99,99,99,99],[99,99,99,99,99,0,4,3,0,99,0,10,6,0,99,0,6,10,0,99,0,3,4,0,99,99,99,99,99],[99,0,0,0,0,0,0,0,0,0,0,6,4,0,0,0,0,0,0,0,0,2,3,0,0,0,0,0,99],[0,0,10,6,4,3,2,1,9,10,0,4,3,0,9,2,3,4,6,10,0,1,2,0,4,6,10,0,0],[0,10,6,4,3,2,1,9,10,6,0,3,2,0,10,1,2,3,4,6,0,9,1,0,3,4,6,10,0],[0,6,4,0,0,0,0,0,0,0,0,2,1,0,0,0,0,0,0,0,0,10,9,0,0,0,4,6,0],[0,4,3,0,99,0,10,6,0,99,0,1,9,0,99,0,9,1,0,99,0,6,10,0,99,0,3,4,0],[0,3,2,0,0,0,6,4,0,0,0,9,10,0,99,0,10,9,0,0,0,0,0,0,0,0,2,3,0],[0,0,1,9,10,0,4,3,0,1,9,10,6,0,99,0,6,10,9,1,2,3,4,6,10,9,1,0,0],[99,0,0,10,6,0,3,2,0,9,10,6,4,0,99,0,4,6,10,9,1,2,3,4,6,10,0,0,99],[99,99,0,0,0,0,2,1,0,0,0,0,0,0,99,0,0,0,0,0,0,0,0,0,0,0,0,99,99],[99,99,99,99,99,0,1,9,0,99,99,99,99,99,99,99,99,99,99,99,0,9,1,0,99,99,99,99,99],[99,99,0,0,0,0,0,0,0,0,0,0,0,0,99,0,0,0,0,0,0,1,2,0,0,0,0,99,99],[99,0,0,10,6,4,3,2,1,9,10,6,4,0,99,0,4,6,10,9,0,2,3,0,6,10,0,0,99],[0,0,1,9,10,6,4,3,2,1,9,10,6,0,99,0,6,10,9,1,0,3,4,0,10,9,1,0,0],[0,3,2,0,0,0,0,0,0,0,0,9,10,0,99,0,10,9,0,0,0,4,6,0,0,0,2,3,0],[0,4,3,0,99,0,10,6,0,99,0,1,9,0,99,0,9,1,0,99,0,6,10,0,99,0,3,4,0],[0,6,4,0,0,0,9,10,0,0,0,0,0,0,0,0,1,2,0,0,0,0,0,0,0,0,4,6,0],[0,10,6,4,3,0,1,9,0,6,4,3,2,1,9,0,2,3,0,6,10,9,1,2,3,4,6,10,0],[0,0,10,6,4,0,2,1,0,10,6,4,3,2,1,0,3,4,0,10,9,1,2,3,4,6,10,0,0],[99,0,0,0,0,0,3,2,0,0,0,0,0,0,0,0,4,6,0,0,0,0,0,0,0,0,0,0,99],[99,99,99,99,99,0,4,3,0,99,0,10,6,0,99,0,6,10,0,99,0,3,4,0,99,99,99,99,99],[99,99,99,99,99,0,6,4,0,0,0,9,10,0,99,0,10,9,0,0,0,4,6,0,99,99,99,99,99],[99,99,99,99,99,0,10,6,4,3,2,1,0,0,99,0,0,1,2,3,4,6,10,0,99,99,99,99,99],[99,99,99,99,99,0,0,10,6,4,3,0,0,99,99,99,0,0,3,4,6,10,0,0,99,99,99,99,99],[99,99,99,99,99,99,0,0,0,0,0,0,99,99,99,99,99,0,0,0,0,0,0,99,99,99,99,99,99]],"rows":29,"cols":29},{"id":"page1-5","name":"Flower1","difficulty":"Easy","colors":[0,9,10,6,3,4],"colorsNb":[156,40,252,96,4,1],"grid":[[99,99,99,99,99,99,99,99,99,99,99,0,0,99,0,0,99,99,99,99,99,99,99,99,99,99,99],[99,99,99,99,99,99,99,99,99,99,0,9,9,0,9,9,0,99,99,99,99,99,99,99,99,99,99],[99,99,0,0,0,0,0,99,99,0,9,10,10,10,10,10,9,0,99,99,0,0,0,0,0,99,99],[99,99,0,6,6,6,6,0,99,0,9,10,10,10,10,10,9,0,99,0,6,6,6,6,0,99,99],[99,99,0,6,6,6,6,6,0,9,10,10,10,10,10,10,10,9,0,6,6,6,6,6,0,99,99],[99,99,0,6,6,6,6,6,0,10,10,10,10,10,10,10,10,10,0,6,6,6,6,6,0,99,99],[99,99,0,6,6,6,6,6,0,10,10,10,10,10,10,10,10,10,0,6,6,6,6,6,0,99,99],[99,99,99,0,6,6,6,6,0,10,10,10,10,10,10,10,10,10,0,6,6,6,6,0,99,99,99],[99,99,99,99,0,0,0,0,6,0,10,10,10,10,10,10,10,0,6,0,0,0,0,99,99,99,99],[99,99,0,0,9,10,10,10,0,0,10,10,10,0,10,10,10,0,0,10,10,10,9,0,0,99,99],[99,0,9,9,10,10,10,10,10,10,0,10,10,0,10,10,0,10,10,10,10,10,10,9,9,0,99],[0,9,10,10,10,10,10,10,10,10,10,0,10,0,10,0,10,10,10,10,10,10,10,10,10,9,0],[0,9,10,10,10,10,10,10,10,10,10,10,0,3,0,10,10,10,10,10,10,10,10,10,10,9,0],[99,0,10,10,10,10,10,10,10,0,0,0,3,4,3,0,0,0,10,10,10,10,10,10,10,0,99],[0,9,10,10,10,10,10,10,10,10,10,10,0,3,0,10,10,10,10,10,10,10,10,10,10,9,0],[0,9,10,10,10,10,10,10,10,10,10,0,10,0,10,0,10,10,10,10,10,10,10,10,10,9,0],[99,0,9,9,10,10,10,10,10,10,0,10,10,0,10,10,0,10,10,10,10,10,10,9,9,0,99],[99,99,0,0,9,10,10,10,0,0,10,10,10,0,10,10,10,0,0,10,10,10,9,0,0,99,99],[99,99,99,99,0,0,0,0,6,0,10,10,10,10,10,10,10,0,6,0,0,0,0,99,99,99,99],[99,99,99,0,6,6,6,6,0,10,10,10,10,10,10,10,10,10,0,6,6,6,6,0,99,99,99],[99,99,0,6,6,6,6,6,0,10,10,10,10,10,10,10,10,10,0,6,6,6,6,6,0,99,99],[99,99,0,6,6,6,6,6,0,10,10,10,10,10,10,10,10,10,0,6,6,6,6,6,0,99,99],[99,99,0,6,6,6,6,6,0,9,10,10,10,10,10,10,10,9,0,6,6,6,6,6,0,99,99],[99,99,0,6,6,6,6,0,99,0,9,10,10,10,10,10,9,0,99,0,6,6,6,6,0,99,99],[99,99,0,0,0,0,0,99,99,0,9,10,10,10,10,10,9,0,99,99,0,0,0,0,0,99,99],[99,99,99,99,99,99,99,99,99,99,0,9,9,0,9,9,0,99,99,99,99,99,99,99,99,99,99],[99,99,99,99,99,99,99,99,99,99,99,0,0,99,0,0,99,99,99,99,99,99,99,99,99,99,99]],"rows":27,"cols":27},{"id":"page1-6","name":"Flower2","difficulty":"Normal","colors":[9,10,12,7,5,6],"colorsNb":[170,221,368,28,31,27],"grid":[[99,99,99,99,99,99,99,99,99,99,99,99,99,99,99,9,99,99,99,99,99,9,99,99,99,99,99,99,99,99,99,99,99,99,99,99,99,99],[99,99,99,99,99,99,99,99,99,99,99,99,99,99,9,9,9,99,99,99,9,9,9,99,99,99,99,99,99,99,99,99,99,99,99,99,99,99],[99,99,99,99,99,99,99,99,99,99,99,99,99,9,9,10,9,9,99,9,9,10,9,99,99,99,99,99,9,99,99,99,99,99,99,99,99,99],[99,99,99,99,99,99,99,99,99,9,9,9,99,9,10,12,10,9,9,9,10,12,10,10,99,99,99,9,9,9,99,99,99,99,99,99,99,99],[99,99,99,99,99,99,99,99,99,9,9,10,9,10,12,12,10,9,9,10,12,12,12,10,99,9,9,9,10,9,99,99,99,99,99,99,99,99],[99,99,99,99,99,99,99,99,99,9,10,12,12,10,12,10,9,12,10,10,12,12,9,10,10,10,12,12,12,10,99,99,99,9,99,99,99,99],[99,99,99,99,9,9,99,99,99,9,12,12,12,12,10,10,12,12,12,10,12,9,9,10,10,12,12,12,12,10,99,9,9,9,99,99,99,99],[99,99,99,99,9,9,9,9,9,10,10,12,12,12,12,10,12,12,12,10,9,10,9,9,12,12,9,12,12,10,9,10,9,9,99,99,99,99],[99,99,99,99,9,10,10,10,10,9,10,12,9,10,12,10,12,12,12,9,10,10,10,9,12,12,9,9,10,10,10,12,10,9,99,99,99,99],[99,99,99,99,9,10,12,12,10,10,10,10,9,9,10,10,12,12,12,10,10,12,10,10,12,12,10,9,9,12,12,12,12,10,99,99,99,99],[99,99,99,99,9,10,12,12,12,12,10,9,9,9,9,10,12,12,10,10,12,12,12,10,12,10,10,10,9,12,12,12,12,10,99,99,99,99],[99,9,9,9,9,10,12,12,12,12,12,9,10,10,9,9,10,12,10,12,12,12,12,10,12,10,12,10,10,12,12,12,12,9,9,9,9,9],[99,9,9,10,10,9,9,12,12,12,9,10,10,12,10,9,9,10,12,12,12,12,12,10,10,12,12,12,10,12,12,12,10,10,10,10,9,9],[99,9,10,12,12,10,10,12,12,12,10,10,12,12,12,10,9,9,12,12,12,12,9,9,12,12,12,12,10,12,12,12,10,12,12,10,9,99],[99,99,10,12,12,12,10,12,12,12,10,12,12,12,12,12,10,9,12,12,12,9,10,10,9,9,12,9,10,12,12,10,12,12,12,12,10,99],[99,99,10,10,12,12,12,10,12,12,10,12,12,12,12,12,12,10,9,12,9,10,12,12,10,10,9,10,12,12,10,12,12,12,12,10,9,99],[99,99,99,10,10,12,12,10,10,12,10,12,12,12,12,12,12,12,10,12,10,12,12,12,12,12,10,12,12,10,12,12,12,12,12,10,99,99],[99,99,99,99,10,10,12,12,9,9,12,12,12,12,12,12,12,12,10,10,12,12,12,12,10,10,12,12,10,12,12,12,12,12,10,99,99,99],[99,99,99,99,10,9,9,9,10,10,9,9,12,12,12,12,12,12,12,10,12,12,10,10,12,12,10,10,9,9,12,12,10,10,9,9,99,99],[99,99,9,10,12,12,10,10,12,12,10,9,9,12,12,12,12,12,12,10,12,10,12,12,12,12,12,12,10,9,9,9,12,10,10,9,9,9],[99,9,10,12,12,12,12,12,12,12,12,10,10,9,12,12,12,12,12,10,10,12,12,12,12,12,12,12,12,10,9,12,12,12,10,10,9,9],[9,9,10,12,12,12,12,12,12,12,12,12,12,10,10,10,12,12,12,10,12,12,12,12,12,12,12,12,10,9,12,12,12,12,10,9,9,99],[99,9,9,10,12,12,12,12,12,12,12,12,12,12,10,10,10,10,10,10,12,12,12,12,12,12,12,10,9,12,12,12,12,10,9,99,99,99],[99,99,99,9,10,10,10,12,12,12,12,12,12,12,12,10,10,12,12,12,10,12,12,12,12,10,10,9,12,12,12,12,10,9,99,99,99,99],[99,99,99,99,9,9,9,10,10,10,12,12,12,12,10,10,12,12,12,12,12,10,7,7,10,12,12,12,12,10,10,10,99,99,99,99,99,99],[99,99,99,99,99,5,9,9,9,10,10,10,10,7,7,10,12,12,12,12,12,12,10,7,7,7,7,7,7,6,6,5,99,99,99,99,99,99],[99,99,99,99,99,99,5,5,6,7,7,7,7,7,7,12,12,12,12,12,12,12,10,7,7,7,6,6,6,6,5,5,5,99,99,99,99,99],[99,99,99,99,99,99,99,99,6,6,6,6,7,7,6,10,12,12,12,12,12,12,10,6,7,7,7,6,5,5,99,99,99,99,99,99,99,99],[99,99,99,99,99,99,99,99,5,5,6,7,7,6,5,9,10,12,12,12,12,10,10,5,6,6,7,7,6,5,99,99,99,99,99,99,99,99],[99,99,99,99,99,99,99,5,5,6,6,6,6,5,5,9,9,10,12,12,10,10,9,5,5,5,6,6,6,6,5,99,99,99,99,99,99,99],[99,99,99,99,99,99,99,99,99,5,5,5,5,99,99,99,9,9,10,10,10,9,99,99,99,5,5,5,5,5,99,99,99,99,99,99,99,99],[99,99,99,99,99,99,99,99,99,99,99,99,99,99,99,99,99,9,9,9,9,99,99,99,99,99,99,99,99,99,99,99,99,99,99,99,99,99],[99,99,99,99,99,99,99,99,99,99,99,99,99,99,99,99,99,99,9,9,99,99,99,99,99,99,99,99,99,99,99,99,99,99,99,99,99,99]],"rows":33,"cols":38}],"page2":[{"id":"page2-1","name":"ELEPHANT","difficulty":"Easy","colors":[0,10,9,3],"colorsNb":[181,163,321,2],"grid":[[99,99,99,99,99,99,99,99,0,0,0,0,99,99,99,99,99,99,99,99,99,99,99,99,99,99,99,99,99],[99,99,99,99,99,99,99,0,10,10,10,10,0,99,99,99,99,99,99,99,99,99,99,99,99,99,99,99,99],[99,99,99,99,99,99,0,9,9,9,9,9,10,0,99,99,99,99,99,99,99,99,99,99,99,99,99,99,99],[99,99,99,99,99,99,0,9,9,9,9,0,10,0,99,99,99,99,99,99,99,99,99,99,99,99,99,99,99],[99,99,99,99,99,99,0,9,9,9,9,0,10,0,99,99,99,99,99,99,99,99,99,99,99,99,99,99,99],[99,99,99,99,99,99,99,0,9,9,0,9,10,0,99,99,99,99,99,99,99,99,99,99,99,99,99,99,99],[99,99,99,99,99,99,99,99,0,0,9,9,10,0,99,99,99,99,99,99,99,99,99,99,99,99,99,99,99],[99,99,99,99,99,99,99,0,9,9,9,10,0,99,99,99,99,99,99,99,99,99,99,99,99,99,99,99,99],[99,99,99,99,99,99,0,9,9,9,9,0,99,99,99,99,99,99,99,99,99,99,99,99,99,99,99,99,99],[99,99,99,99,99,99,0,9,9,9,10,0,0,0,0,0,99,99,99,99,99,99,99,99,99,99,99,99,99],[99,99,99,99,99,0,9,9,9,9,0,10,10,10,10,10,0,0,99,99,99,99,99,0,0,0,0,99,99],[99,99,99,99,99,0,9,9,9,9,0,9,9,9,9,9,10,10,0,99,99,0,0,10,10,10,10,0,99],[99,99,99,99,0,9,9,9,9,9,9,9,9,9,9,9,9,9,10,0,0,10,10,9,0,0,9,9,0],[99,99,99,99,0,9,9,9,9,9,9,9,9,9,9,0,0,9,9,10,10,9,9,0,9,9,9,9,0],[99,99,99,99,0,9,9,9,9,9,9,9,9,9,9,9,9,0,9,9,9,0,0,9,9,9,9,9,0],[99,99,99,99,0,9,9,9,9,9,9,9,9,9,9,9,9,9,9,9,9,0,9,9,9,9,9,9,0],[99,99,99,99,99,0,9,9,9,9,9,9,9,9,9,9,9,9,9,9,9,9,9,9,9,9,9,9,0],[99,99,99,99,99,99,0,9,9,9,9,9,9,9,0,9,9,9,9,9,9,9,9,9,9,9,9,9,0],[99,99,99,99,99,99,99,0,0,0,0,0,0,0,9,9,9,9,9,9,9,9,0,0,9,9,9,9,0],[99,99,99,99,99,0,0,0,0,9,0,3,3,0,9,9,9,9,9,9,9,0,10,10,0,9,9,0,99],[99,99,99,99,0,9,9,0,0,9,9,0,0,9,10,9,9,9,9,9,0,0,10,10,10,0,9,0,99],[99,99,99,0,9,9,9,9,9,0,10,10,10,10,0,9,9,9,9,0,9,9,0,10,10,0,0,99,99],[99,99,99,0,9,9,9,9,9,9,0,0,0,0,9,9,9,9,0,9,9,9,9,0,0,0,99,99,99],[99,99,99,99,0,0,9,9,9,9,9,9,9,9,9,9,9,9,9,9,9,9,9,9,0,99,99,99,99],[99,99,99,99,99,99,0,9,9,0,9,9,9,9,9,9,9,9,9,9,9,9,9,0,99,99,99,99,99],[99,99,99,99,99,99,99,0,0,10,10,10,10,10,9,9,9,9,9,9,9,9,0,99,99,99,99,99,99],[99,99,99,99,99,99,0,10,10,10,10,10,10,10,10,9,9,9,9,9,0,0,9,0,99,99,99,99,99],[99,99,99,99,99,0,10,10,10,10,10,10,10,10,10,9,9,9,9,9,9,9,0,99,99,99,99,99,99],[99,99,99,99,99,0,10,10,10,10,10,10,10,10,10,9,9,9,9,9,9,9,0,99,99,99,99,99,99],[99,99,99,99,0,10,10,10,10,10,10,10,10,10,10,10,9,9,9,9,9,9,9,0,99,99,99,99,99],[99,99,99,99,0,10,10,10,10,10,10,10,10,10,10,10,9,9,9,9,9,9,9,0,99,99,99,99,99],[99,99,0,0,0,10,10,10,10,10,10,10,10,10,10,9,9,9,9,9,0,0,0,99,99,99,99,99,99],[99,0,10,10,0,0,10,10,10,10,10,10,10,10,10,9,9,9,9,0,10,10,10,0,99,99,99,99,99],[0,10,10,10,10,0,10,10,10,10,10,10,10,10,9,9,9,9,0,10,10,10,10,10,0,99,99,99,99],[0,10,10,10,10,0,0,10,10,10,10,10,10,9,9,9,9,9,0,10,10,10,10,10,0,99,99,99,99],[0,10,10,10,10,0,9,0,9,9,9,9,9,9,9,9,9,9,0,10,10,10,10,10,0,99,99,99,99],[99,0,10,10,10,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,10,10,10,0,99,99,99,99,99],[99,99,0,0,0,99,99,99,99,99,99,99,99,99,99,99,99,99,99,99,0,0,0,99,99,99,99,99,99]],"rows":38,"cols":29},{"id":"page2-3","name":"SUGAR1","difficulty":"Easy","colors":[0,10,9,4,3,6,11,2,5,12],"colorsNb":[75,14,15,8,9,18,3,6,13,7],"grid":[[99,99,99,99,0,0,0,0,0,0,99,99,99,99],[99,99,99,0,10,10,9,9,9,9,0,99,99,99],[99,99,0,10,10,10,10,9,9,9,9,0,99,99],[99,0,10,10,10,0,0,0,0,9,9,9,0,99],[0,10,10,10,0,4,4,4,3,0,9,9,9,0],[0,10,10,0,4,4,0,3,3,3,0,9,6,0],[0,11,0,4,4,0,2,0,3,3,0,6,6,0],[0,11,0,4,0,2,2,0,3,3,0,6,6,0],[0,11,0,5,0,2,2,2,3,0,6,6,6,0],[99,0,0,5,5,0,0,0,0,6,6,6,6,0],[99,99,0,5,5,5,5,5,5,6,6,6,0,99],[99,99,99,0,5,5,5,5,6,6,6,0,99,99],[99,99,99,99,0,0,0,0,0,0,0,99,99,99],[99,99,99,99,99,99,0,12,0,99,99,99,99,99],[99,99,99,99,99,99,0,12,0,99,99,99,99,99],[99,99,99,99,99,99,0,12,0,99,99,99,99,99],[99,99,99,99,99,99,0,12,0,99,99,99,99,99],[99,99,99,99,99,99,0,12,0,99,99,99,99,99],[99,99,99,99,99,99,0,12,0,99,99,99,99,99],[99,99,99,99,99,99,0,12,0,99,99,99,99,99],[99,99,99,99,99,99,99,0,99,99,99,99,99,99]],"rows":21,"cols":14}],"page3":[{"id":"page3-2","name":"SNAKE#1","difficulty":"Easy","colors":[0,6,7,16],"colorsNb":[69,54,30,2],"grid":[[99,99,99,99,0,0,0,0,0,99,99,99,99,99,99],[99,99,99,0,6,6,6,6,6,0,99,99,99,99,99],[99,99,99,0,6,6,6,6,6,6,0,99,99,99,99],[99,99,0,6,0,6,6,6,0,6,0,99,99,99,99],[99,99,0,6,0,6,6,6,0,6,7,0,99,99,99],[99,99,0,16,6,6,6,6,6,16,7,0,99,99,99],[99,99,99,0,7,7,7,7,7,7,0,99,99,99,99],[99,99,99,99,0,0,0,0,0,0,0,99,99,99,99],[99,99,0,0,6,6,0,6,6,7,0,0,99,99,99],[99,0,6,6,0,0,6,6,7,7,0,6,0,99,99],[0,6,6,0,7,7,7,7,7,0,6,0,6,0,99],[0,6,6,6,0,0,0,0,0,6,6,6,0,7,0],[0,7,6,6,6,6,6,6,6,6,6,7,0,7,0],[0,0,7,7,7,7,7,7,7,7,7,0,0,7,0],[99,99,0,0,0,0,0,0,0,0,0,99,99,0,99]],"rows":15,"cols":15}]};

  /* Emplacements « BIENTÔT » — noms/difficultés réels de la source,
     grilles pas encore portées (§2.2 / §10). */
  var PLACEHOLDERS = {
  page2: [null, {name:'PUZZLE2',difficulty:'Hard'}, null, {name:'PLANET1',difficulty:'Normal'}, {name:'CAKE1',difficulty:'Hard'}, {name:'BATMAN',difficulty:'Normal'}],
  page3: [{name:'FLOWER#3',difficulty:'Easy'}, null, {name:'Bird#1',difficulty:'Normal'}, {name:'Icone#1',difficulty:'Normal'}, {name:'FISH#1',difficulty:'Easy'}, undefined]
};

  var PAGE_ORDER = ['page1','page2','page3'];

  function buildPuzzle(def){
    var counts = {};
    def.grid.forEach(function(row){
      row.forEach(function(v){ if(v!==EMPTY) counts[v] = (counts[v]||0) + 1; });
    });
    var present = Object.keys(counts).map(Number).sort(function(a,b){ return a-b; });
    var order = (def.colors||[]).filter(function(c){ return counts[c]; });
    present.forEach(function(c){ if(order.indexOf(c) < 0) order.push(c); });
    return {
      id:def.id, name:def.name, difficulty:def.difficulty,
      rows:def.grid.length, cols:def.grid[0].length,
      grid:def.grid.map(function(r){ return r.slice(); }),
      colors:order,
      colorsNb:order.map(function(c){ return counts[c] || 0; }),
      total:order.reduce(function(s,c){ return s + (counts[c]||0); }, 0)
    };
  }

  /* Disposition en 3 pages de 6 emplacements + chaîne de déblocage. */
  var PAGES = [], REAL_ORDER = [], LOOKUP = {};
  PAGE_ORDER.forEach(function(pk){
    var real = DATA[pk] || [];
    var slots = [];
    for(var i=0;i<6;i++){
      var rm = null;
      for(var j=0;j<real.length;j++){ if(real[j].id === pk + '-' + (i+1)){ rm = real[j]; break; } }
      if(rm){
        var built = buildPuzzle(rm);
        slots.push({ type:'real', puzzle:built });
        REAL_ORDER.push(built.id);
        LOOKUP[built.id] = built;
      } else if(PLACEHOLDERS[pk] && PLACEHOLDERS[pk][i]){
        slots.push({ type:'soon', name:PLACEHOLDERS[pk][i].name, difficulty:PLACEHOLDERS[pk][i].difficulty });
      } else {
        slots.push({ type:'empty' });
      }
    }
    PAGES.push(slots);
  });

  function isUnlocked(id){
    var i = REAL_ORDER.indexOf(id);
    if(i <= 0) return true;
    return state.done.has(REAL_ORDER[i-1]);
  }
  function nextRealId(id){
    var i = REAL_ORDER.indexOf(id);
    return (i === -1 || i === REAL_ORDER.length - 1) ? null : REAL_ORDER[i+1];
  }

  /* ============================================================
     3. Sauvegarde locale (§5) — repli silencieux
     ============================================================ */
  var STORE_KEY = 'pixel-draw:done';
  function loadDone(){
    try{ var r = localStorage.getItem(STORE_KEY); return new Set(r ? JSON.parse(r) : []); }
    catch(e){ return new Set(); }
  }
  function saveDone(){
    try{ localStorage.setItem(STORE_KEY, JSON.stringify(Array.from(state.done))); }
    catch(e){}
  }

  /* ============================================================
     4. État
     ============================================================ */
  var state = {
    screen:'title', selPage:0,
    puzzle:null, playId:null,
    player:null, stock:null,
    selColor:null, erase:false,
    solutionUntil:0, cell:20, guide:12,
    done:loadDone()
  };
  var won = false;

  /* ============================================================
     5. Canvas helpers
     ============================================================ */
  function fitCanvas(cv, w, h){
    var dpr = Math.min(window.devicePixelRatio || 1, 2);
    var bw = Math.round(w * dpr), bh = Math.round(h * dpr);
    if(cv.width !== bw || cv.height !== bh){ cv.width = bw; cv.height = bh; }
    cv.style.width = w + 'px'; cv.style.height = h + 'px';
    var c = cv.getContext('2d');
    c.setTransform(dpr, 0, 0, dpr, 0, 0);
    c.imageSmoothingEnabled = false;
    return c;
  }

  function paintMini(cv, grid, box){
    var rows = grid.length, cols = grid[0].length;
    var cell = Math.max(1, Math.floor(box / Math.max(rows, cols)));
    var w = cols * cell, h = rows * cell;
    var ctx = fitCanvas(cv, w, h);
    ctx.clearRect(0, 0, w, h);
    for(var r=0;r<rows;r++) for(var c=0;c<cols;c++){
      var v = grid[r][c];
      if(v === EMPTY) continue;
      ctx.fillStyle = PALETTE[v];
      ctx.fillRect(c*cell, r*cell, cell, cell);
    }
  }

  /* ============================================================
     6. Effets — particules + confettis (§6)
     ============================================================ */
  var fxCanvas = $('#fxCanvas'), fxCtx = null, fxW = 0, fxH = 0, fx = [], fxRunning = false;
  function fitFx(){ fxW = window.innerWidth; fxH = window.innerHeight; fxCtx = fitCanvas(fxCanvas, fxW, fxH); }
  function fxKick(){ if(!fxRunning){ fxRunning = true; requestAnimationFrame(fxStep); } }
  function fxStep(){
    var c = fxCtx;
    c.clearRect(0, 0, fxW, fxH);
    for(var i=fx.length-1;i>=0;i--){
      var p = fx[i];
      if(p.confetti){
        p.x += p.vx; p.y += p.vy; p.vy += 0.03; p.rot += p.vr; p.ttl--;
        c.save(); c.translate(p.x, p.y); c.rotate(p.rot);
        c.fillStyle = p.color; c.fillRect(-p.size/2, -p.size/2, p.size, p.size*0.6); c.restore();
        if(p.ttl <= 0 || p.y > fxH + 40) fx.splice(i, 1);
      } else if(p.inward){
        p.x += (p.tx - p.x) * 0.18; p.y += (p.ty - p.y) * 0.18; p.life -= 0.045;
        c.globalAlpha = Math.max(0, p.life); c.fillStyle = p.color;
        c.fillRect(p.x-2, p.y-2, 4, 4); c.globalAlpha = 1;
        if(p.life <= 0) fx.splice(i, 1);
      } else {
        p.x += p.vx; p.y += p.vy; p.vy += 0.12; p.life -= 0.035;
        c.globalAlpha = Math.max(0, p.life); c.fillStyle = p.color;
        c.fillRect(p.x-2, p.y-2, 4, 4); c.globalAlpha = 1;
        if(p.life <= 0) fx.splice(i, 1);
      }
    }
    if(fx.length) requestAnimationFrame(fxStep);
    else fxRunning = false;
  }
  function cellCenterViewport(r, c){
    var rect = gridCanvas.getBoundingClientRect();
    var w = state.guide + state.puzzle.cols * state.cell;
    var h = state.guide + state.puzzle.rows * state.cell;
    return {
      x: rect.left + (state.guide + c*state.cell + state.cell/2) * (rect.width / w),
      y: rect.top  + (state.guide + r*state.cell + state.cell/2) * (rect.height / h)
    };
  }
  function burst(r, c, color){
    if(reduceMotion) return;
    var p = cellCenterViewport(r, c);
    for(var i=0;i<16;i++){
      var a = Math.PI*2*i/16 + Math.random()*0.4;
      var s = 1.4 + Math.random()*2.6;
      fx.push({ x:p.x, y:p.y, vx:Math.cos(a)*s, vy:Math.sin(a)*s - 1.2, life:1, color:color });
    }
    fxKick();
  }
  function implode(r, c, color){
    if(reduceMotion) return;
    var p = cellCenterViewport(r, c);
    for(var i=0;i<16;i++){
      var a = Math.PI*2*i/16, d = 18 + Math.random()*14;
      fx.push({ inward:true, x:p.x + Math.cos(a)*d, y:p.y + Math.sin(a)*d, tx:p.x, ty:p.y, life:1, color:color });
    }
    fxKick();
  }
  function confetti(){
    if(reduceMotion) return;
    for(var i=0;i<140;i++){
      fx.push({
        confetti:true, x:Math.random()*fxW, y:-20 - Math.random()*fxH*0.5,
        vx:(Math.random()-0.5)*2, vy:2 + Math.random()*3.5,
        rot:Math.random()*6.28, vr:(Math.random()-0.5)*0.35,
        size:5 + Math.random()*5, color:PALETTE[(Math.random()*PALETTE.length)|0],
        ttl:150 + Math.random()*90
      });
    }
    fxKick();
  }

  /* ============================================================
     7. Router d'écrans
     ============================================================ */
  function show(screen){
    state.screen = screen;
    var list = document.querySelectorAll('.screen');
    for(var i=0;i<list.length;i++) list[i].classList.toggle('active', list[i].dataset.screen === screen);
    if(screen === 'select') renderSelect();
  }

  /* ============================================================
     8. Écran titre
     ============================================================ */
  function renderTitle(){ paintMini($('#mascot'), DATA.page1[0].grid, 120); }

  /* ============================================================
     9. Écran sélection (§2.2) — 3 pages de 6 emplacements
     ============================================================ */
  function renderSelect(){
    var pages = PAGES.length;
    state.selPage = Math.max(0, Math.min(state.selPage, pages - 1));

    var doneReal = REAL_ORDER.filter(function(id){ return state.done.has(id); }).length;
    $('#selCounter').textContent = doneReal + ' / ' + REAL_ORDER.length + ' terminés';
    $('#selPager').textContent = (state.selPage + 1) + ' / ' + pages;

    var grid = $('#thumbs');
    grid.innerHTML = '';
    PAGES[state.selPage].forEach(function(slot){
      var el = document.createElement('div');
      el.className = 'thumb';

      if(slot.type === 'empty'){
        el.classList.add('is-empty');
        el.innerHTML = '<span class="x">✕</span>';
        grid.appendChild(el); return;
      }
      if(slot.type === 'soon'){
        el.classList.add('is-soon');
        el.innerHTML = '<span class="ribbon">BIENTÔT</span><span class="lock">🔒</span>' +
                       '<span class="tname">' + slot.name + '</span>';
        el.addEventListener('click', function(){ toast('Bientôt disponible !'); });
        grid.appendChild(el); return;
      }

      var p = slot.puzzle;
      var unlocked = isUnlocked(p.id), done = state.done.has(p.id);

      var cv = document.createElement('canvas');
      cv.className = 'tcanvas';
      el.appendChild(cv);
      var meta = document.createElement('div');
      meta.className = 'tmeta';
      meta.innerHTML = '<span class="tname">' + p.name + '</span>' +
        '<span class="pill ' + p.difficulty.toLowerCase() + '">' + p.difficulty + '</span>';
      el.appendChild(meta);
      paintMini(cv, p.grid, 104);

      if(done){
        el.classList.add('is-done');
        el.insertAdjacentHTML('beforeend', '<span class="check">✓</span>');
      }
      if(!unlocked && !done){
        el.classList.add('is-locked');
        el.insertAdjacentHTML('beforeend', '<span class="lock">🔒</span>');
        el.addEventListener('click', function(){
          el.classList.remove('shake'); void el.offsetWidth; el.classList.add('shake');
          toast('Termine le dessin précédent pour débloquer celui-ci !');
        });
      } else {
        el.addEventListener('click', function(){ startGame(p.id); });
      }
      grid.appendChild(el);
    });
  }

  /* ============================================================
     10. Écran jeu (§2.3 / §3)
     ============================================================ */
  var gridCanvas = $('#gridCanvas');

  function startGame(id){
    won = false;
    $('#winOverlay').classList.remove('show');
    var p = LOOKUP[id];
    state.puzzle = p; state.playId = id;
    state.player = [];
    for(var r=0;r<p.rows;r++) state.player.push(new Array(p.cols).fill(EMPTY));
    state.stock = {};
    p.colors.forEach(function(c, k){ state.stock[c] = p.colorsNb[k]; });
    state.selColor = p.colors[0];
    state.erase = false;
    state.solutionUntil = 0;
    $('#hudName').textContent = p.name;
    $('#hudDiff').textContent = p.difficulty.toUpperCase();
    show('game');
    layoutGame();
  }

  function layoutGame(){
    var wrap = $('#gridWrap');
    var availW = Math.min(wrap.clientWidth || 480, 560) - 8;
    var availH = Math.min(window.innerHeight * 0.62, 560);
    var p = state.puzzle;
    var cbyW = Math.floor(availW / (p.cols + 0.6));
    var cbyH = Math.floor(availH / (p.rows + 0.6));
    state.cell = Math.max(8, Math.min(34, cbyW, cbyH));
    state.guide = Math.max(10, Math.round(state.cell * 0.55));
    drawGrid();
    paintMini($('#modelCanvas'), p.grid, 128);
    renderPalette();
    updateToolbar();
    updateHud();
  }

  function drawGrid(){
    var p = state.puzzle;
    if(!p) return;
    var cell = state.cell, G = state.guide;
    var w = G + p.cols * cell, h = G + p.rows * cell;
    var ctx = fitCanvas(gridCanvas, w, h);
    ctx.clearRect(0, 0, w, h);

    ctx.fillStyle = css('--cell-blank');
    ctx.fillRect(G, G, p.cols * cell, p.rows * cell);

    /* repères arc-en-ciel — hue = (index * 47) % 360 (§2.3) */
    for(var c=0;c<p.cols;c++){
      ctx.fillStyle = 'hsl(' + ((c*47)%360) + ' 72% 62%)';
      ctx.fillRect(G + c*cell + 1, 1, cell - 2, G - 4);
    }
    for(var r=0;r<p.rows;r++){
      ctx.fillStyle = 'hsl(' + ((r*47)%360) + ' 72% 62%)';
      ctx.fillRect(1, G + r*cell + 1, G - 4, cell - 2);
    }

    var line = css('--grid-line');
    for(r=0;r<p.rows;r++) for(c=0;c<p.cols;c++){
      var v = state.player[r][c];
      var px = G + c*cell, py = G + r*cell;
      if(v !== EMPTY){ ctx.fillStyle = PALETTE[v]; ctx.fillRect(px, py, cell, cell); }
      ctx.strokeStyle = line; ctx.lineWidth = 1;
      ctx.strokeRect(px + 0.5, py + 0.5, cell - 1, cell - 1);
    }

    /* outil Solution — encadre les cases erronées / manquantes (§3) */
    if(performance.now() < state.solutionUntil){
      var hue = reduceMotion ? 0 : (performance.now() / 6) % 360;
      ctx.strokeStyle = 'hsl(' + hue + ' 90% 55%)';
      ctx.lineWidth = Math.max(2, cell * 0.14);
      for(r=0;r<p.rows;r++) for(c=0;c<p.cols;c++){
        if(state.player[r][c] !== p.grid[r][c]){
          ctx.strokeRect(G + c*cell + 1.5, G + r*cell + 1.5, cell - 3, cell - 3);
        }
      }
      if(!reduceMotion) requestAnimationFrame(drawGrid);
    }
  }

  function renderPalette(){
    var box = $('#palette');
    box.innerHTML = '';
    state.puzzle.colors.forEach(function(c){
      var b = document.createElement('button');
      b.className = 'swcol' +
        ((!state.erase && state.selColor === c) ? ' selected' : '') +
        ((state.stock[c] <= 0) ? ' depleted' : '');
      b.style.setProperty('--sw', PALETTE[c]);
      b.innerHTML = '<span class="sw-chip"></span><span class="sw-n">×' + state.stock[c] + '</span>';
      b.addEventListener('click', function(){
        state.selColor = c; state.erase = false;
        renderPalette(); updateToolbar();
      });
      box.appendChild(b);
    });
  }

  function updateToolbar(){
    $('#tErase').classList.toggle('active', state.erase);
    gridCanvas.style.cursor = state.erase ? 'crosshair' : 'pointer';
  }

  function diffCount(){
    var p = state.puzzle, n = 0;
    for(var r=0;r<p.rows;r++) for(var c=0;c<p.cols;c++)
      if(state.player[r][c] !== p.grid[r][c]) n++;
    return n;
  }
  function updateHud(){
    $('#hudRemaining').textContent = diffCount();
    $('#modelTotal').textContent = state.puzzle.total;
  }

  /* --- règles d'interaction (§3) --- */
  function placeCell(r, c){
    var sel = state.selColor;
    if(sel == null) return;
    if((state.stock[sel] || 0) <= 0) return;
    var cur = state.player[r][c];
    if(cur === sel) return;
    if(cur !== EMPTY) state.stock[cur] = (state.stock[cur] || 0) + 1;
    state.player[r][c] = sel;
    state.stock[sel]--;
    burst(r, c, PALETTE[sel]);
    afterChange();
  }
  function eraseCell(r, c){
    var cur = state.player[r][c];
    if(cur === EMPTY) return;
    state.stock[cur] = (state.stock[cur] || 0) + 1;
    state.player[r][c] = EMPTY;
    implode(r, c, PALETTE[cur]);
    afterChange();
  }
  function applyCell(r, c){ (state.erase ? eraseCell : placeCell)(r, c); }
  function afterChange(){
    drawGrid(); renderPalette(); updateHud();
    if(diffCount() === 0) onWin();
  }

  function cellFromEvent(e){
    var rect = gridCanvas.getBoundingClientRect();
    var p = state.puzzle, cell = state.cell, G = state.guide;
    var w = G + p.cols * cell, h = G + p.rows * cell;
    var x = (e.clientX - rect.left) * (w / rect.width) - G;
    var y = (e.clientY - rect.top) * (h / rect.height) - G;
    if(x < 0 || y < 0) return null;
    var c = Math.floor(x / cell), r = Math.floor(y / cell);
    if(r < 0 || c < 0 || r >= p.rows || c >= p.cols) return null;
    return { r:r, c:c };
  }

  var pointerActive = false, startCell = null, moved = false, lpTimer = null, longFired = false;

  gridCanvas.addEventListener('pointerdown', function(e){
    e.preventDefault();
    try{ gridCanvas.setPointerCapture(e.pointerId); }catch(_){}
    pointerActive = true; moved = false; longFired = false;
    startCell = cellFromEvent(e);
    if(!startCell) return;
    var sc = startCell;
    lpTimer = setTimeout(function(){        /* appui long ≥ 300 ms → gomme (§3) */
      longFired = true;
      eraseCell(sc.r, sc.c);
    }, 300);
  });

  gridCanvas.addEventListener('pointermove', function(e){
    if(!pointerActive) return;
    var cp = cellFromEvent(e);
    if(!cp) return;
    if(startCell && (cp.r !== startCell.r || cp.c !== startCell.c)){
      clearTimeout(lpTimer);
      if(!moved){ moved = true; if(!longFired) applyCell(startCell.r, startCell.c); }
      applyCell(cp.r, cp.c);
      startCell = cp;
    }
  });

  function endPointer(){
    clearTimeout(lpTimer);
    if(pointerActive && !longFired && !moved && startCell) applyCell(startCell.r, startCell.c);
    pointerActive = false; startCell = null; moved = false;
  }
  gridCanvas.addEventListener('pointerup', endPointer);
  gridCanvas.addEventListener('pointercancel', function(){ clearTimeout(lpTimer); pointerActive = false; });

  /* molette au-dessus de la grille → défile la couleur (§3) */
  gridCanvas.addEventListener('wheel', function(e){
    e.preventDefault();
    var cols = state.puzzle.colors;
    var i = cols.indexOf(state.selColor); if(i < 0) i = 0;
    i = (i + (e.deltaY > 0 ? 1 : -1) + cols.length) % cols.length;
    state.selColor = cols[i]; state.erase = false;
    renderPalette(); updateToolbar();
  }, { passive:false });

  /* --- victoire (§2.3 / §6) --- */
  function onWin(){
    if(won) return;
    won = true;
    state.done.add(state.playId);
    saveDone();
    confetti();
    var nid = nextRealId(state.playId);
    var nb = $('#winNext');
    nb._next = nid;
    nb.style.display = nid ? '' : 'none';
    $('#winOverlay').classList.add('show');
  }

  /* ============================================================
     11. Câblage UI
     ============================================================ */
  PALETTE.forEach(function(c){
    var i = document.createElement('i');
    i.style.background = c;
    $('#nuancier').appendChild(i);
  });

  $('#s-title').addEventListener('click', function(){ show('select'); });
  $('#selBack').addEventListener('click', function(){ show('title'); });
  $('#pgPrev').addEventListener('click', function(){ state.selPage--; renderSelect(); });
  $('#pgNext').addEventListener('click', function(){ state.selPage++; renderSelect(); });

  $('#gmBack').addEventListener('click', function(){ show('select'); });
  $('#tBack').addEventListener('click', function(){ show('select'); });
  $('#tErase').addEventListener('click', function(){
    state.erase = !state.erase; renderPalette(); updateToolbar();
  });
  $('#tSolution').addEventListener('click', function(){
    state.solutionUntil = performance.now() + 3200;
    drawGrid();
    if(reduceMotion) setTimeout(drawGrid, 3300);
  });
  if(DEV){
    $('#tSolve').style.display = '';
    $('#tSolve').addEventListener('click', function(){
      var p = state.puzzle;
      state.player = p.grid.map(function(r){ return r.slice(); });
      p.colors.forEach(function(c){ state.stock[c] = 0; });
      afterChange();
    });
  }

  $('#winNext').addEventListener('click', function(){
    won = false; $('#winOverlay').classList.remove('show');
    if($('#winNext')._next) startGame($('#winNext')._next);
  });
  $('#winBack').addEventListener('click', function(){
    won = false; $('#winOverlay').classList.remove('show');
    show('select');
  });

  var toastT;
  function toast(msg){
    var t = $('#toast');
    t.textContent = msg; t.classList.add('show');
    clearTimeout(toastT);
    toastT = setTimeout(function(){ t.classList.remove('show'); }, 2200);
  }

  window.addEventListener('resize', function(){
    fitFx();
    if(state.screen === 'game') layoutGame();
  });

  /* ============================================================
     12. Démarrage
     ============================================================ */
  fitFx();
  renderTitle();
})();

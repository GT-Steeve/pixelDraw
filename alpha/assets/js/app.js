(function(){
"use strict";

/* ============ Palette (ported from Solar2D colorMap.lua — TIC-80 palette) ============ */
var PALETTE = {
  99:null, 0:'#1a1c2c', 1:'#5d275d', 2:'#b13e53', 3:'#ef7d57', 4:'#ffcd75',
  5:'#a7f070', 6:'#38b764', 7:'#257179', 8:'#29366f', 9:'#3b5fc9', 10:'#41a6f6',
  11:'#73eff7', 12:'#f4f4f4', 13:'#94b0c2', 14:'#566c86', 15:'#333c57',
  16:'#e9babb', 17:'#f2664c'
};

/* ============ Puzzle data (ported from data/drawMap1-3.lua, trimmed to bounding box) ============ */
var DATA = {"page1":[{"id":"page1-1","name":"Star","difficulty":"Easy","colors":[0,2,3,4,5,6,9,10,11],"colorsNb":[64,11,21,20,27,22,12,5,3],"grid":[[99,99,99,99,99,99,99,99,99,0,99,99,99,99,99,99,99,99,99],[99,99,99,99,99,99,99,99,0,2,0,99,99,99,99,99,99,99,99],[99,99,99,99,99,99,99,0,2,2,3,0,99,99,99,99,99,99,99],[99,99,99,99,99,99,99,0,2,3,3,0,99,99,99,99,99,99,99],[99,99,99,99,99,99,0,2,3,3,3,4,0,99,99,99,99,99,99],[99,99,99,99,99,99,0,3,3,3,4,4,0,99,99,99,99,99,99],[0,0,0,0,0,0,3,3,3,4,4,4,5,0,0,0,0,0,0],[0,2,2,2,2,3,3,0,4,4,4,0,5,5,6,6,6,9,0],[99,0,2,2,3,3,3,0,4,4,5,0,5,6,6,6,9,0,99],[99,99,0,3,3,3,4,0,4,5,5,0,6,6,6,9,0,99,99],[99,99,99,0,3,4,4,4,5,5,5,6,6,6,9,0,99,99,99],[99,99,99,99,0,4,4,5,5,5,6,6,6,9,0,99,99,99,99],[99,99,99,99,0,4,5,5,5,6,6,6,9,9,0,99,99,99,99],[99,99,99,0,4,5,5,5,6,6,6,9,9,9,10,0,99,99,99],[99,99,99,0,5,5,5,6,0,0,0,9,9,10,10,0,99,99,99],[99,99,0,5,5,5,0,0,99,99,99,0,0,10,10,11,0,99,99],[99,99,0,5,5,0,99,99,99,99,99,99,99,0,11,11,0,99,99],[99,99,0,0,0,99,99,99,99,99,99,99,99,99,0,0,0,99,99]],"rows":18,"cols":19},{"id":"page1-2","name":"Cat2","difficulty":"Normal","colors":[0,2,3,4],"colorsNb":[121,58,195,128],"grid":[[99,99,99,99,0,0,0,99,99,99,99,99,99,99,99,99,99,99,99,99,0,0,0,99],[99,99,99,0,2,2,2,0,0,99,99,99,99,99,99,99,99,99,0,0,2,2,2,0],[99,99,99,0,2,3,3,2,2,0,0,0,0,0,0,0,0,0,2,2,3,3,2,0],[99,99,99,0,2,3,3,0,0,2,3,2,3,2,3,2,3,2,0,0,3,3,2,0],[99,99,99,0,2,3,0,3,3,2,3,2,3,2,3,2,3,2,3,3,0,3,2,0],[99,99,99,0,2,0,3,3,3,3,3,2,3,2,3,2,3,3,3,3,3,0,2,0],[99,99,99,99,0,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,0,99],[99,99,99,99,0,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,0,99],[99,99,99,99,0,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,0,99],[99,99,99,0,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,0],[99,99,99,0,2,2,3,0,0,0,3,3,3,3,3,3,3,0,0,0,3,2,2,0],[99,99,99,0,3,3,3,3,3,3,3,0,3,0,3,0,3,3,3,3,3,3,3,0],[99,99,99,0,2,2,3,3,4,4,4,4,0,4,0,4,4,4,4,3,3,2,2,0],[99,99,99,0,3,3,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,3,3,0],[99,99,99,99,0,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,0,99],[99,99,99,99,0,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,0,99],[99,99,99,99,99,0,0,4,4,4,4,4,4,4,4,4,4,4,4,4,0,0,99,99],[99,99,99,99,0,3,3,0,0,4,4,4,4,4,4,4,4,4,0,0,3,3,0,99],[99,0,0,99,0,2,3,3,3,4,4,4,0,0,0,4,4,4,3,3,3,2,0,99],[0,2,2,0,3,3,3,3,3,4,4,4,4,4,4,4,4,4,3,3,3,3,3,0],[0,2,3,0,2,2,2,3,3,4,4,4,4,4,4,4,4,4,3,3,2,2,2,0],[99,0,3,0,3,3,3,3,3,3,4,4,4,4,4,4,4,3,3,3,3,3,3,0],[99,99,0,0,2,2,2,3,3,3,4,4,4,4,4,4,4,3,3,3,2,2,2,0],[99,99,99,0,0,3,3,3,3,3,4,4,4,4,4,4,4,3,3,3,3,3,0,99],[99,99,99,99,99,0,0,2,3,3,0,4,0,4,0,4,0,3,3,2,0,0,99,99],[99,99,99,99,99,99,99,0,0,0,0,0,0,0,0,0,0,0,0,0,99,99,99,99]],"rows":26,"cols":24},{"id":"page1-3","name":"Cat1","difficulty":"Easy","colors":[0,13,4,2],"colorsNb":[85,173,8,21],"grid":[[99,99,99,99,99,99,99,99,99,99,99,0,0,0,0,99,99,99,99],[99,99,99,99,99,99,99,99,0,0,0,13,13,13,13,0,99,99,99],[99,99,99,99,99,99,0,0,13,13,13,13,13,13,0,0,99,99,99],[99,99,99,99,99,0,13,13,13,13,13,13,13,13,13,0,99,99,99],[99,99,99,0,0,13,13,13,13,13,13,13,13,13,13,13,0,99,99],[99,99,0,13,13,13,13,13,13,13,13,13,13,13,13,13,0,99,99],[99,0,13,13,13,13,13,13,13,13,13,13,0,0,13,13,13,0,0],[99,0,13,13,0,13,13,13,13,13,13,13,0,0,4,4,13,0,99],[99,99,0,0,13,13,0,0,13,13,13,13,13,13,4,4,0,0,0],[99,99,0,13,13,13,0,0,13,13,0,13,13,13,13,13,13,0,99],[99,0,0,0,13,4,4,13,13,13,13,13,13,13,13,13,0,99,99],[99,99,0,13,13,4,4,13,13,13,13,13,13,13,0,0,99,99,99],[99,99,99,0,13,13,13,13,13,13,13,2,2,2,2,2,0,99,99],[99,0,99,99,0,0,0,2,2,2,2,2,2,2,2,13,0,99,99],[0,13,0,99,99,0,2,2,2,2,2,13,2,13,13,13,13,0,99],[0,13,13,0,99,0,13,13,13,13,2,13,2,13,13,13,13,0,99],[99,0,13,13,0,13,13,13,13,13,13,13,13,13,13,13,13,0,99],[99,99,0,13,0,13,13,13,13,13,13,13,13,13,13,13,0,99,99],[99,99,99,0,0,13,13,13,13,13,13,13,13,13,13,13,0,99,99],[99,99,99,99,0,0,13,13,13,0,13,13,0,13,13,0,99,99,99],[99,99,99,99,99,99,0,0,0,0,0,0,99,0,0,99,99,99,99]],"rows":21,"cols":19},{"id":"page1-4","name":"Puzzle1","difficulty":"Hard","colors":[0,10,6,4,3,2,1,9],"colorsNb":[344,57,56,52,44,32,35,36],"grid":[[99,99,99,99,99,99,0,0,0,0,0,0,99,99,99,99,99,0,0,0,0,0,0,99,99,99,99,99,99],[99,99,99,99,99,0,0,10,6,4,3,0,0,99,99,99,0,0,3,4,6,10,0,0,99,99,99,99,99],[99,99,99,99,99,0,10,6,4,3,2,1,0,0,99,0,0,1,2,3,4,6,10,0,99,99,99,99,99],[99,99,99,99,99,0,6,4,0,0,0,9,10,0,99,0,10,9,0,0,0,4,6,0,99,99,99,99,99],[99,99,99,99,99,0,4,3,0,99,0,10,6,0,99,0,6,10,0,99,0,3,4,0,99,99,99,99,99],[99,0,0,0,0,0,0,0,0,0,0,6,4,0,0,0,0,0,0,0,0,2,3,0,0,0,0,0,99],[0,0,10,6,4,3,2,1,9,10,0,4,3,0,9,2,3,4,6,10,0,1,2,0,4,6,10,0,0],[0,10,6,4,3,2,1,9,10,6,0,3,2,0,10,1,2,3,4,6,0,9,1,0,3,4,6,10,0],[0,6,4,0,0,0,0,0,0,0,0,2,1,0,0,0,0,0,0,0,0,10,9,0,0,0,4,6,0],[0,4,3,0,99,0,10,6,0,99,0,1,9,0,99,0,9,1,0,99,0,6,10,0,99,0,3,4,0],[0,3,2,0,0,0,6,4,0,0,0,9,10,0,99,0,10,9,0,0,0,0,0,0,0,0,2,3,0],[0,0,1,9,10,0,4,3,0,1,9,10,6,0,99,0,6,10,9,1,2,3,4,6,10,9,1,0,0],[99,0,0,10,6,0,3,2,0,9,10,6,4,0,99,0,4,6,10,9,1,2,3,4,6,10,0,0,99],[99,99,0,0,0,0,2,1,0,0,0,0,0,0,99,0,0,0,0,0,0,0,0,0,0,0,0,99,99],[99,99,99,99,99,0,1,9,0,99,99,99,99,99,99,99,99,99,99,99,0,9,1,0,99,99,99,99,99],[99,99,0,0,0,0,0,0,0,0,0,0,0,0,99,0,0,0,0,0,0,1,2,0,0,0,0,99,99],[99,0,0,10,6,4,3,2,1,9,10,6,4,0,99,0,4,6,10,9,0,2,3,0,6,10,0,0,99],[0,0,1,9,10,6,4,3,2,1,9,10,6,0,99,0,6,10,9,1,0,3,4,0,10,9,1,0,0],[0,3,2,0,0,0,0,0,0,0,0,9,10,0,99,0,10,9,0,0,0,4,6,0,0,0,2,3,0],[0,4,3,0,99,0,10,6,0,99,0,1,9,0,99,0,9,1,0,99,0,6,10,0,99,0,3,4,0],[0,6,4,0,0,0,9,10,0,0,0,0,0,0,0,0,1,2,0,0,0,0,0,0,0,0,4,6,0],[0,10,6,4,3,0,1,9,0,6,4,3,2,1,9,0,2,3,0,6,10,9,1,2,3,4,6,10,0],[0,0,10,6,4,0,2,1,0,10,6,4,3,2,1,0,3,4,0,10,9,1,2,3,4,6,10,0,0],[99,0,0,0,0,0,3,2,0,0,0,0,0,0,0,0,4,6,0,0,0,0,0,0,0,0,0,0,99],[99,99,99,99,99,0,4,3,0,99,0,10,6,0,99,0,6,10,0,99,0,3,4,0,99,99,99,99,99],[99,99,99,99,99,0,6,4,0,0,0,9,10,0,99,0,10,9,0,0,0,4,6,0,99,99,99,99,99],[99,99,99,99,99,0,10,6,4,3,2,1,0,0,99,0,0,1,2,3,4,6,10,0,99,99,99,99,99],[99,99,99,99,99,0,0,10,6,4,3,0,0,99,99,99,0,0,3,4,6,10,0,0,99,99,99,99,99],[99,99,99,99,99,99,0,0,0,0,0,0,99,99,99,99,99,0,0,0,0,0,0,99,99,99,99,99,99]],"rows":29,"cols":29},{"id":"page1-5","name":"Flower1","difficulty":"Easy","colors":[0,9,10,6,3,4],"colorsNb":[156,40,252,96,4,1],"grid":[[99,99,99,99,99,99,99,99,99,99,99,0,0,99,0,0,99,99,99,99,99,99,99,99,99,99,99],[99,99,99,99,99,99,99,99,99,99,0,9,9,0,9,9,0,99,99,99,99,99,99,99,99,99,99],[99,99,0,0,0,0,0,99,99,0,9,10,10,10,10,10,9,0,99,99,0,0,0,0,0,99,99],[99,99,0,6,6,6,6,0,99,0,9,10,10,10,10,10,9,0,99,0,6,6,6,6,0,99,99],[99,99,0,6,6,6,6,6,0,9,10,10,10,10,10,10,10,9,0,6,6,6,6,6,0,99,99],[99,99,0,6,6,6,6,6,0,10,10,10,10,10,10,10,10,10,0,6,6,6,6,6,0,99,99],[99,99,0,6,6,6,6,6,0,10,10,10,10,10,10,10,10,10,0,6,6,6,6,6,0,99,99],[99,99,99,0,6,6,6,6,0,10,10,10,10,10,10,10,10,10,0,6,6,6,6,0,99,99,99],[99,99,99,99,0,0,0,0,6,0,10,10,10,10,10,10,10,0,6,0,0,0,0,99,99,99,99],[99,99,0,0,9,10,10,10,0,0,10,10,10,0,10,10,10,0,0,10,10,10,9,0,0,99,99],[99,0,9,9,10,10,10,10,10,10,0,10,10,0,10,10,0,10,10,10,10,10,10,9,9,0,99],[0,9,10,10,10,10,10,10,10,10,10,0,10,0,10,0,10,10,10,10,10,10,10,10,10,9,0],[0,9,10,10,10,10,10,10,10,10,10,10,0,3,0,10,10,10,10,10,10,10,10,10,10,9,0],[99,0,10,10,10,10,10,10,10,0,0,0,3,4,3,0,0,0,10,10,10,10,10,10,10,0,99],[0,9,10,10,10,10,10,10,10,10,10,10,0,3,0,10,10,10,10,10,10,10,10,10,10,9,0],[0,9,10,10,10,10,10,10,10,10,10,0,10,0,10,0,10,10,10,10,10,10,10,10,10,9,0],[99,0,9,9,10,10,10,10,10,10,0,10,10,0,10,10,0,10,10,10,10,10,10,9,9,0,99],[99,99,0,0,9,10,10,10,0,0,10,10,10,0,10,10,10,0,0,10,10,10,9,0,0,99,99],[99,99,99,99,0,0,0,0,6,0,10,10,10,10,10,10,10,0,6,0,0,0,0,99,99,99,99],[99,99,99,0,6,6,6,6,0,10,10,10,10,10,10,10,10,10,0,6,6,6,6,0,99,99,99],[99,99,0,6,6,6,6,6,0,10,10,10,10,10,10,10,10,10,0,6,6,6,6,6,0,99,99],[99,99,0,6,6,6,6,6,0,10,10,10,10,10,10,10,10,10,0,6,6,6,6,6,0,99,99],[99,99,0,6,6,6,6,6,0,9,10,10,10,10,10,10,10,9,0,6,6,6,6,6,0,99,99],[99,99,0,6,6,6,6,0,99,0,9,10,10,10,10,10,9,0,99,0,6,6,6,6,0,99,99],[99,99,0,0,0,0,0,99,99,0,9,10,10,10,10,10,9,0,99,99,0,0,0,0,0,99,99],[99,99,99,99,99,99,99,99,99,99,0,9,9,0,9,9,0,99,99,99,99,99,99,99,99,99,99],[99,99,99,99,99,99,99,99,99,99,99,0,0,99,0,0,99,99,99,99,99,99,99,99,99,99,99]],"rows":27,"cols":27},{"id":"page1-6","name":"Flower2","difficulty":"Normal","colors":[9,10,12,7,5,6],"colorsNb":[170,221,368,28,31,27],"grid":[[99,99,99,99,99,99,99,99,99,99,99,99,99,99,99,9,99,99,99,99,99,9,99,99,99,99,99,99,99,99,99,99,99,99,99,99,99,99],[99,99,99,99,99,99,99,99,99,99,99,99,99,99,9,9,9,99,99,99,9,9,9,99,99,99,99,99,99,99,99,99,99,99,99,99,99,99],[99,99,99,99,99,99,99,99,99,99,99,99,99,9,9,10,9,9,99,9,9,10,9,99,99,99,99,99,9,99,99,99,99,99,99,99,99,99],[99,99,99,99,99,99,99,99,99,9,9,9,99,9,10,12,10,9,9,9,10,12,10,10,99,99,99,9,9,9,99,99,99,99,99,99,99,99],[99,99,99,99,99,99,99,99,99,9,9,10,9,10,12,12,10,9,9,10,12,12,12,10,99,9,9,9,10,9,99,99,99,99,99,99,99,99],[99,99,99,99,99,99,99,99,99,9,10,12,12,10,12,10,9,12,10,10,12,12,9,10,10,10,12,12,12,10,99,99,99,9,99,99,99,99],[99,99,99,99,9,9,99,99,99,9,12,12,12,12,10,10,12,12,12,10,12,9,9,10,10,12,12,12,12,10,99,9,9,9,99,99,99,99],[99,99,99,99,9,9,9,9,9,10,10,12,12,12,12,10,12,12,12,10,9,10,9,9,12,12,9,12,12,10,9,10,9,9,99,99,99,99],[99,99,99,99,9,10,10,10,10,9,10,12,9,10,12,10,12,12,12,9,10,10,10,9,12,12,9,9,10,10,10,12,10,9,99,99,99,99],[99,99,99,99,9,10,12,12,10,10,10,10,9,9,10,10,12,12,12,10,10,12,10,10,12,12,10,9,9,12,12,12,12,10,99,99,99,99],[99,99,99,99,9,10,12,12,12,12,10,9,9,9,9,10,12,12,10,10,12,12,12,10,12,10,10,10,9,12,12,12,12,10,99,99,99,99],[99,9,9,9,9,10,12,12,12,12,12,9,10,10,9,9,10,12,10,12,12,12,12,10,12,10,12,10,10,12,12,12,12,9,9,9,9,9],[99,9,9,10,10,9,9,12,12,12,9,10,10,12,10,9,9,10,12,12,12,12,12,10,10,12,12,12,10,12,12,12,10,10,10,10,9,9],[99,9,10,12,12,10,10,12,12,12,10,10,12,12,12,10,9,9,12,12,12,12,9,9,12,12,12,12,10,12,12,12,10,12,12,10,9,99],[99,99,10,12,12,12,10,12,12,12,10,12,12,12,12,12,10,9,12,12,12,9,10,10,9,9,12,9,10,12,12,10,12,12,12,12,10,99],[99,99,10,10,12,12,12,10,12,12,10,12,12,12,12,12,12,10,9,12,9,10,12,12,10,10,9,10,12,12,10,12,12,12,12,10,9,99],[99,99,99,10,10,12,12,10,10,12,10,12,12,12,12,12,12,12,10,12,10,12,12,12,12,12,10,12,12,10,12,12,12,12,12,10,99,99],[99,99,99,99,10,10,12,12,9,9,12,12,12,12,12,12,12,12,10,10,12,12,12,12,10,10,12,12,10,12,12,12,12,12,10,99,99,99],[99,99,99,99,10,9,9,9,10,10,9,9,12,12,12,12,12,12,12,10,12,12,10,10,12,12,10,10,9,9,12,12,10,10,9,9,99,99],[99,99,9,10,12,12,10,10,12,12,10,9,9,12,12,12,12,12,12,10,12,10,12,12,12,12,12,12,10,9,9,9,12,10,10,9,9,9],[99,9,10,12,12,12,12,12,12,12,12,10,10,9,12,12,12,12,12,10,10,12,12,12,12,12,12,12,12,10,9,12,12,12,10,10,9,9],[9,9,10,12,12,12,12,12,12,12,12,12,12,10,10,10,12,12,12,10,12,12,12,12,12,12,12,12,10,9,12,12,12,12,10,9,9,99],[99,9,9,10,12,12,12,12,12,12,12,12,12,12,10,10,10,10,10,10,12,12,12,12,12,12,12,10,9,12,12,12,12,10,9,99,99,99],[99,99,99,9,10,10,10,12,12,12,12,12,12,12,12,10,10,12,12,12,10,12,12,12,12,10,10,9,12,12,12,12,10,9,99,99,99,99],[99,99,99,99,9,9,9,10,10,10,12,12,12,12,10,10,12,12,12,12,12,10,7,7,10,12,12,12,12,10,10,10,99,99,99,99,99,99],[99,99,99,99,99,5,9,9,9,10,10,10,10,7,7,10,12,12,12,12,12,12,10,7,7,7,7,7,7,6,6,5,99,99,99,99,99,99],[99,99,99,99,99,99,5,5,6,7,7,7,7,7,7,12,12,12,12,12,12,12,10,7,7,7,6,6,6,6,5,5,5,99,99,99,99,99],[99,99,99,99,99,99,99,99,6,6,6,6,7,7,6,10,12,12,12,12,12,12,10,6,7,7,7,6,5,5,99,99,99,99,99,99,99,99],[99,99,99,99,99,99,99,99,5,5,6,7,7,6,5,9,10,12,12,12,12,10,10,5,6,6,7,7,6,5,99,99,99,99,99,99,99,99],[99,99,99,99,99,99,99,5,5,6,6,6,6,5,5,9,9,10,12,12,10,10,9,5,5,5,6,6,6,6,5,99,99,99,99,99,99,99],[99,99,99,99,99,99,99,99,99,5,5,5,5,99,99,99,9,9,10,10,10,9,99,99,99,5,5,5,5,5,99,99,99,99,99,99,99,99],[99,99,99,99,99,99,99,99,99,99,99,99,99,99,99,99,99,9,9,9,9,99,99,99,99,99,99,99,99,99,99,99,99,99,99,99,99,99],[99,99,99,99,99,99,99,99,99,99,99,99,99,99,99,99,99,99,9,9,99,99,99,99,99,99,99,99,99,99,99,99,99,99,99,99,99,99]],"rows":33,"cols":38}],"page2":[{"id":"page2-1","name":"ELEPHANT","difficulty":"Easy","colors":[0,10,9,3],"colorsNb":[181,163,321,2],"grid":[[99,99,99,99,99,99,99,99,0,0,0,0,99,99,99,99,99,99,99,99,99,99,99,99,99,99,99,99,99],[99,99,99,99,99,99,99,0,10,10,10,10,0,99,99,99,99,99,99,99,99,99,99,99,99,99,99,99,99],[99,99,99,99,99,99,0,9,9,9,9,9,10,0,99,99,99,99,99,99,99,99,99,99,99,99,99,99,99],[99,99,99,99,99,99,0,9,9,9,9,0,10,0,99,99,99,99,99,99,99,99,99,99,99,99,99,99,99],[99,99,99,99,99,99,0,9,9,9,9,0,10,0,99,99,99,99,99,99,99,99,99,99,99,99,99,99,99],[99,99,99,99,99,99,99,0,9,9,0,9,10,0,99,99,99,99,99,99,99,99,99,99,99,99,99,99,99],[99,99,99,99,99,99,99,99,0,0,9,9,10,0,99,99,99,99,99,99,99,99,99,99,99,99,99,99,99],[99,99,99,99,99,99,99,0,9,9,9,10,0,99,99,99,99,99,99,99,99,99,99,99,99,99,99,99,99],[99,99,99,99,99,99,0,9,9,9,9,0,99,99,99,99,99,99,99,99,99,99,99,99,99,99,99,99,99],[99,99,99,99,99,99,0,9,9,9,10,0,0,0,0,0,99,99,99,99,99,99,99,99,99,99,99,99,99],[99,99,99,99,99,0,9,9,9,9,0,10,10,10,10,10,0,0,99,99,99,99,99,0,0,0,0,99,99],[99,99,99,99,99,0,9,9,9,9,0,9,9,9,9,9,10,10,0,99,99,0,0,10,10,10,10,0,99],[99,99,99,99,0,9,9,9,9,9,9,9,9,9,9,9,9,9,10,0,0,10,10,9,0,0,9,9,0],[99,99,99,99,0,9,9,9,9,9,9,9,9,9,9,0,0,9,9,10,10,9,9,0,9,9,9,9,0],[99,99,99,99,0,9,9,9,9,9,9,9,9,9,9,9,9,0,9,9,9,0,0,9,9,9,9,9,0],[99,99,99,99,0,9,9,9,9,9,9,9,9,9,9,9,9,9,9,9,9,0,9,9,9,9,9,9,0],[99,99,99,99,99,0,9,9,9,9,9,9,9,9,9,9,9,9,9,9,9,9,9,9,9,9,9,9,0],[99,99,99,99,99,99,0,9,9,9,9,9,9,9,0,9,9,9,9,9,9,9,9,9,9,9,9,9,0],[99,99,99,99,99,99,99,0,0,0,0,0,0,0,9,9,9,9,9,9,9,9,0,0,9,9,9,9,0],[99,99,99,99,99,0,0,0,0,9,0,3,3,0,9,9,9,9,9,9,9,0,10,10,0,9,9,0,99],[99,99,99,99,0,9,9,0,0,9,9,0,0,9,10,9,9,9,9,9,0,0,10,10,10,0,9,0,99],[99,99,99,0,9,9,9,9,9,0,10,10,10,10,0,9,9,9,9,0,9,9,0,10,10,0,0,99,99],[99,99,99,0,9,9,9,9,9,9,0,0,0,0,9,9,9,9,0,9,9,9,9,0,0,0,99,99,99],[99,99,99,99,0,0,9,9,9,9,9,9,9,9,9,9,9,9,9,9,9,9,9,9,0,99,99,99,99],[99,99,99,99,99,99,0,9,9,0,9,9,9,9,9,9,9,9,9,9,9,9,9,0,99,99,99,99,99],[99,99,99,99,99,99,99,0,0,10,10,10,10,10,9,9,9,9,9,9,9,9,0,99,99,99,99,99,99],[99,99,99,99,99,99,0,10,10,10,10,10,10,10,10,9,9,9,9,9,0,0,9,0,99,99,99,99,99],[99,99,99,99,99,0,10,10,10,10,10,10,10,10,10,9,9,9,9,9,9,9,0,99,99,99,99,99,99],[99,99,99,99,99,0,10,10,10,10,10,10,10,10,10,9,9,9,9,9,9,9,0,99,99,99,99,99,99],[99,99,99,99,0,10,10,10,10,10,10,10,10,10,10,10,9,9,9,9,9,9,9,0,99,99,99,99,99],[99,99,99,99,0,10,10,10,10,10,10,10,10,10,10,10,9,9,9,9,9,9,9,0,99,99,99,99,99],[99,99,0,0,0,10,10,10,10,10,10,10,10,10,10,9,9,9,9,9,0,0,0,99,99,99,99,99,99],[99,0,10,10,0,0,10,10,10,10,10,10,10,10,10,9,9,9,9,0,10,10,10,0,99,99,99,99,99],[0,10,10,10,10,0,10,10,10,10,10,10,10,10,9,9,9,9,0,10,10,10,10,10,0,99,99,99,99],[0,10,10,10,10,0,0,10,10,10,10,10,10,9,9,9,9,9,0,10,10,10,10,10,0,99,99,99,99],[0,10,10,10,10,0,9,0,9,9,9,9,9,9,9,9,9,9,0,10,10,10,10,10,0,99,99,99,99],[99,0,10,10,10,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,10,10,10,0,99,99,99,99,99],[99,99,0,0,0,99,99,99,99,99,99,99,99,99,99,99,99,99,99,99,0,0,0,99,99,99,99,99,99]],"rows":38,"cols":29},{"id":"page2-3","name":"SUGAR1","difficulty":"Easy","colors":[0,10,9,4,3,6,11,2,5,12],"colorsNb":[75,14,15,8,9,18,3,6,13,7],"grid":[[99,99,99,99,0,0,0,0,0,0,99,99,99,99],[99,99,99,0,10,10,9,9,9,9,0,99,99,99],[99,99,0,10,10,10,10,9,9,9,9,0,99,99],[99,0,10,10,10,0,0,0,0,9,9,9,0,99],[0,10,10,10,0,4,4,4,3,0,9,9,9,0],[0,10,10,0,4,4,0,3,3,3,0,9,6,0],[0,11,0,4,4,0,2,0,3,3,0,6,6,0],[0,11,0,4,0,2,2,0,3,3,0,6,6,0],[0,11,0,5,0,2,2,2,3,0,6,6,6,0],[99,0,0,5,5,0,0,0,0,6,6,6,6,0],[99,99,0,5,5,5,5,5,5,6,6,6,0,99],[99,99,99,0,5,5,5,5,6,6,6,0,99,99],[99,99,99,99,0,0,0,0,0,0,0,99,99,99],[99,99,99,99,99,99,0,12,0,99,99,99,99,99],[99,99,99,99,99,99,0,12,0,99,99,99,99,99],[99,99,99,99,99,99,0,12,0,99,99,99,99,99],[99,99,99,99,99,99,0,12,0,99,99,99,99,99],[99,99,99,99,99,99,0,12,0,99,99,99,99,99],[99,99,99,99,99,99,0,12,0,99,99,99,99,99],[99,99,99,99,99,99,0,12,0,99,99,99,99,99],[99,99,99,99,99,99,99,0,99,99,99,99,99,99]],"rows":21,"cols":14}],"page3":[{"id":"page3-2","name":"SNAKE#1","difficulty":"Easy","colors":[0,6,7,16],"colorsNb":[69,54,30,2],"grid":[[99,99,99,99,0,0,0,0,0,99,99,99,99,99,99],[99,99,99,0,6,6,6,6,6,0,99,99,99,99,99],[99,99,99,0,6,6,6,6,6,6,0,99,99,99,99],[99,99,0,6,0,6,6,6,0,6,0,99,99,99,99],[99,99,0,6,0,6,6,6,0,6,7,0,99,99,99],[99,99,0,16,6,6,6,6,6,16,7,0,99,99,99],[99,99,99,0,7,7,7,7,7,7,0,99,99,99,99],[99,99,99,99,0,0,0,0,0,0,0,99,99,99,99],[99,99,0,0,6,6,0,6,6,7,0,0,99,99,99],[99,0,6,6,0,0,6,6,7,7,0,6,0,99,99],[0,6,6,0,7,7,7,7,7,0,6,0,6,0,99],[0,6,6,6,0,0,0,0,0,6,6,6,0,7,0],[0,7,6,6,6,6,6,6,6,6,6,7,0,7,0],[0,0,7,7,7,7,7,7,7,7,7,0,0,7,0],[99,99,0,0,0,0,0,0,0,0,0,99,99,0,99]],"rows":15,"cols":15}]};

/* Placeholder ("coming soon") slots — real names/difficulty from the source project,
   grid data not yet ported into this build. */
var PLACEHOLDERS = {
  page2: [null, {name:'PUZZLE2',difficulty:'Hard'}, null, {name:'PLANET1',difficulty:'Normal'}, {name:'CAKE1',difficulty:'Hard'}, {name:'BATMAN',difficulty:'Normal'}],
  page3: [{name:'FLOWER#3',difficulty:'Easy'}, null, {name:'Bird#1',difficulty:'Normal'}, {name:'Icone#1',difficulty:'Normal'}, {name:'FISH#1',difficulty:'Easy'}, undefined]
};

var PAGE_ORDER = ['page1','page2','page3'];

/* Build the 6-slot layout for each page, and a flat "real order" list for progression unlocks */
var PAGES = [];      // PAGES[p] = array of 6 slot descriptors
var REAL_ORDER = []; // ids in unlock order
var LOOKUP = {};      // id -> {puzzle, pageIndex}

PAGE_ORDER.forEach(function(pk, pIdx){
  var real = DATA[pk].slice();
  var slots = [];
  for(var i=0;i<6;i++){
    var realMatch = real.find(function(p){ return p.id === pk + '-' + (i+1); });
    if(realMatch){
      slots.push({ type:'real', puzzle: realMatch });
      REAL_ORDER.push(realMatch.id);
      LOOKUP[realMatch.id] = { puzzle: realMatch, pageIndex: pIdx };
    } else if(PLACEHOLDERS[pk] && PLACEHOLDERS[pk][i]){
      slots.push({ type:'soon', name: PLACEHOLDERS[pk][i].name, difficulty: PLACEHOLDERS[pk][i].difficulty });
    } else {
      slots.push({ type:'empty' });
    }
  }
  PAGES.push(slots);
});

/* ============ Progress persistence (per-viewer convenience only) ============ */
var progress = { completed: [] };
try{
  var raw = localStorage.getItem('pixartpuzzle:progress');
  if(raw) progress = JSON.parse(raw);
}catch(e){ /* storage unavailable — play in-memory only */ }

function isCompleted(id){ return progress.completed.indexOf(id) !== -1; }
function markCompleted(id){
  if(!isCompleted(id)) progress.completed.push(id);
  try{ localStorage.setItem('pixartpuzzle:progress', JSON.stringify(progress)); }catch(e){}
}
function isUnlocked(id){
  var idx = REAL_ORDER.indexOf(id);
  if(idx <= 0) return true;
  return isCompleted(REAL_ORDER[idx-1]);
}
function nextRealId(id){
  var idx = REAL_ORDER.indexOf(id);
  if(idx === -1 || idx === REAL_ORDER.length-1) return null;
  return REAL_ORDER[idx+1];
}

/* ============ Small utilities ============ */
function hsl(h,s,l){
  s/=100; l/=100;
  var k = function(n){ return (n + h/30) % 12; };
  var a = s * Math.min(l, 1-l);
  var f = function(n){ return l - a*Math.max(-1, Math.min(k(n)-3, Math.min(9-k(n),1))); };
  var toHex = function(x){ var v = Math.round(255*x); return v.toString(16).padStart(2,'0'); };
  return '#'+toHex(f(0))+toHex(f(8))+toHex(f(4));
}
function compassColor(i){ return hsl((i*47)%360, 78, 58); }
function dpr(){ return Math.max(1, window.devicePixelRatio || 1); }
function setCanvasSize(canvas, wCss, hCss){
  var d = dpr();
  canvas.width = Math.max(1, Math.round(wCss*d));
  canvas.height = Math.max(1, Math.round(hCss*d));
  canvas.style.width = wCss+'px';
  canvas.style.height = hCss+'px';
  var ctx = canvas.getContext('2d');
  ctx.setTransform(d,0,0,d,0,0);
  ctx.imageSmoothingEnabled = false;
  return ctx;
}

/* ============ Screen switching ============ */
var screens = {
  title: document.getElementById('screen-title'),
  select: document.getElementById('screen-select'),
  draw: document.getElementById('screen-draw')
};
function showScreen(name){
  Object.keys(screens).forEach(function(k){ screens[k].hidden = (k!==name); });
}

/* ============ Title screen ============ */
(function buildMascot(){
  // a tiny hand-authored pixel-art star, echoing puzzle #1 ("Star"), in the game's own palette
  var rows = [
    "..........0..........",
    ".........0.0.........",
    "........0.4.0........",
    ".......0.4.4.0.......",
    "0000000.4.4.4.0000000",
    ".0.4.4.4.4.4.4.4.4.0.",
    "..0.4.4.4.4.4.4.4.0..",
    "...0.4.4.4.4.4.4.0...",
    "....0.4.4.4.4.4.0....",
    ".....0.4.4.4.4.0.....",
    "......0.4.4.4.0......",
    ".......0.4.4.0.......",
    "........0.4.0........",
    ".........0.0........."
  ];
  var frag = document.createDocumentFragment();
  rows.forEach(function(row){
    for(var i=0;i<row.length;i++){
      var d = document.createElement('div');
      var ch = row[i];
      d.style.background = ch==='.' ? 'transparent' : (ch==='0' ? PALETTE[0] : PALETTE[4]);
      frag.appendChild(d);
    }
  });
  var mascot = document.getElementById('mascot');
  mascot.style.gridTemplateColumns = 'repeat(' + rows[0].length + ', clamp(6px,2.2vw,13px))';
  mascot.appendChild(frag);
})();

document.getElementById('screen-title').addEventListener('click', function(){
  currentPage = 0;
  renderSelect();
  showScreen('select');
});

/* ============ Select screen ============ */
var currentPage = 0;
var selectEls = {
  grid: document.getElementById('puzzle-grid'),
  prev: document.getElementById('page-prev'),
  next: document.getElementById('page-next'),
  indicator: document.getElementById('page-indicator'),
  sub: document.getElementById('select-sub')
};

function drawThumb(canvas, grid, boxCss){
  var rows = grid.length, cols = grid[0].length;
  var cell = boxCss / Math.max(rows, cols);
  var ctx = setCanvasSize(canvas, cols*cell, rows*cell);
  ctx.clearRect(0,0,cols*cell, rows*cell);
  for(var r=0;r<rows;r++){
    for(var c=0;c<cols;c++){
      var v = grid[r][c];
      if(v===99) continue;
      ctx.fillStyle = PALETTE[v] || '#999';
      ctx.fillRect(c*cell, r*cell, cell+0.6, cell+0.6);
    }
  }
}

function renderSelect(){
  selectEls.indicator.textContent = (currentPage+1) + ' / ' + PAGES.length;
  selectEls.prev.disabled = currentPage===0;
  selectEls.next.disabled = currentPage===PAGES.length-1;
  var completedCount = progress.completed.length;
  selectEls.sub.textContent = completedCount + ' / ' + REAL_ORDER.length + ' terminés';

  selectEls.grid.innerHTML = '';
  PAGES[currentPage].forEach(function(slot){
    var card = document.createElement('div');
    card.className = 'card';

    if(slot.type === 'empty'){
      card.classList.add('empty');
      card.innerHTML = '<div style="font-size:2rem;color:var(--ink-soft)">✕</div>';
      selectEls.grid.appendChild(card);
      return;
    }
    if(slot.type === 'soon'){
      card.classList.add('soon');
      card.innerHTML =
        '<span class="ribbon-soon">BIENTÔT</span>' +
        '<div style="width:96px;height:96px;border-radius:10px;background:var(--paper);' +
        'box-shadow:inset 0 0 0 1px var(--line);display:flex;align-items:center;justify-content:center;' +
        'font-size:1.6rem;color:var(--ink-soft)">🔒</div>' +
        '<span class="name">'+slot.name+'</span>' +
        '<span class="pill '+slot.difficulty+'">'+slot.difficulty+'</span>';
      card.addEventListener('click', function(){ showToastGlobal(card, 'Bientôt disponible !'); });
      selectEls.grid.appendChild(card);
      return;
    }

    // real puzzle
    var p = slot.puzzle;
    var unlocked = isUnlocked(p.id);
    var done = isCompleted(p.id);
    var canvas = document.createElement('canvas');
    card.appendChild(canvas);
    var nameEl = document.createElement('span');
    nameEl.className = 'name'; nameEl.textContent = p.name;
    card.appendChild(nameEl);
    var pill = document.createElement('span');
    pill.className = 'pill ' + p.difficulty; pill.textContent = p.difficulty;
    card.appendChild(pill);

    if(done){
      var b = document.createElement('div'); b.className='badge-check'; b.textContent='✓';
      card.appendChild(b);
    } else if(!unlocked){
      card.classList.add('locked');
      var l = document.createElement('div'); l.className='badge-lock'; l.textContent='🔒';
      card.appendChild(l);
    }

    selectEls.grid.appendChild(card);
    drawThumb(canvas, p.grid, 96);
    if(!unlocked){
      canvas.style.filter = 'grayscale(0.75) brightness(1.08)';
    }

    card.addEventListener('click', function(){
      if(!unlocked){
        card.classList.remove('shake'); void card.offsetWidth; card.classList.add('shake');
        showToastGlobal(card, "Termine le dessin précédent pour débloquer celui-ci !");
        return;
      }
      openDraw(p.id);
    });
  });
}
selectEls.prev.addEventListener('click', function(){ if(currentPage>0){ currentPage--; renderSelect(); } });
selectEls.next.addEventListener('click', function(){ if(currentPage<PAGES.length-1){ currentPage++; renderSelect(); } });

function showToastGlobal(nearEl, msg){
  var toast = document.createElement('div');
  toast.className = 'toast show';
  toast.style.position='fixed'; toast.style.left='50%'; toast.style.bottom='24px';
  toast.style.transform='translateX(-50%)'; toast.style.zIndex=50;
  toast.textContent = msg;
  document.body.appendChild(toast);
  setTimeout(function(){ toast.style.opacity='0'; }, 1400);
  setTimeout(function(){ toast.remove(); }, 1700);
}

/* ============ Particle FX engine (fireworks / ring-boom / confetti) ============ */
function makeParticleEngine(canvas){
  var ctx = canvas.getContext('2d');
  var particles = [];
  var raf = null;
  function loop(){
    var d = dpr();
    ctx.clearRect(0,0,canvas.width/d, canvas.height/d);
    var alive = false;
    for(var i=particles.length-1;i>=0;i--){
      var p = particles[i];
      p.t += 1/60;
      if(p.t >= p.life){ particles.splice(i,1); continue; }
      alive = true;
      var k = p.t/p.life;
      var x = p.x + p.vx*p.t;
      var y = p.y + p.vy*p.t + (p.gravity||0)*p.t*p.t;
      ctx.globalAlpha = Math.max(0, 1-k);
      ctx.fillStyle = p.color;
      var s = p.size * (1-k*0.7);
      if(p.shape==='rect'){ ctx.fillRect(x-s/2,y-s/2,s,s); }
      else { ctx.beginPath(); ctx.arc(x,y,Math.max(0.5,s/2),0,Math.PI*2); ctx.fill(); }
      ctx.globalAlpha = 1;
    }
    if(alive){ raf = requestAnimationFrame(loop); } else { raf = null; }
  }
  function kick(){ if(!raf) raf = requestAnimationFrame(loop); }
  return {
    burst: function(x,y,color,count,spread){
      for(var i=0;i<(count||12);i++){
        var a = Math.random()*Math.PI*2;
        var dist = spread*(0.5+Math.random()*0.6);
        particles.push({ x:x,y:y, vx:Math.cos(a)*dist, vy:Math.sin(a)*dist, life:0.5+Math.random()*0.15, t:0, size:6+Math.random()*3, color:color, shape:'circle' });
      }
      kick();
    },
    implode: function(x,y,color,count){
      for(var i=0;i<(count||10);i++){
        var a = Math.random()*Math.PI*2, r=26;
        particles.push({ x:x+Math.cos(a)*r, y:y+Math.sin(a)*r, vx:-Math.cos(a)*70, vy:-Math.sin(a)*70, life:0.4, t:0, size:5, color:color, shape:'circle' });
      }
      kick();
    },
    confetti: function(w,h,colors,count){
      for(var i=0;i<(count||70);i++){
        particles.push({
          x: Math.random()*w, y: -10-Math.random()*40,
          vx: (Math.random()-0.5)*40, vy: 60+Math.random()*60, gravity: 40,
          life: 1.6+Math.random()*0.6, t:0, size:5+Math.random()*4,
          color: colors[(Math.random()*colors.length)|0], shape: Math.random()<0.5?'rect':'circle'
        });
      }
      kick();
    },
    clear: function(){ particles.length = 0; if(raf){ cancelAnimationFrame(raf); raf=null; } var d=dpr(); ctx.clearRect(0,0,canvas.width/d,canvas.height/d); }
  };
}

/* ============ Draw screen state ============ */
var draw = {
  puzzle: null,
  grid: null, rows:0, cols:0,
  user: null,
  colorsOrder: [], stock: {},
  selectedIndex: 0,
  deleteMode: false,
  cellSize: 20,
  margin: 14,
  remaining: 0, diff: 0,
  hintUntil: 0, hintCells: [],
  fx: null, winFx: null
};

var mainCanvas = document.getElementById('main-canvas');
var fxCanvas = document.getElementById('fx-canvas');
var refCanvas = document.getElementById('ref-canvas');
var gridWrap = document.getElementById('grid-wrap');
var paletteRail = document.getElementById('palette-rail');
var winOverlay = document.getElementById('win-overlay');
var winCanvas = document.getElementById('win-canvas');
var toastEl = document.getElementById('toast');

draw.fx = makeParticleEngine(fxCanvas);
draw.winFx = makeParticleEngine(winCanvas);

function showToast(msg){
  toastEl.textContent = msg;
  toastEl.classList.add('show');
  clearTimeout(showToast._t);
  showToast._t = setTimeout(function(){ toastEl.classList.remove('show'); }, 1300);
}

function openDraw(id){
  var entry = LOOKUP[id];
  var p = entry.puzzle;
  draw.puzzle = p;
  draw.pageIndex = entry.pageIndex;
  draw.grid = p.grid;
  draw.rows = p.rows; draw.cols = p.cols;
  draw.user = [];
  for(var r=0;r<draw.rows;r++){ var row=[]; for(var c=0;c<draw.cols;c++) row.push(99); draw.user.push(row); }
  draw.colorsOrder = p.colors.slice();
  draw.stock = {};
  p.colors.forEach(function(col,i){ draw.stock[col] = p.colorsNb[i]; });
  draw.selectedIndex = 0;
  draw.deleteMode = false;
  draw.remaining = p.colorsNb.reduce(function(a,b){return a+b;},0);
  draw.diff = draw.remaining;
  draw.hintUntil = 0;
  document.getElementById('btn-erase').classList.remove('active');
  winOverlay.classList.remove('show');
  draw.winFx.clear();

  document.getElementById('draw-name').textContent = p.name;
  var diffEl = document.getElementById('draw-diff');
  diffEl.textContent = p.difficulty;
  diffEl.className = 'pill ' + p.difficulty;
  document.getElementById('ref-total').textContent = draw.remaining + ' pixels';

  layoutDraw();
  renderPalette();
  renderMain();
  updateCounter();
  showScreen('draw');
}

function layoutDraw(){
  // reference thumbnail
  drawThumb(refCanvas, draw.grid, Math.min(180, 40*Math.max(1, 6/Math.max(draw.rows,draw.cols))+120));

  // interactive grid: fit within a reasonable area, big cells for small grids
  var wrapWidth = Math.max(240, gridWrap.clientWidth - 28);
  var maxArea = Math.min(520, wrapWidth);
  var cell = Math.floor(maxArea / Math.max(draw.rows, draw.cols));
  cell = Math.max(9, Math.min(34, cell));
  draw.cellSize = cell;
  draw.margin = Math.max(8, Math.min(16, Math.round(cell*0.5))) + 4;

  var wCss = draw.cols*cell + draw.margin;
  var hCss = draw.rows*cell + draw.margin;
  setCanvasSize(mainCanvas, wCss, hCss);
  setCanvasSize(fxCanvas, wCss, hCss);
  fxCanvas.style.width = wCss+'px'; fxCanvas.style.height = hCss+'px';
}

function renderMain(){
  var ctx = mainCanvas.getContext('2d');
  var cell = draw.cellSize, m = draw.margin;
  var wCss = draw.cols*cell+m, hCss = draw.rows*cell+m;
  ctx.clearRect(0,0,wCss,hCss);

  // compass ticks (rainbow guides — ported from module/compass.lua)
  var thick = m - 4;
  for(var c=0;c<draw.cols;c++){
    ctx.fillStyle = compassColor(c);
    ctx.fillRect(m + c*cell + 1, 1, cell-2, thick);
  }
  for(var r=0;r<draw.rows;r++){
    ctx.fillStyle = compassColor(r);
    ctx.fillRect(1, m + r*cell + 1, thick, cell-2);
  }

  // grid cells
  for(r=0;r<draw.rows;r++){
    for(c=0;c<draw.cols;c++){
      var v = draw.user[r][c];
      var x = m + c*cell, y = m + r*cell;
      ctx.fillStyle = v===99 ? '#ffffff22' : PALETTE[v];
      if(v===99){
        ctx.fillStyle = 'rgba(120,110,140,0.10)';
        ctx.fillRect(x,y,cell-1,cell-1);
      } else {
        ctx.fillStyle = PALETTE[v];
        ctx.fillRect(x,y,cell-1,cell-1);
      }
      ctx.strokeStyle = 'rgba(120,110,140,0.18)';
      ctx.lineWidth = 1;
      ctx.strokeRect(x+0.5,y+0.5,cell-2,cell-2);
    }
  }

  drawHintOverlay();
}

function drawHintOverlay(){
  if(!draw.hintCells.length || Date.now() > draw.hintUntil){
    if(draw.hintRaf){ cancelAnimationFrame(draw.hintRaf); draw.hintRaf=null; }
    draw.hintCells = [];
    return;
  }
  var ctx = mainCanvas.getContext('2d');
  var cell = draw.cellSize, m = draw.margin;
  var hue = (Date.now()/8) % 360;
  ctx.strokeStyle = hsl(hue,90,60);
  ctx.lineWidth = Math.max(1.2, Math.min(3, cell*0.16));
  var inset = ctx.lineWidth/2 + 1;
  draw.hintCells.forEach(function(rc){
    var x = m + rc[1]*cell, y = m + rc[0]*cell;
    ctx.strokeRect(x+inset, y+inset, cell-inset*2, cell-inset*2);
  });
  draw.hintRaf = requestAnimationFrame(function(){ renderMain(); });
}

function renderPalette(){
  paletteRail.innerHTML = '';
  draw.colorsOrder.forEach(function(col,i){
    var sw = document.createElement('div');
    sw.className = 'swatch' + (i===draw.selectedIndex ? ' selected':'') + (draw.stock[col]<=0 ? ' empty':'');
    sw.style.background = PALETTE[col];
    var count = document.createElement('span');
    count.className = 'count'; count.textContent = '×'+draw.stock[col];
    sw.appendChild(count);
    sw.addEventListener('click', function(){
      draw.selectedIndex = i;
      draw.deleteMode = false;
      document.getElementById('btn-erase').classList.remove('active');
      renderPalette();
    });
    paletteRail.appendChild(sw);
  });
}

function updateCounter(){
  document.getElementById('draw-remaining').textContent = draw.diff;
}

function countDiff(){
  var d = 0;
  for(var r=0;r<draw.rows;r++) for(var c=0;c<draw.cols;c++) if(draw.grid[r][c] !== draw.user[r][c]) d++;
  return d;
}

function cellCenterPx(r,c){
  return { x: draw.margin + c*draw.cellSize + draw.cellSize/2, y: draw.margin + r*draw.cellSize + draw.cellSize/2 };
}

function paintCell(r,c){
  var target = draw.grid[r][c];
  var current = draw.user[r][c];
  var newColor = draw.colorsOrder[draw.selectedIndex];
  if(current === newColor) return; // no-op, matches original behaviour
  if((draw.stock[newColor]||0) <= 0) return; // out of stock
  if(current !== 99){ draw.stock[current] = (draw.stock[current]||0) + 1; }
  draw.user[r][c] = newColor;
  draw.stock[newColor] -= 1;
  var p = cellCenterPx(r,c);
  draw.fx.burst(p.x, p.y, PALETTE[newColor], 12, 55);
  afterEdit();
}
function eraseCell(r,c){
  var current = draw.user[r][c];
  if(current === 99) return;
  draw.stock[current] = (draw.stock[current]||0) + 1;
  draw.user[r][c] = 99;
  var p = cellCenterPx(r,c);
  draw.fx.implode(p.x, p.y, PALETTE[current], 10);
  afterEdit();
}
function afterEdit(){
  draw.diff = countDiff();
  updateCounter();
  renderPalette();
  renderMain();
  if(draw.diff === 0) triggerWin();
}

/* pointer interaction: short tap = paint / erase(if in delete mode); hold >=300ms = always erase */
var pressState = null;
function canvasToCell(evt){
  var rect = mainCanvas.getBoundingClientRect();
  var scaleX = mainCanvas.clientWidth ? (rect.width/mainCanvas.clientWidth) : 1;
  var x = (evt.clientX - rect.left);
  var y = (evt.clientY - rect.top);
  var c = Math.floor((x - draw.margin) / draw.cellSize);
  var r = Math.floor((y - draw.margin) / draw.cellSize);
  if(r<0||c<0||r>=draw.rows||c>=draw.cols) return null;
  return [r,c];
}
mainCanvas.addEventListener('pointerdown', function(evt){
  var rc = canvasToCell(evt);
  if(!rc) return;
  mainCanvas.setPointerCapture(evt.pointerId);
  pressState = { r:rc[0], c:rc[1], t:performance.now(), id:evt.pointerId };
});
mainCanvas.addEventListener('pointerup', function(evt){
  if(!pressState || pressState.id!==evt.pointerId) return;
  var elapsed = performance.now() - pressState.t;
  var r = pressState.r, c = pressState.c;
  pressState = null;
  if(elapsed >= 300){ eraseCell(r,c); }
  else if(draw.deleteMode){ eraseCell(r,c); }
  else { paintCell(r,c); }
});
mainCanvas.addEventListener('pointercancel', function(){ pressState = null; });
mainCanvas.addEventListener('wheel', function(evt){
  evt.preventDefault();
  var n = draw.colorsOrder.length;
  draw.selectedIndex = ((draw.selectedIndex + (evt.deltaY>0?1:-1)) % n + n) % n;
  draw.deleteMode = false;
  document.getElementById('btn-erase').classList.remove('active');
  renderPalette();
}, { passive:false });

document.addEventListener('keydown', function(evt){
  if(screens.draw.hidden) return;
  var n = draw.colorsOrder.length;
  if(evt.key==='ArrowRight' || evt.key==='ArrowDown'){ draw.selectedIndex=(draw.selectedIndex+1)%n; draw.deleteMode=false; renderPalette(); }
  else if(evt.key==='ArrowLeft' || evt.key==='ArrowUp'){ draw.selectedIndex=(draw.selectedIndex-1+n)%n; draw.deleteMode=false; renderPalette(); }
  else if(evt.key==='Backspace' || evt.key==='Delete'){ toggleDeleteMode(); }
});

function toggleDeleteMode(){
  draw.deleteMode = !draw.deleteMode;
  document.getElementById('btn-erase').classList.toggle('active', draw.deleteMode);
  mainCanvas.style.cursor = draw.deleteMode ? 'crosshair' : 'pointer';
}
document.getElementById('btn-erase').addEventListener('click', toggleDeleteMode);

document.getElementById('btn-hint').addEventListener('click', function(){
  var cells = [];
  for(var r=0;r<draw.rows;r++) for(var c=0;c<draw.cols;c++) if(draw.grid[r][c]!==99 && draw.grid[r][c]!==draw.user[r][c]) cells.push([r,c]);
  if(!cells.length){ showToast('Déjà parfait ! ✨'); return; }
  draw.hintCells = cells;
  draw.hintUntil = Date.now() + 4000;
  renderMain();
});

document.getElementById('btn-cheat').addEventListener('click', function(){
  draw.user = draw.grid.map(function(row){ return row.slice(); });
  draw.colorsOrder.forEach(function(col){ draw.stock[col]=0; });
  draw.diff = 0;
  updateCounter(); renderPalette(); renderMain();
  triggerWin();
});

function goBackToSelect(){
  currentPage = draw.pageIndex!=null ? draw.pageIndex : currentPage;
  renderSelect();
  showScreen('select');
}
document.getElementById('btn-back-top').addEventListener('click', goBackToSelect);
document.getElementById('btn-back-bottom').addEventListener('click', goBackToSelect);

function triggerWin(){
  markCompleted(draw.puzzle.id);
  var nextId = nextRealId(draw.puzzle.id);
  var nextBtn = document.getElementById('win-next');
  nextBtn.disabled = !nextId;
  nextBtn.onclick = nextId ? function(){ openDraw(nextId); } : null;
  document.getElementById('win-back').onclick = goBackToSelect;
  document.getElementById('win-sub').textContent = 'Bravo ! "' + draw.puzzle.name + '" est terminé.';

  var w = mainCanvas.clientWidth, h = mainCanvas.clientHeight;
  setCanvasSize(winCanvas, w, h);
  winCanvas.style.width = w+'px'; winCanvas.style.height=h+'px';
  var colors = draw.colorsOrder.map(function(c){ return PALETTE[c]; });
  draw.winFx.confetti(w,h,colors,90);
  winOverlay.classList.add('show');
}

/* ============ Resize handling ============ */
var resizeTimer;
window.addEventListener('resize', function(){
  clearTimeout(resizeTimer);
  resizeTimer = setTimeout(function(){
    if(!screens.draw.hidden && draw.puzzle){ layoutDraw(); renderMain(); }
  }, 120);
});

/* ============ Hot-reload friendliness (state survives a republish) ============ */
function snapshot(){
  return { screen: screens.draw.hidden ? (screens.select.hidden?'title':'select') : 'draw',
           page: currentPage, puzzleId: draw.puzzle ? draw.puzzle.id : null, progress: progress };
}
function boot(initial){
  if(initial && initial.progress){ progress = initial.progress; }
  if(initial && initial.screen === 'draw' && initial.puzzleId && LOOKUP[initial.puzzleId]){
    currentPage = initial.page || 0;
    openDraw(initial.puzzleId);
  } else if(initial && initial.screen === 'select'){
    currentPage = initial.page || 0;
    renderSelect();
    showScreen('select');
  } else {
    showScreen('title');
  }
}
try{
  if(window.claude && window.claude.hot){
    window.claude.hot.snapshot(snapshot);
    window.claude.hot.ready ? window.claude.hot.ready(boot) : boot(window.claude.hot.data);
  } else {
    boot(null);
  }
}catch(e){ boot(null); }

})();

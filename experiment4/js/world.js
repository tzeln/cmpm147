"use strict";

/* global XXH */
/* exported --
    p3_preload
    p3_setup
    p3_worldKeyChanged
    p3_tileWidth
    p3_tileHeight
    p3_tileClicked
    p3_drawBefore
    p3_drawTile
    p3_drawSelectedTile
    p3_drawAfter
*/

function p3_preload() {
  
}

function p3_setup() {
  
}

let worldSeed;

function p3_worldKeyChanged(key) {
  worldSeed = XXH.h32(key, 0);
  noiseSeed(worldSeed);
  randomSeed(worldSeed);
}

function p3_tileWidth() {
  return 32;
}
function p3_tileHeight() {
  return 16;
}

let [tw, th] = [p3_tileWidth(), p3_tileHeight()];

let clicks = {};

function p3_tileClicked(i, j) {
  let key = [i, j];
  clicks[key] = 1 + (clicks[key] | 0);
}

function p3_drawBefore() {
  
}

function p3_drawTile(i, j) {
  noStroke();
  let tileHash = XXH.h32("tile:" + [i, j], worldSeed).toNumber();
  let height = (tileHash % 8 + 1) * 10;

  switch (tileHash % 8) {
    case 7: 
      fill(100, 200);
      break;
    case 6: 
      fill(120, 200);
      break;
    case 5: 
      fill(140, 200);
      break;
    case 4: 
      fill(160, 200);
      break;
    case 3: 
      fill(180, 200);
      break;
    case 2:
    case 1:
    case 0:
      fill(255, 200);
  }

  push();

  beginShape();
  vertex(-tw, 0, height);
  vertex(0, th, height);
  vertex(tw, 0, height);
  vertex(0, -th, height);
  endShape(CLOSE);

  let n = clicks[[i, j]] | 0;
  if (n % 2 == 1) {
    fill(0, 0, 0, 32);
    ellipse(0, 0, 10, 5);
    translate(0, -10, height);
    fill(255, 255, 100, 128);
    ellipse(0, 0, 10, 10);
  }

  pop();
}

function p3_drawSelectedTile(i, j) {
  noFill();
  stroke(0, 255, 0, 128);

  beginShape();
  vertex(-tw, 0);
  vertex(0, th);
  vertex(tw, 0);
  vertex(0, -th); 
  endShape(CLOSE);

  noStroke();
  fill(0);
  text("tile " + [i, j], 0, 0);
}

function p3_drawAfter() {}

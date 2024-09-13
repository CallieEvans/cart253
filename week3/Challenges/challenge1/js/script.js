/**
 * Mr furious challenge I
 * Callie Evans
 * 
 * Doing challenge I
 * 
 */

"use strict";

// Our friend Mr. Furious
let mrFurious = {
  // Position and size
  x: 200,
  y: 200,
  size: 100,
  // Colour
  fill: {
    r: 255,
    g: 225,
    b: 225
  },
  minColours: {
    g: 0,
    b: 0
  },
    maxColours: {
    g: 225,
    b: 225
  }
};

/**
 * Create the canvas
 */
function setup() {
  createCanvas(400, 400);
}

/**
 * Draw (and update) Mr. Furious
 */
function draw() {
  background(160, 180, 200);

  mrFurious.fill.g = mrFurious.fill.g - 1;
  mrFurious.fill.b = mrFurious.fill.b - 1;

  mrFurious.fill.g = constrain(mrFurious.fill.g, mrFurious.minColours.g, mrFurious.maxColours.g);
  mrFurious.fill.b = constrain(mrFurious.fill.b, mrFurious.minColours.b, mrFurious.maxColours.b);

  
  // Draw Mr. Furious as a coloured circle
  push();
  noStroke();
  fill(mrFurious.fill.r, mrFurious.fill.g, mrFurious.fill.b);
  ellipse(mrFurious.x, mrFurious.y, mrFurious.size);
  pop();
}
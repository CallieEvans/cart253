/**
 * sTARFIELD
 * Callie Evans
 * 
 */

"use strict";

const numStars = 1000;

/**
 * Create the canvas
 */
function setup() {
    createCanvas(400, 400);
}

/**
 * Draw circles from the top to the bottom of the canvas
 */
function draw() {
    background(0);

    randomSeed(10);
    // keep the samme seeds, how long it moves before pausing
    for (let i = 0; i < numStars; i++) {
        drawStar();
    }

}

function drawStar() {
    const x = random(0, width);
    const y = random(0, height);
    const diameter = random(2, 5);

    push();
    fill(255);
    noStroke();
    ellipse(x, y, diameter);
    pop();
}
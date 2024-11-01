/**
 * Gradient
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


    //x++
    for (let x = 0; x <= width; x += 5) {

        const shade = map(x, 0, width, 0, 255);

        push();
        stroke(shade);
        line(x, 0, x, height);
        pop();
    }

}

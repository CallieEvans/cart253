/**
 * Vertical circles
 * Callie
 * 
 * Draws a series of circles from the top to the bottom of the canvas.
 * Arguably not in the most efficient way.
 */

"use strict";

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

    // Draw a series of 50-pixel diameter circles
    // Starting at the top of the canvas
    // And ending at the bottom
    let x = 200;
    let y = 0;
    let diameter = 50;

    let numCircles = 9;

    //map(mouseY, 0, height, 0, 13);
    // for (let i = 0; i < numCircles; i++) {
    //     const y = diameter * i;
    //     ellipse(x, y, diameter);

    // }
    let i = 0;

    while (i < numCircles) {
        const y = diameter * i;
        ellipse(x, y, diameter);
        i++
    }

}
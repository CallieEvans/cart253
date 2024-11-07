/**
 * Lines
 * Callie Evans
 * 
 * A series of lines across the canvas
 */

"use strict";

/**
 * Creates the canvas
 */
function setup() {
    createCanvas(500, 500);
}

/**
 * Draws lines across the canvas with increasing thickness and
 * gradually lightening colour
 */
function draw() {
    background("pink");

    for (let y = 0; y <= height; y++) {
        let shade = map(y, 0, height, 0, 255);
        stroke(shade);
        strokeWeight(1);
        line(0, y, width, y);
        shade += 1;
    }

    let x = 0;
    let strokeColour = 0;
    let strokeW = 1;
    let strokeStep = 25;
    let weightStep = 1;
    let Step = 50;

    while (x <= width) {

        stroke(strokeColour);
        strokeWeight(strokeW);
        line(x, 0, x, height);


        x += Step;
        strokeColour += strokeStep;
        strokeW += weightStep;
    }


}

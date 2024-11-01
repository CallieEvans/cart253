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

    let x = 0;
    let y = 0;
    let stroke = 0;
    let strokeW = 1;

    while (x <= width) {
        stroke(stroke);
        strokeWeight(strokeW);
        line(x, 0, y, height);

        x += 50;
        y += 50;
        stroke += 25;
        strokeW += 1;

    }


}

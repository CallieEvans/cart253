/**
 * UFO on a Dark Night
 * Pippin Barr // Callie Evans
 * 
 * A UFO. On a dark night. It just sits there?
 */

"use strict";

// Our UFO
let ufo = {
    // Position
    x: 200,
    y: 375,
    // Dimensions
    width: 150,
    height: 50,
    // Fill colour (greyscale)
    fill: 255
};

// Shade to fill the sky (background)
let skyShade = 0;

/**
 * Creates the canvas
*/
function setup() {
    createCanvas(400, 400);
}

/**
 * Displays a UFO
*/
function draw() {
    // Display the sky
    background(skyShade);
    // change bg shade / sky
    skyShade = skyShade + 1;

    //change ufo location
    ufo.x = ufo.x + .5;
    ufo.y = ufo.y - 2

    //change fill
    ufo.fill = ufo.fill *.98;
    //change shape 
    ufo.width = ufo.width / 1.005;
    ufo.height = ufo.height / 1.005;


    // Draw the UFO based on its properties
    push();
    fill(ufo.fill);
    noStroke();
    ellipse(ufo.x, ufo.y, ufo.width, ufo.height);
    pop();
}
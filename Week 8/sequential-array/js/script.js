/**
 * Speech :p
 * Callie Evans
 * 
 * Sequential arrays
 */

"use strict";

//The speech
const speech = ["Veni.", "vidi", "vici", "sensi", "malmum."];

//Which sentence
let speechIndex = 0;

/**
 * Setup
*/
function setup() {
    createCanvas(400, 400);

}


/**
 * Draws
*/
function draw() {
    background(0);

    let currentLine = speech[speechIndex];

    push();
    fill('white');
    textSize(32);
    textAlign(CENTER, CENTER);
    text(currentLine, width / 2, height / 2);
    pop();

}

function mousePressed(event) {
    speechIndex = speechIndex + 1;

    if (speechIndex >= speech.length) {
        speechIndex = 0;
    }
}
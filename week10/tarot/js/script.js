/**
 * Tarot
 * Callie Evans
 * 
 * Some experiments with data representing a Tarot deck
 */

"use strict";
//tarot data
let tarot = undefined;

let fortune = 'click to show your fortune';

/**
 * load tarot data
 */
function preload() {
    tarot = loadJSON('data/tarot.json');
}

/**
 * Create canvas
*/
function setup() {
    createCanvas(800, 400);
}


/**
 * Display tarot
*/
function draw() {
    background(0);

    //display json
    push();
    textSize(16);
    fill('yellow');
    textAlign(CENTER, CENTER);
    text(fortune, width / 2, height / 2);
    pop();

}

function mousePressed() {
    const card = random(tarot.tarot_interpretations);

    fortune = random(card.fortune_telling);
}
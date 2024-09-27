/**
 * Intro to events
 * Callie Evans
 * 
 * Events tutorials
 */

"use strict";

/**
 * create canvas
*/
function setup() {
    createCanvas(400, 400);
    background(0);
}


/**
 * nothing
*/
function draw() {

}

function mousePressed() {
    push();
    fill('#fff');
    noStroke();
    ellipse(mouseX, mouseY, 50);
    pop();
}
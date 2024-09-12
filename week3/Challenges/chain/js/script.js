/**
 * Drawing Chins
 * Callie Evans
 * 
 * A challenge to draw a long chain
 * 
 */

"use strict";

/**
 * Happens at the beginning of the program
*/
function setup() {
    //Creating a canvas for our chain
    createCanvas(640, 640);

}


/**
 * Creat the flag with background
*/
function draw() {
    //add a blue background 
   background(255,250,20);

   drawChains();
}

function drawChains(){
    push();
    noFill();
    stroke('black');
    strokeWeight(35);
    ellipse(320,0, 175, 250);
    ellipse(320,155, 175, 250);
    ellipse(320,320, 175, 250);
    ellipse(320,480, 175, 250);
     ellipse(320,640, 175, 250);
    pop();
}
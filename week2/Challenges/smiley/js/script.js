/**
 * Drawing Smiley Face
 * Callie Evans
 * 
 * A challenge to draw a smiley
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

   drawFace();

   drawEyes();

   drawSmile();
}

/**
 * Create the face
*/
function drawFace(){
    push();
    noFill();
    stroke('black');
    strokeWeight(35);
    ellipse(320,320, 320, 320);
    pop();
}


/**
 * Creat the Eyes
*/
function drawEyes(){
    push();
    noFill();
    stroke('black');
    strokeWeight(35);
    ellipse(320,0, 175, 250);
    pop();
}

/**
 * Creat the smile
*/
function drawSmile(){
    push();
    noFill();
    stroke('black');
    strokeWeight(35);
    ellipse(320,0, 175, 250);
    pop();
}
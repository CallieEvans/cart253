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
    strokeWeight(18);
    ellipse(320,320, 450);
    pop();
}


/**
 * Creat the Eyes
*/
function drawEyes(){
    push();
    fill('black');
    noStroke();
    ellipse(230,250, 60, 110);
    ellipse(400,250, 60, 110);
    pop();
}

/**
 * Creat the smile
*/
function drawSmile(){
     push();
    noFill();
    strokeWeight(15);
     arc(320, 320, 300, 300, 364.4, 9.5 , OPEN);

    pop();
}
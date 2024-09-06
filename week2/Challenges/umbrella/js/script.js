/**
 * Drawing Umbrella
 * Callie Evans
 * 
 * A challenge to draw a Umbrella
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
   background('red');

   drawUmbrellaCover();
   drawUmbrellaNeg();
   drawUmbrellaHandle();
  


}

/**
 * Create the umbrella cover
*/
function drawUmbrellaCover(){
    push();
    fill('blue');
    noStroke();
    arc(320, 300, 450, 450, 355, 0);
    pop();
}


/**
 * Create the handle and stem
*/
function drawUmbrellaHandle(){
    push();
    noFill();
    stroke('#000');
    strokeWeight(20);
    line(320, 210, 320, 500);
    stroke('yellow');
    arc(360, 500, 80, 120, 364.4, 9.5 , OPEN);
    pop();
}

/**
 * Creat the the negative space
*/
function drawUmbrellaNeg(){
    push();
    fill('red');
    noStroke();
    ellipse(320,300, 150);
    ellipse(170,300, 150);
    ellipse(470,300, 150);
    pop();
}
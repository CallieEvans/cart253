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
   drawUmbrellaHandle();
   drawUmbrellaNeg();


}

/**
 * Create the umbrella cover
*/
function drawUmbrellaCover(){
    push();
    Fill('blue');
    noStroke();
    ellipse(320,320, 450);
    pop();
}


/**
 * Create the handle and stem
*/
function drawUmbrellaHandle(){
    push();
    noFill();
    noStroke('#00');
    ellipse(230,250, 60, 110);
    ellipse(400,250, 60, 110);
    pop();
}

/**
 * Creat the the negative space
*/
function drawUmbrellaNeg(){
     push();
    Fill('red');
    ellipse(400,250, 60, 110);

    pop();
}
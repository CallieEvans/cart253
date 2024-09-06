/**
 * Drawing Pyramids
 * Callie Evans
 * 
 * A challenge to draw a pyramid
 * 
 */

"use strict";

/**
 * Happens at the beginning of the program
*/
function setup() {
    //Creating a canvas for our flag
    createCanvas(640,640);

}


/**
 * Creat the flag with background
*/
function draw() {
    //add a blue background 
   background('#638CFA');

   drawGround();

   drawPyramid();
    

}

/**
 * Draw the pyramid
*/

function drawPyramid(){

    //Draw orange triangle of pyramid
    push();
    fill(255, 200,20);
    noStroke();
    triangle(400, 400, 200,380, 300, 200);
    pop();

     //Draw gray triangle of pyramid
    push();
    fill('grey');
    noStroke();
    triangle(480, 320, 400,400, 300, 200);
    pop();
  


}

function drawGround(){

  angleMode(DEGREES);

    //Draw the sand
    push();
    fill(255, 250,20);
    noStroke();
    ellipse(100, 500, 650, 600);
    rotate(15);
    ellipse(640, 450, 800, 600);
    pop();


}

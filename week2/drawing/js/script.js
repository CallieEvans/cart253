/**
 * Drawing (creating a record)
 * Callie Evans
 * 
 * Showing a funky record 
 * 
 */

"use strict";

/**
 * Happens at the beginning of the program
*/
function setup() {
    //Creating a canvas but call only once
createCanvas(640,640);

}


/**
 * Loops at every frame that our program runs
*/
function draw() {
    //adding a background colour with hex colour
    background('#f6f6f6');

    //The main yellow circle of the record

    //Ensure the colours and widths only start here for circles
    push();
    //Add the background colour of the circle
    fill(255,200,0);
    //Set the stroke colour of the circle
    stroke(0,0,0);
    //create a circle in the canvas (y,x,w,h)
    ellipse(320, 320, 480);
     //Ensure the colours and widths end here for circles
    pop();

    //The label of the record
    push();
    fill('white');
    noStroke();
    ellipse(320,320,140,140);
    pop();


   // The hole in the record
    push();
    fill('#000');
    ellipse(320,320, 20);
    pop();

    

}
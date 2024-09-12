/**
 * Introduction to varaibles
 * Callie Evans
 * 
 * Learning about variables
 * 
 */

"use strict";

/**
 * Create canva for our project
*/
function setup() {
    //p5 function
    
createCanvas(640, 640);

}


/**
 * Loops every frame
*/
function draw() {
background(0);

    //draw circle
push();
noStroke();
fill('red');
//centers with p5 variables (based on canva dimensions)
ellipse(width / 2, height / 2, 200,200);
ellipse(mouseX, mouseY , 200,200);
pop();
  


}
/**
 * Creating Variables
 * Callie Evans
 * 
 * Class practice of creating variables
 */

"use strict";

let cheeseRed = 255;
let cheeseGreen = 255;
let cheeseBlue = 0;
let holeShade = 0;
let holeX = 140;
let holeY = 170;

let holeSize = 100;

/**
 * create cavans
*/
function setup() {
createCanvas(640,640);
}


/**
 * Draws a peice of cheese
*/
function draw() {

    //yellow background
    background(cheeseRed,cheeseGreen,cheeseBlue);

    //the holes

push();
fill(holeShade);
noStroke();
ellipse(holeX,holeY, holeSize);
pop();

}
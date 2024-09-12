/**
 * Drawing  Italian Flag
 * Callie Evans
 * 
 * A challenge to draw the italian flag
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

   drawFlag();
    

}

/**
 * Flag 3 parts of italian flag
*/

function drawFlag(){

    //Draw White Rectangle
    push();
    fill('white');
    noStroke();
    rect(240, 150, 160, 320)
    pop();

    //Draw Green Rectangle
    push();
    fill('green');
    noStroke();
    rect(80, 150, 160, 320)
    pop();

    //Draw Red Rectangle
     push();
    fill('red');
    noStroke();
    rect(400, 150, 160, 320)
    pop();


}

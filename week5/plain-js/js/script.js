/**
 * Plain Javascripts
 * Callie Evans
 * 
 * tutorial for plain js event handling
*/

"use strict";

const bg = {
    fill: 0,
    fills: {
        black: '#000',
        white:'#fff',
    },
    switchKey: 32,
}
/**
 * Create the canvas
 */
function setup() {
    createCanvas(400, 400);
    
    window.addEventListener('keydown', changeBG);

}

/**
 *  Add a bg colour
 */
function draw() {
    background(bg.fill);
  
}
/**
 * switches bg
 */
function changeBG(event) {
    if (event.keyCode === bg.switchKey) {
        if (bg.fill === bg.fills.black) {
            bg.fill = bg.fills.white;
        } else {
            bg.fill = bg.fills.black;
        }
    }
}




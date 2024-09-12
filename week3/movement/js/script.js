/**
 * Movement
 * Callie Evans
 * 
 * Learning about movement
 * 
 */

"use strict";

let bird = {
    x:120,
    y:480,
    size:50,
    velocity:{
        x: 0,
        y: 0
    },
    minVelocity:{
        x:-3,
        y:-2

    },
    maxVelocity:{
        x: 3,
        y: 2
    },
    acceleration:{
        x: 0.025,
        y: -0.2
    }
};

/**
 * Create canva for our project
*/
function setup() {
    
createCanvas(480, 480);

}


/**
 * Move the bird and display him
*/
function draw() {
    background(0);
    //move the bird
    bird.velocity.x += bird.acceleration.x;
    bird.velocity.y += bird.acceleration.y;
    bird.velocity.x = constrain(bird.velocity.x, bird.minVelocity.x, bird.maxVelocity.x);
    bird.velocity.y = constrain(bird.velocity.y, bird.minVelocity.y, bird.maxVelocity.y);


    bird.x = bird.x + bird.velocity.x;
    bird.y = bird.y + bird.velocity.y;

    //create the bird
    push();
    fill(255,255,0);
    noStroke();
    ellipse(bird.x,bird.y,bird.size);
    pop();
  


}
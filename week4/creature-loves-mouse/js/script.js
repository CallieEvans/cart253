/**
 * Creature Loves Mouse
 * Callie Evans
 * 
 * A creature that responds to the mouse by changing colour
 */

"use strict";

// Our creature
const creature = {
    // Position
    x: 200,
    y: 200,
    // Size
    size: 200,
    // Fill
    fill: "#000000", // Starts out bored
    // Possible fills for the creature that show its mood
    // We'll need these when we start changing its colour
    // and it's nice to keep them along with all the other info
    // about the creature
    fills: {
        bored: "#000000", // Black
        happy: "#33cc33", // Green
        angry: "#cc3333" // Red
    }
};

/**
 * Creates the canvas
 */
function setup() {
    createCanvas(400, 400);
}

/**
 * Fills the background, displays the creature 
 */
function draw() {
    background(255, 200, 127);

    checkInput();
    drawCreature();
} 

/**
 * Responds to user input
 */
function checkInput() {
    // check is mosue is pressed
    if (mouseIsPressed) {
        //if it is creature is happy
        creature.fill = creature.fills.happy;
    } else if (keyIsPressed) {
         //if it is creature is angry
        creature.fill = creature.fills.angry;
        
    } else {
        //if mouse and key arent pressed back to bored
        creature.fill = creature.fills.bored;
        
    };
}

/**
 * Draws the creature
 */
function drawCreature() {
    push();
    noStroke();
    // Use the creature's fill
    fill(creature.fill);
    // Display the creature at its position and size
    ellipse(creature.x, creature.y, creature.size);
    pop();
}
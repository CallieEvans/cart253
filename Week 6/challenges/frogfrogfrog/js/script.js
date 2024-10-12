/**
 * Frogfrogfrog
 * Pippin Barr
 * 
 * A game of catching flies with your frog-tongue
 * 
 * Instructions:
 * - Move the frog with your mouse
 * - Click to launch the tongue
 * - Catch flies
 * 
 * Made with p5
 * https://p5js.org/
 */

"use strict";

// Our frog
const frog = {
    // The frog's body has a position and size
    body: {
        x: 320,
        y: 520,
        size: 150,
        color: 255,
    },
    // The frog's tongue has a position, size, speed, and state
    tongue: {
        x: undefined,
        y: 480,
        size: 20,
        speed: 20,
        // Determines how the tongue moves each frame
        state: "idle" // State can be: idle, outbound, inbound
    }
};

// Our fly
// Has a position, size, and speed of horizontal movement
const fly = {
    x: 0,
    y: 200, // Will be random
    size: 10,
    speed: 3,
    counter:0
};

let state = 'title';

/**
 * Creates the canvas and initializes the fly
 */
function setup() {
    createCanvas(640, 480);

    // Give the fly its first random position
    resetFly();
}

function draw() {
    
    if (state === 'title') {
        title();
    }
    else if (state === 'game') {
        game();
    }

}
function title() {
    background('green');
    text('frogggg', 100, 100);
}

function game() {
    background("#87ceeb");
    moveFly();
    drawFly();
    moveFrog();
    moveTongue();
    drawFrog();
    checkTongueFlyOverlap();
    drawCounter();
}

/**
 * Moves the fly according to its speed
 * Resets the fly if it gets all the way to the right
 */
function moveFly() {
    // Move the fly
    fly.x += fly.speed;
    // Handle the fly going off the canvas
    if (fly.x > width) {
        resetFly();
    }
}

/**
 * Draws the fly as a black circle
 */
function drawFly() {
    push();
    noStroke();
    fill("#000000");
    ellipse(fly.x, fly.y, fly.size);
    pop();
}

/**
 * Resets the fly to the left with a random y
 */
function resetFly() {
    fly.x = 0;
    fly.y = random(0, 300);
}

/**
 * Moves the frog to the mouse position on x
 */
function moveFrog() {
    if (fly.counter < 15) {
        frog.body.x = mouseX;
    }
}

/**
 * Handles moving the tongue based on its state
 */
function moveTongue() {
    // Tongue matches the frog's x
    frog.tongue.x = frog.body.x;
    // If the tongue is idle, it doesn't do anything
    if (frog.tongue.state === "idle") {
        // Do nothing
    }
    // If the tongue is outbound, it moves up
    else if (frog.tongue.state === "outbound") {
        frog.tongue.y += -frog.tongue.speed;
        // The tongue bounces back if it hits the top
        if (frog.tongue.y <= 0) {
            frog.tongue.state = "inbound";
        }
    }
    // If the tongue is inbound, it moves down
    else if (frog.tongue.state === "inbound") {
        frog.tongue.y += frog.tongue.speed;
        // The tongue stops if it hits the bottom
        if (frog.tongue.y >= height) {
            frog.tongue.state = "idle";
        }
    }
}

/**
 * Displays the tongue (tip and line connection) and the frog (body)
 */
function drawFrog() {
    // Draw the tongue tip
    push();
    fill("#ff0000");
    noStroke();
    ellipse(frog.tongue.x, frog.tongue.y, frog.tongue.size);
    pop();

    // Draw the rest of the tongue
    push();
    stroke("#ff0000");
    strokeWeight(frog.tongue.size);
    line(frog.tongue.x, frog.tongue.y, frog.body.x, frog.body.y);
    pop();

    // Draw the frog's body
    push();
    fill(0, frog.body.color, 0);
    noStroke();
    ellipse(frog.body.x, frog.body.y, frog.body.size);
    pop();
}

/**
 * Handles the tongue overlapping the fly
 */
function checkTongueFlyOverlap() {
    // Get distance from tongue to fly
    const d = dist(frog.tongue.x, frog.tongue.y, fly.x, fly.y);
    // Check if it's an overlap
    const eaten = (d < frog.tongue.size/2 + fly.size/2);
    if (eaten) {
        // Reset the fly
        resetFly();
        // Bring back the tongue
        frog.tongue.state = "inbound";
        //another way to make the frog bigger
        frog.body.size = map(fly.counter, 0, 10, 50, 500);
        makeFrogFat();
        countOverlap();
        slowTongueSpeedFly();
        
        

    }
}

/**
 * Launch the tongue on click (if it's not launched yet)
 */
function mousePressed() {
    if (state === 'title') {
        state = 'game';
    }
    else if (state === "game") {
        if (frog.tongue.state === "idle") {
        frog.tongue.state = "outbound";
    }    }
}

/**
 * Increase frogs size when he eats a fly
 */
function makeFrogFat() {
    // frog.body.size += 10;
    // frog.tongue.size += 1;
    
    // make him get darker
    frog.body.color -= 5;
    
}
/**
 * Draw counter function
 */
function drawCounter() {
    push();
    fill("#000");
    textAlign(RIGHT, TOP);
    textStyle(BOLD);
    textSize(25);
    text(`Flies caught: ${fly.counter}`, width, 0 );
    pop();
    
}
/**
 * Increase frogs size when he eats a fly
 */
function countOverlap() {
    fly.counter += 1;
    
    if (fly.counter === 15) {
        frog.body.color = 0;
        frog.tongue.state = "inbound";   
    }
}

/**
 * Slow down the tongue
 */
function slowTongueSpeedFly() {
    //Slow tongue
    frog.tongue.speed -= 1;
    frog.tongue.speed = constrain(frog.tongue.speed, 8, 20);
    
     //speed up fly
    fly.speed += .5;
    fly.speed = constrain(fly.speed, 3, 10);
}
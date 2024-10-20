/**
 * pigpigpig
 * Pippin Barr
 * 
 * A game of catching flies with your pig-tongue
 * 
 * Instructions:
 * - Move the pig with your mouse
 * - Click to launch the tongue
 * - Catch flies
 * 
 * Made with p5
 * https://p5js.org/
 */

"use strict";

// Our pig
const pig = {
    // The pig's body has a position and size
    body: {
        x: 320,
        y: 450,
        size: 100,
        colorR: 255,
        colorG: 180,
        colorB: 242,
    },
    head: {
        size: 30,
        eye: {
            size: 15,
            color: '#000',
        }
    },
    // The pig's tongue has a position, size, speed, and state
    tongue: {
        x: undefined,
        y: 480,
        size: 10,
        speed: 20,
        // Determines how the tongue moves each frame
        state: "idle" // State can be: idle, outbound, inbound
    }
};

// Our Carrot
// Has a position, size, and speed of horizontal movement
const carrot = {
    x: 0,
    y: 200, // Will be random
    size: 14,
    speed: 3,
    counter: 0
};

let state = 'title';

/**
 * Creates the canvas and initializes the Carrot
 */
function setup() {
    createCanvas(640, 480);

    // Give the carrot its first random position
    resetCarrot();
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
    background('#b4b895');
    textSize(45);
    text('Press to start Game', 120, 200);
}

function game() {
    background("#a0b577");
    moveCarrot();
    drawCarrot();
    movePig();
    moveTongue();
    drawPig();
    checkTongueCarrotOverlap();
    drawCounter();
}

/**
 * Moves the carrot according to its speed
 * Resets the carrot if it gets all the way to the right
 */
function moveCarrot() {
    // Move the carrot
    carrot.x += carrot.speed;
    // Handle the carrot going off the canvas
    if (carrot.x > width) {
        resetCarrot();
    }
}

/**
 * Draws the carrot as a black circle
 */
function drawCarrot() {
    push();
    noStroke();
    fill("#ffcd6b");
    ellipse(carrot.x, carrot.y, carrot.size);
    pop();
}

/**
 * Resets the carrot to the left with a random y
 */
function resetCarrot() {
    carrot.x = 0;
    carrot.y = random(0, 300);
}

/**
 * Moves the pig to the mouse position on x
 */
function movePig() {
    if (carrot.counter < 15) {
        pig.body.x = mouseX;
    }
}

/**
 * Handles moving the tongue based on its state
 */
function moveTongue() {
    // Tongue matches the pig's x
    pig.tongue.x = pig.body.x;
    // If the tongue is idle, it doesn't do anything
    if (pig.tongue.state === "idle") {
        // Do nothing
    }
    // If the tongue is outbound, it moves up
    else if (pig.tongue.state === "outbound") {
        pig.tongue.y += -pig.tongue.speed;
        // The tongue bounces back if it hits the top
        if (pig.tongue.y <= 0) {
            pig.tongue.state = "inbound";
        }
    }
    // If the tongue is inbound, it moves down
    else if (pig.tongue.state === "inbound") {
        pig.tongue.y += pig.tongue.speed;
        // The tongue stops if it hits the bottom
        if (pig.tongue.y >= height) {
            pig.tongue.state = "idle";
        }
    }
}

/**
 * Displays the tongue (tip and line connection) and the pig (body)
 */
function drawPig() {

    // Draw the tongue tip
    push();
    fill("#ff0000");
    noStroke();
    ellipse(pig.tongue.x, pig.tongue.y, pig.tongue.size);
    pop();

    // Draw the rest of the tongue
    push();
    stroke("#6e5d07");
    strokeWeight(pig.tongue.size);
    line(pig.tongue.x, pig.tongue.y, pig.body.x, pig.body.y);
    pop();

    // Draw the pig's body
    push();
    fill(pig.body.colorR, pig.body.colorG, pig.body.colorB);
    noStroke();
    ellipse(pig.body.x, pig.body.y, pig.body.size);
    pop();

    // Draw the pig's heads
    push();
    fill(pig.body.colorR, pig.body.colorG, pig.body.colorB);
    noStroke();
    ellipse(pig.body.x - 25, pig.body.y - 50, pig.head.size);
    ellipse(pig.body.x + 25, pig.body.y - 50, pig.head.size);
    pop();

    // Draw the pig's eyes
    push();
    fill('black');
    noStroke();
    ellipse(pig.body.x - 25, pig.body.y - 10, pig.head.eye.size);
    ellipse(pig.body.x + 25, pig.body.y - 10, pig.head.eye.size);
    pop();

}

/**
 * Handles the tongue overlapping the carrot
 */
function checkTongueCarrotOverlap() {
    // Get distance from tongue to carrot
    const d = dist(pig.tongue.x, pig.tongue.y, carrot.x, carrot.y);
    // Check if it's an overlap
    const eaten = (d < pig.tongue.size / 2 + carrot.size / 2);
    if (eaten) {
        // Reset the carrot
        resetCarrot();
        // Bring back the tongue
        pig.tongue.state = "inbound";
        //another way to make the pig bigger
        pig.body.size = map(carrot.counter, 0, 100, 100, 500);
        pig.head.size = map(carrot.counter, 0, 100, 30, 500);
        makePigFat();
        countOverlap();
        slowTongueSpeedCarrot();



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
        if (pig.tongue.state === "idle") {
            pig.tongue.state = "outbound";
        }
    }
}

/**
 * Increase pigs size when he eats a carrot
 */
function makePigFat() {
    // pig.body.size += 10;
    // pig.tongue.size += 1;

    // make him get darker
    pig.body.colorR -= 15;
    pig.body.colorG -= 15;
    pig.body.colorB -= 15;

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
    text(`Eaten Carrots: ${carrot.counter}`, width, 0);
    pop();

}
/**
 * Increase pigs size when he eats a carrot
 */
function countOverlap() {
    carrot.counter += 1;

    if (carrot.counter === 15) {
        //pig.body.color = 0;
        pig.tongue.state = "inbound";
    }
}

/**
 * Slow down the tongue
 */
function slowTongueSpeedCarrot() {
    //Slow tongue
    pig.tongue.speed -= 1;
    pig.tongue.speed = constrain(pig.tongue.speed, 8, 20);

    //speed up carrot
    carrot.speed += .5;
    carrot.speed = constrain(carrot.speed, 3, 10);
}
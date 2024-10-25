/**
 * Pig never wins
 * Callie Evans
 * 
 * Make pig catch as many carrots as he can.
 * Be aware of the many dangers of eating too many carrots or not enough/
 * 
 * Made with p5
 * https://p5js.org/
 */

"use strict";

// Our pig
const pig = {
    // The pig's body has a position and size
    body: {
        x: 100,
        y: 250,
        size: {
            h: 125,
            w: 140,
        },
        imgTint: 255,
        sprite: undefined,
    },
    // The pig's rope has a position, size, speed, and state
    rope: {
        x: 80,
        y: undefined,
        size: 6,
        speed: 20,
        // Determines how the rope moves each frame
        state: "idle" // State can be: idle, outbound, inbound
    },
    velocity: 5,
};

// Our Carrot
// Has a position, size, and speed of horizontal movement
let carrotCounter = 0;

let carrot1 = undefined;
let carrot2 = undefined;
let carrot3 = undefined;

let goldenCarrot = undefined;

let hungerBar = {
    inside: {
        x: 20,
        y: 20,
        width: 200,
        height: 20,
        color: '#FF9450',
        timer: 0,
        counter: 0,

    },
    x: 20,
    y: 20,
    width: 201,
    height: 21,
    color: 0,
}
function createCarrot() {
    let carrots = {
        x: 0,
        y: 0, // Will be random
        size: 50,
        speed: 0,
        sprite: undefined
    };

    return carrots;

}


let state = 'title';

function preload() {
    //create carrots
    carrot1 = createCarrot();
    carrot2 = createCarrot();
    carrot3 = createCarrot();

    goldenCarrot = createCarrot();

    // specify width and height of each frame and number of frames
    carrot1.sprite = loadImage("assets/images/png-carrot-01.png");
    carrot2.sprite = loadImage("assets/images/png-carrot-01.png");
    carrot3.sprite = loadImage("assets/images/png-carrot-01.png");
    goldenCarrot.sprite = loadImage("assets/images/png-golden-carrot.png");
    //load pig image
    pig.body.sprite = loadImage('assets/images/pig-pink.png');
}


/**
 * Creates the canvas and initializes the Carrot
 */
function setup() {
    createCanvas(640, 480);

    textAlign(CENTER, CENTER);

    // Give the carrot its first random position
    resetCarrot(carrot1);
    resetCarrot(carrot2);
    resetCarrot(carrot3);
    resetCarrot(goldenCarrot);

    //start hunger timer
    let timeOut = 25;
    hungerBar.inside.timer = timeOut;

}

function draw() {

    if (state === 'title') {
        title();
    }
    else if (state === 'game') {
        game();
    }
    else if (state === 'endGame') {
        endGame();
    }
    else if (state === 'endGameGold') {
        endGameGold();
    }
    else if (state === 'endGameEat') {
        endGameEat();
    }



}
function title() {
    background('#ed98e9');
    push();
    textSize(45);
    text('Press SPACE to start Game', width / 2, height / 2 - 50);
    pop();

    push();
    textSize(25);
    text('Use Up and Down arrow keys to move pig.', width / 2, height / 2 + 20);
    text('Press Space bar to launch rope.', width / 2, height / 2 + 60);
    pop();
}

function game() {
    background("#B1CD7A");
    moveCarrot(carrot1);
    moveCarrot(carrot2);
    moveCarrot(carrot3);
    moveCarrot(goldenCarrot);
    drawCarrot(carrot1);
    drawCarrot(carrot2);
    drawCarrot(carrot3);
    drawCarrot(goldenCarrot);
    moveRope();
    drawPig();
    drawHungerBar();
    getHungry();
    pigDying();
    checkRopeCarrotOverlap(carrot1);
    checkRopeCarrotOverlap(carrot2);
    checkRopeCarrotOverlap(carrot3);
    checkRopeCarrotOverlap(goldenCarrot);
    drawCounter();

    /**
     * Moves the pig to the mouse position on y
     */
    if (keyIsPressed) {
        if (keyCode === UP_ARROW) {
            pig.body.y = pig.body.y - pig.velocity;
        } else if (keyCode === DOWN_ARROW) {
            pig.body.y = pig.body.y + pig.velocity;
        } else
            if (keyCode === 32) {
                if (state === "game") {
                    if (pig.rope.state === "idle") {
                        pig.rope.state = "outbound";
                    }
                }

            }

    }
}

function endGameGold() {
    background('#ffd52e');

    push();
    textSize(50);
    text('Pig is dead!', width / 2, height / 2 - 60);
    pop();

    push();
    textSize(30);
    text('Cause:', width / 2, height / 2 + 20);
    text('Gold shards lodged in large intestines', width / 2, height / 2 + 60);
    pop();

}
function endGameEat() {
    background('#ffad42');

    push();
    textSize(50);
    text('Pig is dead!', width / 2, height / 2 - 60);
    pop();

    push();
    textSize(30);
    text('Cause:', width / 2, height / 2 + 20);
    text('Ate to many carrots', width / 2, height / 2 + 60);
    pop();

}

function endGame() {
    background('#ff551c');

    push();
    textSize(50);
    text('Pig is dead!', width / 2, height / 2 - 60);
    pop();

    push();
    textSize(30);
    text('Cause:', width / 2, height / 2 + 20);
    text('Starved to death.', width / 2, height / 2 + 60);
    pop();

}

/**
 * Moves the carrot according to its speed
 * Resets the carrot if it gets all the way to the right
 */
function moveCarrot(carrot) {
    carrot.speed = random(1, 10);
    // Move the carrot
    carrot.y += carrot.speed;
    // Handle the carrot going off the canvas
    if (carrot.y > width) {
        resetCarrot(carrot);
        resetCarrot(carrot);
    }
}

/**
 * Draws the carrot as a black circle
 */
function drawCarrot(carrot) {
    push();
    imageMode(CENTER);
    image(carrot.sprite, carrot.x, carrot.y, carrot.size, carrot.size);
    pop();
}

/**
 * Resets the carrot to the left with a random y
 */
function resetCarrot(carrot) {
    carrot.y = random(-100, 0);
    carrot.x = random(300, 600);
}


/**
 * Handles moving the rope based on its state
 */
function moveRope() {
    // rope matches the pig's x
    pig.rope.y = pig.body.y;
    // If the rope is idle, it doesn't do anything
    if (pig.rope.state === "idle") {
        // Do nothing
    }
    // If the rope is outbound, it moves up
    else if (pig.rope.state === "outbound") {
        pig.rope.x += pig.rope.speed;
        // The rope bounces back if it hits the top
        if (pig.rope.x >= width) {
            pig.rope.state = "inbound";
        }
    }
    // If the rope is inbound, it moves down
    else if (pig.rope.state === "inbound") {
        pig.rope.x += -pig.rope.speed;
        // The rope stops if it hits the bottom
        if (pig.rope.x <= 80) {
            pig.rope.state = "idle";
        }
    }
}

/**
 * Displays the rope (tip and line connection) and the pig (body)
 */
function drawPig() {

    // Draw the rope tip
    push();
    fill("#ff0000");
    noStroke();
    ellipse(pig.rope.x, pig.rope.y, pig.rope.size);
    pop();

    // Draw the rest of the rope
    push();
    stroke("#6e5d07");
    strokeWeight(pig.rope.size);
    line(pig.rope.x, pig.rope.y, pig.body.x, pig.body.y);
    pop();

    // Draw the pig's body
    push();
    imageMode(CENTER);
    tint(pig.body.imgTint);
    image(pig.body.sprite, pig.body.x, pig.body.y, pig.body.size.w, pig.body.size.h);
    pop();

}

/**
 * Handles the rope overlapping the carrot
 */
function checkRopeCarrotOverlap(carrot) {
    // Get distance from rope to carrot
    const d = dist(pig.rope.x, pig.rope.y, carrot.x, carrot.y);
    // Check if it's an overlap
    const eaten = (d < pig.rope.size / 2 + carrot.size / 2);
    if (eaten) {
        // Reset the carrot
        resetCarrot(carrot);

        // Bring back the rope
        pig.rope.state = "inbound";
        //another way to make the pig bigger
        pig.body.size.w += 2;
        pig.body.size.h += 2;
        hungerBar.inside.width += 20;
        hungerBar.inside.width = constrain(hungerBar.inside.width, 0, 200);


        countOverlap();
        slowRopeSpeedCarrot(carrot);
    }
}
function drawHungerBar() {
    push();
    fill(hungerBar.inside.color);
    noStroke();
    rect(hungerBar.inside.x, hungerBar.inside.y, hungerBar.inside.width, hungerBar.inside.height);
    pop();

    push();
    noFill();
    stroke(hungerBar.color);
    strokeWeight(2);
    rect(hungerBar.x, hungerBar.y, hungerBar.width, hungerBar.height);
    pop();

}
function getHungry() {
    if (hungerBar.inside.counter < hungerBar.inside.timer) {
        hungerBar.inside.counter++;
    } else {
        hungerBar.inside.width -= 10;
        hungerBar.inside.width = constrain(hungerBar.inside.width, 0, 200);

        //Restart counter and timeout
        hungerBar.inside.counter = 0;
        hungerBar.inside.timer;
    }
}
function pigDying() {
    pig.body.size.w = map(hungerBar.inside.width, 0, 200, 112, 140);
    pig.body.size.h = map(hungerBar.inside.width, 0, 200, 100, 125);

    pig.body.imgTint = map(hungerBar.inside.width, 0, 200, 150, 255);

    const d = dist(pig.rope.x, pig.rope.y, goldenCarrot.x, goldenCarrot.y);
    // Check if it's an overlap
    const eatenGold = (d < pig.rope.size / 2 + goldenCarrot.size / 2);
    if (eatenGold) {
        if (state === 'game') {
            state = 'endGameGold';
        }
    } else if (hungerBar.inside.width === 0) {
        state = 'endGame';

    }
    else if (carrotCounter >= 8) {
        state = 'endGameEat';

    }
}

/**
 * Launch the rope on click (if it's not launched yet)
 */
function keyPressed() {
    if (keyCode === 32) {
        if (state === 'title') {
            state = 'game';
        }

    }
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
    text(carrotCounter, width - 20, 20);
    pop();

}
/**
 * Increase pigs size when he eats a carrot
 */
function countOverlap() {
    carrotCounter += 1;

    if (carrotCounter === 15) {
        //pig.body.color = 0;
        pig.rope.state = "inbound";
    }
}

/**
 * Slow down the rope
 */
function slowRopeSpeedCarrot(carrot) {
    //Slow rope
    pig.rope.speed -= 1;
    pig.rope.speed = constrain(pig.rope.speed, 8, 20);

    //speed up carrot
    carrot.speed += .5;
    carrot.speed = constrain(carrot.speed, 3, 10);
}
/**
 * Pig never wins
 * Callie Evans
 * 
 * Use the spacebar to release the pig's rope and catch as many carrots as you can.
 * Be aware of the many dangers of eating too many carrots or not enough!
 * 
 * Made with p5 and based off of Pippin Barr's frogfrogfrog game
 * https://p5js.org/
 */

"use strict";

// Create the variable for pig
const pig = {
    // The pig's body has a position and size
    body: {
        x: 100,
        y: 250,
        size: {
            h: 125,
            w: 140,
        },
        //To change pigs opacity and set the image
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
    //the speed pig moves
    velocity: 5,
};

// Set the variable in array format for our carrots
// Has a position, size, and speed of horizontal movement
const carrots = [];
//Set the variable for the golden carrot
let goldenCarrot = undefined;
//Set the counter for our carrot rope overlap
let carrotCounter = 0;

//Defined variable for the hunger bar
const hungerBar = {
    //Set the inside variables, to be mapped with carrot counter later
    inside: {
        x: 20,
        y: 20,
        width: 200,
        height: 20,
        color: '#FF9450',
        //Timer to slow down hunger decreases
        timer: 0,
        counter: 0,
        //To reset the hunger bar after game restart
        resetWidth: 200,

    },
    //set hungerbar outter container
    x: 20,
    y: 20,
    width: 201,
    height: 21,
    color: 0,
}
//Set the starting state for the different game titles/sections, can be title, game, gameEnd, gameEndEat, and gameEndGold
let state = 'title';

/**
 * 
 * Create the function that 'creates' all of our carrots
 */
function createCarrot() {
    let theCarrots = {
        x: 0,
        y: 0, // Will be random
        size: 50,
        speed: 0,
        sprite: undefined
    };

    return theCarrots;

}

/**
 * Set preload function to load and defined our images to each sprite
 */
function preload() {
    //create the carrots through a loop so we only create 4
    for (let i = 0; i < 4; i++) {
        const newCarrot = createCarrot();;
        carrots.push(newCarrot);
    }
    //Create the gold carrot using the same predefined function
    goldenCarrot = createCarrot();

    // Set the loaded image to each normal carrot
    for (let carrot of carrots) {
        carrot.sprite = loadImage("assets/images/png-carrot-01.png");
    }
    //Set the loaded image to the golden carrot
    goldenCarrot.sprite = loadImage("assets/images/png-golden-carrot.png");

    //Set the loaded image to the pig
    pig.body.sprite = loadImage('assets/images/pig-pink.png');
}


/**
 * Creates the canvas, sets text values, and initializes the Carrots positions. 
 * Also defined our timer and timeout values.
 */
function setup() {
    createCanvas(640, 480);
    //Set default text values to center
    textAlign(CENTER, CENTER);

    // Give the carrot its first random position (initializes it)
    for (let carrot of carrots) {
        resetCarrot(carrot);
    }
    // Give the (golden) carrot its first random position (initializes it)
    resetCarrot(goldenCarrot);

    //Start hungerbar timer
    let timeOut = 25;
    hungerBar.inside.timer = timeOut;

}

/**
 * Setup our states to switch between game screens
 */
function draw() {
    //Starting game screen
    if (state === 'title') {
        title();
    }
    //In game (play)
    else if (state === 'game') {
        game();
    }
    //Ending game screen for starving to death
    else if (state === 'endGame') {
        endGame();
    }
    //Ending game screen for eating golden carrot
    else if (state === 'endGameGold') {
        endGameGold();
    }
    //Ending game screen for eating to many carrots, greedy guy...
    else if (state === 'endGameEat') {
        endGameEat();
    }
}

/**
 * Define / draw our title screen
 */
function title() {
    //Create a pink background
    background('#ed98e9');
    push();
    textSize(45);
    text('Press ENTER to start Game', width / 2, height / 2 - 50);
    pop();

    push();
    textSize(25);
    text('Use Up and Down arrow keys to move pig.', width / 2, height / 2 + 20);
    text('Press SPACEBAR to launch rope.', width / 2, height / 2 + 60);
    pop();
}
/**
 * Define / draw the in game play section
 */
function game() {
    //Create a green background
    background("#B1CD7A");

    //Draw the carrot counter
    drawCounter();

    //Draw the hunger bar
    drawHungerBar();

    //Loop through carrots array to move, draw and check for carrot/rope overlap. 
    for (let carrot of carrots) {
        moveCarrot(carrot);
        drawCarrot(carrot);
        checkRopeCarrotOverlap(carrot);
    }
    //Move and draw the carrots
    moveCarrot(goldenCarrot);
    drawCarrot(goldenCarrot);

    //Check for rope/carrot overlap for golden carrot
    checkRopeCarrotOverlap(goldenCarrot);

    //Move the pigs ropes
    moveRope();

    //Draw pig
    drawPig();

    //Shrinks the pigs as he gets hungrier, also controlls when he dies.
    pigDying();

    //Controlls the hungerbar timer and how much / how fast he gets hungry
    pigHungry();

    /**
     * Controls the pigs vertical movement with up and down arrows
     */

    if (keyIsDown(UP_ARROW)) {
        pig.body.y = pig.body.y - pig.velocity;
    } else if (keyIsDown(DOWN_ARROW)) {
        pig.body.y = pig.body.y + pig.velocity;
    }

    /**
    * Controls the launching of pigs rope through SPACEBAR
    */
    if (keyIsDown(32)) {
        if (state === "game") {
            if (pig.rope.state === "idle") {
                pig.rope.state = "outbound";
            }
        }
    }

}

/**
 * Define / draw our death screen for eating the golden carrot
 */
function endGameGold() {
    //Create a gold background
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

/**
 * Define / draw our death screen for eating too many carrots
 */
function endGameEat() {
    //Create a orange background
    background('#ffad42');

    push();
    textSize(50);
    text('Pig is dead!', width / 2, height / 2 - 60);
    pop();

    push();
    textSize(30);
    text('Cause:', width / 2, height / 2 + 20);
    text('Ate too many carrots', width / 2, height / 2 + 60);
    pop();
}

/**
 * Define / draw our death screen for not eating enough carrots
 */
function endGame() {
    //Create a red background
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
 * Draw the counter
 */
function drawCounter() {
    //displays counter in top right corner
    push();
    fill("#000");
    textAlign(RIGHT, TOP);
    textStyle(BOLD);
    textSize(25);
    text(carrotCounter, width - 20, 20);
    pop();

}

/**
 * Draws the hungerbar
 */
function drawHungerBar() {
    //draws the inside of the hungerbar
    push();
    fill(hungerBar.inside.color);
    noStroke();
    rect(hungerBar.inside.x, hungerBar.inside.y, hungerBar.inside.width, hungerBar.inside.height);
    pop();

    //draw the outside of hungerbar
    push();
    noFill();
    stroke(hungerBar.color);
    strokeWeight(2);
    rect(hungerBar.x, hungerBar.y, hungerBar.width, hungerBar.height);
    pop();

}

/**
 * Moves the carrot according to its speed
 * Resets the carrot once it hits the bottom
 */
function moveCarrot(carrot) {
    //Randomize the carrot speed first
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
 * Draws the carrot adn sets the carrot image
 */
function drawCarrot(carrot) {
    push();
    imageMode(CENTER);
    image(carrot.sprite, carrot.x, carrot.y, carrot.size, carrot.size);
    pop();
}

/**
 * Resets the carrot to the top with a random y
 * Resets the carrot with a random x
 */
function resetCarrot(carrot) {
    carrot.y = random(-100, 0);
    carrot.x = random(300, 600);
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
        // Reset the carrots position
        resetCarrot(carrot);

        // Bring back the rope
        pig.rope.state = "inbound";

        //Make the pig slightly pigger everytime he eats a carrot
        pig.body.size.w += 2;
        pig.body.size.h += 2;

        //Increase hungerbar everytime pig eats a carrot and constrain it
        hungerBar.inside.width += 20;
        hungerBar.inside.width = constrain(hungerBar.inside.width, 0, 200);

        //Increase counter everytime pig eats a carrot
        countOverlap();

        //Slow the ropes velocity when pig eats carrot
        slowRopeSpeedCarrot(carrot);
    }
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

    // Draw the pig's body with the pig image
    push();
    imageMode(CENTER);
    tint(pig.body.imgTint);
    image(pig.body.sprite, pig.body.x, pig.body.y, pig.body.size.w, pig.body.size.h);
    pop();

}

/**
 * Slowly increase pigs hunger and decrease hungerbar display (width)
 */
function pigHungry() {
    //Check timer attributes and then increase counter
    if (hungerBar.inside.counter < hungerBar.inside.timer) {
        hungerBar.inside.counter++;
        //After timer delay decrease hunger a bit 
    } else {
        hungerBar.inside.width -= 10;
        hungerBar.inside.width = constrain(hungerBar.inside.width, 0, 200);

        //Restart counter and timeout
        hungerBar.inside.counter = 0;
        hungerBar.inside.timer;
    }
}
/**
 * As pig gets hungrier he starts to shrink and die. 
 */
function pigDying() {
    //Map the pigs size to the hungerbar so he gets smaller
    pig.body.size.w = map(hungerBar.inside.width, 0, 200, 112, 140);
    pig.body.size.h = map(hungerBar.inside.width, 0, 200, 100, 125);

    //Map the pigs opacity to the hunger bar so he changes colour
    pig.body.imgTint = map(hungerBar.inside.width, 0, 200, 150, 255);

    //Check the distance between rope tip and the golden carrot
    const d = dist(pig.rope.x, pig.rope.y, goldenCarrot.x, goldenCarrot.y);
    // Check if pig ate golden carrot 
    const eatenGold = (d < pig.rope.size / 2 + goldenCarrot.size / 2);
    if (eatenGold) {
        //If it is eaten change state to death screen for golden carrot
        if (state === 'game') {
            state = 'endGameGold';
        }
        //Check if the hunger bar is at 0
    } else if (hungerBar.inside.width === 0) {
        //display died of starvation death screen
        state = 'endGame';

    }
    //Check if pig ate 8 carrots
    else if (carrotCounter >= 12) {
        //display died of over eating death screen
        state = 'endGameEat';
    }
}
/**
 * Increase the counter when pig eats carrot
 */
function countOverlap() {
    carrotCounter += 1;
}

/**
 * Slow down the rope every time pig eats a carrot
 */
function slowRopeSpeedCarrot() {
    //Slow rope
    pig.rope.speed -= 1;
    pig.rope.speed = constrain(pig.rope.speed, 8, 20);
}
/**
 * Reset all of the counters for game restart
 */
function resetCounters() {
    //reset carrot counter
    carrotCounter = 0;
    //reset the hunger bar
    hungerBar.inside.width = hungerBar.inside.resetWidth;

}

/**
 * Defined how to restart and start the game from different title screens
 */
function keyPressed() {
    //check if ENTER is pressed
    if (keyCode === 13) {
        if (state === 'title') {
            state = 'game';
        } else if (state === 'endGame') {
            state = 'title';
            //reset the hunger bar and carrot counter
            resetCounters();
        } else if (state === 'endGameEat') {
            state = 'title';
            //reset the hunger bar and carrot counter
            resetCounters();
        } else if (state === 'endGameGold') {
            state = 'title';
            //reset the hunger bar and carrot counter
            resetCounters();
        }

    }
}

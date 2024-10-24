/**
 * Challenge
 * Callie Evans
 * 
 * The starting point for a ball-bouncing experience of
 * epic proportions!
 */

"use strict";

// Our ball
const ball = {
    x: 300,
    y: 20,
    width: 10,
    height: 10,
    velocity: {
        x: 0,
        y: 2
    }
};

// Our paddle
const paddle = {
    x: 300,
    y: 280,
    width: 80,
    height: 10
};

/**
 * Create the canvas
*/
function setup() {
    createCanvas(600, 300);
}


/**
 * Move and display the ball and paddle
*/
function draw() {
    background("#87ceeb");

    movePaddle(paddle);
    moveBall(ball);

    handleBounce(ball, paddle);

    drawBlock(paddle);
    drawBlock(ball);
}

/**
 * Moves the paddle
 */
function movePaddle(paddle) {
    paddle.x = mouseX;
}

/**
 * Moves the ball
 */
function moveBall(ball) {
    ball.y = ball.y + ball.velocity.y;

}

function handleBounce(ball, paddle) {
    //const ballOverlap = ball.w
    if () {

    }

}

/**
 * Draws games element on canvas
 */
function drawBlock(element) {
    push();
    rectMode(CENTER);
    noStroke();
    fill("pink");
    rect(element.x, element.y, element.width, element.height);
    pop();
}


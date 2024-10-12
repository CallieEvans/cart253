/**
 * The Only Move Is Not To Play
 * Callie Evans
 *
 * A game where your score increases so long as you do nothing.
 */

"use strict";

// Current score
let score = 0;

// Is the game over?
let gameOver = false;

/**
 * Create the canvas
 */
function setup() {
    createCanvas(400, 400);
    
    document.addEventListener('keydown', gameOverTrue);
    document.addEventListener("visibilitychange", gameOverTrue);
  
  // have to add window to check if its online/offline it needs to be window not document
    window.addEventListener("offline", gameOverTrue);
    document.addEventListener("mousedown", gameOverTrue);
    document.addEventListener("mousemove", gameOverTrue);
    document.addEventListener("wheel", gameOverTrue);


}

/**
 * Update the score and display the UI
 */
function draw() {
  background("#87ceeb");
  
  // Only increase the score if the game is not over
  if (!gameOver) {
    // Score increases relatively slowly
    score += 0.05;
  }
  displayUI();
}

/**
 * Show the game over message if needed, and the current score
 */
function displayUI() {
  if (gameOver) {
    push();
    textSize(48);
    textStyle(BOLD);
    textAlign(CENTER, CENTER);
    text("You lose!", width/2, height/3);
    pop();
  }
  displayScore();
}

/**
 * Display the score
 */
function displayScore() {
  push();
  textSize(48);
  textStyle(BOLD);
  textAlign(CENTER, CENTER);
  text(floor(score), width/2, height/2);
  pop();
}

function gameOverTrue(event){

     if (event) {
        gameOver = true;
    }
    
}
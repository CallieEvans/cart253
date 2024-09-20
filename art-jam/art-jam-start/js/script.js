/**
 * Crying Buckets
 * Callie Evans
 * 
 * This program contains a fly eye that cries tears. 
 * The user must use a bucket and left/right arrow keys to catch the tears 
 * and fill up the bucket. There is a percentage counter to track the progress
 */

"use strict";

let bucket = {
    x: 280,
    y: 509,
    fill: {
        bucketStroke: '#707070',
        bucketFill: '#ededed',
        bucketFillInner: '#c9c9c9'
    }
}
let eye = {
    x: 100,
    y: 100,
    fill: {
        iris:'#20444f',
        eyeFill:'white',
        stroke:'black'
    }
}

let tears = {
    y: eye.y,
    fill: 'lightblue',
}

/**
 * Create the Canvas and sky
*/
function setup() {
    createCanvas(600, 600);
    

}


/**
 * Move eye and make it cry. Also creates the tears, bucket and percentage
*/
function draw() {
    //Draw a blue sky that changes with emotion
    background(120, 150, 200);
    
    //Draw our bucket
    drawBucket();
    //move the bucket with mouseX
    moveBucket();
    //Draw the tears
    drawTears();
    //Draw the eye
    drawEye();
    //Randomly move the eye
    //moveEye();
    

}

/**
 * Draw our bucket 
*/
function drawBucket() {
    push();
    fill(bucket.fill.bucketFill);
    stroke(bucket.fill.bucketStroke);
    strokeWeight(2);
    rect(bucket.x, bucket.y, 70, 90);
    pop();
    
    //draw inside of bucket
    push();
    fill(bucket.fill.bucketFillInner);
    noStroke();
    rect(bucket.x+10, bucket.y+1, 50, 80);
    pop();
}

/**
 * move the bucket and constrain its movements
*/

function moveBucket() {
    //Move bucket with mouse
    
    bucket.x = mouseX;
    //Constrain bucket movement
    bucket.x = constrain(bucket.x ,1, 529);
    
    // if (keyIsDown(LEFT_ARROW) === true) {
    //     bucket.x -= 4;
    // }
    // //Move bucket to the right
    // if (keyIsDown(RIGHT_ARROW) === true) {
    //     bucket.x += 4;
    // }

}

/**
 * Draw the eye
*/
function drawEye() {
    //set angles to degrees
    angleMode(DEGREES);
    
    //Code sourced from p5 reference files: https://editor.p5js.org/jackiehu/sketches/Sy7JkKJk4
    push();
    fill(eye.fill.eyeFill);
    stroke(eye.fill.stroke);
    strokeWeight(2);
    translate(eye.x, eye.y);
    beginShape();
    vertex(-80,0);
    bezierVertex(-30,-50,30,-50,80,0);
    bezierVertex(30,50,-30,50,-80,0)
    endShape();
    pop();
    
    //Draw the iris
    push();
    fill(eye.fill.iris);
    stroke('black');
    strokeWeight(1);
    ellipse(eye.x, eye.y, 75);
    pop();
     //Draw the pupil
    push();
    fill('black');
    noStroke();
    ellipse(eye.x, eye.y, 25);
    pop();
}

/**
 * Randomly move eye
*/
// function moveEye() { 
//     eye.x = random(100, 500);
//     eye.y = random(50,300);
// }

/**
 * Draw the tears
*/
function drawTear() { 
    //tearSize = random(20, 30);
    tears.y += 2;
    push();
    fill(tears.fill);
    noStroke();
    ellipse(eye.x, tears.y, 20);
    pop();

}

function drawTears() {
     for (let i = 0; i < 25; i += 1) {
     drawTear();
  }
}


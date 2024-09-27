/**
 * Crying Buckets
 * Callie Evans
 * 
 * This program contains a flying eye that cries tears. 
 * The user must use a bucket and left/right arrow keys to catch the tears 
 * and fill up the bucket. There is a percentage counter to track the progress
 * 
 * To do list:
 * clean up code
 * organize it
 * add comments
 * add in states for an game over screen
 * 
 * If have time:
 * add function to loose percentage is you cant catch a tear
 * add a timeout, if the backgrounds reach their limits before you completely fill bucket, its game over
 * 
 * if reallyyyy have time, add another eye
 */


"use strict";
let bgColours = {
     colors: {
        r: 225,
        g: 232,
        b: 235
    },
    colorsSpeed: {
        r: .3,
        g: .2,
        b: .15
    },
    
}
let bucket = {
    x: 280,
    y: 509,
    height: 90,
    width:70,
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
    },
    velocityX: 2,
    velocityY: 2,
    dCounter: 0,
    dTimeOut: 0,
}

let tears = {
    y: eye.y,
    x: eye.x,
    fill: 'lightblue',
    size: 20,
    velocity:8,

}

let bucketReserve = {
    height: 0,
    fill: 2,
    colors: '#659db5'
}

/**
 * Create the Canvas and sky
*/
function setup() {
    createCanvas(600, 600);
    
    //Timeout for counter
    let timeOut = random(50, 100);
    eye.dTimeOut = timeOut;
    // tears.timeOut = random(10,20);
    bucketReserve.height;

}


/**
 * Move eye and make it cry. Also creates the tears, bucket and percentage
*/
function draw() {
    //Draw a blue sky that changes with emotion
    background(bgColours.colors.r, bgColours.colors.g, bgColours.colors.b);
    
    bgColours.colors.r -= bgColours.colorsSpeed.r;
    bgColours.colors.g -= bgColours.colorsSpeed.g;
    bgColours.colors.b -= bgColours.colorsSpeed.b;
    
    bgColours.colors.r = constrain(bgColours.colors.r, 12, 255);
    bgColours.colors.g = constrain(bgColours.colors.g, 23, 255);
    bgColours.colors.b = constrain(bgColours.colors.b, 28, 255);
    console.log(bgColours.colors.b);

    moveBucket();
    //Draw the tears
    drawTear();
    //Draw the eye
    //Draw our bucket
    drawBucket();
    //draw bucket reserve
    drawBucketReserve();
    //move the bucket with mouseX
    drawEye();
    //Randomly move the eye
    moveEye();
    //fill up bucket
    fillBucket();
    //Progres bar
    bucketProgress();
    
    

}

/**
 * Draw our bucket 
*/
function drawBucket() {
    push();
    fill(bucket.fill.bucketFill);
    stroke(bucket.fill.bucketStroke);
    strokeWeight(2);
    rect(bucket.x, bucket.y, bucket.width, bucket.height);
    pop();
    
    //draw inside of bucket
    push();
    fill(bucket.fill.bucketFillInner);
    noStroke();
    rect(bucket.x + 10, bucket.y + 1, bucket.width -20, bucket.height-10);
    pop();
}

/**
 * Draw bucket water reserve
*/
function drawBucketReserve() {
    //draw inside of bucket
    push();
    fill(bucketReserve.colors);
    noStroke();
    rect(bucket.x + 10, height - (bucketReserve.height + 10), bucket.width - 20, bucketReserve.height);
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
function moveEye() { 
    // Set counter and randomize velocity e.i x and y
    if (eye.dCounter < eye.dTimeOut) {
        eye.dCounter++;
    } else {
        eye.velocityX = random(-8, 8);
        eye.velocityY = random(-2, 2);
        eye.dCounter = 0;
        eye.dTimeOut;
    }
    //reversing the x velocity
    if (eye.x < 0 + 80 || eye.x > width - 80) {
        eye.velocityX = -eye.velocityX ;
    }
    if (eye.y < 0 + 35 || eye.y > height / 2) {
        eye.velocityY = -eye.velocityY ;
    }
    eye.x += eye.velocityX;
    eye.y += eye.velocityY;
    
}

/**
 * Draw the tears
*/
function drawTear() { 
    //tearSize = random(20, 30);
    tears.y += tears.velocity;
    push();
    fill(tears.fill);
    noStroke();
    ellipse(tears.x, tears.y, tears.size);
    pop();
    if (tears.y > height) {
        tears.y = eye.y;
        tears.x = eye.x;
    } else {
        // want to remove bucket fill if you miss one or two
       // bucketReserve.height -= bucketReserve.fill;
    }
}
/**
 * Fills bucket and makes background darker
*/
function fillBucket() {
    //const targetDistance = dist(bucket.x, bucket.y, tears.x, tears.y);
    const tearInBucketY = (tears.y > bucket.y);
    // check if the tear in in the bucket on x
    const tearInBucketX = (tears.x > 0 + bucket.x && tears.x < bucket.x + bucket.width);

    if (tearInBucketY && tearInBucketX) {
        bucketReserve.height += bucketReserve.fill;
        tears.y = eye.y;
        tears.x = eye.x;
    }
    bucketReserve.height = constrain(bucketReserve.height, 0, 80);
}

function bucketProgress() {
    let progress = int(map(bucketReserve.height, 0, 80, 0, 100));
    
    textAlign(CENTER, CENTER);
    textSize(20);
    text(`How full is your bucket: ${progress}%`, width - 155, 50);
    
    if (bgColours.colors.r < 80 || bgColours.colors.g < 80 || bgColours.colors.b < 80) {
        fill('white');
    }

}



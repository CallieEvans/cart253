/**
 * Crying Buckets
 * Callie Evans
 * 
 * This program contains a flying eye that cries tears. 
 * The user must use a bucket and controlled by the mouse to catch the tears and fill up the bucket. 
 * There is a percentage counter to track the progress. 
 * The sky slowly get darker over time, once the sky is black and you haven't filled your bucket it's game over.
 * 
 * add in states for an game over screen
 * 
 * If have time:
 * add function to loose percentage is you cant catch a tear
 * add a timeout, if the backgrounds reach their limits before you completely fill bucket, its game over
 * 
 * if reallyyyy have time, add another eye
 */


"use strict";
let state = 'game';

//Set varaibles for if you win the game
let winGame = {
    string: 'Yay you won',
    bgColor: 'green'
    
};

//Set variables for if you lose the game
let loseGame = {
    string: 'Oops you lost',
    bgColor: 'red'
    
};

//Set background colour variables
let bgColours = {
    colors: {
        r: 190,
        g: 200,
        b: 205
    },
    //Controls the amount that the background r,g,b values subtract every frame
    colorsSpeed: {
        r: .25,
        g: .15,
        b: .1
    },
    
};

//Set varaibles for the eye
let eye = {
    x: 100,
    y: 100,
    fill: {
        iris: '#20444f',
        eyeFill: 'white',
        stroke: 'black'
    },
    velocityX: 2,
    velocityY: 2,
    //Controls starting values to determ how mong before
    dCounter: 0,
    dTimeOut: 0,
};

//Set varaibles falling tears
let tears = {
    y: eye.y,
    x: eye.x,
    fill: 'lightblue',
    size: 20,
    velocity: 9,

};

//Set varaibles for the bucket
let bucket = {
    x: 280,
    y: 509,
    height: 90,
    width: 70,
    fill: {
        bucketStroke: '#707070',
        bucketFill: '#ededed',
        //This value is for gray part of the bucket
        bucketFillInner: '#c9c9c9'
    }
};

//Set varaibles for the bucket reserve
let bucketReserve = {
    height: 0,
    fill: 2,
    colors: '#659db5'
};
//Set varaible for the progress section
let progress = undefined;

/**
 * Create the the Canvas and set random timeout variable for the eye
*/
function setup() {
    createCanvas(600, 600);
    
    //Timeout for counter, this controls the random motion of our eye
    let timeOut = random(50, 100);
    eye.dTimeOut = timeOut;
    
    //Display settings for text
    textAlign(CENTER, CENTER);
    textSize(50);

}


/**
 * Draw a moving and crying eye along with a bucket to catch the tears
*/
function draw() {
    
    // Check the the game state and call the functions (Referenced from p5 sketch by Pippin Barr, see read me)
    if (state === "game") {
        inGame();
    }
    else if (state === "win") {
        gameWin();
    } else if (state === 'lose') {
        gameLose();
    }
}

/**
 * In game state, where you can play the game
*/
function inGame() {
    
    //Draw a blue sky that gradually gets darker over time
    background(bgColours.colors.r, bgColours.colors.g, bgColours.colors.b);
    
    //Allows background colours to change
    backgroundShift();
    
    //Display a percentage/progress area to show how full the bucket is
    bucketProgress();
    
    //Draw the tears (fall from eye) 
    drawTear();
    
    //Draw the eye
    drawEye();
    
    //Randomly move the eye in top section of Canvas
    moveEye();
    
    //Draw our bucket
    drawBucket();
    
    //draw inside of bucket that grows 
    drawBucketReserve();
    
    //move the bucket with mouseX
    moveBucket();
        
    //'Fill' the bucketreserve every time it catches a tear
    fillBucket();
    
    
}
/**
 * State that happens when you win the game
*/
function gameWin() {
    //Set game background colour if you win
    background(winGame.bgColor);

    push();
    fill("#ffffff");
    text(winGame.string, width / 2, height / 2);
    pop();
}

/**
 * State that happens when you lose the game
*/
function gameLose() {
    //Set game background colour if you win
    background(loseGame.bgColor);

    push();
    fill("#ffffff");
    text(`${progress}%`, width / 2, height / 2 - 20);
    text(loseGame.string, width / 2, height / 2 + 50);
    pop();
}

/**
 * Makes the background get more blue and darker over time
*/
function backgroundShift() {
    //Slowly subtract different numbers from r, g, and b values
    bgColours.colors.r -= bgColours.colorsSpeed.r;
    bgColours.colors.g -= bgColours.colorsSpeed.g;
    bgColours.colors.b -= bgColours.colorsSpeed.b;
    
    //Constrain these subtractions so it doesn't increase or decrease past wanted numbers
    bgColours.colors.r = constrain(bgColours.colors.r, 12, 255);
    bgColours.colors.g = constrain(bgColours.colors.g, 23, 255);
    bgColours.colors.b = constrain(bgColours.colors.b, 28, 255);
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
 * Draw the eye as well as the iris
*/
function drawEye() {
    //set angles to degrees
    angleMode(DEGREES);
    
    push();
    fill(eye.fill.eyeFill);
    stroke(eye.fill.stroke);
    strokeWeight(2);
    
    //Code sourced from p5 reference, see read me
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
 * Randomly move eye on top part of Canvas
*/
function moveEye() { 
    // Set counter and randomize velocity e.i x and y
    if (eye.dCounter < eye.dTimeOut) {
        eye.dCounter++;
    } else {
        eye.velocityX = random(-8, 8);
        eye.velocityY = random(-2, 2);
        
        //Restart counter and timeout
        eye.dCounter = 0;
        eye.dTimeOut;
    }
    //Reversing the x velocity so it doesn't move it one direction 
    //This also constrains it's location to the inner corners of the Canvas
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
 * Draw the bucket 
*/
function drawBucket() {
    push();
    fill(bucket.fill.bucketFill);
    stroke(bucket.fill.bucketStroke);
    strokeWeight(2);
    rect(bucket.x, bucket.y, bucket.width, bucket.height);
    pop();
    
    //draw inside of bucket with gray fill
    push();
    fill(bucket.fill.bucketFillInner);
    noStroke();
    rect(bucket.x + 10, bucket.y + 1, bucket.width - 20, bucket.height - 10);
    pop();
}

/**
 * Draw bucket reserve that will hold the water aka tears
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
 * move the bucket/bucket reserve and constrain its movements
*/
function moveBucket() {
    //Move bucket with mouse
    bucket.x = mouseX;
    
    //Constrain bucket movement
    bucket.x = constrain(bucket.x ,1, 529);

}

/**
 * Fill slowly fill up bucket reserve whenever it catches a tear
*/
function fillBucket() {
    //Check if the tear overlaps with the bucket on the y axis
    const tearInBucketY = (tears.y > bucket.y);
    //Check if the tear overlaps with buckets widths on the x axis
    const tearInBucketX = (tears.x > 0 + bucket.x && tears.x < bucket.x + bucket.width);

    if (tearInBucketY && tearInBucketX) {
        //Grow bucket reserve height by a small amount when it catches the tears
        bucketReserve.height += bucketReserve.fill;
        
        //Once tear hits the bucket reset its position at the eye
        tears.y = eye.y;
        tears.x = eye.x;
    }
    
    //Constrain bucket reserve height so it doesn't get bigger than the bucket
    bucketReserve.height = constrain(bucketReserve.height, 0, 80);
}

/**
 * Draw a progress / percentage section
*/
function bucketProgress() {
    //Map the height of the bucket to (max 80px) to  a 0-100 percentage value
    progress = int(map(bucketReserve.height, 0, 80, 0, 100));
    
    //Referenced p5 files, see read me.
    push();
    textAlign(CENTER, CENTER);
    textSize(30);
    text(`Bucket reserve: ${progress}%`, width - 155, 50);
    pop();
    
    //Check if r, g or b values are too dark and then make text white
    if (bgColours.colors.r < 80 || bgColours.colors.g < 80 || bgColours.colors.b < 80) {
        fill('fff');
    }
    
    //Determine if you won or lost the game and display correct state
    if (progress === 100) {
        state = 'win';
    }else if (bgColours.colors.b === 28) {
        state = 'lose';
    }

}



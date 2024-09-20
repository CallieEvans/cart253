/**
 * Challenge III
 * Callie Evans
 * 
 * Doing challenge III
 * 
 */

"use strict";

// Our friend Mr. Furious 
let mrFurious = {
  // Position and size
  x: 200,
  y: 200,
  size: 100,
  // Colour
  fill: {
    r: 255,
    g: 225,
    b: 225
  },
  minColours: {
    g: 0,
    b: 0
  },
    maxColours: {
    g: 225,
    b: 225
  },
  shakeValue: 0
};

//The sky
let sky = {
  r: 160,
  g:180,
  b:200,
  minColours:{
    r: 0,
    g:0,
    b:0
  },
   maxColours:{
    r: 160,
    g:180,
    b:200,
  }
};

//Create bird
let bird = {
  // Position and size
  x: 0,
  y: 250,
  size: 50,
  // Colour
  fill: {
    r: 90,
    g: 25,
    b: 80
  },
  velocity:{
    x: 0,
    y: 0
   },
  acceleration:{
    x: 0.025,
    y: -0.2
  },
  minVelocity:{
    x:-3,
    y:-2

    },
  maxVelocity:{
    x: 3,
    y: 2
  }

};

//Mr furious shake values
// let shakeValue = {
//     incre: 200,
//     minInc: 200.5,
//     maxInc:220

// };

/**
 * Create the canvas
 */
function setup() {
  createCanvas(400, 400);
}

/**
 * Draw (and update) Mr. Furious and change day to night
 */

function draw() {
  //Make sky
  skyNight();
  background(sky.r, sky.g, sky.b);

  mrFuriousColours();
  //shake mr furous

    //constrain his shake

  // shakeValue.incre = shakeValue.incre + .025;
  // shakeValue.incre =  constrain(shakeValue.incre, shakeValue.minInc, shakeValue.maxInc);
  // let xShake = random(200, shakeValue.incre);
  // let yShake = random(200, shakeValue.incre);
  
  //shake mr furious
  mrFurious.shakeValue += .1;
  mrFurious.shakeValue = constrain(mrFurious.shakeValue, 0, 5);
  const x = mrFurious.x + random(-mrFurious.shakeValue, mrFurious.shakeValue);
  const y = mrFurious.y + random(-mrFurious.shakeValue, mrFurious.shakeValue);

  // Draw Mr. Furious as a coloured circle
  push();
  noStroke();
  fill(mrFurious.fill.r, mrFurious.fill.g, mrFurious.fill.b);
  ellipse(x, y, mrFurious.size);
  pop();

  //Make bird fly
  birdFly();

   // Draw bird as a coloured circle
  push();
  noStroke();
  fill(bird.fill.r, bird.fill.g, bird.fill.b);
  ellipse(bird.x, bird.y, bird.size);
  pop();
  

}

/**
 * Make bird fly
 */
 function birdFly(){
  bird.velocity.x += bird.acceleration.x;
  bird.velocity.y += bird.acceleration.y;
  bird.velocity.x = constrain(bird.velocity.x, bird.minVelocity.x, bird.maxVelocity.x);
  bird.velocity.y = constrain(bird.velocity.y, bird.minVelocity.y, bird.maxVelocity.y);


  bird.x += bird.velocity.x;
  bird.y += bird.velocity.y;

  }

/**
 * Make day turn to night
 */
function skyNight(){
  sky.r -= 1;
  sky.g -= 1;
  sky.b -= 1;
  sky.r = constrain(sky.r, sky.minColours.r, sky.maxColours.r);
  sky.g = constrain(sky.g, sky.minColours.g, sky.maxColours.g);
  sky.b = constrain(sky.b, sky.minColours.b, sky.maxColours.b);
}

/**
 * Controll mr furious colours
 */
function mrFuriousColours(){
  mrFurious.fill.g = mrFurious.fill.g - 1;
  mrFurious.fill.g = constrain(mrFurious.fill.g, mrFurious.minColours.g, mrFurious.maxColours.g);
  mrFurious.fill.b = mrFurious.fill.b - 1;
  mrFurious.fill.b = constrain(mrFurious.fill.b, mrFurious.minColours.b, mrFurious.maxColours.b);


}
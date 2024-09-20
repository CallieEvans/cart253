/**
 * Circle Master
 * Callie Evans
 *
 * This will be a program in which the user can move a circle
 * on the canvas using their own circle to "lead" it around.
 */

const puck = {
  x: 350,
  y: 350,
  size: 100,
  fill: "#ff0000"
};

const user = {
  x: undefined, // will be mouseX
  y: undefined, // will be mouseY
  size: 75,
  fill: "#000000"
};

/**
 * Create the canvas
 */
function setup() {
  createCanvas(400, 400);
}

/**
 * Move the user circle, check for overlap, draw the two circles
 */
function draw() {
  background("#aaaaaa");
  
  // Move user circle
  moveUser();
  
  // Draw the user and puck
  drawUser();
  drawPuck();
  moveTarget();
}

/**
 * Sets the user position to the mouse position
 */
function moveUser() {
  user.x = mouseX;
  user.y = mouseY;
}

/**
 * Displays the user circle
 */
function drawUser() {
  push();
  noStroke();
  fill(user.fill);
  ellipse(user.x, user.y, user.size);
  pop();
}

/**
 * Displays the puck circle
 */
function drawPuck() {
  push();
  noStroke();
  fill(puck.fill);
  ellipse(puck.x, puck.y, puck.size);
  pop();
}

/**
 * Sets the user position to the mouse position
 */
function moveTarget() {
    //Check if the user and target circles overlap
    const puckDistance = dist(user.x, user.y, puck.x, puck.y);
    const tagretIsOverlapping = (puckDistance < puck.size / 2);
    
    //If so, it should calculate the distance between the user and the target on x and y separately
    if (tagretIsOverlapping) {
        const distanceX = user.x - puck.x;
        const distanceY = user.y - puck.y;
        //Then it should move the target 1 pixel away from the user along the dimension the user is closest on. 
        //(e.g.if the user is closest to the puck on the x - axis, then the puck should move away from the user on the x - axis)
        if (distanceX > distanceY){ 
            puck.x -= 1;
        } else if(distanceX < distanceY) {
            puck.y -= 1;
         }
   
    }
    
    
}

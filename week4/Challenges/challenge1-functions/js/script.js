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

const target = {
  x: 150,
  y: 150,
  size: 100,
  fill: 'gray',
  fills: {
    static: 'gray',
    targeted: '#6et949'   
  }
};


/**
 * Create the canvas
 */
function setup() {
  createCanvas(400, 400);
  
  //removes the cursor visually
  noCursor();
}

/**
 * Move the user circle, check for overlap, draw the two circles
 */
function draw() {
  background("#aaaaaa");
  
  // Move user circle
  moveUser();
   //checks if puck and user overlaps and makes it move
  moveTarget();
  
  // Draw the user and puck and target
  drawTarget();
  drawUser();
  drawPuck();
  
  //checks if puck overlaps the target
  checkPuck();
}

/**
 * Sets the user position to the mouse position
 */
function moveUser() {
  
  // draw this indirectly so it doesn't just draw the circle at mousex but its location is = mousex
  user.x = mouseX;
  user.y = mouseY;
}

/**
 * Sets the user position to the mouse position
 */
function moveTarget() {
    //Check if the user and target circles overlap
  const puckDistance = dist(user.x, user.y, puck.x, puck.y);
  //check the furtherest apart they can be (the edges) : (puckDistance < puck.size/2); 
  //isn't the farthest to get the farthest its: puckDistance < user.size / 2 + puck.size/2
  const tagretIsOverlapping = (puckDistance < user.size / 2 + puck.size / 2);
    
    //If so, it should calculate the distance between the user and the target on x and y separately
  if (tagretIsOverlapping) {
    // Why are we using constances? 
    //Let means we could change the variables, const means we won't later try and change them & to let you know you shouldn't
    const distanceX = user.x - puck.x;
    const distanceY = user.y - puck.y;
    //Then it should move the target 1 pixel away from the user along the dimension the user is closest on. 
    //(e.g.if the user is closest to the puck on the x - axis, then the puck should move away from the user on the x - axis)
      
    //To fix the direction you are pushing the circle
        
    if (abs(distanceX) > abs(distanceY)) {
      //It is now closer on x
      if (distanceX < 0) {
        //check if x distance is negative
        puck.x += 5;
                
      } else if (distanceX > 0) {
        puck.x -= 5;
            
      }
   
      } else 
        if (distanceY < 0) {
          //check if x distance is negative
          puck.y += 5;
                  
        } else if (distanceY > 0) {
          puck.y -= 5;
              

      }
  }
    
    
}

/**
 * Displays the target
 */
function drawTarget() {
  push();
  noStroke();
  fill(target.fill);
  ellipse(target.x, target.y,target.size);
  pop();
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
 * Displays the target
 */
function checkPuck() {
    //Check if the puck and target circles overlap
    const targetDistance = dist(puck.x, puck.y, target.x, target.y);
    const puckIsOverlapping = (targetDistance < target.size / 2 + puck.size / 2);
    if (puckIsOverlapping) {
        target.fill = target.fills.targeted;
    } else {
        target.fill = target.fills.static;
    }
 
}
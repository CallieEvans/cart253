/**
 * Variation Jam
 * Callie Evans
 * 
 * This program contains a fly eye that cries tears. 
 * 
 */

"use strict";

const gravity = 1;

const player = {
    x: 25,
    y: 575,
    fill: 'yellow',
    width: 50,
    height: 50,
    jumpHeight: 20,
    velocity: {
        x: 4,
        y: 1
    }
};

const bullets = [];

const platforms = [{
    x: 200,
    y: 450,
    fill: 'red',
    width: 200,
    height: 50,
},
{
    x: 400,
    y: 250,
    fill: 'orange',
    width: 200,
    height: 50,
}
];


/**
 * Create the the Canvas 
*/
function setup() {
    createCanvas(800, 600);


}
/**
 * Function to create bullets
 */
function createBullets(x, y) {
    const newBullet = {
        x: x,
        y: y,
        size: 10,
        fill: '#545af7',
        stroke: '#2227a3',
        strokeWeight: 2,
        velocity: 8,
    };

    return newBullet;
}


/**
 * Draw 
*/
function draw() {
    background(0);

    for (let platform of platforms) {
        //Draw in the first platform
        drawPlatform(platform);
        //Check if player is touching the platform
        checkRectOverlap(platform);
    }

    //Draw the bullets
    for (let bullet of bullets) {
        //Draw bullets
        drawBullets(bullet);
    }

    //Draw in our square player
    drawPlayer();
    //Move the player 
    movePlayer();



}

/**
 * Draw the player sprite
 */
function drawPlayer() {
    push();
    fill(player.fill);
    noStroke();
    rectMode(CENTER);
    rect(player.x, player.y, player.width, player.height);
    pop();

}

/**
 * Create function to move player, left - right
 */
function movePlayer() {
    if (keyIsDown(LEFT_ARROW)) {
        player.x -= player.velocity.x;
    } else if (keyIsDown(RIGHT_ARROW)) {
        player.x += player.velocity.x;
    }
    if (keyIsDown(UP_ARROW)) {
        if (player.y >= height - player.height / 2) {
            player.velocity.y = -player.jumpHeight;

        }
    }

    player.x = constrain(player.x, 0 + player.width / 2, width - player.width / 2);

    //If player is not touching the ground add gravity
    //Had some help from: https://editor.p5js.org/tnishida/sketches/Wv_-BBBaA
    player.y += player.velocity.y;

    if (player.y <= height - player.height / 2) {
        player.velocity.y += gravity;

        // player.y += player.velocity.y;
        // player.y = constrain(player.y, 0, height - player.height);
    } else {
        player.velocity.y = 0;
        player.y = height - player.height / 2;
    }


}
/**
 * Draw the blue bullets for player
 */
function drawBullets(bullet) {

    bullet.x += bullet.velocity;
    push();
    stroke(bullet.stroke);
    strokeWeight(bullet.strokeWeight);
    fill(bullet.fill);
    ellipse(bullet.x, bullet.y, bullet.size);
    pop();
}
/**
 * Make the player shoot bullets
 */
function keyPressed() {
    if (keyCode === 32) {
        const newBullet = createBullets(player.x, player.y);;
        bullets.push(newBullet);
    }
}


/**
 * Draw the platform
 */
function drawPlatform(platform) {
    push();
    fill(platform.fill);
    noStroke();
    rectMode(CENTER);
    rect(platform.x, platform.y, platform.width, platform.height);
    pop();

}

/**
 * Calculate if the player or platform are touching and change players height accordingly
 */
function checkRectOverlap(platform) {
    let overlap = player.x + player.width / 2 >= platform.x - platform.width / 2 &&
        player.x - player.width / 2 <= platform.x + platform.width / 2 &&
        player.y + player.height / 2 >= platform.y - platform.height / 2 &&
        player.y - player.height / 2 <= platform.y + platform.height / 2;

    if (overlap) {
        player.velocity.y = 0;
        player.y = player.y;

        if (keyIsDown(UP_ARROW)) {
            player.velocity.y = -player.jumpHeight;

        }

        // if (player.y - player.height / 2 <= platform.y + platform.height / 2) {
        //     player.velocity.y += gravity;
        //     player.y = platform.y + (platform.width / 2 - player.width / 2);
        // }
        // else if (player.y + player.height / 2 > platform.y - platform.height / 2) {
        //     player.velocity.y = 0;
        //     player.y = player.y;
        // }
    }

    // had some help: https://editor.p5js.org/pippinbarr/sketches/u76WBa23o

}

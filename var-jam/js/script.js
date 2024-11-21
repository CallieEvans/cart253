/**
 * Variation Jam
 * Callie Evans
 * 
 * This program contains a fly eye that cries tears. 
 * 
 */

"use strict";
let state = 'baseVar';

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
    },
    bullet: {
        fill: '#545af7',
        stroke: '#2227a3',
        velocity: 8,
        damage: 50,
        offset: 100,
    }
};
const boss = {
    x: 0,
    y: 300,
    fill: 'red',
    width: 200,
    height: 300,
    velocity: 2,
    bubbleBlower: {
        width: 25,
        height: 50,
    },
    bulletTimer: 0,
    bulletCounter: 0,
    bullet: {
        fill: '#ff5d17',
        stroke: '#eb6734',
        velocity: -8,
        damage: 8,
    }
};

const bossBullets = [];

const bullets = [];

const healthBars = [
    {
        x: 620,
        y: 25,
        width: 150,
        height: 25,
        stroke: 'white',
        weight: 2,
        inner: {
            width: 150,
            height: 25,
            fill: '#ff5d17',
        }
    },
    {
        x: 30,
        y: 25,
        width: 150,
        height: 25,
        stroke: 'white',
        weight: 2,
        inner: {
            width: 150,
            height: 25,
            fill: 'blue',
        }
    }
];


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
function createBullets(x, y, fill, stroke, velocity, damage) {
    const newBullet = {
        x: x,
        y: y,
        size: 10,
        fill: fill,
        stroke: stroke,
        strokeWeight: 2,
        velocity: velocity,
        damage: damage,
    };

    return newBullet;
}


/**
 * Draw 
*/
function draw() {
    background(0);

    if (state === "baseVar") {
        baseVar();
    } else if (state === "varOne") {
        varOne();
    }

    console.log(state);

}
/**
 * Base game function and base variation
 */

function baseVar() {

    for (let platform of platforms) {
        //Draw in the first platform
        drawPlatform(platform);
        //Check if player is touching the platform
        checkRectOverlap(platform);
    }
    //draw health bars
    for (let healthBar of healthBars) {
        //Draw boss health bar
        drawHealthBar(healthBar);
    }


    //Draw the bullets
    for (let bulletNum = bullets.length - 1; bulletNum >= 0; bulletNum--) {
        //draw Bullets before overlap to stop issues
        drawBullets(bullets[bulletNum]);
        //calculate bullet overlap
        playerBulletOverlap(bullets[bulletNum], bulletNum);

    }
    //Checking array backwards so splices the length correctly
    for (let bulletNum = bossBullets.length - 1; bulletNum >= 0; bulletNum--) {
        //draw Bullets before overlap to stop issues
        drawBullets(bossBullets[bulletNum]);
        //calculate boss bullet overlap
        bossBulletOverlap(bossBullets[bulletNum], bulletNum);
    }

    moveBossBullets();

    //Draw in our square player
    drawPlayer();
    //Move the player 
    movePlayer();

    //Draw in the boss
    drawBoss();

    moveBoss();

    varOneSwitch();

}

/**
 * Game variation one
 */

function varOne() {
    baseVar();
    for (let bullet of bullets) {
        freeze(bullet);
    }
    for (let bossBullet of bossBullets) {
        freeze(bossBullet);
    }

}

function freeze(bullet) {
    push();
    textSize(20);
    textAlign(CENTER);
    fill('white');
    text('All is fair in love and war', width / 2, 50);
    pop();

    push();
    textSize(20);
    textAlign(CENTER);
    fill('white');
    text('There are no winners', width / 2, height - 40);
    pop();


    bullet.velocity = 0;
    boss.velocity = 0;
    bossBullets.velocity = 0;
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
 * Draw the boss sprite
 */
function drawBoss() {
    boss.x = width;

    push();
    fill(boss.fill);
    noStroke();
    ellipse(boss.x, boss.y, boss.width, boss.height);
    pop();

    push();
    fill('black');
    stroke(boss.fill);
    strokeWeight(5);
    ellipse(boss.x - 125, boss.y, boss.bubbleBlower.width, boss.bubbleBlower.height);
    pop();
}
/**
 * Draw the boss health bar
 */
function drawHealthBar(healthBar) {
    push();
    noFill();
    stroke(healthBar.stroke);
    strokeWeight(healthBar.weight);
    rect(healthBar.x, healthBar.y, healthBar.width, healthBar.height);
    pop();

    push();
    fill(healthBar.inner.fill);
    rect(healthBar.x, healthBar.y, healthBar.inner.width, healthBar.inner.height);
    pop();

}


/**
 * Move the boss
 */
function moveBoss() {
    boss.y += boss.velocity;

    if (boss.y > height - boss.height / 2) {
        boss.velocity = -boss.velocity;
    } else if (boss.y < 0 + boss.height / 2) {
        boss.velocity = -boss.velocity;
    }
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
 * Draw the red bullets for boss
 */
function moveBossBullets() {

    //Set delay for boss bullets
    let timeOut = random(30, 200);
    boss.bulletTimer = timeOut;

    if (boss.bulletCounter < boss.bulletTimer) {
        boss.bulletCounter++;
    } else {
        const newBullet = createBullets(boss.x, boss.y, boss.bullet.fill, boss.bullet.stroke, boss.bullet.velocity, boss.bullet.damage);
        bossBullets.push(newBullet);

        //Restart counter and timeout
        boss.bulletCounter = 0;
        boss.bulletTimer;
    }

}
/**
 * Make the player shoot bullets
 */
function keyPressed() {
    if (keyCode === 32) {
        const newBullet = createBullets(player.x + player.bullet.offset, player.y, player.bullet.fill, player.bullet.stroke, player.bullet.velocity, player.bullet.damage);
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
 * check player bullet overlap
 */

function playerBulletOverlap(bullet, bulletNum) {
    let overlaps = boss.x + boss.width / 2 >= bullet.x - bullet.size / 2 &&
        boss.x - boss.width / 2 <= bullet.x + bullet.size / 2 &&
        boss.y + boss.height / 2 >= bullet.y - bullet.size / 2 &&
        boss.y - boss.height / 2 <= bullet.y + bullet.size / 2;

    if (overlaps) {
        healthBars[0].inner.width -= bullet.damage;

        healthBars[0].inner.width = constrain(healthBars[0].inner.width, 0, 150);
        bullets.splice(bulletNum, 1);
    }
}

/**
 * check boss bullet overlap
 */


function bossBulletOverlap(bullet, bulletNum) {
    let overlap = player.x + player.width / 2 >= bullet.x - bullet.size / 2 &&
        player.x - player.width / 2 <= bullet.x + bullet.size / 2 &&
        player.y + player.height / 2 >= bullet.y - bullet.size / 2 &&
        player.y - player.height / 2 <= bullet.y + bullet.size / 2;

    if (overlap) {
        healthBars[1].inner.width -= bullet.damage;

        bossBullets.splice(bulletNum, 1);
    }

    healthBars[1].inner.width = constrain(healthBars[1].inner.width, 0, 150);
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
        // player.velocity.y = 0;
        // player.y = player.y;

        //check if player is in the top half of the platform and have him land
        if (player.y + player.height / 2 >= platform.y - platform.height / 2 && player.y + player.height / 2 <= platform.y) {
            player.y = platform.y - platform.height / 2 - player.height / 2;
            player.velocity.y = 0;
        }
        //check if player is in the bottom half of the platform and have him fall to the ground
        else if (player.y - player.height / 2 <= platform.y + platform.height / 2 && player.y + player.height / 2 >= platform.y) {
            player.y = platform.y + platform.height / 2 + player.height / 2 + 1;
            player.velocity.y += gravity;
            player.velocity.y = 0
        }

        if (keyIsDown(UP_ARROW) && (player.y + player.height / 2 >= platform.y - platform.height / 2 && player.y + player.height / 2 <= platform.y)) {
            player.velocity.y = -player.jumpHeight;

        }

    }

    // had some help: https://editor.p5js.org/pippinbarr/sketches/u76WBa23o

}

// function resetHealthBars() {
//     healthBars[0].inner.width = 150;

// }
function varOneSwitch() {

    if (healthBars[0].inner.width === 0 || healthBars[1].inner.width === 0) {
        state = 'varOne';
        // resetHealthBars();
    }
}
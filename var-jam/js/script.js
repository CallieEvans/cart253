/**
 * Variation Jam
 * Callie Evans
 * 
 * This program contains a fly eye that cries tears. 
 * 
 */

"use strict";
let state = 'baseGame';

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
        freezeDamage: 150,
        offset: 100,
    }
};


//Limbo player tracking variables
let onLastPlatform = false;
let playerOnPlatform2 = false;

const boss = {
    x: 0,
    y: 300,
    fill: 'red',
    width: 200,
    height: 300,
    velocity: 2,
    resetVelocity: 2,
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

const textBox = {
    x: 0,
    y: 0,
    width: 350,
    height: 100,
    fill: 'white',
    stroke: 'gray',
    strokeW: 2,
};
const godDialogue = ['Welcome to "Paradise"', 'please take a look around...', 'Did you really think ', 'the human condition was... bad?', 'I wonder who tampered', 'with the bullets?', 'Have you figured it out yet?', "I'll give you one more chance...", "Take back your diginity"];


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

    if (state === "baseGame") {
        baseGame();
    }
    else if (state === "varShoot") {
        varShoot();
    }
    else if (state === "varFreeze") {
        varFreeze();
    }
    else if (state === "limboText") {
        limboText();
    }
    else if (state === "varLimbo") {
        varLimbo();
    }

    console.log(state);

    console.log('on p2');
    console.log('on last p');
}
/**
 * Base game function and base variation
 */

function baseGame() {
    background(0);

    platfromPlayerCall();
    //Draw in the boss
    drawBoss();
    moveBoss();
    //Checking array backwards so splices the length correctly
    for (let bulletNum = bossBullets.length - 1; bulletNum >= 0; bulletNum--) {
        //draw Bullets before overlap to stop issues
        drawBullets(bossBullets[bulletNum]);
        //calculate boss bullet overlap
        bossBulletOverlap(bossBullets[bulletNum], bulletNum);
    }
    //draw health bars
    for (let healthBar of healthBars) {
        //Draw boss health bar
        drawHealthBar(healthBar);
    }
    moveBossBullets();

    //Draw the bullets
    for (let bulletNum = bullets.length - 1; bulletNum >= 0; bulletNum--) {
        //draw Bullets before overlap to stop issues
        drawBullets(bullets[bulletNum]);
        //calculate bullet overlap
        playerBulletOverlap(bullets[bulletNum], bulletNum);
    }

    varFreezeSwitch();

}


/**
 * player can't shoot
 */

function varShoot() {
    baseGame();
    platforms[0].x = random(platforms[0].x, 100, 150);
    platforms[1].x = random(platforms[1].x, 500, 520);

    boss.bullet.damage = 75;

    healthBars[0].inner.width = constrain(healthBars[0].inner.width, 150, 150);

    push();
    textSize(20);
    textAlign(CENTER);
    fill('yellow');
    text("I can't shoot", width / 2, 50);
    pop();

    push();
    textSize(20);
    textAlign(CENTER);
    fill('yellow');
    text('This this the end?', width / 2, height - 40);
    pop();


    resetHealthBars

    // if (state === 'varShoot') {
    //     if (healthBars[1].inner.width === 0) {
    //         state = 'limboText';
    //     }
    // }
}

/**
 * Game variation one
 */

function varFreeze() {
    baseGame();

    // platforms[0].fill = '#e1e8f7';
    // platforms[1].fill = '#e1e8f7';
    // boss.fill = '#e1e8f7';

    for (let bullet of bullets) {
        freeze(bullet);
    }
    for (let bossBullet of bossBullets) {
        freeze(bossBullet);
    }
    for (let bulletNum = bullets.length - 1; bulletNum >= 0; bulletNum--) {
        //calculate bullet overlap
        drawBullets(bullets[bulletNum]);
        playerBulletOverlapPlayer(bullets[bulletNum], bulletNum);

    }
    platforms[0].x = random(platforms[0].x, 180, 250);
    platforms[1].x = random(platforms[1].x, 450, 500);

}

function freeze(bullet) {
    push();
    textSize(20);
    textAlign(CENTER);
    fill('red');
    text('All is fair in love and war', width / 2, 50);
    pop();

    push();
    textSize(20);
    textAlign(CENTER);
    fill('red');
    text("I'll give you a chance...", width / 2, height - 40);
    pop();

    bullet.velocity = 0;
    boss.velocity = 0;
    bossBullets.velocity = 0;
}

function platfromPlayerCall() {
    for (let platform of platforms) {
        //Draw in the first platform
        drawPlatform(platform);
        //Check if player is touching the platform
        checkRectOverlap(platform);
    }

    //Draw in our square player
    drawPlayer();
    //Move the player 
    movePlayer();
}

/**
 * check player bullet for himself
 */

function playerBulletOverlapPlayer(bullet, bulletNum) {
    let overlaps = player.x + player.width / 2 >= bullet.x - bullet.size / 2 &&
        player.x - player.width / 2 <= bullet.x + bullet.size / 2 &&
        player.y + player.height / 2 >= bullet.y - bullet.size / 2 &&
        player.y - player.height / 2 <= bullet.y + bullet.size / 2;

    if (overlaps) {
        healthBars[1].inner.width -= player.bullet.freezeDamage;
        healthBars[1].inner.width = constrain(healthBars[1].inner.width, 0, 150);
        bullets.splice(bulletNum, 1);

    }


}


function limboText() {
    background(0);
    push();
    textSize(40);
    textAlign(CENTER);
    fill('red');
    text("You are now free of the virus: ", width / 2, height / 2);
    text("the human condition", width / 2, height / 2 + 50);
    pop();

    push();
    textSize(20);
    textAlign(CENTER);
    fill('white');
    text('Killed by your own bullet...', width / 2, 50);
    text('Will you ENTER paradise?', width / 2, height - 40);
    pop();

    if (keyIsPressed) {
        if (keyCode === 13) {
            state = 'varLimbo';
        }
    }
}


function varLimbo() {
    background('#e1e8f7');

    drawTextBox();
    platfromPlayerCall();
    player.fill = '#72dbb5';
    platforms[0].fill = '#b46eff';
    platforms[1].fill = '#e755fa';
    platforms[0].x = random(platforms[0].x, 550, 650);
    platforms[1].x = random(platforms[1].x, 250, 300);


    // Check player overlap
    let playerP1 = player.x + player.width / 2 >= platforms[0].x - platforms[0].width / 2 &&
        player.x - player.width / 2 <= platforms[0].x + platforms[0].width / 2 &&
        player.y + player.height / 2 >= platforms[0].y - platforms[0].height / 2 &&
        player.y - player.height / 2 <= platforms[0].y + platforms[0].height / 2;

    let playerP2 = player.x + player.width / 2 >= platforms[1].x - platforms[1].width / 2 &&
        player.x - player.width / 2 <= platforms[1].x + platforms[1].width / 2 &&
        player.y + player.height / 2 >= platforms[1].y - platforms[1].height / 2 &&
        player.y - player.height / 2 <= platforms[1].y + platforms[1].height / 2;


    // Had help from stack overflow to understand tracking
    //https://stackoverflow.com/questions/56508951/how-do-i-keep-track-of-players-turn-in-game


    // God Dialogue Messages
    if (playerP2) {
        playerOnPlatform2 = true;
        onLastPlatform = true;
        drawTextBox();
        push();
        textSize(20);
        textAlign(CENTER);
        fill('gray');
        text(`${godDialogue[2]}`, textBox.x, textBox.y - 10);
        text(`${godDialogue[3]}`, textBox.x, textBox.y + 20);
        pop();
    } else if (playerP1) {
        playerOnPlatform2 = false;
        onLastPlatform = false;
        drawTextBox();
        push();
        textSize(20);
        textAlign(CENTER);
        fill('gray');
        text(`${godDialogue[4]}`, textBox.x, textBox.y - 10);
        text(`${godDialogue[5]}`, textBox.x, textBox.y + 20);
        pop();
    } else if (onLastPlatform) {
        push();
        textSize(20);
        textAlign(CENTER);
        fill('gray');
        text(`${godDialogue[6]}`, textBox.x, textBox.y - 20);
        text(`${godDialogue[7]}`, textBox.x, textBox.y + 5);
        text(`${godDialogue[8]}`, textBox.x, textBox.y + 30);
        pop();

        push();
        fill('gray');
        noStroke();
        rectMode(CENTER);
        rect(width - 25, height - 25, 50, 150);
        pop();

    }
    else {
        playerOnPlatform2 = false;
        onLastPlatform = false;
        push();
        textSize(20);
        textAlign(CENTER);
        fill('gray');
        text(`${godDialogue[0]}`, textBox.x, textBox.y - 10);
        text(`${godDialogue[1]}`, textBox.x, textBox.y + 20);
        pop();
    }
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

function drawTextBox() {
    textBox.x = width / 2;
    textBox.y = 100;
    push();
    stroke(textBox.stroke);
    strokeWeight(textBox.strokeW);
    rectMode(CENTER);
    fill(textBox.fill);
    rect(textBox.x, textBox.y, textBox.width, textBox.height);
    pop();

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
    if (state != 'varShoot') {
        if (keyCode === 32) {
            const newBullet = createBullets(player.x + player.bullet.offset, player.y, player.bullet.fill, player.bullet.stroke, player.bullet.velocity, player.bullet.damage);
            bullets.push(newBullet);
        }
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

function resetHealthBars() {
    healthBars[1].inner.width = 150;
    healthBars[0].inner.width = 150;

}
function varFreezeSwitch() {
    if (state === 'baseGame' && (healthBars[0].inner.width === 0 || healthBars[1].inner.width === 0)) {
        state = 'varShoot';
        // resetHealthBars();
    }

    if (state === 'varShoot' && healthBars[1].inner.width <= 100) {
        state = 'varFreeze';
        // resetHealthBars();

    }

    if (state === 'varFreeze' && healthBars[1].inner.width === 0) {
        state = 'limboText';
        // resetHealthBars();
    }
}

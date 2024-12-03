/**
 * Variation Jam
 * Callie Evans
 * 
 * This program contains a fly eye that cries tears. 
 * 
 */

"use strict";
let state = 'title';

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
        sound: undefined,
    }
};


//Limbo player tracking variables
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
        resetWidth: 150,
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
        resetWidth: 150,
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
const god = {
    fill: '#a7dceb',
    stroke: '#005085',
    strokeW: 3,
    size: 50,
    eye: {
        fill: 0,
        width: 15,
        height: 30,
    }
}
const hellsGate = {
    x: 775,
    y: 575,
    fill: 'red',
    width: 50,
    height: 150,
}
const heavensGate = {
    x: 775,
    y: 575,
    fill: '#fcba03',
    width: 50,
    height: 150,
}

let limboSound = undefined;

let gameSound = undefined;
function preload() {
    soundFormats('mp3', 'wav');
    limboSound = loadSound('assets/sounds/limbo_sound.mp3');
    player.bullet.sound = loadSound('assets/sounds/player_shoot.wav');
    gameSound = loadSound('assets/sounds/game-sound.wav');
}


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
    if (state === 'title') {
        title();
    }
    else if (state === 'beginGame') {
        beginGame();
    }
    else if (state === "baseGame") {
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
    } else if (state === "varFinal") {
        varFinal();
    } else if (state === 'winTitle') {
        winTitle();
    }


}
/**
 * Set title state
 */
function title() {
    healthBars[1].inner.width = 150;
    background(0);
    push();
    textSize(50);
    textAlign(CENTER);
    fill('white');
    text("Use ENTER to enter:", width / 2, height / 2);
    pop();

    push();
    textSize(15);
    textAlign(CENTER);
    fill('white');
    text("and SPACE to shoot... ARROWS to move and jump", width / 2, height / 2 + 50);
    pop();

    if (keyIsPressed) {
        if (keyCode === 32) {
            state = 'beginGame';
            limboSound.play();
            limboSound.setVolume(.5);
        }
    }


}
/**
 * Set the Beginning Game State, before game play
 */
function beginGame() {

    for (let bulletNum = bullets.length - 1; bulletNum >= 0; bulletNum--) {
        //draw Bullets before overlap to stop issues
        drawBullets(bullets[bulletNum]);

    }
    background(0);
    platformPlayerCall();
    push();
    textSize(20);
    textAlign(CENTER);
    fill('yellow');
    text("What is this place?", width / 2, 50);
    text('where does this door go?', width / 2, height - 40);
    pop();

    push();
    fill(hellsGate.fill);
    noStroke();
    rectMode(CENTER);
    rect(hellsGate.x, hellsGate.y, hellsGate.width, hellsGate.height);
    pop();

    if (player.x + player.width / 2 >= hellsGate.x - hellsGate.width / 2 &&
        player.x - player.width / 2 <= hellsGate.x + hellsGate.width / 2 &&
        player.y + player.height / 2 >= hellsGate.y - hellsGate.height / 2 &&
        player.y - player.height / 2 <= hellsGate.y + hellsGate.height / 2 && state === 'beginGame') {
        state = 'baseGame';
        limboSound.stop();
        gameSound.setVolume(.2);
        gameSound.play();


    }

}

/**
 * Base game function and base variation
 */
function baseGame() {
    background(0);

    platformPlayerCall();

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


    varSwitch();

}
/**
 * Start first variation where the players shoots freeze, and become lethal
 */

function varFreeze() {
    baseGame();

    if (state === 'varFreeze') {
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
    }

    freezePlatShift();

}

/**
 * Start second variation where the player can't shoot
 */

function varShoot() {
    baseGame();

    //Randomly shift the platforms, when state start
    shootPlatShift();

    //Change the bosses bullet damage and constrain healthbar
    shootDamage();

    //Write head text
    push();
    textSize(20);
    textAlign(CENTER);
    fill('yellow');
    text("I can't shoot", width / 2, 50);
    text('This this the end?', width / 2, height - 40);
    pop();

}

/**
 * Title page for the third variation
 */

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

    //Switch states to limbo state
    if (keyIsPressed) {
        if (keyCode === 13) {
            state = 'varLimbo';
            limboSound.play();
            gameSound.stop();
        }

    }
}
/**
 * Start if the third variation, a limbo-like state where the player gets one more chance to defeat the boss, after being decieved
 */

function varLimbo() {
    //Redraw bullets so they delete themselvces
    for (let bulletNum = bullets.length - 1; bulletNum >= 0; bulletNum--) {
        //draw Bullets before overlap to stop issues
        drawBullets(bullets[bulletNum]);

    }
    background('#e1e8f7');
    limboVisualChanges();

    drawTextBox();

    platformPlayerCall();

    platformTextTriggers();

}
/**
 * Start 4th and final variation, same as the base game but the player has the upper hand and can kill the boss
 */
function varFinal() {

    background(0);

    push();
    textSize(20);
    textAlign(CENTER);
    fill('white');
    text("You're undefeatable", width / 2, 50);
    text('End Them...', width / 2, height - 40);
    pop();


    finalVisualChanges();

    platformPlayerCall();
    //Draw in the boss
    drawBoss();
    moveBoss();
    //Checking array backwards so splices the length correctly
    for (let bulletNum = bossBullets.length - 1; bulletNum >= 0; bulletNum--) {
        //draw Bullets before overlap to stop issues
        drawBullets(bossBullets[bulletNum]);
        //calculate boss bullet overlap
        bossBulletOverlapFinal(bossBullets[bulletNum], bulletNum);
    }

    //draw health bars
    for (let healthBar of healthBars) {
        //Draw boss health bar

        drawHealthBarFinal(healthBar);

    }

    moveBossBullets();

    //Draw the bullets
    for (let bulletNum = bullets.length - 1; bulletNum >= 0; bulletNum--) {
        //draw Bullets before overlap to stop issues
        drawBullets(bullets[bulletNum]);
        //calculate bullet overlap
        playerBulletOverlapFinal(bullets[bulletNum], bulletNum);
    }

    //reset boss movements and bullets damages
    finalResetBossMovementDamage();



    healthBars[1].inner.width = healthBars[1].resetWidth;
    healthBars[1].resetWidth = constrain(healthBars[1].resetWidth, 100, 150);

    varSwitch();
}

/**
 * Sets the title screen for if you win
 */
function winTitle() {
    background(0);

    platformPlayerCall();

    push();
    textSize(50);
    textAlign(CENTER);
    fill('white');
    text("You've regained your dignity", width / 2, 100);
    pop();

    push();
    textSize(15);
    textAlign(CENTER);
    fill('white');
    text("and won...", width / 2, 150);
    pop();


}
/**
 * Draw just the platforms and jsut the player
 */
function platformPlayerCall() {
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
        if (state != 'varFreeze') {
            player.bullet.sound.play();

        }

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
            if (state != 'title' && state != 'beginGame' && state != 'winTitle' && state != 'varLimbo' && state != 'limboText') {
                player.bullet.sound.play();
            }
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



// Variables for State one, player freeze

function freeze(bullet) {
    //Draw the head text
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

    //Freeze the players, and bosses bullets. A
    bullet.velocity = 0;
    bossBullets.velocity = 0;

    //Freeze the boss
    boss.velocity = 0;
}

/**
 * Randomly shift the platforms, when state start
 */
function freezePlatShift() {
    platforms[0].x = random(platforms[0].x, 180, 250);
    platforms[1].x = random(platforms[1].x, 450, 500);
}

/**
 * Check player bullet overlap for himself
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


// Variables for State two, player can't shoot

/**
 * Randomly shift the platforms, when state start
 */
function shootPlatShift() {
    platforms[0].x = random(platforms[0].x, 100, 150);
    platforms[1].x = random(platforms[1].x, 500, 520);
}


/**
 * Change the bosses bullet damage and constrain healthbar
 */
function shootDamage() {
    //Change bosses bullet damage to higher
    boss.bullet.damage = 75;
    //Constrain healthbar so boss cannot die from old bullets
    healthBars[0].inner.width = constrain(healthBars[0].inner.width, 150, 150);


}


// Variables for State three, the limbo state

function limboVisualChanges() {
    player.fill = '#72dbb5';
    platforms[0].fill = '#b46eff';
    platforms[1].fill = '#e755fa';

    //Do platform shift
    platforms[0].x = random(platforms[0].x, 550, 650);
    platforms[1].x = random(platforms[1].x, 250, 300);

}


function platformTextTriggers() {
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
        drawTextBox();
        push();
        textSize(20);
        textAlign(CENTER);
        fill('gray');
        text(`${godDialogue[4]}`, textBox.x, textBox.y - 10);
        text(`${godDialogue[5]}`, textBox.x, textBox.y + 20);
        pop();
    } else if (playerOnPlatform2) {
        push();
        textSize(20);
        textAlign(CENTER);
        fill('gray');
        text(`${godDialogue[6]}`, textBox.x, textBox.y - 20);
        text(`${godDialogue[7]}`, textBox.x, textBox.y + 5);
        text(`${godDialogue[8]}`, textBox.x, textBox.y + 30);
        pop();

        push();
        fill(heavensGate.fill);
        noStroke();
        rectMode(CENTER);
        rect(heavensGate.x, heavensGate.y, heavensGate.width, heavensGate.height);
        pop();

        playerDoorOverlapLimbo();

    }
    else {
        playerOnPlatform2 = false;
        push();
        textSize(20);
        textAlign(CENTER);
        fill('gray');
        text(`${godDialogue[0]}`, textBox.x, textBox.y - 10);
        text(`${godDialogue[1]}`, textBox.x, textBox.y + 20);
        pop();
    }



}


function playerDoorOverlapLimbo() {
    if (player.x + player.width / 2 >= heavensGate.x - heavensGate.width / 2 &&
        player.x - player.width / 2 <= heavensGate.x + heavensGate.width / 2 &&
        player.y + player.height / 2 >= heavensGate.y - heavensGate.height / 2 &&
        player.y - player.height / 2 <= heavensGate.y + heavensGate.height / 2 && state === 'varLimbo') {
        state = 'varFinal'
        limboSound.stop();
        gameSound.play();

    }

}




/**
 * Draw the limbo state textbox and God orb
 */
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

    //Draw the god orb
    push();
    fill(god.fill);
    stroke(god.stroke);
    strokeWeight(god.strokeW);
    ellipse(textBox.x + 175, textBox.y - 50, god.size);
    pop();

    push();
    fill(god.eye.fill);
    noStroke();
    ellipse(textBox.x + 175, textBox.y - 50, god.eye.width, god.eye.height);
    pop();

}

// Variables for final state, where the player can finally kill the boss

/**
 * Checking for player bullet overlap, with new healthbar width
 */


function finalVisualChanges() {
    player.fill = 'yellow';
    platforms[0].fill = 'orange';
    platforms[1].fill = 'red';

    //Small platform shift again
    platforms[0].x = random(platforms[0].x, 250, 300);
    platforms[1].x = random(platforms[1].x, 550, 650);

}



function playerBulletOverlapFinal(bullet, bulletNum) {
    let overlaps = boss.x + boss.width / 2 >= bullet.x - bullet.size / 2 &&
        boss.x - boss.width / 2 <= bullet.x + bullet.size / 2 &&
        boss.y + boss.height / 2 >= bullet.y - bullet.size / 2 &&
        boss.y - boss.height / 2 <= bullet.y + bullet.size / 2;

    if (overlaps) {
        healthBars[0].resetWidth -= bullet.damage;

        healthBars[0].resetWidth = constrain(healthBars[0].resetWidth, 0, 150);
        bullets.splice(bulletNum, 1);
    }
}

/**
 * Checking for boss bullet overlap, with new healthbar width
 */

function bossBulletOverlapFinal(bullet, bulletNum) {
    let overlap = player.x + player.width / 2 >= bullet.x - bullet.size / 2 &&
        player.x - player.width / 2 <= bullet.x + bullet.size / 2 &&
        player.y + player.height / 2 >= bullet.y - bullet.size / 2 &&
        player.y - player.height / 2 <= bullet.y + bullet.size / 2;

    if (overlap) {
        healthBars[1].resetWidth -= bullet.damage;

        bossBullets.splice(bulletNum, 1);
    }

    healthBars[1].resetWidth = constrain(healthBars[1].resetWidth, 0, 150);
}


/**
 * Redraw healthbar with updated/reset width
 */
function drawHealthBarFinal(healthBar) {
    push();
    noFill();
    stroke(healthBar.stroke);
    strokeWeight(healthBar.weight);
    rect(healthBar.x, healthBar.y, healthBar.width, healthBar.height);
    pop();

    push();
    fill(healthBar.inner.fill);
    rect(healthBar.x, healthBar.y, healthBar.resetWidth, healthBar.inner.height);
    pop();

}


function finalResetBossMovementDamage() {
    //reset boss movements
    boss.y += boss.resetVelocity;

    if (boss.y > height - boss.height / 2) {
        boss.resetVelocity = -boss.resetVelocity;
    } else if (boss.y < 0 + boss.height / 2) {
        boss.resetVelocity = -boss.resetVelocity;
    }
    boss.bullet.damage = 8;
    player.bullet.damage = 20;

}

/**
 * Game Switchers, switches between states based on healthbar level
 */

function varSwitch() {
    if (state === 'baseGame' && healthBars[0].inner.width === 0) {
        state = 'varShoot';
        // resetHealthBars();
    } else if (state === 'baseGame' && healthBars[1].inner.width === 0) {
        state = 'title';
    } else if (state === 'varShoot' && healthBars[1].inner.width <= 100) {
        state = 'varFreeze';
        // resetHealthBars();

    } else if (state === 'varFreeze' && healthBars[1].inner.width === 0) {
        state = 'limboText';
        gameSound.setVolume(.08);

        //Get rid of old bullets including the frozen ones
        bossBullets.splice(0, bossBullets.length);
        bullets.splice(0, bullets.length);
        // resetHealthBars();
    }
    else if (state === 'varFinal' && healthBars[0].resetWidth === 0) {
        state = 'winTitle';
        gameSound.setVolume(.03);
    }
    else if (state === 'varFinal' && healthBars[1].inner.width === 0) {
        state = 'title';

    }
}


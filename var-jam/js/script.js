/**
 * Limbo Looped
 * Callie Evans
 * 
 * This program contains three main characters, the player, the boss and an eye orb, God.
 * In this game the player finds themselves in a simple rendered game where they can jump on platforms. 
 * When they go through the door they start the game where they have to shoot and try to kill the boss, if they die in this stage they reset at the title screen.
 * Once the boss is almost dead, he can rapidly regenerate and stop the player from shooting. 
 * At this stage is the boss hits you once it throw the player into a frozen state where they can only move. Their bullets, the boss and his bullets stay frozen in the air
 * The catch? If you hit your frozen bullet, you get sent to limbo.
 * Limbo a calm state where God lives, in this state there is a series of dialogue that has to be unlocked before you can move on.
 * Once you've unlocked it all, the door will appear again and you can finally defeat the boss. 
 * In this last stage you cannot die and the only way on is to kill the boss.
 * When this happens you end up in a state with just platforms, no door. Your only option is to stay in this state forever or to restart the game and start the loop all over again.
 * There is no way out. 
 * 
 */

"use strict";

//Set the starting state to title
let state = 'title';

//Set the gravity levels to 1
const gravity = 1;

//Set the player variable to undefined, will be called in preload with JSON
let player = undefined;

//Set the player variable to undefined, will be called in preload with JSON
let boss = undefined;

//Create an empty array to store the bosses bullets
const bossBullets = [];

//Create an empty array to store the players bullets
const bullets = [];

//Stores the healthbars for the player and the boss in an array
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

//Stores the platforms in an array
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

//Limbo player tracking variables
let playerOnPlatform2 = false;

//Set the textbos variable to undefined, will be called in preload with JSON
let textBox = undefined;

//Set the god variable to undefined, will be called in preload with JSON
let god = undefined;

//Set thegoddialogue content into an array for easy accesss
const godDialogue = ['Welcome to "Paradise"', 'please take a look around...', 'Did you really think ', 'the human condition was... bad?', 'I wonder who tampered', 'with the bullets?', 'Have you figured it out yet?', "I'll give you one more chance...", "Take back your diginity"];

//Set the first door variable aka hellsgate to undefined, will be called in preload with JSON
let hellsGate = undefined;

//Set the second door variable aka heavensgate to undefined, will be called in preload with JSON
let heavensGate = undefined;

//Set the calm sound viarable to undefined, will be filled later in preload
let limboSound = undefined;

//Set the game sound viarable to undefined, will be filled later in preload
let gameSound = undefined;

/**
 * Loads content before game load
*/
function preload() {
    //Grab JSON object player, from file
    player = loadJSON('data/player.json');
    //Grab JSON object boss, from file
    boss = loadJSON('data/boss.json');
    //Grab JSON god, from file
    god = loadJSON('data/god.json');
    //Grab JSON heavensgate, from file
    heavensGate = loadJSON('data/heavensgate.json');
    //Grab JSON object hellsgate, from file
    hellsGate = loadJSON('data/hellsgate.json');
    //Grab JSON object textbox, from file
    textBox = loadJSON('data/textbox.json');

    //Define sound formats
    soundFormats('mp3', 'wav');
    //Set calm sound to the limboSound variable
    limboSound = loadSound('assets/sounds/limbo_sound.mp3');
    //Set game sound to the gameSound variable
    gameSound = loadSound('assets/sounds/game-sound.wav');
}


/**
 * Create the the Canvas 
*/
function setup() {
    //Create a wide rectangle canva
    createCanvas(800, 600);

    //Loads the players bullets sounds 
    //loading here, as it was causing errors with JSON
    player.bullet.sound = loadSound('assets/sounds/player_shoot.wav');


}
/**
 * Function to create bullets, both player and boss
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
 * Draw the different states
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
    //Reset the players health bar, if he lands at this state
    healthBars[1].inner.width = 150;
    //Set a black background colour
    background(0);
    //Draw the starting text
    push();
    textSize(50);
    textAlign(CENTER);
    fill('white');
    text("Use ENTER to enter:", width / 2, height / 2);
    pop();
    //Draw the instructions
    push();
    textSize(15);
    textAlign(CENTER);
    fill('white');
    text("and SPACE to shoot... ARROWS to move and jump", width / 2, height / 2 + 50);
    pop();

    //If ENTER is pressed, start sound, set the volumn and go to first state
    if (keyIsPressed) {
        if (keyCode === 13) {
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
    //Draw the bullets before you go through the door
    for (let bulletNum = bullets.length - 1; bulletNum >= 0; bulletNum--) {
        //This is so if you press the space bar in this state the bullets won't stay on screen in the next state
        drawBullets(bullets[bulletNum]);

    }
    //Make background black
    background(0);
    //Draw the players dialogue
    push();
    textSize(20);
    textAlign(CENTER);
    fill('yellow');
    text("What is this place?", width / 2, 50);
    text('where does this door go?', width / 2, height - 40);
    pop();

    //Draw both the player and the platform, also makes player move
    platformPlayerCall();

    //Draws the hells gate door
    drawHellsGate();
    //Calculates the player, door overlap
    hellsGateOverlap();

}

/**
 * Base game function and base variation
 */
function baseGame() {
    //make the bakcground colour black
    background(0);
    //Draw the platforms and the player, also makes player move
    platformPlayerCall();

    //Draw in the boss
    drawBoss();
    //Moves the boss verricall
    moveBoss();
    //Draws the bosses bullets
    //Checking array backwards so splices the length correctly, when player overlaps the bullets
    for (let bulletNum = bossBullets.length - 1; bulletNum >= 0; bulletNum--) {
        //Draw Bullets the bosses bullets
        drawBullets(bossBullets[bulletNum]);
        //calculate boss bullet overlap with player
        bossBulletOverlap(bossBullets[bulletNum], bulletNum);
    }
    //draw health bars
    for (let healthBar of healthBars) {
        //Draw boss health bar
        drawHealthBar(healthBar);
    }
    //Moves the bosses bullets, and randomly shoots
    moveBossBullets();

    //Draw the players bullets, again check array backwards for splicinh
    for (let bulletNum = bullets.length - 1; bulletNum >= 0; bulletNum--) {
        //Draw player bullets
        drawBullets(bullets[bulletNum]);
        //calculate bullet overlap with the boss
        playerBulletOverlap(bullets[bulletNum], bulletNum);
    }

    //Function that switches states depending on healthbar, health
    varSwitch();

}
/**
 * Start first variation where the players shoots freeze, and become lethal
 */

function varFreeze() {
    //Recall the base game state
    baseGame();

    //Check through all players bullets and freeze them by stopping velocity
    for (let bullet of bullets) {
        freeze(bullet);
    }
    //Check through all bosses bullets and freeze them, by stopping velocity
    for (let bossBullet of bossBullets) {
        freeze(bossBullet);
    }
    //Check through players bullets again and this time call function that kills player on impact with his own bullets
    for (let bulletNum = bullets.length - 1; bulletNum >= 0; bulletNum--) {
        //redraw the players bullets
        drawBullets(bullets[bulletNum]);
        //Calculate players bullets overlap with himself
        playerBulletOverlapPlayer(bullets[bulletNum], bulletNum);
    }
    //Shift the platforms in this state
    freezePlatShift();

}

/**
 * Start second variation where the player can't shoot
 */
function varShoot() {
    //Recall the base game state
    baseGame();

    //Randomly shift the platforms, when state start
    shootPlatShift();

    //Change the bosses bullet damage and constrain healthbar
    shootDamage();

    //Write players distressed dialogue
    push();
    textSize(20);
    textAlign(CENTER);
    fill('yellow');
    text("I can't shoot", width / 2, 50);
    text('This this the end?', width / 2, height - 40);
    pop();

}

/**
 * Title page for the third variation, limbo state
 */

function limboText() {
    //Make the background black
    background(0);
    //Draw the bosses dialogue
    push();
    textSize(40);
    textAlign(CENTER);
    fill('red');
    text("You are now free of the virus: ", width / 2, height / 2);
    text("the human condition", width / 2, height / 2 + 50);
    pop();
    //Draw instructions and hint text
    push();
    textSize(20);
    textAlign(CENTER);
    fill('white');
    text('Killed by your own bullet...', width / 2, 50);
    text('Will you ENTER paradise?', width / 2, height - 40);
    pop();

    //Switch states to limbo state when enter or return key is pressed
    if (keyIsPressed) {
        if (keyCode === 13) {
            state = 'varLimbo';
            //Play limbo sound
            limboSound.play();
            //Stop Game sound
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
        //Redraw bullets again
        drawBullets(bullets[bulletNum]);

    }
    //Make bakcground a pastel blue
    background('#e1e8f7');
    //Change the platform and player colours
    limboVisualChanges();
    //Draw the textboxes and dialogue
    drawTextBox();
    //Draw the platforms and the player
    platformPlayerCall();
    //Caluclate the player platform overlap and then display proper message
    //Also allows door to be shown
    platformTextTriggers();
}

/**
 * Start 4th and final variation, same as the base game but the player has the upper hand and can kill the boss
 */
function varFinal() {
    //Make the background black
    background(0);
    //Show god text, telling player he cannot die
    push();
    textSize(20);
    textAlign(CENTER);
    fill('white');
    text("You're undefeatable", width / 2, 50);
    text('End Them...', width / 2, height - 40);
    pop();
    //Revert back to normal colours for player and platform
    finalVisualChanges();
    //Draw only the platform and player, also maybes him move
    platformPlayerCall();
    //Draw in the boss
    drawBoss();
    //Moves the boss
    moveBoss();


    //Draws the bosses bullets
    //Checking array backwards so splices the length correctly, when player overlaps the bullets
    for (let bulletNum = bossBullets.length - 1; bulletNum >= 0; bulletNum--) {
        //draw Bullets before overlap to stop issues
        drawBullets(bossBullets[bulletNum]);
        //Calculate boss bullet overlap, reset from the frozen state
        bossBulletOverlapFinal(bossBullets[bulletNum], bulletNum);
    }

    //draw health bars
    for (let healthBar of healthBars) {
        //Draw boss health bar, but with reset widths
        drawHealthBarFinal(healthBar);
    }
    //Reset the boss bullets movements
    moveBossBullets();
    //Draw the players bullets again
    for (let bulletNum = bullets.length - 1; bulletNum >= 0; bulletNum--) {
        //Draw the players bullets
        drawBullets(bullets[bulletNum]);
        //Calculate bullet overlap but witht he boss again
        playerBulletOverlapFinal(bullets[bulletNum], bulletNum);
    }
    //reset boss movements and bullets damages
    finalResetBossMovementDamage();
    //Reset the healthbar width
    healthBars[1].inner.width = healthBars[1].resetWidth;
    //Constrian players healthbar so his health cannot go past a certain point
    healthBars[1].resetWidth = constrain(healthBars[1].resetWidth, 100, 150);
    //Call the switch statement, switches depending on the healthbars, health
    varSwitch();
}

/**
 * Sets the title screen for if you kill the boss
 */
function winTitle() {
    //Make the background black
    background(0);
    //Draws the last of the Gods dialoge
    push();
    textSize(50);
    textAlign(CENTER);
    fill('white');
    text("You've regained your dignity", width / 2, 100);
    pop();
    push();
    textSize(20);
    textAlign(CENTER);
    fill('white');
    text("and won...", width / 2, 150);
    pop();
    //Draw instruction text
    push();
    textSize(20);
    textAlign(CENTER);
    fill('white');
    text('Do you want to start again? Then... ENTER', width / 2, height - 40);
    pop();
    //Draws the player and the platforms, also makes player move
    platformPlayerCall();

    varSwitch();

}
/**
 * Draw just the platforms and justt the player, also make the player move
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
    //Set boss with to canvas width
    boss.x = width;
    //Draw the bosses body
    push();
    fill(boss.fill);
    noStroke();
    ellipse(boss.x, boss.y, boss.width, boss.height);
    pop();
    //Draw the boss gun
    push();
    fill('black');
    stroke(boss.fill);
    strokeWeight(5);
    ellipse(boss.x - 125, boss.y, boss.bubbleBlower.width, boss.bubbleBlower.height);
    pop();
}

/**
 * Draw the both healthbars
 */
function drawHealthBar(healthBar) {
    push();
    noFill();
    stroke(healthBar.stroke);
    strokeWeight(healthBar.weight);
    rect(healthBar.x, healthBar.y, healthBar.width, healthBar.height);
    pop();
    //Draw the inner healthbar, the part than changes
    push();
    fill(healthBar.inner.fill);
    rect(healthBar.x, healthBar.y, healthBar.inner.width, healthBar.inner.height);
    pop();

}


/**
 * Move the boss vertically
 */
function moveBoss() {
    //Add the bosses velocity to his y
    boss.y += boss.velocity;
    if (boss.y > height - boss.height / 2) {
        //If the boss reachigns the height reverse the velocity
        boss.velocity = -boss.velocity;
    } else if (boss.y < 0 + boss.height / 2) {
        //If the boss reaches the top, reverse the velocity
        boss.velocity = -boss.velocity;
    }
}

/**
 * Create function to move player, left - right
 */
function movePlayer() {
    if (keyIsDown(LEFT_ARROW)) {
        // If left arrow key is down, move player left
        player.x -= player.velocity.x;
    } else if (keyIsDown(RIGHT_ARROW)) {
        // If right arrow key is down, move player right
        player.x += player.velocity.x;
    }
    if (keyIsDown(UP_ARROW)) {
        // If up arrow is down, make player jump
        if (player.y >= height - player.height / 2) {
            player.velocity.y = -player.jumpHeight;
        }
    }
    //Constrain player so he can't go outside of the canvas
    player.x = constrain(player.x, 0 + player.width / 2, width - player.width / 2);
    //Add players velocity to his y
    player.y += player.velocity.y;
    //If player is not touching the ground add gravity
    //Had some help, see README
    if (player.y <= height - player.height / 2) {
        player.velocity.y += gravity;
    } else {
        //If he os on the ground, make him stay and set velocity to 0
        player.velocity.y = 0;
        player.y = height - player.height / 2;
    }
}

/**
 * Draw the both the bullets
 */
function drawBullets(bullet) {
    //Add the bullets velocity to its x to move horizontally
    bullet.x += bullet.velocity;
    //Draw the bullet
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
    //Check if the timeout is not up
    if (boss.bulletCounter < boss.bulletTimer) {
        boss.bulletCounter++;
    } else {
        //if it is create a new boss bullet and shoot it
        const newBullet = createBullets(boss.x, boss.y, boss.bullet.fill, boss.bullet.stroke, boss.bullet.velocity, boss.bullet.damage);
        bossBullets.push(newBullet);
        //Check if we are not in the frozen state
        if (state != 'varFreeze') {
            //If you aren't play the players sounds for his bullets
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
        //Check if the space bar is pressed
        if (keyCode === 32) {
            //check if we aren't in the following states
            if (state != 'title' && state != 'beginGame' && state != 'winTitle' && state != 'varLimbo' && state != 'limboText') {
                //if trye play the players bullet sound
                player.bullet.sound.play();
            }
            //If just the space bar is pressed, create new player bullets and to the array
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
 * Check player bullet overlap, when player bullets hit the boss
 */

function playerBulletOverlap(bullet, bulletNum) {
    //check rectangle overlap
    let overlaps = boss.x + boss.width / 2 >= bullet.x - bullet.size / 2 &&
        boss.x - boss.width / 2 <= bullet.x + bullet.size / 2 &&
        boss.y + boss.height / 2 >= bullet.y - bullet.size / 2 &&
        boss.y - boss.height / 2 <= bullet.y + bullet.size / 2;

    if (overlaps) {
        //Subtract bullet damage from the bosses healtbar
        healthBars[0].inner.width -= bullet.damage;
        //Constrain the healthbar so it doesn't go in the negatives
        healthBars[0].inner.width = constrain(healthBars[0].inner.width, 0, 150);
        //Delete that bullet from array
        bullets.splice(bulletNum, 1);
    }
}

/**
 * check boss bullet overlap with player
 */
function bossBulletOverlap(bullet, bulletNum) {
    //check rectangle overlap
    let overlap = player.x + player.width / 2 >= bullet.x - bullet.size / 2 &&
        player.x - player.width / 2 <= bullet.x + bullet.size / 2 &&
        player.y + player.height / 2 >= bullet.y - bullet.size / 2 &&
        player.y - player.height / 2 <= bullet.y + bullet.size / 2;

    if (overlap) {
        //Subtract bullet damage from the players healtbar
        healthBars[1].inner.width -= bullet.damage;
        //Constrain the healthbar so it doesn't go in the negatives
        healthBars[1].inner.width = constrain(healthBars[1].inner.width, 0, 150);
        //Delete that bullet from array
        bossBullets.splice(bulletNum, 1);
    }
}
/**
 * Draw the first door, hellsgate
 */
function drawHellsGate() {
    push();
    fill(hellsGate.fill);
    noStroke();
    rectMode(CENTER);
    rect(hellsGate.x, hellsGate.y, hellsGate.width, hellsGate.height);
    pop();

}
/**
 * Draw the players overlap with the first door
 */
function hellsGateOverlap() {
    //Check if player overlaps with hellsgate door
    if (player.x + player.width / 2 >= hellsGate.x - hellsGate.width / 2 &&
        player.x - player.width / 2 <= hellsGate.x + hellsGate.width / 2 &&
        player.y + player.height / 2 >= hellsGate.y - hellsGate.height / 2 &&
        player.y - player.height / 2 <= hellsGate.y + hellsGate.height / 2 && state === 'beginGame') {
        //If player overlaps the door, start the game 
        state = 'baseGame';
        //PLay the correct sound, if overlap
        limboSound.stop();
        gameSound.setVolume(.2);
        gameSound.play();
    }
}

/**
 * Calculate if the player or platform are touching and change players height accordingly
 */
function checkRectOverlap(platform) {
    //Check if player overlaps with the platforms
    let overlap = player.x + player.width / 2 >= platform.x - platform.width / 2 &&
        player.x - player.width / 2 <= platform.x + platform.width / 2 &&
        player.y + player.height / 2 >= platform.y - platform.height / 2 &&
        player.y - player.height / 2 <= platform.y + platform.height / 2;

    if (overlap) {
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
        //Reset the jumping function if the overlap is happening, so he can jump again
        if (keyIsDown(UP_ARROW) && (player.y + player.height / 2 >= platform.y - platform.height / 2 && player.y + player.height / 2 <= platform.y)) {
            player.velocity.y = -player.jumpHeight;
        }

    }

    // had some help, see README

}



// Variables for State one, player freeze

/**
 * Draw the text for the frozen state and freeze boss, boss bullets and player bullets
 */
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
 * Randomly shift the platforms, when frozen state start
 */
function freezePlatShift() {
    platforms[0].x = random(platforms[0].x, 180, 250);
    platforms[1].x = random(platforms[1].x, 450, 500);
}

/**
 * Check player bullet overlap for himself
 */
function playerBulletOverlapPlayer(bullet, bulletNum) {
    //check bullet player overlpa
    let overlaps = player.x + player.width / 2 >= bullet.x - bullet.size / 2 &&
        player.x - player.width / 2 <= bullet.x + bullet.size / 2 &&
        player.y + player.height / 2 >= bullet.y - bullet.size / 2 &&
        player.y - player.height / 2 <= bullet.y + bullet.size / 2;

    if (overlaps) {
        //If the overlap happens, take off the bullet damage from players healthbar
        healthBars[1].inner.width -= player.bullet.freezeDamage;
        healthBars[1].inner.width = constrain(healthBars[1].inner.width, 0, 150);
        //Remove the bullet from array
        bullets.splice(bulletNum, 1);
    }

}

// Variables for State two, player can't shoot

/**
 * Randomly shift the platforms, when shoot state start
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

/**
 * Draw the Limbo colour changes from player and platforms
 */
function limboVisualChanges() {
    //Mak eplayer a light yellow
    player.fill = '#72dbb5';
    //Make platforms pastel pinks and purples
    platforms[0].fill = '#b46eff';
    platforms[1].fill = '#e755fa';

    //Do platform shift
    platforms[0].x = random(platforms[0].x, 550, 650);
    platforms[1].x = random(platforms[1].x, 250, 300);

}

/**
 * Calculate the player platform overlaps and displays the proper god dialogue
 */
function platformTextTriggers() {
    // Check player overlap for platform 1
    let playerP1 = player.x + player.width / 2 >= platforms[0].x - platforms[0].width / 2 &&
        player.x - player.width / 2 <= platforms[0].x + platforms[0].width / 2 &&
        player.y + player.height / 2 >= platforms[0].y - platforms[0].height / 2 &&
        player.y - player.height / 2 <= platforms[0].y + platforms[0].height / 2;
    // Check player overlap for platform 2
    let playerP2 = player.x + player.width / 2 >= platforms[1].x - platforms[1].width / 2 &&
        player.x - player.width / 2 <= platforms[1].x + platforms[1].width / 2 &&
        player.y + player.height / 2 >= platforms[1].y - platforms[1].height / 2 &&
        player.y - player.height / 2 <= platforms[1].y + platforms[1].height / 2;


    // Had help from stack overflow to understand player tracking, see README

    // God Dialogue Messages
    if (playerP2) {
        //Set variable to true is on the seocnd platform
        playerOnPlatform2 = true;
        //Displays text box with third dialogue
        drawTextBox();
        push();
        textSize(20);
        textAlign(CENTER);
        fill('gray');
        text(`${godDialogue[4]}`, textBox.x, textBox.y - 10);
        text(`${godDialogue[5]}`, textBox.x, textBox.y + 20);
        pop();
    } else if (playerP1) {
        //Sets variable to false if not on second platform
        playerOnPlatform2 = false;
        //Displays text box with second dialogue
        drawTextBox();
        push();
        textSize(20);
        textAlign(CENTER);
        fill('gray');
        text(`${godDialogue[2]}`, textBox.x, textBox.y - 10);
        text(`${godDialogue[3]}`, textBox.x, textBox.y + 20);
        pop();
    } else if (playerOnPlatform2) {
        //If player was on playerform two display the last text
        push();
        textSize(20);
        textAlign(CENTER);
        fill('gray');
        text(`${godDialogue[6]}`, textBox.x, textBox.y - 20);
        text(`${godDialogue[7]}`, textBox.x, textBox.y + 5);
        text(`${godDialogue[8]}`, textBox.x, textBox.y + 30);
        pop();
        //If player was on platform two draw the door
        push();
        fill(heavensGate.fill);
        noStroke();
        rectMode(CENTER);
        rect(heavensGate.x, heavensGate.y, heavensGate.width, heavensGate.height);
        pop();
        //Calculate the player, heavensgate door overlap
        playerDoorOverlapLimbo();

    }
    else {
        //Sets variable to false if not on second platform
        playerOnPlatform2 = false;
        //Displays default text
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
 * Calculates if the player and heavensgate door touch, if they do, switch states and play the right sound
 */
function playerDoorOverlapLimbo() {
    if (player.x + player.width / 2 >= heavensGate.x - heavensGate.width / 2 &&
        player.x - player.width / 2 <= heavensGate.x + heavensGate.width / 2 &&
        player.y + player.height / 2 >= heavensGate.y - heavensGate.height / 2 &&
        player.y - player.height / 2 <= heavensGate.y + heavensGate.height / 2 && state === 'varLimbo') {
        //Switch to final state
        state = 'varFinal'
        //Play game sound
        limboSound.stop();
        gameSound.play();

    }

}


/**
 * Draw the limbo state textbox and God orb
 */
function drawTextBox() {
    //Center textbox
    textBox.x = width / 2;
    textBox.y = 100;
    //Draw the textbox
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
    //Draw gods eye
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
    //Reset player and platform colours to vibrant ones
    player.fill = 'yellow';
    platforms[0].fill = 'orange';
    platforms[1].fill = 'red';

    //Small platform shift again
    platforms[0].x = random(platforms[0].x, 250, 300);
    platforms[1].x = random(platforms[1].x, 550, 650);

}

/**
 * Recheck the player bullets overlap with the boss with the new healthbar widths
 */
function playerBulletOverlapFinal(bullet, bulletNum) {
    //Check boss / bullet overlap
    let overlaps = boss.x + boss.width / 2 >= bullet.x - bullet.size / 2 &&
        boss.x - boss.width / 2 <= bullet.x + bullet.size / 2 &&
        boss.y + boss.height / 2 >= bullet.y - bullet.size / 2 &&
        boss.y - boss.height / 2 <= bullet.y + bullet.size / 2;

    if (overlaps) {
        //Subtract bullet damage from new healthbar width
        healthBars[0].resetWidth -= bullet.damage;
        healthBars[0].resetWidth = constrain(healthBars[0].resetWidth, 0, 150);
        bullets.splice(bulletNum, 1);
    }
}

/**
 * Checking for boss bullet overlap with player with new healthbar width
 */

function bossBulletOverlapFinal(bullet, bulletNum) {
    //Check player / bullet overlap
    let overlap = player.x + player.width / 2 >= bullet.x - bullet.size / 2 &&
        player.x - player.width / 2 <= bullet.x + bullet.size / 2 &&
        player.y + player.height / 2 >= bullet.y - bullet.size / 2 &&
        player.y - player.height / 2 <= bullet.y + bullet.size / 2;

    if (overlap) {
        //Subtract bullet damage from new healthbar width
        healthBars[1].resetWidth -= bullet.damage;
        healthBars[1].resetWidth = constrain(healthBars[1].resetWidth, 0, 150);
        bossBullets.splice(bulletNum, 1);
    }
}

/**
 * Redraw healthbar with updated/reset width
 */
function drawHealthBarFinal(healthBar) {
    //Draw the new healthbars with updated widths
    push();
    noFill();
    stroke(healthBar.stroke);
    strokeWeight(healthBar.weight);
    rect(healthBar.x, healthBar.y, healthBar.width, healthBar.height);
    pop();
    //Draw the new healthbars inners with updated widths
    push();
    fill(healthBar.inner.fill);
    rect(healthBar.x, healthBar.y, healthBar.resetWidth, healthBar.inner.height);
    pop();

}

/**
 * Reset the bosses movement after the frozen state
 */
function finalResetBossMovementDamage() {
    //reset boss movements
    boss.y += boss.resetVelocity;
    //Reset the check for if boss is in the height of the canvas
    if (boss.y > height - boss.height / 2) {
        boss.resetVelocity = -boss.resetVelocity;
    } else if (boss.y < 0 + boss.height / 2) {
        boss.resetVelocity = -boss.resetVelocity;
    }
    //Reset the bosses bullets damage
    boss.bullet.damage = 8;
    //Reset the players bullets damage
    player.bullet.damage = 4;
}

/**
 * Game Switchers, switches between states based on healthbar level
 */
function varSwitch() {
    if (state === 'baseGame' && healthBars[0].inner.width <= 20) {
        //If boss is also dead and were in the base game state, switch states
        state = 'varShoot';
    } else if (state === 'baseGame' && healthBars[1].inner.width === 0) {
        //If player is dead and in basegame, switch to title screen
        state = 'title';
    } else if (state === 'varShoot' && healthBars[1].inner.width <= 100) {
        //If players health is down just a bit, switch to frozen state (if it shoot state)
        state = 'varFreeze';
    } else if (state === 'varFreeze' && healthBars[1].inner.width === 0) {
        //If player dies, and in frozen state switch to limbo title
        state = 'limboText';
        //Player limbo sound
        gameSound.setVolume(.08);
        //Get rid of old bullets including the frozen ones
        bossBullets.splice(0, bossBullets.length);
        bullets.splice(0, bullets.length);
    }
    else if (state === 'varFinal' && healthBars[0].resetWidth === 0) {
        //If boss dies, and in final switch to the win stte
        state = 'winTitle';
        //Reduce volume
        gameSound.setVolume(.03);
    }
    else if (state === 'winTitle') {
        if (keyIsPressed) {
            //If enter key is pressed, reload the game
            if (keyCode === 13) {
                window.location.reload();
            }
        }
    }
}


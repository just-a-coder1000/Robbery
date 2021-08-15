//the gamestates
const PLAY = 1;
const END = 2;
gameState = 1;

var wall, wall2, wall3, wall4, wall5, wall6;
var diamond;
var diamondImg;
var player;
var playerHasDiamond = false; //checks if player has the diamond
var exit;//the exit
var topEdge, bottomEdge, leftEdge, RightEdge; //creating the edges

var guard, guard2, guard3;

function preload(){
    //image of diamond
    diamondImg = loadImage("diamond.png")
}

function setup(){
    //canvas
    createCanvas(600, 600);

    //the walls
    wall = createSprite(300, 300, 500, 10)
    wall.shapeColor = "red"
    wall2 = createSprite(300, 170, 10, 270)
    wall2.shapeColor = "red"
    wall3 = createSprite(100, 440, 10, 270)
    wall3.shapeColor = "red"
    wall4 = createSprite(500, 440, 10, 270)
    wall4.shapeColor = "red"
    wall5 = createSprite(300, 100, 500, 10)
    wall5.shapeColor = "red"
    wall6 = createSprite(300, 200, 500, 10)
    wall6.shapeColor = "red"

    //the diamond
    diamond = createSprite(570, 30, 10, 10);
    diamond.addImage(diamondImg);
    diamond.scale = 0.3;
    //diamond.debug = true;
    diamond.setCollider("circle", 0, 0, 20)

    //creating the exit
    exit = createSprite(300, 600, 50, 15)
    exit.shapeColor = "lightblue"

    //player
    player = createSprite(300, 400, 20, 20);
    player.shapeColor = "black"
    //player.debug = true

    //the edges
    topEdge = createSprite(300, 0, 600, 2);
    topEdge.shapeColor = "black"
    rightEdge = createSprite(600, 300, 2, 600);
    rightEdge.shapeColor = "black"
    leftEdge = createSprite(0, 300, 2, 600);
    leftEdge.shapeColor = "black"
    bottomEdge = createSprite(300, 600, 600, 2);
    topEdge.shapeColor = "black"

    //the guards
    guard = createSprite(30, 585, 20, 20)
    guard.velocityX = 20
    guard.shapeColor = "blue"
    guard2 = createSprite(30, 20, 20, 20)
    guard2.velocityX = 20
    guard2.shapeColor = "blue"
    guard3 = createSprite(580, 585, 20, 20)
    guard3.velocityY = -20
    guard3.shapeColor = "blue"

}

function draw(){
    //the background
    background("grey");

    //giving velocity to guards
    if(guard.bounceOff(rightEdge)){
        guard.velocityX = -20;
    }
    if(guard.bounceOff(leftEdge)){
        guard.velocityX = 20;
    }

    if(guard2.bounceOff(rightEdge)){
        guard.velocityX = -20;
    }
    if(guard2.bounceOff(leftEdge)){
        guard.velocityX = 20;
    }

    if(guard3.bounceOff(topEdge)){
        guard.velocityX = 20;
    }
    if(guard3.bounceOff(bottomEdge)){
        guard.velocityX = -20;
    }

    //the keys
    if(keyDown(UP_ARROW)){
        player.velocityY = -2
    }
    if(keyDown(DOWN_ARROW)){
        player.velocityY = 2
    }
    if(keyDown(RIGHT_ARROW)){
        player.velocityX = 2
    }
    if(keyDown(LEFT_ARROW)){
        player.velocityX = -2
    }

    if(keyWentUp(UP_ARROW)){
        player.velocityY = 0;
    }
    if(keyWentUp(DOWN_ARROW)){
        player.velocityY = 0;
    }
    if(keyWentUp(RIGHT_ARROW)){
        player.velocityX = 0;
    }
    if(keyWentUp(LEFT_ARROW)){
        player.velocityX = 0;
    }

    //creating the edges and bouncing off the variables of off them
    player.bounceOff(topEdge)
    player.bounceOff(bottomEdge)
    player.bounceOff(rightEdge)
    player.bounceOff(leftEdge)

    player.bounceOff(wall)
    player.bounceOff(wall2)
    player.bounceOff(wall3)
    player.bounceOff(wall4)
    player.bounceOff(wall5)
    player.bounceOff(wall6)

    //checking if the player has the diamond or not
    if(player.isTouching(diamond)){
        stroke(20)
        textSize(20);
        fill("red")
        text("You got the diamond now get out of the exit", 150, 20);

        diamond.x = player.x
        diamond.y = player.y

        playerHasDiamond = true;
    }

    //checking if the player is out of the exit
    if(player.isTouching(exit) && playerHasDiamond === true){

        gameState = END;
        player.shapeColor = "grey"
        player.velocityX = 0;
        player.velocityY = 0;
        diamond.destroy();

        stroke(20);
        textSize(20)
        fill("red")
        text("Congrats you were succesful in the heist", 150, 20);

    }

    //the losing statement
    if(guard.isTouching(player) || guard2.isTouching(player) || guard3.isTouching(player)){
        textSize(20)
        stroke(20)
        fill("red");
        text("You failed", 250, 20);

        guard.velocityX = 0
        guard2.velocityX = 0
        guard3.velocityY = 0
        player.velocityX = 0;
        player.velocityY = 0;
        
        diamond.x = 570;
        diamond.y = 30;
    }

    //drawing the sprites
    drawSprites()

    //the text of exit
    textSize(20)
    stroke(10)
    fill("red")
    text("EXIT", 280, 585);

}
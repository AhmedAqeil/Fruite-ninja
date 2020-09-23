// setting variables
var PLAY = 1;
var END = 0;
var gameState = 1;

var sword, swordImage;
var aliens, alien1, alien2, aliensG;
var fruits, fruit1, fruit2, fruit3, fruit4, fruitsG;
var gameOver, gameOverImage
var score;

var knifeSound , gameOverSound;


function preload() {
  //loading image 
  swordImage = loadImage("sword.png");
  alien1 = loadImage("alien1.png");
  alien2 = loadImage("alien2.png");
  fruit1 = loadImage("fruit1.png");
  fruit2 = loadImage("fruit2.png");
  fruit3 = loadImage("fruit3.png");
  fruit4 = loadImage("fruit4.png");
  gameOverImage = loadImage("gameover.png")
  
  knifeSound = loadSound("knifeSwooshSound.mp3")
  gameOverSound = loadSound("gameover.mp3")

}

function setup() {
  //Setting up the canvas for the game
  createCanvas(400, 400);

  
  
  //creating sword
  sword = createSprite(50, 180, 20, 50);
  sword.addImage( swordImage);
  sword.scale = 0.7;

  gameOver = createSprite(200, 200, 10, 10)
  gameOver.addImage( gameOverImage);
  gameOver.visible = false;
  gameOver.scale = 0.7; 

  //set collider for the sword
  sword.setCollider("circle", 0, 0, 40);
  
  //set score variables and Groups
  aliensG = createGroup();
  fruitsG = createGroup();
  invisibleWallG = createGroup();
  score = 0
}

function draw() {
  // set canvas background colour
  background("lightblue");

  if (gameState === PLAY) {
    //Call spawnfruits and spawnalien function
    spawnFruits();
    spawnAliens();
    //move sword with mouse
    sword.y = World.mouseY
    sword.x = World.mouseX

    if (invisibleWallG.isTouching(fruitsG)){
    score = score - 1
    }
    //player will score points if sword touches fruits
    if (sword.isTouching(fruitsG)) {
      fruitsG.destroyEach();
      score = score + 1
      knifeSound.play()
    } else {
      //game over when sword touches aliens
      if (sword.isTouching(aliensG)) {
      gameState = "END";
        
        gameOverSound.play()
        
        //destroy all fruits and aliens    
        fruitsG.destroyEach();
        aliensG.destroyEach();
        
        //stop movement of fruits and aliens       
        fruitsG.setVelocityXEach(0);
        aliensG.setVelocityXEach(0);
        
        //Screen display when game end
        gameOver.visible = true;
      }
    }
  }


drawSprites();

//Display score
text("Score: " + score, 300, 50);
}

    
function spawnAliens() {
// create function for alien behavior in the game     
      if (frameCount % 100 === 0) {
        aliens = createSprite(400, 200, 10, 40);
        aliens.velocityX = (-6);
        
        var rand4 = Math.round(random(1, 2));
        switch (rand4) {
          case 1:
            aliens.x = 400;
            aliens.velocityX = -(7-(score/10));
            break;
          case 2:
            aliens.x = 0;
            aliens.velocityX = (7+(score/10));
        }
        //generate random obstacles
        aliens.y = Math.round(random(10, 400));
        var rand1 = Math.round(random(1, 2));
        switch (rand1) {
          case 1:
            aliens.addImage(alien1);
            break;
          case 2:
            aliens.addImage(alien2);
        }
        //aliens.scale = 0.5;
        aliens.lifetime = 200;
        aliensG.add(aliens);
      }

    }


function spawnFruits() {
//Create function for Fruit behavior in the game
      if (frameCount % 100 === 0) {
        fruits = createSprite(400, 100, 40, 10);
        
        fruits.velocityX = -3;
        var rand3 = Math.round(random(1, 2));
        switch (rand3) {
          case 1:
            fruits.x = 400;
            fruits.velocityX = -(7-(score/4));
            break;
          case 2:
            fruits.x = 0;
            fruits.velocityX = (7+(score/4));
        }
        
        fruits.y = Math.round(random(10, 400));
        var rand2 = Math.round(random(1, 4));
        switch (rand2) {
          case 1:
            fruits.addImage(fruit1);
            break;
          case 2:
            fruits.addImage(fruit2);
            break;
          case 3:
            fruits.addImage(fruit3);
            break;
          case 4:
            fruits.addImage(fruit4);
            break;

        }

        //assign lifetime to the variable
        fruits.lifetime = 300;
        fruits.scale = 0.2;
        fruitsG.add(fruits);

      }
    }

  
  
  
  
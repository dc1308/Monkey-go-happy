var monkey,monkey_running;
var banana,bananaImage, obstacle,collider, obstacleImage, monkeyImg, gameOverImg;
var FoodGroup,obstacleGroup;
var forest,jungle;
let forest2,night,evening;
var tree,treeImg;
var PLAY=1;
var END=0;
var gameState=PLAY;
var score=0;
var gameOver,reset,resetImg;

function preload(){
  
  forest = loadImage("jungle.jpg");
  forest2 = loadImage("jungle 2.jpg");
  evening= loadImage("evening.png");
  night= loadImage("night.jpg");
  monkey_running =            loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png");
  bananaImage = loadImage("banana.png");
  obstacleImage = loadImage("obstacle.png");
  treeImg= loadImage("tree.png");
  gameOverImg= loadImage("gameover.png");
  resetImg= loadImage("reset.png");
  
 
}

function setup() {
  createCanvas(1000,500);
  //bugg= createSprite(500,250,1000,250);
  //bugg.addImage(forest2);
  
  jungle= createSprite(300,250,600,500);
  jungle.addImage("forest", forest2);
  
  tree = createSprite(1030,280,600,20);
  tree.addImage("trees", treeImg);
  
  collider = createSprite(500,580,1000,250);
  collider.shapeColor="darkgreen";
  
  monkey = createSprite(100,400,10,10);
  monkey.addAnimation("running", monkey_running);
  monkey.scale=0.2;
  monkey.setCollider("circle",0,0,250);
  //monkey.debug=true;
  
  obstacleGroup = createGroup();
  FoodGroup = createGroup();
  
  gameOver= createSprite(500,150,100,100);
  gameOver.addImage(gameOverImg);
  gameOver.visible=false;
  
  reset= createSprite(500,400,50,50);
  reset.addImage(resetImg);
  reset.scale=0.2;
  reset.visible=false;
  
}


function draw() {
  background(forest);
  
  
  if(gameState=== PLAY){
    tree.velocityX = -5;
    jungle.velocityX=-2;
    
    if(jungle.x <100){
      jungle.x=jungle.width/2;
    }
    
     if (tree.x < -400){
      tree.x = tree.width;
    }
  
    if(keyDown("space") && monkey.y >= 150) {
        monkey.velocityY = -12;
    }
    if(monkey.isTouching(FoodGroup)){
    FoodGroup.destroyEach();  
    score = score+1;
    }
    
    
    monkey.velocityY = monkey.velocityY + 0.8;
    
    spawnBananas();
    spawnObstacles();
    reset.visible=false;
    gameOver.visible=false;
     
   if(monkey.isTouching(obstacleGroup)){
     gameState=END;
   }
  }
  
   else if(gameState === END) {
      FoodGroup.destroyEach();
      monkey.visible=false;
      
      jungle.velocityX=0;
      tree.velocityX=0;
      obstacleGroup.setVelocityXEach(0);
      FoodGroup.setVelocityXEach(0);
      
      obstacleGroup.setLifetimeEach(-1);
      FoodGroup.setLifetimeEach(-1);
      
      gameOver.visible=true;
      reset.visible=true;
      if(mousePressedOver(reset)&& gameState=== END){
        gameState= PLAY;
        obstacleGroup.destroyEach();
        FoodGroup.destroyEach();
        monkey.visible=true;
      }
    }
  
  monkey.collide(collider);
  
  drawSprites();
  
  textSize(20);
  stroke("black");
  fill("black");
  text("Score: " + score, 500,50);

}

function spawnBananas(){
  if(frameCount% 150=== 0){
    banana= createSprite(10,250,10,10);
    banana.y= Math.round(random(50,150));
    banana.addImage("banana",bananaImage);
    banana.scale=0.15;
    banana.velocityX=4;
    
    banana.lifetime=134;
    
    FoodGroup.add(banana);
  }
}

function spawnObstacles(){
  if(frameCount% 200=== 0){
    obstacle= createSprite(600,400,50,50);
    obstacle.addImage("obs", obstacleImage);
    obstacle.scale=0.3;
    obstacle.velocityX=-5;
    
    obstacle.lifetime = 300;
    
    obstacleGroup.add(obstacle);
  }
}




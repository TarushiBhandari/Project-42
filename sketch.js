//creating global variables
var monkey , monkeyrunning, groundImg;
var banana ,bananaImg, stone, stoneImg;
var FoodGroup, obstacleGroup;
var score=0;
var PLAY= 1;
var END= 0;
var gameState= 1;

function preload(){
  
  monkeyrunning =            loadAnimation("Monkey_01.png","Monkey_02.png","Monkey_03.png","Monkey_04.png","Monkey_05.png","Monkey_06.png","Monkey_07.png","Monkey_08.png","Monkey_09.png","Monkey_10.png");
  
  bananaImg = loadImage("banana.png");
  stoneImg = loadImage("stone.png");
  backgroundImg= loadImage("jungle.jpg");
}

function setup() {
  
  createCanvas(600,600);
  
  //creating groups
  bananaGroup= createGroup();
  obstacleGroup= createGroup();
  
  //creating the background sprite
  back=createSprite(0,0,800,400);
  back.addImage(backgroundImg);
  back.scale=1.5;
  back.x=back.width/2;
  back.velocityX=-4;  
  
  //creating sprite for monkey
  monkey= createSprite(80,315,20,20);
  monkey.addAnimation("running", monkeyrunning);
  monkey.scale= 0.1;
  monkey.visible= true;
  
  //creating a ground
  ground = createSprite(400,350,800,10);
  ground.velocityX=-4;
  ground.x=ground.width/2;
  ground.visible=false;
}

function draw() {

    //changing background color
    background("green");
    
   //resetting the backgeround image
   if(back.x<100){
    back.x=back.width/2;
  }
  
     //if ground goes out of boundary reset it at half of canvas' width
     if (ground.x < 0){
         ground.x = ground.width/2;
     }
  
    //colliding monkey with the ground
    monkey.collide(ground);
  
    //if gameState= play, do the following
    if(gameState===PLAY){
       drawSprites();
       food();
       stones();
    
      
    //if space key is pressed and monkey is on the groundthen only jump the monkey
    if(keyDown("space")&&monkey.y>=315.5){
       monkey.velocityY= -18;
     }
   
    //adding gravity to the monkey
    monkey.velocityY= monkey.velocityY+1;
    
    //if monkey touches the banana group, it should be detroyed
    if(monkey.isTouching(bananaGroup)){
    bananaGroup.destroyEach();
    score= score+2;
    monkey.scale+= +0.030;
     }
    
    //if monkey touches the obstacle group, gameState= END
    if(monkey.isTouching(obstacleGroup)){
      gameState= END;
    }
}
    //if gameState= end, do the following
    if(gameState===END){
    
    //destroy both groups and set their velocity 0
    bananaGroup.destroyEach();
    bananaGroup.setVelocityXEach(0);
    obstacleGroup.destroyEach();
    obstacleGroup.setVelocityXEach(0);
    
    //make the monkey and survival time invisible
    monkey.destroy();
    score=0;
    
    //display a game over message
    fill("yellow");
    textSize(40);
    text("GAME OVER", 170,300);
  }
   
    fill("white");
    textSize(20);
    text("score:"+score, 500,50);
}

function food(){
  
  //create bananas after every 80 frames
  if(frameCount%80===0){
    banana= createSprite(350,400,1,1);
    banana.addImage(bananaImg);
    
    //creating bananas at random y positions
    banana.y= Math.round(random(200,250));
    bananaGroup.add(banana);
    banana.velocityX= -5;
    banana.scale= 0.1;
    banana.lifetime= 120;
  }
}

function stones(){
  
  //create stones after every 300 frames
  if(frameCount%300===0){
    stone= createSprite(400,330,10,10);
    stone.addImage(stoneImg);
    obstacleGroup.add(stone);
    stone.velocityX= -4;
    stone.scale= 0.11;
  }
}
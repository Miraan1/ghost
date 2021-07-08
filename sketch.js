var door,doorImg,tower,towerImg,ghost,ghostImg,GhostJump,GhostStand,climber,climberImg,climbersGroup, boundry,boundry1,losingLine,Restingline,losingLineGroup,doorGroup,RestinglineGroup
    
var PLAY = 1
var END = 0
var gameState = PLAY

function preload(){
  doorImg = loadImage("door.png")
  towerImg = loadImage("tower.png")
  ghostImg = loadImage("ghost-standing.png")
  climberImg = loadImage("climber.png")
  
  
}


function setup() {
  createCanvas(600,600);
  
  tower = createSprite(300,300)
  tower.addImage(towerImg)
  tower.velocityY = 4
  
  
  
  
  ghost = createSprite(300,250)
  ghost.addImage(ghostImg)
  ghost.scale = 0.35
  ghost.debug = true
  //ghost.setCollider("circle",-30,20,110)
  ghost.setCollider("rectangle",-20,20,160,230)
  
  boundry = createSprite(70,300,5,1000)
  boundry.visible = false
  
  boundry1 = createSprite(540,300,5,1000)
  boundry1.visible = false
  
  climbersGroup = createGroup()
  losingLineGroup = createGroup()
  doorGroup = createGroup()
  RestinglineGroup = createGroup()
}

function draw(){
  background(0)

 if(gameState == PLAY) {
    

    if(tower.y >600){
      tower.y = 300
    }

    spawnDoors()

    ghost.velocityY = ghost.velocityY + 0.8

    if(keyDown("space")) {

      ghost.velocityY = -4
    }

    if(keyDown("left")) {
      ghost.velocityX = -3

    }

    if(keyDown("right")) {
      ghost.velocityX = 3

    }
    
    if(ghost.y > 600 || ghost.isTouching(losingLineGroup)) {
      
      gameState = END;
    }

    
 }
  
 if(gameState == END){
   tower.velocityY = 0
   climbersGroup.velocityY = 0
   doorGroup.velocityY = 0
   RestinglineGroup.velocityY = 0
   losingLineGroup.velocityY = 0
   background(0)
 }
  
    ghost.collide(boundry)
    ghost.collide(boundry1)
    ghost.collide(climbersGroup)
    
  drawSprites()
}

function spawnDoors() {
  
  if(frameCount%100 == 0){
    var rand = Math.round(random(200,450));
    door = createSprite(rand,0)
    door.addImage(doorImg)
    door.velocityY = 4
    doorGroup.add(door)
    climber = createSprite(door.x,door.y + 65)
    climber.addImage(climberImg)
    climber.velocityY = 4
    climbersGroup.add(climber)
    Restingline = createSprite(door.x,climber.y -12,100,2)
    Restingline.velocityY = 4
    Restingline.visible = false
    RestinglineGroup.add(Restingline)
    losingLine = createSprite(door.x,climber.y +10 ,100,20)
    losingLine.velocityY = 4
    losingLine.visible = false
    losingLineGroup.add(losingLine)
  }

}

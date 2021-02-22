var level1bg;
var bullet,bulletImg;
var player1,player1Img;
var player2Img1,player2Img2,player2Img3;
var plane,planeImg;
var gameoverImg;
var level2bgm;
var edges;
var life = 20;
var bulletGroup;
var gameState = "level1";
var sTime = 50000;
function preload (){ 
  /* this is for level1 */
    player1Img = loadImage("images/player1.png");
    level1bg = loadImage("images/level1background.png");
    planeImg = loadImage("images/plane.png");
    bulletImg = loadImage("images/bullet.png");
    gameoverImg = loadImage("images/gameover.jpg");
 
    /* this is for level 2 */
   player2Img1 = loadAnimation("images/ninja2.png","images/ninja6.png"); 
 
   level2bgm = loadImage("images/background3.jpg") 

}
function setup() {
  createCanvas(windowWidth,windowHeight);
/* this is for level 1*/  
  plane=createSprite(width/2,80);
  plane.addImage(planeImg);
  plane.scale=0.3;
  plane.rotation=180;
  
  edges= createEdgeSprites();

  player1=createSprite(width/2,height-150);
  player1.addImage(player1Img);
  player1.scale=0.5;
  player1.debug=true;
  player1.setCollider("rectangle",0,0,220,670)
  
  bulletGroup = new Group();
  
  /* this is for level 2*/
  player2=createSprite(width/2,height-150);
  player2.addAnimation("ninja",player2Img1);
  player2.visible=false;     
  
}

function draw() {
  
 if(gameState==="level1"){
    background(60,100,220);
    background(level1bg);
     textSize(40);
     text("❤:"+life,width-100,200);
     sTime = sTime - 1;
     if(sTime<0 && life>0){
       gameState='level2'
     } 
     if(frameCount%10===0){
    var planeX =Math.round(random(1,3)); 
   // text(mouseX+","+mouseY,mouseX,mouseY); 
     if(planeX===1){
       plane.x=width/2-450;
     } else if(planeX===2){
       plane.x=width/2;
     } else {
       plane.x=width/2+450;
     }
       
      
    }
    if(life===0){
      gameState="END";
    }
      if (keyDown(RIGHT_ARROW)&&player1.x<width-400){
      player1.x=player1.x+500;
      } 
      if(keyDown(LEFT_ARROW)&&player1.x>400){
      player1.x=player1.x-500;
     }
     var bullets = Math.round(random(1,15));
     if (bullets===1){
       spawnBullets();
     }
     
     for (var i=0; i<bulletGroup.length; i++){
      if(bulletGroup.get(i).isTouching(player1))
     { bulletGroup.get(i).destroy(); life = life - 1; } }
     drawSprites();
    
  }else if(gameState==="END"){
   background(gameoverImg);
  } else  if(gameState==="level2"){
    background(225)
        player2.visible=true;

        player1.destroy();
        plane.destroy();
        bulletGroup.visible=false;

           drawSprites();
      }


}
function spawnBullets(){
 bullet = createSprite(plane.x,plane.y+50);
 bullet.addImage(bulletImg);
 bullet.rotation=180;
 bullet.scale=0.5;
 bullet.debug=true;
 bullet.lifetime=height/10;
 bullet.velocityY=10;
  bulletGroup.add(bullet);
  
}



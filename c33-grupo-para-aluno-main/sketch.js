const Engine = Matter.Engine;
const World = Matter.World;
const Bodies = Matter.Bodies;
const Constraint = Matter.Constraint;
const Body = Matter.Body;

var engine, world, backgroundImg;
var canvas, tower, ground, cannon;
var angle = 20; 
var cannonBall;
var balls = [];
var boats=[];
var boatAnimation = [];
var boatSpriteData;
var boatSpriteSheet;
var brokenBoatAnimation = [];
var brokenBoatSpriteData;
var brokenBoatSpriteSheet;
var waterAnimation = [];
var waterSpriteData;
var waterSpriteSheet;
var isGameOver = false;
var isLaughing = false;
var waterSound,pirateSound,bgSound,cannonSound;

function preload() {
  backgroundImg = loadImage("./assets/background.gif");

  towerImage = loadImage("./assets/tower.png");

  boatSpriteData = loadJSON("./assets/boat/boat.json");
  boatSpriteSheet = loadImage("./assets/boat/boat.png");

  brokenBoatSpriteData = loadJSON("./assets/boat/brokenBoat.json");
  brokenBoatSpriteSheet = loadImage("./assets/boat/brokenBoat.png");

  waterSpriteData = loadJSON("./assets/waterSplash/waterSplash.json");
waterSpriteSheet = loadImage("./assets/waterSplash/waterSplash.png");

waterSound = loadSound("./assets/cannon_water.mp3");
pirateSound = loadSound("./assets/pirate_laugh.mp3");
bgSound = loadSound("./assets/background_music.mp3");
cannonSound = loadSound("./assets/cannon_explosion.mp3");
}

function setup() {

  canvas = createCanvas(1200, 600);
  engine = Engine.create();
  world = engine.world;
  
  var options = {
    isStatic: true
  }

  ground = Bodies.rectangle(0, height - 1, width * 2, 1, options);
  World.add(world, ground);

  tower = Bodies.rectangle(160, 350, 160, 310, options);
  World.add(world, tower);

  angleMode(DEGREES);
  angle = 15;
  cannon = new Cannon(180, 110, 130, 100, angle);
  boat = new Boat(width-79,height-60,170,170,-80)

  var boatFrames =  boatSpriteData.frames;
  for (var i = 0; i < boatFrames.length; i++) {
      var pos = boatFrames[i].position;
      var Img = boatSpriteSheet.get(pos.x,pos.y,pos.w,pos.h);
      boatAnimation.push(Img);
  }

  var brokenBoatFrames =  brokenBoatSpriteData.frames;
  for (var i = 0; i < brokenBoatFrames.length; i++) {
      var pos = brokenBoatFrames[i].position;
      var Img = brokenBoatSpriteSheet.get(pos.x,pos.y,pos.w,pos.h);
      brokenBoatAnimation.push(Img);
  }

  var waterFrames =  waterSpriteData.frames;
  for (var i = 0; i < waterFrames.length; i++) {
      var pos = waterFrames[i].position;
      var Img = waterSpriteSheet.get(pos.x,pos.y,pos.w,pos.h);
      waterAnimation.push(Img);
  }

}

function draw() {

  image(backgroundImg, 0, 0, width, height);

  Engine.update(engine);
  rect(ground.position.x, ground.position.y, width * 2, 1);
  
  push();
  imageMode(CENTER);
  image(towerImage,tower.position.x, tower.position.y, 160, 310);
  pop();


  cannon.display();
  showBoats();

  for (var i = 0; i<balls.length;i++){
    showCannonBalls(balls[i],i)
    collisionWithBoat(i);
  }
}

function keyReleased(){
  if (keyCode==DOWN_ARROW) {
    balls[balls.length-1].shoot();
  }
}

function keyPressed(){
  if (keyCode==DOWN_ARROW) {
   var cannonBall = new CannonBall(cannon.x,cannon.y);
    balls.push(cannonBall);
 
  }
}

function showCannonBalls(ball,index){
  if(ball){
    ball.display();
    ball.animate()
    if (ball.body.position.x >= width || ball.body.position.y >= height - 50) {
      ball.remove(index);
    }
 
  }
 
}
function showBoats(){
  if (boats.length>0) {
    if (boats[boats.length-1]===undefined||
      boats[boats.length-1].body.position.x<width-300 ) {
      var positions=[-40,-60,-70,-20];
      var position=random(positions);
      var boat = new Boat(width-79,height-60,170,170,position,boatAnimation)
      boats.push(boat);
    }
    for (var i = 0; i < boats.length; i++) {
      if (boats[i]) {
        Matter.Body.setVelocity(boats[i].body,{x:-0.9,y:0})
        boats[i].display();
        boats[i].animate();      
      }
      
    }
  } else {
    var boat = new Boat(width-79,height-60,170,170,-80,boatAnimation)
    boats.push(boat);
  }
}
function collisionWithBoat(index){
  for (var i = 0; i < boats.length; i++) {
    if (balls[index] !==undefined && boats[i]!==undefined) {
      var collision = Matter.SAT.collides(balls[index].body,boats[i].body);

      if (collision.collided) {
         boats[i].remove(i);

         Matter.World.remove(world, balls[index].body);
         delete balls[index];
       }
    }
  }
}
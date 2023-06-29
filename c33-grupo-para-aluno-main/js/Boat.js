class Boat{
  constructor(x,y,w,h,boatPos,boatAnimation){

          var options={
              isStatic:false
          }

      this.w = w;
      this.h = h;
      this.boatPos = boatPos;
      this.boatAnimation = boatAnimation;
      this.speed = 0.05;
      this.isBroken=false;
      this.image = loadImage("./assets/boat.png");
      this.body = Bodies.rectangle(x,y,w,h,options);
      World.add(world,this.body);

  }

  animate(){
    //this.speed=this.speed+0.05
    this.speed+=0.05
    //this.speed +=0.05%1.1
  }
  
  remove(index) {

    this.boatAnimation=brokenBoatAnimation
    this.speed = 0.05;
    this.w = 300;
    this.h = 300;
    this.isBroken= true;
    
      setTimeout(() => {
        Matter.World.remove(world, boats[index].body);
        delete boats[index];
      }, 2000);


    }

  display(){

    var index=floor(this.speed%this.boatAnimation.length);
  
      var pos = this.body.position;
      var angle = this.body.angle;

      push();
      translate(pos.x,pos.y);
      rotate(angle);
      imageMode(CENTER);
    //  image(this.image,0,this.boatPos,this.w,this.h);
      image(this.boatAnimation[index],0,this.boatPos,this.w,this.h);
      pop();

  }
}
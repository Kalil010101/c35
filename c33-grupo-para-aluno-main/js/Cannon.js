class Cannon {
  constructor(x, y, width, height, angle) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.angle = angle;
    this.cannon_image = loadImage("assets/canon.png");
    this.cannon_base = loadImage("assets/cannonBase.png");
  }
  display() {
    //console.log(this.angle)
    if(keyIsDown(RIGHT_ARROW)&&this.angle<65){
      this.angle = this.angle +1
    }
    
    if(keyIsDown(LEFT_ARROW) &&this.angle>-50){
      this.angle = this.angle -1
    
    }

    push();
    //rectMode(CENTER);
    //rect( this.x,this.y,this.width,this.height);
    translate(this.x, this.y);
    rotate(this.angle);
    imageMode(CENTER);
    image(this.cannon_image, 0, 0, this.width, this.height);
    pop();
    image(this.cannon_base,70, 20, 200, 200);
    //rect(70,20,200,200);
    noFill();
  }
}

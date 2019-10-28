function preyClass(x, y, vx, vy, ax, ay, radius){
  this.radius = radius;
  this.loc = new JSVector(x, y);
  this.vel = new JSVector(vx, vy);
  this.acc = new JSVector(ax, ay);
  this.isHunted = false; //detects if it's been hunted before
  this.lifeSpanMax = 300;
  this.lifeSpan = this.lifeSpanMax;
}

preyClass.prototype.render = function(){
  ctx.strokeStyle = 'rgb(85, 107, 47)';
  ctx.lineWidth = '10';
  ctx.fillStyle = 'rgb(255, 140, 0)';

  ctx.beginPath();
  ctx.arc(this.loc.x, this.loc.y, this.radius, 0, Math.PI*2, true);
  ctx.fill();
  ctx.stroke();
}
//Attracts it towards a ball
preyClass.prototype.peter = function(v2){
    var attractionForce = JSVector.subGetNew(v2.loc, this.loc);
    attractionForce.normalize();
    attractionForce.multiply(0.05);
    this.acc.add(attractionForce);
  }

preyClass.prototype.update = function(){
  this.vel.limit(10);
  this.loc.add(this.vel);
  this.vel.add(this.acc);
  //Makes the lifespan of the prey work, and reset
  if(this.isHunted){
    this.lifeSpan-=1;
  }
  if(this.isHunted === false){
    this.lifeSpan = this.lifeSpanMax;
  }
}

preyClass.prototype.checkEdges = function(){
  if((this.loc.x + this.radius > cnv.width && this.vel.x > 0) || (this.loc.x - this.radius < 0 && this.vel.x < 0)){
    this.vel.x = -this.vel.x;
  }

  if((this.loc.y + this.radius > cnv.height && this.vel.y > 0) || (this.loc.y - this.radius < 0 && this.vel.y < 0)){
    this.vel.y = -this.vel.y;
  }
}

preyClass.prototype.run = function(){
  this.update();
  this.render();
  this.checkEdges();
}

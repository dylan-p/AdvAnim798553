function snakeClass(x, y, vx, vy, ax, ay, radius, s1, s2, s3, orbRad, weer){
  this.radius = radius;
  this.loc = new JSVector(x, y);
  this.vel = new JSVector(vx, vy);
  this.tails = [];
  this.acc = new JSVector(0, 0.03);
  this.mag = this.vel.getMagnitude();
  this.newVector = new JSVector(vx, vy);
//   // color values
  this.s1 = s1;
  this.s2 = s2;
  this.s3 = s3;
  this.c1 = this.s1*0.8;
  this.c2 = this.s2*0.8;
  this.c3 = this.s3*0.8;
  // color values
  this.id = weer;
  this.tails[0] = new tailClass(this, this, this.radius*0.1, 0);
  for(let a = 1; a<35; a++){
      this.tails[a] = new tailClass(this, this.tails[a-1], this.tails[a-1].length, a);
  }
}

snakeClass.prototype.render = function(){
  ctx.strokeStyle = "rgb(" + this.s1 + 20 + "," + this.s2 + 20 + "," + this.s3 + 20 + ")";
  ctx.lineWidth = '3';
  ctx.fillStyle = "rgb(" + this.c1 + 20 + "," + this.c2 + 20 + "," + this.c3 + 20 + ")";
  //makes the head
  ctx.beginPath();
  ctx.arc(this.loc.x, this.loc.y, this.radius, 0, Math.PI*2, false);
  ctx.stroke();
  ctx.fill();
  //makes the tail
}

snakeClass.prototype.update = function(){
  this.vel.add(this.acc);
  this.vel.limit(7);
  this.loc.add(this.vel);
  for(let a = 0; a<this.tails.length; a++){
    this.tails[a].run();
  }
  for(let b = 1; b<this.tails.length; b++){
    if((this.tails[b].loc.distance(this.tails[b-1]))> 2*this.radius){
      this.newVector = JSVector.subGetNew(this.tails[b]. this.tails[b-1]);
      this.newVector.setMagnitude(this.mag);
      this.tails[b].loc = this.tails[b].loc.sub(this.newVector);
    }
  }
}

snakeClass.prototype.checkEdges = function(){
  if((this.loc.x + this.radius > cnv.width && this.vel.x > 0) || (this.loc.x - this.radius < 0 && this.vel.x < 0)){
    this.vel.x = -this.vel.x;
  }

  if((this.loc.y + this.radius > cnv.height && this.vel.y > 0) || (this.loc.y - this.radius < 0 && this.vel.y < 0)){
    this.vel.y = -this.vel.y;
  }
}

snakeClass.prototype.run = function(){
  this.update();
  this.render();
  this.checkEdges();
}

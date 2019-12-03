function snakeClass(x, y, vx, vy, ax, ay, radius, s1, s2, s3, orbRad, weer){
  this.radius = radius;
  this.loc = new JSVector(x, y);
  this.vel = new JSVector(vx, vy);
  this.tails = [];
  this.acc = new JSVector(0, 0);
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
  this.tails[0] = new tailClass(this, this, this.radius*0.1, 0)
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

snakeClass.prototype.huntFunc = function(){
  for(let b = 0; b<prey.length; b++){
    //Sets initial hunted state, goes on the prey
    if((this.loc.distance(prey[b].loc) < this.radius) && (prey[b].isHunted === false)){
      prey[b].lifeSpan = -100;
      partSys.push(new ParticleClass(this.loc.x, this.loc.y, 0.3*Math.random()-0.15, 0.3*Math.random()-0.15, 0, 0));
      if(this.tails.length < 55){
        this.tails.push(new tailClass(this, this.tails[this.tails.length-1], this.tails[this.tails.length-1].length, this.tails.length));
      }
      if(this.tails.length >= 55){
        this.tails.splice(35, 19);
        this.radius +=4;
      }
    }
  }
  let goToForce = this.goToPrey();
  goToForce.multiply(0.5); //1.0
  this.acc.add(goToForce);
}

snakeClass.prototype.goToPrey = function(){
  var neighbordist = 150;
  var avgLoc = new JSVector(0, 0);
  var numClose = 0;
  for(let a = 0; a < prey.length; a++){
    let d = this.loc.distance(prey[a].loc);
    if((d > 0) && (d < neighbordist) && (prey[a].isHunted == false)){
      avgLoc.add(prey[a].loc);
      numClose++;
    }
  }
  if(numClose > 0){
    avgLoc.divide(numClose);
    return this.seek(avgLoc);
  } else {
    return new JSVector(0,0);
  }
}

snakeClass.prototype.seek = function(target){
  var desired = JSVector.subGetNew(target, this.loc);
  desired.normalize();
  desired.multiply(coh);
  var steer = JSVector.subGetNew(desired, this.vel);
  steer.limit(0.01);
  return steer;
}

snakeClass.prototype.update = function(){
  this.vel.add(this.acc);
  this.vel.limit(5);
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
  this.huntFunc();
  this.render();
  this.checkEdges();
}

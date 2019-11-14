function boidClass(x, y, vx, vy, radius ,weer){
  this.radius = radius;
  this.loc = new JSVector(x, y);
  this.vel = new JSVector(vx, vy);
  this.acc = new JSVector(0, 0);
  this.mag = this.vel.getMagnitude();
  this.id = weer;
}

boidClass.prototype.render = function(){
  ctx.strokeStyle = "rgb(0, 0, 0)";
  ctx.lineWidth = '5';
  ctx.fillStyle = "rgb(255, 255, 255)";
  //makes the head
  ctx.beginPath();
  ctx.arc(this.loc.x, this.loc.y, this.radius, 0, Math.PI*2, false);
  ctx.stroke();
  ctx.fill();
  //makes the tail
}

boidClass.prototype.update = function(){
  this.seperate();
  this.align();
  this.cohese();
  this.vel.limit(2);
  this.vel.add(this.acc);
  this.loc.add(this.vel);
}
//
boidClass.prototype.seperate = function(){
  var numClose = 0;
  for(let a = 0; a<flock.length; a++){
    if((flock[a] !== this) && (this.loc.distance(flock[a].loc)<20)){
      var addVec = new JSVector.subGetNew(this.loc, flock[a].loc);
      addVec.divide(this.loc.distance(flock[a].loc));
      numClose++;
    }
  }
  if(numClose>0){
    addVec.normalize();
    addVec.divide(numClose);
    this.vel.add(addVec);
  }
}

boidClass.prototype.align = function(){
  var avgVec = new JSVector(0, 0);
  var numClose = 0;
  for(let a = 0; a<flock.length; a++){
    if((flock[a] !== this) && (this.loc.distance(flock[a].loc)<60) && ((this.loc.distance(flock[a].loc)>20))){
      avgVec.add(flock[a].vel);
      numClose++;
    }
  }
  if(numClose>0){
    avgVec.divide(numClose);
    avgVec.normalize();
    avgVec.sub(this.vel);
    avgVec.limit(0.05);
    this.acc.add(avgVec);
  }
}

boidClass.prototype.cohese = function(){
  var avgLoc = new JSVector(0, 0);
  var numClose = 0;
  for(let a = 0; a<flock.length; a++){
    if((flock[a] !== this) && (this.loc.distance(flock[a].loc)<60) && ((this.loc.distance(flock[a].loc)>20))){
      avgLoc.add(flock[a].loc);
      numClose++;
    }
  }
  if(numClose>0){
    this.seek(avgLoc);
  }
}

boidClass.prototype.seek = function(v2){
  var desired = JSVector.subGetNew(v2, this.loc);  // A vector pointing from the position to the target
    // Normalize desired and scale to maximum speed
    desired.normalize();
    desired.multiply(0.05);
    // Steering = Desired minus Velocity
    var steer = JSVector.subGetNew(desired, this.vel);
    steer.limit(0.05);  // Limit to maximum steering force
    this.acc.add(steer);
}

boidClass.prototype.checkEdges = function(){
  if((this.loc.x + this.radius > cnv.width && this.vel.x > 0) || (this.loc.x - this.radius < 0 && this.vel.x < 0)){
    this.vel.x = -this.vel.x;
  }

  if((this.loc.y + this.radius > cnv.height && this.vel.y > 0) || (this.loc.y - this.radius < 0 && this.vel.y < 0)){
    this.vel.y = -this.vel.y;
  }
}

boidClass.prototype.run = function(){
  this.update();
  this.render();
  this.checkEdges();
}

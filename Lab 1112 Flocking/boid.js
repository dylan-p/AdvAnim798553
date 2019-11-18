function boidClass(x, y, vx, vy ,weer){
  this.loc = new JSVector(x, y);
  this.vel = new JSVector(vx, vy);
  this.acc = new JSVector(0, 0);
  this.mag = this.vel.getMagnitude();
  this.id = weer;
  this.maxSpeed = 5;
  this.maxAcc = 0.3;
}

boidClass.prototype.render = function(){
  ctx.strokeStyle = "rgb(0, 0, 0)";
  ctx.lineWidth = '5';
  ctx.fillStyle = "rgb(255, 255, 255)";
  //makes the head
  ctx.save();
  ctx.translate(this.loc.x, this.loc.y);
  ctx.rotate(this.vel.getDirection() - (Math.PI/2));

  ctx.beginPath();
  ctx.moveTo(-9, -12);
  ctx.lineTo(0, 15);
  ctx.lineTo(9, -12);
  ctx.lineTo(0, -3);
  ctx.lineTo(-9, -12);
  ctx.closePath();

  ctx.stroke();
  ctx.fill();
  ctx.restore();
}

boidClass.prototype.update = function(){
  this.seperate();
  this.align();
  this.cohese();
  this.vel.add(this.acc);
  this.vel.limit(2);
  this.loc.add(this.vel);
}

boidClass.prototype.seperate = function(){
  var numClose = 0;
  var addVec = new JSVector(0, 0);
  for(let a = 0; a<flock.length; a++){
    if((flock[a] !== this) && (this.loc.distance(flock[a].loc)<(20*sep))){
      var rando = new JSVector.subGetNew(this.loc, flock[a].loc);
      rando.normalize();
      rando.divide(this.loc.distance(flock[a].loc));
      addVec.add(rando);
      numClose++;
    }
  }
  if(numClose>0){
    addVec.normalize();
    addVec.divide(numClose);
    addVec.multiply(this.maxSpeed);
    var steer = new JSVector.subGetNew(addVec, this.vel);
    steer.limit(this.maxAcc);
    steer.multiply(5);
    this.acc.add(steer);
  }
}

boidClass.prototype.align = function(){
  var avgVec = new JSVector(0, 0);
  var numClose = 0;
  for(let a = 0; a<flock.length; a++){
    if((flock[a] !== this) && (this.loc.distance(flock[a].loc)<(60*ali))){
      avgVec.add(flock[a].vel);
      numClose++;
    }
  }
  if(numClose>0){
    avgVec.divide(numClose);
    avgVec.normalize();
    avgVec.multiply(this.maxSpeed);
    var steer = JSVector.subGetNew(avgVec, this.vel);
    steer.limit(this.maxAcc);
    this.acc.add(steer);
  }
}

boidClass.prototype.cohese = function(){
  var avgLoc = new JSVector(0, 0);
  var numClose = 0;
  for(let a = 0; a<flock.length; a++){
    if((flock[a] !== this) && (this.loc.distance(flock[a].loc)<60) && (this.loc.distance(flock[a].loc)>20)){
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
  // Steering = Desired minus Velocity
  var steer = JSVector.subGetNew(desired, this.vel);
  steer.normalize();
  steer.limit(this.maxAcc);
  steer.multiply(coh*0.25);
  this.acc.add(steer);
}

boidClass.prototype.checkEdges = function(){
  // if(((this.loc.x > cnv.width) && (this.vel.x > 0)) || ((this.loc.x < 0) && (this.vel.x < 0))){
  //   this.vel.x = -this.vel.x;
  // }
  //
  // // if((this.loc.y > cnv.height && this.vel.y > 0) || (this.loc.y < 0 && this.vel.y < 0)){
  // //   this.vel.y = -this.vel.y;
  // // }
  // if(((this.loc.y > cnv.height) && (this.vel.y > 0)) || ((this.loc.y < 0) && this.vel.y < 0)){
  //   this.vel.y = -this.vel.y;
  // }
  var desire;
  if(this.loc.x < 40){
    desire = new JSVector(this.maxSpeed*3, this.vel.y);
    var steer = JSVector.subGetNew(desire, this.vel);
    steer.limit(this.maxAcc*10);
    this.acc.add(steer);
  }
  else if(this.loc.x > cnv.width - 40){
    desire = new JSVector(-this.maxSpeed*3, this.vel.y);
    var steer = JSVector.subGetNew(desire, this.vel);
    steer.limit(this.maxAcc*10);
    this.acc.add(steer);
  }
  if(this.loc.y < 40){
    desire = new JSVector(this.vel.x, this.maxSpeed*3);
    var steer = JSVector.subGetNew(desire, this.vel);
    steer.limit(this.maxAcc*10);
    this.acc.add(steer);
  }
  else if(this.loc.y > cnv.height - 40){
    desire = new JSVector(this.vel.x, -this.maxSpeed*3);
    var steer = JSVector.subGetNew(desire, this.vel);
    steer.limit(this.maxAcc*10);
    this.acc.add(steer);
  }
}

boidClass.prototype.run = function(){
  this.update();
  this.render();
  this.checkEdges();
}

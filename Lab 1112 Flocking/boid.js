function boidClass(x, y, vx, vy, weer){
  this.loc = new JSVector(x, y);
  this.vel = new JSVector(vx, vy);
  this.acc = new JSVector(0, 0);
  this.mag = this.vel.getMagnitude();
  this.id = weer;
  this.maxSpeed = 3;
  this.maxForce = 0.1;
  // this.color = 90;
  // this.colorUp = true;
}

boidClass.prototype.render = function(){
  ctx.strokeStyle = "rgb(0, 0, 0)";
  ctx.lineWidth = '5';
  ctx.fillStyle = "rgb(" + 0 + ", " + ((this.loc.y*0.45)+30) + ", " + ((this.loc.x*0.165)+30) + ")";
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
  // if(this.color < 90){
  //   this.colorUp = true;
  // }if(this.color > 254){
  //   this.colorUp = false;
  // }if(this.colorUp){
  //   this.color++;
  // }else{
  //   this.color--;
  // }
}

boidClass.prototype.update = function() {
    this.vel.add(this.acc);
    this.loc.add(this.vel);
    this.vel.limit(this.maxspeed);
    this.acc.multiply(0);
}

boidClass.prototype.applyForce = function(force){
  this.acc.add(force);
}

boidClass.prototype.flockFunc = function(){
  let sepForce = this.seperate();
  let aliForce = this.align();
  let cohForce = this.cohese();
  sepForce.multiply(2.5);
  aliForce.multiply(1.0);
  cohForce.multiply(1.0);

  this.applyForce(sepForce);
  this.applyForce(aliForce);
  this.applyForce(cohForce);
}

boidClass.prototype.seperate = function(){
  var desiredSep = 25.0;
  var numClose = 0;
  var steer = new JSVector(0, 0);
  for (let a = 0; a < flock.length; a++) {
    let d = this.loc.distance(flock[a].loc);
    if ((d > 0) && (d < desiredSep)) {
      var diff = JSVector.subGetNew(this.loc, flock[a].loc);
      diff.normalize();
      diff.divide(d);
      steer.add(diff);
      numClose++;
    }
  }
  if (numClose > 0) {
    steer.divide(numClose);
  }
  if (steer.getMagnitude() > 0) {
    steer.normalize();
    steer.multiply(sep);
    steer.sub(this.vel);
    steer.limit(this.maxForce);
  }
    return steer;
  }

boidClass.prototype.align = function(){
  var neighbordist = 50;
  var avgVec = new JSVector(0, 0);
  var numClose = 0;
  for (let a = 0; a < flock.length; a++) {
    let d = this.loc.distance(flock[a].loc);
    if ((d > 0) && (d < neighbordist)) {
      avgVec.add(flock[a].vel);
      numClose++;
    }
  }
  if (numClose > 0) {
    avgVec.divide(numClose);
    avgVec.normalize();
    avgVec.multiply(ali);
    let steer = JSVector.subGetNew(avgVec, this.vel);
    steer.limit(this.maxForce);
    return steer;
  } else {
    return new JSVector(0, 0);
  }
}

boidClass.prototype.cohese = function(){
  var neighbordist = 50;
  var avgLoc = new JSVector(0, 0);
  var numClose = 0;
  for(let a = 0; a < flock.length; a++){
    let d = this.loc.distance(flock[a].loc);
    if((d > 0) && (d < neighbordist)){
      avgLoc.add(flock[a].loc);
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

boidClass.prototype.seek = function(target){
  var desired = JSVector.subGetNew(target, this.loc);
  desired.normalize();
  desired.multiply(coh);
  var steer = JSVector.subGetNew(desired, this.vel);
  steer.limit(this.maxForce);
  return steer;
}

boidClass.prototype.checkEdges = function(){
  var desire;
  if(this.loc.x < 40){
    desire = new JSVector(this.maxSpeed, this.vel.y);
    var steer = JSVector.subGetNew(desire, this.vel);
    steer.limit(this.maxForce*5);
    this.acc.add(steer);
  }
  else if(this.loc.x > cnv.width - 40){
    desire = new JSVector(-this.maxSpeed, this.vel.y);
    var steer = JSVector.subGetNew(desire, this.vel);
    steer.limit(this.maxForce*5);
    this.acc.add(steer);
  }
  if(this.loc.y < 40){
    desire = new JSVector(this.vel.x, this.maxSpeed);
    var steer = JSVector.subGetNew(desire, this.vel);
    steer.limit(this.maxForce*5);
    this.acc.add(steer);
  }
  else if(this.loc.y > cnv.height - 40){
    desire = new JSVector(this.vel.x, -this.maxSpeed);
    var steer = JSVector.subGetNew(desire, this.vel);
    steer.limit(this.maxForce*5);
    this.acc.add(steer);
  }
}

boidClass.prototype.run = function(){
  this.flockFunc();
  this.update();
  this.render();
  this.checkEdges();
}

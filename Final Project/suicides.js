function suicideClass(x, y, vx, vy, ax, ay){
  this.loc = new JSVector(x, y);
  this.vel = new JSVector(vx, vy);
  this.acc = new JSVector(ax, ay);
  this.lifeSpanMax = 300;
  this.lifeSpan = this.lifeSpanMax;
  this.maxSpeed = 3;
  this.maxForce = 0.1;
}
/*
Lab Features
  Particle systems
  Collision detection
Behaviors
  Die
  Self-destruction
*/
suicideClass.prototype.render = function(){
  ctx.strokeStyle = "rgb(0, 0, 0)";
  ctx.lineWidth = '5';
  ctx.fillStyle = "rgb(" + 124 + ", " + 0 + ", " + 0 + ")";
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
//Attracts it towards a ball
suicideClass.prototype.peter = function(v2){
    var attractionForce = JSVector.subGetNew(v2.loc, this.loc);
    attractionForce.normalize();
    attractionForce.multiply(0.05);
    this.acc.add(attractionForce);
  }

suicideClass.prototype.update = function(){
  this.vel.add(this.acc);
  this.loc.add(this.vel);
  this.vel.limit(this.maxspeed);
  this.acc.multiply(0);
}

suicideClass.prototype.applyForce = function(force){
  this.acc.add(force);
}

suicideClass.prototype.flockFunc = function(){
  let fleeBall = this.fleeBall();
  let fleeSnake = this.fleeSnake();
  let aliForce = this.align();
  let cohForce = this.cohese();

  fleeBall.multiply(1.5); //1.5
  fleeSnake.multiply(1.5); //1.5
  aliForce.multiply(1); //1.0
  cohForce.multiply(5.5); //5.5

  this.applyForce(fleeBall);
  this.applyForce(fleeSnake);
  this.applyForce(aliForce);
  this.applyForce(cohForce);
}

suicideClass.prototype.align = function(){
  var neighbordist = 50;
  var avgVec = new JSVector(0, 0);
  var numClose = 0;
  for (let a = 0; a < suicides.length; a++) {
    let d = this.loc.distance(suicides[a].loc);
    if ((d > 0) && (d < neighbordist) && (suicides[a].isHunted == false)) {
      avgVec.add(suicides[a].vel);
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

suicideClass.prototype.cohese = function(){
  var neighbordist = 75;
  var avgLoc = new JSVector(0, 0);
  var numClose = 0;
  for(let a = 0; a < suicides.length; a++){
    let d = this.loc.distance(suicides[a].loc);
    if((d > 0) && (d < neighbordist) && (suicides[a].isHunted == false)){
      avgLoc.add(suicides[a].loc);
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

suicideClass.prototype.fleeSnake = function(){
  var desiredSep = 150;
  var numClose = 0;
  var steer = new JSVector(0, 0);
  for (let a = 0; a < snakes.length; a++) {
    let d = this.loc.distance(snakes[a].loc);
    if (d < desiredSep) {
      var diff = JSVector.subGetNew(this.loc, snakes[a].loc);
      diff.normalize();
      diff.divide((d*0.4));
      steer.add(diff);
      numClose++;
    }
  }
  if (numClose > 0) {
    steer.divide(numClose);
  }
  if (steer.getMagnitude() > 0) {
    steer.normalize();
    steer.multiply(5);
    steer.sub(this.vel);
    steer.limit(this.maxForce);
  }
    return steer;
  }

suicideClass.prototype.fleeBall = function(){
  var desiredSep = 225;
  var numClose = 0;
  var steer = new JSVector(0, 0);
  for (let a = 0; a < ball.length; a++) {
    let d = this.loc.distance(ball[a].loc);
    if (d < desiredSep) {
      var diff = JSVector.subGetNew(this.loc, ball[a].loc);
      diff.normalize();
      diff.divide((d*0.4));
      steer.add(diff);
      numClose++;
    }
  }
  if (numClose > 0) {
    steer.divide(numClose);
  }
  if (steer.getMagnitude() > 0) {
    steer.normalize();
    steer.multiply(5);
    steer.sub(this.vel);
    steer.limit(this.maxForce);
  }
    return steer;
  }

suicideClass.prototype.suicideFunc = function(){
  for(let b = 0; b<suicides.length; b++){
    if((this.loc.distance(suicides[b].loc) < 20) && (this.loc.distance(suicides[b].loc) > 0)){
      this.lifeSpan = -100;
      suicides[b].lifeSpan = -100;
      partSys.push(new ParticleClass(this.loc.x, this.loc.y, 0.3*Math.random()-0.15, 0.3*Math.random()-0.15, 0, 0, true));
      partSys.push(new ParticleClass(suicides[b].loc.x, suicides[b].loc.y, 0.3*Math.random()-0.15, 0.3*Math.random()-0.15, 0, 0, true));
    }
  }
}

suicideClass.prototype.seek = function(target){
  var desired = JSVector.subGetNew(target, this.loc);
  desired.normalize();
  desired.multiply(coh);
  var steer = JSVector.subGetNew(desired, this.vel);
  steer.limit(this.maxForce);
  return steer;
}

suicideClass.prototype.checkEdges = function(){
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

suicideClass.prototype.run = function(){
  this.flockFunc();
  this.suicideFunc();
  this.update();
  this.render();
  this.checkEdges();
}

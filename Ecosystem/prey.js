function preyClass(x, y, vx, vy, ax, ay, radius){
  this.radius = radius;
  this.loc = new JSVector(x, y);
  this.vel = new JSVector(vx, vy);
  this.acc = new JSVector(ax, ay);
  this.isHunted = false; //detects if it's been hunted before
  this.lifeSpanMax = 300;
  this.lifeSpan = this.lifeSpanMax;
  this.maxSpeed = 3;
  this.maxForce = 0.1;
}

preyClass.prototype.render = function(){
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
}
//Attracts it towards a ball
preyClass.prototype.peter = function(v2){
    var attractionForce = JSVector.subGetNew(v2.loc, this.loc);
    attractionForce.normalize();
    attractionForce.multiply(0.05);
    this.acc.add(attractionForce);
  }

preyClass.prototype.update = function(){
  this.vel.add(this.acc);
  this.loc.add(this.vel);
  this.vel.limit(this.maxspeed);
  this.acc.multiply(0);
  //Makes the lifespan of the prey work, and reset
  if(this.isHunted){
    this.lifeSpan-=1;
  }
  if(this.isHunted === false){
    this.lifeSpan = this.lifeSpanMax;
  }
}
preyClass.prototype.applyForce = function(force){
  this.acc.add(force);
}

preyClass.prototype.flockFunc = function(){
  let sepForce = this.seperate();
  let fleeBall = this.fleeBall();
  let fleeSnake = this.fleeSnake();
  let aliForce = this.align();
  let cohForce = this.cohese();

  sepForce.multiply(2.5); //2.5
  fleeBall.multiply(3.5); //3.5
  fleeSnake.multiply(1.5); //1.5
  aliForce.multiply(1.0); //1.0
  cohForce.multiply(1.0); //1.0

  this.applyForce(sepForce);
  this.applyForce(fleeBall);
  this.applyForce(fleeSnake);
  this.applyForce(aliForce);
  this.applyForce(cohForce);
}

preyClass.prototype.seperate = function(){
  var desiredSep = 25.0;
  var numClose = 0;
  var steer = new JSVector(0, 0);
  for (let a = 0; a < prey.length; a++) {
    let d = this.loc.distance(prey[a].loc);
    if ((d > 0) && (d < desiredSep) && (prey[a].isHunted == false)) {
      var diff = JSVector.subGetNew(this.loc, prey[a].loc);
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

preyClass.prototype.align = function(){
  var neighbordist = 50;
  var avgVec = new JSVector(0, 0);
  var numClose = 0;
  for (let a = 0; a < prey.length; a++) {
    let d = this.loc.distance(prey[a].loc);
    if ((d > 0) && (d < neighbordist) && (prey[a].isHunted == false)) {
      avgVec.add(prey[a].vel);
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

preyClass.prototype.cohese = function(){
  var neighbordist = 50;
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

preyClass.prototype.fleeSnake = function(){
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

  preyClass.prototype.fleeBall = function(){
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

preyClass.prototype.seek = function(target){
  var desired = JSVector.subGetNew(target, this.loc);
  desired.normalize();
  desired.multiply(coh);
  var steer = JSVector.subGetNew(desired, this.vel);
  steer.limit(this.maxForce);
  return steer;
}

preyClass.prototype.checkEdges = function(){
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
preyClass.prototype.run = function(){
  this.flockFunc();
  this.update();
  this.render();
  this.checkEdges();
}

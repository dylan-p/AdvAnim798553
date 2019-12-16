function runnerClass(x, y, vx, vy, ax, ay, radius){
  this.radius = radius;
  this.loc = new JSVector(x, y);
  this.vel = new JSVector(vx, vy);
  this.tails = [];
  this.acc = new JSVector(0, 0);
  this.mag = this.vel.getMagnitude();
  this.newVector = new JSVector(vx, vy);
  this.lifeSpanMax = 300;
  this.lifeSpan = this.lifeSpanMax;
  // color values
  this.s1 = 255;
  this.s2 = 215;
  this.s3 = 0;
  this.c1 = this.s1*0.8;
  this.c2 = this.s2*0.8;
  this.c3 = this.s3*0.8;
  // color values
  this.tails[0] = new tailClass(this, this, this.radius*0.1, 0);
  for(let a = 1; a<35; a++){
      this.tails[a] = new tailClass(this, this.tails[a-1], this.tails[a-1].length, a);
  }
}
/*
Lab Features
  Repulsion
  Snake Code
  Collision detection
Behaviors
  Flee
  Die
  Hide
    Will hide around the ball in the middle of the ball array
Color
 Yellow
*/
runnerClass.prototype.render = function(){
  ctx.strokeStyle = "rgb(" + this.s1  + "," + this.s2 + "," + this.s3 + ")";
  ctx.lineWidth = '3';
  ctx.fillStyle = "rgb(" + this.c1 + "," + this.c2 + "," + this.c3 + ")";
  //makes the head
  ctx.beginPath();
  ctx.arc(this.loc.x, this.loc.y, this.radius, 0, Math.PI*2, false);
  ctx.stroke();
  ctx.fill();
  //makes the tail
}

runnerClass.prototype.hideFunc = function(){
  var seekLoc = ball[ball.length/2].loc;
  var addAcc = this.seek(seekLoc);
  addAcc.multiply(0.2) //0.2;
  this.acc.add(addAcc);
  let fleeSnake = this.fleeSnake();
  fleeSnake.multiply(1.5); //1.5
  this.acc.add(fleeSnake);
}

runnerClass.prototype.fleeSnake = function(){
  var desiredSep = 75;
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

runnerClass.prototype.seek = function(target){
  var desired = JSVector.subGetNew(target, this.loc);
  desired.normalize();
  desired.multiply(coh);
  var steer = JSVector.subGetNew(desired, this.vel);
  steer.limit(0.1);
  return steer;
}

runnerClass.prototype.update = function(){
  this.vel.add(this.acc);
  this.vel.limit(8);
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

runnerClass.prototype.checkEdges = function(){
  var desire;
  if(this.loc.x < 40){
    desire = new JSVector(1, this.vel.y);
    var steer = JSVector.subGetNew(desire, this.vel);
    steer.limit(this.maxForce*5);
    this.acc.add(steer);
  }
  else if(this.loc.x > cnv.width - 40){
    desire = new JSVector(-1, this.vel.y);
    var steer = JSVector.subGetNew(desire, this.vel);
    steer.limit(this.maxForce*5);
    this.acc.add(steer);
  }
  if(this.loc.y < 40){
    desire = new JSVector(this.vel.x, 1);
    var steer = JSVector.subGetNew(desire, this.vel);
    steer.limit(this.maxForce*5);
    this.acc.add(steer);
  }
  else if(this.loc.y > cnv.height - 40){
    desire = new JSVector(this.vel.x, -1);
    var steer = JSVector.subGetNew(desire, this.vel);
    steer.limit(this.maxForce*5);
    this.acc.add(steer);
  }
}

runnerClass.prototype.run = function(){
  this.update();
  this.hideFunc();
  this.render();
  this.checkEdges();
}

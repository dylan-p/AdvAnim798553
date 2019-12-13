
function ballClass(x, y, vx, vy, ax, ay, radius, s1, s2, s3, orbRad, weer, numOrbPass){
  this.radius = radius;
  this.loc = new JSVector(x, y);
  this.vel = new JSVector(vx, vy);
  this.acc = new JSVector(0, 0);
  this.other = new JSVector(cnv.width/2, cnv.height/2);
  this.id = weer;
  this.isHuntingNow = true;
  this.numOrb = numOrbPass;

  // color values
  this.s1 = s1;
  this.s2 = s2;
  this.s3 = s3;
  this.c1 = this.s1*0.8;
  this.c2 = this.s2*0.8;
  this.c3 = this.s3*0.8;
  // color values
  this.orbiter = [];
  this.weer = weer;
  for(let a = 0; a<this.numOrb; a++){
      this.orbiter[a] = new Orbiter(9, 0, 0, orbRad, ((2*Math.PI)/(this.numOrb)*a), this.loc, this);
  }
}

ballClass.prototype.render = function(){
  ctx.strokeStyle = "rgb(" + this.s1 + 20 + "," + this.s2 + 20 + "," + this.s3 + 20 + ")";
  ctx.lineWidth = '6';
  ctx.fillStyle = "rgb(" + this.c1 + 20 + "," + this.c2 + 20 + "," + this.c3 + 20 + ")";

  ctx.save();
  ctx.translate(this.loc.x, this.loc.y);
  ctx.rotate(this.vel.getDirection() - (Math.PI/2));

  ctx.beginPath();
  ctx.moveTo(-27, -36);
  ctx.lineTo(0, 45);
  ctx.lineTo(27, -37);
  ctx.lineTo(0, -9);
  ctx.lineTo(-27, -36);
  ctx.closePath();

//  ctx.scale(((Math.random()*3)+3), ((Math.random()*3)+3));

  ctx.stroke();
  ctx.fill();

  ctx.restore();

  for(let a = 0; a<this.numOrb; a++){
    this.orbiter[a].render();
  }
}

ballClass.prototype.update = function(){
  this.vel.add(this.acc);
  this.vel.limit(2);
  this.loc.add(this.vel);
  for(let a = 0; a<this.orbiter.length; a++){
    this.orbiter[a].update();
  //   if(this.orbiter[a].hasPrey){
  //     this.isHuntingNow = false;
  //   }
  }
  // if(this.isHuntingNow){
    for(let a = 0; a<this.orbiter.length; a++){
      this.orbiter[a].huntFunc();
    }
  // }
  // this.isHuntingNow = true;
}

//Attracts 2 balls when they are within 175 pixels
ballClass.prototype.quentin = function(v2){
  var d = this.loc.distance(v2.loc);
  if(d<175){
    var attractionForce = JSVector.subGetNew(v2.loc, this.loc);
    attractionForce.normalize();
    attractionForce.multiply(0.05);
    this.acc.add(attractionForce);
  }
}

//Attracts 2 balls at any distance
ballClass.prototype.peter = function(v2){
    var attractionForce = JSVector.subGetNew(v2.loc, this.loc);
    attractionForce.normalize();
    attractionForce.multiply(0.05);
    this.acc.add(attractionForce);
  }

//Repels 2 balls within 175 pixels
ballClass.prototype.eric = function(v2){
  var d = this.loc.distance(v2.loc);
  if(d<175){
    var attractionForce = JSVector.subGetNew(this.loc, v2.loc);
    attractionForce.normalize();
    attractionForce.multiply(0.05);
    this.acc.add(attractionForce);
  }
}

ballClass.prototype.checkEdges = function(){
  if((this.loc.x + this.radius > cnv.width && this.vel.x > 0) || (this.loc.x - this.radius < 0 && this.vel.x < 0)){
    this.vel.x = -this.vel.x;
  }

  if((this.loc.y + this.radius > cnv.height && this.vel.y > 0) || (this.loc.y - this.radius < 0 && this.vel.y < 0)){
    this.vel.y = -this.vel.y;
  }
}

ballClass.prototype.run = function(){
  this.update();
  this.render();
  this.checkEdges();
}

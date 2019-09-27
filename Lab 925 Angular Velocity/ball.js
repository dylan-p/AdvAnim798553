
function ballClass(x, y, vx, vy, ax, ay, radius, s1, s2, s3, c1, c2, c3, orbRad){
  this.radius = radius;
  this.loc = new JSVector(x, y);
  this.vel = new JSVector(vx, vy);
  this.acc = new JSVector(ax, ay);
  this.other = new JSVector(cnv.width/2, cnv.height/2);
  this.s1 = s1;
  this.s2 = s2;
  this.s3 = s3;
  this.c1 = c1;
  this.c2 = c2;
  this.c3 = c3;
  this.orbiter = [];
  for(let a = 0; a<numOrb; a++){
    this.orbiter[a] = new Orbiter(9, 0, 0, orbRad, ((2*Math.PI)/(numOrb)*a), this.loc);
  }
}

ballClass.prototype.render = function(){
  ctx.strokeStyle = "rgb(" + this.s1 + "," + this.s2 + "," + this.s3 + ")";
  ctx.lineWidth = '6';
  ctx.fillStyle = "rgb(" + this.c1 + "," + this.c2 + "," + this.c3 + ")";

  ctx.beginPath();
  ctx.moveTo(this.loc.x, this.loc.y);
  ctx.lineTo(this.loc.x, this.loc.y+(this.radius));
  ctx.lineTo(this.loc.x+(this.radius), this.loc.y);
  ctx.closePath();
  //ctx.triange(this.loc.x, this.loc.y, this.loc.x+this.radius, this.loc.y+this.radius, this.loc.x-this.radius, this.loc.y+this.radius);
  ctx.fill();
  ctx.stroke();
  for(let a = 0; a<numOrb; a++){
  this.orbiter[a].render();
  }
}

ballClass.prototype.update = function(){
  this.vel.add(this.acc);
  this.loc.add(this.vel);
  for(let a = 0; a<numOrb; a++){
    this.orbiter[a].update();
  }
}

ballClass.prototype.quentin = function(v2){
  var d = this.loc.distance(v2.loc);
  if(d<175){
    var attractionForce = JSVector.subGetNew(v2.loc, this.loc);
    attractionForce.normalize();
    attractionForce.multiply(0.05);
    this.acc.add(attractionForce);
  }
}

ballClass.prototype.eric = function(v2){
  var d = this.loc.distance(v2.loc);
  if(d<175){
    var attractionForce = JSVector.subGetNew(this.loc, v2.loc);
    attractionForce.normalize();
    attractionForce.multiply(0.05);
    this.acc.add(attractionForce);
  }
}
/*
ballClass.prototype.peter = function(v2){
  var d = this.loc.distance(v2.loc);
  var xdist = d*Math.cos(this.loc.angleBetween(v2.loc));
  var ydist = d*Math.sin(this.loc.angleBetween(v2.loc));
  if(d<175){
    this.loc.x = this.loc.x + xdist;
    this.loc.y = this.loc.y + ydist;
  }
}
*/
ballClass.prototype.checkEdges = function(){
  if(this.loc.x + this.radius > cnv.width || this.loc.x - this.radius < 0){
    this.vel.x = -this.vel.x;
  }

  if(this.loc.y + this.radius > cnv.height || this.loc.y - this.radius < 0){
    this.vel.y = -this.vel.y;
  }
}

ballClass.prototype.run = function(){
  this.update();
  this.render();
  this.checkEdges();
}

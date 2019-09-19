function ballClass(x, y, vx, vy, ax, ay, radius){
  this.radius = radius;
  this.loc = new JSVector(x, y);
  this.vel = new JSVector(vx, vy);
  this.acc = new JSVector(ax, ay);
  this.other = new JSVector(cnv.width/2, cnv.height/2);
}

ballClass.prototype.render = function(){
  ctx.strokeStyle = 'rgb(85, 107, 47)';
  ctx.lineWidth = '6';
  ctx.fillStyle = 'rgb(255, 140, 0)';

  ctx.beginPath();
  ctx.moveTo(this.loc.x, this.loc.y);
  ctx.lineTo(this.loc.x, this.loc.y+this.radius);
  ctx.lineTo(this.loc.x+this.radius, this.loc.y);
  ctx.closePath();
  //ctx.triange(this.loc.x, this.loc.y, this.loc.x+this.radius, this.loc.y+this.radius, this.loc.x-this.radius, this.loc.y+this.radius);
  ctx.fill();
  ctx.stroke();

}

ballClass.prototype.update = function(){
  this.vel.add(this.acc);
  this.loc.add(this.vel);
}

ballClass.prototype.applyForce = function(v2){
  /*this.acc.setMagnitude(0);
  var force;
  if(bool){
    force = JSVector.addGetNew(loc, this.loc);
  }
  else{
    force = JSVector.subGetNew(loc, this.loc)
  }
  force.normalize();
  force.multiply(0.5);
  this.acc.add(force);*/
  var d = this.loc.distance(v2.loc);
  if(d<500){
    var attractionForce = JSVector.subGetNew(v2.loc, this.loc);
    //finish next class
  }
}



ballClass.prototype.checkEdges = function(){
  if(this.loc.x + this.radius > cnv.width || this.loc.x - this.radius < 0){
    this.vel.x = -this.vel.x;
  }

  if(this.loc.y + this.radius > cnv.height || this.loc.x - this.radius < 0){
    this.vel.y = -this.vel.y;
  }
}

ballClass.prototype.run = function(){
  this.update();
  this.render();
  this.checkEdges();
}

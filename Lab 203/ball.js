function ballClass(x, y, vx, vy, ax, ay, radius){
  this.radius = radius;
  this.loc = new JSVector(x, y);
  this.vel = new JSVector(vx, vy);
  this.force = new JSVector(ax, ay);
}

ballClass.prototype.render = function(){
  ctx.strokeStyle = 'rgb(85, 107, 47)';
  ctx.lineWidth = '10';
  ctx.fillStyle = 'rgb(255, 140, 0)';

  ctx.beginPath();
  ctx.arc(this.loc.x, this.loc.y, 30, 0, Math.PI*2, true);
  ctx.fill();
  ctx.stroke();
}

ballClass.prototype.update = function(){
  this.loc.add(this.vel);
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

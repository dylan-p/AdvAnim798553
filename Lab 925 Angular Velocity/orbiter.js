function Orbiter(radius, x, y, orbitRadius){
  this.radius = radius;
  this.loc = new JSVector(x, y);
  this.angle = 0;
  this.orbitRadius = orbitRadius;
}

Orbiter.prototype.render = function(){
  ctx.strokeStyle = 'rgb(85, 107, 47)';
  ctx.lineWidth = '10';
  ctx.fillStyle = 'rgb(255, 140, 0)';

  ctx.beginPath();
  ctx.arc(this.loc.x, this.loc.y, this.radius, 0, Math.PI*2, true);
  ctx.fill();
  ctx.stroke();
}

Orbiter.prototype.update = function(){
    this.loc.x = ball.loc.x + this.orbitRadius*Math.cos(this.angle);
    this.loc.y = ball.loc.x + this.orbitRadius*Math.sin(this.angle);
    this.angle += 0.1
}

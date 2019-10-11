function Particles(x, y, vx, vy, ax, ay, radius, lsp){
  this.radius = radius;
  this.loc = new JSVector(x, y);
  this.vel = new JSVector(vx, vy);
  this.acc = new JSVector(ax, ay);
  this.particles = [];
  this.lifeSpan = lsp;
}

Particles.prototype.render = function(){
  ctx.strokeStyle = 'rgb(211, 211, 211)';
  ctx.lineWidth = '10';
  ctx.fillStyle = 'rgb(211, 211, 211)';

  ctx.beginPath();
  ctx.arc(this.loc.x, this.loc.y, this.radius, 0, Math.PI*2, true);
  ctx.fill();
  ctx.stroke();
  ctx.lineWidth = '1';
  ctx.strokeStyle = 'rgb(1, 1, 1)';
  ctx.stroke();
  ctx.closePath();
}

Particles.prototype.update = function(){
  this.vel.add(this.acc);
  this.loc.add(this.vel);
  this.lifeSpan-=1;
}

Particles.prototype.run = function(){
  this.update();
  this.render();
}

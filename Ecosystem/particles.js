function Particles(x, y, vx, vy, ax, ay, radius, lsp){
  this.radius = radius;
  this.loc = new JSVector(x, y);
  this.vel = new JSVector(vx, vy);
  this.acc = new JSVector(ax, ay);
  this.particles = [];
  this.lifeSpan = lsp;
}

Particles.prototype.render = function(){
  ctx.strokeStyle = 'rgb(211, 0, 0)';
  ctx.lineWidth = '1';
  ctx.fillStyle = 'rgb(211, 0, 0)';

  ctx.save();
  ctx.translate(this.loc.x, this.loc.y);

  ctx.beginPath();
  ctx.arc(0, 0, 4.5, 0, Math.PI*2, true);
  ctx.fill();
  ctx.stroke();
  ctx.closePath();

  ctx.restore();
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

function ParticleClass(x, y, vx, vy, ax, ay){
  this.loc = new JSVector(x, y);
  this.vel = new JSVector(vx, vy);
  this.acc = new JSVector(ax, ay);
  this.particles = [];
  this.lifeSpanSpan = 690-500;
}

  ParticleClass.prototype.render = function(){
    ctx.strokeStyle = 'rgb(200, 0, 0)';
    ctx.lineWidth = '10';
    ctx.fillStyle = 'rgb(200, 0, 0)';

    ctx.beginPath();
    ctx.arc(this.loc.x, this.loc.y, 40, 0, Math.PI*2, true);
    ctx.fill();
    ctx.stroke();
 }

ParticleClass.prototype.update = function(){
  this.vel.add(this.acc);
  this.loc.add(this.vel);
}

ParticleClass.prototype.checkEdges = function(){
  if(this.loc.x > cnv.width || this.loc.x - this.radius < 0){
    this.vel.x = -this.vel.x;
  }

  if(this.loc.y > cnv.height || this.loc.y - this.radius < 0){
    this.vel.y = -this.vel.y;
  }
}

ParticleClass.prototype.run = function(){
  this.update();
  this.render();
  this.checkEdges();
  this.particles.push(new Particles(this.loc.x, this.loc.y, 6*Math.random()-3, 6*Math.random()-3, 1*Math.random()-0.5, 1*Math.random()-0.5, 20*Math.random()+2, 30));
  for(let a = this.particles.length-1; a>=0; a--){
    if(this.particles[a].lifeSpan <= 0){
      this.particles.splice(a, 1);
    }
    else{
      this.particles[a].run();
    }
  }
  this.lifeSpanSpan -=1;
}

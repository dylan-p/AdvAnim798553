function ParticleClass(x, y, vx, vy, ax, ay, compl){
  this.loc = new JSVector(x, y);
  this.vel = new JSVector(vx, vy);
  this.acc = new JSVector(ax, ay);
  this.particles = [];
  this.lifeSpanSpan = 690-500;
  this.makeNew = 0;
  this.complex = compl;
}

ParticleClass.prototype.render = function(){
  if(this.complex){
    ctx.strokeStyle = 'rgb(211, 0, 0)';
    ctx.lineWidth = '10';
    ctx.fillStyle = 'rgb(211, 0, 0)';
    ctx.beginPath();
    ctx.arc(this.loc.x, this.loc.y, 7.5, 0, Math.PI*2, true);
    ctx.fill();
    ctx.stroke();
  }
  else{
    ctx.strokeStyle = 'rgb(150, 75, 0)';
    ctx.lineWidth = '10';
    ctx.fillStyle = 'rgb(150, 75, 0)';
    ctx.beginPath();
    ctx.arc(this.loc.x, this.loc.y, 7.5, 0, Math.PI*2, true);
    ctx.fill();
    ctx.stroke();
  }
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
  if(this.complex){
    if(this.makeNew == 0){
        this.particles.push(new Particles(this.loc.x, this.loc.y, 6*Math.random()-3, 6*Math.random()-3, 1*Math.random()-0.5, 1*Math.random()-0.5, 20*Math.random()+2, 30));
    }
    this.makeNew++;
    if(this.makeNew > 9){
      this.makeNew = 0;
    }
    for(let a = this.particles.length-1; a>=0; a--){
      if(this.particles[a].lifeSpan <= 0){
        this.particles.splice(a, 1);
      }
      else{
        this.particles[a].run();
      }
    }
    this.lifeSpanSpan -=1.5;
  }

  this.lifeSpanSpan -=1;
}

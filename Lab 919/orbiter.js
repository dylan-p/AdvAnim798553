function Orbiter(radius, x, y, orbitRadius){
  this.radius = radius;
  this.loc = new JSVector(x, y);
  this.angle = 0;
  this.orbitRadius = orbitRadius;
}

Orbiter.prototype.render = function(){
    ctx.ellipse(this.loc.x, this.loc.y, this.radius, this.radius);
}

Orbiter.prototype.update = function(){
    
}

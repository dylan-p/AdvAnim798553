
function ballClass(x, y, vx, vy, ax, ay, radius, s1, s2, s3, c1, c2, c3, weer){
  this.radius = radius;
  this.loc = new JSVector(x, y);
  this.vel = new JSVector(vx, vy);
  this.acc = new JSVector(ax, ay);
  this.s1 = s1;
  this.s2 = s2;
  this.s3 = s3;
  this.c1 = c1;
  this.c2 = c2;
  this.c3 = c3;
  this.weer = weer;
}

ballClass.prototype.render = function(){
  ctx.strokeStyle = "rgb(" + this.s1 + "," + this.s2 + "," + this.s3 + ")";
  ctx.lineWidth = '6';
  ctx.fillStyle = "rgb(" + this.c1 + "," + this.c2 + "," + this.c3 + ")";

  ctx.beginPath();
  ctx.arc(100, 100, this.radius, 0, Math.PI*2, true);
  ctx.fill();
  ctx.stroke();
}

ballClass.prototype.update = function(){
  }

ballClass.prototype.run = function(){
  this.update();
  this.render();
}

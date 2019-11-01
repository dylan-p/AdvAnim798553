//
function snakeClass(x, y, vx, vy, ax, ay, radius, s1, s2, s3, c1, c2, c3, orbRad, weer){
  this.radius = radius;
  this.loc = new JSVector(x, y);
  this.vel = new JSVector(vx, vy);
  this.points = [];
  this.acc = new JSVector(0, 0);
//
//   // color values
  this.s1 = s1;
  this.s2 = s2;
  this.s3 = s3;
  this.c1 = c1;
  this.c2 = c2;
  this.c3 = c3;
  // color values
  this.orbiter = [];
  this.id = weer;
  // for(let a = 0; a<numOrb; a++){
  //     this.orbiter[a] = new Orbiter(9, 0, 0, orbRad, ((2*Math.PI)/(numOrb)*a), this.loc, this);
  // }
}

snakeClass.prototype.render = function(){
  ctx.strokeStyle = "rgb(" + this.s1 + 20 + "," + this.s2 + 20 + "," + this.s3 + 20 + ")";
  ctx.lineWidth = '1';
  ctx.fillStyle = "rgb(" + this.c1 + 20 + "," + this.c2 + 20 + "," + this.c3 + 20 + ")";
  //makes the head
  ctx.beginPath();
  ctx.arc(this.loc.x, this.loc.y, this.radius, 0, Math.PI*2, false);
  ctx.stroke();
  ctx.fill();
  //makes the tail
  for(let a = 0; a<this.points.length; a++){
    ctx.beginPath();
    ctx.arc(this.points[a].x, this.points[a].y, this.radius/2, 0, Math.PI*2, false);
    ctx.stroke();
    ctx.fill();
  }
}

snakeClass.prototype.update = function(){
  this.vel.add(this.acc);
  this.vel.limit(2);
  this.loc.add(this.vel);
  var newPoint = new JSVector(this.loc.x, this.loc.y);
  this.points.push(newPoint);
  if(this.points.length>50){
    this.points.splice(0, 1);
  }
}

snakeClass.prototype.checkEdges = function(){
  if((this.loc.x + this.radius > cnv.width && this.vel.x > 0) || (this.loc.x - this.radius < 0 && this.vel.x < 0)){
    this.vel.x = -this.vel.x;
  }

  if((this.loc.y + this.radius > cnv.height && this.vel.y > 0) || (this.loc.y - this.radius < 0 && this.vel.y < 0)){
    this.vel.y = -this.vel.y;
  }
}
//
snakeClass.prototype.run = function(){
  this.update();
  this.render();
  this.checkEdges();
}

//
function snakeClass(x, y, vx, vy, ax, ay, radius, s1, s2, s3, c1, c2, c3, orbRad, weer){
  this.radius = radius;
  this.loc = new JSVector(x, y);
  this.vel = new JSVector(vx, vy);
  this.points = [];
  this.points.push(new JSVector(x, y-10));
  this.points.push(new JSVector(x, y-30));
  this.points.push(new JSVector(x, y-50));
  this.points.push(new JSVector(x, y-70));
  this.acc = new JSVector(0, 0);
//   this.other = new JSVector(cnv.width/2, cnv.height/2);
//   this.id = weer;
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
  this.weer = weer;
  // for(let a = 0; a<numOrb; a++){
  //     this.orbiter[a] = new Orbiter(9, 0, 0, orbRad, ((2*Math.PI)/(numOrb)*a), this.loc, this);
  // }
}

snakeClass.prototype.render = function(){
  ctx.strokeStyle = "rgb(" + this.s1 + 20 + "," + this.s2 + 20 + "," + this.s3 + 20 + ")";
  ctx.lineWidth = '6';
  ctx.fillStyle = "rgb(" + this.c1 + 20 + "," + this.c2 + 20 + "," + this.c3 + 20 + ")";

  ctx.save();
  ctx.translate(this.loc.x, this.loc.y);
  ctx.rotate(this.vel.getDirection() - (Math.PI/2));

  ctx.beginPath();
  ctx.moveTo(0,0);
  ctx.arc(this.loc.x, this.loc.y, this.radius, 0, Math.PI*2, true);
  ctx.closePath();
  for(let a = 0; a<this.points.length; a++){
    ctx.arc(this.points[a].x*0.2, this.points[a].y*0.2, 5, 0, Math.PI*2, true);
  }

//  ctx.scale(((Math.random()*3)+3), ((Math.random()*3)+3));

  ctx.stroke();
  ctx.fill();

  ctx.restore();

  // for(let a = 0; a<numOrb; a++){
  //   this.orbiter[a].render();
  // }
}

snakeClass.prototype.update = function(){
  this.vel.add(this.acc);
  this.vel.limit(2);
  this.loc.add(this.vel);
  for(let a = 0; a<this.points.length; a++){
    this.points[a].x = this.loc.x;
    this.points[a].y = this.loc.y;
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

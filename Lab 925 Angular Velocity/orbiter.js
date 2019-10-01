function Orbiter(radius, x, y, orbRad, angle, ballLoc, balNum){
  this.radius = radius;
  this.loc = new JSVector(x, y);
  this.angle = angle;
  this.orbRad = orbRad;
  this.ballLoc = ballLoc;
  this.inOut = false;
  this.balNum = balNum;
}

Orbiter.prototype.render = function(){
  ctx.strokeStyle = 'rgb(139, 0, 0)';
  ctx.lineWidth = '10';
  ctx.fillStyle = 'rgb(139, 0, 0)';

  ctx.beginPath();
  ctx.arc(this.loc.x, this.loc.y, this.radius, 0, Math.PI*2, true);
  ctx.fill();
  ctx.stroke();
  ctx.lineWidth = '1';
  ctx.strokeStyle = 'rgb(1, 1, 1)';
  ctx.moveTo(this.ballLoc.x, this.ballLoc.y);
  ctx.lineTo(this.loc.x, this.loc.y);
  ctx.stroke();
  ctx.closePath();
}

Orbiter.prototype.update = function(){
    this.loc.x = this.ballLoc.x + this.orbRad*Math.cos(this.angle);
    this.loc.y = this.ballLoc.y + this.orbRad*Math.sin(this.angle);
    this.angle += 0.01;
  /*  if(this.orbRad<20){
      this.inOut = false;
    }
    if(this.orbRad>330){
        this.inOut = true;
      }*/
    /*if(this.inOut == false){
        this.orbRad+=6;
    }
    if(this.inOut == true){
        this.orbRad-=0;
      }*/

    for(b = 0; b < numBal; b++){
      if((ball[this.balNum].loc.distance(ball[b].loc) < 200) && ball[this.balNum]!=ball[b]){
          this.orbRad = 200;
      }else{
        this.orbRad = 75;

      }
    }
}

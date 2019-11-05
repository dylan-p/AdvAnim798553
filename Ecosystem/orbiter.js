function Orbiter(radius, x, y, orbRad, angle, ballLoc, parentBal){
  this.radius = radius;
  this.loc = new JSVector(x, y);
  this.angle = angle;
  this.orbRad = 50;
  this.orbRadMax = this.orbRad;
  this.ballLoc = ballLoc;
  this.inOut = 3;
  this.parent = parentBal;
  this.extended = false;
  this.hunting; //determines which prey the orbiter is hunting
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
    this.angle += 0.001;
   // if(this.orbRad<20){
   //    this.inOut = false;
   //  }
   //  if(this.orbRad>330){
   //      this.inOut = true;
   //    }
   //Start of orbiter extension code
   for(let b = 0; b<prey.length; b++){
     //Sets initial hunted state, goes on the prey
     if((this.loc.distance(prey[b].loc) < 100) && (prey[b].isHunted === false)){
       this.orbRad = this.loc.distance(prey[b].loc);
       prey[b].loc = this.loc;
       prey[b].vel.setMagnitude = 0;
       prey[b].isHunted = true;
       this.hunting = b;
     }
     if((this.loc.distance(prey[b].loc) < 100) && prey[b].isHunted && (b == this.hunting)){
       //starts pulling the prey in
       if(this.orbRad > this.orbRadMax){
         this.orbRad-=1;
         prey[b].loc = this.loc;
       }
       this.lifeSpan -=1;
     }
     //Resets variables for orbiter so it can begin hunting again
     if((prey[b].lifeSpan <=0) && (b == this.hunting) && prey[b].isHunted){
       this.hunting = -1;
       prey[b].isHunted = false;
       this.orbRad = this.orbRadMax;
     }
   }
     //End of orbiter extension code
    // if(this.inOut == 1){
    //     this.orbRad+=6;
    // }
    // if(this.inOut == 2){
    //     this.orbRad-=4;
    // }
    // if(this.inOut == 3){
    //     this.orbRad-=0;
    // }
}
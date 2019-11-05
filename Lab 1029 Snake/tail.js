function tailClass(head, tailFront, tailLength, id){
  this.head = head;
  this.length = tailLength;
  this.loc = new JSVector(tailFront.loc.x, tailFront.loc.y+this.length);
  this.frontTail = tailFront;
  this.orbiter = [];
  this.distanceFront = this.loc.distance(this.frontTail.loc);
  this.id = id+1;
}

tailClass.prototype.render = function(){
  ctx.strokeStyle = "rgba(20, 160, 20, "+ (1/this.id) +")";
  ctx.lineWidth = '5';
  ctx.fillStyle = "rgba(20, 160, 201/"+ (1/this.id) +")";
  ctx.save();
  ctx.translate(this.loc.x, this.loc.y);
  ctx.rotate(this.getAngle() - (Math.PI/2));

  ctx.beginPath();
  ctx.moveTo(0, 0);
  ctx.lineTo(0, 0);
  ctx.lineTo(0, -this.length);
  ctx.stroke();
  ctx.fill();
  ctx.restore();
}

tailClass.prototype.update = function(){
    var angle = this.getAngle();
    this.loc.x = this.frontTail.loc.x - this.distanceFront * Math.cos(angle);
    this.loc.y = this.frontTail.loc.y - this.distanceFront * Math.sin(angle);
}

tailClass.prototype.getAngle = function(){
    var angle = JSVector.subGetNew(this.frontTail.loc, this.loc);
    return angle.getDirection();
}

tailClass.prototype.run = function(){
  this.update();
  this.render();
}
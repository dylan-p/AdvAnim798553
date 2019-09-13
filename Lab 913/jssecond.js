window.onload = init;+
var ctx;
var cnv;
/*var radius = [];
var loc = [[]];
var vel = [[]];
var numBal = 100;
var accel = new JSVector(0, 0.098);
*/
var ball;

function init(){
  cnv = document.getElementById('cnv');
  cnv.width = window.innerWidth;
  cnv.height = window.innerHeight;
  cnv.style.border = 'solid black 2px';
  cnv.style.backgroundColor = 'rgba(0,44,55, .5)';
  ctx = cnv.getContext('2d');
  ball = new ballClass(Math.random()*window.innerWidth, Math.random()*window.innerHeight, Math.random()*3, -Math.random()*3, 0, 0.05, 30*Math.random())
/*for(let a= 0; a<numBal; a++){
  loc[a] = new JSVector(Math.random()*window.innerWidth, Math.random()*window.innerHeight);
  vel[a] = new JSVector(Math.random()*3, -Math.random()*3);
  radius[a] = 30*Math.random();
}
*/
animate();
}

function animate(){
  requestAnimationFrame(animate);
  ballClass.run();
/*
  ctx.strokeStyle = 'rgb(85, 107, 47)';
  ctx.lineWidth = '10';
  ctx.fillStyle = 'rgb(255, 140, 0)';
    for(let a = 0; a<numBal; a++){
      ctx.beginPath();
      ctx.arc(loc[a].x,loc[a].y, radius[a], Math.PI*2, 0, false);
      ctx.fill();
      ctx.stroke();
      vel[a].add(accel);
      loc[a].add(vel[a]);
        if(loc[a].x > window.innerWidth || loc[a].x<0) vel[a].x = -vel[a].x;
        if(loc[a].y > window.innerHeight || loc[a].y<0) vel[a].y = -vel[a].y;
      }*/
}

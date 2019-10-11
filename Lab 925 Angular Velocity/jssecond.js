window.onload = init;
var ctx;
var cnv;
var numBal = 2;
var numOrb = 10;
var ball = [];
var bnw;
var partSys;

function init(){
  cnv = document.getElementById('cnv');
  cnv.width = window.innerWidth;
  cnv.height = window.innerHeight;
  cnv.style.border = 'solid black 2px';
  cnv.style.backgroundColor = 'rgba(0,44,55, 0.1575)';
  ctx = cnv.getContext('2d');
 for(let a = 0; a<numBal; a++){
    ball[a] = new ballClass(Math.random()*window.innerWidth, Math.random()*window.innerHeight, Math.random()*3, -Math.random()*3, 0, 0.03, 50*Math.random()+15, 255*Math.random(), 255*Math.random(), 255*Math.random(), 255*Math.random(), 255*Math.random(), 255*Math.random(), 50+Math.random()*300, a);
 }
  partSys = new ParticleClass(400, 400, 1, 1, 0, 0);
animate();
}

function animate(){
  requestAnimationFrame(animate);
  ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);
  for(let a = 0; a<numBal; a++){
    ball[a].run();
  }
  partSys.run();
}

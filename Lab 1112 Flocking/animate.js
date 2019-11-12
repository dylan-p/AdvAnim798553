window.onload = init;
var ctx;
var cnv;
var numFlock = 10;
var flock = [];

function init(){
  cnv = document.getElementById('cnv');
  cnv.width = window.innerWidth;
  cnv.height = window.innerHeight;
  cnv.style.border = 'solid black 2px';
  cnv.style.backgroundColor = 'rgba(0,44,55, 0.1575)';
  ctx = cnv.getContext('2d');
 for(let a = 0; a<numFlock; a++){
    flock[a] = new boidClass(Math.random()*window.innerWidth, Math.random()*window.innerHeight, Math.random()*3, -Math.random()*3, a);
 }
animate();
}

function animate(){
  requestAnimationFrame(animate);
  ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);
  //Runs hunters
  for(let a = 0; a<numFlock; a++){
    flock[a].run();
  }
}

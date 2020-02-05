window.onload = init;
var ctx;
var cnv;
var numBal = 10;
var ball = [];

function init(){
  cnv = document.getElementById('cnv');
  cnv.width = 800;
  cnv.height = 600;
  cnv.style.border = 'solid black 2px';
  cnv.style.backgroundColor = 'rgba(0,44,55, .5)';
  ctx = cnv.getContext('2d');
  for(let a = 0; a<numBal; a++){
    var rad = 30*Math.random();
    ball[a] = new ballClass(Math.random()*window.innerWidth, Math.random()*window.innerHeight, 0, 0, 0, 0, rad)
}

animate();
}

document.addEventListener('keydown', (e) => {
  if (e.code === "ArrowUp")      ctx.translate(0, 25)
  else if (e.code === "ArrowDown")      ctx.translate(0, -25)
  else if (e.code === "ArrowLeft")      ctx.translate(25, 0)
  else if (e.code === "ArrowRight")      ctx.translate(-25, 0)
  animate();
});

function animate(){
  requestAnimationFrame(animate);
  ctx.clearRect(-3000, -4000, 6000, 8000);
  for(let a = 0; a<numBal; a++){
  ball[a].run();
}
}

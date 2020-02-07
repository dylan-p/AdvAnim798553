window.onload = init;
var ctx;
var cnv;
var MINIcnv;
var MINIctx;
var numBal = 10;
var ball = [];
var ballMINI = [];

function init(){
  cnv = document.getElementById('cnv');
  ctx = cnv.getContext('2d');
  MINIcnv = document.getElementById('cnvMINI');
  MINIctx = MINIcnv.getContext('2d');
  cnv.width = 800;
  cnv.height = 600;
  cnv.style.border = 'solid black 2px';
  cnv.style.backgroundColor = 'rgba(0,44,55, .5)';
  for(let a = 0; a<numBal; a++){
    var rad = 30;
    ball[a] = new ballClass(Math.random()*window.innerWidth-Math.random()*window.innerWidth, Math.random()*window.innerHeight-Math.random()*window.innerHeight, 0, 0, 0, 0, rad);
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
  ctx.clearRect(-3000, -2000, 4000, 6000);
  ctx.fillRect(-10, -10, 50, 50);
  MINIctx.fillStyle = "rgba(0,44,55, .5)";
  MINIctx.fillRect(0, 0, 200, 200);
  MINIctx.fillStyle = "rgba(255, 255 ,255, .5)";
  MINIctx.strokeStyle = "rgba(255, 255 ,255, .5)";
  for(let a = 0; a<numBal; a++){
    ball[a].run();
    MINIctx.beginPath();
    MINIctx.arc((MINIcnv.width/2)+ball[a].loc.x/10, (MINIcnv.height/2)+ball[a].loc.y/10, ball[a].radius/10, 0, Math.PI*2, true);
    MINIctx.stroke();
  }
  MINIctx.fillRect(MINIcnv.width/2, MINIcnv.height/2, 10, 10);
  MINIctx.arc(100, 100, 10, 0, Math.PI*2, true);
}

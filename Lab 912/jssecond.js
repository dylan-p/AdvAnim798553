
var ctx;
var cnv;
var x = [];
var y = [];
var radius = [];

window.onload = init;

function init(){
  cnv = document.getElementById('cnv');
  cnv.width = window.innerWidth;
  cnv.height = window.innerHeight;
  cnv.style.border = 'solid black 2px';
  cnv.style.backgroundColor = 'rgba(0,44,55, .5)';
  ctx = cnv.getContext('2d');
for(let a= 0; a<1; a++){
  var v1 = new JSVector(Math.random()*10 - 5, Math.random()*10 - 5);
x[a] = Math.random()*window.innerWidth;
y[a] = Math.random()*window.innerHeight;
radius[a] = 30*Math.random();
}
animate();
}

function animate(){
  /*requestAnimationFrame(animate);
  ctx.clearRect(0,0,window.innerWidth,window.innerHeight);

  ctx.strokeStyle = 'rgb(85, 107, 47)';
  ctx.lineWidth = '10';
  ctx.fillStyle = 'rgb(255, 140, 0)';
    for(let a = 0; a<1; a++){
      ctx.beginPath();
      ctx.arc(x[a],y[a], radius[a], Math.PI*2, 0, false);
      ctx.fill();
      ctx.stroke();

      x[a] +=dx[a];
      y[a] +=dy[a];
        if(x > window.innerWidth || x[a]<0) dx[a] = -dx[a];
        if(y > window.innerHeight || y[a]<0) dy[a] = -dy[a];
      }*/

      requestAnimationFrame(animate);
      ctx.clearRect(0,0,window.innerWidth,window.innerHeight);
      ctx.strokeStyle = 'rgb(85, 107, 47)';
      ctx.lineWidth = '10';
      ctx.fillStyle = 'rgb(255, 140, 0)';
      ctx.beginPath();
      ctx.arc(x[a],y[a], radius[a], Math.PI*2, 0, false);
      ctx.fill();
      ctx.stroke();
      ctx.add(v1);
}

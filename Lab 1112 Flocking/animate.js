window.onload = init;
var ctx;
var cnv;
var numFlock = 50;
var flock = [];

function init(){
  cnv = document.getElementById('cnv');
  cnv.width = 1500;
  cnv.height = 750;
  cnv.style.border = 'solid black 2px';
  cnv.style.backgroundColor = 'rgba(0,44,55, 0.1575)';
  ctx = cnv.getContext('2d');
  document.getElementById("sep").min=.000001;
  document.getElementById("sep").max=2;
  document.getElementById("sep").step="any";

  document.getElementById("align").min=.000001;
  document.getElementById("align").max=2;
  document.getElementById("align").step="any";

  document.getElementById("coh").min=.000001;
  document.getElementById("coh").max=2;
  document.getElementById("coh").step="any";

 for(let a = 0; a<numFlock; a++){
    flock[a] = new boidClass(Math.random()*2000, Math.random()*750, Math.random()*3, a);
 }
animate();
}

function animate(){
  requestAnimationFrame(animate);
  ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);
  sep = document.getElementById("sep").value;
  ali = document.getElementById("align").value;
  coh = document.getElementById("coh").value;

  //Runs hunters
  for(let a = 0; a<numFlock; a++){
    flock[a].run();
  }
}

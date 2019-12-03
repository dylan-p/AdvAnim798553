window.onload = init;
var ctx;
var cnv;
var numBal = 4; //4
var numPrey = 50; //50
var numSnakes = 4; //4
var sep = 0;
var ali = 0;
var coh = 0;
var bnw;
var ball = [];
var partSys = [];
var prey = [];
var snakes = [];

function init(){
  cnv = document.getElementById('cnv');
  cnv.width = 1500;
  cnv.height = 750;
  cnv.style.border = 'solid black 2px';
  cnv.style.backgroundColor = 'rgba(0,44,55, 0.1575)';
  ctx = cnv.getContext('2d');
  //gets sliders
  document.getElementById("sep").min=.000001;
  document.getElementById("sep").max=10;
  document.getElementById("sep").step="any";
  document.getElementById("sep").value=5;

  document.getElementById("align").min=.000001;
  document.getElementById("align").max=10;
  document.getElementById("align").step="any";
  document.getElementById("align").value=5;

  document.getElementById("coh").min=.000001;
  document.getElementById("coh").max=10;
  document.getElementById("coh").step="any";
  document.getElementById("coh").value=5;
//creates creatures
 for(let a = 0; a<numBal; a++){
    ball[a] = new ballClass(Math.random()*cnv.width, Math.random()*cnv.height, Math.random()*3, -Math.random()*3, 0, 0.03, 50*Math.random()+15, 255*Math.random(), 255*Math.random(), 255*Math.random(), 50+Math.random()*300, a, 10);
 }
 for(let a = 0; a<numPrey; a++){
    prey[a] = new preyClass(Math.random()*cnv.width, Math.random()*cnv.height, Math.random()*3, -Math.random()*3, 0, 0, 5);
 }
 for(let a = 0; a<numSnakes; a++){
    snakes[a] = new snakeClass(Math.random()*cnv.width, Math.random()*cnv.height, Math.random()*3, -Math.random()*3, 0, 0.03, 50*Math.random()+15, 255*Math.random(), 255*Math.random(), 255*Math.random(),  50+Math.random()*300, a);
 }
  cnv.addEventListener("click", mouseEvent);
animate();
}

function mouseEvent(ev){
  var evx = ev.offsetX;
  var evy = ev.offsetY;
  partSys.push(new ParticleClass(evx, evy, 5*Math.random()-3, 5*Math.random()-3, 0, 0.1*Math.random()));
}

function animate(){
  requestAnimationFrame(animate);
  ctx.clearRect(0, 0, cnv.width, cnv.height);
  sep = document.getElementById("sep").value;
  ali = document.getElementById("align").value;
  coh = document.getElementById("coh").value;
  //Runs hunters
  for(let a = 0; a<numBal; a++){
    ball[a].run();
  }
  //Runs prey, and kills/respawns them
  for(let a = 0; a<numPrey; a++){
    if(prey[a].lifeSpan<=0){
      prey.splice(a, 1);
      prey.push(new preyClass(Math.random()*window.innerWidth, Math.random()*window.innerHeight, Math.random()*3, -Math.random()*3, 0, 0, 5));
    }
    prey[a].run();
  }
  //runs snakes
  for(let a = 0; a<numSnakes; a++){
    snakes[a].run();
  }
  //Runs particle systems, and kills/respawns them
  if(partSys != null){
    for(let a = 0; a<partSys.length; a++){
      if(partSys[a].lifeSpanSpan <= 0){
        partSys.splice(a, 1);
      }
      else{
        partSys[a].run();
      }
    }
  }
}

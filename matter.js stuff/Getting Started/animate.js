// window.onload = init;
// var ctx;
// var cnv;
// function init(){
//   cnv = document.getElementById('cnv');
//   // cnv.width = 3000; //1500
//   // cnv.height = 1500; //750
//   // cnv.style.border = 'solid black 2px';
//   // cnv.style.backgroundColor = 'rgba(0,44,55, 0.1575)';
//   ctx = cnv.getContext('2d');
//   animate();
// }
//
// function animate(){
//   requestAnimationFrame(animate);
//   ctx.clearRect(0, 0, cnv.width, cnv.height);
//   // module aliases
//
// }

window.addEventListener('load', setup);

function setup(){
var Engine = Matter.Engine,
    Render = Matter.Render,
    World = Matter.World,
    Bodies = Matter.Bodies,
    Body = Matter.Body;

// create an engine
var engine = Engine.create();

// create a renderer
var render = Render.create({
    element: document.body,
    engine: engine
});

// create two boxes and a ground
var boxA = Bodies.rectangle(475, 200, 80, 80);
var circleA = Bodies.circle(350, 50, 40);
var circleB = Bodies.circle(500, 35, 40);
var circleC = Bodies.circle(580, 35, 40);
var recA = Bodies.rectangle(540, -35, 60, 220);
var suite = Body.create({parts: [circleB, circleC, recA]});
var ground = Bodies.rectangle(400, 610, 810, 60, { isStatic: true });

// add all of the bodies to the world
World.add(engine.world, [boxA, circleA, suite, ground]);

// run the engine
Engine.run(engine);

// run the renderer
Render.run(render);
}

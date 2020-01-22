
window.addEventListener('load', setup);

function setup(){
var Engine = Matter.Engine,
    Render = Matter.Render,
    World = Matter.World,
    Bodies = Matter.Bodies,
    MouseConstraint = Matter.MouseConstraint,
    Mouse = Matter.Mouse,
    Events = Matter.Events;
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

//creates box on mouse click
  cMouse = Mouse.create(document.body);
  options = {mouse:cMouse};
  mc = MouseConstraint.create(engine, options);
  Events.on(mc, "mousedown", function(){
  World.add(engine.world, Bodies.rectangle(mc.mouse.position.x, mc.mouse.position.y, 45, 45));
});

// add all of the bodies to the world
World.add(engine.world, [boxA, circleA, suite, ground, mc]);

// run the engine
Engine.run(engine);

// run the renderer
Render.run(render);
}

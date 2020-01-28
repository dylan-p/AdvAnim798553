
window.addEventListener('load', setup);

function setup(){
var Engine = Matter.Engine,
    Render = Matter.Render,
    World = Matter.World,
    Bodies = Matter.Bodies,
    MouseConstraint = Matter.MouseConstraint,
    Mouse = Matter.Mouse,
    Events = Matter.Events,
    Common = Matter.Common,
    Composite = Matter.Composite,
    Composites = Matter.Composites,
    Runner = Matter.Runner,
    Body = Matter.Body;

// create an engine
var engine = Engine.create();

//define categories for the colors
var defaultCategory = 0x0001,
    redCategory = 0x0002,
    greenCategory = 0x0004,
    blueCategory = 0x0008;

var redColor = '#CC0000',
    blueColor = '#0000CC',
    greenColor = '#006600';

// create a renderer
var render = Render.create({
    element: document.body,
    engine: engine,
    options: {
        width: 800,
        height: 600,
        wireframes: false,
        background: '#111'
    }
});

// create two boxes and a ground
var boxA = Bodies.rectangle(475, 200, 80, 80, {
    collisionFilter: {
        mask: redCategory
    },
    render: {
        fillStyle: redColor
    }});
var circleA = Bodies.circle(350, 50, 40, {
    collisionFilter: {
        mask: blueCategory
    },
    render: {
        fillStyle: blueColor
    }
});
var circleB = Bodies.circle(500, 35, 40, {
    collisionFilter: {
        mask: greenCategory
    },
    render: {
        fillStyle: greenColor
    }
});
var circleC = Bodies.circle(580, 35, 40, {
    collisionFilter: {
        mask: greenCategory
    },
    render: {
        fillStyle: greenColor
    }
});
// var recA = Bodies.rectangle(540, -35, 60, 220, {
//     collisionFilter: {
//         mask: defaultCategory | greenCategory
//     },
//     render: {
//         fillStyle: greenColor
//     }
// });

//There is NO collsion filtering on composites - I checked the documentation
var suite = Body.create({parts: [circleB, circleC]}, {
    collisionFilter: {
        mask: greenCategory
    },
    render: {
        fillStyle: greenColor
    }
});
var ground = Bodies.rectangle(400, 610, 810, 60, {
    collisionFilter: {
        mask: defaultCategory | redCategory | blueCategory | greenCategory
    },
  isStatic: true});

//creates box on mouse click
  cMouse = Mouse.create(document.body);
  options = {mouse:cMouse};
  mc = MouseConstraint.create(engine, options);
  Events.on(mc, "mousedown", function(){
  World.add(engine.world, Bodies.rectangle(mc.mouse.position.x, mc.mouse.position.y, 45, 45, {collisionFilter: {
    mask: defaultCategory | redCategory
    },
    render: {
      fillStyle: redColor
    }
}));});

//Creates a blue ball on keydown - hold down a key for fun
document.body.addEventListener("keydown", function(x) {World.add(engine.world, Bodies.circle(mc.mouse.position.x, mc.mouse.position.y, 15, {collisionFilter: {
  mask: blueCategory
  },
  render: {
    fillStyle: blueColor
  }
}))});
// add all of the regular bodies to the world
World.add(engine.world, [boxA, circleA, ground, mc, suite]);

//add the colored balls
World.add(engine.world,
    Composites.stack(275, 100, 5, 9, 10, 10, function(x, y, column, row) {
        var category = redCategory,
            color = redColor;

        if (row > 5) {
            category = blueCategory;
            color = blueColor;
        } else if (row > 2) {
            category = greenCategory;
            color = greenColor;
        }

        return Bodies.circle(x, y, 20, {
            collisionFilter: {
                category: category
            },
            render: {
                strokeStyle: color,
                fillStyle: 'transparent',
                lineWidth: 1
            }
        });
    })
);

World.add(engine.world,
    Bodies.circle(310, 40, 30, {
        collisionFilter: {
            mask: defaultCategory | greenCategory
        },
        render: {
            fillStyle: greenColor
        }
    })
);

// run the engine
Engine.run(engine);

// run the renderer
Render.run(render);
}

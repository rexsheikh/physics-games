import { useEffect, useRef, useState } from 'react';
import Matter from 'matter-js';

function FreeThrow() {
  const sceneRef = useRef(null);
  const [score, setScore] = useState(0);

  useEffect(() => {
    const {
      Engine, Render, Runner, World, Bodies, Body,
      Events, Composite, Constraint, Mouse, MouseConstraint
    } = Matter;

    const engine = Engine.create();
    const world = engine.world;

    const width = 800;
    const height = 600;

    const render = Render.create({
      element: sceneRef.current,
      engine,
      options: {
        width,
        height,
        wireframes: false,
        background: '#f0f0f0', // match Newton's Cradle background
      },
    });

    Render.run(render);
    const runner = Runner.create();
    Runner.run(runner, engine);

    // Ground
    const ground = Bodies.rectangle(400, 590, 810, 40, {
      isStatic: true,
      render: { fillStyle: '#ddd' },
    });
    World.add(world, ground);

    // Score logic
    let currentScore = 0;
    const updateScore = () => {
      currentScore += 1;
      setScore(currentScore);
    };

    // Hoop setup
    const hoopX = 600;
    const hoopY = 300;

    const backboard = Bodies.rectangle(hoopX + 40, hoopY - 40, 20, 100, {
      isStatic: true,
      render: { fillStyle: '#333' },
    });

    const rimLeft = Bodies.rectangle(hoopX - 30, hoopY, 10, 10, { isStatic: true });
    const rimRight = Bodies.rectangle(hoopX + 30, hoopY, 10, 10, { isStatic: true });
    const rimBottom = Bodies.rectangle(hoopX, hoopY + 5, 60, 5, {
      isStatic: true,
      render: { fillStyle: '#e74c3c' },
    });

    const hoopSensor = Bodies.rectangle(hoopX, hoopY + 10, 40, 10, {
      isSensor: true,
      isStatic: true,
      label: 'hoopSensor',
      render: { visible: false },
    });

    World.add(world, [backboard, rimLeft, rimRight, rimBottom, hoopSensor]);

    // Ball and slingshot setup
    const anchor = { x: 200, y: 400 }; // raised for more spring energy
    const ballOptions = {
      restitution: 0.8,
      density: 0.004,
      frictionAir: 0.005,
      label: 'basketball',
      render: { fillStyle: '#2c3e50' }, // match Newton's Cradle ball style
    };

    let ball = Bodies.circle(anchor.x, anchor.y, 20, ballOptions);
    let elastic = Constraint.create({
      pointA: anchor,
      bodyB: ball,
      stiffness: 0.05,
      damping: 0.01,
      length: 0.01,
    });

    World.add(world, [ball, elastic]);

    // Mouse control
    const mouse = Mouse.create(render.canvas);
    const mouseConstraint = MouseConstraint.create(engine, {
      mouse,
      constraint: {
        stiffness: 0.02,
        render: { visible: false },
      },
    });
    World.add(world, mouseConstraint);
    render.mouse = mouse;

    // Replace ball after release
    Events.on(engine, 'afterUpdate', () => {
      if (
        mouseConstraint.mouse.button === -1 &&
        (!elastic.bodyB || ball.position.x > anchor.x + 10 || ball.position.y < anchor.y - 10)
      ) {
        if (Body.getSpeed(ball) > 45) Body.setSpeed(ball, 45);

        ball = Bodies.circle(anchor.x, anchor.y, 20, ballOptions);
        World.add(world, ball);
        elastic.bodyB = ball;
      }
    });

    // Score detection
    Events.on(engine, 'collisionStart', (event) => {
      for (const pair of event.pairs) {
        const labels = [pair.bodyA.label, pair.bodyB.label];
        if (labels.includes('hoopSensor') && labels.includes('basketball')) {
          updateScore();
        }
      }
    });

    // Cleanup
    return () => {
      Render.stop(render);
      Runner.stop(runner);
      Engine.clear(engine);
      render.canvas.remove();
      render.textures = {};
    };
  }, []);

  return (
    <div style={{ backgroundColor: '#f0f0f0', padding: '2rem', textAlign: 'center' }}>
      <h2 style={{ fontFamily: 'sans-serif', color: '#2c3e50' }}>Score: {score}</h2>
      <div ref={sceneRef} />
    </div>
  );
}

export default FreeThrow;

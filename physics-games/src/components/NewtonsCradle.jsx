import { useEffect, useRef } from 'react';
import Matter from 'matter-js';

function NewtonsCradle() {
  const sceneRef = useRef(null);

  useEffect(() => {
    const { Engine, Render, Runner, World, Bodies, Constraint, Mouse, MouseConstraint } = Matter;

    // Create engine and world
    const engine = Engine.create();
    const world = engine.world;

    const width = 600;
    const height = 400;

    // Create renderer
    const render = Render.create({
      element: sceneRef.current,
      engine: engine,
      options: {
        width,
        height,
        wireframes: false,
        background: '#f0f0f0',
      },
    });

    // Cradle setup
    const ballRadius = 20;
    const cradleX = width / 2;
    const cradleY = 100;
    const spacing = ballRadius * 2.2;
    const count = 5;

    const balls = [];

    for (let i = 0; i < count; i++) {
      const x = cradleX + (i - (count - 1) / 2) * spacing;
      const y = cradleY + 150;

      const ball = Bodies.circle(x, y, ballRadius, {
        restitution: 1,
        friction: 0,
        frictionAir: 0.0001,
        inertia: Infinity,
        render: {
          fillStyle: '#2c3e50',
        },
      });

      const constraint = Constraint.create({
        pointA: { x, y: cradleY },
        bodyB: ball,
        length: 150,
        stiffness: 1,
      });

      balls.push(ball);
      World.add(world, [ball, constraint]);
    }

    // Apply an initial kick to the first ball
    Matter.Body.setVelocity(balls[0], { x: -5, y: -5 });

    // Add optional mouse control
    const mouse = Mouse.create(render.canvas);
    const mouseConstraint = MouseConstraint.create(engine, {
      mouse,
      constraint: {
        stiffness: 0.2,
        render: { visible: false },
      },
    });
    World.add(world, mouseConstraint);
    render.mouse = mouse;

    // Run the engine and renderer using Runner (not deprecated)
    const runner = Runner.create();
    Runner.run(runner, engine);
    Render.run(render);

    // Cleanup on unmount
    return () => {
      Render.stop(render);
      Runner.stop(runner);
      Engine.clear(engine);
      render.canvas.remove();
      render.textures = {};
    };
  }, []);

  return <div ref={sceneRef} />;
}

export default NewtonsCradle;

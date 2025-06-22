import { useEffect, useRef } from 'react';
import Matter from 'matter-js';

function NewtonsCradle() {
  const sceneRef = useRef(null);

  useEffect(() => {
    const { Engine, Render, World, Bodies, Constraint, Mouse, MouseConstraint, Composite } = Matter;

    const engine = Engine.create();
    const world = engine.world;

    const width = 600;
    const height = 400;

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

    const cradleX = 300;
    const cradleY = 100;
    const ballRadius = 20;
    const ballCount = 5;
    const spacing = ballRadius * 2.1;

    const balls = [];
    const constraints = [];

    for (let i = 0; i < ballCount; i++) {
      const ball = Bodies.circle(cradleX + i * spacing - (spacing * (ballCount - 1)) / 2, cradleY + 100, ballRadius, {
        restitution: 1,
        friction: 0,
        frictionAir: 0.001,
        inertia: Infinity,
        render: { fillStyle: '#2c3e50' },
      });

      const constraint = Constraint.create({
        pointA: { x: ball.position.x, y: cradleY },
        bodyB: ball,
        pointB: { x: 0, y: 0 },
        stiffness: 1,
        length: 100,
      });

      balls.push(ball);
      constraints.push(constraint);
      World.add(world, [ball, constraint]);
    }

    // Kick the first ball to start motion
    Matter.Body.translate(balls[0], { x: -100, y: -100 });

    const mouse = Mouse.create(render.canvas);
    const mouseConstraint = MouseConstraint.create(engine, {
      mouse: mouse,
      constraint: {
        stiffness: 0.2,
        render: { visible: false },
      },
    });

    World.add(world, mouseConstraint);
    render.mouse = mouse;

    Engine.run(engine);
    Render.run(render);

    return () => {
      Render.stop(render);
      Engine.clear(engine);
      render.canvas.remove();
      render.textures = {};
    };
  }, []);

  return <div ref={sceneRef} />;
}

export default NewtonsCradle;

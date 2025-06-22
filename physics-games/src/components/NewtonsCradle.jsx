import { useEffect, useRef } from 'react';
import Matter from 'matter-js';

function NewtonsCradle() {
  const sceneRef = useRef(null);

  useEffect(() => {
    const {
      Engine,
      Render,
      Runner,
      World,
      Composite,
      Bodies,
      Constraint,
      Mouse,
      MouseConstraint,
      Body
    } = Matter;

    // Create engine and world
    const engine = Engine.create();
    engine.constraintIterations = 10;
    const world = engine.world;

    const width = 600;
    const height = 400;

    // Create renderer
    const render = Render.create({
      element: sceneRef.current,
      engine,
      options: {
        width,
        height,
        wireframes: false,
        background: '#f0f0f0',
        showVelocity: true,
      },
    });

    Render.run(render);

    const runner = Runner.create();
    Runner.run(runner, engine);

    // Helper function: cradle factory
    function createCradle(xx, yy, count, radius, length) {
      const cradle = Composite.create({ label: 'Newtons Cradle' });
      const separation = radius * 1.9;

      for (let i = 0; i < count; i++) {
        const x = xx + i * separation;
        const y = yy + length;

        const ball = Bodies.circle(x, y, radius, {
          inertia: Infinity,
          restitution: 1,
          friction: 0,
          frictionAir: 0,
          slop: 0,
          render: { fillStyle: '#2c3e50' },
        });

        const constraint = Constraint.create({
          pointA: { x, y: yy },
          bodyB: ball,
          length,
          stiffness: 1,
        });

        Composite.addBody(cradle, ball);
        Composite.addConstraint(cradle, constraint);
      }

      return cradle;
    }

    // Create and add cradle to the world
    const cradle = createCradle(200, 80, 4, 20, 150);
    Composite.add(world, cradle);

    // Apply initial motion
    Body.translate(cradle.bodies[0], { x: -100, y: -100 });

    // Mouse control
    const mouse = Mouse.create(render.canvas);
    const mouseConstraint = MouseConstraint.create(engine, {
      mouse,
      constraint: {
        stiffness: 0.2,
        render: { visible: false },
      },
    });

    Composite.add(world, mouseConstraint);
    render.mouse = mouse;

    // Viewport fit (optional)
    Render.lookAt(render, {
      min: { x: 0, y: 0 },
      max: { x: width, y: height },
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

  return <div ref={sceneRef} />;
}

export default NewtonsCradle;

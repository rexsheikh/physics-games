import React, { useEffect, useRef } from 'react';
import Matter from 'matter-js';

const Pendulum = () => {
  const sceneRef = useRef(null);
  const engineRef = useRef(Matter.Engine.create());
  const runnerRef = useRef(null);

  useEffect(() => {
    const engine = engineRef.current;
    const world = engine.world;

    // Gravity (default is { x: 0, y: 1 }, but you can adjust it if needed)
    engine.gravity.y = 1;

    const render = Matter.Render.create({
      element: sceneRef.current,
      engine,
      options: {
        width: 400,
        height: 400,
        wireframes: false,
        background: '#f0f0f0',
      },
    });

    // Static anchor point
    const roof = Matter.Bodies.rectangle(200, 100, 200, 20, { isStatic: true });

    // Displaced pendulum bob: x = 250 instead of 200
    const ball = Matter.Bodies.circle(250, 300, 30, { 
        density: 0.004, 
        friction:0,
        frictionAir:0,
        restitution:1,
     });

    // Constraint ("string") from roof to ball
    const string = Matter.Constraint.create({
      pointA: { x: 200, y: 100 },
      bodyB: ball,
      length: 200,
      stiffness: 1,
    });

    Matter.World.add(world, [roof, ball, string]);

    // Runner
    const runner = Matter.Runner.create();
    runnerRef.current = runner;
    Matter.Runner.run(runner, engine);
    Matter.Render.run(render);

    return () => {
      Matter.Render.stop(render);
      Matter.Runner.stop(runnerRef.current);
      Matter.Engine.clear(engine);
      render.canvas.remove();
      render.textures = {};
    };
  }, []);

  return <div ref={sceneRef} />;
};

export default Pendulum;

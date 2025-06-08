cd // src/components/PhysicsDemo.jsx
import React, { useEffect, useRef } from 'react';
import Matter from 'matter-js';

export default function PhysicsDemo() {
  const sceneRef = useRef(null);

  useEffect(() => {
    // Create engine & world
    const engine = Matter.Engine.create();
    const world = engine.world;

    // Create renderer
    const render = Matter.Render.create({
      element: sceneRef.current,
      engine: engine,
      options: {
        width: 800,
        height: 400,
        wireframes: false,
        background: '#fafafa'
      }
    });

    // Add bodies
    const ground = Matter.Bodies.rectangle(400, 390, 810, 20, { isStatic: true });
    const boxA = Matter.Bodies.rectangle(400, 200, 80, 80);
    const boxB = Matter.Bodies.rectangle(450, 50, 80, 80);

    Matter.World.add(world, [ground, boxA, boxB]);

    // Run it
    Matter.Engine.run(engine);
    Matter.Render.run(render);

    // Cleanup on unmount
    return () => {
      Matter.Render.stop(render);
      Matter.World.clear(world);
      Matter.Engine.clear(engine);
      render.canvas.remove();
      render.textures = {};
    };
  }, []);

  return <div ref={sceneRef} />;
}

'use client'

import React, { useEffect, useRef } from 'react';
import Matter, { Engine, Render, Runner, Bodies, Composite, Composites, Vertices, Mouse, MouseConstraint, Common } from 'matter-js';
import decomp from 'poly-decomp';



Common.setDecomp(decomp); // Ensure poly-decomp is set

const ConcaveExample: React.FC = () => {
  const sceneRef = useRef<HTMLDivElement | null>(null); // Reference to the div where canvas will be rendered
  const engineRef = useRef<Engine | null>(null);
  const runnerRef = useRef<Runner | null>(null);

  useEffect(() => {
    // Create the Matter.js engine and world
    const engine = Engine.create();
    const world = engine.world;
    engineRef.current = engine;

    // Create renderer
    const render = Render.create({
      element: sceneRef.current as HTMLElement,
      engine: engine,
      options: {
        width: 800,
        height: 600,
        wireframes: false // Disable wireframes for colored shapes
      }
    });

    Render.run(render);

    // Create runner
    const runner = Runner.create();
    runnerRef.current = runner;
    Runner.run(runner, engine);

    // Add walls (static bodies)
    Composite.add(world, [
      Bodies.rectangle(400, 0, 800, 50, { isStatic: true }), // Top wall
      Bodies.rectangle(400, 600, 800, 50, { isStatic: true }), // Bottom wall
      Bodies.rectangle(800, 300, 50, 600, { isStatic: true }), // Right wall
      Bodies.rectangle(0, 300, 50, 600, { isStatic: true }) // Left wall
    ]);

    // Create shapes using vertices (concave shapes)
    const tempBody = Bodies.rectangle(0, 0, 1, 1);
    const arrow = Vertices.create([
      { x: 40, y: 0 },
      { x: 40, y: 20 },
      { x: 100, y: 20 },
      { x: 100, y: 80 },
      { x: 40, y: 80 },
      { x: 40, y: 100 },
      { x: 0, y: 50 }
    ], tempBody);
    const chevron = Vertices.create([
      { x: 100, y: 0 },
      { x: 75, y: 50 },
      { x: 100, y: 100 },
      { x: 25, y: 100 },
      { x: 0, y: 50 },
      { x: 25, y: 0 },
    ], tempBody);
    const star = Vertices.create([
      { x: 50, y: 0 },
      { x: 63, y: 38 },
      { x: 100, y: 38 },
      { x: 69, y: 59 },
      { x: 82, y: 100 },
      { x: 50, y: 75 },
      { x: 18, y: 100 },
      { x: 30, y: 59 },
      { x: 0, y: 38 },
      { x: 37, y: 38 },
    ], tempBody);

    // Create a stack of concave bodies
    const stack = Composites.stack(50, 50, 6, 4, 10, 10, (x:number, y:number) => {
      const color = Common.choose(['#f19648', '#f5d259', '#f55a3c', '#063e7b', '#ececd1']);
      return Bodies.fromVertices(x, y, new Array(Common.choose([arrow, chevron, star])), {
        render: {
          fillStyle: color,
          strokeStyle: color,
          lineWidth: 1
        }
      }, true);
    });

    Composite.add(world, stack);

    // Add mouse control
    const mouse = Mouse.create(render.canvas);
    const mouseConstraint = MouseConstraint.create(engine, {
      mouse: mouse,
      constraint: {
        stiffness: 0.2,
        render: {
          visible: false
        }
      }
    });
    Composite.add(world, mouseConstraint);

    // Keep the mouse in sync with rendering
    render.mouse = mouse;

    // Fit the render viewport to the scene
    Render.lookAt(render, {
      min: { x: 0, y: 0 },
      max: { x: 800, y: 600 }
    });

    // Cleanup function to stop the engine and renderer when the component unmounts
    return () => {
      Render.stop(render);
      Runner.stop(runner);
      Engine.clear(engine);
      render.canvas.remove();
      render.textures = {};
    };
  }, []);

  return <div className='h-full flex justify-center items-center' ref={sceneRef} />;
};

export default ConcaveExample;

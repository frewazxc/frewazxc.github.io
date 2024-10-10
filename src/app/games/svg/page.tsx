'use client'
import React, { useEffect, useRef } from 'react';
import Matter, { Engine, Render, Runner, Composite, Bodies, Vertices, Svg, Common, MouseConstraint, Mouse, Vector } from 'matter-js';
import decomp from 'poly-decomp';
import 'pathseg';


Common.setDecomp(decomp);

const SvgExample: React.FC = () => {
  const sceneRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Create the Matter.js engine
    const engine = Engine.create();
    const world = engine.world;

    // Create the renderer
    const render = Render.create({
      element: sceneRef.current as HTMLElement,
      engine: engine,
      options: {
        width: 800,
        height: 600
      }
    });

    Render.run(render);

    // Create the runner
    const runner = Runner.create();
    Runner.run(runner, engine);

    // Add static bodies (walls)
    Composite.add(world, [
      Bodies.rectangle(400, 0, 800, 50, { isStatic: true }),
      Bodies.rectangle(400, 600, 800, 50, { isStatic: true }),
      Bodies.rectangle(800, 300, 50, 600, { isStatic: true }),
      Bodies.rectangle(0, 300, 50, 600, { isStatic: true })
    ]);

    // Load and add SVGs
    const select = (root: Document, selector: string) => {
      return Array.prototype.slice.call(root.querySelectorAll(selector));
    };

    const loadSvg = (url: string) => {
      return fetch(url)
        .then(response => response.text())
        .then(raw => new window.DOMParser().parseFromString(raw, 'image/svg+xml'));
    };

    const svgPaths = [
      '/1.svg', 
      '/2.svg',
      '/3.svg',
    ];

    svgPaths.forEach((path, i) => {
      loadSvg(path).then(root => {
        const color = Common.choose(['#f19648', '#f5d259', '#f55a3c', '#063e7b', '#ececd1']);
        const vertexSets = select(root, 'path').map(path => 
          Vertices.scale(Svg.pathToVertices(path, 30), 0.2, 0.2, Vector.create(0, 0))
        );
        Composite.add(world, Bodies.fromVertices(100 + i * 150, 200 + i * 50, vertexSets, {
          render: {
            fillStyle: color,
            strokeStyle: color,
            lineWidth: 1
          }
        }, true));
      });
    });

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

    render.mouse = mouse;

    // Fit the render viewport to the scene
    Render.lookAt(render, {
      min: { x: 0, y: 0 },
      max: { x: 800, y: 600 }
    });

    // Clean up the Matter.js engine and renderer when the component unmounts
    return () => {
      Render.stop(render);
      Runner.stop(runner);
      Engine.clear(engine);
      render.canvas.remove();
      render.textures = {};
    };
  }, []);

  return <div ref={sceneRef} />;
};

export default SvgExample;

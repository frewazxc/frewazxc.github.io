// 'use client'
// import React, { useEffect, useRef } from 'react';
// import Matter, { Engine, Render, Runner, Composite, Bodies, Vertices, Svg, Common, MouseConstraint, Mouse, Vector } from 'matter-js';
// import decomp from 'poly-decomp';
// import 'pathseg';


// Common.setDecomp(decomp);

// const SvgExample: React.FC = () => {
//   const sceneRef = useRef<HTMLDivElement>(null);

//   useEffect(() => {
//     // Create the Matter.js engine
//     const engine = Engine.create();
//     const world = engine.world;

//     // Create the renderer
//     const render = Render.create({
//       element: sceneRef.current as HTMLElement,
//       engine: engine,
//       options: {
//         width: 800,
//         height: 600
//       }
//     });

//     Render.run(render);

//     // Create the runner
//     const runner = Runner.create();
//     Runner.run(runner, engine);

//     // Add static bodies (walls)
//     Composite.add(world, [
//       Bodies.rectangle(400, 0, 800, 50, { isStatic: true }),
//       Bodies.rectangle(400, 600, 800, 50, { isStatic: true }),
//       Bodies.rectangle(800, 300, 50, 600, { isStatic: true }),
//       Bodies.rectangle(0, 300, 50, 600, { isStatic: true })
//     ]);

//     // Load and add SVGs
//     const select = (root: Document, selector: string) => {
//       return Array.prototype.slice.call(root.querySelectorAll(selector));
//     };

//     const loadSvg = (url: string) => {
//       return fetch(url)
//         .then(response => response.text())
//         .then(raw => new window.DOMParser().parseFromString(raw, 'image/svg+xml'));
//     };

//     const svgPaths = [
//       '/1.svg', 
//       '/2.svg',
//       '/3.svg',
//     ];

//     svgPaths.forEach((path, i) => {
//       loadSvg(path).then(root => {
//         const color = Common.choose(['#f19648', '#f5d259', '#f55a3c', '#063e7b', '#ececd1']);
//         const vertexSets = select(root, 'path').map(path => 
//           Vertices.scale(Svg.pathToVertices(path, 30), 0.2, 0.2, Vector.create(0, 0))
//         );
//         Composite.add(world, Bodies.fromVertices(100 + i * 150, 200 + i * 50, vertexSets, {
//           render: {
//             fillStyle: color,
//             strokeStyle: color,
//             lineWidth: 1
//           }
//         }, true));
//       });
//     });

//     // Add mouse control
//     const mouse = Mouse.create(render.canvas);
//     const mouseConstraint = MouseConstraint.create(engine, {
//       mouse: mouse,
//       constraint: {
//         stiffness: 0.2,
//         render: {
//           visible: false
//         }
//       }
//     });

//     Composite.add(world, mouseConstraint);

//     render.mouse = mouse;

//     // Fit the render viewport to the scene
//     Render.lookAt(render, {
//       min: { x: 0, y: 0 },
//       max: { x: 800, y: 600 }
//     });

//     // Clean up the Matter.js engine and renderer when the component unmounts
//     return () => {
//       Render.stop(render);
//       Runner.stop(runner);
//       Engine.clear(engine);
//       render.canvas.remove();
//       render.textures = {};
//     };
//   }, []);

//   return <div ref={sceneRef} />;
// };

// export default SvgExample;
"use client"; // This is needed since we're using client-side features like useEffect

import React, { useEffect } from 'react';
import {
  Engine,
  Render,
  Runner,
  Composites,
  Common,
  MouseConstraint,
  Mouse,
  Composite,
  Bodies,
  IChamfer,
} from 'matter-js';

const MixedShapesPage = () => {
  useEffect(() => {
    // create engine
    const engine = Engine.create();
    const world = engine.world;

    // create renderer
    const render = Render.create({
      element: document.getElementById('matter-container')!,
      engine: engine,
      options: {
        width: 800,
        height: 600,
        showAngleIndicator: true,
      }
    });

    Render.run(render);

    // create runner
    const runner = Runner.create();
    Runner.run(runner, engine);

    // add bodies
    const stack = Composites.stack(20, 20, 10, 5, 0, 0, function(x:number, y:number) {
      const sides = Math.round(Common.random(1, 8));

      // round the edges of some bodies
      let chamfer : IChamfer | undefined = undefined;
      if (sides > 2 && Common.random() > 0.7) {
        chamfer = {
          radius: 10
        };
      }

      switch (Math.round(Common.random(0, 1))) {
        case 0:
          if (Common.random() < 0.8) {
            return Bodies.rectangle(x, y, Common.random(25, 50), Common.random(25, 50), { chamfer });
          } else {
            return Bodies.rectangle(x, y, Common.random(80, 120), Common.random(25, 30), { chamfer });
          }
        case 1:
          return Bodies.polygon(x, y, sides, Common.random(25, 50), { chamfer });
      }
    });

    Composite.add(world, stack);

    Composite.add(world, [
      // walls
      Bodies.rectangle(400, 0, 800, 50, { isStatic: true }),
      Bodies.rectangle(400, 600, 800, 50, { isStatic: true }),
      Bodies.rectangle(800, 300, 50, 600, { isStatic: true }),
      Bodies.rectangle(0, 300, 50, 600, { isStatic: true })
    ]);

    // add mouse control
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

    // keep the mouse in sync with rendering
    render.mouse = mouse;

    // fit the render viewport to the scene
    Render.lookAt(render, {
      min: { x: 0, y: 0 },
      max: { x: 800, y: 600 }
    });

    return () => {
      // Cleanup
      Render.stop(render);
      Runner.stop(runner);
      if (render.canvas) {
        render.canvas.remove();
      }
      if (render.textures) {
        render.textures = {};
      }
    };
  }, []);

  return (
    <div className="mixed-shapes-page">
      <h1>Mixed Shapes</h1>
      <div id="matter-container" style={{ width: '800px', height: '600px' }} />
    </div>
  );
};

export default MixedShapesPage;
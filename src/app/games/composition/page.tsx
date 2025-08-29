"use client";
import React, { useEffect } from 'react';
import { Engine, Render, Runner, Composites, Common, MouseConstraint, Mouse, Composite, Bodies } from 'matter-js';

const AdvancedShapesWithSprites = () => {
  useEffect(() => {
    // 创建物理引擎
    const engine = Engine.create();
    const world = engine.world;

    // 获取容器元素
    const renderElement = document.getElementById('matter-container');
    if (!renderElement) return;

    // 配置渲染器
    const render = Render.create({
      element: renderElement,
      engine: engine,
      options: {
        width: 800,
        height: 600,
        wireframes: false,
        background: '#1a1a1a'
      }
    });

    interface ShapeConfig {
      texture: string;
      size?: number;
      sizes?: [number, number]; 
      xScale: number;
      yScale: number;
    }

    const SHAPES: Record<string, ShapeConfig> = {
      CIRCLE: { 
        texture: '/circle.png',
        size: 50,
        xScale: 1,  
        yScale: 1 
      },
      TRIANGLE: { 
        texture: '/triangle.png', 
        size: 45,
        xScale: 1,
        yScale: 1
      },
      PENTAGON: { 
        texture: '/pentagon.png', 
        size: 40,
        xScale: 1,
        yScale: 1
      },
      HEXAGON: { 
        texture: '/hexagon.png', 
        size: 45,
        xScale: 1,
        yScale: 1
      },
      CUSTOM_POLYGON: { 
        texture: '/polygon.png', 
        size: 40,
        xScale: 1,
        yScale: 1
      },
      RECTANGLE: { 
        texture: '/rectangle.png', 
        sizes: [40, 60], // 明确定义为元组
        xScale: 1,
        yScale: 1
      }
    };

    Render.run(render);

    const runner = Runner.create();
    Runner.run(runner, engine);

    // 生成形状堆叠
    const stack = Composites.stack(20, 20, 10, 5, 0, 0, (x: number, y: number) => {
      const shapeType = Common.random(0, 1);

      switch(true) {
        case shapeType < 0.15:
          return Bodies.circle(x, y, SHAPES.CIRCLE.size!, {
            render: { 
              sprite: { 
                texture: SHAPES.CIRCLE.texture,
                xScale: SHAPES.CIRCLE.xScale,
                yScale: SHAPES.CIRCLE.yScale
              }
            }
          });

        case shapeType < 0.35:
          return Bodies.polygon(x, y, 3, SHAPES.TRIANGLE.size!, {
            render: { 
              sprite: { 
                texture: SHAPES.TRIANGLE.texture,
                xScale: SHAPES.TRIANGLE.xScale,
                yScale: SHAPES.TRIANGLE.yScale
              }
            }
          });

        case shapeType < 0.5:
          return Bodies.polygon(x, y, 5, SHAPES.PENTAGON.size!, {
            render: { 
              sprite: { 
                texture: SHAPES.PENTAGON.texture,
                xScale: SHAPES.PENTAGON.xScale,
                yScale: SHAPES.PENTAGON.yScale
              }
            }
          });

        case shapeType < 0.65:
          return Bodies.polygon(x, y, 6, SHAPES.HEXAGON.size!, {
            render: { 
              sprite: { 
                texture: SHAPES.HEXAGON.texture,
                xScale: SHAPES.HEXAGON.xScale,
                yScale: SHAPES.HEXAGON.yScale
              }
            }
          });

        case shapeType < 0.75: {
          const sides = Common.random(7, 10);
          return Bodies.polygon(x, y, sides, SHAPES.CUSTOM_POLYGON.size!, {
            render: { 
              sprite: { 
                texture: SHAPES.CUSTOM_POLYGON.texture,
                xScale: SHAPES.CUSTOM_POLYGON.xScale,
                yScale: SHAPES.CUSTOM_POLYGON.yScale
              }
            }
          });
        }

        default: {
          const [minSize, maxSize] = SHAPES.RECTANGLE.sizes!;
          return Bodies.rectangle(
            x,
            y,
            Common.random(minSize, maxSize),
            Common.random(minSize, maxSize),
            { 
              render: { 
                sprite: { 
                  texture: SHAPES.RECTANGLE.texture,
                  xScale: SHAPES.RECTANGLE.xScale,
                  yScale: SHAPES.RECTANGLE.yScale
                }
              } 
            }
          );
        }
      }
    });

    Composite.add(world, stack);

    // 添加边界墙
    Composite.add(world, [
      Bodies.rectangle(400, -10, 820, 20, { isStatic: true }),
      Bodies.rectangle(400, 610, 820, 20, { isStatic: true }),
      Bodies.rectangle(810, 300, 20, 620, { isStatic: true }),
      Bodies.rectangle(-10, 300, 20, 620, { isStatic: true })
    ]);

    // 设置鼠标交互
    const mouse = Mouse.create(render.canvas);
    const mouseConstraint = MouseConstraint.create(engine, {
      mouse: mouse,
      constraint: { stiffness: 0.2 }
    });
    Composite.add(world, mouseConstraint);
    render.mouse = mouse;

    Render.lookAt(render, { min: { x: 0, y: 0 }, max: { x: 800, y: 600 } });

    return () => {
      Render.stop(render);
      Runner.stop(runner);
      render.canvas?.remove();
    };
  }, []);

  return (
    <div className="flex">
      <div
        id="matter-container" 
        style={{ 
          width: '800px', 
          height: '600px',
          borderRadius: '8px',
          boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)'
        }}
      />
    </div>
  );
};

export default AdvancedShapesWithSprites;
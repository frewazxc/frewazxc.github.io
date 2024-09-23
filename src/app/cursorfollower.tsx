"use client"

import React, { useState, useEffect } from 'react';

interface CursorFollowerProps {
  cursorRadius: number;
  //旋转速度
}

interface CursorPosition {
  x: number;
  y: number;
}

export default function CursorFollower({cursorRadius}: CursorFollowerProps) {
  const [cursorPosition, setCursorPosition] = useState<CursorPosition>({ x: 0, y: 0 });
  const offsets = {red: { x: 0, y: -2},
    green: { x: -2, y: 1},
    blue: { x: 2, y: 1}};


  // const handleMouseMove = (event: MouseEvent) => {
  //   setCursorPosition({ x: event.clientX, y: event.clientY });
  // };

  useEffect(() => {
    // window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseenter', handleMouseEnter);
    window.addEventListener('mouseleave', handleMouseLeave);
    return () => {
      // window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseenter', handleMouseEnter);
      window.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, []);

 //todo 圆形细微移动效果

 //todo 鼠标离开窗口后消失

 const handleMouseEnter = (event: MouseEvent) => {
  const target = event.target as HTMLElement;
  if (target.matches('a, button, input')) {
      console.log('enter')
  }
  };

  const handleMouseLeave = (event: MouseEvent) => {
    const target = event.target as HTMLElement;
    if (target.matches('a, button, input')) {
    }
  };

  //光标样式
  const circleStyle = (color: string, offsetX: number, offsetY: number): React.CSSProperties => {
    return {
      position: 'absolute',
      top: cursorPosition.y - cursorRadius/2 + offsetY,
      left: cursorPosition.x - cursorRadius/2 + offsetX,
      width: cursorRadius,
      height: cursorRadius,
      borderRadius: '50%',
      backgroundColor: color,
      filter: 'blur(3px)',
      mixBlendMode: 'difference',
      zIndex: '100',
      pointerEvents: 'none',
      animation: 'move 3s linear infinite'
    };
  }

  return (
    <div style={{position:'absolute', width: '100vw', height: '100vh'}} onPointerMove={e => setCursorPosition({x: e.clientX, y: e.clientY})}>
      <div style={circleStyle('#f00', offsets.red.x, offsets.red.y)}></div>
      <div style={circleStyle('#0f0', offsets.green.x, offsets.green.y)}></div>
      <div style={circleStyle('#00f', offsets.blue.x, offsets.blue.y)}></div>
    </div>);
};
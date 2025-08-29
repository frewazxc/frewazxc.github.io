'use client';
import React, { useState, useEffect, useRef } from 'react';

interface CursorPosition {
  x: number;
  y: number;
}

function hasButtonOrAnchorAncestor(element: HTMLElement | null): boolean {
  if (!element) {
    return false;
  }

  if (element.tagName === "BUTTON" || element.tagName === "A") {
    console.log('Is Hovering:');

    return true;
  }

  return hasButtonOrAnchorAncestor(element.parentElement);
}

export default function CursorFollower() {
  // if (typeof document === "undefined") {
  //   return null as any;
  // }

  const cursorRef = useRef(null);
  const [isHovering, setIsHovering] = useState(false);
  const [cursorPosition, setCursorPosition] = useState<CursorPosition>({ x: 0, y: 0 });
  const offsets = { red: { x: 0, y: -2 }, green: { x: -2, y: 1 }, blue: { x: 2, y: 1 } };

  const handleMouseMove = (e: MouseEvent) => {
    setCursorPosition({ x: e.clientX, y: e.clientY });
    // if (!cursorRef.current) return;
    
    const isHovered =
    e.target instanceof HTMLElement &&
    (e.target.tagName === "BUTTON" ||
      e.target.tagName === "A" ||
      hasButtonOrAnchorAncestor(e.target.parentElement));
      
    setIsHovering(isHovered);
  };

  useEffect(() => {
    window.addEventListener('mousemove', handleMouseMove);
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  const circleStyle = (color: string, offsetX: number, offsetY: number): React.CSSProperties => {
    return {
      position: 'fixed',
      top: cursorPosition.y - 20 + offsetY,
      left: cursorPosition.x - 20 + offsetX,
      width: 28,
      height: 28,
      borderRadius: '50%',
      backgroundColor: color,
      filter: 'blur(3px)',
      mixBlendMode: 'difference',
      zIndex: '100',
      pointerEvents: 'none',
      animation: 'move 3s linear infinite',
      transform: `scale(${isHovering ? 2.5 : 1})`,
      transition: 'transform 0.2s',
    };
  }

  return (
    <>
      <div style={circleStyle('#f00', offsets.red.x, offsets.red.y)}></div>
      <div style={circleStyle('#0f0', offsets.green.x, offsets.green.y)}></div>
      <div style={circleStyle('#00f', offsets.blue.x, offsets.blue.y)}></div>
    </>
  );
}

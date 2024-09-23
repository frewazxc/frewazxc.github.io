"use client"

import React, { useState, useEffect } from 'react';
import CursorFollower from "./cursorfollower";
import Home from "./home";


export default function Page() {
  const [cursorRadius, setCursorRadius] = useState<number>(20);

  useEffect(() => {
    window.addEventListener('mouseenter', handleMouseEnter);
    window.addEventListener('mouseleave', handleMouseLeave);
    return () => {
      window.removeEventListener('mouseenter', handleMouseEnter);
      window.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, []);

 //todo 圆形细微移动效果

 //todo 鼠标离开窗口后消失

 const handleMouseEnter = (event: MouseEvent) => {
  const target = event.target as HTMLElement;
  if (target.matches('a, button, input')) {
      setCursorRadius(40);
      console.log('enter')
  }
  };

  const handleMouseLeave = (event: MouseEvent) => {
    const target = event.target as HTMLElement;
    if (target.matches('a, button, input')) {
      setCursorRadius(20);

    }
  };


  return (
    <>
      <CursorFollower cursorRadius={cursorRadius}/>
      <div>
        <div className="shark-wrap">
          <Home/>
        </div>
      </div>
    </>
    );

}
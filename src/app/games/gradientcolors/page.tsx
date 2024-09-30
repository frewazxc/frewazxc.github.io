'use client'
import React, { useState, useEffect } from 'react';
import Sortable from '@/app/games/gradientcolors/sortable';

interface colorProps {
  r: number,
  g: number,
  b: number,
}

// 生成渐变色卡
function generateGradient(startColor: colorProps, endColor: colorProps, steps: number) {
  const stepR = (endColor.r - startColor.r) / (steps - 1);
  const stepG = (endColor.g - startColor.g) / (steps - 1);
  const stepB = (endColor.b - startColor.b) / (steps - 1);

  const gradientColors = [];

  for (let i = 0; i < steps; i++) {
      const r = Math.round(startColor.r + stepR * i);
      const g = Math.round(startColor.g + stepG * i);
      const b = Math.round(startColor.b + stepB * i);
      gradientColors.push({r, g, b});
  }

  return gradientColors;
}

const App: React.FC = () => {
  const startColor = {
    r : Math.floor(Math.random() * 256),
    g : Math.floor(Math.random() * 256),
    b : Math.floor(Math.random() * 256),
  };
  const endColor = {
    r : Math.floor(Math.random() * 256),
    g : Math.floor(Math.random() * 256),
    b : Math.floor(Math.random() * 256),
  };
  const steps = 10;
  const gradientColors =  generateGradient(startColor, endColor, steps);

  function shuffle<T>(array: T[]): T[] {
    let len = array.length;
    while (len > 1) {
      let rand = Math.floor(Math.random() * len);
      len--;
      let temp = array[len];
      array[len] = array[rand];
      array[rand] = temp;
  }
    return array;
  }

  const [list, setList] = React.useState(() =>{
    const sortedColors = new Array(steps).fill(0).map((_, i) => ({
      key: i,
      content: `rgb(${gradientColors[i].r}, ${gradientColors[i].g}, ${gradientColors[i].b})`
    }));
    return sortedColors}
  );

  return (
    <div className="h-full flex items-center justify-center">
      <Sortable list={list} setList={setList}></Sortable>
    </div>
  );
};

export default App;
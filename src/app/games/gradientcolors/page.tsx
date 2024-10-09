'use client'
import React, { useState, useEffect, useCallback } from 'react';
import Sortable from '@/app/games/gradientcolors/sortable';
import { warn } from 'console';

interface ColorProps {
  r: number,
  g: number,
  b: number,
}

interface ItemProps {
  key: number;
  content: string;
}

// 生成渐变色卡
function generateGradient(startColor: ColorProps, endColor: ColorProps, steps: number) {
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
  const [colorList, setColorList] = useState<ItemProps[]>([]);
  const [shouldCheckWin, setShouldCheckWin] = useState(false);

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

  const sortedColors = new Array(steps).fill(0).map((_, i) => ({
    key: i,
    content: `rgb(${gradientColors[i].r}, ${gradientColors[i].g}, ${gradientColors[i].b})`
  }));

  function checkWin() {
    const isWin = colorList.every((value, index) => value.key === index) || colorList.every((value, index) => value.key === steps - index - 1);
    if( isWin ) {
      alert('win');
    }
  }

  useEffect(() => {
    if (shouldCheckWin) {
      checkWin();
      setShouldCheckWin(false);
    }
  }, [shouldCheckWin]);

  useEffect(() => {
    const randomColors = shuffle(sortedColors);
    setColorList(randomColors);
  }, []);

  return (
    <div className="h-full flex items-center justify-center">
      <Sortable list={colorList} setList={(newList) => {setColorList(newList)}} onMouseUp={() => setShouldCheckWin(true)}></Sortable>
    </div>
  );
};

export default App;
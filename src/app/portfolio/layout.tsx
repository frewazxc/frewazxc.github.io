"use client"

import React, { useState } from 'react';
import CursorFollower from "@/components/custom/cursorfollower";
import CustomCursor from '@/components/custom/customCursor';
import VantaEffect from '@/components/vantaEffect';

export default function Layout( {children}:{children:React.ReactNode}) {
  const [cursorRadius, setCursorRadius] = useState(24);
  const [currentPage, setCurrentPage] = useState(0);

  return (
    <>
      {/* <CustomCursor/> */}
      <CursorFollower/>
      <div className='h-screen w-screen'>
        <div>
          <VantaEffect />
          {children}
        </div>
      </div>
    </>
    );

}
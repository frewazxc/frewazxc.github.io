"use client"

import React, { useState } from 'react';
import CursorFollower from "@/app/ui/cursorfollower";
import GlobalNav from '@/app/ui/global-nav';

export default function Layout( {children}:{children:React.ReactNode}) {
  const [cursorRadius, setCursorRadius] = useState(24);
  const [currentPage, setCurrentPage] = useState(0);

 //todo 圆形细微移动效果

 //todo 鼠标离开窗口后消失


  return (
    <>
      <CursorFollower cursorRadius={cursorRadius}/>
      <div>
        <div className="shark-wrap">
            {/* <GlobalNav onClick={(pageId:number)=>setCurrentPage(pageId)}  currentPage={currentPage}/> */}
          {children}
        </div>
      </div>
    </>
    );

}
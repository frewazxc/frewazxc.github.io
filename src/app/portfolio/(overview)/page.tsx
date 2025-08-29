"use client"

import React, { Children, useState } from 'react';
import WorksSection from './works-section';
import HomeSection from './home-section';
import AboutSection from './about-section';
import GlobalNav from '@/components/custom/global-nav';

export default function Page() {
  const [currentPage, setCurrentPage] = useState(0);

  return (
    <div>
      {/* <GlobalNav onClick={(pageId:number)=>setCurrentPage(pageId)} currentPage={currentPage}/> */}
      <div className='h-screen w-300 flex transition-transform duration-m'
            style={{transform: 'translateX(-' + currentPage * 100 + 'vw)'}}
            id='container' 
            onWheel={(e => {
              if (e.deltaY > 0) {
                setCurrentPage((prevPage) => Math.min(prevPage + 1, 2))
              } else {
                setCurrentPage((prevPage) => Math.max(prevPage - 1, 0))
              }; 
              })}>
        <HorizontalPage title="home">
          <HomeSection/>
        </HorizontalPage>
        <HorizontalPage title="works">
          <WorksSection/>
        </HorizontalPage>
        <HorizontalPage title='about'>
          <AboutSection/>
        </HorizontalPage>
      </div>
    </div>
  );
}


function HorizontalPage({children, title}:{children:React.ReactNode, title:string}) {
  return (
    <div id={title} className='w-screen flex flex-col flex-grow justify-center snap-center'>
      {children}
    </div>
  )
}
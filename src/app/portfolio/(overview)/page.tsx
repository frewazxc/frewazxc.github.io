"use client"

import React, { Children, useState } from 'react';
import WorksSection from './works-section';
import HomeSection from './home-section';
import AboutSection from './about-section';
import style from "./page.module.css";
import { transform } from 'next/dist/build/swc';
import GlobalNav from '@/app/ui/global-nav';

export default function Page() {
  const [currentPage, setCurrentPage] = useState(0);

  return (
    <div>
      <GlobalNav onClick={(pageId:number)=>setCurrentPage(pageId)} currentPage={currentPage}/>
      <div className='h-screen w-300 flex transition-transform duration-m'
            style={{transform: 'translateX(-' + currentPage * 100 + 'vw)'}}
            id='container' 
            onWheel={(e => {
              if (e.deltaY > 0) {
                setCurrentPage((prevPage) => Math.min(prevPage + 1, 2))
              } else {
                setCurrentPage((prevPage) => Math.max(prevPage - 1, 0))
              }; })}>
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

function NavItem( {title, onItemClick, status}:{title:string, onItemClick:Function, status:string} ) {
  return (
    <a href={`/#${title}`} onClick={e => { e.preventDefault(); onItemClick() }} className={'nav-item' + (status==='selected'? ' active' : '')}>
      {title[0].toUpperCase()+title.substring(1)}
    </a>
  )
}

function HorizontalPage({children, title}:{children:React.ReactNode, title:string}) {
  return (
    <div id={title} className='w-screen flex flex-col flex-grow justify-center snap-center'>
      {children}
    </div>
  )
}
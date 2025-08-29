"use client"

import Link from "next/link";
import { useState } from 'react';

const links = [
  { id: 0, name: 'home' },
  { id: 1, name: 'works' },
  { id: 2, name: 'about' },
];

export default function GlobalNav({ onClick, currentPage } : { onClick:Function, currentPage:number }) {
  const [isShowContact, setIsShowContact] = useState(false)

  //todo 显示contact弹窗

  return(
    <nav className='w-full fixed top-6 right-6 flex justify-end z-50' id="nav">
      {links.map((link) => {
        return (
          <Link 
            href={`/#${link.name}`} 
            onClick={e => { e.preventDefault(); onClick(link.id) }} 
            
            className={'flex justify-center no-underline w-1/12 min-w-28 hover:text-cyan' + (currentPage===link.id? ' text-cyan' : ' text-white')}>
              {link.name[0].toUpperCase()+link.name.substring(1)}
          </Link>)
      })}
        <Link href='/#contact' className="flex justify-center text-white no-underline w-1/12 min-w-28 hover:text-cyan">
          Contact
        </Link>
        {isShowContact? (<h1>111</h1>) : <></>}
    </nav>)
}
"use client"

import React, { useState, useEffect } from 'react';
import Works from './works';
import style from "./page.module.css";

export default function Home() {
  const [currentPage, setCurrentPage] = useState(0);

  const updateNav = () => {
    const navItems = Array.from(document.querySelectorAll('#nav > *'));
    if (navItems) {
      navItems.forEach((item, index) => {
        if (index === currentPage) {
            item.classList.add('active');
        } else {
            item.classList.remove('active');
        }
    });}
  }
  
  useEffect(() => {
    const container = document.getElementById('container');
    if (container) {
      container.style.transform = 'translateX(-' + currentPage * 100 + 'vw)';
    }
    updateNav();
  }, [currentPage]);

  return (
    <div>
      <nav className={style['nav-home']} id="nav">
        <a href="#home" onClick={e => { e.preventDefault(); setCurrentPage(0); }} color={(currentPage === 0 ? 'cyan' : '')}>Home</a>
        <a href="#work" onClick={e => { e.preventDefault(); setCurrentPage(1); }} color={(currentPage === 1 ? 'cyan' : '')}>Works</a>
        <a href="#about" onClick={e =>{ e.preventDefault(); setCurrentPage(2); }} color={(currentPage === 2 ? 'cyan' : '')}>About</a>
        <a href="#contact">Contact</a>
      </nav>
      <div className={style.container} id='container' onWheel={(e => {
            if (e.deltaY > 0) {
              setCurrentPage((prevPage) => Math.min(prevPage + 1, 2))
            } else {
              setCurrentPage((prevPage) => Math.max(prevPage - 1, 0))
            }; })}>
        <div className={style.page} id="home">
          <h1>Write Something</h1>
          <p>123456</p>
        </div>
        <div className={style.page} id="work">
          <Works/>
        </div>
        <div className={style.page} id="about">
          789
        </div>
        <div className={style.contact} id="contact">
          100
        </div>
      </div>
    </div>
  );
}
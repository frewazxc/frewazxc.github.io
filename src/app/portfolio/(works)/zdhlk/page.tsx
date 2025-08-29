import ParallaxScrollGallery from '@/components/custom/portfolio/parallaxScrollGallery'
import ImageTrackingCursor from '@/components/custom/portfolio/imageTrackingCursor';
import React from 'react'

const images = [
  "/zdhlk/01.png",
  "/zdhlk/02.png",
  "/zdhlk/03.png",
  "/zdhlk/04.png",
  "/zdhlk/05.png",
  "/zdhlk/06.png",
  "/zdhlk/07.png",
  "/zdhlk/08.png",
  "/zdhlk/09.png",
  "/zdhlk/10.png",
  "/zdhlk/11.png",
  "/zdhlk/12.png",
];
const page = () => {
  return (
    <div className='w-full flex flex-col'>
      <div className="h-screen">
        <ImageTrackingCursor imgUrl='/zdhlk/01.png'/>
      </div>
      <ParallaxScrollGallery imageList={images}/>
      <div className="h-screen"></div>
    </div>
  )
};

export default page;
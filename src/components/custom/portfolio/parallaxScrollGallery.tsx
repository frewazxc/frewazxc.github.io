'use client';
import { useEffect, useRef, useState } from 'react'; 
import Image from 'next/image';
import Lenis from 'lenis';
import { useTransform, useScroll, motion } from 'framer-motion'; 
import { MotionValue } from 'framer-motion/dom';

// 定义主组件
export default function ParallaxScrollGallery( props: any ) {
  const images = props.imageList;
  
  const gallery = useRef(null); // 创建一个引用，用于访问画廊的 DOM 元素
  const [dimension, setDimension] = useState({width:0, height:0}); // 状态用于存储窗口的宽度和高度

  // 使用 useScroll Hook 获取滚动进度
  const { scrollYProgress } = useScroll({
    target: gallery, // 目标是 gallery 引用
    offset: ['start end', 'end start'] // 设置滚动的偏移范围
  })

  const { height } = dimension; // 解构获取高度
  const y1 = useTransform(scrollYProgress, [0, 1], [-height * 1, height * 1]);
  const y2 = useTransform(scrollYProgress, [0, 1], [-height * 2.5, height * 2]);
  const y3 = useTransform(scrollYProgress, [0, 1], [-height * 1, height * 1]);

  useEffect(() => {
    const lenis = new Lenis(); // 创建 Lenis 实例以实现平滑滚动

    // 请求动画帧的回调函数
    const raf = (time: number) => {
      lenis.raf(time); // 更新 Lenis
      requestAnimationFrame(raf); // 继续请求下一帧
    }

    // 窗口大小变化时更新尺寸
    const resize = () => {
      setDimension({width: window.innerWidth, height: window.innerHeight}); // 更新状态
    }

    window.addEventListener("resize", resize); // 添加窗口大小变化事件监听器
    requestAnimationFrame(raf); // 开始请求动画帧
    resize(); // 初始化时调用一次 resize

    // 清理函数，组件卸载时移除事件监听器
    return () => {
      window.removeEventListener("resize", resize);
    }
  }, [])

  return (
    <div ref={gallery} className=" w-full flex gap-8 p-8 overflow-hidden">
      {/* 渲染三个 Column 组件，传递不同的图像和 y 值 */}
      <Column images={[images[1], images[2], images[3], images[4], images[5], images[6], images[7]]} y={y1}/>
      <Column images={[images[3], images[4], images[7], images[1], images[0], images[10], images[6]]} y={y2}/>
      <Column images={[images[6], images[7], images[8], images[9], images[2], images[3], images[1]]} y={y3}/>
    </div>
  )
}

// 定义 Column 组件，接受图像数组和 y 值作为 props
const Column: React.FC<{images: string[], y: MotionValue<number>}> = ({images, y}) => {
  return (
    <motion.div 
      className="relative h-full flex-1 flex flex-col gap-8"
      style={{y}} // 应用 y 值作为样式
    >
      {
        images.map((src: string, i: number) => {
          return (
            <div className='w-full flex-1'>
              <Image 
                src={src} // 图像路径
                alt='image' 
                width={1000}
                height={1000}
                priority // 优先加载
              />
            </div>
          )
        })
      }
    </motion.div>
  )
}

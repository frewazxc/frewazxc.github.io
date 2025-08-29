'use client'
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import useMousePosition from '@/hooks/useMousePosition'; // 确保路径正确
import { url } from 'inspector';

export default function ImageTrackingCursor({ imgUrl }: { imgUrl: string }) {
    const [rotateX, setRotateX] = useState(0);
    const [rotateY, setRotateY] = useState(0);

    const imgWidth = window.innerWidth * 0.6;
    // 使用自定义 hook 获取鼠标位置
    const mousePosition = useMousePosition({ includeTouch: false });

    const rotateRange = {
        minX: 20,
        maxX: 25,
        minY: -15,
        maxY: -12,
    }

    useEffect(() => {
        if (mousePosition.x !== null && mousePosition.y !== null) {
            // 计算旋转角度
            const x = mousePosition.x;
            const y = mousePosition.y;

            // 计算新的旋转值
            const newRotateX = ((x / window.innerWidth) * (rotateRange.maxX - rotateRange.minX)) + rotateRange.minX; 
            const newRotateY = ((y / window.innerHeight) * (rotateRange.maxY - rotateRange.minY)) + rotateRange.minY;
            setRotateX(newRotateX);
            setRotateY(newRotateY);
        }
    }, [mousePosition]);

    return (
        <motion.div
            className="w-full h-full overflow-hidden"
            style={{
                display: 'flex',
                placeItems: 'end',
                placeContent: 'end',
                perspective: 600
            }}
        >
            <motion.div
                className="rounded-xl"
                style={{
                    width: imgWidth,
                    height: imgWidth * 9 / 16,
                    backgroundImage: `url(${imgUrl})`,
                    backgroundSize: '100% 100%',
                    rotateX: rotateX,
                    rotateY: rotateY,
                    rotateZ: 15,
                }}
            />
        </motion.div>
    );
}

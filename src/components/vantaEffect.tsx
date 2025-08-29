// components/VantaEffect.js
import { useEffect } from 'react';
import * as THREE from 'three';
import FOG from 'vanta/dist/vanta.fog.min';

const VantaEffect = () => {
    useEffect(() => {
        const vantaEffect = FOG({
            el: '#vanta-bg',
            THREE: THREE, 
            mouseControls: true,
            touchControls: true,
            gyroControls: false,
            minHeight: 200.00,
            minWidth: 200.00,
            highlightColor: 0xe3ff,
            midtoneColor: 0x0,
            lowlightColor: 0x0,
            baseColor: 0x0,
            blurFactor: 0.89,
            speed: 1.20,
            zoom: 0.90
        });

        return () => {
            if (vantaEffect) vantaEffect.destroy();
        };
    }, []);

    return <div id="vanta-bg" className='fixed top-0 left-0 w-screen h-screen -z-10' />;
};

export default VantaEffect;

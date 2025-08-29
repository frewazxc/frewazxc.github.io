"use client"

import styled, { keyframes } from 'styled-components';

interface StyledWorksblockProps {
    $top: string;
    $left: string;
}

const geometryAnimation = keyframes`
0% {
    transform: scale(1.05);
    stroke: rgba(255, 255, 255, 0.6);
}
50% {
    stroke: transparent;
}
100% {
    transform: scale(2.5);
}`;

const AnimatedGeo_0_0 = styled.svg`
    position: fixed;
    stroke-width: 4px;
    stroke: white;
    mix-blend-mode: difference;
    `;

const AnimatedGeo_0 = styled.svg`
    position: fixed;
    stroke-width: 7px;
    stroke: white;
    mix-blend-mode: difference;
    `;

const AnimatedGeo_1 = styled.svg`
    position: fixed;
    animation: ${geometryAnimation} 6s infinite;
    mix-blend-mode: difference;
    `;

const AnimatedGeo_2 = styled.svg`
    position: fixed;
    animation: ${geometryAnimation} 6s infinite;
    animation-delay: .7s;
    mix-blend-mode: difference;
    `;

const AnimatedGeo_3 = styled.svg`
    position: fixed;
    animation: ${geometryAnimation} 6s infinite;
    animation-delay: 1.4s;
    mix-blend-mode: difference;
    `;

const StyledWorksblock = styled.button<StyledWorksblockProps>`
    background:transparent;
    position: fixed;
    top: ${({ $top }) => $top};
    left: ${({ $left }) => $left};
    display: flex;
    justify-content: center;
    align-items: center;
`;

export default function WorksBlock ({ top, left, geoPath, viewbox, title }: {
    top: string;
    left: string;
    geoPath: string;
    title: string;
    viewbox: string;
})  {

    return <StyledWorksblock $top={top} $left={left}>
        <AnimatedGeo_0_0 xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" fill="none" version="1.1" height="160" viewBox={viewbox}><g><path d={geoPath} /></g></AnimatedGeo_0_0>    
        <AnimatedGeo_0 xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" fill="none" version="1.1" height="160" viewBox={viewbox}><g><path d={geoPath} /></g></AnimatedGeo_0>    
        <AnimatedGeo_1 xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" fill="none" version="1.1" height="160" viewBox={viewbox}><g><path d={geoPath} /></g></AnimatedGeo_1>    
        <AnimatedGeo_2 xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" fill="none" version="1.1" height="160" viewBox={viewbox}><g><path d={geoPath} /></g></AnimatedGeo_2>    
        <AnimatedGeo_3 xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" fill="none" version="1.1" height="160" viewBox={viewbox}><g><path d={geoPath} /></g></AnimatedGeo_3>    
        <h1>{title}</h1>
    </StyledWorksblock>;
}
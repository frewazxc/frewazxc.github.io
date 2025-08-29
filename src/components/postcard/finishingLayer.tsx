  'use client';
  import React from 'react';
  import { Canvas } from '@react-three/fiber';
  import { OrbitControls, useTexture } from '@react-three/drei';
  import { useGoodsStore } from '@/store/goods-store';
  import * as THREE from 'three';
  import { Option } from '../ui/multiple-selector';
  
    const width = useGoodsStore((state: any) => state.width);
    const height = useGoodsStore((state: any) => state.height);
    const thickness = useGoodsStore((state: any) => state.thickness);
    const transparentMat = new THREE.MeshLambertMaterial({ transparent: true, opacity: 0 });
    const whiteMat = new THREE.MeshLambertMaterial({ color: 0xffffff });
    const sideMat = new THREE.MeshLambertMaterial({ color: useGoodsStore((state: any) => state.sideColor) });
    const selectedFinishings = useGoodsStore((state: any) => state.selectedFinishings);
  
  const Decoration = (finishing: Option) => {
    if (finishing.image && typeof finishing.image === 'string') {
      const texture = useTexture(finishing.image);
      const imageMat = new THREE.MeshLambertMaterial({ map: texture, transparent: true });
      const positionZ =
        finishing.group && typeof finishing.group === 'string' && finishing.group === '正面'
          ? thickness / 2 + 0.1
          : -thickness / 2 - 0.1;

      return (
        <mesh position={[0, 0, positionZ]}
          material={[sideMat,
            sideMat,
            sideMat,
            sideMat,
            finishing.group === '正面' ? imageMat : transparentMat,
            finishing.group === '背面' ? transparentMat : imageMat]}>
          <boxGeometry args={[width, height, 0.1]} />
        </mesh>
      );
    }
    else {
      const positionZ =
        finishing.group === '正面'
          ? thickness / 2 + 0.1
          : -thickness / 2 - 0.1;
      return (
        <mesh position={[0, 0, positionZ]} material={whiteMat}>
          <boxGeometry args={[width, height, 0.1]} />
        </mesh>
      );
    }
  }
  const PrintLayer = ({ image, frontSide }: { image: string, frontSide: boolean }) => {
    const texture = useTexture(image);
    const imageMat = new THREE.MeshLambertMaterial({ map: texture, transparent: true });
    const positionZ = frontSide ? thickness / 2 + 0.1 : -thickness / 2 - 0.1;
    return (
      <mesh position={[0, 0, positionZ]}
        material={[sideMat, sideMat, sideMat, sideMat,
          frontSide ? imageMat : transparentMat,
          frontSide ? transparentMat : imageMat]}>
        <boxGeometry args={[width, height, 0.1]} />
      </mesh>
    );
  }
  const WhiteInkLayer = ({ image, frontSide }: { image: string, frontSide: boolean }) => {
    const imageMat = new THREE.MeshLambertMaterial({ map: useTexture(image), transparent: true });
    const positionZ = frontSide ? thickness / 2 + 0.05 : -thickness / 2 - 0.05;
    return (
      <mesh position={[0, 0, positionZ]}
        material={[sideMat, sideMat, sideMat, sideMat,
          frontSide ? imageMat : transparentMat,
          frontSide ? transparentMat : imageMat]}>
        <boxGeometry args={[width, height, 0.1]} />
      </mesh>
    );
  }

  export { Decoration, PrintLayer, WhiteInkLayer };
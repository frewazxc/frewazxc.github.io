import { StateCreator } from 'zustand'
import * as THREE from 'three'

export interface MatSliceType {
  transparentMaterial: THREE.MeshBasicMaterial
  customTextureMaterial: THREE.MeshBasicMaterial
  setCustomTextureMaterial: (image: string) => void
}

export const createMatSlice: StateCreator<MatSliceType> = (set) => ({
  transparentMaterial: new THREE.MeshBasicMaterial({ transparent: true, opacity: 0 }),
  customTextureMaterial: new THREE.MeshBasicMaterial({ transparent: true, map: new THREE.Texture() }),

  setCustomTextureMaterial: (image: string) => { 
    new THREE.TextureLoader().load(image, (texture) => {
      set({ customTextureMaterial: new THREE.MeshBasicMaterial({ transparent: true, map: texture }) });
    });
    }
})

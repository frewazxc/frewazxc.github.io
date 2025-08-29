import { StateCreator } from 'zustand'

export interface EnvSliceType {
  lightX: number
  lightY: number
  lightZ: number
  lightIntensity: number
  setLightX: (value: number) => void
  setLightY: (value: number) => void
  setLightZ: (value: number) => void
  setLightIntensity: (value: number) => void
}

export const createEnvSlice: StateCreator<EnvSliceType> = (set) => ({
  lightX: 1,
  lightY: 1,
  lightZ: 1,
  lightIntensity: 1,
  setLightX: (lightX) => set({ lightX }),
  setLightY: (lightY) => set({ lightY }),
  setLightZ: (lightZ) => set({ lightZ }),
  setLightIntensity: (lightIntensity) => set({ lightIntensity }),
})

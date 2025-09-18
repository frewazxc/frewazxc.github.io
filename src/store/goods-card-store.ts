import { StateCreator } from 'zustand'
import * as THREE from 'three';

export interface CardSliceType {
  width: number
  height: number
  thickness: number
  formats: { label: string; height: number; width: number }[]
  finishingList: { [key: string]: string | boolean | undefined | number }[]
  selectedFinishings: { [key: string]: string | boolean | undefined | number }[]
  setWidth: (width: number) => void
  setHeight: (height: number) => void
  setThickness: (thickness: number) => void
  setSelectedFinishings: (finishings: { [key: string]: string | boolean | undefined | number }[]) => void
}

export const createCardSlice: StateCreator<CardSliceType> = (set) => ({
  width: 0,
  height: 0,
  thickness: 1,
  formats: [
    { label: '拍立得-竖向', height: 100, width: 65 },
    { label: '拍立得-横向', height: 65, width: 100 },
    { label: '明信片-竖向', height: 150, width: 100 },
    { label: '明信片-横向', height: 100, width: 150 },
  ],
  finishingList: [
    { label: '四色印刷', key: 'printA', group: '正面', image: '/goods/print.png' },
    { label: '光油', key: 'glossuvA', group: '正面', image: '/goods/glossuv.png' },
    { label: '白墨', key: 'whiteinkA', group: '正面', image: '/goods/whiteink.png' },
    { label: '逆向UV', key: 'reverseuvA', group: '正面', image: '/goods/reverseuv.png' },
    { label: '烫色', key: 'foilstampingA', group: '正面', image: '/goods/foilstamping.png'},
    { label: '覆膜', key: 'laminationA', group: '正面' },
    { label: '四色印刷', key: 'printB', group: '反面', image: '/goods/print.png' },
    { label: '光油', key: 'glossuvB', group: '反面', image: '/goods/glossuv.png' },
    { label: '白墨', key: 'whiteinkB', group: '反面', image: '/goods/whiteink.png' },
    { label: '逆向UV', key: 'reverseuvB', group: '反面', image: '/goods/reverseuv.png' },
    { label: '烫色', key: 'foilstampingB', group: '反面', image: '/goods/foilstamping.png'},
    { label: '覆膜', key: 'laminationB', group: '反面' },
    { label: '侧边', key: 'side', group: '其他' },
  ],
  selectedFinishings: [
    { label: '四色印刷（正）', key: 'printA', group: '正面', image: '/goods/print.png' },
  ],

  setWidth: (width) => set({ width }),
  setHeight: (height) => set({ height }),
  setThickness: (thickness) => set({ thickness }),
  setSelectedFinishings: (finishings) => set({ selectedFinishings: finishings }),
})

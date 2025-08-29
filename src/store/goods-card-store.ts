import { Option } from '@/components/ui/multiple-selector'
import { StateCreator } from 'zustand'
import * as THREE from 'three';

export interface CardSliceType {
  width: number
  height: number
  thickness: number
  formats: { label: string; height: number; width: number }[]
  finishingList: Option[]
  selectedFinishings: Option[]
  setWidth: (width: number) => void
  setHeight: (height: number) => void
  setThickness: (thickness: number) => void
  setSelectedFinishings: (finishings: Option[]) => void
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
    { label: '四色印刷（正）', value: 'printA', group: '正面', image: '/goods/print.png', fixed: true, disable: true },
    { label: '光油（正）', value: 'glossuvA', group: '正面', image: '/goods/glossuv.png'},
    { label: '白墨（正）', value: 'whiteinkA', group: '正面', image: '/goods/whiteink.png' },
    { label: '逆向UV（正）', value: 'reverseuvA', group: '正面', image: '/goods/reverseuv.png' },
    { label: '烫色（正）', value: 'foilstampingA', group: '正面', image: '/goods/foilstamping.png' },
    { label: '覆膜（正）', value: 'laminationA', group: '正面' },
    { label: '四色印刷', value: 'printB', group: '反面', image: '/goods/print.png' },
    { label: '光油', value: 'glossuvB', group: '反面', image: '/goods/glossuv.png' },
    { label: '白墨', value: 'whiteinkB', group: '反面', image: '/goods/whiteink.png' },
    { label: '逆向UV', value: 'reverseuvB', group: '反面', image: '/goods/reverseuv.png' },
    { label: '烫色', value: 'foilstampingB', group: '反面', image: '/goods/foilstamping.png' },
    { label: '覆膜', value: 'laminationB', group: '反面' },
    { label: '侧边', value: 'side', group: '其他' },
  ],
  selectedFinishings: [
    { label: '四色印刷（正）', value: 'printA', group: '正面', image: '/goods/print.png', fixed: true, disable: true },
  ],

  setWidth: (width) => set({ width }),
  setHeight: (height) => set({ height }),
  setThickness: (thickness) => set({ thickness }),
  setSelectedFinishings: (finishings) => set({ selectedFinishings: finishings }),
})

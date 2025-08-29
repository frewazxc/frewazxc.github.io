import { create } from 'zustand'
import { createCardSlice, CardSliceType } from './goods-card-store'
import { createEnvSlice, EnvSliceType } from './goods-env-store';
import { createMatSlice, MatSliceType } from './goods-mat-store';

type CombinedState = CardSliceType & EnvSliceType & MatSliceType;

export const useGoodsStore = create<CombinedState>()((...a) => ({
  ...createCardSlice(...a),
  ...createEnvSlice(...a),
  ...createMatSlice(...a),
}));

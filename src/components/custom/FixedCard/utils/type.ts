import { ComputedRef } from 'vue';

export type TScrollOption = {
  left?: number;
  top?: number;
  behavior?: ScrollBehavior;
};

export type TScrollMethod = (arg0: TScrollOption) => void;

export type FixedCardSlots = {
  contentHeight: ComputedRef<number>;
  scrollTo: TScrollMethod;
  scrollBy: TScrollMethod;
};

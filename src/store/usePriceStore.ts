import create from 'zustand';

interface PriceState {
  price: number;
  setPrice: (newPrice: number) => void;
}

const usePriceStore = create<PriceState>((set) => ({
  price: 0,
  setPrice: (newPrice) => set({ price: newPrice }),
}));

export default usePriceStore;

import { persist, createJSONStorage } from 'zustand/middleware';
import { CartStore, Product } from '@/lib/interfaces';
import toast from 'react-hot-toast';
import { create } from 'zustand';

export const useCart = create(
	persist<CartStore>(
		(set, get) => ({
			items: [],
			addItem: (data: Product) => {
				const currentItems = get().items;
				const existingItem = currentItems.find((item) => item.id === data.id);

				if (existingItem) {
					return toast.error('Item is already on the cart.');
				}

				set({ items: [...get().items, data] });
				toast.success('Item is added to the cart.');
			},

			removeItem: (id: string) => {
				set({ items: [...get().items.filter((item) => item.id !== id)] });
				toast.success('Item is removed from the cart.');
			},

			removeAll: () => set({ items: [] }),
		}),
		{
			name: 'cart-storage',
			storage: createJSONStorage(() => localStorage),
		}
	)
);

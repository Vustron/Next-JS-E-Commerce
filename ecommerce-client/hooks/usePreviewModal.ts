import { PreviewModalStore, Product } from '@/lib/interfaces';
import { create } from 'zustand';

export const usePreviewModal = create<PreviewModalStore>((set) => ({
	isOpen: false,
	data: undefined,
	onOpen: (data: Product) => set({ data, isOpen: true }),
	onClose: () => set({ isOpen: false }),
}));

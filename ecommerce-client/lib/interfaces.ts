import React, { MouseEventHandler } from 'react';

export interface ContainerProps {
	children: React.ReactNode;
}

export interface Billboard {
	id: string;
	label: string;
	imageUrl: string;
}

export interface Category {
	id: string;
	name: string;
	billboard: Billboard;
}

export interface ButtonProps
	extends React.ButtonHTMLAttributes<HTMLButtonElement> {}

export interface BillboardProps {
	data: Billboard;
}

export interface Product {
	id: string;
	category: Category;
	name: string;
	price: string;
	isFeatured: boolean;
	size: Size;
	color: Color;
	images: Image[];
}

export interface Size {
	id: string;
	name: string;
	value: string;
}

export interface Color {
	id: string;
	name: string;
	value: string;
}

export interface Image {
	id: string;
	url: string;
}

export interface QueryFilterProducts {
	categoryId?: string;
	colorId?: string;
	sizeId?: string;
	isFeatured?: boolean;
}

export interface ProductListProps {
	title: string;
	items: Product[];
}

export interface ProductCardProps {
	data: Product;
}

export interface IconButtonProps {
	onClick?: MouseEventHandler<HTMLButtonElement> | undefined;
	icon: React.ReactElement;
	className?: string;
}

export interface CurrencyProps {
	value?: string | number;
}

export interface ProductPageProps {
	params: {
		productId: string;
	};
}

export interface GalleryProps {
	images: Image[];
}

export interface GalleryTabProps {
	image: Image;
}

export interface InfoProps {
	data: Product;
}

export interface CategoryPageProps {
	params: {
		categoryId: string;
	};
	searchParams: {
		colorId: string;
		sizeId: string;
	};
}

export interface FilterProps {
	data: (Size | Color)[];
	name: string;
	valueKey: string;
}

export interface MobileFiltersProps {
	sizes: Size[];
	colors: Color[];
}

export interface PreviewModalStore {
	isOpen: boolean;
	data?: Product;
	onOpen: (data: Product) => void;
	onClose: () => void;
}

export interface PreviewModalProps {
	isOpen: boolean;
	onClose: () => void;
	children: React.ReactNode;
}

export interface CartStore {
	items: Product[];
	addItem: (data: Product) => void;
	removeItem: (id: string) => void;
	removeAll: () => void;
}

export interface CartItemProps {
	data: Product;
}

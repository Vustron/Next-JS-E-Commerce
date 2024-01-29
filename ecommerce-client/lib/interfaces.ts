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

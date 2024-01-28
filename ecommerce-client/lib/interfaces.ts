import React from 'react';

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

import * as z from 'zod';

import {
	BillboardFormSchema,
	CategoryFormSchema,
	ColorsFormSchema,
	ProductsFormSchema,
	SetUpFormSchema,
	SettingsFormSchema,
	SizesFormSchema,
} from '@/lib/constants/validation';

import { PopoverTrigger } from '@/components/ui/popover';

export type PopoverTriggerProps = React.ComponentPropsWithoutRef<
	typeof PopoverTrigger
>;

export type SettingsFormValues = z.infer<typeof SettingsFormSchema>;

export type SetUpFormValues = z.infer<typeof SetUpFormSchema>;

export type BillboardFormValues = z.infer<typeof BillboardFormSchema>;

export type CategoryFormValues = z.infer<typeof CategoryFormSchema>;

export type SizesFormValues = z.infer<typeof SizesFormSchema>;

export type ColorsFormValues = z.infer<typeof ColorsFormSchema>;

export type ProductsFormValues = z.infer<typeof ProductsFormSchema>;

export type BillboardColumn = {
	id: string;
	label: string;
	createdAt: string;
};

export type CategoryColumn = {
	id: string;
	name: string;
	billboardLabel: string;
	createdAt: string;
};

export type SizesColumn = {
	id: string;
	name: string;
	value: string;
	createdAt: string;
};

export type ColorsColumn = {
	id: string;
	name: string;
	value: string;
	createdAt: string;
};

export type ProductColumn = {
	id: string;
	name: string;
	price: string;
	size: string;
	category: string;
	color: string;
	isFeatured: boolean;
	isArchived: boolean;
	createdAt: string;
};

export type OrderColumn = {
	id: string;
	phone: string;
	address: string;
	isPaid: boolean;
	totalPrice: string;
	products: string;
	createdAt: string;
};

import * as z from 'zod';

export const SetUpFormSchema = z.object({
	name: z.string().min(1, {
		message: 'Store name is required',
	}),
});

export const SettingsFormSchema = z.object({
	name: z.string().min(1, {
		message: 'Store name is required',
	}),
});

export const BillboardFormSchema = z.object({
	label: z.string().min(1, {
		message: 'Billboard label is required',
	}),
	imageUrl: z.string().min(1, {
		message: 'Billboard imageUrl is required',
	}),
});

export const CategoryFormSchema = z.object({
	name: z.string().min(1, {
		message: 'Category name is required',
	}),
	billboardId: z.string().min(1, {
		message: 'Billboard ID is required',
	}),
});

export const SizesFormSchema = z.object({
	name: z.string().min(1, {
		message: 'Name is required',
	}),
	value: z.string().min(1, {
		message: 'Value is required',
	}),
});

export const ColorsFormSchema = z.object({
	name: z.string().min(1, {
		message: 'Name is required',
	}),
	value: z
		.string()
		.min(4, {
			message: 'Value is required',
		})
		.regex(/^#/, {
			message: 'String must be a valid hex code',
		}),
});

export const ProductsFormSchema = z.object({
	name: z.string().min(1, {
		message: 'Name is required',
	}),
	images: z.object({ url: z.string() }).array(),
	price: z.coerce.number().min(1, {
		message: 'Price is required',
	}),
	categoryId: z.string().min(1, {
		message: 'Category ID is required',
	}),
	colorId: z.string().min(1, {
		message: 'Color ID is required',
	}),
	sizeId: z.string().min(1, {
		message: 'Size ID is required',
	}),
	isFeatured: z.boolean().default(false).optional(),
	isArchived: z.boolean().default(false).optional(),
});

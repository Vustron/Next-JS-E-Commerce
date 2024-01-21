import * as z from 'zod';

export const SetUpFormSchema = z.object({
	name: z.string().min(1, {
		message: 'Store name is required',
	}),
});

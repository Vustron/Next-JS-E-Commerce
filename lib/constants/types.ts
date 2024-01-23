import * as z from 'zod';

import {
	SetUpFormSchema,
	SettingsFormSchema,
} from '@/lib/constants/validation';

import { PopoverTrigger } from '@/components/ui/popover';

export type PopoverTriggerProps = React.ComponentPropsWithoutRef<
	typeof PopoverTrigger
>;

export type SettingsFormValues = z.infer<typeof SettingsFormSchema>;

export type SetUpFormValues = z.infer<typeof SetUpFormSchema>;

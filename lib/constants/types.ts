import * as z from 'zod';
import { PopoverTrigger } from '@/components/ui/popover';
import { SettingsFormSchema } from '@/lib/constants/validation';

export type PopoverTriggerProps = React.ComponentPropsWithoutRef<
	typeof PopoverTrigger
>;

export type SettingsFormValues = z.infer<typeof SettingsFormSchema>;

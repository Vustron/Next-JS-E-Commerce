import { BadgeProps } from '@/components/ui/badge';

export interface ApiAlertProps {
	title: string;
	description: string;
	variant: 'public' | 'admin';
}

export const textMap: Record<ApiAlertProps['variant'], string> = {
	public: 'Public',
	admin: 'Admin',
};

export const variantMap: Record<
	ApiAlertProps['variant'],
	BadgeProps['variant']
> = {
	public: 'secondary',
	admin: 'destructive',
};

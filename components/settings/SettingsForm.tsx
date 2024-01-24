'use client';

import axios from 'axios';
import { useState } from 'react';
import toast from 'react-hot-toast';
import { Trash } from 'lucide-react';
import { Store } from '@prisma/client';
import { useForm } from 'react-hook-form';
import useOrigin from '@/hooks/useOrigin';
import { Input } from '@/components/ui/input';
import ApiAlert from '@/components/ui/apiAlert';
import { Button } from '@/components/ui/button';
import Heading from '@/components/shared/Heading';
import { zodResolver } from '@hookform/resolvers/zod';
import { Separator } from '@/components/ui/separator';
import { useParams, useRouter } from 'next/navigation';
import AlertModal from '@/components/modals/alertModal';
import { SettingsFormValues } from '@/lib/constants/types';
import { SettingsFormSchema } from '@/lib/constants/validation';

import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from '@/components/ui/form';

interface SettingsFormProps {
	initialData: Store;
}

const SettingsForm: React.FC<SettingsFormProps> = ({ initialData }) => {
	// init origin
	const origin = useOrigin();

	// init router
	const router = useRouter();

	// init params
	const params = useParams();

	// init states
	const [isOpen, setIsOpen] = useState(false);
	const [isLoading, setIsLoading] = useState(false);

	// init form
	const form = useForm<SettingsFormValues>({
		resolver: zodResolver(SettingsFormSchema),
		defaultValues: initialData,
	});

	// update handler
	const onSubmit = async (values: SettingsFormValues) => {
		try {
			setIsLoading(true);

			await axios.patch(`/api/stores/${params.storeId}`, values);

			toast.success('Store updated');
			router.refresh();
		} catch (error: any) {
			console.log(error);
			toast.error('Something went wrong: ', error);
		} finally {
			setIsLoading(false);
		}
	};

	// delete handler
	const onDelete = async () => {
		try {
			setIsLoading(true);

			await axios.delete(`/api/stores/${params.storeId}`);

			toast.success('Store deleted');
			router.push('/');
			router.refresh();
		} catch (error: any) {
			console.log(error);
			toast.error(
				'Make sure you removed all products and categories first ',
				error
			);
		} finally {
			setIsLoading(false);
			setIsOpen(false);
		}
	};

	return (
		<>
			<AlertModal
				isOpen={isOpen}
				onClose={() => setIsOpen(false)}
				onConfirm={onDelete}
				isLoading={isLoading}
			/>
			<div className='flex items-center justify-between'>
				<Heading title='Settings' description='Manage store preferences' />

				<Button
					disabled={isLoading}
					variant='destructive'
					size='sm'
					onClick={() => setIsOpen(true)}
				>
					<Trash className='h-4 w-4' />
				</Button>
			</div>

			<Separator />

			<Form {...form}>
				<form
					onSubmit={form.handleSubmit(onSubmit)}
					className='space-y-8 w-full'
				>
					<div className='grid grid-cols-3 gap-8'>
						<FormField
							control={form.control}
							name='name'
							render={({ field }) => (
								<FormItem>
									<FormLabel>Name</FormLabel>
									<FormControl>
										<Input
											disabled={isLoading}
											placeholder='Store name...'
											{...field}
										/>
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
					</div>

					<Button disabled={isLoading} className='ml-auto' type='submit'>
						Save changes
					</Button>
				</form>
			</Form>

			<Separator />
			<ApiAlert
				title='NEXT_PUBLIC_API_URL'
				description={`${origin}/api/${params.storeId}`}
				variant='public'
			/>
		</>
	);
};

export default SettingsForm;

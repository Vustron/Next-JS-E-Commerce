'use client';

import axios from 'axios';
import { useState } from 'react';
import toast from 'react-hot-toast';
import { Trash } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { Size } from '@prisma/client';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import Heading from '@/components/shared/Heading';
import { zodResolver } from '@hookform/resolvers/zod';
import { Separator } from '@/components/ui/separator';
import { useParams, useRouter } from 'next/navigation';
import AlertModal from '@/components/modals/alertModal';
import { ColorsFormValues } from '@/lib/constants/types';
import { ColorsFormSchema } from '@/lib/constants/validation';

import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from '@/components/ui/form';

interface ColorsFormProps {
	initialData: Size | null;
}

const ColorsForm: React.FC<ColorsFormProps> = ({ initialData }) => {
	// init dynamic descriptions
	const title = initialData ? 'Edit color' : 'Create color';
	const description = initialData ? 'Edit a color' : 'Add a new color';
	const toastMessage = initialData ? 'Color updated' : 'Color created';
	const action = initialData ? 'Save Changes' : 'Create';

	// init router
	const router = useRouter();

	// init params
	const params = useParams();

	// init states
	const [isOpen, setIsOpen] = useState(false);
	const [isLoading, setIsLoading] = useState(false);

	// init form
	const form = useForm<ColorsFormValues>({
		resolver: zodResolver(ColorsFormSchema),
		defaultValues: initialData || {
			name: '',
			value: '',
		},
	});

	// update handler
	const onSubmit = async (values: ColorsFormValues) => {
		try {
			setIsLoading(true);

			if (initialData) {
				await axios.patch(
					`/api/${params.storeId}/colors/${params.sizeId}`,
					values
				);
			} else {
				await axios.post(`/api/${params.storeId}/colors`, values);
			}

			toast.success(toastMessage);
			router.push(`/${params.storeId}/colors`);
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

			await axios.delete(`/api/${params.storeId}/colors/${params.colorId}`);

			toast.success('Color deleted');
			router.push(`/${params.storeId}/colors`);
			router.refresh();
		} catch (error: any) {
			console.log(error);
			toast.error(
				'Make sure you removed all products using this color first',
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
				<Heading title={title} description={description} />

				{initialData && (
					<Button
						disabled={isLoading}
						variant='destructive'
						size='sm'
						onClick={() => setIsOpen(true)}
					>
						<Trash className='h-4 w-4' />
					</Button>
				)}
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
											placeholder='Size name...'
											{...field}
										/>
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>

						<FormField
							control={form.control}
							name='value'
							render={({ field }) => (
								<FormItem>
									<FormLabel>Value</FormLabel>
									<FormControl>
										<Input
											disabled={isLoading}
											placeholder='Color value...'
											{...field}
										/>
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
					</div>

					<Button disabled={isLoading} className='ml-auto' type='submit'>
						{action}
					</Button>
				</form>
			</Form>
		</>
	);
};

export default ColorsForm;

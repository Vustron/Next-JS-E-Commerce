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
import { SizesFormValues } from '@/lib/constants/types';
import { SizesFormSchema } from '@/lib/constants/validation';

import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from '@/components/ui/form';

interface SizesFormProps {
	initialData: Size | null;
}

const SizesForm: React.FC<SizesFormProps> = ({ initialData }) => {
	// init dynamic descriptions
	const title = initialData ? 'Edit size' : 'Create size';
	const description = initialData ? 'Edit a size' : 'Add a new size';
	const toastMessage = initialData ? 'Size updated' : 'Size created';
	const action = initialData ? 'Save Changes' : 'Create';

	// init router
	const router = useRouter();

	// init params
	const params = useParams();

	// init states
	const [isOpen, setIsOpen] = useState(false);
	const [isLoading, setIsLoading] = useState(false);

	// init form
	const form = useForm<SizesFormValues>({
		resolver: zodResolver(SizesFormSchema),
		defaultValues: initialData || {
			name: '',
			value: '',
		},
	});

	// update handler
	const onSubmit = async (values: SizesFormValues) => {
		try {
			setIsLoading(true);

			if (initialData) {
				await axios.patch(
					`/api/${params.storeId}/sizes/${params.sizeId}`,
					values
				);
			} else {
				await axios.post(`/api/${params.storeId}/sizes`, values);
			}

			toast.success(toastMessage);
			router.push(`/${params.storeId}/sizes`);
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

			await axios.delete(`/api/${params.storeId}/sizes/${params.sizeId}`);

			toast.success('Size deleted');
			router.push(`/${params.storeId}/sizes`);
			router.refresh();
		} catch (error: any) {
			console.log(error);
			toast.error(
				'Make sure you removed all products using this size first',
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
											placeholder='Size value...'
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

export default SizesForm;

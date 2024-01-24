'use client';

import axios from 'axios';
import { useState } from 'react';
import toast from 'react-hot-toast';
import { Trash } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { Billboard } from '@prisma/client';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import Heading from '@/components/shared/Heading';
import { zodResolver } from '@hookform/resolvers/zod';
import { Separator } from '@/components/ui/separator';
import { useParams, useRouter } from 'next/navigation';
import AlertModal from '@/components/modals/alertModal';
import { BillboardFormValues } from '@/lib/constants/types';
import { BillboardFormSchema } from '@/lib/constants/validation';

import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from '@/components/ui/form';
import ImageUpload from '@/components/ui/image_upload';

interface BillboardForm {
	initialData: Billboard | null;
}

const BillboardForm: React.FC<BillboardForm> = ({ initialData }) => {
	// init dynamic descriptions
	const title = initialData ? 'Edit billboard' : 'Create Billboard';
	const description = initialData ? 'Edit a billboard' : 'Add a new Billboard';
	const toastMessage = initialData ? 'Billboard updated' : 'Billboard created';
	const action = initialData ? 'Save Changes' : 'Create';

	// init router
	const router = useRouter();

	// init params
	const params = useParams();

	// init states
	const [isOpen, setIsOpen] = useState(false);
	const [isLoading, setIsLoading] = useState(false);

	// init form
	const form = useForm<BillboardFormValues>({
		resolver: zodResolver(BillboardFormSchema),
		defaultValues: initialData || {
			label: '',
			imageUrl: '',
		},
	});

	// update handler
	const onSubmit = async (values: BillboardFormValues) => {
		try {
			setIsLoading(true);

			if (initialData) {
				await axios.patch(
					`/api/${params.storeId}/billboards/${params.billboardId}`,
					values
				);
			} else {
				await axios.post(`/api/${params.storeId}/billboards`, values);
			}

			router.refresh();
			router.push(`/${params.storeId}/billboards`);
			toast.success(toastMessage);
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

			await axios.delete(
				`/api/${params.storeId}/billboards/${params.billboardId}`
			);

			toast.success('Billboard deleted');
			router.push('/');
			router.refresh();
		} catch (error: any) {
			console.log(error);
			toast.error(
				'Make sure you removed all categories using this billboard first',
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
					<FormField
						control={form.control}
						name='imageUrl'
						render={({ field }) => (
							<FormItem>
								<FormLabel>Background Image</FormLabel>
								<FormControl>
									<ImageUpload
										value={field.value ? [field.value] : []}
										disabled={isLoading}
										onChange={(url) => field.onChange(url)}
										onRemove={() => field.onChange('')}
									/>
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
					<div className='grid grid-cols-3 gap-8'>
						<FormField
							control={form.control}
							name='label'
							render={({ field }) => (
								<FormItem>
									<FormLabel>Label</FormLabel>
									<FormControl>
										<Input
											disabled={isLoading}
											placeholder='Billboard label...'
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

			<Separator />
		</>
	);
};

export default BillboardForm;

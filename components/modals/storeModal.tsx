'use client';

import * as z from 'zod';
import axios from 'axios';

import { useForm } from 'react-hook-form';
import { useModal } from '@/hooks/useModal';
import { Modal } from '@/components/ui/modal';
import { zodResolver } from '@hookform/resolvers/zod';
import { SetUpFormSchema } from '@/lib/constants/validation';

import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from '@/components/ui/form';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';
import { useState } from 'react';
import { SetUpFormValues } from '@/lib/constants/types';

const StoreModal = () => {
	// init router
	const router = useRouter();

	// init state
	const [isLoading, setIsLoading] = useState(false);

	// init modal
	const storeModal = useModal();

	const form = useForm<SetUpFormValues>({
		resolver: zodResolver(SetUpFormSchema),
		defaultValues: {
			name: '',
		},
	});

	// submit handler
	const onSubmit = async (values: SetUpFormValues) => {
		try {
			setIsLoading(true);

			const response = await axios.post('/api/stores', values);

			toast.success('Store created');
			form.reset();
			router.refresh();
			window.location.assign(`/${response.data.id}`);
		} catch (error: any) {
			console.log(error);
			toast.error('Something went wrong: ', error);
		} finally {
			setIsLoading(false);
		}
	};

	return (
		<Modal
			title='Create Store'
			description='Add a new store to manage products and categories'
			isOpen={storeModal.isOpen}
			onClose={storeModal.onClose}
		>
			<div>
				<div className='space-y-4 py-2 pb-4'>
					<Form {...form}>
						<form onSubmit={form.handleSubmit(onSubmit)}>
							<FormField
								control={form.control}
								name='name'
								render={({ field }) => (
									<FormItem>
										<FormLabel>Name</FormLabel>

										<FormControl>
											<Input
												disabled={isLoading}
												placeholder='E-Commerce'
												{...field}
											/>
										</FormControl>

										<FormMessage />
									</FormItem>
								)}
							/>

							<div
								className='pt-6 space-x-2 flex items-center justify-end
							w-full'
							>
								<Button disabled={isLoading} type='submit'>
									Continue
								</Button>
								<Button
									disabled={isLoading}
									variant='outline'
									onClick={storeModal.onClose}
								>
									Cancel
								</Button>
							</div>
						</form>
					</Form>
				</div>
			</div>
		</Modal>
	);
};

export default StoreModal;

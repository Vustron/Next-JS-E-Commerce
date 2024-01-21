'use client';

import * as z from 'zod';
import { useForm } from 'react-hook-form';
import { useModal } from '@/hooks/useModal';
import { Modal } from '@/components/ui/modal';
import { SetUpFormSchema } from '@/lib/validation';
import { zodResolver } from '@hookform/resolvers/zod';

import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from '@/components/ui/form';

import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

const StoreModal = () => {
	// init modal
	const storeModal = useModal();

	const form = useForm<z.infer<typeof SetUpFormSchema>>({
		resolver: zodResolver(SetUpFormSchema),
		defaultValues: {
			name: '',
		},
	});

	// submit handler
	const onSubmit = async (values: z.infer<typeof SetUpFormSchema>) => {
		console.log(values);
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
											<Input placeholder='E-Commerce' {...field} />
										</FormControl>

										<FormMessage />
									</FormItem>
								)}
							/>

							<div
								className='pt-6 space-x-2 flex items-center justify-end
							w-full'
							>
								<Button type='submit'>Continue</Button>
								<Button variant='outline' onClick={storeModal.onClose}>
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

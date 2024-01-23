'use client';

import { useState } from 'react';
import { Trash } from 'lucide-react';
import { Store } from '@prisma/client';
import { useForm } from 'react-hook-form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import Heading from '@/components/shared/Heading';
import { zodResolver } from '@hookform/resolvers/zod';
import { Separator } from '@/components/ui/separator';
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
	// init states
	const [isOpen, setIsOpen] = useState(false);
	const [isLoading, setIsLoading] = useState(false);

	// init form
	const form = useForm<SettingsFormValues>({
		resolver: zodResolver(SettingsFormSchema),
		defaultValues: initialData,
	});

	// submit handler
	const onSubmit = async (values: SettingsFormValues) => {
		console.log(values);
	};

	return (
		<>
			<div className='flex items-center justify-between'>
				<Heading title='Settings' description='Manage store preferences' />

				<Button variant='destructive' size='sm' onClick={() => null}>
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
		</>
	);
};

export default SettingsForm;

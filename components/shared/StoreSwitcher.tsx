'use client';

import {
	Popover,
	PopoverContent,
	PopoverTrigger,
} from '@/components/ui/popover';

import {
	Command,
	CommandList,
	CommandItem,
	CommandEmpty,
	CommandGroup,
	CommandInput,
	CommandSeparator,
} from '@/components/ui/command';

import {
	Check,
	ChevronsUpDown,
	PlusCircle,
	Store as StoreIcon,
} from 'lucide-react';
import { PopoverTriggerProps } from '@/lib/constants/types';
import { useParams, useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { useModal } from '@/hooks/useModal';
import { Store } from '@prisma/client';
import { useState } from 'react';
import { cn } from '@/lib/utils';

interface StoreSwitcherProps extends PopoverTriggerProps {
	items: Store[];
}

export function StoreSwitcher({ className, items = [] }: StoreSwitcherProps) {
	// init modal
	const storeModal = useModal();

	// init params
	const params = useParams();

	// init router
	const router = useRouter();

	// init formatted items
	const formattedItems = items.map((item) => ({
		label: item.name,
		value: item.id,
	}));

	// fetch current store
	const currentStore = formattedItems.find(
		(item) => item.value === params.storeId
	);

	// init state
	const [isOpen, setIsOpen] = useState(false);

	// handle store select
	const onStoreSelect = (store: { value: string; label: string }) => {
		setIsOpen(false);
		router.push(`/${store.value}`);
	};

	return (
		<Popover open={isOpen} onOpenChange={setIsOpen}>
			<PopoverTrigger asChild>
				<Button
					variant='outline'
					size='sm'
					role='combobox'
					aria-expanded={isOpen}
					aria-label='Select a store'
					className={cn('w-[200px] justify-between', className)}
				>
					<StoreIcon className='mr-2 h-4 w-4' />
					{currentStore?.label}
					<ChevronsUpDown className='ml-auto h-4 w-4 shrink-0 opacity-50' />
				</Button>
			</PopoverTrigger>
			<PopoverContent className='w-[200px] p-0'>
				<Command>
					<CommandList>
						<CommandInput placeholder='Search store...' />

						<CommandEmpty>No Store Found</CommandEmpty>

						<CommandGroup heading='Stores'>
							{formattedItems.map((store) => (
								<CommandItem
									key={store.value}
									onSelect={() => onStoreSelect(store)}
									className='text-sm'
								>
									<StoreIcon className='mr-2 h-4 w-4' />
									{store.label}
									<Check
										className={cn(
											'ml-auto h-4 w-4',
											currentStore?.value === store.value
												? 'opacity-100'
												: 'opacity-0'
										)}
									/>
								</CommandItem>
							))}
						</CommandGroup>
					</CommandList>

					<CommandSeparator />
					<CommandList>
						<CommandGroup>
							<CommandItem
								onSelect={() => {
									setIsOpen(false);
									storeModal.onOpen();
								}}
							>
								<PlusCircle className='mr-2 h-5 w-5' />
								Create Store
							</CommandItem>
						</CommandGroup>
					</CommandList>
				</Command>
			</PopoverContent>
		</Popover>
	);
}

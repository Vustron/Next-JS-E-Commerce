'use client';

import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

import axios from 'axios';
import { useState } from 'react';
import toast from 'react-hot-toast';
import { Button } from '@/components/ui/button';
import { useRouter, useParams } from 'next/navigation';
import AlertModal from '@/components/modals/alertModal';
import { ColorsColumn } from '@/lib/constants/types';
import { Copy, Edit, MoreHorizontal, Trash } from 'lucide-react';

interface CellActionProps {
	data: ColorsColumn;
}

const CellActions: React.FC<CellActionProps> = ({ data }) => {
	// init states
	const [isOpen, setIsOpen] = useState(false);
	const [isLoading, setIsLoading] = useState(false);

	// init router
	const router = useRouter();

	// init params
	const params = useParams();

	// delete handler
	const onDelete = async () => {
		try {
			setIsLoading(true);

			await axios.delete(`/api/${params.storeId}/colors/${data.id}`);

			toast.success('Color deleted');
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

	// copy function
	const onCopy = (id: string) => {
		navigator.clipboard.writeText(id);
		toast.success('Color ID copied to the clipboard');
	};

	return (
		<>
			<AlertModal
				isOpen={isOpen}
				onClose={() => setIsOpen(false)}
				onConfirm={onDelete}
				isLoading={isLoading}
			/>
			<DropdownMenu>
				<DropdownMenuTrigger asChild>
					<Button variant='ghost' className='h-8 w-8 p-0'>
						<span className='sr-only'>Open menu</span>
						<MoreHorizontal className='h-4 w-4' />
					</Button>
				</DropdownMenuTrigger>

				<DropdownMenuContent align='end'>
					<DropdownMenuLabel>Actions</DropdownMenuLabel>

					<DropdownMenuItem onClick={() => onCopy(data.id)}>
						<Copy className='mr-2 h-4 w-4' />
						Copy ID
					</DropdownMenuItem>

					<DropdownMenuItem
						onClick={() => router.push(`/${params.storeId}/colors/${data.id}`)}
					>
						<Edit className='mr-2 h-4 w-4' />
						Update
					</DropdownMenuItem>

					<DropdownMenuItem onClick={() => setIsOpen(true)}>
						<Trash className='mr-2 h-4 w-4' />
						Delete
					</DropdownMenuItem>
				</DropdownMenuContent>
			</DropdownMenu>
		</>
	);
};

export default CellActions;

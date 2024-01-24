'use client';

import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

import toast from 'react-hot-toast';
import { Button } from '@/components/ui/button';
import { BillboardColumn } from '@/lib/constants/types';
import { useRouter, useParams } from 'next/navigation';
import { Copy, Edit, MoreHorizontal, Trash } from 'lucide-react';

interface CellActionProps {
	data: BillboardColumn;
}

const CellActions: React.FC<CellActionProps> = ({ data }) => {
	// init router
	const router = useRouter();

	// init params
	const params = useParams();

	// copy function
	const onCopy = (id: string) => {
		navigator.clipboard.writeText(id);
		toast.success('Billboard ID copied to the clipboard');
	};

	return (
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
					onClick={() =>
						router.push(`/${params.storeId}/billboards/${data.id}`)
					}
				>
					<Edit className='mr-2 h-4 w-4' />
					Update
				</DropdownMenuItem>

				<DropdownMenuItem>
					<Trash className='mr-2 h-4 w-4' />
					Delete
				</DropdownMenuItem>
			</DropdownMenuContent>
		</DropdownMenu>
	);
};

export default CellActions;

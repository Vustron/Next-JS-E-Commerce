'use client';

import { Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Heading from '@/components/shared/Heading';
import { Separator } from '@/components/ui/separator';
import { useParams, useRouter } from 'next/navigation';

const BillboardClient = () => {
	// init router
	const router = useRouter();

	// init params
	const params = useParams();

	return (
		<>
			<div className='flex items-center justify-between'>
				<Heading
					title='Billboards (0)'
					description='Manage billboards for your store'
				/>
				<Button onClick={() => router.push(`${params.storeId}/billboards/new`)}>
					<Plus className='h-4 w-4 mr-2' />
					Add New
				</Button>
			</div>

			<Separator />
		</>
	);
};

export default BillboardClient;

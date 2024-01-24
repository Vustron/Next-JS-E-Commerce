'use client';

import { Plus } from 'lucide-react';
import { Billboard } from '@prisma/client';
import { Button } from '@/components/ui/button';
import Heading from '@/components/shared/Heading';
import { Separator } from '@/components/ui/separator';
import { useParams, useRouter } from 'next/navigation';
import { BillboardColumn } from '@/lib/constants/types';

interface BillboardClientProps {
	data: BillboardColumn[];
}

const BillboardClient: React.FC<BillboardClientProps> = ({ data }) => {
	// init router
	const router = useRouter();

	// init params
	const params = useParams();

	return (
		<>
			<div className='flex items-center justify-between'>
				<Heading
					title={`Billboards (${data.length})`}
					description='Manage billboards for your store'
				/>
				<Button
					onClick={() => router.push(`/${params.storeId}/billboards/new`)}
				>
					<Plus className='h-4 w-4 mr-2' />
					Add New
				</Button>
			</div>

			<Separator />
		</>
	);
};

export default BillboardClient;

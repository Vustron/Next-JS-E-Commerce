'use client';

import { Plus } from 'lucide-react';
import ApiList from '@/components/ui/api_list';
import { Button } from '@/components/ui/button';
import Heading from '@/components/shared/Heading';
import { SizesColumn } from '@/lib/constants/types';
import { Columns } from '@/components/sizes/Columns';
import { Separator } from '@/components/ui/separator';
import { useParams, useRouter } from 'next/navigation';
import { DataTable } from '@/components/ui/data_table';

interface SizesClientProps {
	data: SizesColumn[];
}

const SizesClient: React.FC<SizesClientProps> = ({ data }) => {
	// init router
	const router = useRouter();

	// init params
	const params = useParams();

	return (
		<>
			<div className='flex items-center justify-between'>
				<Heading
					title={`Sizes (${data.length})`}
					description='Manage sizes for your store'
				/>
				<Button onClick={() => router.push(`/${params.storeId}/sizes/new`)}>
					<Plus className='h-4 w-4 mr-2' />
					Add New
				</Button>
			</div>

			<Separator />

			<DataTable searchKey='name' columns={Columns} data={data} />

			<Heading title='API' description='API calls for Sizes' />

			<Separator />

			<ApiList entityName='sizes' entityIdName='sizeId' />
		</>
	);
};

export default SizesClient;

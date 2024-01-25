'use client';

import { Plus } from 'lucide-react';
import ApiList from '@/components/ui/api_list';
import { Button } from '@/components/ui/button';
import Heading from '@/components/shared/Heading';
import { Separator } from '@/components/ui/separator';
import { useParams, useRouter } from 'next/navigation';
import { DataTable } from '@/components/ui/data_table';
import { CategoryColumn } from '@/lib/constants/types';
import { Columns } from '@/components/categories/Columns';

interface CategoryClientProps {
	data: CategoryColumn[];
}

const CategoryClient: React.FC<CategoryClientProps> = ({ data }) => {
	// init router
	const router = useRouter();

	// init params
	const params = useParams();

	return (
		<>
			<div className='flex items-center justify-between'>
				<Heading
					title={`Categories (${data.length})`}
					description='Manage categories for your store'
				/>
				<Button
					onClick={() => router.push(`/${params.storeId}/categories/new`)}
				>
					<Plus className='h-4 w-4 mr-2' />
					Add New
				</Button>
			</div>

			<Separator />

			<DataTable searchKey='name' columns={Columns} data={data} />

			<Heading title='API' description='API calls for Categories' />

			<Separator />

			<ApiList entityName='categories' entityIdName='categoryId' />
		</>
	);
};

export default CategoryClient;

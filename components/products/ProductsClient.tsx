'use client';

import { Plus } from 'lucide-react';
import ApiList from '@/components/ui/api_list';
import { Button } from '@/components/ui/button';
import Heading from '@/components/shared/Heading';
import { Separator } from '@/components/ui/separator';
import { useParams, useRouter } from 'next/navigation';
import { DataTable } from '@/components/ui/data_table';
import { ProductColumn } from '@/lib/constants/types';
import { Columns } from '@/components/products/Columns';

interface ProductsClientProps {
	data: ProductColumn[];
}

const ProductsClient: React.FC<ProductsClientProps> = ({ data }) => {
	// init router
	const router = useRouter();

	// init params
	const params = useParams();

	return (
		<>
			<div className='flex items-center justify-between'>
				<Heading
					title={`Products (${data.length})`}
					description='Manage products for your store'
				/>
				<Button onClick={() => router.push(`/${params.storeId}/products/new`)}>
					<Plus className='h-4 w-4 mr-2' />
					Add New
				</Button>
			</div>

			<Separator />

			<DataTable searchKey='name' columns={Columns} data={data} />

			<Heading title='API' description='API calls for Products' />

			<Separator />

			<ApiList entityName='products' entityIdName='productId' />
		</>
	);
};

export default ProductsClient;

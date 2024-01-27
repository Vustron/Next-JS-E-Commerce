'use client';

import Heading from '@/components/shared/Heading';
import { OrderColumn } from '@/lib/constants/types';
import { Separator } from '@/components/ui/separator';
import { DataTable } from '@/components/ui/data_table';
import { Columns } from '@/components/orders/Columns';

interface OrderClientProps {
	data: OrderColumn[];
}

const OrderClient: React.FC<OrderClientProps> = ({ data }) => {
	return (
		<>
			<Heading
				title={`Orders (${data.length})`}
				description='Manage orders for your store'
			/>

			<Separator />

			<DataTable searchKey='label' columns={Columns} data={data} />
		</>
	);
};

export default OrderClient;

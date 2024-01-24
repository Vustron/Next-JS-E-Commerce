import BillboardClient from '@/components/billboards/BillboardClient';
import { BillboardColumn } from '@/lib/constants/types';
import db from '@/lib/actions/initializeDb';
import { format } from 'date-fns';

const BillboardsPage = async ({ params }: { params: { storeId: string } }) => {
	// fetch all billboards
	const billboards = await db.billboard.findMany({
		where: {
			storeId: params.storeId,
		},
		orderBy: {
			createdAt: 'desc',
		},
	});

	// format data
	const formattedBillboards: BillboardColumn[] = billboards.map((item) => ({
		id: item.id,
		label: item.label,
		createdAt: format(item.createdAt, 'MMMM do, yyyy'),
	}));

	return (
		<div className='flex-col'>
			<div className='flex-1 space-y-4 p-8 pt-6'>
				<BillboardClient data={formattedBillboards} />
			</div>
		</div>
	);
};

export default BillboardsPage;

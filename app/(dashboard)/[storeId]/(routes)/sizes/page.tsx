import SizesClient from '@/components/sizes/SizesClient';
import { SizesColumn } from '@/lib/constants/types';
import db from '@/lib/actions/initializeDb';
import { format } from 'date-fns';

const SizesPage = async ({ params }: { params: { storeId: string } }) => {
	// fetch all sizes
	const sizes = await db.size.findMany({
		where: {
			storeId: params.storeId,
		},
		orderBy: {
			createdAt: 'desc',
		},
	});

	// format data
	const formattedSizes: SizesColumn[] = sizes.map((item) => ({
		id: item.id,
		name: item.name,
		value: item.value,
		createdAt: format(item.createdAt, 'MMMM do, yyyy'),
	}));

	return (
		<div className='flex-col'>
			<div className='flex-1 space-y-4 p-8 pt-6'>
				<SizesClient data={formattedSizes} />
			</div>
		</div>
	);
};

export default SizesPage;

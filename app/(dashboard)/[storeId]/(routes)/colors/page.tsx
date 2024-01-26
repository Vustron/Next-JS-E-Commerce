import ColorsClient from '@/components/colors/ColorsClient';
import { ColorsColumn } from '@/lib/constants/types';
import db from '@/lib/actions/initializeDb';
import { format } from 'date-fns';

const ColorsPage = async ({ params }: { params: { storeId: string } }) => {
	// fetch all colors
	const colors = await db.color.findMany({
		where: {
			storeId: params.storeId,
		},
		orderBy: {
			createdAt: 'desc',
		},
	});

	// format data
	const formattedColors: ColorsColumn[] = colors.map((item) => ({
		id: item.id,
		name: item.name,
		value: item.value,
		createdAt: format(item.createdAt, 'MMMM do, yyyy'),
	}));

	return (
		<div className='flex-col'>
			<div className='flex-1 space-y-4 p-8 pt-6'>
				<ColorsClient data={formattedColors} />
			</div>
		</div>
	);
};

export default ColorsPage;

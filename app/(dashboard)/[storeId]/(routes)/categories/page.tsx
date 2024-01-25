import CategoryClient from '@/components/categories/CategoryClient';
import { CategoryColumn } from '@/lib/constants/types';
import db from '@/lib/actions/initializeDb';
import { format } from 'date-fns';

const CategoriesPage = async ({ params }: { params: { storeId: string } }) => {
	// fetch all billboards
	const categories = await db.category.findMany({
		where: {
			storeId: params.storeId,
		},
		include: {
			billboard: true,
		},
		orderBy: {
			createdAt: 'desc',
		},
	});

	// format data
	const formattedCategories: CategoryColumn[] = categories.map((item) => ({
		id: item.id,
		name: item.name,
		billboardLabel: item.billboard.label,
		createdAt: format(item.createdAt, 'MMMM do, yyyy'),
	}));

	return (
		<div className='flex-col'>
			<div className='flex-1 space-y-4 p-8 pt-6'>
				<CategoryClient data={formattedCategories} />
			</div>
		</div>
	);
};

export default CategoriesPage;

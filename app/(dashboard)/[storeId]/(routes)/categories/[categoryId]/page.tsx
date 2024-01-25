import CategoryForm from '@/components/categories/CategoryForm';
import db from '@/lib/actions/initializeDb';

const CategoryPage = async ({
	params,
}: {
	params: { categoryId: string; storeId: string };
}) => {
	// fetch categoryId
	const category = await db.category.findUnique({
		where: {
			id: params.categoryId,
		},
	});

	// fetch billboards
	const billboards = await db.billboard.findMany({
		where: {
			storeId: params.storeId,
		},
	});

	return (
		<div className='flex-col'>
			<div className='flex-1 space-y-4 p-8 pt-6'>
				<CategoryForm billboards={billboards} initialData={category} />
			</div>
		</div>
	);
};

export default CategoryPage;

import ProductsClient from '@/components/products/ProductsClient';
import { ProductColumn } from '@/lib/constants/types';
import db from '@/lib/actions/initializeDb';
import { formatter } from '@/lib/utils';
import { format } from 'date-fns';

const ProductsPage = async ({ params }: { params: { storeId: string } }) => {
	// fetch all products
	const products = await db.product.findMany({
		where: {
			storeId: params.storeId,
		},
		include: {
			category: true,
			size: true,
			color: true,
		},
		orderBy: {
			createdAt: 'desc',
		},
	});

	// format data
	const formattedProducts: ProductColumn[] = products.map((item) => ({
		id: item.id,
		name: item.name,
		isFeatured: item.isFeatured,
		isArchived: item.isArchived,
		price: formatter.format(item.price.toNumber()),
		category: item.category.name,
		size: item.size.name,
		color: item.color.value,
		createdAt: format(item.createdAt, 'MMMM do, yyyy'),
	}));

	return (
		<div className='flex-col'>
			<div className='flex-1 space-y-4 p-8 pt-6'>
				<ProductsClient data={formattedProducts} />
			</div>
		</div>
	);
};

export default ProductsPage;

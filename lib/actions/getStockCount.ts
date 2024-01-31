import db from '@/lib/actions/initializeDb';

export const getStockCount = async (storeId: string) => {
	const stockCount = await db.product.count({
		where: {
			storeId,
			isArchived: false,
		},
	});

	return stockCount;
};

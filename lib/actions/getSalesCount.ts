import db from '@/lib/actions/initializeDb';

export const getSalesCount = async (storeId: string) => {
	const salesCount = await db.order.count({
		where: {
			storeId,
			isPaid: true,
		},
	});

	return salesCount;
};

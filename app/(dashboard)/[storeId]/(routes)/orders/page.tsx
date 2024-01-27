import OrderClient from '@/components/orders/OrderClient';
import { OrderColumn } from '@/lib/constants/types';
import db from '@/lib/actions/initializeDb';
import { formatter } from '@/lib/utils';
import { format } from 'date-fns';

const OrdersPage = async ({ params }: { params: { storeId: string } }) => {
	// fetch all orders
	const orders = await db.order.findMany({
		where: {
			storeId: params.storeId,
		},
		include: {
			orderItems: {
				include: {
					product: true,
				},
			},
		},
		orderBy: {
			createdAt: 'desc',
		},
	});

	// format data
	const formattedOrders: OrderColumn[] = orders.map((item) => ({
		id: item.id,
		phone: item.phone,
		address: item.address,
		products: item.orderItems
			.map((orderItem) => orderItem.product.name)
			.join(', '),
		totalPrice: formatter.format(
			item.orderItems.reduce((total, item) => {
				return total + Number(item.product.price);
			}, 0)
		),
		isPaid: item.isPaid,
		createdAt: format(item.createdAt, 'MMMM do, yyyy'),
	}));

	return (
		<div className='flex-col'>
			<div className='flex-1 space-y-4 p-8 pt-6'>
				<OrderClient data={formattedOrders} />
			</div>
		</div>
	);
};

export default OrdersPage;

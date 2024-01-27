'use client';

import { ColumnDef } from '@tanstack/react-table';
import { OrderColumn } from '@/lib/constants/types';

export const Columns: ColumnDef<OrderColumn>[] = [
	{
		accessorKey: 'products',
		header: 'Products',
	},
	{
		accessorKey: 'phone',
		header: 'Phone',
	},
	{
		accessorKey: 'address',
		header: 'Address',
	},
	{
		accessorKey: 'totalPrice',
		header: 'Total Price',
	},
	{
		accessorKey: 'isPaid',
		header: 'Paid',
	},
	{
		accessorKey: 'createdAt',
		header: 'Date',
	},
];

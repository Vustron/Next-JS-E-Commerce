'use client';

import { ColumnDef } from '@tanstack/react-table';
import { CategoryColumn } from '@/lib/constants/types';
import CellActions from '@/components/categories/CellActions';

export const Columns: ColumnDef<CategoryColumn>[] = [
	{
		accessorKey: 'name',
		header: 'Name',
	},
	{
		accessorKey: 'billboard',
		header: 'Billboard',
		cell: ({ row }) => row.original.billboardLabel,
	},
	{
		accessorKey: 'createdAt',
		header: 'Date',
	},
	{
		id: 'actions',
		cell: ({ row }) => <CellActions data={row.original} />,
	},
];

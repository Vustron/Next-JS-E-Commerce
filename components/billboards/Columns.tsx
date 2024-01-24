'use client';

import { ColumnDef } from '@tanstack/react-table';
import { BillboardColumn } from '@/lib/constants/types';
import CellActions from '@/components/billboards/CellActions';

export const Columns: ColumnDef<BillboardColumn>[] = [
	{
		accessorKey: 'label',
		header: 'Label',
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

'use client';

import { ColumnDef } from '@tanstack/react-table';
import { ColorsColumn } from '@/lib/constants/types';
import CellActions from '@/components/sizes/CellActions';

export const Columns: ColumnDef<ColorsColumn>[] = [
	{
		accessorKey: 'name',
		header: 'Name',
	},
	{
		accessorKey: 'value',
		header: 'Value',
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

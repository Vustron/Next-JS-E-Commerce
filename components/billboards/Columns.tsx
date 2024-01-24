'use client';

import { BillboardColumn } from '@/lib/constants/types';
import { ColumnDef } from '@tanstack/react-table';

export const Columns: ColumnDef<BillboardColumn>[] = [
	{
		accessorKey: 'label',
		header: 'label',
	},
	{
		accessorKey: 'createdAt',
		header: 'Date',
	},
];

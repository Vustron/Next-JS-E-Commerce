'use client';

import Currency from '@/components/ui/Currency';
import { InfoProps } from '@/lib/interfaces';
import Button from '@/components/ui/Button';
import { ShoppingCart } from 'lucide-react';

const Info: React.FC<InfoProps> = ({ data }) => {
	return (
		<div>
			<h1 className='text-3xl font-bold text-gray-900'>{data.name}</h1>

			<div className='mt-3 flex items-end justify-between'>
				<span className='text-2xl text-gray-900'>
					<Currency value={data?.price} />
				</span>
			</div>

			<div className='flex flex-col gap-y-6'>
				<hr className='my-4' />

				<div className='flex items-center gap-x-4'>
					<h3 className='font-semibold text-black'>Size:</h3>
					<span>{data?.size?.name}</span>
				</div>

				<div className='flex items-center gap-x-4'>
					<h3 className='font-semibold text-black'>Color:</h3>
					<div
						className='h-6 w-6 rounded-full border border-gray-600'
						style={{ backgroundColor: data?.color?.value }}
					/>
				</div>
			</div>

			<div className='mt-10 flex items-center gap-x-3'>
				<Button className='flex items-center gap-x-2'>
					Add to Cart
					<ShoppingCart />
				</Button>
			</div>
		</div>
	);
};

export default Info;
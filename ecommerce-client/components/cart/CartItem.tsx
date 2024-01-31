'use client';

import Image from 'next/image';
import { X } from 'lucide-react';
import { useCart } from '@/hooks/useCart';
import Currency from '@/components/ui/Currency';
import { CartItemProps } from '@/lib/interfaces';
import IconButton from '@/components/ui/IconButton';

const CartItem: React.FC<CartItemProps> = ({ data }) => {
	// init cart
	const cart = useCart();

	// remove item handler
	const onRemove = () => {
		cart.removeItem(data.id);
	};

	return (
		<li className='flex py-6 border-b'>
			<div className='relative h-24 w-24 rounded-md overflow-hidden sm:h-48 sm:w-48'>
				<Image
					src={data.images[0].url}
					alt=''
					fill
					className='object-cover object-center'
				/>
			</div>

			<div className='relative ml-4 flex flex-1 flex-col justify-between sm:ml-6'>
				<div className='absolute z-10 right-0 top-0'>
					<IconButton onClick={onRemove} icon={<X size={15} />} />
				</div>

				<div className='relative pr-9 sm:grid sm:grid-cols-2 sm:gap-x-6 sm:pr-0'>
					<div className='flex justify-between'>
						<span className='text-lg font-semibold text-black'>
							{data.name}
						</span>
					</div>

					<div className='mt-1 flex text-sm'>
						<span className='text-gray-500'>{data.color.name}</span>

						<span className='text-gray-500 ml-4 border-l border-gray-200 pl-4'>
							{data.size.name}
						</span>
					</div>

					<Currency value={data.price} />
				</div>
			</div>
		</li>
	);
};

export default CartItem;

'use client';

import IconButton from '@/components/ui/IconButton';
import { ProductCardProps } from '@/lib/interfaces';
import { Expand, ShoppingCart } from 'lucide-react';
import Currency from '@/components/ui/Currency';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

const ProductCard: React.FC<ProductCardProps> = ({ data }) => {
	// init router
	const router = useRouter();

	// redirect on click
	const handleClick = () => {
		router.push(`/product/${data?.id}`);
	};

	return (
		<div
			onClick={handleClick}
			className='bg-white group cursor-pointer rounded-xl border p-3 space-y-4'
		>
			<div className='aspect-square rounded-xl bg-gray-100 relative'>
				<Image
					src={data?.images?.[0].url}
					alt='Image'
					fill
					className='aspect-square object-cover rounded-md'
				/>
				<div className='opacity-0 group-hover:opacity-100 transition absolute w-full px-6 bottom-5'>
					<div className='flex gap-x-6 justify-center'>
						<IconButton
							onClick={() => null}
							icon={<Expand size={20} className='text-gray-600' />}
						/>

						<IconButton
							onClick={() => null}
							icon={<ShoppingCart size={20} className='text-gray-600' />}
						/>
					</div>
				</div>
			</div>

			<div>
				<p className='font-semibold text-lg'>{data.name}</p>
				<p className='text-sm text-gray-500'>{data.category?.name}</p>
			</div>

			<div className='flex items-center justify-between'>
				<Currency value={data?.price} />
			</div>
		</div>
	);
};

export default ProductCard;
import ProductList from '@/components/shared/ProductList';
import { getProducts } from '@/lib/actions/getProducts';
import { getProduct } from '@/lib/actions/getProduct';
import { ProductPageProps } from '@/lib/interfaces';
import Container from '@/components/ui/Container';
import Gallery from '@/components/gallery';
import Info from '@/components/ui/Info';

const ProductPage: React.FC<ProductPageProps> = async ({ params }) => {
	// get product
	const product = await getProduct(params.productId);

	// get suggested products
	const suggestedProducts = await getProducts({
		categoryId: product?.category?.id,
	});

	if (!product) {
		return null;
	}

	return (
		<div className='bg-white'>
			<Container>
				<div className='px-4 py-10 sm:px-6 lg:px-8'>
					<div className='lg:grid lg:grid-cols-2 lg:items-start lg:gap-x-8'>
						<Gallery images={product.images} />

						<div className='mt-10 px-4 sm:mt-16 sm:px-0 lg:mt-0'>
							<Info data={product} />
						</div>
					</div>

					<hr className='my-10' />

					<ProductList title='Related Items' items={suggestedProducts} />
				</div>
			</Container>
		</div>
	);
};

export default ProductPage;

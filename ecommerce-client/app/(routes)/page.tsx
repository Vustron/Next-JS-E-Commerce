import { getBillboards } from '@/lib/actions/getBillboards';
import ProductList from '@/components/shared/ProductList';
import { getProducts } from '@/lib/actions/getProducts';
import Billboard from '@/components/shared/Billboard';
import Container from '@/components/ui/Container';
import Loading from '@/components/shared/Loader';

export const revalidate = 0;

const HomePage = async () => {
	// fetch billboards
	const billboard = await getBillboards('4b543a0c-b977-43b7-b1cb-5f03a367fd31');

	// fetch products
	const products = await getProducts({ isFeatured: true });

	return (
		<Container>
			<div className='space-y-10 pb-10'>
				{!billboard && <Loading />}
				<Billboard data={billboard} />

				<div className='flex flex-col gap-y-8 px-4 sm:px-6 lg:px-8'>
					<ProductList title='Featured Products' items={products} />
				</div>
			</div>
		</Container>
	);
};

export default HomePage;

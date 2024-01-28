import { Product, QueryFilterProducts } from '@/lib/interfaces';
import qs from 'query-string';

const URL = `${process.env.NEXT_PUBLIC_API_URL}/products`;

export const getProducts = async (
	query: QueryFilterProducts
): Promise<Product[]> => {
	const url = qs.stringifyUrl({
		url: URL,
		query: {
			colorId: query.colorId,
			sizeId: query.sizeId,
			categoryId: query.categoryId,
			isFeatured: query.isFeatured,
		},
	});

	const res = await fetch(url);

	return res.json();
};

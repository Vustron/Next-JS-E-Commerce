import { Size } from '@/lib/interfaces';

const URL = `${process.env.NEXT_PUBLIC_API_URL}/sizes`;

export const getSizes = async (): Promise<Size[]> => {
	const res = await fetch(URL);

	return res.json();
};

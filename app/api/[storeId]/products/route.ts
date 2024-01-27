import { auth } from '@clerk/nextjs';
import { NextResponse } from 'next/server';
import db from '@/lib/actions/initializeDb';

export async function POST(
	req: Request,
	{ params }: { params: { storeId: string } }
) {
	try {
		// fetch auth
		const { userId } = auth();

		// extract body
		const body = await req.json();

		// extract product info
		const {
			name,
			price,
			categoryId,
			colorId,
			sizeId,
			images,
			isFeatured,
			isArchived,
		} = body;

		// if there's no profile throw an error
		if (!userId) {
			return new NextResponse('Unauthenticated', { status: 401 });
		}

		// if there's no images throw an error
		if (!images || !images.length) {
			return new NextResponse('Image is required', { status: 400 });
		}

		// if there's no name throw an error
		if (!name) {
			return new NextResponse('Name is required', { status: 400 });
		}

		// if there's no price throw an error
		if (!price) {
			return new NextResponse('Price is required', { status: 400 });
		}

		// if there's no colorId throw an error
		if (!colorId) {
			return new NextResponse('Color ID is required', { status: 400 });
		}

		// if there's no categoryId throw an error
		if (!categoryId) {
			return new NextResponse('Category ID is required', { status: 400 });
		}

		// if there's no sizeId throw an error
		if (!sizeId) {
			return new NextResponse('Size ID is required', { status: 400 });
		}

		// if there's no storeId throw an error
		if (!params.storeId) {
			return new NextResponse('Store ID is required', { status: 400 });
		}

		// check if the store exist on the user
		const storeByUserId = await db.store.findFirst({
			where: {
				id: params.storeId,
				userId,
			},
		});

		// check if the current user is authorized to create
		if (!storeByUserId) {
			return new NextResponse('Unauthorized', { status: 403 });
		}

		const product = await db.product.create({
			data: {
				name,
				price,
				isFeatured,
				isArchived,
				categoryId,
				colorId,
				sizeId,
				storeId: params.storeId,
				images: {
					createMany: {
						data: [...images.map((image: { url: string }) => image)],
					},
				},
			},
		});

		return NextResponse.json(product);
	} catch (error) {
		console.log('[PRODUCTS_POST]', error);
		return new NextResponse('Internal Error', { status: 500 });
	}
}

export async function GET(
	req: Request,
	{ params }: { params: { storeId: string } }
) {
	try {
		// filters
		const { searchParams } = new URL(req.url);
		const categoryId = searchParams.get('categoryId') || undefined;
		const colorId = searchParams.get('colorId') || undefined;
		const sizeId = searchParams.get('sizeId') || undefined;
		const isFeatured = searchParams.get('isFeatured');

		// if there's no storeId throw an error
		if (!params.storeId) {
			return new NextResponse('Store ID is required', { status: 400 });
		}

		const fetchProducts = await db.product.findMany({
			where: {
				storeId: params.storeId,
				categoryId,
				colorId,
				sizeId,
				isFeatured: isFeatured ? true : undefined,
				isArchived: false,
			},
			include: {
				images: true,
				category: true,
				color: true,
				size: true,
			},
			orderBy: {
				createdAt: 'desc',
			},
		});

		return NextResponse.json(fetchProducts);
	} catch (error) {
		console.log('[PRODUCTS_GET]', error);
		return new NextResponse('Internal Error', { status: 500 });
	}
}

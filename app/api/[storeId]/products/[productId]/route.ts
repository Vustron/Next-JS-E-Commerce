import { auth } from '@clerk/nextjs';
import { NextResponse } from 'next/server';
import db from '@/lib/actions/initializeDb';

export async function GET(
	req: Request,
	{ params }: { params: { productId: string } }
) {
	try {
		// if there's no productId throw an error
		if (!params.productId) {
			return new NextResponse('Product ID is required', { status: 400 });
		}

		const product = await db.product.findUnique({
			where: {
				id: params.productId,
			},
			include: {
				images: true,
				category: true,
				size: true,
				color: true,
			},
		});

		return NextResponse.json(product);
	} catch (error) {
		console.log('[PRODUCT_GET]', error);
		return new NextResponse('Internal Error', { status: 500 });
	}
}

export async function PATCH(
	req: Request,
	{ params }: { params: { productId: string; storeId: string } }
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

		// if there's no productId throw an error
		if (!params.productId) {
			return new NextResponse('Product ID is required', { status: 400 });
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
			return new NextResponse('Unauthorized', { status: 405 });
		}

		await db.product.update({
			where: {
				id: params.productId,
			},
			data: {
				name,
				price,
				categoryId,
				colorId,
				sizeId,
				images: {
					deleteMany: {},
				},
				isFeatured,
				isArchived,
			},
		});

		const product = await db.product.update({
			where: {
				id: params.productId,
			},
			data: {
				images: {
					createMany: {
						data: [...images.map((image: { url: string }) => image)],
					},
				},
			},
		});

		return NextResponse.json(product);
	} catch (error) {
		console.log('[PRODUCT_PATCH]', error);
		return new NextResponse('Internal Error', { status: 500 });
	}
}

export async function DELETE(
	req: Request,
	{ params }: { params: { productId: string; storeId: string } }
) {
	try {
		// fetch auth
		const { userId } = auth();

		// if there's no profile throw an error
		if (!userId) {
			return new NextResponse('Unauthenticated', { status: 403 });
		}

		// if there's no productId throw an error
		if (!params.productId) {
			return new NextResponse('Product ID is required', { status: 400 });
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
			return new NextResponse('Unauthorized', { status: 405 });
		}

		const product = await db.product.delete({
			where: {
				id: params.productId,
			},
		});

		return NextResponse.json(product);
	} catch (error) {
		console.log('[PRODUCT_DELETE]', error);
		return new NextResponse('Internal Error', { status: 500 });
	}
}

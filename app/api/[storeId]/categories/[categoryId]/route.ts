import { auth } from '@clerk/nextjs';
import { NextResponse } from 'next/server';
import db from '@/lib/actions/initializeDb';

export async function GET(
	req: Request,
	{ params }: { params: { categoryId: string } }
) {
	try {
		// if there's no categoryId throw an error
		if (!params.categoryId) {
			return new NextResponse('Category ID is required', { status: 400 });
		}

		const category = await db.category.findUnique({
			where: {
				id: params.categoryId,
			},
		});

		return NextResponse.json(category);
	} catch (error) {
		console.log('[CATEGORY_GET]', error);
		return new NextResponse('Internal Error', { status: 500 });
	}
}

export async function PATCH(
	req: Request,
	{ params }: { params: { categoryId: string; storeId: string } }
) {
	try {
		// fetch auth
		const { userId } = auth();

		// extract body
		const body = await req.json();

		// extract name
		const { name, billboardId } = body;

		// if there's no profile throw an error
		if (!userId) {
			return new NextResponse('Unauthorized', { status: 403 });
		}

		// if there's no name throw an error
		if (!name) {
			return new NextResponse('Name is required', { status: 400 });
		}

		// if there's no billboardId throw an error
		if (!billboardId) {
			return new NextResponse('Billboard ID is required', { status: 400 });
		}

		// if there's no categoryId throw an error
		if (!params.categoryId) {
			return new NextResponse('Category ID is required', { status: 400 });
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

		const category = await db.category.update({
			where: {
				id: params.categoryId,
			},
			data: {
				name,
				billboardId,
			},
		});

		return NextResponse.json(category);
	} catch (error) {
		console.log('[CATEGORY_PATCH]', error);
		return new NextResponse('Internal Error', { status: 500 });
	}
}

export async function DELETE(
	req: Request,
	{ params }: { params: { categoryId: string; storeId: string } }
) {
	try {
		// fetch auth
		const { userId } = auth();

		// if there's no profile throw an error
		if (!userId) {
			return new NextResponse('Unauthenticated', { status: 403 });
		}

		// if there's no categoryId throw an error
		if (!params.categoryId) {
			return new NextResponse('Category ID is required', { status: 400 });
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

		const category = await db.category.delete({
			where: {
				id: params.categoryId,
			},
		});

		return NextResponse.json(category);
	} catch (error) {
		console.log('[CATEGORY_DELETE]', error);
		return new NextResponse('Internal Error', { status: 500 });
	}
}

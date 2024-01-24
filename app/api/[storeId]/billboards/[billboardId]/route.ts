import { auth } from '@clerk/nextjs';
import { NextResponse } from 'next/server';
import db from '@/lib/actions/initializeDb';

export async function GET(
	req: Request,
	{ params }: { params: { billboardId: string } }
) {
	try {
		// if there's no billboardId throw an error
		if (!params.billboardId) {
			return new NextResponse('Billboard ID is required', { status: 400 });
		}

		const billboard = await db.billboard.findUnique({
			where: {
				id: params.billboardId,
			},
		});

		return NextResponse.json(billboard);
	} catch (error) {
		console.log('[BILLBOARD_GET]', error);
		return new NextResponse('Internal Error', { status: 500 });
	}
}

export async function DELETE(
	req: Request,
	{ params }: { params: { billboardId: string; storeId: string } }
) {
	try {
		// fetch auth
		const { userId } = auth();

		// if there's no profile throw an error
		if (!userId) {
			return new NextResponse('Unauthenticated', { status: 403 });
		}

		// if there's no billboardId throw an error
		if (!params.billboardId) {
			return new NextResponse('Billboard ID is required', { status: 400 });
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

		const billboard = await db.billboard.delete({
			where: {
				id: params.billboardId,
			},
		});

		return NextResponse.json(billboard);
	} catch (error) {
		console.log('[BILLBOARD_DELETE]', error);
		return new NextResponse('Internal Error', { status: 500 });
	}
}

export async function PATCH(
	req: Request,
	{ params }: { params: { billboardId: string; storeId: string } }
) {
	try {
		// fetch auth
		const { userId } = auth();

		// extract body
		const body = await req.json();

		// extract name
		const { label, imageUrl } = body;

		// if there's no profile throw an error
		if (!userId) {
			return new NextResponse('Unauthorized', { status: 403 });
		}

		// if there's no label throw an error
		if (!label) {
			return new NextResponse('Label is required', { status: 400 });
		}

		// if there's no imageUrl throw an error
		if (!imageUrl) {
			return new NextResponse('imageUrl is required', { status: 400 });
		}

		// if there's no billboardId throw an error
		if (!params.billboardId) {
			return new NextResponse('Billboard ID is required', { status: 400 });
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

		const billboard = await db.billboard.update({
			where: {
				id: params.billboardId,
			},
			data: {
				label,
				imageUrl,
			},
		});

		return NextResponse.json(billboard);
	} catch (error) {
		console.log('[BILLBOARD_PATCH]', error);
		return new NextResponse('Internal Error', { status: 500 });
	}
}

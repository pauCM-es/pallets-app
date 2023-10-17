import { Params } from "next/dist/shared/lib/router/utils/route-matcher";
import { NextResponse } from "next/server";
import prisma from "@/libs/prismadb";
import { PalletsOnShelf } from "@/types/prisma.types";

export const GET = async (request: Request, { params }: { params: Params }) => {
	try {
		const { camaraId } = params;

		const camara = await prisma.camara.findUnique({
			where: {
				code: camaraId,
			},
		});
		const shelves = await prisma.shelf.findMany({
			where: {
				camaraId,
			},
		});
		const palletsOnCamara = await prisma.pallet.findMany({
			where: {
				camaraCode: camara?.code,
			},
		});

		//Array of objects with each shelf and its pallets on each of them.
		//Ready to consume by the front and the drag and drop feature.
		let palletsOnShelves: PalletsOnShelf[] = [];

		shelves.forEach((shelf) => {
			const fullPallets = shelf.palletIds.map((id) => {
				return palletsOnCamara.find((pallet) => pallet.numberId === id);
			});
			palletsOnShelves.push({
				shelfId: shelf.name,
				pallets: fullPallets,
			});
		});

		return NextResponse.json({ palletsOnShelves });
	} catch (error: any) {
		return new NextResponse(`Internal error: ${error}`, { status: 500 });
	}
};

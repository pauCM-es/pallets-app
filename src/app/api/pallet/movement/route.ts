import { PalletsOnShelf } from "@/types/prisma.types";
import { EmptyShelf } from "@/types/shelf.types";
import prisma from "@/libs/prismadb";
import { NextResponse } from "next/server";
import { Shelf } from "@prisma/client";

// update positions on a list of pallets involves in a movement
export const PATCH = async (request: Request) => {
	try {
		const body: PalletsOnShelf[] = await request.json();
		const updatedShelves: Shelf[] = [];
		body.forEach(async (shelf) => {
			const shelfDb = await prisma.shelf.update({
				where: {
					name: shelf.shelfId,
				},
				data: {
					palletIds: shelf.pallets.map((pallet) => pallet.numberId),
				},
			});
			updatedShelves.push(shelfDb);
		});

		return NextResponse.json({ updatedShelves });
	} catch (error) {
		return new NextResponse(`Internal error: ${error}`, { status: 500 });
	}
};

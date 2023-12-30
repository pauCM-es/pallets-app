import prisma from "@/libs/prismadb";
import { NextResponse } from "next/server";
import { Pallet, Shelf } from "@prisma/client";
import { ItemsByShelf } from "@/types/camara.types";

// update positions of pallets involved in a movement
export const PATCH = async (request: Request) => {
	try {
		const body: ItemsByShelf = await request.json();
		const updatedShelves: {
			[key: string]: Pallet[];
		} = {};

		// store the update action for each item to call then later on a transaction at the same time
		const transactions: any[] = [];

		for (const [shelfName, palletsList] of Object.entries(body)) {
			updatedShelves[shelfName] = [];

			palletsList.forEach(async (pallet) => {
				const updateAction = prisma.pallet.update({
					where: {
						id: pallet.id,
					},
					data: {
						position: { ...pallet.position },
					},
				});
				transactions.push(updateAction);
			});
		}

		const allPalletsUpdated = await prisma.$transaction(transactions);

		// to return the same object. Pallets ordered by shelf
		allPalletsUpdated.forEach((pallet) => {
			updatedShelves[pallet.position.shelfId] = [
				...updatedShelves[pallet.position.shelfId],
				pallet,
			];
		});

		return NextResponse.json(updatedShelves);
	} catch (error) {
		return new NextResponse(`Internal error: ${error}`, { status: 500 });
	}
};

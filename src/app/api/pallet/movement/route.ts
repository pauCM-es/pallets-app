import { EmptyShelf } from "@/types/shelf.types";
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

		for (const [shelfName, palletsList] of Object.entries(body)) {
			updatedShelves[shelfName] = [];
			palletsList.forEach(async (pallet) => {
				const palletUpdated = await prisma.pallet.update({
					where: {
						id: pallet.id,
					},
					data: {
						position: { ...pallet.position },
					},
				});
				updatedShelves[shelfName] = [
					...updatedShelves[shelfName],
					palletUpdated,
				];
				console.log(
					"palletUpdated :",
					palletUpdated.numberId,
					palletUpdated.position
				);
			});
			console.log("shelf :", updatedShelves);
		}

		console.log("updatedShelves :", updatedShelves);

		return NextResponse.json({ ...updatedShelves });
	} catch (error) {
		return new NextResponse(`Internal error: ${error}`, { status: 500 });
	}
};

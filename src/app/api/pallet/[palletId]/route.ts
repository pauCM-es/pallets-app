import { Params } from "next/dist/shared/lib/router/utils/route-matcher";
import { NextResponse } from "next/server";
import prisma from "@/libs/prismadb";

// delete pallet
export const DELETE = async (
	request: Request,
	{ params }: { params: Params }
) => {
	try {
		const { palletId } = params;

		// //only 1 result but findMany return Array.
		// const shelfToUpdate = await prisma?.shelf.findMany({
		// 	where: {
		// 		palletIds: {
		// 			has: palletId,
		// 		},
		// 	},
		// });
		// console.log("shelf found");

		// const updatedShelf = await prisma?.shelf.update({
		// 	where: {
		// 		id: shelfToUpdate[0].id,
		// 	},
		// 	data: {
		// 		palletIds: {
		// 			// there's no method to splice/remove items from a scalar list using Prisma.
		// 			set: shelfToUpdate[0].palletIds.filter(
		// 				(palletIdOnShelf: string) => palletIdOnShelf !== palletId
		// 			),
		// 		},
		// 	},
		// });
		// console.log("shelf updated");

		const toDelete = await prisma?.pallet.delete({
			where: {
				id: palletId,
			},
		});
		console.log("removed: ", toDelete);

		return NextResponse.json(`Pallet ${palletId} deleted`);
	} catch (error) {
		return new NextResponse(`Internal error: ${error}`, { status: 500 });
	}
};

export const PATCH = async (
	request: Request,
	{ params }: { params: Params }
) => {
	try {
		const { palletId } = params;
		const dataToUpdate = await request.json();

		const updatedPallet = await prisma?.pallet.update({
			where: {
				id: palletId,
			},
			data: dataToUpdate,
		});
		return NextResponse.json(updatedPallet);
	} catch (error) {
		return new NextResponse(`Internal error: ${error}`, { status: 500 });
	}
};

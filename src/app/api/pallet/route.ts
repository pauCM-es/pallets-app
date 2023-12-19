import { NextResponse } from "next/server";
import prisma from "@/libs/prismadb";
import { Pallet } from "@prisma/client";

// add new pallet
export const POST = async (request: Request) => {
	try {
		const body: Pallet = await request.json();

		console.log(body);
		const newPallet = await prisma?.pallet.create({
			data: { ...body },
		});
		console.log(newPallet);

		return NextResponse.json(newPallet);
	} catch (error) {
		return new NextResponse(`Internal error: ${error}`, { status: 500 });
	}
};

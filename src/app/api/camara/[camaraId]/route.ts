import { Params } from "next/dist/shared/lib/router/utils/route-matcher";
import { NextResponse } from "next/server";
import prisma from "@/libs/prismadb";

export const GET = async (request: Request, { params }: { params: Params }) => {
	try {
		const { camaraId } = params;

		const camara = await prisma.camara.findUnique({
			where: {
				code: camaraId,
			},
		});

		const pallets = await prisma.pallet.findMany({
			where: {
				camaraCode: camara?.code,
			},
		});

		return NextResponse.json({ camara, pallets });
	} catch (error: any) {
		return new NextResponse("Internal error", { status: 500 });
	}
};

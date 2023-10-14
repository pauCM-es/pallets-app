import { Params } from "next/dist/shared/lib/router/utils/route-matcher";
import { NextResponse } from "next/server";
import prisma from "@/libs/prismadb";

export const GET = async (request: Request, { params }: { params: Params }) => {
	try {
		const { camaraId } = params;
		console.log("GET camara by id", camaraId);

		const camara = await prisma.camara.findUnique({
			where: {
				code: camaraId,
			},
		});
		console.log(camara);

		return NextResponse.json(camara);
	} catch (error: any) {
		return new NextResponse("Internal error", { status: 500 });
	}
};

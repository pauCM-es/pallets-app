import { NextResponse } from "next/server";
import prisma from "@/libs/prismadb";

export const GET = async () => {
	try {
		const products = await prisma.boxBrand.findMany();

		return NextResponse.json(products);
	} catch (error) {
		return new NextResponse(`Internal error: ${error}`, { status: 500 });
	}
};

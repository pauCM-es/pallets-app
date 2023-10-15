import { Camara, Pallet } from "@prisma/client";

export const getCamaraById = async (
	camaraId: string
): Promise<{ camara: Camara; pallets: Pallet[] }> => {
	console.log("param: ", camaraId);

	const res = await fetch(`${process.env.BASE_URL}api/camara/${camaraId}`);

	if (!res.ok) {
		// This will activate the closest `error.js` Error Boundary
		throw new Error("Failed to fetch data");
	}

	return res.json();
};

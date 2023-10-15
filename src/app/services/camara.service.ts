import { Camara, Pallet, Shelf } from "@prisma/client";
import axios, { AxiosPromise, AxiosRequestConfig } from "axios";
import { PalletsOnShelf } from "@/types/prisma.types";

// export const getCamaraById = async (
// 	camaraId: string
// ): Promise<{
// 	camara: Camara;
// 	palletsOnCamara: Pallet[];
// 	palletsOnShelves: { [key: string]: Pallet[] }[];
// }> => {
// 	const res = await fetch(`${process.env.BASE_URL}api/camara/${camaraId}`);
// 	if (!res.ok) {
// 		throw new Error("Failed to fetch data");
// 	}

// 	return res.json();
// };

export const getCamaraById = (
	camaraId: string
): AxiosPromise<{ palletsOnShelves: PalletsOnShelf[] }> => {
	const config: AxiosRequestConfig = {
		url: `${process.env.BASE_URL}api/camara/${camaraId}`,
		method: "GET",
	};

	return axios(config);
};

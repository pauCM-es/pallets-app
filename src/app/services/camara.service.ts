import { Camara, Pallet, Shelf } from "@prisma/client";
import axios, { AxiosPromise, AxiosRequestConfig } from "axios";
import { GetCamaraResponse } from "@/types/prisma.types";
// import { ItemsOnShelf } from "@/types/camara.types";

export const getCamaraById = (
	camaraId: string
): AxiosPromise<GetCamaraResponse> => {
	const config: AxiosRequestConfig = {
		url: `${process.env.BASE_URL}api/camara/${camaraId}`,
		method: "GET",
	};

	return axios(config);
};

// export const updateAfterMove = (
// 	newPositions: ItemsOnShelf[]
// ): AxiosPromise<Shelf[]> => {
// 	const config: AxiosRequestConfig = {
// 		url: `${process.env.BASE_URL}api/pallet/movement`,
// 		method: "PATCH",
// 		data: newPositions,
// 	};

// 	return axios(config);
// };

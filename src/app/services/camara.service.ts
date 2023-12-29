import { Camara, Pallet, Shelf } from "@prisma/client";
import axios, { AxiosPromise, AxiosRequestConfig } from "axios";
import { PalletsOnShelf } from "@/types/prisma.types";

export const getCamaraById = (
	camaraId: string
): AxiosPromise<{ palletsOnShelves: PalletsOnShelf[] }> => {
	const config: AxiosRequestConfig = {
		url: `${process.env.BASE_URL}api/camara/${camaraId}`,
		method: "GET",
	};

	return axios(config);
};

export const updateAfterMove = (
	newPositions: PalletsOnShelf[]
): AxiosPromise<Shelf[]> => {
	const config: AxiosRequestConfig = {
		url: `${process.env.BASE_URL}api/pallet/movement`,
		method: "PATCH",
		data: newPositions,
	};

	return axios(config);
};

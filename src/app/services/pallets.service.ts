import { AddPallet } from "@/types/pallet.types";
import { PalletsOnShelf } from "@/types/prisma.types";
import { Pallet } from "@prisma/client";
import axios, { AxiosPromise, AxiosRequestConfig } from "axios";

export const deletePallet = (
	palletId: string
): AxiosPromise<PalletsOnShelf[]> => {
	const config: AxiosRequestConfig = {
		url: `${process.env.BASE_URL}api/pallet/${palletId}`,
		method: "DELETE",
	};

	return axios(config);
};

export const addNewPallet = (
	newPalletData: AddPallet
): AxiosPromise<PalletsOnShelf[]> => {
	const config: AxiosRequestConfig = {
		url: `${process.env.BASE_URL}api/pallet`,
		method: "POST",
		data: newPalletData,
	};

	return axios(config);
};

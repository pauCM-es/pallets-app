import { AddPallet } from "@/types/pallet.types";
import { Pallet } from "@prisma/client";
import axios, { AxiosPromise, AxiosRequestConfig } from "axios";

export const deletePallet = (palletId: string): AxiosPromise<Pallet> => {
	const config: AxiosRequestConfig = {
		url: `${process.env.BASE_URL}api/pallet/${palletId}`,
		method: "DELETE",
	};

	return axios(config);
};

export const addNewPallet = (
	newPalletData: AddPallet
): AxiosPromise<Pallet> => {
	const config: AxiosRequestConfig = {
		url: `${process.env.BASE_URL}api/pallet`,
		method: "POST",
		data: newPalletData,
	};

	return axios(config);
};

export const updatePallet = (
	palletId: string,
	data: Partial<Pallet>
): AxiosPromise<Pallet> => {
	const config: AxiosRequestConfig = {
		url: `${process.env.BASE_URL}api/pallet/${palletId}`,
		method: "PATCH",
		data,
	};

	return axios(config);
};

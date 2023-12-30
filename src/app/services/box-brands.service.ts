import { BoxBrand } from "@prisma/client";
import axios, { AxiosPromise, AxiosRequestConfig } from "axios";

export const getBrands = (): AxiosPromise<BoxBrand[]> => {
	const config: AxiosRequestConfig = {
		url: `${process.env.BASE_URL}api/box-brand`,
		method: "GET",
	};

	return axios(config);
};

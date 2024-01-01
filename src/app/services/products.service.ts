import { Product } from "@prisma/client";
import axios, { AxiosPromise, AxiosRequestConfig } from "axios";

export const getProducts = (): AxiosPromise<Product[]> => {
	const config: AxiosRequestConfig = {
		url: `${process.env.BASE_URL}api/product`,
		method: "GET",
	};

	return axios(config);
};

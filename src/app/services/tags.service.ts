import { Tag } from "@prisma/client";
import axios, { AxiosPromise, AxiosRequestConfig } from "axios";

export const getTags = (): AxiosPromise<Tag[]> => {
	const config: AxiosRequestConfig = {
		url: `${process.env.BASE_URL}api/tag`,
		method: "GET",
	};

	return axios(config);
};

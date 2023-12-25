import { Camara, Pallet, Shelf } from "@prisma/client";

export interface GetCamaraResponse {
	camara: Camara;
	palletsOnCamara: Pallet[];
	shelves: Shelf[];
}

export type Position = Exclude<Pallet["position"], null>;

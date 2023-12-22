import { Camara, Pallet, Shelf } from "@prisma/client";
import { PalletItem } from "./pallet.types";

export interface GetCamaraResponse {
	camara: Camara;
	palletsOnCamara: PalletItem[];
	shelves: Shelf[];
}

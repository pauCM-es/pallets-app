import { Pallet } from "@prisma/client";

export interface PalletsOnShelf {
	shelfId: string;
	pallets: Pallet[];
}

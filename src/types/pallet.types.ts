import { Pallet } from "@prisma/client";
import { HalfPartial, ReplaceObjPropType } from "./utils.types";

export type AddPallet = HalfPartial<
	Pallet,
	"numberId" | "product" | "position" | "camaraCode"
>;

export type PositionOnShelf = [string, string, string];

export type PalletItem = ReplaceObjPropType<
	Pallet,
	"position",
	PositionOnShelf
>;

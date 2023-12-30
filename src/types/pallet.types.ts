import { Pallet } from "@prisma/client";
import { HalfPartial, ReplaceObjPropType } from "./utils.types";

export type AddPallet = HalfPartial<
	Pallet,
	"numberId" | "product" | "position" | "camaraCode"
>;

export type ItemPlaceholder = { numberId: "empty" };

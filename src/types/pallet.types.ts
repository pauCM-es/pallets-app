import { Pallet } from "@prisma/client";
import { HalfPartial } from "./utils.types";

export type AddPallet = HalfPartial<
	Pallet,
	"numberId" | "product" | "position" | "camaraCode"
>;

import { Pallet } from "@prisma/client";
import { HalfPartial, MakeOptional, ReplaceObjPropType } from "./utils.types";

export type AddPallet = HalfPartial<
	Pallet,
	"numberId" | "product" | "position" | "camaraCode"
>;

export type ItemPlaceholder = { numberId: "empty" };

type PalletMinInfo = Pick<Pallet, "numberId" | "product">;
type PalletOptionalInfo = MakeOptional<Omit<Pallet, "numberId" | "product">>;

export type PalletMinRequired = PalletMinInfo & PalletOptionalInfo;

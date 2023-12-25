import { sidebarOptions } from "@/components/SideDrawer";
import {
	ListByProperty,
	MakeGenericObj,
	MakeMutable,
	ObjInArray,
	ReplaceObjPropType,
} from "./utils.types";
import { Pallet } from "@prisma/client";
import { Position } from "./prisma.types";

export interface ItemsByShelf {
	[key: string]: PalletItem[];
}

export type PalletItem = ReplaceObjPropType<Pallet, "position", Position>;

export type OptionsList = ListByProperty<typeof sidebarOptions, "option">;

// type mutableSidebarOptions = ObjInInmutableArray<typeof sidebarOptions>;
type SidebarOption = ObjInArray<typeof sidebarOptions>;

type SidebarGenericOption = MakeGenericObj<
	MakeMutable<(typeof sidebarOptions)[0]>
>;

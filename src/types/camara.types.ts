import { sidebarOptions } from "@/components/SideDrawer";
import {
	ListByProperty,
	MakeGenericObj,
	MakeMutable,
	ObjInArray,
} from "./utils.types";
import { Pallet, Shelf } from "@prisma/client";
import { PalletItem } from "./pallet.types";

export interface ItemsOnShelf extends Shelf {
	items: {
		[key: string]: PalletItem[];
	};
}

export type OptionsList = ListByProperty<typeof sidebarOptions, "option">;

// type mutableSidebarOptions = ObjInInmutableArray<typeof sidebarOptions>;
type SidebarOption = ObjInArray<typeof sidebarOptions>;

type SidebarGenericOption = MakeGenericObj<
	MakeMutable<(typeof sidebarOptions)[0]>
>;

import { PalletItem } from "@/types/camara.types";
import { ItemPlaceholder } from "@/types/pallet.types";
import { Position } from "@/types/prisma.types";
import { Pallet } from "@prisma/client";

export const orderItemsByIndexPosition = (itemsList: Pallet[]) => {
	const excludeItemsNullPos = itemsList.filter(
		(item) => item.position
	) as PalletItem[];
	return excludeItemsNullPos.sort(
		(a, b) => a.position?.index - b.position?.index
	);
};

export const updatePositionOnShelf = (shelf: PalletItem[]) => {
	return shelf?.map((item, newIndex) => ({
		...item,
		position: {
			...item.position,
			index: newIndex,
		},
	}));
};

export const addPlaceholdersOnShelf = (
	shelf: PalletItem[]
): [ItemPlaceholder] | PalletItem[] => {
	if (shelf.length) {
		return [{ numberId: "empty" }];
	} else {
		return shelf;
	}
};

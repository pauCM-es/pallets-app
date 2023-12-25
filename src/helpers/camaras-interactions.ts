import { PalletItem } from "@/types/camara.types";

export const orderItemsByIndexPosition = (itemsList: PalletItem[]) => {
	return itemsList.sort((a, b) => a.position?.index - b.position?.index);
};

export const updatePositionOnShelf = (shelf: PalletItem[]) => {
	return shelf?.map((item, newIndex) => ({
		...item,
		position: {
			shelfId: item.position.shelfId,
			heigth: item.position.height,
			index: `${newIndex}`,
		},
	}));
};

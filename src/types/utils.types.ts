import { PalletsOnShelf } from "./prisma.types";
import { EmptyShelf } from "./shelf.types";

export const isShelfEmpty = (
	shelfToCheck: PalletsOnShelf | EmptyShelf
): shelfToCheck is EmptyShelf => {
	let result = false;
	if (!shelfToCheck.pallets?.length) result = true;
	if (
		shelfToCheck.pallets?.length === 1 &&
		shelfToCheck.pallets[0].numberId === "empty"
	) {
		result = true;
	}
	return result;
};

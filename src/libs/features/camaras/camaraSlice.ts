import { ItemsByShelf, PalletItem } from "@/types/camara.types";
import { AddPallet, PalletMinRequired } from "@/types/pallet.types";
import { BoxBrand, Pallet, Product, Shelf } from "@prisma/client";
import { createSlice } from "@reduxjs/toolkit";
import type { Draft, PayloadAction } from "@reduxjs/toolkit";

export interface CamaraState {
	currentCamaraId: string;
	palletsOnCurrentCamara: Pallet[] | undefined;
	shelvesOnCamera: Shelf[] | undefined;
	palletsGroupedByShelf: ItemsByShelf | undefined;
	products: Product[];
	boxBrands: BoxBrand[];
	palletOnEdit: undefined | PalletMinRequired;
}

const initialState: CamaraState = {
	currentCamaraId: "",
	palletsOnCurrentCamara: undefined,
	shelvesOnCamera: undefined,
	palletsGroupedByShelf: undefined,
	products: [],
	boxBrands: [],
	palletOnEdit: undefined,
};

export const camaraSlice = createSlice({
	name: "camara",
	initialState,
	reducers: {
		setPalletsData: (
			state,
			action: PayloadAction<CamaraState["palletsOnCurrentCamara"]>
		) => {
			state.palletsOnCurrentCamara = action.payload;
		},
		setData: <K extends keyof CamaraState>(
			state: Draft<CamaraState>,
			action: PayloadAction<{ key: K; value: CamaraState[K] }>
		) => {
			state[action.payload.key] = action.payload.value;
		},
		updateWithNewPallet: (state, action: PayloadAction<PalletItem>) => {
			if (
				!state.palletsGroupedByShelf ||
				!state.palletsOnCurrentCamara ||
				!action.payload.position
			)
				return;
			const shelfName = action.payload.position?.shelfId;
			const palletIndex = action.payload.position?.index;
			state.palletsOnCurrentCamara = [
				...state.palletsOnCurrentCamara,
				action.payload,
			];
			state.palletsGroupedByShelf[shelfName].splice(
				palletIndex,
				0,
				action.payload
			);
		},
	},
});

export const { setPalletsData, setData, updateWithNewPallet } =
	camaraSlice.actions;

export default camaraSlice.reducer;

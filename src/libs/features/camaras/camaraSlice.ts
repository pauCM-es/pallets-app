import { BoxBrand, Pallet, Product } from "@prisma/client";
import { createSlice } from "@reduxjs/toolkit";
import type { Draft, PayloadAction } from "@reduxjs/toolkit";

interface CamaraState {
	currentCamaraId: string;
	palletsOnCurrentCamara: Pallet[] | undefined;
	products: Product[];
	boxBrands: BoxBrand[];
}

const initialState: CamaraState = {
	currentCamaraId: "",
	palletsOnCurrentCamara: undefined,
	products: [],
	boxBrands: [],
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
	},
});

export const { setPalletsData, setData } = camaraSlice.actions;

export default camaraSlice.reducer;

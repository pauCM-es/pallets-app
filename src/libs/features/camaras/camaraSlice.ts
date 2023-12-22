import { Pallet } from "@prisma/client";
import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

interface CamaraState {
	currentCamaraId: string;
	palletsOnCurrentCamara: Pallet[] | undefined;
}

const initialState: CamaraState = {
	currentCamaraId: "",
	palletsOnCurrentCamara: undefined,
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
	},
});

export const { setPalletsData } = camaraSlice.actions;

export default camaraSlice.reducer;

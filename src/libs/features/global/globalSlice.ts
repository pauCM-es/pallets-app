import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "@/libs/store";

interface GlobalState {
	isSideDrawerOpen: boolean;
}

const initialState: GlobalState = {
	isSideDrawerOpen: true,
};

export const globalSlice = createSlice({
	name: "global",
	initialState,
	reducers: {
		toggleDrawer: (state) => {
			state.isSideDrawerOpen = !state.isSideDrawerOpen;
		},
		actionDrawer: (state, action: PayloadAction<boolean>) => {
			state.isSideDrawerOpen = action.payload;
		},
	},
});

export const { actionDrawer, toggleDrawer } = globalSlice.actions;

export default globalSlice.reducer;

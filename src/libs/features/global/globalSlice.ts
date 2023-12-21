import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "@/libs/store";
import { SidebarOptions } from "@/components/SideDrawer";
import { PalletsOnShelf } from "@/types/prisma.types";

interface GlobalState {
	isSideDrawerOpen: boolean;
	sidebarOptionActive: SidebarOptions | undefined;
	palletsOnCurrentCamara: PalletsOnShelf[] | undefined;
}

const initialState: GlobalState = {
	isSideDrawerOpen: true,
	sidebarOptionActive: undefined,
	palletsOnCurrentCamara: undefined,
};

export const globalSlice = createSlice({
	name: "global",
	initialState,
	reducers: {
		toggleDrawer: (state) => {
			state.isSideDrawerOpen = !state.isSideDrawerOpen;
		},
		setDrawerState: (state, action: PayloadAction<boolean>) => {
			state.isSideDrawerOpen = action.payload;
		},
		setSidebarOption: (
			state,
			action: PayloadAction<GlobalState["sidebarOptionActive"]>
		) => {
			state.sidebarOptionActive = action.payload;
		},
		setPalletsData: (
			state,
			action: PayloadAction<GlobalState["palletsOnCurrentCamara"]>
		) => {
			state.palletsOnCurrentCamara = action.payload;
		},
	},
});

export const {
	setDrawerState,
	toggleDrawer,
	setSidebarOption,
	setPalletsData,
} = globalSlice.actions;

export default globalSlice.reducer;

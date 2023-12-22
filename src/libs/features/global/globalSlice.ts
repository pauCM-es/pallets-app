import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { SidebarOptions } from "@/components/SideDrawer";
import { PalletsOnShelf } from "@/types/prisma.types";

interface GlobalState {
	isSideDrawerOpen: boolean;
	sidebarOptionActive: SidebarOptions | undefined;
}

const initialState: GlobalState = {
	isSideDrawerOpen: true,
	sidebarOptionActive: undefined,
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
	},
});

export const { setDrawerState, toggleDrawer, setSidebarOption } =
	globalSlice.actions;

export default globalSlice.reducer;

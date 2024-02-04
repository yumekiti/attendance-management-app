import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

export type SystemInfo = {
  system: any;
};

export type SystemInfoState = SystemInfo;

const initialState: SystemInfoState = {
  system: null,
};

export const systemInfoSlice = createSlice({
  name: "systemInfo",
  initialState,
  reducers: {
    setSystem: (state, action: PayloadAction<SystemInfo>) => {
      state.system = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { setSystem } = systemInfoSlice.actions;

export default systemInfoSlice.reducer;

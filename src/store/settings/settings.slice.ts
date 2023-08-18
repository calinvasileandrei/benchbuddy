import type { PayloadAction } from "@reduxjs/toolkit";
import { createSlice } from "@reduxjs/toolkit";
import { UnitModel } from "../../models/unit.model";

export interface SettingsState {
  unit: UnitModel;
}

const initialState: SettingsState = {
  unit: "Metric",
};

export const settingsSlice = createSlice({
  name: "settings",
  initialState,
  reducers: {
    set: (state, action: PayloadAction<Partial<SettingsState>>) => {
      return {
        ...state,
        ...action.payload,
      };
    },
  },
});

// Action creators are generated for each case reducer function
export const settingsActions = settingsSlice.actions;
export const settingsReducer = settingsSlice.reducer;

import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { fetch2, getFetch } from "../../Apis/commonApis";

const initialState = {
  loading: false,
  modifierOptionsListCount: 0,
  createModifierOptionCount: 0,
  modifierOptionDetailsCount: 0,
};

export let modifierOptionsFilterValue: any = {
  search: "",
  type: "",
  name: "",
  modifiers: "",
  sku: "",
  deletedselect: "",
};

export let modifierOptionsListItems: any;
export let modifierOptionsPerIdDetails: any;

export const modifierOptionsList: any = createAsyncThunk(
  "modifierOptionsList",
  async (body) => {
    const result = await fetch2(
      `${process.env.REACT_APP_BASEURL}/modifier_options_lsit_type_search_filter`,
      body
    );
    modifierOptionsListItems = result.data;
    return result;
  }
);

export const createModifierOption: any = createAsyncThunk(
  "createModifierOption",
  async (body) => {
    const result = await fetch2(
      `${process.env.REACT_APP_BASEURL}/createmodifierOption`,
      body
    );
    return result;
  }
);

export const modifierOptionDetails: any = createAsyncThunk(
  "modifierOptionDetails",
  async (body) => {
    const result = await fetch2(
      `${process.env.REACT_APP_BASEURL}/modifopt_viewdetails`,
      body
    );
    modifierOptionsPerIdDetails = result.data;
    return result;
  }
);

const manageModifierOptionsSlice: any = createSlice({
  name: "Modifier_Option",
  initialState,
  reducers: {},
  extraReducers: {
    [modifierOptionsList.fulfilled]: (
      state: any,
      { payload: { error, message } }
    ) => {
      state.loading = false;
      state.modifierOptionsListCount += 1;
      if (error) {
        state.error = error;
      } else {
        state.error = message;
      }
    },
    [createModifierOption.fulfilled]: (
      state: any,
      { payload: { error, message } }
    ) => {
      state.loading = false;
      state.createModifierOptionCount += 1;
      if (error) {
        state.error = error;
      } else {
        state.error = message;
      }
    },
    [modifierOptionDetails.fulfilled]: (
      state: any,
      { payload: { error, message } }
    ) => {
      state.loading = false;
      state.modifierOptionDetailsCount += 1;
      if (error) {
        state.error = error;
      } else {
        state.error = message;
      }
    },
  },
});

export const {} = manageModifierOptionsSlice.actions;
export default manageModifierOptionsSlice.reducer;

import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { fetch2, fetch3 } from "../../Apis/commonApis";

const initialState = {
  loading: false,
  inventoryProductionListCount: 0,
  production_get_branchCount: 0,
  production_addproductionCount: 0,
};

export let production_list_type_search: any = {
  type: "all",
  admin_id: JSON.parse(localStorage.getItem("___data")!)?.id,
};

export let inventoryProductionListItems: any;
export let addInventoryProductionType: any;
export let inventoryProductionId: any;
export let production_get_branchListItems: any;

export const inventoryProductionList: any = createAsyncThunk(
  "production_list_type_search",
  async (body) => {
    const result = await fetch2(
      `${process.env.REACT_APP_BASEURL}/production_list_type_search`,
      body
    );
    inventoryProductionListItems = result.data;
    console.log(inventoryProductionListItems, "production_list_type_search");
    return result;
  }
);

export const production_get_branch: any = createAsyncThunk(
  "production_get_branch",
  async () => {
    const result = await fetch3(
      `${process.env.REACT_APP_BASEURL}/production_get_branch`,
      "get"
    );
    production_get_branchListItems = result.data;
    console.log(
      production_get_branchListItems,
      "production_get_branchListItems"
    );
    return result;
  }
);

export const production_addproduction: any = createAsyncThunk(
  "production_addproduction",
  async (body) => {
    const result = await fetch2(
      `${process.env.REACT_APP_BASEURL}/production_addproduction`,
      body
    );
    console.log(result, "production_addproduction");
    return result;
  }
);

const inventoryProductionSlice: any = createSlice({
  name: "InventoryProduction",
  initialState,
  reducers: {
    addType(state = initialState, action) {
      addInventoryProductionType = action.payload.name;
      inventoryProductionId = action.payload.id;
    },
  },
  extraReducers: {
    [inventoryProductionList.fulfilled]: (
      state: any,
      { payload: { error, message } }
    ) => {
      state.loading = false;
      state.inventoryProductionListCount += 1;
      if (error) {
        state.error = error;
      } else {
        state.error = message;
      }
    },
    [production_addproduction.fulfilled]: (
      state: any,
      { payload: { error, message } }
    ) => {
      state.loading = false;
      state.production_addproductionCount += 1;
      if (error) {
        state.error = error;
      } else {
        state.error = message;
      }
    },
    [production_get_branch.fulfilled]: (
      state: any,
      { payload: { error, message } }
    ) => {
      state.loading = false;
      state.production_get_branchCount += 1;
      if (error) {
        state.error = error;
      } else {
        state.error = message;
      }
    },
  },
});

export const { addType } = inventoryProductionSlice.actions;
export default inventoryProductionSlice.reducer;

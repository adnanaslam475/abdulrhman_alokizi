import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { fetch2, fetch3 } from "../../Apis/commonApis";

const initialState = {
  loading: false,
  inventoryTransferListCount: 0,
  transfer_get_source_destinationCount: 0,
  transfer_addCount: 0,
};

export let transfer_list_search_type: any = {
  type: "all",
  admin_id: JSON.parse(localStorage.getItem("___data")!)?.id,
};

export let inventoryTransferListItems: any;
export let addInventoryTransferType: any;
export let inventoryTransferId: any;
export let transfer_get_source_destinationListItems: any;

export const inventoryTransferList: any = createAsyncThunk(
  "transfer_list_search_type",
  async (body) => {
    const result = await fetch2(
      `${process.env.REACT_APP_BASEURL}/transfer_list_search_type`,
      body
    );
    inventoryTransferListItems = result.data;
    console.log(inventoryTransferListItems, "transfer_list_search_type");
    return result;
  }
);

export const transfer_get_source_destinationList: any = createAsyncThunk(
  "transfer_get_source_destination",
  async (body) => {
    const result = await fetch2(
      `${process.env.REACT_APP_BASEURL}/transfer_get_source_destination`,
      body
    );
    transfer_get_source_destinationListItems = result.data;
    console.log(inventoryTransferListItems, "transfer_get_source_destination");
    return result;
  }
);

export const transfer_add: any = createAsyncThunk(
  "transfer_add",
  async (body) => {
    const result = await fetch2(
      `${process.env.REACT_APP_BASEURL}/transfer_add`,
      body
    );
    console.log(result, "transfer_add");
    return result;
  }
);

const inventoryTransferSlice: any = createSlice({
  name: "InventoryTransfer",
  initialState,
  reducers: {
    addType(state = initialState, action) {
      addInventoryTransferType = action.payload.name;
      inventoryTransferId = action.payload.id;
    },
  },
  extraReducers: {
    [inventoryTransferList.fulfilled]: (
      state: any,
      { payload: { error, message } }
    ) => {
      state.loading = false;
      state.inventoryTransferListCount += 1;
      if (error) {
        state.error = error;
      } else {
        state.error = message;
      }
    },
    [transfer_add.fulfilled]: (state: any, { payload: { error, message } }) => {
      state.loading = false;
      state.transfer_addCount += 1;
      if (error) {
        state.error = error;
      } else {
        state.error = message;
      }
    },
    [transfer_get_source_destinationList.fulfilled]: (
      state: any,
      { payload: { error, message } }
    ) => {
      state.loading = false;
      state.transfer_get_source_destinationCount += 1;
      if (error) {
        state.error = error;
      } else {
        state.error = message;
      }
    },
  },
});

export const { addType } = inventoryTransferSlice.actions;
export default inventoryTransferSlice.reducer;

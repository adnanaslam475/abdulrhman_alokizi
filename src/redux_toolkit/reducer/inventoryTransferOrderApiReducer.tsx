import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { fetch2, fetch3 } from "../../Apis/commonApis";

const initialState = {
  loading: false,
  inventoryTransferOrderListCount: 0,
  get_transferorder_warehouseCount: 0,
  get_transferorder_destinationCount: 0,
  transferorder_addCount: 0,
};

export let transferorder_list_search_type: any = {
  type: "all",
  admin_id: JSON.parse(localStorage.getItem("___data")!)?.id,
};

export let inventoryTransferOrderListItems: any;
export let addInventoryTransferOrderType: any;
export let inventoryTransferOrderId: any;
export let get_transferorder_warehouseList: any;
export let get_transferorder_destinationList: any;

export const inventoryTransferOrderList: any = createAsyncThunk(
  "transferorder_list_search_type",
  async (body) => {
    const result = await fetch2(
      `${process.env.REACT_APP_BASEURL}/transferorder_list_search_type`,
      body
    );
    inventoryTransferOrderListItems = result.data;
    console.log(
      inventoryTransferOrderListItems,
      "transferorder_list_search_type"
    );
    return result;
  }
);

export const get_transferorder_warehouse: any = createAsyncThunk(
  "get_transferorder_warehouse",
  async () => {
    const result = await fetch3(
      `${process.env.REACT_APP_BASEURL}/get_transferorder_warehouse`,
      "get"
    );
    get_transferorder_warehouseList = result.data;
    console.log(get_transferorder_warehouseList, "get_transferorder_warehouse");
    return result;
  }
);

export const get_transferorder_destination: any = createAsyncThunk(
  "get_transferorder_destination",
  async (body) => {
    const result = await fetch3(
      `${process.env.REACT_APP_BASEURL}/get_transferorder_destination/${body}`,
      "get"
    );
    get_transferorder_destinationList = result.data;
    console.log(
      get_transferorder_destinationList,
      "get_transferorder_destination"
    );
    return result;
  }
);

export const transferorder_add: any = createAsyncThunk(
  "transferorder_add",
  async (body) => {
    const result = await fetch2(
      `${process.env.REACT_APP_BASEURL}/transferorder_add`,
      body
    );
    console.log(result, "transferorder_add");
    return result;
  }
);

const inventoryTransferOrderSlice: any = createSlice({
  name: "InventoryTransferOrder",
  initialState,
  reducers: {
    addType(state = initialState, action) {
      addInventoryTransferOrderType = action.payload.name;
      inventoryTransferOrderId = action.payload.id;
    },
  },
  extraReducers: {
    [inventoryTransferOrderList.fulfilled]: (
      state: any,
      { payload: { error, message } }
    ) => {
      state.loading = false;
      state.inventoryTransferOrderListCount += 1;
      if (error) {
        state.error = error;
      } else {
        state.error = message;
      }
    },
    [get_transferorder_warehouse.fulfilled]: (
      state: any,
      { payload: { error, message } }
    ) => {
      state.loading = false;
      state.get_transferorder_warehouseCount += 1;
      if (error) {
        state.error = error;
      } else {
        state.error = message;
      }
    },
    [get_transferorder_destination.fulfilled]: (
      state: any,
      { payload: { error, message } }
    ) => {
      state.loading = false;
      state.get_transferorder_destinationCount += 1;
      if (error) {
        state.error = error;
      } else {
        state.error = message;
      }
    },
    [transferorder_add.fulfilled]: (
      state: any,
      { payload: { error, message } }
    ) => {
      state.loading = false;
      state.transferorder_addCount += 1;
      if (error) {
        state.error = error;
      } else {
        state.error = message;
      }
    },
  },
});

export const { addType } = inventoryTransferOrderSlice.actions;
export default inventoryTransferOrderSlice.reducer;

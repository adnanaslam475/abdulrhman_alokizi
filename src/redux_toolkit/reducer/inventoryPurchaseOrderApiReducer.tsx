import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { fetch2, fetch3 } from "../../Apis/commonApis";

const initialState = {
  loading: false,
  inventoryPurchaseOrderListCount: 0,
  addEditInventoryPurchaseOrderCount: 0,
  singleInventoryPurchaseOrderCount: 0,
  get_supplier_branchCount: 0,
};

export let Purchaseorder_list_search: any = {
  type: "all",
  admin_id: JSON.parse(localStorage.getItem("___data")!)?.id,
};

export let inventoryPurchaseOrderListItems: any;
export let getAllTagItem: any;
export let singleInventoryPurchaseOrderDetails: any;
export let getSupplier: any;
export let getSupplierBranches: any;
export let inventoryPurchaseOrderId: any;
export let inventoryTagsForPurchaseOrder: any;
export let addInventoryPurchaseOrderType: string;

export const inventoryPurchaseOrderList: any = createAsyncThunk(
  "inventoryPurchaseOrderList",
  async (body) => {
    const result = await fetch2(
      `${process.env.REACT_APP_BASEURL}/purchaseorder_list_search`,
      body
    );
    inventoryPurchaseOrderListItems = result.data;
    console.log(inventoryPurchaseOrderListItems, "inventoryPurchaseOrderList");
    return result;
  }
);

export const inventoryPurchaseOrderView: any = createAsyncThunk(
  "inventoryPurchaseOrderView",
  async (body) => {
    const result = await fetch2(
      `${process.env.REACT_APP_BASEURL}/purchaseOrder_View/${body}`,
      ""
    );
    singleInventoryPurchaseOrderDetails = result.data;
    return result;
  }
);

export const get_supplier_branch: any = createAsyncThunk(
  "get_supplier_branch",
  async () => {
    const result = await fetch3(
      `${process.env.REACT_APP_BASEURL}/get_supplier_branch`,
      "GET"
    );
    getSupplierBranches = result?.branchesh;
    getSupplier = result?.supplier;
    console.log(getSupplier, getSupplierBranches, "get_supplier_branch");
    return result;
  }
);

export const addEditInventoryPurchaseOrder: any = createAsyncThunk(
  "purchaseorder_add",
  async (body) => {
    const result = await fetch2(
      `${process.env.REACT_APP_BASEURL}/purchaseorder_add`,
      body
    );
    console.log(result, "addEditInventoryPurchaseOrder");
    return result;
  }
);

const inventoryPurchaseOrderSlice: any = createSlice({
  name: "InventoryPurchaseOrder",
  initialState,
  reducers: {
    addType(state = initialState, action) {
      addInventoryPurchaseOrderType = action.payload.name;
      inventoryPurchaseOrderId = action.payload.id;
    },
  },
  extraReducers: {
    [get_supplier_branch.fulfilled]: (
      state: any,
      { payload: { error, message } }
    ) => {
      state.loading = false;
      state.get_supplier_branchCount += 1;
      if (error) {
        state.error = error;
      } else {
        state.error = message;
      }
    },
    [inventoryPurchaseOrderList.fulfilled]: (
      state: any,
      { payload: { error, message } }
    ) => {
      state.loading = false;
      state.inventoryPurchaseOrderListCount += 1;
      if (error) {
        state.error = error;
      } else {
        state.error = message;
      }
    },
    [addEditInventoryPurchaseOrder.fulfilled]: (
      state: any,
      { payload: { error, message } }
    ) => {
      state.loading = false;
      state.addEditInventoryPurchaseOrderCount += 1;
      if (error) {
        state.error = error;
      } else {
        state.error = message;
      }
    },
    [inventoryPurchaseOrderView.fulfilled]: (
      state: any,
      { payload: { error, message } }
    ) => {
      state.loading = false;
      state.singleInventoryPurchaseOrderCount += 1;
      if (error) {
        state.error = error;
      } else {
        state.error = message;
      }
    },
  },
});

export const { addType } = inventoryPurchaseOrderSlice.actions;
export default inventoryPurchaseOrderSlice.reducer;

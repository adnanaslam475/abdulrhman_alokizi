import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { fetch2, fetch3 } from "../../Apis/commonApis";

const initialState = {
  loading: false,
  inventorySupplierListCount: 0,
  addEditInventorySupplieCount: 0,
  singleInventorySupplierCount: 0,
  supplieradd_tagCount: 0,
  tagforsupplierCount: 0,
};

export let supplier_list_ordelete: any = {
  id: "",
  search: "",
};

export let inventorySupplierListItems: any;
export let getAllTagItem: any;
export let singleInventorySupplierDetails: any;
export let inventorySupplierId: any;
export let inventoryTagsForSupplier: any;
export let addInventorySupplierType: string;

export const inventorySupplierList: any = createAsyncThunk(
  "inventorySupplierList",
  async (body) => {
    const result = await fetch2(
      `${process.env.REACT_APP_BASEURL}/supplier_list_ordelete`,
      body
    );
    inventorySupplierListItems = result.data;
    // console.log(inventorySupplierListItems, "inventorySupplierList");
    return result;
  }
);

export const inventorySupplierView: any = createAsyncThunk(
  "inventorySupplierView",
  async (body) => {
    const result = await fetch3(
      `${process.env.REACT_APP_BASEURL}/supplier_view/${body}`,
      "GET"
    );
    singleInventorySupplierDetails = result.supplierData;
    getAllTagItem = result;
    console.log(
      singleInventorySupplierDetails,
      "singleInventorySupplierDetails"
    );
    return result;
  }
);

export const tagforsupplier: any = createAsyncThunk(
  "tagforsupplier",
  async () => {
    const result = await fetch3(
      `${process.env.REACT_APP_BASEURL}/tagforsupplier`,
      "GET"
    );
    inventoryTagsForSupplier = result;

    console.log(inventoryTagsForSupplier, "tagforsupplier");
    return result;
  }
);

export const addEditInventorySupplier: any = createAsyncThunk(
  "supplier_add_edit",
  async (body) => {
    const result = await fetch2(
      `${process.env.REACT_APP_BASEURL}/supplier_add_edit`,
      body
    );
    // console.log(result, "supplier_add_edit");
    return result;
  }
);

export const supplieradd_tag: any = createAsyncThunk(
  "supplieradd_tag",
  async (body) => {
    const result = await fetch2(
      `${process.env.REACT_APP_BASEURL}/supplieradd_tag`,
      body
    );
    console.log(result, "supplieradd_tag");
    return result;
  }
);

const inventorySupplierSlice: any = createSlice({
  name: "InventorySupplier",
  initialState,
  reducers: {
    addType(state = initialState, action) {
      addInventorySupplierType = action.payload.name;
      inventorySupplierId = action.payload.id;
    },
  },
  extraReducers: {
    [inventorySupplierList.fulfilled]: (
      state: any,
      { payload: { error, message } }
    ) => {
      state.loading = false;
      state.inventorySupplierListCount += 1;
      if (error) {
        state.error = error;
      } else {
        state.error = message;
      }
    },
    [addEditInventorySupplier.fulfilled]: (
      state: any,
      { payload: { error, message } }
    ) => {
      state.loading = false;
      state.addEditInventorySupplieCount += 1;
      if (error) {
        state.error = error;
      } else {
        state.error = message;
      }
    },
    [inventorySupplierView.fulfilled]: (
      state: any,
      { payload: { error, message } }
    ) => {
      state.loading = false;
      state.singleInventorySupplierCount += 1;
      if (error) {
        state.error = error;
      } else {
        state.error = message;
      }
    },
    [tagforsupplier.fulfilled]: (
      state: any,
      { payload: { error, message } }
    ) => {
      state.loading = false;
      state.tagforsupplierCount += 1;
      if (error) {
        state.error = error;
      } else {
        state.error = message;
      }
    },
    [supplieradd_tag.fulfilled]: (
      state: any,
      { payload: { error, message } }
    ) => {
      state.loading = false;
      state.supplieradd_tagCount += 1;
      if (error) {
        state.error = error;
      } else {
        state.error = message;
      }
    },
  },
});

export const { addType } = inventorySupplierSlice.actions;
export default inventorySupplierSlice.reducer;

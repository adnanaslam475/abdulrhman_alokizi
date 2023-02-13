import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { fetch2, fetch3 } from "../../Apis/commonApis";

const initialState = {
  loading: false,
  inventoryItemListCount: 0,
  getCategoriesInItemListCount: 0,
  addEditInventoryItemCount: 0,
  singleInventoryItemCount: 0,
  tag_forItemCount: 0,
  get_ingridentForItemCount: 0,
  get_supplier_itemCount: 0,
  item_tag_ingre_supp_branchCount: 0,
};

export let inventoryItem_list_delete: any = {
  id: "",
  search: "",
};

export let inventoryItemListItems: any;
export let CategoryInInventoryItemListItems: any;
export let TagsInInventoryItemListItems: any;
export let IngredientsInInventoryItemListItems: any;
export let SupplierInInventoryItemListItems: any;
export let singleInventoryItemDetails: any;
export let getAllTagSupplierIngridentCustomLevel: any;
export let inventoryItemId: number | string;
export let addInventoryItemType: string;

export const inventoryItemList: any = createAsyncThunk(
  "inventoryItemList",
  async (body) => {
    const result = await fetch2(
      `${process.env.REACT_APP_BASEURL}/item_list_delete`,
      body
    );
    inventoryItemListItems = result.data;
    // console.log(inventoryItemListItems, "inventoryItemList");
    return result;
  }
);

export const getCategoriesInItemList: any = createAsyncThunk(
  "get_categories_initem",
  async () => {
    const result = await fetch3(
      `${process.env.REACT_APP_BASEURL}/get_categories_initem`,
      "GET"
    );
    CategoryInInventoryItemListItems = result.data;
    // console.log(
    //   CategoryInInventoryItemListItems,
    //   "CategoryInInventoryItemListItems"
    // );
    return result;
  }
);

export const tag_foritem: any = createAsyncThunk("tag_foritem", async () => {
  const result = await fetch3(
    `${process.env.REACT_APP_BASEURL}/tag_foritem`,
    "GET"
  );
  TagsInInventoryItemListItems = result.data;
  // console.log(TagsInInventoryItemListItems, "TagsInInventoryItemListItems");
  return result;
});

export const get_ingridentForItem: any = createAsyncThunk(
  "get_ingridentForItem",
  async () => {
    const result = await fetch3(
      `${process.env.REACT_APP_BASEURL}/get_ingrident`,
      "GET"
    );
    IngredientsInInventoryItemListItems = result.data;
    // console.log(
    //   IngredientsInInventoryItemListItems,
    //   "IngredientsInInventoryItemListItems"
    // );
    return result;
  }
);

export const get_supplier_item: any = createAsyncThunk(
  "get_supplier_item",
  async () => {
    const result = await fetch3(
      `${process.env.REACT_APP_BASEURL}/get_supplier_item`,
      "GET"
    );
    SupplierInInventoryItemListItems = result.data;
    // console.log(
    //   SupplierInInventoryItemListItems,
    //   "SupplierInInventoryItemListItems"
    // );
    return result;
  }
);

export const addEditInventoryItem: any = createAsyncThunk(
  "item_add_edit",
  async (body) => {
    const result = await fetch2(
      `${process.env.REACT_APP_BASEURL}/item_add_edit`,
      body
    );
    // console.log(result, "addEditInventoryItem");
    return result;
  }
);

export const inventoryItemView: any = createAsyncThunk(
  "inventoryItemView",
  async (body) => {
    const result = await fetch3(
      `${process.env.REACT_APP_BASEURL}/itemview/${body}`,
      "get"
    );
    singleInventoryItemDetails = result.itemdetail;
    getAllTagSupplierIngridentCustomLevel = result;
    // console.log(singleInventoryItemDetails, "singleProductDetails1");
    return result;
  }
);

export const tagadd_item: any = createAsyncThunk(
  "tagadd_item",
  async (body) => {
    const result = await fetch2(
      `${process.env.REACT_APP_BASEURL}/tagadd_item`,
      body
    );
    // console.log(result, "tagadd_item");
    return result;
  }
);

export const ingridentadd_item: any = createAsyncThunk(
  "ingridentadd_item",
  async (body) => {
    const result = await fetch2(
      `${process.env.REACT_APP_BASEURL}/ingridentadd_item`,
      body
    );
    // console.log(result, "ingridentadd_item");
    return result;
  }
);

export const supplieradd_item: any = createAsyncThunk(
  "supplieradd_item",
  async (body) => {
    const result = await fetch2(
      `${process.env.REACT_APP_BASEURL}/supplieradd_item`,
      body
    );
    // console.log(result, "supplieradd_item");
    return result;
  }
);

export const customlevel_additem: any = createAsyncThunk(
  "customlevel_additem",
  async (body) => {
    const result = await fetch2(
      `${process.env.REACT_APP_BASEURL}/customlevel_additem`,
      body
    );
    // console.log(result, "customlevel_additem");
    return result;
  }
);

export const selected_tagaddremove_delete: any = createAsyncThunk(
  "selected_tagaddremove_delete",
  async (body) => {
    const result = await fetch2(
      `${process.env.REACT_APP_BASEURL}/selected_tagaddremove_delete`,
      body
    );
    // console.log(result, "selected_tagaddremove_delete");
    return result;
  }
);

export const item_deletemultiple: any = createAsyncThunk(
  "item_deletemultiple",
  async (body) => {
    const result = await fetch2(
      `${process.env.REACT_APP_BASEURL}/item_deletemultiple`,
      body
    );
    console.log(result, "item_deletemultiple");
    return result;
  }
);

const inventoryItemSlice: any = createSlice({
  name: "InventoryItem",
  initialState,
  reducers: {
    addType(state = initialState, action) {
      addInventoryItemType = action.payload.name;
      inventoryItemId = action.payload.id;
    },
  },
  extraReducers: {
    [inventoryItemList.fulfilled]: (
      state: any,
      { payload: { error, message } }
    ) => {
      state.loading = false;
      state.inventoryItemListCount += 1;
      if (error) {
        state.error = error;
      } else {
        state.error = message;
      }
    },
    [getCategoriesInItemList.fulfilled]: (
      state: any,
      { payload: { error, message } }
    ) => {
      state.loading = false;
      state.getCategoriesInItemListCount += 1;
      if (error) {
        state.error = error;
      } else {
        state.error = message;
      }
    },
    [addEditInventoryItem.fulfilled]: (
      state: any,
      { payload: { error, message } }
    ) => {
      state.loading = false;
      state.addEditInventoryItemCount += 1;
      if (error) {
        state.error = error;
      } else {
        state.error = message;
      }
    },
    [inventoryItemView.fulfilled]: (
      state: any,
      { payload: { error, message } }
    ) => {
      state.loading = false;
      state.singleInventoryItemCount += 1;
      if (error) {
        state.error = error;
      } else {
        state.error = message;
      }
    },
    [tag_foritem.fulfilled]: (state: any, { payload: { error, message } }) => {
      state.loading = false;
      state.tag_forItemCount += 1;
      if (error) {
        state.error = error;
      } else {
        state.error = message;
      }
    },
    [get_ingridentForItem.fulfilled]: (
      state: any,
      { payload: { error, message } }
    ) => {
      state.loading = false;
      state.get_ingridentForItemCount += 1;
      if (error) {
        state.error = error;
      } else {
        state.error = message;
      }
    },
    [get_supplier_item.fulfilled]: (
      state: any,
      { payload: { error, message } }
    ) => {
      state.loading = false;
      state.get_supplier_itemCount += 1;
      if (error) {
        state.error = error;
      } else {
        state.error = message;
      }
    },
    [tagadd_item.fulfilled]: (state: any, { payload: { error, message } }) => {
      state.loading = false;
      state.item_tag_ingre_supp_branchCount += 1;
      if (error) {
        state.error = error;
      } else {
        state.error = message;
      }
    },
    [ingridentadd_item.fulfilled]: (
      state: any,
      { payload: { error, message } }
    ) => {
      state.loading = false;
      state.item_tag_ingre_supp_branchCount += 1;
      if (error) {
        state.error = error;
      } else {
        state.error = message;
      }
    },
    [supplieradd_item.fulfilled]: (
      state: any,
      { payload: { error, message } }
    ) => {
      state.loading = false;
      state.item_tag_ingre_supp_branchCount += 1;
      if (error) {
        state.error = error;
      } else {
        state.error = message;
      }
    },
    [customlevel_additem.fulfilled]: (
      state: any,
      { payload: { error, message } }
    ) => {
      state.loading = false;
      state.item_tag_ingre_supp_branchCount += 1;
      if (error) {
        state.error = error;
      } else {
        state.error = message;
      }
    },
    [selected_tagaddremove_delete.fulfilled]: (
      state: any,
      { payload: { error, message } }
    ) => {
      state.loading = false;
      state.inventoryItemListCount += 1;
      if (error) {
        state.error = error;
      } else {
        state.error = message;
      }
    },
    [item_deletemultiple.fulfilled]: (
      state: any,
      { payload: { error, message } }
    ) => {
      state.loading = false;
      state.inventoryItemListCount += 1;
      if (error) {
        state.error = error;
      } else {
        state.error = message;
      }
    },
  },
});

export const { addType } = inventoryItemSlice.actions;
export default inventoryItemSlice.reducer;

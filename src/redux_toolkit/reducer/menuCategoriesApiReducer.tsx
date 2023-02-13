import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { fetch2, fetch3, getFetch } from "../../Apis/commonApis";

const initialState = {
  token: "",
  loading: false,
  error: "",
  categoryList: 0,
  categoryFilter: 0,
  createCategory: 0,
  editMenu: 0,
  filterValue: 0,
  sortMenuCategories: 0,
  sortMenuSubCategories: 0,
  catId: "",
};

export let categoryListItems: any;
export let sortCategories: any;
export let sortSubCategories: any;
export let filterValue: any = {
  type: "",
  name: "",
  referance: "",
  udateafter: "",
};

export let editMenuCategoryData: any = {
  id: "",
  img: "",
  engname: "",
  localize: "",
  referance: "",
};

export const categoryList: any = createAsyncThunk(
  "categoryList",
  async (body) => {
    const result = await getFetch(
      `${process.env.REACT_APP_BASEURL}/categorylist`,
      body
    );
    categoryListItems = result.data;
    console.log(categoryListItems, "asdas");
    return result;
  }
);

export const createCategory: any = createAsyncThunk(
  "createCategory",
  async (body) => {
    const result = await fetch2(
      `${process.env.REACT_APP_BASEURL}/addeditCategory`,
      body
    );
    return result;
  }
);

export const multiDeleteCategory: any = createAsyncThunk(
  "multiDeleteCategory",
  async (body) => {
    const result = await fetch2(
      `${process.env.REACT_APP_BASEURL}/category_multipledelete`,
      body
    );
    return result;
  }
);

export const allCategories: any = createAsyncThunk(
  "allCategories",
  async () => {
    const result = await fetch3(
      `${process.env.REACT_APP_BASEURL}/category_short`,
      "get"
    );
    sortCategories = result.data;
    return result;
  }
);

export const allSubCategories: any = createAsyncThunk(
  "allSubCategories",
  async (body) => {
    const result = await fetch3(
      `${process.env.REACT_APP_BASEURL}/category_short_view/${body}`,
      "get"
    );
    sortSubCategories = result.data;
    return result;
  }
);

export const reorderCategories: any = createAsyncThunk(
  "reorderCategories",
  async (body) => {
    const result = await fetch2(
      `${process.env.REACT_APP_BASEURL}/categoryReorder`,
      body
    );
    sortSubCategories = result.data;
    return result;
  }
);

export const reorderSubCategories: any = createAsyncThunk(
  "reorderSubCategories",
  async (body: any) => {
    console.log(body, "data");
    let data: any = { data: JSON.stringify(body.data) };
    console.log(data, "body");
    const result = await fetch2(
      `${process.env.REACT_APP_BASEURL}/category_productReorder/${body.id}`,
      data
    );
    sortSubCategories = result.data;
    return result;
  }
);

const categorySlice: any = createSlice({
  name: "Category",
  initialState,
  reducers: {
    editMenuCategory(state = initialState, action) {
      state.editMenu += 1;
      editMenuCategoryData.id = action.payload.id;
      editMenuCategoryData.img = action.payload.icon;
      editMenuCategoryData.engname = action.payload.name;
      editMenuCategoryData.localize = action.payload.localize;
      editMenuCategoryData.referance = action.payload.reference;
    },
    filterData(state = initialState, action) {
      console.log(action, "action");
      if (action.payload.type === "Yes") {
        filterValue.type = "deleted";
      } else if (action.payload.type === "No") {
        filterValue.type = "All";
      } else {
        filterValue.type = "All";
      }
      filterValue.name = action.payload.name;
      filterValue.referance = action.payload.referance;
      filterValue.udateafter = action.payload.udateafter;
      state.filterValue += 1;
    },
    categoryId(state = initialState, action) {
      state.catId = action.payload;
    },
  },
  extraReducers: {
    [categoryList.fulfilled]: (state: any, { payload: { error, message } }) => {
      state.loading = false;
      state.categoryList += 1;
      if (error) {
        state.error = error;
      } else {
        state.error = message;
      }
    },
    [categoryList.pending]: (state, action) => {
      state.loading = true;
    },
    [createCategory.fulfilled]: (
      state: any,
      { payload: { error, message } }
    ) => {
      state.loading = false;
      state.createCategory += 1;
      if (error) {
        state.error = error;
      } else {
        state.error = message;
      }
    },
    [multiDeleteCategory.fulfilled]: (
      state: any,
      { payload: { error, message } }
    ) => {
      state.loading = false;
      state.createCategory += 1;
      if (error) {
        state.error = error;
      } else {
        state.error = message;
      }
    },
    [allCategories.fulfilled]: (
      state: any,
      { payload: { error, message } }
    ) => {
      state.loading = false;
      state.sortMenuCategories += 1;
      if (error) {
        state.error = error;
      } else {
        state.error = message;
      }
    },
    [allSubCategories.fulfilled]: (
      state: any,
      { payload: { error, message } }
    ) => {
      state.loading = false;
      state.sortMenuSubCategories += 1;
      if (error) {
        state.error = error;
      } else {
        state.error = message;
      }
    },
    [reorderCategories.fulfilled]: (
      state: any,
      { payload: { error, message } }
    ) => {
      state.loading = false;
      state.sortMenuSubCategories += 1;
      if (error) {
        state.error = error;
      } else {
        state.error = message;
      }
    },
    [reorderSubCategories.fulfilled]: (
      state: any,
      { payload: { error, message } }
    ) => {
      state.loading = false;
      if (error) {
        state.error = error;
      } else {
        state.error = message;
      }
    },
  },
});

export const { editMenuCategory, clearFilter, categoryId, filterData } =
  categorySlice.actions;
export default categorySlice.reducer;

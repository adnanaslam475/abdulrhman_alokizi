import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { fetch2, fetch3 } from "../../Apis/commonApis";

const initialState = {
  loading: false,
  discountListCount: 0,
  addDiscountCount: 0,
  discountDetailCount: 0,
  editDiscountCount: 0,
  discountBranchCount: 0,
  discountTagCount: 0,
  deleteDiscountCount: false,
};

export let discountFilterValue: any = {
  type: "",
};
export let discountDetailPerId: any;
export let discountListItems: any;
export let discountTagListItems: any;

export const discountList: any = createAsyncThunk(
  "discountList",
  async (body) => {
    const result = await fetch2(
      `${process.env.REACT_APP_BASEURL}/discount_list_filter_search_type`,
      body
    );
    discountListItems = result.data;
    return result;
  }
);

export const addDiscount: any = createAsyncThunk(
  "addDiscount",
  async (body) => {
    const result = await fetch2(
      `${process.env.REACT_APP_BASEURL}/addDiscount`,
      body
    );
    return result;
  }
);

export const discountDetails: any = createAsyncThunk(
  "discountDetails",
  async (body) => {
    const result = await fetch2(
      `${process.env.REACT_APP_BASEURL}/discountDetail`,
      body
    );
    discountDetailPerId = result.data;
    discountTagListItems = result.tags;
    return result;
  }
);

export const editDiscount: any = createAsyncThunk(
  "editDiscount",
  async (body) => {
    const result = await fetch2(
      `${process.env.REACT_APP_BASEURL}/editDiscount`,
      body
    );
    return result;
  }
);

export const discountOnBranch: any = createAsyncThunk(
  "discountOnBranch",
  async (body) => {
    const result = await fetch2(
      `${process.env.REACT_APP_BASEURL}/discountOnbranch`,
      body
    );
    return result;
  }
);

export const discountOnTag: any = createAsyncThunk(
  "discountOnTag",
  async (body) => {
    const result = await fetch2(
      `${process.env.REACT_APP_BASEURL}/discountOntag`,
      body
    );
    return result;
  }
);

export const deleteDiscount: any = createAsyncThunk(
  "deleteDiscount",
  async (body) => {
    const result = await fetch2(
      `${process.env.REACT_APP_BASEURL}/discountDelete`,
      body
    );
    return result;
  }
);

const manageDiscountSlice: any = createSlice({
  name: "manageDiscount",
  initialState,
  reducers: {
    deleteBoolean(state = initialState, action) {
      state.deleteDiscountCount = false;
    },
  },
  extraReducers: {
    [discountList.fulfilled]: (state: any, { payload: { error, message } }) => {
      state.loading = false;
      state.discountListCount += 1;
      if (error) {
        state.error = error;
      } else {
        state.error = message;
      }
    },
    [addDiscount.fulfilled]: (state: any, { payload: { error, message } }) => {
      state.loading = false;
      state.addDiscountCount += 1;
      if (error) {
        state.error = error;
      } else {
        state.error = message;
      }
    },
    [discountDetails.fulfilled]: (
      state: any,
      { payload: { error, message } }
    ) => {
      state.loading = false;
      state.discountDetailCount += 1;
      if (error) {
        state.error = error;
      } else {
        state.error = message;
      }
    },
    [editDiscount.fulfilled]: (state: any, { payload: { error, message } }) => {
      state.loading = false;
      state.editDiscountCount += 1;
      if (error) {
        state.error = error;
      } else {
        state.error = message;
      }
    },
    [discountOnBranch.fulfilled]: (
      state: any,
      { payload: { error, message } }
    ) => {
      state.loading = false;
      state.discountBranchCount += 1;
      if (error) {
        state.error = error;
      } else {
        state.error = message;
      }
    },
    [discountOnTag.fulfilled]: (
      state: any,
      { payload: { error, message } }
    ) => {
      state.loading = false;
      state.discountTagCount += 1;
      if (error) {
        state.error = error;
      } else {
        state.error = message;
      }
    },
    [deleteDiscount.fulfilled]: (
      state: any,
      { payload: { error, message } }
    ) => {
      state.loading = false;
      state.deleteDiscountCount = true;
      if (error) {
        state.error = error;
      } else {
        state.error = message;
      }
    },
  },
});

export const { deleteBoolean } = manageDiscountSlice.actions;
export default manageDiscountSlice.reducer;

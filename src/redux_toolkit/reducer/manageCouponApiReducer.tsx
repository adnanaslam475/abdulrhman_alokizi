import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { fetch2, fetch3 } from "../../Apis/commonApis";

const initialState = {
  loading: false,
  couponListCount: 0,
  couponCount: 0,
  discountTypeCount: 0,
  singleCouponCount: 0,
  deactivateCouponCount: 0,
  isDeleteCoupon: false,
  editCouponCount: 0,
};

export let couponFilterValue: any = {
  type: "",
};

export let couponListItems: any;
export let singleCouponDetails: any;
export let discountTypeItems: any;

export const couponList: any = createAsyncThunk("couponList", async (body) => {
  const result = await fetch2(
    `${process.env.REACT_APP_BASEURL}/coupan_list_filter_search_type`,
    body
  );
  couponListItems = result.data;
  return result;
});

export const addCoupon: any = createAsyncThunk("addCoupon", async (body) => {
  const result = await fetch2(
    `${process.env.REACT_APP_BASEURL}/coupanAdd`,
    body
  );
  return result;
});

export const editCoupon: any = createAsyncThunk("editCoupon", async (body) => {
  const result = await fetch2(
    `${process.env.REACT_APP_BASEURL}/coupon_details_edit`,
    body
  );
  return result;
});

export const deleteCoupon: any = createAsyncThunk(
  "deleteCoupon",
  async (body) => {
    const result = await fetch3(
      `${process.env.REACT_APP_BASEURL}/coupondelete/${body}`,
      "get"
    );
    return result;
  }
);

export const couponView: any = createAsyncThunk("couponView", async (body) => {
  const result = await fetch3(
    `${process.env.REACT_APP_BASEURL}/coupon_details/${body}`,
    "get"
  );
  singleCouponDetails = result.data;
  return result;
});

export const deactivateCoupon: any = createAsyncThunk(
  "deactivateCoupon",
  async (body) => {
    const result = await fetch2(
      `${process.env.REACT_APP_BASEURL}/deactivate_coupon`,
      body
    );
    return result;
  }
);

export const discountType: any = createAsyncThunk("discountType", async () => {
  const result = await fetch3(
    `${process.env.REACT_APP_BASEURL}/getdisconttype`,
    "get"
  );
  discountTypeItems = [];
  result.data?.map((item: any, index: number) => {
    discountTypeItems.push({
      value: item.id,
      label: item.english_name,
    });
  });
  console.log(discountTypeItems, "discountTypeItems");
  return result;
});

const manageCouponSlice: any = createSlice({
  name: "manageCoupon",
  initialState,
  reducers: {
    changeDeleteValue(state = initialState) {
      state.isDeleteCoupon = false;
    },
  },
  extraReducers: {
    [couponList.fulfilled]: (state: any, { payload: { error, message } }) => {
      state.loading = false;
      state.couponListCount += 1;
      if (error) {
        state.error = error;
      } else {
        state.error = message;
      }
    },
    [addCoupon.fulfilled]: (state: any, { payload: { error, message } }) => {
      state.loading = false;
      state.couponCount += 1;
      if (error) {
        state.error = error;
      } else {
        state.error = message;
      }
    },
    [editCoupon.fulfilled]: (state: any, { payload: { error, message } }) => {
      state.loading = false;
      state.editCouponCount += 1;
      if (error) {
        state.error = error;
      } else {
        state.error = message;
      }
    },
    [discountType.fulfilled]: (state: any, { payload: { error, message } }) => {
      state.loading = false;
      state.discountTypeCount += 1;
      if (error) {
        state.error = error;
      } else {
        state.error = message;
      }
    },
    [couponView.fulfilled]: (state: any, { payload: { error, message } }) => {
      state.loading = false;
      state.singleCouponCount += 1;
      if (error) {
        state.error = error;
      } else {
        state.error = message;
      }
    },
    [deactivateCoupon.fulfilled]: (
      state: any,
      { payload: { error, message } }
    ) => {
      state.loading = false;
      state.deactivateCouponCount += 1;
      if (error) {
        state.error = error;
      } else {
        state.error = message;
      }
    },
    [deleteCoupon.fulfilled]: (state: any, { payload: { error, message } }) => {
      state.loading = false;
      state.isDeleteCoupon = true;
      if (error) {
        state.error = error;
      } else {
        state.error = message;
      }
    },
  },
});

export const { changeDeleteValue } = manageCouponSlice.actions;
export default manageCouponSlice.reducer;

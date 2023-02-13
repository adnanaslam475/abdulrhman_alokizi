import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { fetch2, fetch3 } from "../../Apis/commonApis";

const initialState = {
  loading: false,
  userDeviceListCount: 0,
  createDeviceCount: 0,
  branchListCount: 0,
};

export let userDeviceFilterValue: any = {
  type: "",
};

export let userDeviceListItems: any;
export let branchData: any;

export const userDeviceList: any = createAsyncThunk(
  "userDeviceList",
  async (body) => {
    const result = await fetch2(
      `${process.env.REACT_APP_BASEURL}/device_list_filter_search_type`,
      body
    );
    userDeviceListItems = result.data;
    console.log(userDeviceListItems, "12345678");
    return result;
  }
);

export const createDeviceData: any = createAsyncThunk(
  "createDevice",
  async (body) => {
    const result = await fetch2(
      `${process.env.REACT_APP_BASEURL}/devicesAdd`,
      body
    );
    return result;
  }
);

export const branchGet: any = createAsyncThunk("branchGet", async (body) => {
  const result = await fetch2(
    `${process.env.REACT_APP_BASEURL}/productget_tag_modifer_ingrident_pricetag`,
    body
  );
  branchData = [];
  result.data.map((e: any) => {
    branchData.push({
      label: e.english_name,
      value: e.id,
    });
  });
  console.log(result.data, "branch");
  return result;
});

const manageDeviceSlice: any = createSlice({
  name: "manageDevice",
  initialState,
  reducers: {},
  extraReducers: {
    [userDeviceList.fulfilled]: (
      state: any,
      { payload: { error, message } }
    ) => {
      state.loading = false;
      state.userDeviceListCount += 1;
      if (error) {
        state.error = error;
      } else {
        state.error = message;
      }
    },
    [createDeviceData.fulfilled]: (
      state: any,
      { payload: { error, message } }
    ) => {
      state.loading = false;
      state.createDeviceCount += 1;
      if (error) {
        state.error = error;
      } else {
        state.error = message;
      }
    },
    [branchGet.fulfilled]: (state: any, { payload: { error, message } }) => {
      state.loading = false;
      state.branchListCount += 1;
      if (error) {
        state.error = error;
      } else {
        state.error = message;
      }
    },
  },
});

export const {} = manageDeviceSlice.actions;
export default manageDeviceSlice.reducer;

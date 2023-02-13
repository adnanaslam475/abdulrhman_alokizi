import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { fetch2, fetch3 } from "../../Apis/commonApis";

const initialState = {
  loading: false,
  userBranchListCount: 0,
};

export let userBranchFilterValue: any = {
  type: "",
};

export let userBranchListItems: any;

export const userBranchList: any = createAsyncThunk(
  "userBranchList",
  async (body) => {
    const result = await fetch2(
      `${process.env.REACT_APP_BASEURL}/branch_list_filter_search_type`,
      body
    );
    userBranchListItems = result.data;
    return result;
  }
);

const manageBranchSlice: any = createSlice({
  name: "Product",
  initialState,
  reducers: {},
  extraReducers: {
    [userBranchList.fulfilled]: (
      state: any,
      { payload: { error, message } }
    ) => {
      state.loading = false;
      state.userBranchListCount += 1;
      if (error) {
        state.error = error;
      } else {
        state.error = message;
      }
    },
  },
});

export const {} = manageBranchSlice.actions;
export default manageBranchSlice.reducer;

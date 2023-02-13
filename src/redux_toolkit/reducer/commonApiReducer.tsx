import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { fetch2, fetch3 } from "../../Apis/commonApis";

const initialState = {
  loading: false,
  branchesCount: 0,
};

export let branchesList: any;

export const branches: any = createAsyncThunk("branches", async () => {
  const result = await fetch3(
    `${process.env.REACT_APP_BASEURL}/branches`,
    "GET"
  );
  branchesList = result.data;
  console.log(branchesList, "branchesList");
  return result;
});

const inventoryItemSlice: any = createSlice({
  name: "SharedApis",
  initialState,
  reducers: {},
  extraReducers: {
    [branches.fulfilled]: (state: any, { payload: { error, message } }) => {
      state.loading = false;
      state.branchesCount += 1;
      if (error) {
        state.error = error;
      } else {
        state.error = message;
      }
    },
  },
});

export const {} = inventoryItemSlice.actions;
export default inventoryItemSlice.reducer;

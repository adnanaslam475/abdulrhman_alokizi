import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { fetch2, fetch3, getFetch } from "../../Apis/commonApis";

const initialState = {
  loading: false,
  userListCount: 0,
  userCreateCount: 0,
  error: "",
  status: false,
};

export let userFilterValue: any = {
  type: "",
};

export let userListItems: any;

export const userList: any = createAsyncThunk("userList", async (body) => {
  const result = await getFetch(
    `${process.env.REACT_APP_BASEURL}/user_list_filter_search_type`,
    body
  );
  userListItems = result.data;
  return result;
});

export const userCreate: any = createAsyncThunk("userCreate", async (body) => {
  const result = await fetch2(`${process.env.REACT_APP_BASEURL}/useradd`, body);
  return result;
});

const manageUserSlice: any = createSlice({
  name: "manageUser",
  initialState,
  reducers: {
    handleError(state = initialState, action) {
      console.log("handleError", action.payload);
      state.error = "";
    },
    handleLoading(state = initialState, action) {
      state.loading = action.payload;
    },
  },
  extraReducers: {
    [userList.fulfilled]: (
      state: any,
      { payload: { error, message, status } }
    ) => {
      state.loading = false;
      state.userListCount += 1;
      state.error = message;
      if (error) {
        state.error = error;
      } else {
        state.error = message;
      }
    },
    [userCreate.fulfilled]: (state: any, { payload: { message, status } }) => {
      state.loading = false;
      state.userCreateCount += 1;
      state.error = message;
      state.status = status;
    },
  },
});

export const { handleError, handleLoading } = manageUserSlice.actions;
export default manageUserSlice.reducer;

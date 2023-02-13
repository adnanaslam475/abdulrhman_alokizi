import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { fetch2, fetch3 } from '../../Apis/commonApis'

export let customerList: any;
const initialState = {
  customerListcount : 0
};
export const customers: any = createAsyncThunk("customerlist", async () => {
  const result = await fetch3(
    `${process.env.REACT_APP_BASEURL}/customerlist`,
    "GET"
  );
  customerList = result.data;
  console.log(customerList, "customerList");
  return result;
});
const customerSlice: any = createSlice({
  name: "Customer",
  initialState,
  reducers: {},

    extraReducers: {
      [customers.fulfilled]: (
        state: any,
        { payload: { error, message } }
      ) => {
        state.loading = false;
        state.customerListcount += 1;
        if (error) {
          state.error = error;
        } else {
          state.error = message;
        }
      },
    }
  
})

export default customerSlice.reducer;


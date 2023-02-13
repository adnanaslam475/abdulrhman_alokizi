import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { fetch2, fetch3 } from "../../Apis/commonApis";

const initialState = {
  loading: false,
  deliveryListCount: 0,
  addDeliveryCount: 0,
  deleteDeliveryCount: 0,
};
export let deliveryFilter = {
  type: "",
};
export let deliveryListItems: any;

export let editDeliveryData = {
  id: "",
  name: "",
  name_localized: "",
  branche_id: "",
  reference: "",
  cordinate: "",
};

export const deliveryList: any = createAsyncThunk(
  "deliveryList",
  async (body) => {
    const result = await fetch2(
      `${process.env.REACT_APP_BASEURL}/delivery_zone_list`,
      body
    );
    deliveryListItems = result.data;
    return result;
  }
);

export const addDelivery: any = createAsyncThunk(
  "addDelivery",
  async (body) => {
    const result = await fetch2(
      `${process.env.REACT_APP_BASEURL}/delivery_zone_add`,
      body
    );
    return result;
  }
);

export const deleteDelivery: any = createAsyncThunk(
  "deleteDelivery",
  async (body) => {
    const result = await fetch3(
      `${process.env.REACT_APP_BASEURL}/delivery_zone_delete?id=${body}`,
      "get"
    );
    return result;
  }
);

const manageMoreDeliverySlice: any = createSlice({
  name: "manageMoreDeliverySlice",
  initialState,
  reducers: {
    editDeliveryFunc(state = initialState, action) {
      editDeliveryData.id = action.payload.id;
      editDeliveryData.name = action.payload.name;
      editDeliveryData.name_localized = action.payload.name_localized;
      editDeliveryData.branche_id = action.payload.branche_id;
      editDeliveryData.reference = action.payload.reference;
      editDeliveryData.cordinate = action.payload.cordinate;
    },
  },
  extraReducers: {
    [deliveryList.fulfilled]: (state: any, { payload: { error, message } }) => {
      state.loading = false;
      state.deliveryListCount += 1;
      if (error) {
        state.error = error;
      } else {
        state.error = message;
      }
    },
    [addDelivery.fulfilled]: (state: any, { payload: { error, message } }) => {
      state.loading = false;
      state.addDeliveryCount += 1;
      if (error) {
        state.error = error;
      } else {
        state.error = message;
      }
    },
    [deleteDelivery.fulfilled]: (
      state: any,
      { payload: { error, message } }
    ) => {
      state.loading = false;
      state.deleteDeliveryCount += 1;
      if (error) {
        state.error = error;
      } else {
        state.error = message;
      }
    },
  },
});

export const { editDeliveryFunc } = manageMoreDeliverySlice.actions;
export default manageMoreDeliverySlice.reducer;

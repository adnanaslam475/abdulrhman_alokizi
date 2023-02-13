import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { fetch2, fetch3 } from "../../Apis/commonApis";

const initialState = {
  loading: false,
  chargesListCount: 0,
  addChargesCount: 0,
};
export let chargesFilter = {
  restaurent_id: "",
  type: "",
};
export let chargesListItems: any;
export let branchArray: any[] = [];
export let editChargesData = {
  id: "",
  name: "",
  localname: "",
  isopenvalue: "",
  type: "",
  value: "",
  applyon_ordertype: "",
  taxgroup: "",
  applyon_branches: "",
  applyon_order: "",
  applyon_ordersubtotal: "",
};

export const chargesList: any = createAsyncThunk(
  "chargesList",
  async (body) => {
    const result = await fetch2(
      `${process.env.REACT_APP_BASEURL}/charge_list_type`,
      body
    );
    chargesListItems = result.data;
    return result;
  }
);

export const addCharges: any = createAsyncThunk("addCharges", async (body) => {
  const result = await fetch2(
    `${process.env.REACT_APP_BASEURL}/charge_create_andedit`,
    body
  );
  return result;
});

const manageMoreChargesSlice: any = createSlice({
  name: "manageMoreChargesSlice",
  initialState,
  reducers: {
    editChargesFunc(state = initialState, action) {
      editChargesData.id = action.payload.id;
      editChargesData.name = action.payload.name;
      editChargesData.localname = action.payload.localname;
      editChargesData.isopenvalue = action.payload.isopenvalue;
      editChargesData.type = action.payload.type;
      editChargesData.value = action.payload.value;
      editChargesData.applyon_ordertype = action.payload.applyon_ordertype;
      editChargesData.taxgroup = action.payload.taxgroup;
      editChargesData.applyon_branches = action.payload.applyon_branches;
      editChargesData.applyon_order = action.payload.applyon_order;
      editChargesData.applyon_ordersubtotal =
        action.payload.applyon_ordersubtotal;
    },
    branchesFunc(state = initialState, action) {
      branchArray = action.payload === "all" ? [] : action.payload;
    },
  },
  extraReducers: {
    [chargesList.fulfilled]: (state: any, { payload: { error, message } }) => {
      state.loading = false;
      state.chargesListCount += 1;
      if (error) {
        state.error = error;
      } else {
        state.error = message;
      }
    },
    [addCharges.fulfilled]: (state: any, { payload: { error, message } }) => {
      state.loading = false;
      state.addChargesCount += 1;
      if (error) {
        state.error = error;
      } else {
        state.error = message;
      }
    },
  },
});

export const { editChargesFunc, branchesFunc } = manageMoreChargesSlice.actions;
export default manageMoreChargesSlice.reducer;

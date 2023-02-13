import { createSlice } from "@reduxjs/toolkit";

export const initialState = {
  count: 0,
  state: false,
  branchCount: 0,
  branchStatus: true,
  filterStatus: false,
  toastify: false,
};

export let data: any;
export let text: string;
export let type: string;
export let branchIds: string;
export let branchDate: string;
export let branchEndDate: string;
export let refnumberFilter: string = "";
export let refafterFilter: string = "";
export let newnumberFilter: string = "";
export let businessdateFilter: string = "";

const counterSlice = createSlice({
  name: "ReducerForOrder",
  initialState,
  reducers: {
    moduleModule(state = initialState, action) {
      console.clear();
      console.log("SH");
      console.log(action.payload.data);
      state.count += 1;
      state.state = true;
      data = action.payload.data;
      // text = action.payload.text;
    },
    falseState(state = initialState) {
      state.state = false;
    },
    typeFilter(state = initialState, action) {
      type = action.payload;
      state.branchCount += 1;
    },
    branchFilter(state = initialState, action) {
      state.branchStatus = false;
      state.branchCount += 1;
      branchIds = action.payload;
    },
    businessDateFilter(state = initialState, action) {
      console.log(action, "action");
      state.branchStatus = false;
      state.branchCount += 1;
      branchDate = action.payload.branchDate;
      branchEndDate = action.payload.branchEndDate;
    },
    branchHide(state = initialState) {
      state.branchStatus = true;
      state.filterStatus = false;
      branchIds = "";
      branchDate = "";
      branchEndDate = "";
    },
    removeFilter(state = initialState) {
      state.filterStatus = true;
      state.toastify = false;
    },
    filterOptions(state = initialState, action) {
      state.filterStatus = false;
      refnumberFilter = action.payload.refnumber;
      refafterFilter = action.payload.refafter;
      newnumberFilter = action.payload.newnumber;
      businessdateFilter = action.payload.businessdate;
      state.branchCount += 1;
      state.toastify = true;
    },
    resetOrders(state = initialState) {
      type = "all";
      branchIds = "";
      branchDate = "";
      branchEndDate = "";
      refnumberFilter = "";
      refafterFilter = "";
      newnumberFilter = "";
      businessdateFilter = "";
      state.branchCount += 1;
      state.branchStatus = true;
      state.filterStatus = true;
    },
  },
});

export const {
  moduleModule,
  falseState,
  typeFilter,
  branchFilter,
  businessDateFilter,
  branchHide,
  removeFilter,
  filterOptions,
  resetOrders,
} = counterSlice.actions;
export default counterSlice.reducer;

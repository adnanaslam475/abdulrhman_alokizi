import { createSlice } from "@reduxjs/toolkit";

export const initialState = {
  count: 0,
  toastify: false,
  orderToast: false,
  branchCount: 0,
  branchStatus: true,
  filterStatus: false,
  agentStatus: true,
  agentCount: 0,
};

export let data: any;
export let orderStatus: string = "";
export let branchIds: string;
export let agentIds: string;
export let refnumberFilter: string = "";
export let refafterFilter: string = "";
export let newnumberFilter: string = "";
export let businessdateFilter: string = "";

const counterSlice = createSlice({
  name: "ReducerForTodaysOrder",
  initialState,
  reducers: {
    moduleModule(state = initialState, action) {
      state.count += 1;
      data = action.payload.data;
    },
    orderDeclined(state = initialState, action) {
      state.toastify = true;
      orderStatus = action.payload;
    },
    branchFilter(state = initialState, action) {
      console.log(action, "action");
      state.branchStatus = false;
      state.branchCount += 1;
      branchIds = action.payload;
    },
    agentFilter(state = initialState, action) {
      console.log(action, "action");
      state.agentStatus = false;
      state.agentCount += 1;
      agentIds = action.payload;
    },
    branchHide(state = initialState) {
      state.branchStatus = true;
      state.agentStatus = true;
      state.filterStatus = false;
      branchIds = "";
      agentIds = "";
    },
    filterOptions(state = initialState, action) {
      state.filterStatus = false;
      refnumberFilter = action.payload.refnumber;
      refafterFilter = action.payload.refafter;
      newnumberFilter = action.payload.newnumber;
      businessdateFilter = action.payload.businessdate;
      state.branchCount += 1;
      state.agentCount += 1;
      state.toastify = true;
    },
    removeFilter(state = initialState) {
      state.filterStatus = true;
      state.orderToast = false;
      state.branchStatus = false;
      console.log(state.filterStatus,"filterstatus")
    },
    removeBranch(state = initialState){
      state.filterStatus = false;
      state.orderToast = true;
      state.branchStatus = true;
    }
  },
});

export const {
  moduleModule,
  orderDeclined,
  branchFilter,
  agentFilter,
  filterOptions,
  removeFilter,
  branchHide,
  removeBranch,
} = counterSlice.actions;
export default counterSlice.reducer;

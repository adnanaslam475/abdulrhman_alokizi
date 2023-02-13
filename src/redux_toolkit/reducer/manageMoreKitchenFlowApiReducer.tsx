import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { fetch2, fetch3 } from '../../Apis/commonApis'

const initialState = {
    loading: false,
    kitchenFlowListCount:0,
    addEditDeletekitchenFlowCount:0,
    kitchenFlowPerIdCount:0,
    addEditStationCount:0,
    deleteStationCount:0,
    activeKitchenFlowCount:0,
    branchAddDataCount:0,
    getProductApiCount:0,
    addProductKitchenFlowCount:0,
}
export let kitchenFlowFilter = {
    restaurent_id:"",
    type:"",
}
export let kitchenFlowListItems:any
export let kitchenFlowPerIdData:any
export let editStationData = {
    id:"",
    kitchenflow_id:"",
    restaurent_id:"",
    name:""
}
export let productDataListItems:any

export const kitchenFlowList: any = createAsyncThunk(
    'kitchenFlowList',
    async (body) => {
        const result = await fetch2(`${process.env.REACT_APP_BASEURL}/kitchenflow_list_filter_type_search`, body)
        kitchenFlowListItems = result.data;
        return result
    }
)

export const addEditDeletekitchenFlow: any = createAsyncThunk(
    'addEditDeletekitchenFlow',
    async (body) => {
        const result = await fetch2(`${process.env.REACT_APP_BASEURL}/kitchenflow_add_delete`, body)
        return result
    }
)

export const kitchenFlowPerId: any = createAsyncThunk(
    'kitchenFlowPerId',
    async (body) => {
        const result = await fetch2(`${process.env.REACT_APP_BASEURL}/kitchenflow_viewdetails`, body)
        kitchenFlowPerIdData = result.data
        return result
    }
)

export const addEditStation: any = createAsyncThunk(
    'addEditStation',
    async (body) => {
        const result = await fetch2(`${process.env.REACT_APP_BASEURL}/kitchenflow_station_add_edit`, body)
        kitchenFlowPerIdData = result.data
        return result
    }
)

export const deleteStation: any = createAsyncThunk(
    'deleteStation',
    async (body) => {
        const result = await fetch2(`${process.env.REACT_APP_BASEURL}/kitchenflow_station_delete`, body)
        return result
    }
)

export const activeKitchenFlow: any = createAsyncThunk(
    'activeKitchenFlow',
    async (body) => {
        const result = await fetch2(`${process.env.REACT_APP_BASEURL}/kitchenflow_active_inactive`, body)
        return result
    }
)

export const branchAddData: any = createAsyncThunk(
    'branchAddData',
    async (body) => {
        const result = await fetch2(`${process.env.REACT_APP_BASEURL}/kitchenflow_branchadd`, body)
        return result
    }
)

export const getProductApi: any = createAsyncThunk(
    'getProductApi',
    async (body) => {
        const result = await fetch2(`${process.env.REACT_APP_BASEURL}/get_product`, body)
        productDataListItems = result.data
        return result
    }
)

export const addProductKitchenFlow: any = createAsyncThunk(
    'addProductKitchenFlow',
    async (body) => {
        const result = await fetch2(`${process.env.REACT_APP_BASEURL}/kitchenflow_product_add`, body)
        return result
    }
)


const manageMorekitchenFlowSlice: any = createSlice({
    name: 'manageMorekitchenFlowSlice',
    initialState,
    reducers:{
        editStationFunc(state=initialState, action){
          editStationData.id=action.payload.id
          editStationData.kitchenflow_id=action.payload.kitchenflow_id
          editStationData.restaurent_id=action.payload.restaurent_id
          editStationData.name=action.payload.name
        }
     },
    extraReducers: {
        [kitchenFlowList.fulfilled]: (state: any, { payload: { error, message } }) => {
            state.loading = false
            state.kitchenFlowListCount += 1;
            if (error) {
                state.error = error
            } else {
                state.error = message
            }
        },
        [addEditDeletekitchenFlow.fulfilled]: (state: any, { payload: { error, message } }) => {
            state.loading = false
            state.addEditDeletekitchenFlowCount += 1;
            if (error) {
                state.error = error
            } else {
                state.error = message
            }
        },
        [kitchenFlowPerId.fulfilled]: (state: any, { payload: { error, message } }) => {
            state.loading = false
            state.kitchenFlowPerIdCount += 1;
            if (error) {
                state.error = error
            } else {
                state.error = message
            }
        },
        [addEditStation.fulfilled]: (state: any, { payload: { error, message } }) => {
            state.loading = false
            state.addEditStationCount += 1;
            if (error) {
                state.error = error
            } else {
                state.error = message
            }
        },
        [deleteStation.fulfilled]: (state: any, { payload: { error, message } }) => {
            state.loading = false
            state.deleteStationCount += 1;
            if (error) {
                state.error = error
            } else {
                state.error = message
            }
        },
        [activeKitchenFlow.fulfilled]: (state: any, { payload: { error, message } }) => {
            state.loading = false
            state.activeKitchenFlowCount += 1;
            if (error) {
                state.error = error
            } else {
                state.error = message
            }
        },
        [branchAddData.fulfilled]: (state: any, { payload: { error, message } }) => {
            state.loading = false
            state.branchAddDataCount += 1;
            if (error) {
                state.error = error
            } else {
                state.error = message
            }
        },
        [getProductApi.fulfilled]: (state: any, { payload: { error, message } }) => {
            state.loading = false
            state.getProductApiCount += 1;
            if (error) {
                state.error = error
            } else {
                state.error = message
            }
        },
        [addProductKitchenFlow.fulfilled]: (state: any, { payload: { error, message } }) => {
            state.loading = false
            state.addProductKitchenFlowCount += 1;
            if (error) {
                state.error = error
            } else {
                state.error = message
            }
        },
    }
})

export const { editStationFunc } = manageMorekitchenFlowSlice.actions;
export default manageMorekitchenFlowSlice.reducer
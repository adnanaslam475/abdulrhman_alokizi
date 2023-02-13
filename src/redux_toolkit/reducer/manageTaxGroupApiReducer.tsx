import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { fetch2, fetch3 } from '../../Apis/commonApis'

const initialState = {
    loading: false,
    taxListCount:0,
    addTaxesCount:0,
    editTaxesCount:0,
    deleteTaxesCount:0,
    addGroupAndTaxesCount:0,
    editGroupTaxesCount:0,
    deleteGroupAndTaxesCount:0,
    groupAndTaxListCount:0,
}

export let taxListItems:any
export let groupAndTaxListItems:any
export let editTaxItems:any = {
    name:"",
    name_localized:"",
    rate:"",
    applies_on:"",
    id:""
}
export let editGroupTaxItems:any = {
    name:"",
    group_local_name:"",
    reference:"",
    tax_id:"",
    id:""
}

export let editTax_detail:any;

export const taxList: any = createAsyncThunk(
    'taxList',
    async () => {
        const result = await fetch3(`${process.env.REACT_APP_BASEURL}/get_taxes`, "get")
        taxListItems = result.data;
        return result
    }
)

export const groupAndTaxList: any = createAsyncThunk(
    'groupAndTaxList',
    async (body) => {
        const result = await fetch2(`${process.env.REACT_APP_BASEURL}/tax_group_list`, body)
        groupAndTaxListItems = result.data;
        return result
    }
)

export const deleteTaxes: any = createAsyncThunk(
    'deleteTaxes',
    async (body) => {
        const result = await fetch3(`${process.env.REACT_APP_BASEURL}/taxes_delete?id=${body}`, "get")
        taxListItems = result.data;
        return result
    }
)

export const deleteGroupAndTaxes: any = createAsyncThunk(
    'deleteGroupAndTaxes',
    async (body) => {
        const result = await fetch3(`${process.env.REACT_APP_BASEURL}/taxes_and_taxes_delete?id=${body}`, "get")
        taxListItems = result.data;
        return result
    }
)

export const addTaxes: any = createAsyncThunk(
    'addTaxes',
    async (body) => {
        const result = await fetch2(`${process.env.REACT_APP_BASEURL}/add_taxes`, body)
        return result
    }
)

export const addGroupAndTaxes: any = createAsyncThunk(
    'addGroupAndTaxes',
    async (body) => {
        const result = await fetch2(`${process.env.REACT_APP_BASEURL}/group_and_taxes`, body)
        return result
    }
)

const manageTaxGroup: any = createSlice({
    name: 'manageTaxGroup',
    initialState,
    reducers: {
        editTaxFunc(state=initialState, action){
            state.editTaxesCount += 1
            editTaxItems.name = action.payload.name;
            editTaxItems.name_localized = action.payload.name_localized;
            editTaxItems.id = action.payload.id;
            editTaxItems.rate = action.payload.rate;
            editTaxItems.applies_on = action.payload.applies_on;
        },
        editGroupTaxFunc(state=initialState, action){
            state.editGroupTaxesCount += 1
            editGroupTaxItems.name = action.payload.name;
            editGroupTaxItems.group_local_name = action.payload.group_local_name;
            editGroupTaxItems.id = action.payload.id;
            editGroupTaxItems.reference = action.payload.reference;
            editGroupTaxItems.tax_id = action.payload.tax_id;
        },
        taxDetails(state=initialState, action){
            editTax_detail = action.payload
        }
    },
    extraReducers: {
        [taxList.fulfilled]: (state: any, { payload: { error, message } }) => {
            state.loading = false
            state.taxListCount += 1;
            if (error) {
                state.error = error
            } else {
                state.error = message
            }
        },
        [groupAndTaxList.fulfilled]: (state: any, { payload: { error, message } }) => {
            state.loading = false
            state.groupAndTaxListCount += 1;
            if (error) {
                state.error = error
            } else {
                state.error = message
            }
        },
        [addTaxes.fulfilled]: (state: any, { payload: { error, message } }) => {
            state.loading = false
            state.addTaxesCount += 1;
            if (error) {
                state.error = error
            } else {
                state.error = message
            }
        },
        [addGroupAndTaxes.fulfilled]: (state: any, { payload: { error, message } }) => {
            state.loading = false
            state.addGroupAndTaxesCount += 1;
            if (error) {
                state.error = error
            } else {
                state.error = message
            }
        },
        [deleteTaxes.fulfilled]: (state: any, { payload: { error, message } }) => {
            state.loading = false
            state.deleteTaxesCount += 1;
            if (error) {
                state.error = error
            } else {
                state.error = message
            }
        },
        [deleteGroupAndTaxes.fulfilled]: (state: any, { payload: { error, message } }) => {
            state.loading = false
            state.deleteGroupAndTaxesCount += 1;
            if (error) {
                state.error = error
            } else {
                state.error = message
            }
        },
    }
})

export const {editTaxFunc, editGroupTaxFunc, taxDetails} = manageTaxGroup.actions;
export default manageTaxGroup.reducer
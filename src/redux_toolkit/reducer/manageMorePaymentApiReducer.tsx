import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { fetch2, fetch3 } from '../../Apis/commonApis'

const initialState = {
    loading: false,
    paymentListCount:0,
    addPaymentCount:0,
    deletePaymentCount:0,
}
export let paymentFilter = {
    type:""
}
export let paymentListItems:any

export let editPaymentData = {
    id:"",
    name:"",
    name_localized:"",
    activestatus :"",
    open_cash_drawer:"",
    code:""
}

export const paymentList: any = createAsyncThunk(
    'paymentList',
    async (body) => {
        const result = await fetch2(`${process.env.REACT_APP_BASEURL}/payment_method_list`, body)
        paymentListItems = result.data;
        return result
    }
)

export const addPayment: any = createAsyncThunk(
    'addPayment',
    async (body) => {
        const result = await fetch2(`${process.env.REACT_APP_BASEURL}/payment_method`, body)
        return result
    }
)

export const deletePayment: any = createAsyncThunk(
    'deletePayment',
    async (body) => {
        const result = await fetch3(`${process.env.REACT_APP_BASEURL}/payment_method_delete?id=${body}`, "get")
        return result
    }
)

const manageMorePaymentSlice: any = createSlice({
    name: 'manageMorePaymentSlice',
    initialState,
    reducers:{
        editPaymentFunc(state=initialState, action){
            editPaymentData.id=action.payload.id
            editPaymentData.name=action.payload.name
            editPaymentData.name_localized=action.payload.name_localized
            editPaymentData.activestatus =action.payload.activestatus 
            editPaymentData.open_cash_drawer=action.payload.open_cash_drawer
            editPaymentData.code=action.payload.code       
         }
    },
    extraReducers: {
        [paymentList.fulfilled]: (state: any, { payload: { error, message } }) => {
            state.loading = false
            state.paymentListCount += 1;
            if (error) {
                state.error = error
            } else {
                state.error = message
            }
        },
        [addPayment.fulfilled]: (state: any, { payload: { error, message } }) => {
            state.loading = false
            state.addPaymentCount += 1;
            if (error) {
                state.error = error
            } else {
                state.error = message
            }
        },
        [deletePayment.fulfilled]: (state: any, { payload: { error, message } }) => {
            state.loading = false
            state.deletePaymentCount += 1;
            if (error) {
                state.error = error
            } else {
                state.error = message
            }
        },
    }
})

export const { editPaymentFunc } = manageMorePaymentSlice.actions;
export default manageMorePaymentSlice.reducer
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { fetch2, fetch3 } from '../../Apis/commonApis'

const initialState = {
    loading: false,
   promotionsListCount : 0,
   promotionsAddCount:0,
   promotionDetailsCount:0,
   activatePromotionsCount:0,
}

export let promotionsFilterValue: any = {
    type: "",
  };

export let promotionsListItems:any
export let perIdPromotionDetail:any

export const promotionsList: any = createAsyncThunk(
    'promotionsList',
    async (body) => {
        const result = await fetch2(`${process.env.REACT_APP_BASEURL}/promotions_list_filter_search_type`, body)
        promotionsListItems = result.data;
        return result
    }
)

export const promotionsAdd: any = createAsyncThunk(
    'promotionsAdd',
    async (body) => {
        const result = await fetch2(`${process.env.REACT_APP_BASEURL}/promation_add_edit`, body)
        return result
    }
)

export const promotionDetails: any = createAsyncThunk(
    'promotionDetails',
    async (body) => {
        const result = await fetch3(`${process.env.REACT_APP_BASEURL}/promotionDetail/${body}`, "get")
        perIdPromotionDetail = result.data
        console.log(perIdPromotionDetail,"perIdPromotionDetailperIdPromotionDetail")
        return result
    }
)

export const activatePromotions: any = createAsyncThunk(
    'activatePromotions',
    async (body) => {
        const result = await fetch2(`${process.env.REACT_APP_BASEURL}/promation_active_deactive`, body)
        return result
    }
)

const managePromotionsSlice: any = createSlice({
    name: 'Product',
    initialState,
    reducers: {
        changeStateAddPromotion(state=initialState){
            state.promotionsAddCount = 0
        }
    },
    extraReducers: {
        [promotionsList.fulfilled]: (state: any, { payload: { error, message } }) => {
            state.loading = false
            state.promotionsListCount += 1;
            if (error) {
                state.error = error
            } else {
                state.error = message
            }
        },
        [promotionsAdd.fulfilled]: (state: any, { payload: { error, message } }) => {
            state.loading = false
            state.promotionsAddCount += 1;
            if (error) {
                state.error = error
            } else {
                state.error = message
            }
        },
        [promotionDetails.fulfilled]: (state: any, { payload: { error, message } }) => {
            state.loading = false
            state.promotionDetailsCount += 1;
            if (error) {
                state.error = error
            } else {
                state.error = message
            }
        },
        [activatePromotions.fulfilled]: (state: any, { payload: { error, message } }) => {
            state.loading = false
            state.activatePromotionsCount += 1;
            if (error) {
                state.error = error
            } else {
                state.error = message
            }
        },
    }
})

export const { changeStateAddPromotion } = managePromotionsSlice.actions;
export default managePromotionsSlice.reducer
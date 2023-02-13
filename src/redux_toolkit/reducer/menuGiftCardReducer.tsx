import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { fetch2, fetch3 } from '../../Apis/commonApis'

const initialState = {
    loading: false,
    giftListCount:0,
    addGiftCount:0,
    viewPerSingleCount:0,
    editGiftCount:0,
    changeGiftStatusCount:0,
    addGiftCardTagsCount:0,
    addGiftCardBranchesCount:0,
}

export let giftListItems:any
export let viewPerSingleDetails:any
export let addGiftCardType: string;
export let addGiftCardTypeName: string;
export let parameterTagAndBranch:string ;
export let giftCardId: number;

export const giftList: any = createAsyncThunk(
    'giftList ',
    async (body) => {
        const result = await fetch2(`${process.env.REACT_APP_BASEURL}/giftList`, body)
        giftListItems = result.data;
        return result
    }
)

export const saveGift: any = createAsyncThunk(
    'saveGift ',
    async (body) => {
        const result = await fetch2(`${process.env.REACT_APP_BASEURL}/saveGift`, body)
        return result
    }
)

export const editGift: any = createAsyncThunk(
    'editGift ',
    async (body) => {
        const result = await fetch2(`${process.env.REACT_APP_BASEURL}/updateGift`, body)
        return result
    }
)

export const changeGiftStatus: any = createAsyncThunk(
    'changeGiftStatus ',
    async (body) => {
        const result = await fetch2(`${process.env.REACT_APP_BASEURL}/changeGiftStatus`, body)
        return result
    }
)

export const addGiftCardTags: any = createAsyncThunk(
    'addGiftCardTags ',
    async (body) => {
        const result = await fetch2(`${process.env.REACT_APP_BASEURL}/saveGiftTags`, body)
        return result
    }
)

export const addGiftCardBranches: any = createAsyncThunk(
    'addGiftCardBranches ',
    async (body) => {
        const result = await fetch2(`${process.env.REACT_APP_BASEURL}/saveInactivebranch`, body)
        return result
    }
)

export const viwePerSingleGift: any = createAsyncThunk(
    'viwePerSingleGift ',
    async (body) => {
        const result = await fetch2(`${process.env.REACT_APP_BASEURL}/viewGift`, body)
        viewPerSingleDetails = result
        return result
    }
)

const menuGiftSlice: any = createSlice({
    name: 'menuGift',
    initialState,
    reducers: {
        tagAndBranch(state=initialState, action){
            addGiftCardType = action.payload.name
            parameterTagAndBranch = action.payload.parameter
            const breakSentence = action.payload.name.split(" ")
            addGiftCardTypeName = breakSentence[1]
            giftCardId = action.payload.id
          }
    },
    extraReducers: {
        [giftList .fulfilled]: (state: any, { payload: { error, message } }) => {
            state.loading = false
            state.giftListCount += 1;
            if (error) {
                state.error = error
            } else {
                state.error = message
            }
        },
        [saveGift .fulfilled]: (state: any, { payload: { error, message } }) => {
            state.loading = false
            state.addGiftCount += 1;
            if (error) {
                state.error = error
            } else {
                state.error = message
            }
        },
        [viwePerSingleGift .fulfilled]: (state: any, { payload: { error, message } }) => {
            state.loading = false
            state.viewPerSingleCount += 1;
            if (error) {
                state.error = error
            } else {
                state.error = message
            }
        },
        [editGift .fulfilled]: (state: any, { payload: { error, message } }) => {
            state.loading = false
            state.editGiftCount += 1;
            if (error) {
                state.error = error
            } else {
                state.error = message
            }
        },
        [changeGiftStatus .fulfilled]: (state: any, { payload: { error, message } }) => {
            state.loading = false
            state.changeGiftStatusCount += 1;
            if (error) {
                state.error = error
            } else {
                state.error = message
            }
        },
        [addGiftCardBranches .fulfilled]: (state: any, { payload: { error, message } }) => {
            state.loading = false
            state.addGiftCardBranchesCount += 1;
            if (error) {
                state.error = error
            } else {
                state.error = message
            }
        },
        [addGiftCardTags .fulfilled]: (state: any, { payload: { error, message } }) => {
            state.loading = false
            state.addGiftCardTagsCount += 1;
            if (error) {
                state.error = error
            } else {
                state.error = message
            }
        },
    }
})

export const { tagAndBranch } = menuGiftSlice.actions;
export default menuGiftSlice.reducer
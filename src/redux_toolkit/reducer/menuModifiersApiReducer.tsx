import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { fetch2, fetch3 } from '../../Apis/commonApis'

const initialState = {
    loading: false,
    modifierListCount:0,
    addModifierCount:0,
    deletModifierCount:0,
}

export let modifierFilter = {
    type:""
}
export let modifierListItems:any

export let editModifierData = {
    id:"",
    name:"",
    name_localized:"",
    reference:""
}

export const modifierList: any = createAsyncThunk(
    'modifierListCheck',
    async (body) => {
        const result = await fetch2(`${process.env.REACT_APP_BASEURL}/modifier_list`, body)
        modifierListItems = result.data;
        return result
    }
)

export const addModifier: any = createAsyncThunk(
    'addModifier',
    async (body) => {
        const result = await fetch2(`${process.env.REACT_APP_BASEURL}/modifiers`, body)
        return result
    }
)

export const deletModifier: any = createAsyncThunk(
    'deletModifier',
    async (body) => {
        const result = await fetch3(`${process.env.REACT_APP_BASEURL}/modifiers_delete?id=${body}`, "get")
        return result
    }
)

const modifierSliceMenu: any = createSlice({
    name: 'modifierSliceMenu',
    initialState,
    reducers:{
        editModifierFunc(state=initialState, action){
            editModifierData.id = action.payload.id
            editModifierData.name = action.payload.name
            editModifierData.name_localized = action.payload.name_localized
            editModifierData.reference = action.payload.reference
        }
    },
    extraReducers: {
        [modifierList.fulfilled]: (state: any, { payload: { error, message } }) => {
            state.loading = false
            state.modifierListCount += 1;
            if (error) {
                state.error = error
            } else {
                state.error = message
            }
        },
        [addModifier.fulfilled]: (state: any, { payload: { error, message } }) => {
            state.loading = false
            state.addModifierCount += 1;
            if (error) {
                state.error = error
            } else {
                state.error = message
            }
        },
        [deletModifier.fulfilled]: (state: any, { payload: { error, message } }) => {
            state.loading = false
            state.deletModifierCount += 1;
            if (error) {
                state.error = error
            } else {
                state.error = message
            }
        },
    }
})

export const { editModifierFunc } = modifierSliceMenu.actions;
export default modifierSliceMenu.reducer
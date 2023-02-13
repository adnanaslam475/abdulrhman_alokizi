import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { fetch2, fetch3 } from '../../Apis/commonApis'

const initialState = {
    loading: false,
    comboListCount : 0,
    addComboCount:0,
    comboViewCount:0,
    addSizeCount:0,
    activeComboCount:0,
    getSizeCount:0,
    addGroupCount:0,
    getGroupCount:0,
}

export let comboFilterValue: any = {
    type: "",
  };

export let comboListItems:any
export let comboViewPerId:any
export let sizeList:any
export let groupList:any

export const comboList: any = createAsyncThunk(
    'comboList',
    async (body) => {
        const result = await fetch2(`${process.env.REACT_APP_BASEURL}/combolist_filter_search`, body)
        comboListItems = result.data;
         console.log(comboListItems, "12345678")
        return result
    }
)

export const addCombo: any = createAsyncThunk(
    'addCombo',
    async (body) => {
        const result = await fetch2(`${process.env.REACT_APP_BASEURL}/addcombo`, body)
        return result
    }
)

export const comboView: any = createAsyncThunk(
    'comboView',
    async (body) => {
        const result = await fetch2(`${process.env.REACT_APP_BASEURL}/combo_view`, body)
        comboViewPerId = result
        return result
    }
)

export const activeCombo: any = createAsyncThunk(
    'activeCombo',
    async (body) => {
        const result = await fetch2(`${process.env.REACT_APP_BASEURL}/combo_activate_deactivate`, body)
        comboViewPerId = result
        return result
    }
)

export const addSize: any = createAsyncThunk(
    'addSize',
    async (body) => {
        const result = await fetch2(`${process.env.REACT_APP_BASEURL}/combo_addsize`, body)
        return result
    }
)

export const getSize: any = createAsyncThunk(
    'getSize',
    async (body) => {
        const result = await fetch2(`${process.env.REACT_APP_BASEURL}/comboget_size`, body)
        sizeList = result.data
        return result
    }
)

export const addGroup: any = createAsyncThunk(
    'addGroup',
    async (body) => {
        const result = await fetch2(`${process.env.REACT_APP_BASEURL}/comboview_addgroup`, body)
        return result
    }
)

export const getGroup: any = createAsyncThunk(
    'getGroup',
    async (body) => {
        const result = await fetch2(`${process.env.REACT_APP_BASEURL}/comboview_getgroup`, body)
        groupList = result.data
        return result
    }
)

const menuComboSlice: any = createSlice({
    name: 'menuComboSlice',
    initialState,
    reducers: {},
    extraReducers: {
        [comboList.fulfilled]: (state: any, { payload: { error, message } }) => {
            state.loading = false
            state.comboListCount += 1;
            if (error) {
                state.error = error
            } else {
                state.error = message
            }
        },
        [addCombo.fulfilled]: (state: any, { payload: { error, message } }) => {
            state.loading = false
            state.addComboCount += 1;
            if (error) {
                state.error = error
            } else {
                state.error = message
            }
        },
        [comboView.fulfilled]: (state: any, { payload: { error, message } }) => {
            state.loading = false
            state.comboViewCount += 1;
            if (error) {
                state.error = error
            } else {
                state.error = message
            }
        },
        [addSize.fulfilled]: (state: any, { payload: { error, message } }) => {
            state.loading = false
            state.addSizeCount += 1;
            if (error) {
                state.error = error
            } else {
                state.error = message
            }
        },
        [activeCombo.fulfilled]: (state: any, { payload: { error, message } }) => {
            state.loading = false
            state.activeComboCount += 1;
            if (error) {
                state.error = error
            } else {
                state.error = message
            }
        },
        [getSize.fulfilled]: (state: any, { payload: { error, message } }) => {
            state.loading = false
            state.getSizeCount += 1;
            if (error) {
                state.error = error
            } else {
                state.error = message
            }
        },
        [addGroup.fulfilled]: (state: any, { payload: { error, message } }) => {
            state.loading = false
            state.addGroupCount += 1;
            if (error) {
                state.error = error
            } else {
                state.error = message
            }
        },
        [getGroup.fulfilled]: (state: any, { payload: { error, message } }) => {
            state.loading = false
            state.getGroupCount += 1;
            if (error) {
                state.error = error
            } else {
                state.error = message
            }
        },
    }
})

export const { } = menuComboSlice.actions;
export default menuComboSlice.reducer
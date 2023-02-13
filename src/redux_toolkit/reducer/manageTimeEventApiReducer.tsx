import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { fetch2 } from '../../Apis/commonApis'

const initialState = {
    loading: false,
   timeEventListCount : 0,
   addTimeEventListCount:0,
   timeEventPerIdCount:0,
   editTimeEventCount:0,
   ActiveDeactiveEventCount:0,
   deleteTimeEventCount:0,
   applyOnBranchEventCount:0,
   applyCategoryDataCount:0,
   applyOnProductDataCount:0,
   applyOnProductTagsDataCount:0,
}

export let timeEventFilterValue: any = {
    restaurant_id: "",
  };

export let timeEventListItems:any
export let timeEventPerIdData:any

export const timeEventList: any = createAsyncThunk(
    'timeEventList',
    async (body) => {
        const result = await fetch2(`${process.env.REACT_APP_BASEURL}/eventListData`, body)
        timeEventListItems = result.eventList;
        return result
    }
)

export const addTimeEvent: any = createAsyncThunk(
    'addTimeEvent',
    async (body) => {
        const result = await fetch2(`${process.env.REACT_APP_BASEURL}/addEvent`, body)
        return result
    }
)

export const timeEventPerId: any = createAsyncThunk(
    'timeEventPerId',
    async (body) => {
        const result = await fetch2(`${process.env.REACT_APP_BASEURL}/eventDetail`, body)
        timeEventPerIdData = result.event
        return result
    }
)

export const editTimeEvent: any = createAsyncThunk(
    'editTimeEvent',
    async (body) => {
        const result = await fetch2(`${process.env.REACT_APP_BASEURL}/editEvent`, body)
        return result
    }
)

export const ActiveDeactiveEvent: any = createAsyncThunk(
    'ActiveDeactiveEvent',
    async (body) => {
        const result = await fetch2(`${process.env.REACT_APP_BASEURL}/event_active_deactive`, body)
        return result
    }
)

export const deleteTimeEvent: any = createAsyncThunk(
    'deleteTimeEvent',
    async (body) => {
        const result = await fetch2(`${process.env.REACT_APP_BASEURL}/eventdelete`, body)
        return result
    }
)

export const applyOnBranchEvent: any = createAsyncThunk(
    'applyOnBranchEvent',
    async (body) => {
        const result = await fetch2(`${process.env.REACT_APP_BASEURL}/event_apply_branch`, body)
        return result
    }
)

export const applyOnCategoryData: any = createAsyncThunk(
    'applyCategoryData',
    async (body) => {
        const result = await fetch2(`${process.env.REACT_APP_BASEURL}/event_apply_category`, body)
        return result
    }
)

export const applyOnProductData: any = createAsyncThunk(
    'applyOnProductData',
    async (body) => {
        const result = await fetch2(`${process.env.REACT_APP_BASEURL}/event_apply_Products`, body)
        return result
    }
)

export const applyOnProductTagsData: any = createAsyncThunk(
    'applyOnProductTagsData',
    async (body) => {
        const result = await fetch2(`${process.env.REACT_APP_BASEURL}/event_apply_tag`, body)
        return result
    }
)


const manageTimeEventSlice: any = createSlice({
    name: 'manageEvent',
    initialState,
    reducers: {},
    extraReducers: {
        [timeEventList.fulfilled]: (state: any, { payload: { error, message } }) => {
            state.loading = false
            state.timeEventListCount += 1;
            if (error) {
                state.error = error
            } else {
                state.error = message
            }
        },
        [addTimeEvent.fulfilled]: (state: any, { payload: { error, message } }) => {
            state.loading = false
            state.addTimeEventListCount += 1;
            if (error) {
                state.error = error
            } else {
                state.error = message
            }
        },
        [timeEventPerId.fulfilled]: (state: any, { payload: { error, message } }) => {
            state.loading = false
            state.timeEventPerIdCount += 1;
            if (error) {
                state.error = error
            } else {
                state.error = message
            }
        },
        [editTimeEvent.fulfilled]: (state: any, { payload: { error, message } }) => {
            state.loading = false
            state.editTimeEventCount += 1;
            if (error) {
                state.error = error
            } else {
                state.error = message
            }
        },
        [ActiveDeactiveEvent.fulfilled]: (state: any, { payload: { error, message } }) => {
            state.loading = false
            state.ActiveDeactiveEventCount += 1;
            if (error) {
                state.error = error
            } else {
                state.error = message
            }
        },
        [deleteTimeEvent.fulfilled]: (state: any, { payload: { error, message } }) => {
            state.loading = false
            state.deleteTimeEventCount += 1;
            if (error) {
                state.error = error
            } else {
                state.error = message
            }
        },
        [applyOnBranchEvent.fulfilled]: (state: any, { payload: { error, message } }) => {
            state.loading = false
            state.applyOnBranchEventCount += 1;
            if (error) {
                state.error = error
            } else {
                state.error = message
            }
        },
        [applyOnCategoryData.fulfilled]: (state: any, { payload: { error, message } }) => {
            state.loading = false
            state.applyCategoryDataCount += 1;
            if (error) {
                state.error = error
            } else {
                state.error = message
            }
        },
        [applyOnProductData.fulfilled]: (state: any, { payload: { error, message } }) => {
            state.loading = false
            state.applyOnProductDataCount += 1;
            if (error) {
                state.error = error
            } else {
                state.error = message
            }
        },
        [applyOnProductTagsData.fulfilled]: (state: any, { payload: { error, message } }) => {
            state.loading = false
            state.applyOnProductTagsDataCount += 1;
            if (error) {
                state.error = error
            } else {
                state.error = message
            }
        },
    }
})

export const { } = manageTimeEventSlice.actions;
export default manageTimeEventSlice.reducer
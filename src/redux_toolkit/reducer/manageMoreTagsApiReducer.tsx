import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { fetch2, fetch3 } from '../../Apis/commonApis'

const initialState = {
    loading: false,
    tagsListCount:0,
    addTagsCount:0,
    modalCount:0,
    editTagsCount:0,
    deleteTagsCount:0,
}
export let tagsFilter = {
    restaurent_id:"",
    type:""
}
export let tagsListItems:any

export let editTagsData = {
    restaurent_id:"",
    tagtype:"",
    name:"",
    namelocalize:"",
    tagid:""
}

export let modal = {
    name:"",
    number:""
}
export const tagsList: any = createAsyncThunk(
    'tagsList',
    async (body) => {
        const result = await fetch2(`${process.env.REACT_APP_BASEURL}/tag_lists`, body)
        tagsListItems = result;
        return result
    }
)

export const addTags: any = createAsyncThunk(
    'addTags',
    async (body) => {
        const result = await fetch2(`${process.env.REACT_APP_BASEURL}/tag_add`, body)
        return result
    }
)
export const editTags: any = createAsyncThunk(
    'editTags',
    async (body) => {
        const result = await fetch2(`${process.env.REACT_APP_BASEURL}/tag_edit`, body)
        return result
    }
)

export const deleteTags: any = createAsyncThunk(
    'deleteTags',
    async (body) => {
        const result = await fetch2(`${process.env.REACT_APP_BASEURL}/tag_delete`, body)
        return result
    }
)

const manageMoretagsSlice: any = createSlice({
    name: 'manageMoretagsSlice',
    initialState,
    reducers:{
        openModal(state=initialState,action){
            state.modalCount += 1
            modal.name = action.payload.name
            modal.number = action.payload.number
        },
        editTagsFunc(state=initialState, action){
            editTagsData.tagid= action.payload.id
            editTagsData.name= action.payload.name
            editTagsData.namelocalize= action.payload.namelocalize
            editTagsData.restaurent_id= action.payload.restaurent_id
            editTagsData.tagtype= action.payload.tagtype
        }
    },
    extraReducers: {
        [tagsList.fulfilled]: (state: any, { payload: { error, message } }) => {
            state.loading = false
            state.tagsListCount += 1;
            if (error) {
                state.error = error
            } else {
                state.error = message
            }
        },
        [addTags.fulfilled]: (state: any, { payload: { error, message } }) => {
            state.loading = false
            state.addTagsCount += 1;
            if (error) {
                state.error = error
            } else {
                state.error = message
            }
        },
        [editTags.fulfilled]: (state: any, { payload: { error, message } }) => {
            state.loading = false
            state.editTagsCount += 1;
            if (error) {
                state.error = error
            } else {
                state.error = message
            }
        },
        [deleteTags.fulfilled]: (state: any, { payload: { error, message } }) => {
            state.loading = false
            state.deleteTagsCount += 1;
            if (error) {
                state.error = error
            } else {
                state.error = message
            }
        },
    }
})

export const { openModal, editTagsFunc } = manageMoretagsSlice.actions;
export default manageMoretagsSlice.reducer
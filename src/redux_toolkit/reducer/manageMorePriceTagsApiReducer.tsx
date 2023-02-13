import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { fetch2, fetch3 } from '../../Apis/commonApis'

const initialState = {
    loading: false,
    priceTagsListCount:0,
    addPriceTagsCount:0,
    priceTagPerIdCount:0,
    deletePriceTagCount:0,
    addProductsInPriceTagCount:0,
    editProductPriceCount:0,
    priceTagComboDeleteCount:0,
    priceTagComboEditCount:0,
    comboSizeCount:0,
    comboGroupListCount:0,
    comboGroupOptionListCount:0,
    priceTagComboAddCount:0,
    priceTagModifierListCount:0,
    priceTagModifierAddDeleteCount:0,
    editModifierPricesCount:0,
}
export let priceTagsFilter = {
    restaurent_id:"",
}
export let priceTagsListItems:any
export let priceTagViewDetails:any
export let comboSizeList:any
export let comboGroupListData:any
export let comboGroupOptionListData:any
export let priceTagModifierListData:any
export let editSingleProductPrice = {
    pricetag_id: 0, 
    product_id:  0,
    price: 0,
    name:""
}

export let editSingleCombo = {
    name: "",
    price: 0,
    combo_id: 0,
    pricetag_id:0
}

export let editSingleModifierOption = {
    name: "",
    price: 0,
    modifier_id: 0,
    pricetag_id:0,
    type:"edit"
}


export const priceTagsList: any = createAsyncThunk(
    'priceTagsList',
    async (body) => {
        const result = await fetch2(`${process.env.REACT_APP_BASEURL}/pricetag_list`, body)
        priceTagsListItems = result.data;
        return result
    }
)

export const addPriceTags: any = createAsyncThunk(
    'addPriceTags',
    async (body) => {
        const result = await fetch2(`${process.env.REACT_APP_BASEURL}/pricetag_add_edit`, body)
        return result
    }
)

export const priceTagPerId: any = createAsyncThunk(
    'priceTagPerId',
    async (body) => {
        const result = await fetch2(`${process.env.REACT_APP_BASEURL}/pricetag_viewdetail_product_combo_modifer`, body)
        priceTagViewDetails = result
        return result
    }
)

export const deletePriceTag: any = createAsyncThunk(
    'deletePriceTag',
    async (body) => {
        const result = await fetch2(`${process.env.REACT_APP_BASEURL}/pricetag_delete`, body)
        return result
    }
)

export const addProductsInPriceTag: any = createAsyncThunk(
    'addProductsInPriceTag',
    async (body) => {
        const result = await fetch2(`${process.env.REACT_APP_BASEURL}/pricetag_product_add_delete`, body)
        return result
    }
)

export const editProductPrices: any = createAsyncThunk(
    'editProductPrices',
    async (body) => {
        const result = await fetch2(`${process.env.REACT_APP_BASEURL}/pricetag_product_editprice`, body)
        return result
    }
)

export const priceTagComboDelete: any = createAsyncThunk(
    'priceTagComboDelete',
    async (body) => {
        const result = await fetch2(`${process.env.REACT_APP_BASEURL}/pricetag_combo_delete`, body)
        return result
    }
)

export const priceTagComboEdit: any = createAsyncThunk(
    'priceTagComboEdit',
    async (body) => {
        const result = await fetch2(`${process.env.REACT_APP_BASEURL}/pricetag_combo_edit`, body)
        return result
    }
)

export const comboSize: any = createAsyncThunk(
    'comboSize',
    async (body) => {
        const result = await fetch2(`${process.env.REACT_APP_BASEURL}/combo_size`, body)
        comboSizeList = result.data
        return result
    }
)

export const comboGroupList: any = createAsyncThunk(
    'comboGroupList',
    async (body) => {
        const result = await fetch2(`${process.env.REACT_APP_BASEURL}/combo_sizegrouplist`, body)
        comboGroupListData = result.data
        return result
    }
)

export const comboGroupOptionList: any = createAsyncThunk(
    'comboGroupOptionList',
    async (body) => {
        const result = await fetch2(`${process.env.REACT_APP_BASEURL}/combo_options`, body)
        comboGroupOptionListData = result.data
        return result
    }
)

export const priceTagComboAdd: any = createAsyncThunk(
    'priceTagComboAdd',
    async (body) => {
        const result = await fetch2(`${process.env.REACT_APP_BASEURL}/pricetag_combo_add`, body)
        return result
    }
)

export const priceTagModifierList: any = createAsyncThunk(
    'priceTagModifierList',
    async (body) => {
        const result = await fetch2(`${process.env.REACT_APP_BASEURL}/modifier_options`, body)
        priceTagModifierListData = result.data
        return result
    }
)

export const priceTagModifierAddDelete: any = createAsyncThunk(
    'priceTagModifierAddDelete',
    async (body) => {
        const result = await fetch2(`${process.env.REACT_APP_BASEURL}/pricetag_modifier_add_delete`, body)
        priceTagModifierListData = result.data
        return result
    }
)

export const editModifierPrices: any = createAsyncThunk(
    'editModifierPrices',
    async (body) => {
        const result = await fetch2(`${process.env.REACT_APP_BASEURL}/pricetag_modifier_edit`, body)
        return result
    }
)


const manageMorePriceTagsSlice: any = createSlice({
    name: 'manageMorePriceTagsSlice',
    initialState,
    reducers:{ 
        singleProductPriceFunc(state=initialState, action){
            editSingleProductPrice.price = action.payload.price
            editSingleProductPrice.name = action.payload.name
            editSingleProductPrice.pricetag_id = action.payload.pricetag_id
            editSingleProductPrice.product_id = action.payload.product_id
        },
        singleComboPriceFunc(state=initialState, action){
            editSingleCombo.name = action.payload.name
            editSingleCombo.pricetag_id = action.payload.pricetag_id
            editSingleCombo.price = action.payload.price
            editSingleCombo.combo_id = action.payload.combo_id
        },
        singleModifierOptionPriceFunc(state=initialState, action){
            console.log(action,"action")
            editSingleModifierOption.name = action.payload.name
            editSingleModifierOption.pricetag_id = action.payload.pricetag_id
            editSingleModifierOption.price = action.payload.price
            editSingleModifierOption.modifier_id = action.payload.modifier_id
        }
    },
    extraReducers: {
        [priceTagsList.fulfilled]: (state: any, { payload: { error, message } }) => {
            state.loading = false
            state.priceTagsListCount += 1;
            if (error) {
                state.error = error
            } else {
                state.error = message
            }
        },
        [addPriceTags.fulfilled]: (state: any, { payload: { error, message } }) => {
            state.loading = false
            state.addPriceTagsCount += 1;
            if (error) {
                state.error = error
            } else {
                state.error = message
            }
        },
        [priceTagPerId.fulfilled]: (state: any, { payload: { error, message } }) => {
            state.loading = false
            state.priceTagPerIdCount += 1;
            if (error) {
                state.error = error
            } else {
                state.error = message
            }
        },
        [deletePriceTag.fulfilled]: (state: any, { payload: { error, message } }) => {
            state.loading = false
            state.deletePriceTagCount += 1;
            if (error) {
                state.error = error
            } else {
                state.error = message
            }
        },
        [addProductsInPriceTag.fulfilled]: (state: any, { payload: { error, message } }) => {
            state.loading = false
            state.addProductsInPriceTagCount += 1;
            if (error) {
                state.error = error
            } else {
                state.error = message
            }
        },
        [editProductPrices.fulfilled]: (state: any, { payload: { error, message } }) => {
            state.loading = false
            state.editProductPriceCount += 1;
            if (error) {
                state.error = error
            } else {
                state.error = message
            }
        },
        [priceTagComboDelete.fulfilled]: (state: any, { payload: { error, message } }) => {
            state.loading = false
            state.priceTagComboDeleteCount += 1;
            if (error) {
                state.error = error
            } else {
                state.error = message
            }
        },
        [priceTagComboEdit.fulfilled]: (state: any, { payload: { error, message } }) => {
            state.loading = false
            state.priceTagComboEditCount += 1;
            if (error) {
                state.error = error
            } else {
                state.error = message
            }
        },
        [comboSize.fulfilled]: (state: any, { payload: { error, message } }) => {
            state.loading = false
            state.comboSizeCount += 1;
            if (error) {
                state.error = error
            } else {
                state.error = message
            }
        },
        [comboGroupList.fulfilled]: (state: any, { payload: { error, message } }) => {
            state.loading = false
            state.comboGroupListCount += 1;
            if (error) {
                state.error = error
            } else {
                state.error = message
            }
        },
        [comboGroupOptionList.fulfilled]: (state: any, { payload: { error, message } }) => {
            state.loading = false
            state.comboGroupOptionListCount += 1;
            if (error) {
                state.error = error
            } else {
                state.error = message
            }
        },
        [priceTagComboAdd.fulfilled]: (state: any, { payload: { error, message } }) => {
            state.loading = false
            state.priceTagComboAddCount += 1;
            if (error) {
                state.error = error
            } else {
                state.error = message
            }
        },
        [priceTagModifierList.fulfilled]: (state: any, { payload: { error, message } }) => {
            state.loading = false
            state.priceTagModifierListCount += 1;
            if (error) {
                state.error = error
            } else {
                state.error = message
            }
        },
        [priceTagModifierAddDelete.fulfilled]: (state: any, { payload: { error, message } }) => {
            state.loading = false
            state.priceTagModifierAddDeleteCount += 1;
            if (error) {
                state.error = error
            } else {
                state.error = message
            }
        },
        [editModifierPrices.fulfilled]: (state: any, { payload: { error, message } }) => {
            state.loading = false
            state.editModifierPricesCount += 1;
            if (error) {
                state.error = error
            } else {
                state.error = message
            }
        },
    }
})

export const { singleProductPriceFunc, singleComboPriceFunc, singleModifierOptionPriceFunc } = manageMorePriceTagsSlice.actions;
export default manageMorePriceTagsSlice.reducer
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { fetch2, fetch3, getFetch } from "../../Apis/commonApis";

const initialState = {
  token: "",
  modifierState: 0,
  loading: false,
  error: "",
  showProductList: 0,
  productFilter: 0,
  createProduct: 0,
  singleProductCount: 0,
  getTaxGroupStatus: 0,
  productTagModifierState: 0,
  addTagModifierBranchIngredientCount: 0,
};

export let productFilterValue: any = {
  type: "",
  name: "",
  sku: "",
  barcode: "",
  category_id: "",
  group: "",
  modifiers: "",
  tag: "",
  texgroup: "",
  costingmethod: "",
  active: "",
  stockproduct: "",
  deleted: "",
  updateafter: "",
};

export let filterArray: any = {
  categories: [],
  group: [],
  modifiers: [],
  texgroup: [],
  tag: [],
};
export let productListItems: any;
export let modifierListItems: any;
export let singleProductDetails: any;
export let addTagDetails: any;
export let taxGroupData: any;
export let tagIngeModifier: any;
export let addProductType: string;
export let addProductTypeName: string;
export let parameter: string;
export let productId: number;
export let getAllTagIngridentModifier: any;
export let tagData: any;
export let ProductViewPerId: any;

export const productList: any = createAsyncThunk(
  "productList",
  async (body) => {
    const result = await getFetch(
      `${process.env.REACT_APP_BASEURL}/product_list_ordelete`,
      body
    );

    productListItems = result.data;
    return result;
  }
);

export const modifierList: any = createAsyncThunk(
  "modifierList",
  async (body) => {
    const result = await fetch2(
      `${process.env.REACT_APP_BASEURL}/modifierlist_delete`,
      body
    );
    modifierListItems = result.data;
    console.log(modifierListItems, "modifier");
    return result;
  }
);

export const productFilter: any = createAsyncThunk(
  "productFilter",
  async (body) => {
    const result = await fetch2(
      `${process.env.REACT_APP_BASEURL}/product_filter`,
      body
    );
    productListItems = result.data;
    console.log(productListItems, "productItem");
    return result;
  }
);

export const createProduct: any = createAsyncThunk(
  "createProduct",
  async (body) => {
    const result = await fetch2(
      `${process.env.REACT_APP_BASEURL}/addproduct`,
      body
    );
    return result;
  }
);

export const getTaxGroup: any = createAsyncThunk(
  "getTaxGroup",
  async (body: any) => {
    const result = await fetch2(
      `${process.env.REACT_APP_BASEURL}/get_producttag_taxgroup`,
      body
    );
    console.log(body, "body");
    if (body?.type === "taxgroup") {
      taxGroupData = result.data;
    } else {
      tagData = result.data;
      console.log(tagData, "tagDatatata");
    }
    console.log(taxGroupData, "taxGroupData");
    return result;
  }
);
export const activeProduct: any = createAsyncThunk(
  "activeProduct",
  async (body) => {
    const result = await fetch2(
      `${process.env.REACT_APP_BASEURL}/change_product_status`,
      body
    );
    ProductViewPerId = result;
    return result;
  }
);

export const productView: any = createAsyncThunk(
  "productView",
  async (body) => {
    debugger;
    const result = await fetch3(
      `${process.env.REACT_APP_BASEURL}/product_view/${body}`,
      "get"
    );
    singleProductDetails = result.data;
    getAllTagIngridentModifier = result;
    console.log(
      singleProductDetails,
      getAllTagIngridentModifier,
      "singleProductDetails1"
    );
    return result;
  }
);

export const addTag: any = createAsyncThunk("addTag", async (body) => {
  const result = await fetch2(
    `${process.env.REACT_APP_BASEURL}/product_multiple_addtag`,
    body
  );
  addTagDetails = result.data;
  return result;
});

export const addModifier: any = createAsyncThunk(
  "addModifier",
  async (body) => {
    const result = await fetch2(
      `${process.env.REACT_APP_BASEURL}/product_modifieradd`,
      body
    );
    addTagDetails = result.data;
    // console.log(singleProductDetails, "1234567")
    return result;
  }
);

export const addIngredient: any = createAsyncThunk(
  "addIngredient",
  async (body) => {
    const result = await fetch2(
      `${process.env.REACT_APP_BASEURL}/product_ingridentadd`,
      body
    );
    addTagDetails = result.data;
    // console.log(singleProductDetails, "1234567")
    return result;
  }
);

export const addPriceTag: any = createAsyncThunk(
  "addPriceTag",
  async (body) => {
    const result = await fetch2(
      `${process.env.REACT_APP_BASEURL}/product_pricetagadd`,
      body
    );
    addTagDetails = result.data;
    // console.log(singleProductDetails, "1234567")
    return result;
  }
);

export const product_costumepriceadd: any = createAsyncThunk(
  "product_costumepriceadd",
  async (body) => {
    const result = await fetch2(
      `${process.env.REACT_APP_BASEURL}/product_costumepriceadd`,
      body
    );
    addTagDetails = result.data;
    // console.log(singleProductDetails, "1234567")
    return result;
  }
);

export const product_outofstock_brachadd: any = createAsyncThunk(
  "product_outofstock_brachadd",
  async (body) => {
    const result = await fetch2(
      `${process.env.REACT_APP_BASEURL}/product_outofstock_brachadd`,
      body
    );
    addTagDetails = result.data;
    // console.log(singleProductDetails, "1234567")
    return result;
  }
);

export const product_inactivebrachadd: any = createAsyncThunk(
  "product_inactivebrachadd",
  async (body) => {
    const result = await fetch2(
      `${process.env.REACT_APP_BASEURL}/product_inactivebrachadd`,
      body
    );
    addTagDetails = result.data;
    // console.log(singleProductDetails, "1234567")
    return result;
  }
);

export const productTagModifier: any = createAsyncThunk(
  "productTagModifier",
  async (body) => {
    tagIngeModifier = [];
    console.log("check");
    const result = await fetch2(
      `${process.env.REACT_APP_BASEURL}/productget_tag_modifer_ingrident_pricetag`,
      body
    );
    result.data.map((e: any) => {
      tagIngeModifier.push({
        label: e.name
          ? e.name
          : e.ingredient_name
          ? e.ingredient_name
          : e.english_name,
        value: e.id,
      });
    });
    console.log(tagIngeModifier, "1234567");
    return result;
  }
);

const productSlice: any = createSlice({
  name: "Product",
  initialState,
  reducers: {
    productFilterData(state = initialState, action) {
      debugger;
      console.log(action, "action");
      productFilterValue.type = productFilterValue.type;
      productFilterValue.name = action.payload.name;
      productFilterValue.sku = action.payload.sku;
      productFilterValue.barcode = action.payload.barcode;
      productFilterValue.category_id = action.payload.category_id;
      productFilterValue.group = action.payload.group;
      productFilterValue.modifiers = action.payload.modifiers;
      productFilterValue.texgroup = action.payload.texgroup;
      productFilterValue.tag = action.payload.tag;
      productFilterValue.deleted = action.payload.deleted;
      productFilterValue.costingmethod = action.payload.costingmethod;
      productFilterValue.active = action.payload.active;
      productFilterValue.stockproduct = action.payload.stockproduct;
      productFilterValue.updateafter = action.payload.updateafter;
      state.showProductList += 1;
    },
    addType(state = initialState, action) {
      addProductType = action.payload.name;
      parameter = action.payload.parameter;
      const breakSentence = action.payload.name.split(" ");
      if (breakSentence[0] === "pricetag") {
        addProductTypeName = "pricetag";
      } else {
        addProductTypeName = breakSentence[1];
      }
      productId = action.payload.id;
    },
    resetOrders(state = initialState) {
      productFilterValue.type = "all";
      productFilterValue.name = "";
      productFilterValue.sku = "";
      productFilterValue.barcode = "";
      productFilterValue.category_id = "";
      productFilterValue.group = "";
      productFilterValue.modifiers = "";
      productFilterValue.texgroup = "";
      productFilterValue.tag = "";
      productFilterValue.deleted = "";
      productFilterValue.costingmethod = "";
      productFilterValue.active = "";
      productFilterValue.stockproduct = "";
      productFilterValue.updateafter = "";
      state.showProductList += 1;
    },
  },
  extraReducers: {
    [productList.fulfilled]: (state: any, { payload: { error, message } }) => {
      state.loading = false;
      state.showProductList += 1;
      if (error) {
        state.error = error;
      } else {
        state.error = message;
      }
    },
    [productList.pending]: (state, action) => {
      state.loading = true;
    },
    [productFilter.fulfilled]: (
      state: any,
      { payload: { error, message } }
    ) => {
      state.loading = false;
      state.showProductList += 1;
      if (error) {
        state.error = error;
      } else {
        state.error = message;
      }
    },
    [productView.fulfilled]: (state: any, { payload: { error, message } }) => {
      state.loading = false;
      state.singleProductCount += 1;
      if (error) {
        state.error = error;
      } else {
        state.error = message;
      }
    },

    [createProduct.fulfilled]: (
      state: any,
      { payload: { error, message } }
    ) => {
      state.loading = false;
      state.createProduct += 1;
      if (error) {
        state.error = error;
      } else {
        state.error = message;
      }
    },
    [modifierList.fulfilled]: (state: any, { payload: { error, message } }) => {
      state.loading = false;
      state.modifierState += 1;
      if (error) {
        state.error = error;
      } else {
        state.error = message;
      }
    },
    [getTaxGroup.fulfilled]: (state: any, { payload: { error, message } }) => {
      state.loading = false;
      state.getTaxGroupStatus += 1;
      if (error) {
        state.error = error;
      } else {
        state.error = message;
      }
    },
    [productTagModifier.fulfilled]: (
      state: any,
      { payload: { error, message } }
    ) => {
      state.loading = false;
      state.productTagModifierState += 1;
      if (error) {
        state.error = error;
      } else {
        state.error = message;
      }
    },
    [addTag.fulfilled]: (state: any, { payload: { error, message } }) => {
      state.loading = false;
      state.addTagModifierBranchIngredientCount += 1;
      if (error) {
        state.error = error;
      } else {
        state.error = message;
      }
    },
    [addModifier.fulfilled]: (state: any, { payload: { error, message } }) => {
      state.loading = false;
      state.addTagModifierBranchIngredientCount += 1;
      if (error) {
        state.error = error;
      } else {
        state.error = message;
      }
    },
    [addIngredient.fulfilled]: (
      state: any,
      { payload: { error, message } }
    ) => {
      state.loading = false;
      state.addTagModifierBranchIngredientCount += 1;
      if (error) {
        state.error = error;
      } else {
        state.error = message;
      }
    },
    [addPriceTag.fulfilled]: (state: any, { payload: { error, message } }) => {
      state.loading = false;
      state.addTagModifierBranchIngredientCount += 1;
      if (error) {
        state.error = error;
      } else {
        state.error = message;
      }
    },
    [product_costumepriceadd.fulfilled]: (
      state: any,
      { payload: { error, message } }
    ) => {
      state.loading = false;
      state.addTagModifierBranchIngredientCount += 1;
      if (error) {
        state.error = error;
      } else {
        state.error = message;
      }
    },
    [product_outofstock_brachadd.fulfilled]: (
      state: any,
      { payload: { error, message } }
    ) => {
      state.loading = false;
      state.addTagModifierBranchIngredientCount += 1;
      if (error) {
        state.error = error;
      } else {
        state.error = message;
      }
    },
    [product_inactivebrachadd.fulfilled]: (
      state: any,
      { payload: { error, message } }
    ) => {
      state.loading = false;
      state.addTagModifierBranchIngredientCount += 1;
      if (error) {
        state.error = error;
      } else {
        state.error = message;
      }
    },
  },
});

export const { productFilterData, addType, resetOrders } = productSlice.actions;
export default productSlice.reducer;

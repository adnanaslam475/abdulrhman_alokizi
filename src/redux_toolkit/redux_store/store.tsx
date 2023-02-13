import { configureStore } from "@reduxjs/toolkit";
import orderModalsReducer from "../reducer/orderModalsReducer";
import todaysOrderModalsReducer from "../reducer/todaysOrderModalsReducer";
import menuCategoriesApiReducer from "../reducer/menuCategoriesApiReducer";
import menuProductsApiReducer from "../reducer/menuProductsApiReducer";
import manageUserApiReducer from "../reducer/manageUserApiReducer";
import manageBranchApiReducer from "../reducer/manageBranchApiReducer";
import manageDeviceApiReducer from "../reducer/manageDeviceApiReducer";
import manageDiscountApiReducer from "../reducer/manageDiscountApiReducer";
import menuModifiersApiReducer from "../reducer/menuModifiersApiReducer";
import manageCouponApiReducer from "../reducer/manageCouponApiReducer";
import managePromotionsApiReducer from "../reducer/managePromotionsApiReducer";
import manageTimeEventApiReducer from "../reducer/manageTimeEventApiReducer";
import menuGiftCardReducer from "../reducer/menuGiftCardReducer";
import menuComboApiReducer from "../reducer/menuComboApiReducer";
import manageTaxGroupApiReducer from "../reducer/manageTaxGroupApiReducer";
import manageMorePaymentApiReducer from "../reducer/manageMorePaymentApiReducer";
import manageMoreDeliveryApiReducer from "../reducer/manageMoreDeliveryApiReducer";
import manageMoreTagsApiReducer from "../reducer/manageMoreTagsApiReducer";
import manageMoreChargesApiReducer from "../reducer/manageMoreChargesApiReducer";
import manageMorePriceTagsApiReducer from "../reducer/manageMorePriceTagsApiReducer";
import manageMoreKitchenFlowApiReducer from "../reducer/manageMoreKitchenFlowApiReducer";
import commonApiReducer from "../reducer/commonApiReducer";
import inventoryItemsApiReducer from "../reducer/inventoryItemsApiReducer";
import inventoryPurchaseOrderApiReducer from "../reducer/inventoryPurchaseOrderApiReducer";
import inventoryTransferOrderApiReducer from "../reducer/inventoryTransferOrderApiReducer";
import inventoryTransferApiReducer from "../reducer/inventoryTransferApiReducer";
import inventorySupplierApiReducer from "../reducer/inventorySupplierApiReducer";
import inventoryProductionApiReducer from "../reducer/inventoryProductionApiReducer";
import modifierOptionApiReducer from "../reducer/modifierOptionApiReducer";
import menuCustomerApiReducer from "../reducer/menuCustomerApiReducer";

export const store = configureStore({
  reducer: {
    commonApiReducer: commonApiReducer,
    menuModifiersApiReducer: menuModifiersApiReducer,
    orderModalsReducer: orderModalsReducer,
    todaysOrderModalsReducer: todaysOrderModalsReducer,
    inventoryItemsApiReducer: inventoryItemsApiReducer,
    inventoryProductionApiReducer: inventoryProductionApiReducer,
    inventorySupplierApiReducer: inventorySupplierApiReducer,
    inventoryTransferApiReducer: inventoryTransferApiReducer,
    inventoryTransferOrderApiReducer: inventoryTransferOrderApiReducer,
    inventoryPurchaseOrderApiReducer: inventoryPurchaseOrderApiReducer,
    menuCustomerApiReducer : menuCustomerApiReducer,
    menuCategoriesApiReducer: menuCategoriesApiReducer,
    menuProductsApiReducer: menuProductsApiReducer,
    manageUserApiReducer: manageUserApiReducer,
    manageBranchApiReducer: manageBranchApiReducer,
    manageDeviceApiReducer: manageDeviceApiReducer,
    manageDiscountApiReducer: manageDiscountApiReducer,
    manageCouponApiReducer: manageCouponApiReducer,
    managePromotionsApiReducer: managePromotionsApiReducer,
    manageTimeEventApiReducer: manageTimeEventApiReducer,
    menuGiftCardReducer: menuGiftCardReducer,
    menuComboApiReducer: menuComboApiReducer,
    manageTaxGroupApiReducer: manageTaxGroupApiReducer,
    manageMorePaymentApiReducer: manageMorePaymentApiReducer,
    manageMoreDeliveryApiReducer: manageMoreDeliveryApiReducer,
    manageMoreTagsApiReducer: manageMoreTagsApiReducer,
    manageMoreChargesApiReducer: manageMoreChargesApiReducer,
    manageMorePriceTagsApiReducer: manageMorePriceTagsApiReducer,
    manageMoreKitchenFlowApiReducer: manageMoreKitchenFlowApiReducer,
    modifierOptionApiReducer : modifierOptionApiReducer
  },
});

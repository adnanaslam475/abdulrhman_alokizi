import React, { Fragment, useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import Costadjustment from "./pages/Costadjustment/Costadjustment";
import Costadjustmentdetails from "./pages/Costadjustmentdetails/Costadjustmentdetails";
import Countsheet from "./pages/Countsheet/Countsheet";
import Customer from "./pages/Customer/Customer";
import Customerdetails from "./pages/Customerdetails/Customerdetails";
import Inventorycategories from "./pages/Inventorycategories/Inventorycategories";
import Inventorycount from "./pages/Inventorycount/Inventorycount";
import Inventorycountdetails from "./pages/Inventorycountdetails/Inventorycountdetails";
import Inventorymore from "./pages/Inventorymore/Inventorymore";
import Items from "./pages/Items/Items";
import Itemsdetails from "./pages/Itemsdetails/Itemsdetails";
import Login from "./pages/Login/Login";
import Menucategories from "./pages/Menucategories/Menucategories";
import Menucombos from "./pages/Menucombos/Menucombos";
import Menucombosdetails from "./pages/Menucombosdetails/Menucombosdetails";
import Menugiftcards from "./pages/Menugiftcards/Menugiftcards";
import Menugiftcardsdetails from "./pages/Menugiftcardsdetails/Menugiftcardsdetails";
import Menugroups from "./pages/Menugroups/Menugroups";
import Menugroupsdetails from "./pages/Menugroupsdetails/Menugroupsdetails";
import Menumodifieroptions from "./pages/Menumodifieroptions/Menumodifieroptions";
import Menumodifieroptionsdetails from "./pages/Menumodifieroptionsdetails/Menumodifieroptionsdetails";
import Menumodifiers from "./pages/Menumodifiers/Menumodifiers";
import Menuproducts from "./pages/Menuproducts/Menuproducts";
import Menuproductsdetails from "./pages/Menuproductsdetails/Menuproductsdetails";
import Menusortcategories from "./pages/Menusortcategories/Menusortcategories";
import Menusortgroup from "./pages/Menusortgroup/Menusortgroup";
import Menusortmodifier from "./pages/Menusortmodifiers/Menusortmodifier";
import Navigation from "./pages/Navigation/Navigation";
import Orders from "./pages/Orders/Orders";
import Ordersdetails from "./pages/Ordersdetails/Ordersdetails";
import Ordertransaction from "./pages/Ordertransaction/Ordertransaction";
import Ordertransactiondetails from "./pages/Ordertransactiondetails/Ordertransactiondetails";
import Production from "./pages/Production/Production";
import Productiondetails from "./pages/Productiondetails/Productiondetails";
import Purchaseorders from "./pages/Purchaseorders/Purchaseorders";
import Purchaseordersdetails from "./pages/Purchaseordersdetails/Purchaseordersdetails";
import Purchasing from "./pages/Purchasing/Purchasing";
import Purchasingdetails from "./pages/Purchasingdetails/Purchasingdetails";
import Quantityadjustment from "./pages/Quantityadjustment/Quantityadjustment";
import Quantityadjustmentdetails from "./pages/Quantityadjustmentdetails/Quantityadjustmentdetails";
import Reportsanalysis from "./pages/Reportsanalysis/Reportsanalysis";
import Reportsbranchestrend from "./pages/Reportsbranchestrend/Reportsbranchestrend";
import Reportscostanalysis from "./pages/Reportscostanalysis/Reportscostanalysis";
import Reportsinventorylevels from "./pages/Reportsinventorylevels/Reportsinventorylevels";
import Reportsmenuengineering from "./pages/Reportsmenuengineering/Reportsmenuengineering";
import Reportspayments from "./pages/Reportspayments/Reportspayments";
import Reportssales from "./pages/Reportssales/Reportssales";
import Reportsspeedservice from "./pages/Reportsspeedservice/Reportsspeedservice";
import Spotcheck from "./pages/Spotcheck/Spotcheck";
import Spotcheckdetails from "./pages/Spotcheckdetails/Spotcheckdetails";
import Suppliers from "./pages/Suppliers/Suppliers";
import Suppliersdetails from "./pages/Suppliersdetails/Suppliersdetails";
import Todayorders from "./pages/Todayorders/Todayorders";
import Transferorders from "./pages/Transferorders/Transferorders";
import Transferordersdetails from "./pages/Transferordersdetails/Transferordersdetails";
import Transfers from "./pages/Transfers/Transfers";
import Transfersdetails from "./pages/Transfersdetails/Transfersdetails";
import Warehouses from "./pages/Warehouses/Warehouses";
import Warehousesdetails from "./pages/Warehousesdetails/Warehousesdetails";
import "react-toastify/dist/ReactToastify.css";
import { useDispatch, useSelector } from "react-redux";
import { orderStatus } from "./redux_toolkit/reducer/todaysOrderModalsReducer";
import {
  categoryList,
  filterValue,
  allCategories,
} from "./redux_toolkit/reducer/menuCategoriesApiReducer";
import {
  productFilterValue,
  productList,
} from "./redux_toolkit/reducer/menuProductsApiReducer";

import ManageUser from "./pages/ManageUsers/ManageUser";
import ManageUserDetail from "./pages/ManageUserDetail/ManageUserDetail";

import ManageRoles from "./pages/ManageRoles/ManageRoles";
import Managebranches from "./pages/Managebranches/Managebranches";
import ManageBranchesDetails from "./pages/ManageBranchesDetails/ManageBranchesDetails";
import ManageDevices from "./pages/ManageDevices/ManageDevices";
import ManageDeviceDetails from "./pages/ManageDeviceDetails/ManageDeviceDetails";

import ManageDiscounts from "./pages/ManageDiscounts/ManageDiscounts";
import ManageDiscountDetails from "./pages/ManageDiscountDetails/ManageDiscountDetails";
import ManageCoupons from "./pages/ManageCoupons/ManageCoupons";
import ManageCouponsDetails from "./pages/ManageCouponsDetails/ManageCouponsDetails";
import ManagePromotions from "./pages/ManagePromotions/ManagePromotions";
import ManagePromotionsDetails from "./pages/ManagePromotionsDetails/ManagePromotionsDetails";
import ManageAddPromotions from "./pages/ManageAddPromotions/ManageAddPromotions";
import ManageTimedEvents from "./pages/ManageTimedEvents/ManageTimedEvents";
import ManageTimedEventsDetails from "./pages/ManageTimedEventsDetails/ManageTimedEventsDetails";
import ManageMore from "./pages/ManageMore/ManageMore";
import ManageMoreTaxes from "./pages/ManageMoreTaxesAndGroup/ManageMoreTaxes";
import ManageMorePaymentMethod from "./pages/ManageMorePaymentMethods/ManageMorePaymentMethod";
import { userList } from "./redux_toolkit/reducer/manageUserApiReducer";
import {
  discountFilterValue,
  discountList,
} from "./redux_toolkit/reducer/manageDiscountApiReducer";
import {
  couponFilterValue,
  couponList,
} from "./redux_toolkit/reducer/manageCouponApiReducer";
import {
  timeEventFilterValue,
  timeEventList,
} from "./redux_toolkit/reducer/manageTimeEventApiReducer";
import {
  promotionsFilterValue,
  promotionsList,
} from "./redux_toolkit/reducer/managePromotionsApiReducer";
import ManageMoreDeliveryZones from "./pages/ManageMoreDeliveryZones/ManageMoreDeliveryZones";
import ManageMoreTags from "./pages/ManageMoreTags/ManageMoreTags";
import ManageMoreCharges from "./pages/ManageMoreCharges/ManageMoreCharges";
import ManageMorePriceTags from "./pages/ManageMorePriceTags/ManageMorePriceTags";
import ManageMorePriceTagDetailsPage from "./pages/ManageMorePriceTagDetailsPage/ManageMorePriceTagDetailsPage";
import ManageMoreKitchenFlow from "./pages/ManageMoreKitchenFlow/ManageMoreKitchenFlow";
import ManageMoreKitchenFlowDetails from "./pages/ManageMoreKitchenFlowDetails/ManageMoreKitchenFlowDetails";
import Dashboard from "./pages/Dashboard/Dashboard";
import InventoryControl from "./pages/ReportInventoryControl/InventoryControl";
import ReportInventoryHistory from "./pages/ReportInventoryHistory/ReportInventoryHistory";
import ReportMorePurchasing from "./pages/ReportMorePurchasing/ReportMorePurchasing";
import ReportMoreModiferOption from "./pages/ReportMoreModiferOption/ReportMoreModiferOption";
import ReportMoreProductCost from "./pages/ReportMoreProductCost/ReportMoreProductCost";
import ReportMorePurchaseOrder from "./pages/ReportMorePurchaseOrder/ReportMorePurchaseOrder";
import ReportMore from "./pages/ReportsMore/ReportMore";
import ReportMoreTaxes from "./pages/ReportMoreTaxes/ReportMoreTaxes";
import ReportMoreTips from "./pages/ReportMoreTips/ReportMoreTips";
import ReportMoreGiftCard from "./pages/ReportMoreGiftCard/ReportMoreGiftCard";
import ReportMoreBusinessDays from "./pages/ReportMoreBusinessDays/ReportMoreBusinessDays";
import ReportMoreTransfer from "./pages/ReportMoreTransfer/ReportMoreTransfer";
import ReportMoreTransferOrder from "./pages/ReportMoreTransfer Orders/ReportMoreTransferOrder";
import ReportMoreShifts from "./pages/ReportMoreShifts/ReportMoreShifts";
import ReportMoreDrawerOperation from "./pages/ReportMoreDrawerOperation/ReportMoreDrawerOperation";
import ReportMoreTills from "./pages/ReportMoreTills/ReportMoreTills";
import ReportsMoreVoidAndReturns from "./pages/ReportMoreVoidAndReturns/ReportMoreVoidAndReturns";
import ReportMoreCostAdjustmentHistory from "./pages/ReportMoreCostAdjustmentHistory/ReportMoreCostAdjustmentHistory";
import ReportMoreInventoryItemsCost from "./pages/ReportMoreInventoryItemsCost/ReportMoreInventoryItemsCost";
import ManageMoreSettingDisplayApp from "./pages/ManageMoreSettingDisplayApp/ManageMoreSettingDisplayApp";
import ManageMoreSettingPaymentIntegrations from "./pages/ManageMoreSettingPaymentIntegrations/ManageMoreSettingPaymentIntegrations";
import ManageMoreSettingSmsProviders from "./pages/ManageMoreSettingSmsProviders/ManageMoreSettingSmsProviders";
import ManageMoreSettingsGeneral from "./pages/ManageMoreSettingsGeneral/ManageMoreSettingsGeneral";
import ManageMoreSettingsLoyalty from "./pages/ManageMoreSettingLoyalty/ManageMoreSettingLoyalty";
import ManageMoreSubscription from "./pages/ManageMoreSubscription/ManageMoreSubscription";
import ManageMoreSettingsCashierApp from "./pages/ManageMoreSettingsCashierApp/ManageMoreSettingsCashierApp";
import ManageMoreSettingsCallCenter from "./pages/ManageMoreSettingsCallCenter/ManageMoreSettingsCallCenter";
import ManageMoreOnlineOrderingSetting from "./pages/ManageMoreOnlineOrderingSetting/ManageMoreOnlineOrderingSetting";
import ManageMoreReservations from "./pages/ManageMoreReservation/ManageMoreReservations";
import ManageMoreSettingReceipt from "./pages/ManageMoreSettingReceipt/ManageMoreSettingReceipt";
import ManageMoreSettingInventoryTransactions from "./pages/ManageMoreSettingInventoryTransactions/ManageMoreSettingInventoryTransactions";
import ManageMoreSettings from "./pages/ManageMoreSettings/ManageMoreSettings";

const App = () => {
  const dispatch = useDispatch();
  const filterorderstatus = useSelector(
    (state: any) => state.orderModalsReducer.toastify
  );
  const TodayDeclinestatus = useSelector(
    (state: any) => state.todaysOrderModalsReducer.toastify
  );
  const TodayOrder = useSelector(
    (state: any) => state.todaysOrderModalsReducer.orderToast
  );
  useEffect(() => {
    if (filterorderstatus || TodayOrder) toast("Applied SuccessFully");
  }, [filterorderstatus, TodayOrder]);

  useEffect(() => {
    if (TodayDeclinestatus) toast(orderStatus);
  }, [TodayDeclinestatus]);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      filterValue.type = "All";
      dispatch(categoryList(filterValue));
      dispatch(allCategories());
      productFilterValue.type = "all";
      dispatch(productList(productFilterValue));
      dispatch(userList({ type: "all" }));
      discountFilterValue.type = "all";
      dispatch(discountList(discountFilterValue));
      couponFilterValue.type = "all";
      dispatch(couponList(couponFilterValue));
      promotionsFilterValue.type = "all";
      dispatch(promotionsList(promotionsFilterValue));
    }
  }, []);

  return (
    <>
      <ToastContainer />
      <Routes>
        <Route path="/" element={<Navigation />}>
          <Route index element={<Login />} />
          <Route path="dashboard" element={<Dashboard />} />

          <Route path="orders" element={<Orders />} />
          <Route path="orders/:id" element={<Ordersdetails />} />
          <Route path="today-orders" element={<Todayorders />} />
          <Route path="today-orders/:id" element={<Ordersdetails />} />
          <Route path="customers" element={<Customer />} />
          <Route path="customers/:id" element={<Customerdetails />} />
          <Route path="inventory/items" element={<Items />} />
          <Route path="inventory/items/:id" element={<Itemsdetails />} />
          <Route
            path="inventory/purchase-orders"
            element={<Purchaseorders />}
          />
          <Route
            path="inventory/purchase-orders/:id"
            element={<Purchaseordersdetails />}
          />
          <Route
            path="inventory/transfer-orders"
            element={<Transferorders />}
          />
          <Route
            path="inventory/transfer-orders/:id"
            element={<Transferordersdetails />}
          />
          <Route path="inventory/suppliers" element={<Suppliers />} />
          <Route
            path="inventory/suppliers/:id"
            element={<Suppliersdetails />}
          />
          <Route
            path="inventory/inventory-count"
            element={<Inventorycount />}
          />
          <Route
            path="inventory/inventory-count/:id"
            element={<Inventorycountdetails />}
          />
          <Route path="inventory/purchasing" element={<Purchasing />} />
          <Route
            path="inventory/purchasing/:id"
            element={<Purchasingdetails />}
          />
          <Route path="inventory/transfers" element={<Transfers />} />
          <Route
            path="inventory/transfers/:id"
            element={<Transfersdetails />}
          />
          <Route path="inventory/production" element={<Production />} />
          <Route
            path="inventory/production/:id"
            element={<Productiondetails />}
          />
          <Route path="inventory/more" element={<Inventorymore />} />
          <Route
            path="inventory/quantity-adjustment"
            element={<Quantityadjustment />}
          />
          <Route
            path="inventory/quantity-adjustment/:id"
            element={<Quantityadjustmentdetails />}
          />
          <Route
            path="inventory/cost-adjustment"
            element={<Costadjustment />}
          />
          <Route
            path="inventory/cost-adjustment/:id"
            element={<Costadjustmentdetails />}
          />
          <Route
            path="inventory/order-transaction"
            element={<Ordertransaction />}
          />
          <Route
            path="inventory/order-transaction/:id"
            element={<Ordertransactiondetails />}
          />
          <Route
            path="inventory/inventory-categories"
            element={<Inventorycategories />}
          />
          <Route
            path="inventory/inventory-warehouses"
            element={<Warehouses />}
          />
          <Route
            path="inventory/inventory-warehouses/:id"
            element={<Warehousesdetails />}
          />
          <Route path="inventory/inventory-spotcheck" element={<Spotcheck />} />
          <Route
            path="inventory/inventory-spotcheck/:id"
            element={<Spotcheckdetails />}
          />
          <Route
            path="inventory/inventory-countsheet"
            element={<Countsheet />}
          />
          <Route path="reports/sales" element={<Reportssales />} />
          <Route path="reports/analysis" element={<Reportsanalysis />} />
          <Route
            path="reports/analysis/menu-engineering"
            element={<Reportsmenuengineering />}
          />
          <Route
            path="reports/analysis/costanalysis"
            element={<Reportscostanalysis />}
          />
          <Route
            path="reports/analysis/speed-of-Service"
            element={<Reportsspeedservice />}
          />
          <Route
            path="reports/analysis/branches-trend"
            element={<Reportsbranchestrend />}
          />
          <Route path="reports/payments" element={<Reportspayments />} />
          <Route
            path="reports/inventory-levels"
            element={<Reportsinventorylevels />}
          />

          <Route
            path="reports/inventory-control"
            element={<InventoryControl />}
          />
          <Route
            path="reports/inventory-History"
            element={<ReportInventoryHistory />}
          />

          <Route path="reports/report-more" element={<ReportMore />} />
          <Route
            path="reports/report-more/taxes"
            element={<ReportMoreTaxes />}
          />
          <Route path="reports/report-more/tips" element={<ReportMoreTips />} />
          <Route
            path="reports/report-more/gift-cards"
            element={<ReportMoreGiftCard />}
          />
          <Route
            path="reports/report-more/business-days"
            element={<ReportMoreBusinessDays />}
          />
          <Route
            path="reports/report-more/shifts"
            element={<ReportMoreShifts />}
          />
          <Route
            path="reports/report-more/tills"
            element={<ReportMoreTills />}
          />
          <Route
            path="reports/report-more/drawer-operations"
            element={<ReportMoreDrawerOperation />}
          />
          <Route
            path="reports/report-more/void-returns"
            element={<ReportsMoreVoidAndReturns />}
          />
          <Route
            path="reports/report-more/purchase-order"
            element={<ReportMorePurchaseOrder />}
          />
          <Route
            path="reports/report-more/transfer-order"
            element={<ReportMoreTransferOrder />}
          />
          <Route
            path="reports/report-more/transfer"
            element={<ReportMoreTransfer />}
          />
          <Route
            path="reports/report-more/purchasing"
            element={<ReportMorePurchasing />}
          />
          <Route
            path="reports/report-more/cost-adjustmenthistory"
            element={<ReportMoreCostAdjustmentHistory />}
          />
          <Route
            path="reports/report-more/product-cost"
            element={<ReportMoreProductCost />}
          />
          <Route
            path="reports/report-more/modifer-option"
            element={<ReportMoreModiferOption />}
          />
          <Route
            path="reports/report-more/inventoryitem-cost"
            element={<ReportMoreInventoryItemsCost />}
          />
          <Route path="menu/categories" element={<Menucategories />} />
          <Route
            path="menu/categories/sort-categories"
            element={<Menusortcategories />}
          />
          <Route path="menu/products" element={<Menuproducts />} />
          <Route path="menu/products/:id" element={<Menuproductsdetails />} />
          <Route path="menu/combos" element={<Menucombos />} />
          <Route path="menu/combos/:id" element={<Menucombosdetails />} />
          <Route path="menu/gift-cards" element={<Menugiftcards />} />
          <Route
            path="menu/gift-cards/:id"
            element={<Menugiftcardsdetails />}
          />
          <Route path="menu/modifiers" element={<Menumodifiers />} />
          <Route
            path="menu/modifiers/sort-modifier"
            element={<Menusortmodifier />}
          />
          <Route
            path="menu/modifier-options"
            element={<Menumodifieroptions />}
          />
          <Route
            path="menu/modifier-options/:id"
            element={<Menumodifieroptionsdetails />}
          />
          <Route path="menu/groups" element={<Menugroups />} />
          <Route path="menu/groups/:id" element={<Menugroupsdetails />} />
          <Route path="menu/groups/sort-group" element={<Menusortgroup />} />

          <Route path="/manage/users" element={<ManageUser />} />
          <Route path="/manage/users/:id" element={<ManageUserDetail />} />

          <Route path="manage/roles" element={<ManageRoles />} />
          <Route path="manage/branches" element={<Managebranches />} />

          <Route
            path="/manage/branches/:id"
            element={<ManageBranchesDetails />}
          />
          <Route path="/manage/devices" element={<ManageDevices />} />
          <Route path="/manage/devices/:id" element={<ManageDeviceDetails />} />

          <Route path="/manage/discounts" element={<ManageDiscounts />} />
          <Route
            path="/manage/discounts/manage-discount/:id"
            element={<ManageDiscountDetails />}
          />
          <Route path="/manage/coupons" element={<ManageCoupons />} />
          <Route
            path="/manage/coupons/:id"
            element={<ManageCouponsDetails />}
          />
          <Route path="/manage/promotions" element={<ManagePromotions />} />
          <Route
            path="/manage/promotions/promotions-detail/:id"
            element={<ManagePromotionsDetails />}
          />
          <Route
            path="/manage/promotions/add-promotions"
            element={<ManageAddPromotions />}
          />
          <Route path="/manage/timed-events" element={<ManageTimedEvents />} />
          <Route
            path="/manage/timed-events/timed-events-details/:id"
            element={<ManageTimedEventsDetails />}
          />

          <Route path="/manage/manage-more" element={<ManageMore />} />
          <Route
            path="/manage/manage-more/taxes"
            element={<ManageMoreTaxes />}
          />
          <Route
            path="/manage/manage-more/payments-method"
            element={<ManageMorePaymentMethod />}
          />
          <Route
            path="/manage/manage-more/delivery-zones"
            element={<ManageMoreDeliveryZones />}
          />
          <Route path="/manage/manage-more/tags" element={<ManageMoreTags />} />
          <Route
            path="/manage/manage-more/charges"
            element={<ManageMoreCharges />}
          />
          <Route
            path="/manage/manage-more/price-tags"
            element={<ManageMorePriceTags />}
          />
          <Route
            path="/manage/manage-more/price-tags/:id"
            element={<ManageMorePriceTagDetailsPage />}
          />
          <Route
            path="/manage/manage-more/kitchen-flow"
            element={<ManageMoreKitchenFlow />}
          />
          <Route
            path="/manage/manage-more/kitchen-flow/:id"
            element={<ManageMoreKitchenFlowDetails />}
          />
          <Route
            path="/manage/manage-more/reservation"
            element={<ManageMoreReservations />}
          />
          <Route
            path="/manage/manage-more/subscription"
            element={<ManageMoreSubscription />}
          />
          <Route
            path="/manage/manage-more/online-ordering"
            element={<ManageMoreOnlineOrderingSetting />}
          />
          <Route
            path="/manage/manage-more/price-tags"
            element={<ManageMorePriceTags />}
          />
          <Route
            path="/manage/manage-more/settings"
            element={
              <>
                <ManageMoreSettings />
                <ManageMoreSettingsGeneral />
              </>
            }
          />
          <Route
            path="/manage/manage-more/settings/general"
            element={
              <>
                <ManageMoreSettings />
                <ManageMoreSettingsGeneral />
              </>
            }
          />
          <Route
            path="/manage/manage-more/settings/loyalty"
            element={
              <>
                <ManageMoreSettings />
                <ManageMoreSettingsLoyalty />
              </>
            }
          />
          <Route
            path="/manage/manage-more/settings/receipt"
            element={
              <>
                <ManageMoreSettings />
                <ManageMoreSettingReceipt />
              </>
            }
          />
          <Route
            path="/manage/manage-more/settings/call-center"
            element={
              <>
                <ManageMoreSettings />
                <ManageMoreSettingsCallCenter />
              </>
            }
          />
          <Route
            path="/manage/manage-more/settings/cashier-app"
            element={
              <>
                <ManageMoreSettings />
                <ManageMoreSettingsCashierApp />
              </>
            }
          />

          <Route
            path="/manage/manage-more/settings/inventory-transactionst"
            element={
              <>
                <ManageMoreSettings />
                <ManageMoreSettingInventoryTransactions />
              </>
            }
          />
          <Route
            path="/manage/manage-more/settings/display-app"
            element={
              <>
                <ManageMoreSettings />
                <ManageMoreSettingDisplayApp />
              </>
            }
          />
          <Route
            path="/manage/manage-more/settings/payment-integrations"
            element={
              <>
                <ManageMoreSettings />
                <ManageMoreSettingPaymentIntegrations />
              </>
            }
          />

          <Route
            path="/manage/manage-more/settings/sms-providers"
            element={
              <>
                <ManageMoreSettings />
                <ManageMoreSettingSmsProviders />
              </>
            }
          />
        </Route>
      </Routes>
    </>
  );
};

export default App;

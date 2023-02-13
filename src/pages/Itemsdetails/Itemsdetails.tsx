import React, { Fragment, useEffect, useState } from "react";
import st from "../../style.module.scss";
import "bootstrap/dist/css/bootstrap.min.css";
import cx from "./Itemsdetails.module.scss";
import table from "../../datatable.module.scss";
import { Card, Row, Table, Col } from "react-bootstrap";
import { NavLink, useParams } from "react-router-dom";
import { MdArrowBackIos, MdDeleteOutline } from "react-icons/md";
import Modals from "../../components/Modals/InventoryItemsM";
import { useDispatch, useSelector } from "react-redux";
import {
  addType,
  getAllTagSupplierIngridentCustomLevel,
  getCategoriesInItemList,
  get_ingridentForItem,
  get_supplier_item,
  inventoryItemId,
  inventoryItemView,
  singleInventoryItemDetails,
  tag_foritem,
} from "../../redux_toolkit/reducer/inventoryItemsApiReducer";
import { branches } from "../../redux_toolkit/reducer/commonApiReducer";

export default function Itemsdetails() {
  const singleInventoryItem = useSelector(
    (state: any) => state.inventoryItemsApiReducer.singleInventoryItemCount
  );
  const item_tag_ingre_supp_branchCount: number = useSelector(
    (state: any) =>
      state.inventoryItemsApiReducer.item_tag_ingre_supp_branchCount
  );
  const param = useParams();
  const dispatch = useDispatch();
  const [show, setShow] = useState(false);
  const [inventoryItemDetail, setInventoryItemDetail] = useState<any>();
  const [modalName, setModalName] = useState("");
  const handleShow = (modalname: string, status: boolean) => {
    console.log(modalname, status, "handleShow");
    setModalName(modalname);
    setShow(status);
  };
  const handleClose = () => {
    setModalName("");
    setShow(false);
  };

  useEffect(() => {
    setInventoryItemDetail(singleInventoryItemDetails);
    console.log(singleInventoryItemDetails, "singleInventoryItemDetails");
  }, [singleInventoryItem]);

  useEffect(() => {
    if (inventoryItemDetail !== null) {
      dispatch(inventoryItemView(param?.id));
    }
    dispatch(getCategoriesInItemList());
    dispatch(tag_foritem());
    dispatch(get_ingridentForItem());
    dispatch(get_supplier_item());
    dispatch(branches());
  }, []);

  useEffect(() => {
    if (inventoryItemId !== undefined) {
      handleClose();
      dispatch(inventoryItemView(inventoryItemId));
    }
  }, [item_tag_ingre_supp_branchCount]);

  return (
    <>
      <section className={`${st.pageWrapper}`}>
        <div className={`${st.pageTitle}`}>
          <NavLink to="/inventory/items" className={`${st.backBtn}`}>
            <MdArrowBackIos className={`${st.icon}`} /> Back
          </NavLink>
          <div className={`${st.pageTitleRow}`}>
            <div className={`${st.rowTitleLeft}`}>
              <h5>{inventoryItemDetail?.item_name}</h5>
            </div>
            <div className={`${st.rowTitleRight}`}>
              <button
                className={`btn ${st.themeBtn}`}
                onClick={() => {
                  handleShow("edit item", true);
                }}
              >
                Edit Items
              </button>
            </div>
          </div>
        </div>

        <div className={`${st.pageWrapperInside} ${st.setWidth}`}>
          <Card>
            <Card.Body className={`${cx.cardBody}`}>
              <div className={`${cx.contentBox}`}>
                <Row>
                  <Col lg={6} className={`${cx.formField}`}>
                    <label>Name</label>
                    <p>
                      {inventoryItemDetail?.item_name
                        ? inventoryItemDetail?.item_name
                        : "-"}
                    </p>
                  </Col>
                  <Col lg={6} className={`${cx.formField}`}>
                    <label>Name Localized</label>
                    <p>
                      {inventoryItemDetail?.localized
                        ? inventoryItemDetail?.localized
                        : "-"}
                    </p>
                  </Col>
                  <Col lg={6} className={`${cx.formField}`}>
                    <label>SKU</label>
                    <p>
                      {inventoryItemDetail?.sku
                        ? inventoryItemDetail?.sku
                        : "-"}
                    </p>
                  </Col>
                  <Col lg={6} className={`${cx.formField}`}>
                    <label>Barcode</label>
                    <p>
                      {inventoryItemDetail?.barcode
                        ? inventoryItemDetail?.barcode
                        : "-"}
                    </p>
                  </Col>
                  <Col lg={6} className={`${cx.formField}`}>
                    <label>Minimum Level</label>
                    <p>
                      {inventoryItemDetail?.minimum_level
                        ? inventoryItemDetail?.minimum_level
                        : "-"}
                    </p>
                  </Col>
                  <Col lg={6} className={`${cx.formField}`}>
                    <label>Par Level</label>
                    <p>
                      {inventoryItemDetail?.per_level
                        ? inventoryItemDetail?.per_level
                        : "-"}
                    </p>
                  </Col>
                  <Col lg={6} className={`${cx.formField}`}>
                    <label>Maximum Level</label>
                    <p>
                      {inventoryItemDetail?.maximum_level
                        ? inventoryItemDetail?.maximum_level
                        : "-"}
                    </p>
                  </Col>
                  <Col lg={6} className={`${cx.formField}`}>
                    <label>Storage Unit</label>
                    <p>
                      {inventoryItemDetail?.storage_unite
                        ? inventoryItemDetail?.storage_unite
                        : "-"}
                    </p>
                  </Col>
                  <Col lg={6} className={`${cx.formField}`}>
                    <label>Ingredient Unit</label>
                    <p>
                      {inventoryItemDetail?.ingredient_unite
                        ? inventoryItemDetail?.ingredient_unite
                        : "-"}
                    </p>
                  </Col>
                  <Col lg={6} className={`${cx.formField}`}>
                    <label>Factor</label>
                    <p>
                      {inventoryItemDetail?.s_to_p_fector
                        ? inventoryItemDetail?.s_to_p_fector
                        : "-"}
                    </p>
                  </Col>
                  <Col lg={6} className={`${cx.formField}`}>
                    <label>Costing Method</label>
                    <p>
                      {inventoryItemDetail?.costing_method
                        ? inventoryItemDetail?.costing_method
                        : "-"}
                    </p>
                  </Col>
                  <Col lg={6} className={`${cx.formField}`}>
                    <label>Category</label>
                    <p>
                      {inventoryItemDetail?.category
                        ? inventoryItemDetail?.category
                        : "-"}
                    </p>
                  </Col>
                </Row>
              </div>

              <div className={`${cx.pageTitle}`}>
                <div className={`${cx.rowTitleLeft}`}>
                  <h5>Tags</h5>
                </div>
                <div className={`${cx.rowTitleRight}`}>
                  <button
                    className={`btn`}
                    onClick={() => {
                      handleShow("items add tags", true);
                      dispatch(
                        addType({
                          name: "tags",
                          id: inventoryItemDetail?.id,
                        })
                      );
                    }}
                  >
                    + Add Tags
                  </button>
                </div>
              </div>
              <div className={`${cx.contentBox}`}>
                <ul className={`${cx.tagsList}`}>
                  {getAllTagSupplierIngridentCustomLevel?.tags?.length > 0 ? (
                    getAllTagSupplierIngridentCustomLevel?.tags?.map(
                      (item: any, index: number) => {
                        return (
                          <li key={index}>
                            <span>{item?.name}</span>
                          </li>
                        );
                      }
                    )
                  ) : (
                    <div className={`p-4 text-center ${table.noData}`}>
                      Add tags to help you filter and group items easily. You
                      can create tags such as Weekly Stocktaking, Vegetables,
                      etc.
                    </div>
                  )}
                </ul>
              </div>

              <div className={`${cx.pageTitle}`}>
                <div className={`${cx.rowTitleLeft}`}>
                  <h5>Ingredients</h5>
                </div>
                <div className={`${cx.rowTitleRight}`}>
                  <button
                    className={`btn`}
                    onClick={() => {
                      handleShow("item ingredients", true);
                      dispatch(
                        addType({
                          name: "ingredients",
                          id: inventoryItemDetail?.id,
                        })
                      );
                    }}
                  >
                    + Add Ingredients
                  </button>
                </div>
              </div>
              <div className={`${cx.contentBox}`}>
                <div className={`table-responsive`}>
                  {getAllTagSupplierIngridentCustomLevel?.ingridents?.length >
                  0 ? (
                    <Table className={`${table.tableCt}`}>
                      <thead>
                        <tr>
                          <th>Name</th>
                          <th>SKU</th>
                          <th>Cost per Unit </th>
                          <th>Net Qty </th>
                          <th>Yield</th>
                          <th>Gross Qty </th>
                          <th>Waste Qty</th>
                          <th>Actual Cost</th>
                          <th></th>
                        </tr>
                      </thead>
                      <tbody>
                        {getAllTagSupplierIngridentCustomLevel?.ingridents?.map(
                          (item: any, index: number) => {
                            return (
                              <tr key={index}>
                                <td>
                                  {item?.ingredient_name
                                    ? item?.ingredient_name
                                    : "-"}
                                </td>
                                <td>{item?.sku ? item?.sku : "-"}</td>
                                <td>
                                  {item?.costper_unit && "SAR"}{" "}
                                  {item?.costper_unit
                                    ? item?.costper_unit
                                    : "-"}
                                </td>
                                <td>
                                  {item?.qty ? item?.qty : "-"}{" "}
                                  {item?.qty && "pieces"}
                                </td>
                                <td>
                                  {item?.yield ? item?.yield : "-"}
                                  {item?.yield && "%"}
                                </td>
                                <td>
                                  {item?.gross_qty ? item?.gross_qty : "-"}{" "}
                                  {item?.gross_qty && "pieces"}
                                </td>
                                <td>
                                  {item?.waste_qty ? item?.waste_qty : "-"}{" "}
                                  {item?.waste_qty && "pieces"}
                                </td>
                                <td>
                                  {item?.actual_cost && "SAR"}{" "}
                                  {item?.actual_cost ? item?.actual_cost : "-"}
                                </td>
                                <td>
                                  <span className={`${table.deleteIcon}`}>
                                    <MdDeleteOutline />
                                  </span>
                                </td>
                              </tr>
                            );
                          }
                        )}
                      </tbody>
                    </Table>
                  ) : (
                    <div className={`p-4 text-center ${table.noData}`}>
                      To produce this item, add the ingredients needed to
                      produce 1 3 of this item here from your inventory items
                      list.
                    </div>
                  )}
                </div>
              </div>

              <div className={`${cx.pageTitle}`}>
                <div className={`${cx.rowTitleLeft}`}>
                  <h5>Suppliers</h5>
                </div>
                <div className={`${cx.rowTitleRight}`}>
                  <button
                    className={`btn`}
                    onClick={() => {
                      handleShow("item suppliers", true);
                      dispatch(
                        addType({
                          name: "supplier",
                          id: inventoryItemDetail?.id,
                        })
                      );
                    }}
                  >
                    Link Supplier
                  </button>
                </div>
              </div>
              <div className={`${cx.contentBox}`}>
                <div className={`table-responsive`}>
                  {getAllTagSupplierIngridentCustomLevel?.supplier?.length >
                  0 ? (
                    <Table className={`${table.tableCt}`}>
                      <thead>
                        <tr>
                          <th>Supplier Name</th>
                          <th>Item Supplier Code</th>
                          <th>Order Unit</th>
                          <th>Order Quantity</th>
                          <th>Purchase Cost</th>
                        </tr>
                      </thead>
                      <tbody>
                        {getAllTagSupplierIngridentCustomLevel?.supplier?.map(
                          (item: any, index: number) => {
                            return (
                              <tr key={index}>
                                <td>
                                  {item?.supplier_name
                                    ? item?.supplier_name
                                    : "-"}
                                </td>
                                <td>{item?.code ? item?.code : "-"}</td>
                                <td>
                                  {item?.order_unit ? item?.order_unit : "-"}
                                </td>
                                <td>
                                  {item?.order_qty ? item?.order_qty : "-"}
                                </td>
                                <td>
                                  {item?.purchase_cost
                                    ? item?.purchase_cost
                                    : "-"}
                                </td>
                              </tr>
                            );
                          }
                        )}
                      </tbody>
                    </Table>
                  ) : (
                    <div className={`p-4 text-center ${table.noData}`}>
                      Link this item to the suppliers you purchase from, and you
                      can assign different order units and cost to each
                      supplier.
                    </div>
                  )}
                </div>
              </div>

              <div className={`${cx.pageTitle}`}>
                <div className={`${cx.rowTitleLeft}`}>
                  <h5>Custom Level</h5>
                </div>
                <div className={`${cx.rowTitleRight}`}>
                  <button
                    className={`btn`}
                    onClick={() => {
                      handleShow("item branches", true);
                      dispatch(
                        addType({
                          name: "custom level",
                          id: inventoryItemDetail?.id,
                        })
                      );
                    }}
                  >
                    Select Branches
                  </button>
                </div>
              </div>
              <div className={`${cx.contentBox}`}>
                <div className={`table-responsive`}>
                  {getAllTagSupplierIngridentCustomLevel?.customlevel?.length >
                  0 ? (
                    <Table className={`${table.tableCt}`}>
                      <thead>
                        <tr>
                          <th>Branch</th>
                          <th>Minimum Level</th>
                          <th>Par Level</th>
                          <th>Maximum Level</th>
                        </tr>
                      </thead>
                      <tbody>
                        {getAllTagSupplierIngridentCustomLevel?.customlevel?.map(
                          (level: any, index: any) => {
                            return (
                              <tr key={index}>
                                <td>{level?.branch_id}</td>
                                <td>{level?.min_level}</td>
                                <td>{level?.max_level}</td>
                                <td>{level?.par_level}</td>
                              </tr>
                            );
                          }
                        )}
                      </tbody>
                    </Table>
                  ) : (
                    <div className={`p-4 text-center ${table.noData}`}>
                      You can apply custom inventory levels to some branches
                      instead of the default levels (such as high traffic
                      branches) and specify the minimum and maximum levels for
                      them.
                    </div>
                  )}
                </div>
              </div>
            </Card.Body>
          </Card>
        </div>
      </section>

      <Modals show={show} handleClose={handleClose} modalName={modalName} />
    </>
  );
}

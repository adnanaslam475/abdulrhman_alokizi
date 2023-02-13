import React, { useCallback, useEffect, useState } from "react";
import st from "../../style.module.scss";
import "bootstrap/dist/css/bootstrap.min.css";
import cx from "./Suppliersdetails.module.scss";
import table from "../../datatable.module.scss";
import {
  Card,
  Button,
  Row,
  Table,
  Col,
  Modal,
  Form,
  Dropdown,
} from "react-bootstrap";
import icon4 from "../../images/icon-printer.svg";
import { NavLink, useParams } from "react-router-dom";

import { MdArrowBackIos, MdDeleteOutline } from "react-icons/md";
import Modals from "../../components/Modals/InventorySuppliersM";
import { useDispatch, useSelector } from "react-redux";
import {
  addType,
  getAllTagItem,
  inventorySupplierId,
  inventorySupplierView,
  singleInventorySupplierDetails,
  tagforsupplier,
} from "../../redux_toolkit/reducer/inventorySupplierApiReducer";

export default function Suppliersdetails() {
  const singleInventorySupplier = useSelector(
    (state: any) =>
      state.inventorySupplierApiReducer.singleInventorySupplierCount
  );
  const addEditInventorySupplieCount = useSelector(
    (state: any) =>
      state.inventorySupplierApiReducer.addEditInventorySupplieCount
  );
  const supplieradd_tagCount = useSelector(
    (state: any) => state.inventorySupplierApiReducer.supplieradd_tagCount
  );
  const param = useParams();
  const dispatch = useDispatch();
  const [show, setShow] = useState(false);
  const [modalName, setModalName] = useState("");
  const [inventorySupplierDetail, setInventorySupplierDetail] = useState<any>();

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
    console.log(singleInventorySupplierDetails);
    setInventorySupplierDetail(singleInventorySupplierDetails);
  }, [singleInventorySupplier]);

  useEffect(() => {
    if (inventorySupplierDetail !== null) {
      dispatch(inventorySupplierView(param?.id));
    }
    dispatch(tagforsupplier());
  }, []);

  useEffect(() => {
    dispatch(inventorySupplierView(param?.id));
  }, [supplieradd_tagCount]);

  useEffect(() => {
    if (inventorySupplierId !== undefined) {
      handleClose();
      dispatch(inventorySupplierView(inventorySupplierId));
    }
  }, [addEditInventorySupplieCount]);

  return (
    <>
      <section className={`${st.pageWrapper}`}>
        <div className={`${st.pageTitle}`}>
          <NavLink to="/inventory/more" className={`${st.backBtn}`}>
            <MdArrowBackIos className={`${st.icon}`} /> Back
          </NavLink>
          <div className={`${st.pageTitleRow}`}>
            <div className={`${st.rowTitleLeft}`}>
              <h5>Tomato</h5>
            </div>
            <div className={`${st.rowTitleRight}`}>
              <button
                className={`btn ${st.themeBtn}`}
                onClick={() => {
                  handleShow("edit suppliers", true);
                  addType({
                    name: "edit suppliers",
                    id: inventorySupplierDetail?.id,
                  });
                }}
              >
                Edit Suppliers
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
                      {inventorySupplierDetail?.supplier_name
                        ? inventorySupplierDetail?.supplier_name
                        : "-"}
                    </p>
                  </Col>
                  <Col lg={6} className={`${cx.formField}`}>
                    <label>Contact Name</label>
                    <p>
                      {" "}
                      {inventorySupplierDetail?.contact_name
                        ? inventorySupplierDetail?.contact_name
                        : "-"}
                    </p>
                  </Col>
                  <Col lg={6} className={`${cx.formField}`}>
                    <label>Phone</label>
                    <p>
                      {" "}
                      {inventorySupplierDetail?.phone
                        ? inventorySupplierDetail?.phone
                        : "-"}
                    </p>
                  </Col>
                  <Col lg={6} className={`${cx.formField}`}>
                    <label>Primary Email</label>
                    <p>
                      {" "}
                      {inventorySupplierDetail?.email
                        ? inventorySupplierDetail?.email
                        : "-"}
                    </p>
                  </Col>
                  <Col lg={6} className={`${cx.formField}`}>
                    <label>Supplier Code</label>
                    <p>
                      {" "}
                      {inventorySupplierDetail?.code
                        ? inventorySupplierDetail?.code
                        : "-"}
                    </p>
                  </Col>
                  <Col lg={6} className={`${cx.formField}`}>
                    <label>Additional Email</label>
                    <p>
                      {" "}
                      {inventorySupplierDetail?.email
                        ? inventorySupplierDetail?.email
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
                      handleShow("add tags", true);
                      dispatch(
                        addType({
                          name: "tags",
                          id: inventorySupplierDetail?.id,
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
                  {getAllTagItem?.tags?.length > 0 ? (
                    getAllTagItem?.tags?.map((item: any, index: number) => {
                      return (
                        <li key={index}>
                          <span>{item?.name}</span>
                        </li>
                      );
                    })
                  ) : (
                    <div className={`p-4 text-center ${table.noData}`}>
                      Add tags to help you filter and group suppliers easily.
                      You can create tags such as Cash Suppliers, High Quality,
                      etc.
                    </div>
                  )}
                </ul>
              </div>

              <div className={`${cx.pageTitle}`}>
                <div className={`${cx.rowTitleLeft}`}>
                  <h5>Inventory Items</h5>
                </div>
                <div className={`${cx.rowTitleRight}`}>
                  <button
                    className={`btn`}
                    onClick={() => {
                      handleShow("inventory items", true);
                      dispatch(
                        addType({
                          name: "inventory items",
                          id: inventorySupplierDetail?.id,
                        })
                      );
                    }}
                  >
                    + Link Items
                  </button>
                </div>
              </div>
              <div className={`${cx.contentBox}`}>
                <div className={`table-responsive`}>
                  {getAllTagItem?.item?.length > 0 ? (
                    <Table className={`${table.tableCt}`}>
                      <thead>
                        <tr>
                          <th>Name</th>
                          <th>SKU</th>
                          <th>Item Supplier Code</th>
                          <th>Order Unit</th>
                          <th>Order Quantity</th>
                          <th>Purchase Cost</th>
                          <th></th>
                        </tr>
                      </thead>
                      <tbody>
                        {getAllTagItem?.item?.map(
                          (item: any, index: number) => {
                            return (
                              <tr
                                key={index}
                                onClick={() => {
                                  handleShow("updateInventoryitem", true);
                                }}
                              >
                                <td>
                                  {item?.item_name ? item?.item_name : "-"}
                                </td>
                                <td>{item?.sku ? item?.sku : "-"}</td>
                                <td>{item?.code ? item?.code : "-"}</td>
                                <td>
                                  {item?.order_unite ? item?.order_unite : "-"}
                                </td>
                                <td>
                                  {item?.order_qty ? item?.order_qty : "-"}
                                </td>
                                <td>
                                  {item?.purchase_cost
                                    ? item?.purchase_cost
                                    : "-"}
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
                      Add tags to help you filter and group suppliers easily.
                      You can create tags such as Cash Suppliers, High Quality,
                      etc.
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

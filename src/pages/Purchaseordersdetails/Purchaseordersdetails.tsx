import React, { useEffect, useState } from "react";
import st from "../../style.module.scss";
import "bootstrap/dist/css/bootstrap.min.css";
import cx from "./Purchaseordersdetails.module.scss";
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
import icon5 from "../../images/icon-close2.svg";
import { NavLink, useParams } from "react-router-dom";

import { MdArrowBackIos } from "react-icons/md";
import Modals from "../../components/Modals/InventoryPurchaseM";
import { useDispatch, useSelector } from "react-redux";
import {
  inventoryPurchaseOrderId,
  inventoryPurchaseOrderView,
  singleInventoryPurchaseOrderDetails,
} from "../../redux_toolkit/reducer/inventoryPurchaseOrderApiReducer";

export default function Purchaseordersdetails() {
  const singleInventoryPurchaseOrder = useSelector(
    (state: any) =>
      state.inventoryPurchaseOrderApiReducer.singleInventoryPurchaseOrderCount
  );
  const addEditInventoryPurchaseOrderCount = useSelector(
    (state: any) =>
      state.inventoryPurchaseOrderApiReducer.addEditInventoryPurchaseOrderCount
  );
  const param = useParams();
  const dispatch = useDispatch();
  const [show, setShow] = useState(false);
  const [modalName, setModalName] = useState("");
  const [inventoryPurchaseOrderDetail, setInventoryPurchaseOrderDetail] =
    useState<any>();
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
    console.log(singleInventoryPurchaseOrderDetails);
    setInventoryPurchaseOrderDetail(singleInventoryPurchaseOrderDetails);
  }, [singleInventoryPurchaseOrder]);

  useEffect(() => {
    if (inventoryPurchaseOrderDetail !== null) {
      dispatch(inventoryPurchaseOrderView(param?.id));
    }
  }, []);

  // useEffect(() => {
  //   dispatch(inventoryPurchaseOrderView(param?.id));
  // }, [addEditInventoryPurchaseOrderCount]);

  useEffect(() => {
    if (inventoryPurchaseOrderId !== undefined) {
      handleClose();
      dispatch(inventoryPurchaseOrderView(inventoryPurchaseOrderId));
    }
  }, [addEditInventoryPurchaseOrderCount]);

  return (
    <>
      <section className={`${st.pageWrapper}`}>
        <div className={`${st.pageTitle}`}>
          <NavLink to="/inventory/purchase-orders" className={`${st.backBtn}`}>
            <MdArrowBackIos className={`${st.icon}`} /> Back
          </NavLink>
          <div className={`${st.pageTitleRow}`}>
            <div className={`${st.rowTitleLeft}`}>
              <h5>Purchase Order (PO-000022)</h5>
            </div>
            <div className={`${st.rowTitleRight}`}>
              <button className={`btn`}>
                <img src={icon4} className={`${st.icon}`} />
                Print
              </button>
              <button
                className={`btn`}
                onClick={() => {
                  handleShow("purchasing delete", true);
                }}
              >
                <img src={icon5} className={`${st.icon}`} />
                Close
              </button>
              <button
                className={`btn ${st.themeBtn}`}
                onClick={() => {
                  handleShow("create purchasing", true);
                }}
              >
                Create Purchasing
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
                    <label>Supplier</label>
                    <p>
                      {inventoryPurchaseOrderDetail?.supplier_name
                        ? inventoryPurchaseOrderDetail?.supplier_name
                        : "-"}
                    </p>
                  </Col>
                  <Col lg={6} className={`${cx.formField}`}>
                    <label>Destination</label>
                    <p>
                      {inventoryPurchaseOrderDetail?.Destination
                        ? inventoryPurchaseOrderDetail?.Destination
                        : "-"}
                    </p>
                  </Col>
                  <Col lg={6} className={`${cx.formField}`}>
                    <label>Business Date</label>
                    <p>
                      {inventoryPurchaseOrderDetail?.business_date
                        ? inventoryPurchaseOrderDetail?.business_date
                        : "-"}
                    </p>
                  </Col>
                  <Col lg={6} className={`${cx.formField}`}>
                    <label>Creator</label>
                    <p>
                      {inventoryPurchaseOrderDetail?.Creator
                        ? inventoryPurchaseOrderDetail?.Creator
                        : "-"}
                    </p>
                  </Col>
                  <Col lg={6} className={`${cx.formField}`}>
                    <label>Submitter</label>
                    <p>
                      {inventoryPurchaseOrderDetail?.Submitter
                        ? inventoryPurchaseOrderDetail?.Submitter
                        : "-"}
                    </p>
                  </Col>
                  <Col lg={6} className={`${cx.formField}`}>
                    <label>Approver</label>
                    <p>
                      {inventoryPurchaseOrderDetail?.Approver
                        ? inventoryPurchaseOrderDetail?.Approver
                        : "-"}
                    </p>
                  </Col>
                  <Col lg={6} className={`${cx.formField}`}>
                    <label>Created At</label>
                    <p>
                      {inventoryPurchaseOrderDetail?.created_date
                        ? inventoryPurchaseOrderDetail?.created_date
                        : "-"}
                    </p>
                  </Col>
                  <Col lg={6} className={`${cx.formField}`}>
                    <label>Delivery Date</label>
                    <p>
                      {inventoryPurchaseOrderDetail?.delivery_date
                        ? inventoryPurchaseOrderDetail?.delivery_date
                        : "-"}
                    </p>
                  </Col>
                </Row>
              </div>

              <div className={`${cx.pageTitle}`}>
                <div className={`${cx.rowTitleLeft}`}>
                  <h5>Items</h5>
                </div>
              </div>
              <div className={`${cx.contentBox}`}>
                <div className={`table-responsive`}>
                  <Table className={`${table.tableCt}`}>
                    <thead>
                      <tr>
                        <th>Name</th>
                        <th>SKU</th>
                        <th>Available Quantity</th>
                        <th>Cost Per Unit</th>
                        <th>Quantity</th>
                        <th>Total Cost</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td>Pizza</td>
                        <td>SK-0056</td>
                        <td>111</td>
                        <td>SAR 7</td>
                        <td>111</td>
                        <td>SAR 7</td>
                      </tr>
                    </tbody>
                  </Table>
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

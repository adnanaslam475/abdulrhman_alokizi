import React, { useCallback, useState } from "react";
import st from "../../style.module.scss";
import "bootstrap/dist/css/bootstrap.min.css";
import cx from "./Transfersdetails.module.scss";
import table from "../../datatable.module.scss";
import { Card, Button, Row, Table, Col, Modal, Form, Dropdown } from "react-bootstrap";
import icon4 from "../../images/icon-printer.svg";
import { NavLink } from "react-router-dom";
import icon5 from "../../images/icon-close2.svg";
import icon6 from "../../images/icon-edit2.svg";

import { MdArrowBackIos, MdDeleteOutline } from 'react-icons/md';
import Modals from "../../components/Modals/InventoryTransfersM";



export default function Transfersdetails() {

  const [show, setShow] = useState(false);
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

  return (
    <>
      <section className={`${st.pageWrapper}`}>
        <div className={`${st.pageTitle}`}>
          <NavLink to="/inventory/transfers" className={`${st.backBtn}`}>
            <MdArrowBackIos className={`${st.icon}`} /> Back
          </NavLink>
          <div className={`${st.pageTitleRow}`}>
            <div className={`${st.rowTitleLeft}`}>
              <h5>Transfer Receiving (TRR-0..)</h5>
            </div>
            <div className={`${st.rowTitleRight}`}>
            <button className={`btn`} onClick={() => {
                handleShow("Edit transaction", true);
              }}>
                <img src={icon5} className={`${st.icon}`} />
                edit transaction
              </button>
            <button className={`btn`} >
                <img src={icon4} className={`${st.icon}`} />
                Print
              </button>
            <button className={`btn`} onClick={() => {
                handleShow("reject", true);
              }}>
                <img src={icon5} className={`${st.icon}`} />
                Reject
              </button>
              
            <button className={`btn`} onClick={() => {
                handleShow("edit item transfer", true);
              }}>
                <img src={icon6} className={`${st.icon}`} />
                Edit
              </button>
              <button className={`btn ${st.themeBtn}`} onClick={() => {
                handleShow("edit suppliers", true);
              }}>
                Receive Items
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
                    <p>Riyadh Warehouse W01 (W01)</p>
                  </Col>
                  <Col lg={6} className={`${cx.formField}`}>
                    <label>Destination</label>
                    <p>Mall 1</p>
                  </Col>
                  <Col lg={6} className={`${cx.formField}`}>
                    <label>Business Date</label>
                    <p>-</p>
                  </Col>
                  <Col lg={6} className={`${cx.formField}`}>
                    <label>Creator</label>
                    <p>Abdulwahab Dakheel</p>
                  </Col>
                  <Col lg={6} className={`${cx.formField}`}>
                    <label>Receiver</label>
                    <p>Abdulwahab Dakheel</p>
                  </Col>
                  <Col lg={6} className={`${cx.formField}`}>
                    <label>Received At</label>
                    <p>September 22, 05:57am</p>
                  </Col>
                  <Col lg={6} className={`${cx.formField}`}>
                    <label>Transfer Sending Reference</label>
                    <p>TRS-000025</p>
                  </Col>
                  <Col lg={6} className={`${cx.formField}`}>
                    <label>Created At</label>
                    <p>September 08, 09:12am</p>
                  </Col>
                  <Col lg={6} className={`${cx.formField}`}>
                    <label>Total Cost</label>
                    <p>SAR 2,000</p>
                  </Col>
                </Row>
              </div>

              <div className={`${cx.pageTitle}`}>
                <div className={`${cx.rowTitleLeft}`}>
                  <h5>Items</h5>
                </div>
                <div className={`${cx.rowTitleRight}`}>
                  <button className={`btn`} onClick={() => {
                    handleShow("quantities", true);
                  }}>
                   Edit Quantities
                  </button>
                  <button className={`btn`} onClick={() => {
                    handleShow("add items", true);
                  }}>
                    Add Items
                  </button>
                  <button className={`btn`} onClick={() => {
                    handleShow("import files", true);
                  }}>
                    Import Items
                  </button>
                </div>
              </div>
              <div className={`${cx.contentBox}`}>
                <div className={`table-responsive`}>
                  <Table className={`${table.tableCt}`}>
                    <thead>
                      <tr>
                        <th>Name</th>
                        <th>SKU</th>
                        <th>Quantity</th>
                        <th></th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr onClick={() => {
                    handleShow("transferitemsfilter", true);
                  }}>
                        <td>Juice</td>
                        <td>SKU-087</td>
                        <td>1,000,000 ML</td>
                        <td>
                          <span className={`${table.deleteIcon}`}><MdDeleteOutline /></span>
                        </td>
                      </tr>
                      <tr onClick={() => {
                    handleShow("transferitemsfilter", true);
                  }}>
                        <td>Juice</td>
                        <td>SKU-087</td>
                        <td>1,000,000 ML</td>
                        <td>
                          <span className={`${table.deleteIcon}`}><MdDeleteOutline /></span>
                        </td>
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

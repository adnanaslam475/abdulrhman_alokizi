import React, { useCallback, useState } from "react";
import st from "../../style.module.scss";
import "bootstrap/dist/css/bootstrap.min.css";
import cx from "./Transferordersdetails.module.scss";
import table from "../../datatable.module.scss";
import { Card, Button, Row, Table, Col, Modal, Form, Dropdown } from "react-bootstrap";
import icon4 from "../../images/icon-printer.svg";
import icon5 from "../../images/icon-duplicate.svg";
import { NavLink } from "react-router-dom";

import { MdArrowBackIos } from 'react-icons/md';
import Modals from "../../components/Modals/InventoryTransferorderM";



export default function Transferordersdetails() {

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
          <NavLink to="/inventory/transfer-orders" className={`${st.backBtn}`}>
            <MdArrowBackIos className={`${st.icon}`} /> Back
          </NavLink>
          <div className={`${st.pageTitleRow}`}>
            <div className={`${st.rowTitleLeft}`}>
              <h5>Transfer Order (TO-000010)</h5>
            </div>
            <div className={`${st.rowTitleRight}`}>
              <button className={`btn`} >
                <img src={icon4} className={`${st.icon}`} />
                Print
              </button>
              <button className={`btn`} >
                <img src={icon5} className={`${st.icon}`} />
                Duplicate
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
                    <label>Warehouse</label>
                    <p>Riyadh Warehouse W01 (W01)</p>
                  </Col>
                  <Col lg={6} className={`${cx.formField}`}>
                    <label>Destination</label>
                    <p>Mall 1</p>
                  </Col>
                  <Col lg={6} className={`${cx.formField}`}>
                    <label>Business Date</label>
                    <p>2022-06-29</p>
                  </Col>
                  <Col lg={6} className={`${cx.formField}`}>
                    <label>Creator</label>
                    <p>Abdulwahab Dakheel</p>
                  </Col>
                  <Col lg={6} className={`${cx.formField}`}>
                    <label>Submitter</label>
                    <p>Abdulwahab Dakheel</p>
                  </Col>
                  <Col lg={6} className={`${cx.formField}`}>
                    <label>Approver</label>
                    <p>Abdulwahab Dakheel</p>
                  </Col>
                  <Col lg={6} className={`${cx.formField}`}>
                    <label>Created At</label>
                    <p>June 29, 01:14pm</p>
                  </Col>
                  <Col lg={6} className={`${cx.formField}`}>
                    <label>Delivery Date</label>
                    <p>2022-06-29</p>
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
                        <th>Quantity</th>
                        <th>Available Quantity</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td className="text-danger">Juice</td>
                        <td className="text-danger">SK-0056</td>
                        <td className="text-danger">1,000 kg</td>
                        <td className="text-danger">0 kg</td>
                      </tr>
                      <tr>
                        <td className="text-danger">Pizza</td>
                        <td className="text-danger">SK-0056</td>
                        <td className="text-danger">1,000 kg</td>
                        <td className="text-danger">0 kg</td>
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

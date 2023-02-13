import React, { useCallback, useState } from "react";
import st from "../../style.module.scss";
import "bootstrap/dist/css/bootstrap.min.css";
import cx from "./Ordertransactiondetails.module.scss";
import table from "../../datatable.module.scss";
import { Card, Button, Row, Table, Col, Modal, Form, Dropdown } from "react-bootstrap";
import icon4 from "../../images/icon-printer.svg";
import { NavLink } from "react-router-dom";

import { MdArrowBackIos, MdDeleteOutline, MdOutlineDelete } from 'react-icons/md';
import Modals from "../../components/Modals/InventoryOrdertransactionM";
import { AiOutlinePrinter } from "react-icons/ai";
import { FiEdit } from "react-icons/fi";



export default function Ordertransactiondetails() {

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
          <NavLink to="/inventory/order-transaction" className={`${st.backBtn}`}>
            <MdArrowBackIos className={`${st.icon}`} /> Back
          </NavLink>
          <div className={`${st.pageTitleRow}`}>
            <div className={`${st.rowTitleLeft}`}>
              <h5>Consumption From Order (OC-12..</h5>
            </div>
            <div className={`${st.rowTitleRight} ${cx.rowTitleIcons}`}>

              <button className={`btn`}>
                <AiOutlinePrinter/>
                Print
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
                    <label>Branch</label>
                    <p>Mall 1</p>
                  </Col>
                  <Col lg={6} className={`${cx.formField}`}>
                    <label>Business Date</label>
                    <p>2022-07-23</p>
                  </Col>
                  <Col lg={6} className={`${cx.formField}`}>
                    <label>Submitted At</label>
                    <p>September 08, 09:12am</p>
                  </Col>
                  <Col lg={6} className={`${cx.formField}`}>
                    <label>Order Reference</label>
                    <p>12639</p>
                  </Col>
                  <Col lg={6} className={`${cx.formField}`}>
                    <label>Created At</label>
                    <p>September 08, 09:12am</p>
                  </Col>
                  <Col lg={6} className={`${cx.formField}`}>
                    <label>Total Cost</label>
                    <p>SAR 0</p>
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
                        <th>Unit Cost</th> 
                        <th>Total Cost</th> 
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td>Juice</td>
                        <td>SK-0058</td>
                        <td>1,000,000 ML</td>
                        <td>SAR 80</td>
                        <td>SAR 80</td>
                      </tr>
                      <tr>
                        <td>Juice</td>
                        <td>SK-0058</td>
                        <td>1,000,000 ML</td>
                        <td>SAR 80</td>
                        <td>SAR 80</td>
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

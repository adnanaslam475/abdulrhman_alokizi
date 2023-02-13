import React, { useCallback, useState } from "react";
import st from "../../style.module.scss";
import "bootstrap/dist/css/bootstrap.min.css";
import cx from "./Inventorycountdetails.module.scss";
import table from "../../datatable.module.scss";
import { Card, Button, Row, Table, Col, Modal, Form, Dropdown } from "react-bootstrap";
import icon4 from "../../images/icon-printer.svg";
import icon5 from "../../images/icon-duplicate.svg";
import { NavLink } from "react-router-dom";

import { MdArrowBackIos } from 'react-icons/md';
import Modals from "../../components/Modals/InventoryCountM";



export default function Inventorycountdetails() {

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
          <NavLink to="/inventory/inventory-count" className={`${st.backBtn}`}>
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
                    <label>Supplier</label>
                    <p>X</p>
                  </Col>
                  <Col lg={6} className={`${cx.formField}`}>
                    <label>Branch</label>
                    <p>Mall 1</p>
                  </Col>
                  <Col lg={6} className={`${cx.formField}`}>
                    <label>Invoice Number</label>
                    <p>-</p>
                  </Col>
                  <Col lg={6} className={`${cx.formField}`}>
                    <label>Invoice Date</label>
                    <p>-</p>
                  </Col>
                  <Col lg={6} className={`${cx.formField}`}>
                    <label>Business Date</label>
                    <p>2022-09-08</p>
                  </Col>
                  <Col lg={6} className={`${cx.formField}`}>
                    <label>Creator</label>
                    <p>Abdulwahab Dakheel</p>
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
                        <th>Entered Quantity</th>
                        <th>Original Quantity</th>
                        <th>Variance Quantity</th>
                        <th>Variance Percent</th>
                        <th>Variance Cost</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td>Juice</td>
                        <td>SK-0056</td>
                        <td>1,000,000 ML</td>
                        <td>SAR 70</td>
                        <td>SAR 80</td>
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

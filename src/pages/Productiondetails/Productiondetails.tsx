import React, { useCallback, useState } from "react";
import st from "../../style.module.scss";
import "bootstrap/dist/css/bootstrap.min.css";
import cx from "./Productiondetails.module.scss";
import table from "../../datatable.module.scss";
import { Card, Button, Row, Table, Col, Modal, Form, Dropdown } from "react-bootstrap";
import icon4 from "../../images/icon-printer.svg";
import { NavLink } from "react-router-dom";
import icon5 from "../../images/icon-close2.svg";
import icon6 from "../../images/icon-edit2.svg";

import { MdArrowBackIos, MdDeleteOutline } from 'react-icons/md';
import Modals from "../../components/Modals/InventoryProductionM";



export default function Productiondetails() {

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
          <NavLink to="/inventory/production" className={`${st.backBtn}`}>
            <MdArrowBackIos className={`${st.icon}`} /> Back
          </NavLink>
          <div className={`${st.pageTitleRow}`}>
            <div className={`${st.rowTitleLeft}`}>
              <h5>Consumption From Production (P...</h5>
            </div>
            <div className={`${st.rowTitleRight}`}>
            <button className={`btn`} >
                <img src={icon4} className={`${st.icon}`} />
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
                    <p>Riyadh Warehouse W01 (W01)</p>
                  </Col>
                  <Col lg={6} className={`${cx.formField}`}>
                    <label>Business</label>
                    <p>2022-09-12</p>
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
                    <label>Submitted At</label>
                    <p>September 12, 12:29pm</p>
                  </Col>
                  <Col lg={6} className={`${cx.formField}`}>
                    <label>Received At</label>
                    <p>September 22, 05:57am</p>
                  </Col>
                  <Col lg={6} className={`${cx.formField}`}>
                    <label>Total Cost</label>
                    <p>SAR 10,200</p>
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

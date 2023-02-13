import React, { useCallback, useState } from "react";
import st from "../../style.module.scss";
import "bootstrap/dist/css/bootstrap.min.css";
import cx from "./Spotcheckdetails.module.scss";
import table from "../../datatable.module.scss";
import { Card, Button, Row, Table, Col, Modal, Form, Dropdown } from "react-bootstrap";
import icon4 from "../../images/icon-printer.svg";

import icon5 from "../../images/icon-duplicate.svg";
import { NavLink } from "react-router-dom";

import { MdArrowBackIos, MdDeleteOutline, MdOutlineDelete } from 'react-icons/md';
import Modals from "../../components/Modals/InventorySpotcheckM";
import { AiOutlinePrinter } from "react-icons/ai";
import { FiEdit } from "react-icons/fi";



export default function Spotcheckdetails() {

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
          <NavLink to="/inventory/inventory-spotcheck" className={`${st.backBtn}`}>
            <MdArrowBackIos className={`${st.icon}`} /> Back
          </NavLink>
          <div className={`${st.pageTitleRow}`}>
            <div className={`${st.rowTitleLeft}`}>
              <h5>Inventory Spot Check (SC-000001)</h5>
            </div>
            <div className={`${st.rowTitleRight} ${cx.rowTitleIcons}`}>
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
                    <label>Branch</label>
                    <p>Baghdad W01</p>
                  </Col>
                  <Col lg={6} className={`${cx.formField}`}>
                    <label>Business Date</label>
                    <p>2022-09-19</p>
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
                    <label>Total Variance Cost</label>
                    <p>SAR -6,788.67</p>
                  </Col>
                  <Col lg={6} className={`${cx.formField}`}>
                    <label>Created At</label>
                    <p>September 19, 12:56pm</p>
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
                        <td>Mistake ice cream</td>
                        <td>SK-0042</td>
                        <td>123</td>
                        <td>324</td>
                        <td>10L</td>
                        <td>40%</td>
                        <td>SAR 40</td>
                      </tr>
                      <tr>
                        <td>Mistake ice cream</td>
                        <td>SK-0042</td>
                        <td>123</td>
                        <td>324</td>
                        <td>10L</td>
                        <td>40%</td>
                        <td>SAR 40</td>
                      </tr>
                      <tr>
                        <td>Mistake ice cream</td>
                        <td>SK-0042</td>
                        <td>123</td>
                        <td>324</td>
                        <td>10L</td>
                        <td>40%</td>
                        <td>SAR 40</td>
                      </tr>
                      <tr>
                        <td>Mistake ice cream</td>
                        <td>SK-0042</td>
                        <td>123</td>
                        <td>324</td>
                        <td>10L</td>
                        <td>40%</td>
                        <td>SAR 40</td>
                      </tr>
                      <tr>
                        <td>Mistake ice cream</td>
                        <td>SK-0042</td>
                        <td>123</td>
                        <td>324</td>
                        <td>10L</td>
                        <td>40%</td>
                        <td>SAR 40</td>
                      </tr>
                      <tr>
                        <td>Mistake ice cream</td>
                        <td>SK-0042</td>
                        <td>123</td>
                        <td>324</td>
                        <td>10L</td>
                        <td>40%</td>
                        <td>SAR 40</td>
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

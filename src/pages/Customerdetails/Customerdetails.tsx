import React, { useCallback, useState } from "react";
import st from "../../style.module.scss";
import "bootstrap/dist/css/bootstrap.min.css";
import cx from "./Customerdetails.module.scss";
import table from "../../datatable.module.scss";
import { Card, Button, Row, Table, Col, Modal, Form, Dropdown } from "react-bootstrap";
import icon4 from "../../images/icon-printer.svg";
import { NavLink } from "react-router-dom";

import { MdArrowBackIos } from 'react-icons/md';
import Modals from "../../components/Modals/CustomerModals";



export default function Customerdetails() {

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
          <NavLink to="/customers" className={`${st.backBtn}`}>
            <MdArrowBackIos className={`${st.icon}`} /> Back
          </NavLink>
          <div className={`${st.pageTitleRow}`}>
            <div className={`${st.rowTitleLeft}`}>
              <h5>Hunger Station</h5>
            </div>
            <div className={`${st.rowTitleRight}`}>
              <button className={`btn`} >
                <img src={icon4} className={`${st.icon}`} />
                Enable House Account
              </button>
              <button className={`btn ${st.themeBtn}`} onClick={() => {
                handleShow("edit customer", true);
              }}>
                Edit Customer
              </button>
            </div>
          </div>
        </div>


        <div className={`${st.pageWrapperInside} ${st.setWidth}`}>
          <Card>
            <Card.Body className={`${cx.cardBody}`}>

              <Row>
                <Col md={4}>
                  <div className={`${cx.contentBox} ${cx.countCardBox}`}>
                    <p>Done Orders</p>
                    <h3><NavLink to="#">0</NavLink></h3>
                  </div>
                </Col>
                <Col md={4}>
                  <div className={`${cx.contentBox} ${cx.countCardBox}`}>
                    <p>Total Spent (SAR)</p>
                    <h3>2,706,000</h3>
                  </div>
                </Col>
                <Col md={4}>
                  <div className={`${cx.contentBox} ${cx.countCardBox}`}>
                    <p>Total Discounts (SAR)</p>
                    <h3>0</h3>
                  </div>
                </Col>
                <Col md={4}>
                  <div className={`${cx.contentBox} ${cx.countCardBox}`}>
                    <p>Last Orders</p>
                    <h3>September 18, 01:59pm</h3>
                  </div>
                </Col>
                <Col md={4}>
                  <div className={`${cx.contentBox} ${cx.countCardBox}`}>
                    <p>Favourite Product</p>
                    <h3>LWF The Original</h3>
                  </div>
                </Col>
                <Col md={4}>
                  <div className={`${cx.contentBox} ${cx.countCardBox}`}>
                    <p>Favourite Branch</p>
                    <h3>Mall 1</h3>
                  </div>
                </Col>
                <Col md={4}>
                  <div className={`${cx.contentBox} ${cx.countCardBox}`}>
                    <p>Loyalty Balance (Points)</p>
                    <h3>0</h3>
                  </div>
                </Col>
                <Col md={4}>
                  <div className={`${cx.contentBox} ${cx.countCardBox}`}>
                    <p>Total Earned (Points)</p>
                    <h3>0</h3>
                  </div>
                </Col>
              </Row>

              <div className={`${cx.contentBox}`}>
                <Row>
                  <Col lg={6} className={`${cx.formField}`}>
                    <label>Name</label>
                    <p>Hunger Station</p>
                  </Col>
                  <Col lg={6} className={`${cx.formField}`}>
                    <label>Email</label>
                    <p>-</p>
                  </Col>
                  <Col lg={6} className={`${cx.formField}`}>
                    <label>Phone</label>
                    <p>+966 11 328 1956</p>
                  </Col>
                  <Col lg={6} className={`${cx.formField}`}>
                    <label>Loyalty</label>
                    <p>Disabled</p>
                  </Col>
                  <Col lg={6} className={`${cx.formField}`}>
                    <label>House Account</label>
                    <p>Disabled</p>
                  </Col>
                  <Col lg={6} className={`${cx.formField}`}>
                    <label>Blacklist</label>
                    <p>No</p>
                  </Col>
                </Row>
              </div>


              <div className={`${cx.pageTitle}`}>
                <div className={`${cx.rowTitleLeft}`}>
                  <h5>Tags</h5>
                </div>
                <div className={`${cx.rowTitleRight}`}>


                  <button className={`btn`} onClick={() => {
                    handleShow("customer add tags", true);
                  }}>
                    + Add Tags
                  </button>
                </div>
              </div>
              <div className={`${cx.contentBox}`}>
                <ul className={`${cx.tagsList}`}>
                  <li><span>Tag 1</span></li>
                  <li><span>Tag 2</span></li>
                </ul>
              </div>



              <div className={`${cx.pageTitle}`}>
                <div className={`${cx.rowTitleLeft}`}>
                  <h5>Addresses</h5>
                </div>
                <div className={`${cx.rowTitleRight}`}>
                  <button className={`btn`} onClick={() => {
                    handleShow("customer create address", true);
                  }}>
                    + Add Address
                  </button>
                </div>
              </div>
              <div className={`${cx.contentBox}`}>
                <div className={`table-responsive`}>
                  <Table className={`${table.tableCt}`}>
                    <thead>
                      <tr>
                        <th>Addresses</th>
                        <th>Description</th>
                        <th>Delivery Zone</th>
                        <th>Created</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td>Hunger Station</td>
                        <td>Hunger 4112</td>
                        <td>-</td>
                        <td>2021-12-07 10:04pm</td>
                      </tr>
                    </tbody>
                  </Table>
                </div>
              </div>


              <div className={`${cx.pageTitle}`}>
                <div className={`${cx.rowTitleLeft}`}>
                  <h5>House Account Transactions</h5>
                </div>
                <div className={`${cx.rowTitleRight}`}>
                  <button className={`btn`} onClick={() => {
                    handleShow("add payment", true);
                  }}>
                   + Add Payment
                  </button>
                </div>
              </div>
              <div className={`${cx.contentBox}`}>
                <div className={`table-responsive`}>
                  <Table className={`${table.tableCt}`}>
                    <thead>
                      <tr>
                        <th>Type</th>
                        <th>Amount</th>
                        <th>Creator</th>
                        <th>Date</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td>Debit</td>
                        <td>SAR 400</td>
                        <td>Abdulwahab Dakheel</td>
                        <td>June 17, 12:29pm</td>
                      </tr>
                      <tr>
                        <td>Debit</td>
                        <td>SAR 400</td>
                        <td>Abdulwahab Dakheel</td>
                        <td>June 17, 12:29pm</td>
                      </tr>
                      <tr>
                        <td>Debit</td>
                        <td>SAR 400</td>
                        <td>Abdulwahab Dakheel</td>
                        <td>June 17, 12:29pm</td>
                      </tr>
                      <tr>
                        <td>Debit</td>
                        <td>SAR 400</td>
                        <td>Abdulwahab Dakheel</td>
                        <td>June 17, 12:29pm</td>
                      </tr>
                    </tbody>
                  </Table>
                </div>
              </div>
              
              <div className={`${cx.pageTitle}`}>
                <div className={`${cx.rowTitleLeft}`}>
                  <h5>Loyalty Transactions</h5>
                </div>
                <div className={`${cx.rowTitleRight}`}>
                </div>
              </div>

              <div className={`${cx.contentBox}`}>
                <div className={`p-4 text-center ${table.noData}`}>
                  When your customer redeems their earned rewards, you will see the transactions here.
                </div>
              </div>
              
              <div className={`${cx.pageTitle}`}>
                <div className={`${cx.rowTitleLeft}`}>
                  <h5>Loyalty Rewards</h5>
                </div>
                <div className={`${cx.rowTitleRight}`}>
                </div>
              </div>

              <div className={`${cx.contentBox}`}>
                <div className={`p-4 text-center ${table.noData}`}>
                When your customer earns rewards, you will see the redeem codes here.
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

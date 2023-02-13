import React, { useCallback, useState } from "react";
import st from "../../style.module.scss";
import "bootstrap/dist/css/bootstrap.min.css";
import cx from "./ManageMoreSubscription.module.scss";
import { Card, Row, Col } from "react-bootstrap";
import { NavLink } from "react-router-dom";

import { MdArrowBackIos } from "react-icons/md";
import Modals from "../../components/Modals/ManageCouponsM";

export default function ManageMoreSubscription() {
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
          <NavLink to="/manage/manage-more" className={`${st.backBtn}`}>
            <MdArrowBackIos className={`${st.icon}`} /> Back
          </NavLink>
          <div className={`${st.pageTitleRow}`}>
            <div className={`${st.rowTitleLeft}`}>
              <h5>Subscription</h5>
            </div>
          </div>
          <div  className={`${cx.subscriptionheader}`}>
            <NavLink to="#">Subscription</NavLink>
          </div>
        </div>

        <div className={`${st.pageWrapperInside} ${st.setWidth}`}>
          <Card>
            <Card.Body className={`${cx.cardBody}`}>
              <div className={`${cx.contentBox}`}>
                <Row>
                  <Col lg={12} className={`${cx.formField}`}>
                    <label>Account Number</label>
                    <p>157106</p>
                  </Col>
                  <Col lg={12} className={`${cx.formField}`}>
                    <label>Account Created At </label>
                    <p>2020-03-03</p>
                  </Col>
                </Row>
              </div>

              <div className={`${cx.contentBox}`}>
                <Row>
                  <Col lg={6} className={`${cx.formField}`}>
                    <label>Branches</label>
                    <p>1</p>
                  </Col>
                  <Col lg={6} className={`${cx.formField}`}>
                    <label>Display </label>
                    <p>0</p>
                  </Col>
                  <Col lg={6} className={`${cx.formField}`}>
                    <label>warehouses </label>
                    <p>1</p>
                  </Col>
                  <Col lg={6} className={`${cx.formField}`}>
                    <label>Notifer</label>
                    <p>0</p>
                  </Col>
                  <Col lg={6} className={`${cx.formField}`}>
                    <label>Cashier</label>
                    <p>9</p>
                  </Col>
                  <Col lg={6} className={`${cx.formField}`}>
                    <label>Call Center Agents </label>
                    <p>1 </p>
                  </Col>

                  <Col lg={6} className={`${cx.formField}`}>
                    <label>KDS</label>
                    <p>4</p>
                  </Col>
                  <Col lg={6} className={`${cx.formField}`}>
                    <label>Dots One</label>
                    <p>0</p>
                  </Col>
                  <Col lg={6} className={`${cx.formField}`}>
                    <label>Waiter</label>
                    <p>0</p>
                  </Col>
                </Row>
              </div>
            </Card.Body>
          </Card>
        </div>
      </section>

      <Modals show={show} handleClose={handleClose} modalName={modalName} />
    </>
  );
}

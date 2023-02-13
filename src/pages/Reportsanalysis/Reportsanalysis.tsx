import React, { useCallback, useState } from "react";
import st from "../../style.module.scss";
import "bootstrap/dist/css/bootstrap.min.css";
import cx from "./Reportsanalysis.module.scss";
import table from "../../datatable.module.scss";
import { Card, Button, Row, Table, Col, Modal, Form, Dropdown } from "react-bootstrap";
import icon4 from "../../images/icon-printer.svg";
import { NavLink } from "react-router-dom";

import { MdArrowBackIos } from 'react-icons/md';
import Modals from "../../components/Modals/OrderModal";



export default function Reportsanalysis() {

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
          <div className={`${st.pageTitleRow}`}>
            <div className={`${st.rowTitleLeft}`}>
              <h5>Analysis</h5>
            </div>
          </div>
        </div>


        <div className={`${st.pageWrapperInside}`}>
          <Card>
            <Card.Body className={`${cx.cardBody}`}>
                <Row>
                  <Col lg={3}>
                    <NavLink to="/reports/analysis/menu-engineering" className={`${cx.moreOption}`}>
                    Menu Engineering
                    </NavLink>
                  </Col>
                  <Col lg={3}>
                    <NavLink to="/reports/analysis/costanalysis" className={`${cx.moreOption}`}>
                    Inventory Cost Analysis
                    </NavLink>
                  </Col>
                  <Col lg={3}>
                    <NavLink to="/reports/analysis/branches-trend" className={`${cx.moreOption}`}>
                    Branches Trend
                    </NavLink>
                  </Col>
                  <Col lg={3}>
                    <NavLink to="/reports/analysis/speed-of-Service" className={`${cx.moreOption}`}>
                    Speed Of Service
                    </NavLink>
                  </Col>
                </Row>

            </Card.Body>
          </Card>
        </div>
      </section>

      <Modals show={show} handleClose={handleClose} modalName={modalName} />
    </>
  );
}

import React, { useCallback, useState } from "react";
import st from "../../style.module.scss";
import "bootstrap/dist/css/bootstrap.min.css";
import cx from "./ReportsMore.module.scss";
import table from "../../datatable.module.scss";
import { Card, Button, Row, Table, Col, Modal, Form, Dropdown } from "react-bootstrap";
import icon4 from "../../images/icon-printer.svg";
import { NavLink } from "react-router-dom";

import { MdArrowBackIos } from 'react-icons/md';  
import Modals from "../../components/Modals/OrderModal";



export default function ReportMore() {

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
              <h5>Reports</h5>
            </div>
          </div>
        </div>


        <div className={`${st.pageWrapperInside}`}>
          <Card>
            <Card.Body className={`${cx.cardBody}`}>
                <Row>
                  <Col lg={3}>
                    <NavLink to="/reports/report-more/taxes" className={`${cx.moreOption}`}>
                    Taxes
                    </NavLink>
                  </Col>
                  <Col lg={3}>
                    <NavLink to="/reports/report-more/tips" className={`${cx.moreOption}`}>
                    Tips
                    </NavLink>
                  </Col>
                  <Col lg={3}>
                    <NavLink to="/reports/report-more/gift-cards" className={`${cx.moreOption}`}>
                    Gift Cards 
                    </NavLink>
                  </Col>
                  <Col lg={3}>
                    <NavLink to="/reports/report-more/business-days" className={`${cx.moreOption}`}>
                    Business Days
                    </NavLink>
                  </Col>
                  <Col lg={3}>
                    <NavLink to="/reports/report-more/shifts" className={`${cx.moreOption}`}>
                    Shifts
                    </NavLink>
                  </Col>
                  <Col lg={3}>
                    <NavLink to="/reports/report-more/tills" className={`${cx.moreOption}`}>
                    Tills
                    </NavLink>
                  </Col>
                  <Col lg={3}>
                    <NavLink to="/reports/report-more/drawer-operations" className={`${cx.moreOption}`}>
                    Drawer Operations
                    </NavLink>
                  </Col>
                  <Col lg={3}>
                    <NavLink to="/reports/report-more/void-returns" className={`${cx.moreOption}`}>
                    Voids & Returns
                    </NavLink>
                  </Col>
                  <Col lg={3}>
                    <NavLink to="/reports/report-more/purchase-order" className={`${cx.moreOption}`}>
                    Purchase Orders
                    </NavLink>
                  </Col>
                  <Col lg={3}>
                    <NavLink to="/reports/report-more/transfer-order" className={`${cx.moreOption}`}>
                    Transfer Orders
                    </NavLink>
                  </Col>
                  <Col lg={3}>
                    <NavLink to="/reports/report-more/transfer" className={`${cx.moreOption}`}>
                    Transfers   
                    </NavLink>
                  </Col>
                  <Col lg={3}>
                    <NavLink to="/reports/report-more/purchasing" className={`${cx.moreOption}`}>
                    Purchasing  
                    </NavLink>
                  </Col>
                  <Col lg={3}>
                    <NavLink to="/reports/report-more/cost-adjustmenthistory" className={`${cx.moreOption}`}>
                    Cost Adjustment History
                    </NavLink>
                  </Col>
                  <Col lg={3}>
                    <NavLink to="/reports/report-more/product-cost" className={`${cx.moreOption}`}>
                    Product Cost
                    </NavLink>
                  </Col>
                  <Col lg={3}>
                    <NavLink to="/reports/report-more/modifer-option" className={`${cx.moreOption}`}>
                    Modifier Options Cost
                    </NavLink>
                  </Col>
                  <Col lg={3}>
                    <NavLink to="/reports/report-more/inventoryitem-cost" className={`${cx.moreOption}`}>
                    Inventory Items Cost
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

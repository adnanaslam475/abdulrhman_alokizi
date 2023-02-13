import React, { useCallback, useState } from "react";
import st from "../../style.module.scss";
import "bootstrap/dist/css/bootstrap.min.css";
import cx from "./Inventorymore.module.scss";
import table from "../../datatable.module.scss";
import { Card, Button, Row, Table, Col, Modal, Form, Dropdown } from "react-bootstrap";
import icon4 from "../../images/icon-printer.svg";
import { NavLink } from "react-router-dom";

import { MdArrowBackIos } from 'react-icons/md';
import Modals from "../../components/Modals/OrderModal";



export default function Inventorymore() {

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
              <h5>Inventory</h5>
            </div>
          </div>
        </div>


        <div className={`${st.pageWrapperInside}`}>
          <Card>
            <Card.Body className={`${cx.cardBody}`}>
                <Row>
                  <Col lg={3}>
                    <NavLink to="/inventory/quantity-adjustment" className={`${cx.moreOption}`}>
                    Quantity Adjustment
                    </NavLink>
                  </Col>
                  <Col lg={3}>
                    <NavLink to="/inventory/cost-adjustment" className={`${cx.moreOption}`}>
                    Cost Adjustment
                    </NavLink>
                  </Col>
                  <Col lg={3}>
                    <NavLink to="/inventory/order-transaction" className={`${cx.moreOption}`}>
                    Order Transactions
                    </NavLink>
                  </Col>
                  <Col lg={3}>
                    <NavLink to="/inventory/inventory-categories" className={`${cx.moreOption}`}>
                    Inventory Categories
                    </NavLink>
                  </Col>
                  <Col lg={3}>
                    <NavLink to="/inventory/inventory-warehouses" className={`${cx.moreOption}`}>
                    Warehouses
                    </NavLink>
                  </Col>
                  <Col lg={3}>
                    <NavLink to="/inventory/inventory-spotcheck" className={`${cx.moreOption}`}>
                    Inventory Spot Check
                    </NavLink>
                  </Col>
                  <Col lg={3}>
                    <NavLink to="/inventory/inventory-countsheet" className={`${cx.moreOption}`}>
                    Count Sheet
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

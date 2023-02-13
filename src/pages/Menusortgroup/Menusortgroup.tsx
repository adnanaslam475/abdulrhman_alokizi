import React, { useCallback, useState } from "react";
import st from "../../style.module.scss";
import "bootstrap/dist/css/bootstrap.min.css";
import cx from "./Menusortgroup.module.scss";
import table from "../../datatable.module.scss";
import { Card, Button, Row, Table, Col, Modal, Form, Dropdown } from "react-bootstrap";
import icon4 from "../../images/icon-printer.svg";

import icon5 from "../../images/icon-duplicate.svg";
import { NavLink } from "react-router-dom";

import { MdArrowBackIos, MdDeleteOutline, MdOutlineDelete } from 'react-icons/md';
import Modals from "../../components/Modals/InventoryCountsheetM";
import { AiOutlinePrinter } from "react-icons/ai";
import { FiEdit } from "react-icons/fi";



export default function Menusortgroup() {

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
          <NavLink to="/menu/groups/:id" className={`${st.backBtn}`}>
            <MdArrowBackIos className={`${st.icon}`} /> Back
          </NavLink>
          <div className={`${st.pageTitleRow}`}>
            <div className={`${st.rowTitleLeft}`}>
              <h5>Sort جبن اصفر</h5>
            </div>
          </div>
        </div>


        <div className={`${st.pageWrapperInside} ${cx.setWidth}`}>
          <Card>
            <Card.Body className={`${cx.cardBody}`}>
              <Row>
                <Col md={3}>
                  <div className={`${cx.contentBox} ${cx.countCardBox}`}>
                    <p>بارتي فرايز - 1</p>
                  </div>
                </Col>
                <Col md={3}>
                  <div className={`${cx.contentBox} ${cx.countCardBox}`}>
                    <p>بارتي فرايز - 1</p>
                  </div>
                </Col>
                <Col md={3}>
                  <div className={`${cx.contentBox} ${cx.countCardBox}`}>
                    <p>بارتي فرايز - 1</p>
                  </div>
                </Col>
                <Col md={3}>
                  <div className={`${cx.contentBox} ${cx.countCardBox}`}>
                    <p>بارتي فرايز - 1</p>
                  </div>
                </Col>
                <Col md={3}>
                  <div className={`${cx.contentBox} ${cx.countCardBox}`}>
                    <p>بارتي فرايز - 1</p>
                  </div>
                </Col>
                <Col md={3}>
                  <div className={`${cx.contentBox} ${cx.countCardBox}`}>
                    <p>بارتي فرايز - 1</p>
                  </div>
                </Col>
                <Col md={3}>
                  <div className={`${cx.contentBox} ${cx.countCardBox}`}>
                    <p>بارتي فرايز - 1</p>
                  </div>
                </Col>
                <Col md={3}>
                  <div className={`${cx.contentBox} ${cx.countCardBox}`}>
                    <p>بارتي فرايز - 1</p>
                  </div>
                </Col>
                <Col md={3}>
                  <div className={`${cx.contentBox} ${cx.countCardBox}`}>
                    <p>بارتي فرايز - 1</p>
                  </div>
                </Col>

                <Col md={3}>
                  <div className={`${cx.contentBox} ${cx.countCardBox}`}>
                    <p>بارتي فرايز - 1</p>
                  </div>
                </Col>
                <Col md={3}>
                  <div className={`${cx.contentBox} ${cx.countCardBox}`}>
                    <p>بارتي فرايز - 1</p>
                  </div>
                </Col>
                <Col md={3}>
                  <div className={`${cx.contentBox} ${cx.countCardBox}`}>
                    <p>بارتي فرايز - 1</p>
                  </div>
                </Col>
                <Col md={3}>
                  <div className={`${cx.contentBox} ${cx.countCardBox}`}>
                    <p>بارتي فرايز - 1</p>
                  </div>
                </Col>
                <Col md={3}>
                  <div className={`${cx.contentBox} ${cx.countCardBox}`}>
                    <p>بارتي فرايز - 1</p>
                  </div>
                </Col>
                <Col md={3}>
                  <div className={`${cx.contentBox} ${cx.countCardBox}`}>
                    <p>بارتي فرايز - 1</p>
                  </div>
                </Col>
                <Col md={3}>
                  <div className={`${cx.contentBox} ${cx.countCardBox}`}>
                    <p>بارتي فرايز - 1</p>
                  </div>
                </Col>
                <Col md={3}>
                  <div className={`${cx.contentBox} ${cx.countCardBox}`}>
                    <p>بارتي فرايز - 1</p>
                  </div>
                </Col>
                <Col md={3}>
                  <div className={`${cx.contentBox} ${cx.countCardBox}`}>
                    <p>بارتي فرايز - 1</p>
                  </div>
                </Col>
                <Col md={3}>
                  <div className={`${cx.contentBox} ${cx.countCardBox}`}>
                    <p>بارتي فرايز - 1</p>
                  </div>
                </Col>
                <Col md={3}>
                  <div className={`${cx.contentBox} ${cx.countCardBox}`}>
                    <p>بارتي فرايز - 1</p>
                  </div>
                </Col>
                <Col md={3}>
                  <div className={`${cx.contentBox} ${cx.countCardBox}`}>
                    <p>بارتي فرايز - 1</p>
                  </div>
                </Col>
                <Col md={3}>
                  <div className={`${cx.contentBox} ${cx.countCardBox}`}>
                    <p>بارتي فرايز - 1</p>
                  </div>
                </Col>
                <Col md={3}>
                  <div className={`${cx.contentBox} ${cx.countCardBox}`}>
                    <p>بارتي فرايز - 1</p>
                  </div>
                </Col>
                <Col md={3}>
                  <div className={`${cx.contentBox} ${cx.countCardBox}`}>
                    <p>بارتي فرايز - 1</p>
                  </div>
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

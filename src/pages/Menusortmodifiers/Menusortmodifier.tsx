import React, { useCallback, useState } from "react";
import st from "../../style.module.scss";
import "bootstrap/dist/css/bootstrap.min.css";
import cx from "./Menusortmodifier.module.scss";
import table from "../../datatable.module.scss";
import { Card, Button, Row, Table, Col, Modal, Form, Dropdown } from "react-bootstrap";
import icon4 from "../../images/icon-printer.svg";
import { NavLink } from "react-router-dom";

import { MdArrowBackIos } from 'react-icons/md';
import Modals from "../../components/Modals/MenuModifiersM";



export default function Menusortmodifier() {

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
          <NavLink to="/menu/modifiers" className={`${st.backBtn}`}>
            <MdArrowBackIos className={`${st.icon}`} /> Back
          </NavLink>
          <div className={`${st.pageTitleRow}`}>
            <div className={`${st.rowTitleLeft}`}>
              <h5>Sort Modifier</h5>
            </div>
          </div>
        </div>


        <div className={`${st.pageWrapperInside}`}>
          <Card>
            <Card.Body className={`${cx.cardBody}`}>
                <Row>
                  <Col lg={3}>
                    <NavLink to="#" className={`${cx.moreOption}`}
                    onClick={() => {
                  handleShow("sort modifier", true);
                }}>
                    deve
                    </NavLink>
                  </Col>
                  <Col lg={3}>
                    <NavLink to="#" className={`${cx.moreOption}`}
                    onClick={() => {
                  handleShow("sort modifier", true);
                }}>
                    صوصات
                    </NavLink>
                  </Col>
                  <Col lg={3}>
                    <NavLink to="#" className={`${cx.moreOption}`}
                    onClick={() => {
                  handleShow("sort modifier", true);
                }}>
                   جبن
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

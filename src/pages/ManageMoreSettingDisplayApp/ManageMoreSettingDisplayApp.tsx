import React, { useCallback, useState } from "react";
import st from "../../style.module.scss";
import "bootstrap/dist/css/bootstrap.min.css";
import cx from "./ManageMoreSettingDisplayApp.module.scss";
import cy from "../../components/Modals/Modals.module.scss";
import {
  Card,
  Button,
  Row,
  Table,
  Col,
  Modal,
  Form,
  Tooltip,
  OverlayTrigger,
} from "react-bootstrap";
import NavLink from "react-bootstrap";

import { AiFillInfoCircle, AiOutlineInfoCircle } from "react-icons/ai";
import { FilterDropdown } from "../../components/Dropdown/Dropdowns";
import { timeFilter ,mainlocalize,languagetag,reportsfilterordertags} from "../../constants/dropdownconstants";



export default function ManageMoreSettingDisplayApp() {
  return (
    <>
      <section className={`${st.pageWrapper}`}>
        <div className={`${st.pageWrapperInside} ${st.setWidth}`}>
          <Card>
            <Card.Body className={`${cx.cardBody}`}>
              <div className={`${cx.pageTitle}`}>
                <div className={`${cx.rowTitleLeft}`}>
                  <h5>Display App Settings </h5>
                </div>
              </div>

              <div className={`${cx.contentBox}`}>
                <Row>
                  <Col md={12} lg={12}>
                    <Form.Group className={`${cy.formField}`}>
                      <Form.Label  className={`${cy.cameraiconfleld}`}>
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 20 20"
                          className={`${cy.cameraicon}`}
                        >
                          <path d="M0 6c0-1.1.9-2 2-2h3l2-2h6l2 2h3a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V6zm10 10a5 5 0 1 0 0-10 5 5 0 0 0 0 10zm0-2a3 3 0 1 1 0-6 3 3 0 0 1 0 6z"></path>
                        </svg>
                        <div className={`${cx.fileinput}`}>
                            <h4> Upload Background </h4>
                            <input type="file" />
                        </div>
                      </Form.Label>
                    </Form.Group>
                  </Col>
                </Row>
                <Modal.Footer  className= {`${cy.bottomRight}`}>
            <div>
              <Button className={`${cx.saveBtn}`}>Save Changes </Button>
            </div>
          </Modal.Footer>

              </div>
            </Card.Body>
          </Card>
        </div>
      </section>
    </>
  );
}

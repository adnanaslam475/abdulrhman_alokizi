import React, { useCallback, useState } from "react";
import st from "../../style.module.scss";
import "bootstrap/dist/css/bootstrap.min.css";
import cx from "./ManageRoles.module.scss";
import table from "../../datatable.module.scss";
import {
  Card,
  Button,
  Row,
  Table,
  Col,
  Modal,
  Form,
  Dropdown,
} from "react-bootstrap";
import icon4 from "../../images/icon-printer.svg";
import { NavLink } from "react-router-dom";

import { MdArrowBackIos } from "react-icons/md";

import Modals from "../../components/Modals/ManageRolesM";

import { ActionDropdown } from "./Dropdowns";

export default function ManageRoles() {
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
              <h5>Roles</h5>
            </div>
            <div className={`${st.rowTitleRight}`}>
              <button
                className={`btn ${st.themeBtn}`}
                onClick={() => {
                  handleShow("Create role", true);
                }}
              >
                Create Role
              </button>
            </div>
          </div>
        </div>

        <div className={`${st.pageWrapperInside}`}>
          <Card>
            <Card.Body className={`${cx.cardBody}`}>
              <Row>
                <Col lg={3}>
                  <div className={`${cx.moreOption}`}>
                    <div
                      className={`${cx.usermore}`}
                      onClick={() => {
                        handleShow("Edit role", true);
                      }}
                    >
                      <div>sadf</div>
                      <div className={`${cx.editRole}`}>User (3)</div>
                    </div>

                    <div className={`${st.moreroles}`}>
                      <ActionDropdown />
                    </div>
                  </div>
                </Col>
                <Col lg={3}>
                  <div className={`${cx.moreOption}`}>
                    <div
                      className={`${cx.usermore}`}
                      onClick={() => {
                        handleShow("Edit role", true);
                      }}
                    >
                      <div>call الفرع</div>
                      <div className={`${cx.editRole}`}>User (3)</div>
                    </div>

                    <div className={`${st.moreroles}`}>
                      <ActionDropdown />
                    </div>
                  </div>
                </Col>
                <Col lg={3}>
                  <div className={`${cx.moreOption}`}>
                    <div
                      className={`${cx.usermore}`}
                      onClick={() => {
                        handleShow("Edit role", true);
                      }}
                    >
                      <div>call الفرع</div>
                      <div className={`${cx.editRole}`}>User (3)</div>
                    </div>

                    <div className={`${st.moreroles}`}>
                      <ActionDropdown />
                    </div>
                  </div>
                </Col>
                <Col lg={3}>
                  <div className={`${cx.moreOption}`}>
                    <div
                      className={`${cx.usermore}`}
                      onClick={() => {
                        handleShow("Edit role", true);
                      }}
                    >
                      <div>call الفرع</div>
                      <div className={`${cx.editRole}`}>User (3)</div>
                    </div>

                    <div className={`${st.moreroles}`}>
                      <ActionDropdown />
                    </div>
                  </div>
                </Col>
                <Col lg={3}>
                  <div className={`${cx.moreOption}`}>
                    <div
                      className={`${cx.usermore}`}
                      onClick={() => {
                        handleShow("Edit role", true);
                      }}
                    >
                      <div>الماليه</div>
                      <div className={`${cx.editRole}`}>User (3)</div>
                    </div>

                    <div className={`${st.moreroles}`}>
                      <ActionDropdown />
                    </div>
                  </div>
                </Col>
                <Col lg={3}>
                  <div className={`${cx.moreOption}`}>
                    <div
                      className={`${cx.usermore}`}
                      onClick={() => {
                        handleShow("Edit role", true);
                      }}
                    >
                      <div>KDS</div>
                      <div className={`${cx.editRole}`}>User (3)</div>
                    </div>

                    <div className={`${st.moreroles}`}>
                      <ActionDropdown />
                    </div>
                  </div>
                </Col>
                <Col lg={3}>
                  <div className={`${cx.moreOption}`}>
                    <div
                      className={`${cx.usermore}`}
                      onClick={() => {
                        handleShow("Edit role", true);
                      }}
                    >
                      <div>ويتر</div>
                      <div className={`${cx.editRole}`}>User (3)</div>
                    </div>

                    <div className={`${st.moreroles}`}>
                      <ActionDropdown />
                    </div>
                  </div>
                </Col>
                <Col lg={3}>
                  <div className={`${cx.moreOption}`}>
                    <div
                      className={`${cx.usermore}`}
                      onClick={() => {
                        handleShow("Edit role", true);
                      }}
                    >
                      <div>1ويتر</div>
                      <div className={`${cx.editRole}`}>User (3)</div>
                    </div>

                    <div className={`${st.moreroles}`}>
                      <ActionDropdown />
                    </div>
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

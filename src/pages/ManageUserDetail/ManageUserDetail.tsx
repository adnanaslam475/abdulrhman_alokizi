import React, { useCallback, useState } from "react";
import st from "../../style.module.scss";
import "bootstrap/dist/css/bootstrap.min.css";
import cx from "./ManageUserDetail.module.scss";
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
import { MdArrowBackIos } from "react-icons/md";
import notification from "../../images/notification.svg";
import lock from "../../images/lock.svg";

import { NavLink } from "react-router-dom";

import Modals from "../../components/Modals/ManageUsersM";
import { TableBody, TableCell, TableHead } from "@mui/material";

export default function ManageUserDetail() {
  const [show, setShow] = useState(false);
  const [modalName, setModalName] = useState("");

  const handleShow = (modalname: string, status: boolean) => {
    // console.log(modalname, status, "handleShow");
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
          <NavLink to="/manage/users" className={`${st.backBtn}`}>
            <MdArrowBackIos className={`${st.icon}`} /> Back
          </NavLink>
          <div className={`${st.pageTitleRow}`}>
            <div className={`${st.rowTitleLeft}`}>
              <h5>GM</h5>
            </div>
            <div className={`${st.rowTitleRight}`}>
              <button
                className={`btn `}
                onClick={() => {
                  handleShow("notificaion", true);
                }}
              >
                <img src={notification} className={`${st.icon}`} />
                Notifications
              </button>

              <button
                className={`btn`}
                onClick={() => {
                  handleShow("change Password", true);
                }}
              >
                <img src={lock} className={`${st.icon}`} />
                Change Password
              </button>
              <button
                className={`btn ${st.themeBtn}`}
                onClick={() => {
                  handleShow("edit user", true);
                }}
              >
                Edit user
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
                    <label>Name</label>
                    <p>Gm</p>
                  </Col>
                  <Col lg={6} className={`${cx.formField}`}>
                    <label>Email </label>
                    <p>ahmed-nemri@hey-f.com </p>
                  </Col>
                  <Col lg={6} className={`${cx.formField}`}>
                    <label>Employee Number </label>
                    <p>-</p>
                  </Col>
                  <Col lg={6} className={`${cx.formField}`}>
                    <label>Phone</label>
                    <p>-</p>
                  </Col>
                  <Col lg={6} className={`${cx.formField}`}>
                    <label>Display Localized Names</label>
                    <p>NO</p>
                  </Col>
                  <Col lg={6} className={`${cx.formField}`}>
                    <label>Email Verified</label>
                    <p>NO</p>
                  </Col>

                  <Col lg={6} className={`${cx.formField}`}>
                    <label>Last Console Login </label>
                    <p>-</p>
                  </Col>
                </Row>
              </div>

              <div className={`${cx.pageTitle}`}>
                <div className={`${cx.rowTitleLeft}`}>
                  <h5>Roles</h5>
                </div>
                <div className={`${cx.rowTitleRight}`}>
                  <button
                    className={`btn`}
                    type="button"
                    // onClick={() => {
                    //   handleShow("manage add tags", true);
                    // }}
                  >
                    Edit Role
                  </button>
                </div>
              </div>
              <div className={`${cx.contentBox}`}>
                <Row>
                  <Col lg={12} className={`${cx.formField}`}>
                    <label>Name</label>
                    <p></p>
                  </Col>
                  <Col lg={12} className={`${cx.formField}`}>
                    <label>Staff </label>
                    <p></p>
                  </Col>
                  <Col lg={12} className={`${cx.formField}`}>
                    <label>HRD </label>
                    <p></p>
                  </Col>
                  <Col lg={12} className={`${cx.formField}`}>
                    <label>Call Center</label>
                    <p></p>
                  </Col>
                  <Col lg={12} className={`${cx.formField}`}>
                    <label>Help Desk</label>
                    <p></p>
                  </Col>
                </Row>
              </div>

              <div className={`${cx.pageTitle}`}>
                <div className={`${cx.rowTitleLeft}`}>
                  <h5>Branches</h5>
                </div>
                <div className={`${cx.rowTitleRight}`}>
                  <button
                    className={`btn`}
                    // onClick={() => {
                    //   handleShow("products add tags", true);
                    // }}
                  >
                    Edit Branches
                  </button>
                </div>
              </div>
              <div className={`${cx.contentBox}`}>
                <Table>
                  <TableHead>
                    <TableCell> Name</TableCell>
                    <TableCell> Reference</TableCell>
                  </TableHead>
                  <TableBody>
                    <TableCell> Mall 1</TableCell>
                    <TableCell> B10</TableCell>
                  </TableBody>
                </Table>
              </div>

              <div className={`${cx.pageTitle}`}>
                <div className={`${cx.rowTitleLeft}`}>
                  <h5>Roles</h5>
                </div>
                <div className={`${cx.rowTitleRight}`}>
                  <button
                    className={`btn`}
                    onClick={() => {
                      handleShow("manage add tags", true);
                    }}
                  >
                    + Add Tags
                  </button>
                </div>
              </div>
              <div className={`${cx.contentBox}`}>
                <div className={`p-4 text-center ${table.noData}`}>
                  You can add tags to this order for reporting or filtering
                  orders later.
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

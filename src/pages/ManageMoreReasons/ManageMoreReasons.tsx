import React, { useCallback, useState } from "react";
import st from "../../style.module.scss";
import "bootstrap/dist/css/bootstrap.min.css";
import cx from "./ManageMoreReasons.module.scss";
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
import iconsetting from "../../images/iconsetting.svg";
import { NavLink } from "react-router-dom";

import { MdArrowBackIos } from "react-icons/md";
import Modals from "../../components/Modals/ManageMoreReasonsM";

export default function ManageMoreReasons() {
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
              <h5>Reasons </h5>
            </div>
          </div>
        </div>

        <div className={`${st.pageWrapperInside} ${st.setWidth}`}>
          <Card>
            <Card.Body className={`${cx.cardBody}`}>
              <div className={`${cx.pageTitle}`}>
                <div className={`${cx.rowTitleLeft}`}>
                  <h5>Void and Return Reason </h5>
                </div>
                <div className={`${cx.rowTitleRight}`}>
                  <button
                    className={`btn`}
                    onClick={() => {
                      handleShow("Create void and return reason", true);
                    }}
                  >
                    Create Reason
                  </button>
                </div>
              </div>

              <div className={`${cx.contentBox}`}>
                <div className={`table-responsive`}>
                  <Table className={`${table.tableCt} ${cx.tableCt}`}>
                    <tbody>
                      <tr
                        onClick={() => {
                          handleShow("Edit reason", true);
                        }}
                      >
                        <td>hayat mall</td>
                      </tr>
                      <tr
                        onClick={() => {
                          handleShow("Edit reason", true);
                        }}
                      >
                        <td>lolla</td>
                      </tr>
                      <tr
                        onClick={() => {
                          handleShow("Edit reason", true);
                        }}
                      >
                        <td>Customer Cancelled </td>
                      </tr>
                      <tr
                        onClick={() => {
                          handleShow("Edit reason", true);
                        }}
                      >
                        <td>Product Not Avilable</td>
                      </tr>
                    </tbody>
                  </Table>
                </div>
              </div>

              <div className={`${cx.pageTitle}`}>
                <div className={`${cx.rowTitleLeft}`}>
                  <h5>Quantity Adjustment Reason</h5>
                </div>
                <div className={`${cx.rowTitleRight}`}>
                  <button className={`btn`}>Create Reason</button>
                </div>
              </div>

              <div className={`${cx.contentBox}`}>
                <div className={`table-responsive`}>
                  <Table className={`${table.tableCt} ${cx.tableCt}`}>
                    <tbody>
                      <tr>
                        <td>Waste </td>
                      </tr>
                      <tr>
                        <td>Expired </td>
                      </tr>
                    </tbody>
                  </Table>
                </div>
              </div>

              <div className={`${cx.pageTitle}`}>
                <div className={`${cx.rowTitleLeft}`}>
                  <h5>Drawer Operation Reason</h5>
                </div>
                <div className={`${cx.rowTitleRight}`}>
                  <button className={`btn`}>Create Reason</button>
                </div>
              </div>

              <div className={`${cx.contentBox}`}>
                <div className={`table-responsive`}>
                  <Table className={`${table.tableCt} ${cx.tableCt}`}>
                    <tbody>
                      <tr>
                        <td>Waste </td>
                      </tr>
                    </tbody>
                  </Table>
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

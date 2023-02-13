import React, { useCallback, useState } from "react";
import st from "../../style.module.scss";
import "bootstrap/dist/css/bootstrap.min.css";
import cx from "./ManageDeviceDetails.module.scss";
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
// import icon4 from "../../images/icon-printer.svg";
import copy from "../../images/copy.svg";
import iconsetting from "../../images/iconsetting.svg";
import { NavLink } from "react-router-dom";

import { MdArrowBackIos } from "react-icons/md";
import Modals from "../../components/Modals/ManageDevicesM";

export default function ManageDeviceDetails() {
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
          <NavLink to="/manage/devices" className={`${st.backBtn}`}>
            <MdArrowBackIos className={`${st.icon}`} /> Back
          </NavLink>
          <div className={`${st.pageTitleRow}`}>
            <div className={`${st.rowTitleLeft}`}>
              <h5>test2</h5>
            </div>
            <div className={`${st.rowTitleRight}`}>
              <button className={`btn`}  
              onClick={() => {
                handleShow("copy settings", true);
              }}
              >
                <img src={copy} className={`${st.icon}`} />
                Copy Settings
              </button>
              <button className={`btn`}  
              onClick={() => {
                handleShow("edit devices settings", true);
              }}
              >
                <img src={iconsetting} className={`${st.icon}`} />
                Device Settings
              </button>
              <button
                className={`btn ${st.themeBtn}`}
                onClick={() => {
                  handleShow("edit devices", true);
                }}
              >
                Edit Devices
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
                    <label>Reference</label>
                    <p>C11</p>
                  </Col>
                  <Col lg={6} className={`${cx.formField}`}>
                    <label>Type </label>
                    <p>Cashier</p>
                  </Col>
                  <Col lg={6} className={`${cx.formField}`}>
                    <label>Branch</label>
                    <p>فرع الاحساء</p>
                  </Col>
                  <Col lg={6} className={`${cx.formField}`}>
                    <label>Model </label>
                    <p>-</p>
                  </Col>
                  <Col lg={6} className={`${cx.formField}`}>
                    <label>App Version</label>
                    <p>-</p>
                  </Col>
                  <Col lg={6} className={`${cx.formField}`}>
                    <label>System Version </label>
                    <p>No </p>
                  </Col>

                  <Col lg={6} className={`${cx.formField}`}>
                    <label>Menu  Group</label>
                    <p>-</p>
                  </Col>
                  <Col lg={6} className={`${cx.formField}`}>
                    <label>Receives Online Orders</label>
                    <p>-</p>
                  </Col>
                  <Col lg={6} className={`${cx.formField}`}>
                    <label>Last Sync </label>
                    <p>-</p>
                  </Col>
                  <Col lg={6} className={`${cx.formField}`}>
                    <label>Last Online</label>
                    <p>-</p>
                  </Col>
                  <Col lg={6} className={`${cx.formField}`}>
                    <label>Last Order</label>
                    <p>-</p>
                  </Col>
                </Row>
              </div>

              <div className={`${cx.pageTitle}`}>
                <div className={`${cx.rowTitleLeft}`}>
                  <h5>Tags</h5>
                </div>
                <div className={`${cx.rowTitleRight}`}>
                  <button
                    className={`btn`}
                    onClick={() => {
                      handleShow("device detail add tags", true);
                    }}
                  >
                    + Add Tags
                  </button>
                </div>
              </div>
              <div className={`${cx.contentBox}`}>
                <div className={`p-4 text-center ${table.noData}`}>
                Add tags to help you filter and group devices easily. You can create tags such as Main Cashier, Waiter, etc.
                </div>
              </div>
              <div className={`${cx.pageTitle}`}>
                <div className={`${cx.rowTitleLeft}`}>
                  <h5>Delete Device </h5>
                </div>
              </div>
              <div className={` ${cx.contentBox} ${cx.deleteBranchSec}`}>
                <div className={`p-4 text-center ${table.noData}`}>
                Make sure all active orders are uploaded. You will lose all data on the device if you delete it!
                </div>
                <div>
                  <button className={` ${cx.deleteBranchbtn}`}>
                    Delete Branch
                  </button>
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

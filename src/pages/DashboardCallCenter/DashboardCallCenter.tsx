import React, { useCallback, useState } from "react";
import st from "../../style.module.scss";
import "bootstrap/dist/css/bootstrap.min.css";
import cx from "./DashboardCallCenter.module.scss";
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

import { Branches, BusinessDate,  ActionDropdown } from "./Dropdowns";
import Modals from "../../components/Modals/DashboardM";

export default function DashboardCallCenter() {
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
    <Row className={`${st.dashboardCallVCenter}`}>
        <div className={`${cx.pageTitle}`}>
          <div className={`${cx.rowTitleLeft}`}></div>
          <div className={`${cx.rowTitleRight}`}>
          <Branches />
            <button className={`btn`}> Day</button>
            <button className={`btn`}> Week</button>
            <button className={`btn`}> Month</button>

            <BusinessDate />
          </div>
          </div>
          </Row>
              <Row>
                <Col lg={4}>
                  <div className={`${cx.discountmore} ${cx.moreOption}`}>
                    <div>Active Orders </div>
                    <div className={`${cx.discountmoreper}`}> 0</div>
                  </div>
                </Col>

                <Col lg={4}>
                  <div className={`${cx.discountmore} ${cx.moreOption}`}>
                    <div>Done Orders </div>
                    <div className={`${cx.discountmoreper}`}>0</div>
                  </div>
                </Col>

                <Col lg={4}>
                  <div className={`${cx.discountmore} ${cx.moreOption}`}>
                    <div>Net Sales </div>
                    <div className={`${cx.discountmoreper}`}> 0 </div>
                  </div>
                </Col>
              </Row>
        

          <div className={`${cx.pageTitle}`}>
            <div className={`${cx.rowTitleLeft}`}>
              <b>Items Reached Low Level</b>
            </div>
          </div>
          <div className={`${cx.contentBox}`}>
            <div className={`p-4 text-center `}>
              <p>
                Analytics about agents performance and order taking time will
                appear here!
              </p>
            </div>
          </div>

          <div className={`${cx.pageTitle}`}>
            <div className={`${cx.rowTitleLeft}`}>
              <b>Branches Stats</b>
            </div>
          </div>
          <div className={`${cx.contentBox}`}>
            <div className={`p-4 text-center `}>
              Analytics about your branches will appear here!
            </div>
          </div>
     

      <Modals show={show} handleClose={handleClose} modalName={modalName} />
    </>
  );
}

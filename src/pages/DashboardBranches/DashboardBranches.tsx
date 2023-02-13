import React, { useCallback, useState } from "react";
import st from "../../style.module.scss";
import "bootstrap/dist/css/bootstrap.min.css";
import cx from "./DashboardBranches.module.scss";
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

import iconFilter from "../../images/icon-filter.svg";
import iconClose from "../../images/icon-close.svg";
import { NavLink } from "react-router-dom";

import { MdArrowBackIos } from "react-icons/md";

import Modals from "../../components/Modals/DashboardM";

export default function DashboardBranches() {
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
              <Row>
              <div className={`${cx.pageTitle}`}>
          <div className={`${cx.rowTitleLeft}`}></div>
          <div className={`${cx.rowTitleRight}`}>
            <button
              className={`btn`}
              onClick={() => {
                handleShow("Dashboard Branches Filter", true);
              }}
            ><img src={iconFilter} className={`mx-1 ${st.icon}`} />
               Filters
            </button>
          </div>
        </div>
              </Row>
              <Row>
                <Col lg={3}>
                  <div className={`${cx.discountmore} ${cx.moreOption}`}>
                    <div>Active orders Count </div>
                    <div className={`${cx.discountmoreper}`}> 368</div>
                  </div>
                </Col>

                <Col lg={3}>
                  <div className={`${cx.discountmore} ${cx.moreOption}`}>
                    <div>Active orders Count</div>
                    <div className={`${cx.discountmoreper}`}>
                      {" "}
                      SAR 66,158.90{" "}
                    </div>
                  </div>
                </Col>

                <Col lg={3}>
                  <div className={`${cx.discountmore} ${cx.moreOption}`}>
                    <div>Occupied Tables</div>
                    <div className={`${cx.discountmoreper}`}> 7 </div>
                  </div>
                </Col>

                <Col lg={3}>
                  <div className={`${cx.discountmore} ${cx.moreOption}`}>
                    <div>Offline Cashiers</div>
                    <div className={`${cx.discountmoreper}`}> 9</div>
                  </div>
                </Col>
              </Row>
            

          <div className={`${cx.pageTitle}`}>
            <div className={`${cx.rowTitleLeft}`}>
              <b>Branches Statistics</b>
            </div>
          </div>
          <div className={`${cx.contentBox}`}>
            <div className={`table-responsive`}>
              <Table className={`${table.tableCt} ${cx.tableCt}`}>
                <thead>
                  <tr>
                    <th>Branch</th>
                    <th>Active Orders</th>
                    <th>Active Orders Amount </th>
                    <th>Occupied Tables</th>
                    <th>Offline Cashiers</th>
                    <th>Open Tills</th>
                    <th>Last Sync</th>
                    <th>LAST Order</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>فرع الاحساء (B01)</td>
                    <td>368</td>
                    <td>SAR 66,158.90</td>
                    <td>	7/64</td>
                    <td>	9/9</td>
                    <td>15</td>
                    <td>September 18, 04:54pm</td>
                    <td>december 25, 04:54pm</td>
                  </tr>
                </tbody>
              </Table>
            </div>
          </div>
     

      <Modals show={show} handleClose={handleClose} modalName={modalName} />
    </>
  );
}

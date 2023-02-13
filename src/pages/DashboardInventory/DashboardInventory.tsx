import React, { useCallback, useState } from "react";
import st from "../../style.module.scss";
import "bootstrap/dist/css/bootstrap.min.css";
import cx from "./DashboardInventory.module.scss";
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
import { NavLink } from "react-router-dom";

import { MdArrowBackIos } from "react-icons/md";

import Modals from "../../components/Modals/DashboardM";

export default function DashboardInvetory() {
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
            >
              <img src={iconFilter} className={`${st.icon} mx-1`} />
              Filters
              
            </button>
          </div>
          </div>
          </Row>
              <Row>
                <Col lg={4}>
                  <div className={`${cx.discountmore} ${cx.moreOption}`}>
                    <div>Purchase Orders </div>
                    <div className={`${cx.discountmoreper}`}> 0</div>
                  </div>
                </Col>

                <Col lg={4}>
                  <div className={`${cx.discountmore} ${cx.moreOption}`}>
                    <div>Completed Transfers</div>
                    <div className={`${cx.discountmoreper}`}>0</div>
                  </div>
                </Col>

                <Col lg={4}>
                  <div className={`${cx.discountmore} ${cx.moreOption}`}>
                    <div>Purchasing</div>
                    <div className={`${cx.discountmoreper}`}> 0 </div>
                  </div>
                </Col>
              </Row>
           

          <div className={`${cx.pageTitle}`}>
            <div className={`${cx.rowTitleLeft}`}>
              <b>Pending Transactions</b>
            </div>
          </div>
          <div className={`${cx.contentBox}`}>
            <div className={`table-responsive`}>
              <Table className={`${table.tableCt} ${cx.tableCt}`}>
                <thead>
                  <tr>
                    <th>Branch</th>
                    <th>Reference</th>
                    <th> </th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>فرع الاحساء (B01)</td>
                    <td>TRR-000025</td>
                    <td>
                      {" "}
                      <NavLink to="#" className={`text-decoration-none`}>
                        {" "}
                        View{" "}
                      </NavLink>{" "}
                    </td>
                  </tr>
                  <tr>
                    <td>فرع الاحساء (B01)</td>
                    <td>TRR-000025</td>
                    <td>
                      {" "}
                      <NavLink to="#" className={`text-decoration-none`}>
                        {" "}
                        View{" "}
                      </NavLink>{" "}
                    </td>
                  </tr>
                  <tr>
                    <td>فرع الاحساء (B01)</td>
                    <td>TRR-000025</td>
                    <td>
                      {" "}
                      <NavLink to="#" className={`text-decoration-none`}>
                        {" "}
                        View{" "}
                      </NavLink>{" "}
                    </td>
                  </tr>
                  <tr>
                    <td>Riyadh Warehouse W01 (W01)</td>
                    <td>TRR-000025</td>
                    <td>
                      {" "}
                      <NavLink to="#" className={`text-decoration-none`}>
                        {" "}
                        View{" "}
                      </NavLink>{" "}
                    </td>
                  </tr>
                  <tr>
                    <td>فرع الاحساء (B01)</td>
                    <td>TRR-000025</td>
                    <td>
                      {" "}
                      <NavLink to="#" className={`text-decoration-none`}>
                        {" "}
                        View{" "}
                      </NavLink>{" "}
                    </td>
                  </tr>
                  <tr>
                    <td>فرع الاحساء (B01)</td>
                    <td>TRR-000025</td>
                    <td>
                      {" "}
                      <NavLink to="#" className={`text-decoration-none`}>
                        {" "}
                        View{" "}
                      </NavLink>{" "}
                    </td>
                  </tr>
                  <tr>
                    <td>فرع الاحساء (B01)</td>
                    <td>TRR-000025</td>
                    <td>
                      {" "}
                      <NavLink to="#" className={`text-decoration-none`}>
                        {" "}
                        View{" "}
                      </NavLink>{" "}
                    </td>
                  </tr>
                  <tr>
                    <td>Riyadh Warehouse W01 (W01)</td>
                    <td>TRR-000025</td>
                    <td>
                      {" "}
                      <NavLink to="#" className={`text-decoration-none`}>
                        {" "}
                        View{" "}
                      </NavLink>{" "}
                    </td>
                  </tr>
                  <tr>
                    <td>فرع الاحساء (B01)</td>
                    <td>TRR-000025</td>
                    <td>
                      {" "}
                      <NavLink to="#" className={`text-decoration-none`}>
                        {" "}
                        View{" "}
                      </NavLink>{" "}
                    </td>
                  </tr>
                </tbody>
              </Table>
            </div>
          </div>

          <div className={`${cx.pageTitle}`}>
            <div className={`${cx.rowTitleLeft}`}>
              <b>Items Reached Low Level</b>
            </div>
          </div>
          <div className={`${cx.contentBox}`}>
            <div className={`table-responsive`}>
              <Table className={`${table.tableCt} ${cx.tableCt}`}>
                <thead>
                  <tr>
                    <th>Branch</th>
                    <th>Number of Items</th>
                    <th> Actions</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>Riyadh Warehouse W01</td>
                    <td>2</td>
                    <td>
                      {" "}
                      <NavLink to="#" className={`text-decoration-none`}>
                        {" "}
                        Recoder{" "}
                      </NavLink>{" "}
                    </td>
                  </tr>
                  <tr>
                    <td>فرع الاحساء</td>
                    <td>1</td>
                    <td>
                      {" "}
                      <NavLink to="#" className={`text-decoration-none`}>
                        {" "}
                        Recoder{" "}
                      </NavLink>{" "}
                    </td>
                  </tr>
                </tbody>
              </Table>
            </div>
          </div>

          <Row>
            <Col lg={6}><div className={`${cx.pageTitle}`}>
              <div className={`${cx.rowTitleLeft}`}>
                <b>Top Wasted Items by Cost (SAR)</b>
              </div>
            </div>
            <div className={`${cx.contentBox}`}>
              <div className={`text-center`} >Your most wasted items will appear here!</div>
            </div>
            </Col>
            <Col lg={6}>
            
            <div className={`${cx.pageTitle}`}>
              <div className={`${cx.rowTitleLeft}`}>
                <b>Top Consumed Items by Cost (SAR)</b>
              </div>
            </div>
            <div className={`${cx.contentBox}`}>
              <div  className={`text-center`}>Your most consumed items will appear here!</div>
            </div>
            </Col>
          </Row>
       

      <Modals show={show} handleClose={handleClose} modalName={modalName} />
    </>
  );
}

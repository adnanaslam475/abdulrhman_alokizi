import React, { useCallback, useState } from "react";
import st from "../../style.module.scss";
import "bootstrap/dist/css/bootstrap.min.css";
import cx from "./Managebranchesdetail.module.scss";
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
import { NavLink } from "react-router-dom";

import { MdArrowBackIos } from "react-icons/md";
import Modals from "../../components/Modals/ManagebranchesM";

export default function ManageBranchesDetails() {
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
          <NavLink to="/manage/branches" className={`${st.backBtn}`}>
            <MdArrowBackIos className={`${st.icon}`} /> Back
          </NavLink>
          <div className={`${st.pageTitleRow}`}>
            <div className={`${st.rowTitleLeft}`}>
              <h5>فرع الاحساء</h5>
            </div>
            <div className={`${st.rowTitleRight}`}>
              <button
                className={`btn`}
                onClick={() => {
                  handleShow("copy settings", true);
                }}
              >
                <img src={copy} className={`${st.icon}`} />
                Copy Settings
              </button>
              <button
                className={`btn ${st.themeBtn}`}
                onClick={() => {
                  handleShow("edit branch", true);
                }}
              >
                Edit Items
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
                    <p>Alshaa Branch 01</p>
                  </Col>
                  <Col lg={6} className={`${cx.formField}`}>
                    <label>Name Localized</label>
                    <p>فرع الاحساء</p>
                  </Col>
                  <Col lg={6} className={`${cx.formField}`}>
                    <label>Reference</label>
                    <p>B01</p>
                  </Col>
                  <Col lg={6} className={`${cx.formField}`}>
                    <label>opening From</label>
                    <p>06:00</p>
                  </Col>
                  <Col lg={6} className={`${cx.formField}`}>
                    <label>Opening To </label>
                    <p>04:00</p>
                  </Col>
                  <Col lg={6} className={`${cx.formField}`}>
                    <label>Inventory End of Day</label>
                    <p>05:00</p>
                  </Col>

                  <Col lg={6} className={`${cx.formField}`}>
                    <label>Tax Group</label>
                    <p>15% tax group</p>
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
                      handleShow("branches detail add tags", true);
                    }}
                  >
                    + Add Tags
                  </button>
                </div>
              </div>
              <div className={`${cx.contentBox}`}>
                <div className={`p-4 text-center ${table.noData}`}>
                  No data to display
                </div>
              </div>
              <div className={`${cx.pageTitle}`}>
                <div className={`${cx.rowTitleLeft}`}>
                  <h5>Delivery Zones</h5>
                </div>
                <div className={`${cx.rowTitleRight}`}>
                  <button
                    className={`btn`}
                    onClick={() => {
                      handleShow("branches delevery zones", true);
                    }}
                  >
                    + Add Delivery Zones
                  </button>
                </div>
              </div>
              <div className={`${cx.contentBox}`}>
                <div className={`p-4 text-center ${table.noData}`}>
                  No data to display
                </div>
              </div>

              <div className={`${cx.pageTitle}`}>
                <div className={`${cx.rowTitleLeft}`}>
                  <h5>Users</h5>
                </div>
              </div>
              <div className={`${cx.contentBox}`}>
                <div className={`table-responsive`}>
                  <Table className={`${table.tableCt} ${cx.tableCt}`}>
                    <thead>
                      <tr>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Employee Number</th>
                        <th>Phone</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td>Eslam</td>
                        <td>eslam@bcs-sa.net</td>
                        <td>-</td>
                        <td>-</td>
                      </tr>
                      <tr>
                        <td>Eslam</td>
                        <td>eslam@bcs-sa.net</td>
                        <td>-</td>
                        <td>-</td>
                      </tr>
                      <tr>
                        <td>Eslam</td>
                        <td>eslam@bcs-sa.net</td>
                        <td>-</td>
                        <td>-</td>
                      </tr>
                      <tr>
                        <td>Eslam</td>
                        <td>eslam@bcs-sa.net</td>
                        <td>-</td>
                        <td>-</td>
                      </tr>
                      <tr>
                        <td>Eslam</td>
                        <td>eslam@bcs-sa.net</td>
                        <td>-</td>
                        <td>-</td>
                      </tr>
                    </tbody>
                  </Table>
                </div>
              </div>

              <div className={`${cx.pageTitle}`}>
                <div className={`${cx.rowTitleLeft}`}>
                  <h5>Section</h5>
                </div>
                <div className={`${cx.rowTitleRight}`}>
                  <button
                    className={`btn`}
                    onClick={() => {
                      handleShow("branches add Section", true);
                    }}
                  >
                    + Add Section
                  </button>
                </div>
              </div>
              <div className={`${cx.contentBox}`}>
                <div className={`table-responsive`}>
                  <Table className={`${table.tableCt} ${cx.tableCt}`}>
                    <thead>
                      <tr>
                        <th>Name</th>
                        <th>Table</th>
                        <th>Created</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td>الدور العلوي</td>
                        <td>10</td>
                        <td>June 10, 01:09pm</td>
                      </tr>

                      <tr>
                        <td>الدور العلوي</td>
                        <td>10</td>
                        <td>June 10, 01:09pm</td>
                      </tr>

                      <tr>
                        <td>الدور العلوي</td>
                        <td>10</td>
                        <td>June 10, 01:09pm</td>
                      </tr>

                      <tr>
                        <td>الدور العلوي</td>
                        <td>10</td>
                        <td>June 10, 01:09pm</td>
                      </tr>

                      <tr>
                        <td>الدور العلوي</td>
                        <td>10</td>
                        <td>June 10, 01:09pm</td>
                      </tr>
                    </tbody>
                  </Table>
                </div>
              </div>

              <div className={`${cx.pageTitle}`}>
                <div className={`${cx.rowTitleLeft}`}>
                  <h5>Assigned Device</h5>
                </div>
              </div>
              <div className={`${cx.contentBox}`}>
                <div className={`table-responsive`}>
                  <Table className={`${table.tableCt} ${cx.tableCt}`}>
                    <thead>
                      <tr>
                        <th>Name</th>
                        <th>Reference</th>
                        <th>Type</th>
                        <th>Status</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td>Riyadh Branch B01 K04</td>
                        <td>K04B01</td>
                        <td>KDS</td>
                        <td>
                          <button className={`${cx.usedBtn}`}> Used</button>
                        </td>
                      </tr>
                      <tr>
                        <td>Riyadh Branch B01 K04</td>
                        <td>K04B01</td>
                        <td>KDS</td>
                        <td>
                          <button className={`${cx.usedBtn}`}> Used</button>
                        </td>
                      </tr>
                      <tr>
                        <td>Riyadh Branch B01 K04</td>
                        <td>K04B01</td>
                        <td>KDS</td>
                        <td>
                          <button className={`${cx.usedBtn}`}> Used</button>
                        </td>
                      </tr>
                      <tr>
                        <td>Riyadh Branch B01 K04</td>
                        <td>K04B01</td>
                        <td>KDS</td>
                        <td>
                          <button className={`${cx.usedBtn}`}> Used</button>
                        </td>
                      </tr>
                      <tr>
                        <td>Riyadh Branch B01 K04</td>
                        <td>K04B01</td>
                        <td>KDS</td>
                        <td>
                          <button className={`${cx.notUsedBtn}`}>
                            Not Used
                          </button>
                        </td>
                      </tr>
                    </tbody>
                  </Table>
                </div>
              </div>

              <div className={`${cx.pageTitle}`}>
                <div className={`${cx.rowTitleLeft}`}>
                  <h5>Assigned Discounts</h5>
                </div>
              </div>
              <div className={`${cx.contentBox}`}>
                <div className={`table-responsive`}>
                  <Table className={`${table.tableCt} ${cx.tableCt}`}>
                    <thead>
                      <tr>
                        <th>Name</th>
                        <th>Value</th>
                        <th>Status</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td>Coupon 10%</td>
                        <td>10%</td>
                        <td>
                          <div className={` ${cx.statusbtn}`}>
                            <button>Dine In</button>
                            <button>Pick Up</button>
                            <button>Delivery</button>
                          </div>
                        </td>
                      </tr>

                      <tr>
                        <td>Coupon 10%</td>
                        <td>10%</td>
                        <td>
                          <div className={` ${cx.statusbtn}`}>
                            <button>Dine In</button>
                            <button>Pick Up</button>
                            <button>Delivery</button>
                          </div>
                        </td>
                      </tr>

                      <tr>
                        <td>Coupon 10%</td>
                        <td>10%</td>
                        <td>
                          <div className={` ${cx.statusbtn}`}>
                            <button>Dine In</button>
                            <button>Pick Up</button>
                            <button>Delivery</button>
                          </div>
                        </td>
                      </tr>

                      <tr>
                        <td>Coupon 10%</td>
                        <td>10%</td>
                        <td>
                          <div className={` ${cx.statusbtn}`}>
                            <button>Dine In</button>
                            <button>Pick Up</button>
                            <button>Delivery</button>
                          </div>
                        </td>
                      </tr>
                    </tbody>
                  </Table>
                </div>
              </div>

              <div className={`${cx.pageTitle}`}>
                <div className={`${cx.rowTitleLeft}`}>
                  <h5>Assigned Charges</h5>
                </div>
              </div>
              <div className={`${cx.contentBox}`}>
                <div className={`table-responsive`}>
                  <Table className={`${table.tableCt} ${cx.tableCt}`}>
                    <thead>
                      <tr>
                        <th>Name</th>
                        <th>Value</th>
                        <th>Applies On</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td>Pizza</td>
                        <td>SAR 10</td>
                        <td>
                          <div className={` ${cx.statusbtn}`}>
                            <button>Dine In</button>
                          </div>
                        </td>
                      </tr>
                    </tbody>
                  </Table>
                </div>
              </div>

              <div className={`${cx.pageTitle}`}>
                <div className={`${cx.rowTitleLeft}`}>
                  <h5>Assigned Timed Events</h5>
                </div>
              </div>
              <div className={`${cx.contentBox}`}>
                <div className={`table-responsive`}>
                  <Table className={`${table.tableCt} ${cx.tableCt}`}>
                    <thead>
                      <tr>
                        <th>Name</th>
                        <th>Type</th>
                        <th>Period</th>
                        <th>Active</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td>Developer Testing</td>
                        <td>Set Fixed Price</td>
                        <td>2021-01-11 - 2021-01-27</td>
                        <td>
                          <div>
                            <button className={` ${cx.notUsedBtn}`}>yes</button>
                          </div>
                        </td>
                      </tr>
                    </tbody>
                  </Table>
                </div>
              </div>

              <div className={`${cx.pageTitle}`}>
                <div className={`${cx.rowTitleLeft}`}>
                  <h5>Assigned Promotions</h5>
                </div>
              </div>
              <div className={`${cx.contentBox}`}>
                <div className={`p-4 text-center ${table.noData}`}>
                  NO Data To Display .
                </div>
              </div>

              <div className={`${cx.pageTitle}`}>
                <div className={`${cx.rowTitleLeft}`}>
                  <h5>Delete Branch Orders</h5>
                </div>
              </div>
              <div className={` ${cx.contentBox} ${cx.deleteBranchSec}`}>
                <div className={`p-4 text-center ${table.noData}`}>
                  If youIf you delete this branch orders, all the data will be
                  permanently deleted.
                </div>
                <div>
                  <button className={` ${cx.deleteBranchbtn}`}>
                    {" "}
                    Delete Orders{" "}
                  </button>
                </div>
              </div>
              <div className={`${cx.pageTitle}`}>
                <div className={`${cx.rowTitleLeft}`}>
                  <h5>Delete Branch Inventory Transaction</h5>
                </div>
              </div>
              <div className={` ${cx.contentBox} ${cx.deleteBranchSec}`}>
                <div className={`p-4 text-center ${table.noData}`}>
                  If you delete this branch inventory transactions, all the data
                  will be permanently deleted.
                </div>
                <div>
                  <button className={` ${cx.deleteBranchbtn}`}>
                    {" "}
                    Delete Transactions{" "}
                  </button>
                </div>
              </div>
              <div className={`${cx.pageTitle}`}>
                <div className={`${cx.rowTitleLeft}`}>
                  <h5>Delete Branch </h5>
                </div>
              </div>
              <div className={` ${cx.contentBox} ${cx.deleteBranchSec}`}>
                <div className={`p-4 text-center ${table.noData}`}>
                  If you delete this branch, all of its data will be permanently
                  deleted.
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

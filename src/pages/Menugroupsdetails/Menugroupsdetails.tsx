import React, { useCallback, useState } from "react";
import st from "../../style.module.scss";
import "bootstrap/dist/css/bootstrap.min.css";
import cx from "./Menugroupsdetails.module.scss";
import table from "../../datatable.module.scss";
import { Card, Button, Row, Table, Col, Modal, Form, Dropdown } from "react-bootstrap";
import icon4 from "../../images/icon-printer.svg";
import tableedit from "../../images/edit-images.png";
import { NavLink } from "react-router-dom";

import { MdArrowBackIos } from 'react-icons/md';
import Modals from "../../components/Modals/MenuGroupsM";



export default function Customerdetails() {

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
          <NavLink to="/menu/groups" className={`${st.backBtn}`}>
            <MdArrowBackIos className={`${st.icon}`} /> Back
          </NavLink>
          <div className={`${st.pageTitleRow}`}>
            <div className={`${st.rowTitleLeft}`}>
              <h5>جبن اصفر</h5>
            </div>
            <div className={`${st.rowTitleRight}`}>
              <NavLink to="/menu/groups/sort-group" className={`btn`} >
                <img src={icon4} className={`${st.icon}`} />
                  Sort Group
              </NavLink>
              <button className={`btn ${st.themeBtn}`} onClick={() => {
                handleShow("edit group", true);
              }}>
                Edit Group
              </button>
            </div>
          </div>
        </div>


        <div className={`${st.pageWrapperInside} ${st.setWidth}`}>
          <Card>
            <Card.Body className={`${cx.cardBody}`}>

              <div className={`${cx.pageTitle}`}>
                <div className={`${cx.rowTitleLeft}`}>
                  <h5>Combos</h5>
                </div>
                <div className={`${cx.rowTitleRight}`}>
                  <button className={`btn`} onClick={() => {
                    handleShow("add payment", true);
                  }}>
                   Edit Products
                  </button>
                </div>
              </div>
              <div className={`${cx.contentBox}`}>
                <div className={`table-responsive`}>
                  <Table className={`${table.tableCt} ${cx.tableCt}`}>
                    <thead>
                      <tr>
                        <th>Is active</th>
                        <th>Name</th>
                        <th>SKU</th>
                        <th></th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td>
                          <Form.Check 
                            type="switch"
                            id="custom-switch"
                          />
                        </td>
                        <td>ايسكريم ليمون - Lemon Ice Cream</td>
                        <td>sk-0570</td>
                        <td><img src={tableedit}/></td>
                      </tr>
                      <tr>
                        <td>
                          <Form.Check 
                            type="switch"
                            id="custom-switch"
                          />
                        </td>
                        <td>ايسكريم ليمون - Lemon Ice Cream</td>
                        <td>sk-0570</td>
                        <td><img src={tableedit}/></td>
                      </tr>
                      <tr>
                        <td>
                          <Form.Check 
                            type="switch"
                            id="custom-switch"
                          />
                        </td>
                        <td>ايسكريم ليمون - Lemon Ice Cream</td>
                        <td>sk-0570</td>
                        <td><img src={tableedit}/></td>
                      </tr>
                      <tr>
                        <td>
                          <Form.Check 
                            type="switch"
                            id="custom-switch"
                          />
                        </td>
                        <td>ايسكريم ليمون - Lemon Ice Cream</td>
                        <td>sk-0570</td>
                        <td><img src={tableedit}/></td>
                      </tr>
                    </tbody>
                  </Table>
                </div>
              </div>
              
              <div className={`${cx.pageTitle}`}>
                <div className={`${cx.rowTitleLeft}`}>
                  <h5>Combos</h5>
                </div>
                <div className={`${cx.rowTitleRight}`}>
                  <button className={`btn`} onClick={() => {
                    handleShow("add payment", true);
                  }}>
                   + Add Combos
                  </button>
                </div>
              </div>

              <div className={`${cx.contentBox}`}>
                <div className={`p-4 text-center ${table.noData}`}>
                  Add combos to this menu group to appear in the device assigned to this menu group.
                </div>
              </div>

              <div className={`${cx.pageTitle}`}>
                <div className={`${cx.rowTitleLeft}`}>
                  <h5>Gift Card Products</h5>
                </div>
                <div className={`${cx.rowTitleRight}`}>
                  <button className={`btn`} onClick={() => {
                    handleShow("add payment", true);
                  }}>
                   + Add Gift Card Products
                  </button>
                </div>
              </div>

              <div className={`${cx.contentBox}`}>
                <div className={`p-4 text-center ${table.noData}`}>
                  Add gift cards to this menu group to appear in the device assigned to this menu group.
                </div>
              </div>

              <div className={`${cx.pageTitle}`}>
                <div className={`${cx.rowTitleLeft}`}>
                  <h5>Subgroups</h5>
                </div>
                <div className={`${cx.rowTitleRight}`}>
                  <button className={`btn`} onClick={() => {
                    handleShow("add payment", true);
                  }}>
                   + Add Subgroups
                  </button>
                </div>
              </div>

              <div className={`${cx.contentBox}`}>
                <div className={`p-4 text-center ${table.noData}`}>
                Add other menu groups under this group to have a better organized hierarchical menu.
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

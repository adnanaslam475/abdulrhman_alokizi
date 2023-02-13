import React, { useCallback, useState, useEffect } from "react";
import st from "../../style.module.scss";
import "bootstrap/dist/css/bootstrap.min.css";
import cx from "./Menumodifieroptionsdetails.module.scss";
import table from "../../datatable.module.scss";
import { Card, Button, Row, Table, Col, Modal, Form, Dropdown } from "react-bootstrap";
import icon4 from "../../images/icon-printer.svg";
import cancel from "../../images/cancel.svg";
import { NavLink, useParams } from "react-router-dom";

import { MdArrowBackIos } from 'react-icons/md';
import Modals from "../../components/Modals/MenuModifierOptionsM";
import { useDispatch } from "react-redux";
import { parameter } from "../../redux_toolkit/reducer/menuProductsApiReducer";
import { modifierOptionDetails } from "../../redux_toolkit/reducer/modifierOptionApiReducer";



export default function Menumodifieroptionsdetails() {
  const dispatch = useDispatch();
  const param = useParams();
  const [show, setShow] = useState(false);
  const [modifierOptionSingleData, setModifierOptionSingleData] = useState<any>()
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

  useEffect(()=>{
    dispatch(modifierOptionDetails({modifieroption_id: param?.id}))
  },[])

  useEffect(()=>{

  },[])


  return (
    <>
      <section className={`${st.pageWrapper}`}>
        <div className={`${st.pageTitle}`}>
          <NavLink to="/menu/modifier-options" className={`${st.backBtn}`}>
            <MdArrowBackIos className={`${st.icon}`} /> Back
          </NavLink>
          <div className={`${st.pageTitleRow}`}>
            <div className={`${st.rowTitleLeft}`}>
              <h5>ايسكريم ليموجبن اصفر
                <NavLink to="#" className={`${cx.activeBtn}`}>
                  Active
                </NavLink>
              </h5>
              
            </div>
            <div className={`${st.rowTitleRight}`}>
              <button className={`btn`} >
                <img src={cancel} className={`${st.icon}`} />
                Deactive Option
              </button>
              <button className={`btn ${st.themeBtn}`} onClick={() => {
                handleShow("modifier edit option", true);
              }}>
                Edit option
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
                    <p>YELLOW CHEESE</p>
                  </Col>
                  <Col lg={6} className={`${cx.formField}`}>
                    <label>Name Localized</label>
                    <p>جبن اصفر</p>
                  </Col>
                  <Col lg={6} className={`${cx.formField}`}>
                    <label>Category</label>
                    <p>جبن</p>
                  </Col>
                  <Col lg={6} className={`${cx.formField}`}>
                    <label>SKU</label>
                    <p>MO_73429427</p>
                  </Col>
                  <Col lg={6} className={`${cx.formField}`}>
                    <label>Price</label>
                    <p>SAR 2</p>
                  </Col>
                  <Col lg={6} className={`${cx.formField}`}>
                    <label>Tax Group</label>
                    <p>All taxes group</p>
                  </Col>
                  <Col lg={6} className={`${cx.formField}`}>
                    <label>Costing method</label>
                    <p>From Ingredients</p>
                  </Col>
                  
                  <Col lg={6} className={`${cx.formField}`}>
                    <label>Ingredients Cost</label>
                    <p>SAR 0</p>
                  </Col>
                  <Col lg={6} className={`${cx.formField}`}>
                    <label>Calories</label>
                    <p>-</p>
                  </Col>
                </Row>
              </div>

              <div className={`${cx.pageTitle}`}>
                <div className={`${cx.rowTitleLeft}`}>
                  <h5>Ingredients</h5>
                </div>
                <div className={`${cx.rowTitleRight}`}>


                  <button className={`btn`} onClick={() => {
                    handleShow("", true);
                  }}>
                    + Add Ingredients
                  </button>
                </div>
              </div>
              <div className={`${cx.contentBox}`}>
                <div className={`p-4 text-center ${table.noData}`}>
                Add inventory items as ingredients to this modifier option to be consumed when it is sold.
                </div>
              </div>

              <div className={`${cx.pageTitle}`}>
                <div className={`${cx.rowTitleLeft}`}>
                  <h5>Custom Prices</h5>
                </div>
                <div className={`${cx.rowTitleRight}`}>


                  <button className={`btn`} onClick={() => {
                    handleShow("", true);
                  }}>
                   Select Branches
                  </button>
                </div>
              </div>
              <div className={`${cx.contentBox}`}>
                <div className={`p-4 text-center ${table.noData}`}>
                  Set a different price for this modifier option in the branches you select here.
                </div>
              </div>

              <div className={`${cx.pageTitle}`}>
                <div className={`${cx.rowTitleLeft}`}>
                  <h5>Inactive In Branches</h5>
                </div>
                <div className={`${cx.rowTitleRight}`}>


                  <button className={`btn`} onClick={() => {
                    handleShow("", true);
                  }}>
                   Select Branches
                  </button>
                </div>
              </div>
              <div className={`${cx.contentBox}`}>
                <div className={`p-4 text-center ${table.noData}`}>
                Deactivate this modifier option in the branches you select here to hide it from the menu.
                </div>
              </div>

              <div className={`${cx.pageTitle}`}>
                <div className={`${cx.rowTitleLeft}`}>
                  <h5>Out Of Stock</h5>
                </div>
                <div className={`${cx.rowTitleRight}`}>


                  <button className={`btn`} onClick={() => {
                    handleShow("", true);
                  }}>
                   Select Branches
                  </button>
                </div>
              </div>
              <div className={`${cx.contentBox}`}>
                <div className={`p-4 text-center ${table.noData}`}>
                  Set this modifier option as Out of Stock in the branches you select here, the Cashier can still sell Out of Stock options.
                </div>
              </div>

              <div className={`${cx.pageTitle}`}>
                <div className={`${cx.rowTitleLeft}`}>
                  <h5>Applies on Price Tag</h5>
                </div>
                <div className={`${cx.rowTitleRight}`}>


                  <button className={`btn`} onClick={() => {
                    handleShow("", true);
                  }}>
                   + Add Price Tags
                  </button>
                </div>
              </div>
              <div className={`${cx.contentBox}`}>
                <div className={`p-4 text-center ${table.noData}`}>
                  No data to display!
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

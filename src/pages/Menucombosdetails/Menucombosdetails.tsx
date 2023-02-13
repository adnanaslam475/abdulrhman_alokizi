import React, { useCallback, useState, useEffect } from "react";
import st from "../../style.module.scss";
import "bootstrap/dist/css/bootstrap.min.css";
import cx from "./Menucombosdetails.module.scss";
import table from "../../datatable.module.scss";
import { Card, Button, Row, Table, Col, Modal, Form, Dropdown } from "react-bootstrap";
import icon4 from "../../images/icon-printer.svg";
import cancel from "../../images/cancel.svg";
import { NavLink, useParams } from "react-router-dom";

import { MdArrowBackIos } from 'react-icons/md';
import Modals from "../../components/Modals/MenuCombosM";
import { activeCombo, addGroup, comboView, comboViewPerId, getGroup, groupList } from "../../redux_toolkit/reducer/menuComboApiReducer";
import { useDispatch, useSelector } from "react-redux";



export default function Menucombosdetails() {
  const comboViewCount = useSelector((state:any)=>state.menuComboApiReducer.comboViewCount)
  const addSizeCount = useSelector((state:any)=>state.menuComboApiReducer.addSizeCount)
  const activeComboCount = useSelector((state:any)=>state.menuComboApiReducer.activeComboCount)
  const addGroupCount = useSelector((state:any)=>state.menuComboApiReducer.addGroupCount)
  const getGroupCount = useSelector((state:any)=>state.menuComboApiReducer.getGroupCount)
  const param = useParams();
  const dispatch = useDispatch();
  const [show, setShow] = useState(false);
  const [modalName, setModalName] = useState("");
  const [comboDetail, setComboDetail] = useState<any>()
  const [comboSize, setComboSize] = useState<any>()
  const [groupData, setGroupData] = useState<any>([])
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
    setComboDetail(comboViewPerId?.data)
    setComboSize(comboViewPerId?.combosizes)
    console.log(comboViewPerId,"comboViewPerId")
  },[comboViewCount])

  useEffect(()=>{
    dispatch(comboView({comboid:param?.id}))
    dispatch(getGroup({combo_id:param?.id}))
  },[addSizeCount, activeComboCount])

  useEffect(()=>{
    dispatch(getGroup({combo_id:param?.id}))
  },[addGroupCount])

  useEffect(()=>{
    setGroupData(groupList)
  },[getGroupCount])

  return (
    <>
      <section className={`${st.pageWrapper}`}>
        <div className={`${st.pageTitle}`}>
          <NavLink to="/menu/combos" className={`${st.backBtn}`}>
            <MdArrowBackIos className={`${st.icon}`} /> Back
          </NavLink>
          <div className={`${st.pageTitleRow}`}>
            <div className={`${st.rowTitleLeft}`}>
              <h5>{comboDetail?.english_name}
                <NavLink to="#" className={`${cx.activeBtn}`}>
                {comboDetail?.combo_status}
                </NavLink>
              </h5>
              
            </div>
            <div className={`${st.rowTitleRight}`}>
              <button className={`btn`} onClick={()=>{
                dispatch(activeCombo({combo_id:param?.id,status:comboDetail?.combo_status==="active" ? "deactive" : "activate"}))
              }}>
                <img src={cancel} className={`${st.icon}`} />
                  {comboDetail?.combo_status==="active" ? "Deactive" : "Active"} Combo
              </button>
              <button className={`btn ${st.themeBtn}`} onClick={() => {
                handleShow("edit combos", true);
              }}>
                Edit Combo
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
                    <p>{comboDetail?.english_name}</p>
                  </Col>
                  <Col lg={6} className={`${cx.formField}`}>
                    <label>Name Localized</label>
                    <p>{comboDetail?.arabic_name}</p>
                  </Col>
                  <Col lg={6} className={`${cx.formField}`}>
                    <label>Category</label>
                    <p>{comboDetail?.categoryname}</p>
                  </Col>
                  <Col lg={6} className={`${cx.formField}`}>
                    <label>SKU</label>
                    <p>{comboDetail?.sku}</p>
                  </Col>
                  <Col lg={6} className={`${cx.formField}`}>
                    <label>Barcode</label>
                    <p>{comboDetail?.bar_code}</p>
                  </Col>
                </Row>
              </div>

              <div className={`${cx.pageTitle}`}>
                <div className={`${cx.rowTitleLeft}`}>
                  <h5>Products</h5>
                </div>
                <div className={`${cx.rowTitleRight}`}>


                  <button className={`btn`} onClick={() => {
                    handleShow("add size popup", true);
                  }}>
                    + Add Size
                  </button>
                </div>
              </div>
              <div className={`${cx.contentBox} ${cx.dobuleBox}`}>
                <div className={`${cx.tableTopValue}`}>
                  {
                    comboSize?.map((item:any)=>{
                      return (
                        <>
                         <div className={`p-4 ${table.noData} ${cx.rightData}`}>
                    {item?.name}
                  </div>
                        </>
                      )
                    })
                  }
                </div>

                {
                  groupData?.map((item:any)=>{
                    return (
                      <>
                      <div className={`${cx.tableAnder}`}>
                  <button className={` ${cx.groupName}`} onClick={() => {
                      handleShow("group edit popup", true);
                    }}>
                    Group {item?.groupname}
                  </button>
                  <button className={` ${cx.addOption}`} onClick={() => {
                      handleShow("add option popup", true);
                    }}>
                    Add Option
                  </button>
                </div>
                      </>
                    )
                  })
                }
                <div className={`p-4 ${table.noData} ${cx.leftData}`}>
                  <NavLink to="#" onClick={()=>  dispatch(addGroup({combo_id:param?.id}))}>
                    Add Group
                  </NavLink>
                </div>
              </div>
{/* 
              <div className={`${cx.pageTitle}`}>
                <div className={`${cx.rowTitleLeft}`}>
                  <h5>Modifiers</h5>
                </div>
                <div className={`${cx.rowTitleRight}`}>


                  <button className={`btn`} onClick={() => {
                    handleShow("", true);
                  }}>
                    + Add Modifiers
                  </button>
                </div>
              </div>
              <div className={`${cx.contentBox}`}>
                <div className={`p-4 text-center ${table.noData}`}>
                Add modifiers to this product and configure the minimum and maximum number of allowed modifiers, and more.
                </div>
              </div> */}

              <div className={`${cx.pageTitle}`}>
                <div className={`${cx.rowTitleLeft}`}>
                  <h5>Custom Prices</h5>
                </div>
                <div className={`${cx.rowTitleRight}`}>


                  <button className={`btn`} onClick={() => {
                    handleShow("select branch popup", true);
                  }}>
                    + Add Branch
                  </button>
                </div>
              </div>
              <div className={`${cx.contentBox}`}>
                <div className={`p-4 text-center ${table.noData}`}>
                Set a different price for this combo's options in the branches you select here. Tags
                </div>
              </div>

              <div className={`${cx.pageTitle}`}>
                <div className={`${cx.rowTitleLeft}`}>
                  <h5>Tags</h5>
                </div>
                <div className={`${cx.rowTitleRight}`}>


                  <button className={`btn`} onClick={() => {
                    handleShow("edit tags popup", true);
                  }}>
                    + Add Tags
                  </button>
                </div>
              </div>
              <div className={`${cx.contentBox}`}>
                <div className={`p-4 text-center ${table.noData}`}>
                Add tags to help you filter and group combos easily. You can create tags such as Without Drinks, No Upsize, etc.
                </div>
              </div>

              <div className={`${cx.pageTitle}`}>
                <div className={`${cx.rowTitleLeft}`}>
                  <h5>Inactive In Branches</h5>
                </div>
                <div className={`${cx.rowTitleRight}`}>


                  <button className={`btn`} onClick={() => {
                    handleShow("inactive select branches popup", true);
                  }}>
                    Select Branches
                  </button>
                </div>
              </div>
              <div className={`${cx.contentBox}`}>
                <div className={`p-4 text-center ${table.noData}`}>
                  Deactivate this combo in the branches you select here to hide it from the menu.
                </div>
              </div>

              <div className={`${cx.pageTitle}`}>
                <div className={`${cx.rowTitleLeft}`}>
                  <h5>Groups</h5>
                </div>
              </div>
              <div className={`${cx.contentBox}`}>
                <div className={`p-4 text-center ${table.noData}`}>
                Add this combo to menu groups (go to Menu Groups) to design your menu and control which devices this combo can be sold from.
                </div>
              </div>

              <div className={`${cx.pageTitle}`}>
                <div className={`${cx.rowTitleLeft}`}>
                  <h5>Timed Events</h5>
                </div>
              </div>
              <div className={`${cx.contentBox}`}>
                <div className={`p-4 text-center ${table.noData}`}>
                  Here you'll see if this product is assigned to any timed events.
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

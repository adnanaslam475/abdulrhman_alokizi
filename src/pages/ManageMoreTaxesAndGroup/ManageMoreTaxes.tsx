import React, { useCallback, useEffect, useState } from "react";
import st from "../../style.module.scss";
import "bootstrap/dist/css/bootstrap.min.css";
import cx from "./ManageMoreTaxes.module.scss";

import { MdArrowBackIos } from "react-icons/md";
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

import Modals from "../../components/Modals/ManageMoreTaxesM";
import { NavLink } from "react-router-dom";

import { ActionDropdown } from "./Dropdowns";
import { useDispatch, useSelector } from "react-redux";
import { editGroupTaxFunc, editTaxFunc, groupAndTaxList, groupAndTaxListItems, taxDetails, taxList, taxListItems } from "../../redux_toolkit/reducer/manageTaxGroupApiReducer";

export default function ManageMoreTaxes() {
  const taxListState = useSelector((state:any)=>state.manageTaxGroupApiReducer)
  const dispatch = useDispatch();
  const [show, setShow] = useState(false);
  const [modalName, setModalName] = useState("");
  const [taxListData, setTaxListData] = useState<any>()
  const [groupAndTaxListData, setGroupAndTaxListData] = useState<any>()
  const handleShow = (modalname: string, status: boolean) => {
    setModalName(modalname);
    setShow(status);
  };
  const handleClose = () => {
    setModalName("");
    setShow(false);
  };

  useEffect(()=>{
     dispatch(taxList())
  },[taxListState.addTaxesCount,taxListState.deleteTaxesCount])

  useEffect(()=>{
    dispatch(groupAndTaxList())
 },[taxListState.addGroupAndTaxesCount, taxListState.deleteGroupAndTaxesCount])

  useEffect(()=>{
    setTaxListData(taxListItems)
  },[taxListState.taxListCount])

  useEffect(()=>{
    setGroupAndTaxListData(groupAndTaxListItems)
  },[taxListState.groupAndTaxListCount])

  return (
    <>
      <section className={`${st.pageWrapper}`}>
        <div className={`${st.pageTitle}`}>
        <NavLink to="/manage/manage-more" className={`${st.backBtn}`}>
            <MdArrowBackIos className={`${st.icon}`} /> Back
          </NavLink>
          <div className={`${st.pageTitleRow}`}>
            <div className={`${st.rowTitleLeft}`}>
              <h5>Taxes & Groups</h5>
            </div>
          </div>
        </div>

        <div className={`${st.pageWrapperInside}`}>
          <Card>
            <Card.Body className={`${cx.cardBody}`}>
              <div className={`${cx.pageTitle}`}>
                <div className={`${cx.rowTitleLeft}`}>
                  <h5>Taxes</h5>
                </div>
                <div className={`${cx.rowTitleRight}`}>
                  <button
                    className={`${cx.themtaxbtn}`}
                    onClick={() => {
                      handleShow("Create Tax", true);
                    }}
                  >
                    Create Tax
                  </button>
                </div>
              </div>

              <Row>
                {
                  taxListData?.map((item:any,index:number)=>{
                      return (
                        <Col lg={3}>
                  <div
                    className={`${cx.moreOption}`}
                    onClick={() => {
                      let data = {
                        name: item?.name,
                        name_localized:item?.name_localized,
                        rate:item?.rate,
                        applies_on:item?.applies_on,
                        id:item?.id
                      }
                      dispatch(editTaxFunc(data))
                      handleShow("Edit Tax", true);
                    }}
                  >
                    <div>
                      <div>{item?.name}</div>
                      <div>
                        {" "}
                        <small>{item?.rate}%</small>
                      </div>
                    </div>
                  </div>
                </Col>
                      )
                  })
                }
                
              </Row>

              
              <div className={`${cx.pageTitle}`}>
                <div className={`${cx.rowTitleLeft}`}>
                  <h5>Tax Groups</h5>
                </div>
                <div className={`${cx.rowTitleRight}`}>
                  <button
                     className={`${cx.themtaxbtn}`}
                    onClick={() => {
                      handleShow("Create Tax group", true);
                    }}
                  >
                    Create Tax Group
                  </button>
                </div>
              </div>

              <Row>
              {
                  groupAndTaxListData?.map((item:any,index:number)=>{
                      return (
                        <Col lg={3}>
                        <div
                          className={`${cx.moreOption}`}
                        >
                          <div
                            className={`${cx.usermore}`}
                            onClick={() => {
                              let data = {
                                name:item?.group_name,
                                group_local_name:item?.group_local_name,
                                reference:item.reference,
                                tax_id:item?.tax_id,
                                id:item?.id
                              }
                              dispatch(taxDetails(item?.tex_detail))
                              dispatch(editGroupTaxFunc(data))
                              handleShow("Edit Tax group", true);
                            }}
                          >
                            <div>{item?.group_local_name}</div>
                            <div className={`${cx.editRole}`}>{item.reference}%</div>
                          </div>
      
                          <div className={`${st.moreroles}`}>
                            <ActionDropdown />
                          </div>
                        </div>
                      </Col>
                      )
                  })
                }
                
              </Row>
            </Card.Body>
          </Card>
        </div>
      </section>

      <Modals show={show} handleClose={handleClose} modalName={modalName} />
    </>
  );
}

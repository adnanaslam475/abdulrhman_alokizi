import React, { useCallback, useEffect, useState } from "react";
import st from "../../style.module.scss";
import "bootstrap/dist/css/bootstrap.min.css";
import cx from "./ManageMoreCharges.module.scss";
import table from "../../datatable.module.scss";

import { MdArrowBackIos } from "react-icons/md";

import { NavLink } from "react-router-dom";
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

import Modals from "../../components/Modals/ManageMoreChargesM";
import { branchesFunc, chargesFilter, chargesList, chargesListItems, editChargesFunc } from "../../redux_toolkit/reducer/manageMoreChargesApiReducer";
import { useDispatch, useSelector } from "react-redux";
import { groupAndTaxList } from "../../redux_toolkit/reducer/manageTaxGroupApiReducer";
import { userBranchFilterValue, userBranchList } from "../../redux_toolkit/reducer/manageBranchApiReducer";

export default function ManageMoreCharges() {
  const chargeState = useSelector((state:any)=>state.manageMoreChargesApiReducer)
  const dispatch = useDispatch();
  const [show, setShow] = useState(false);
  const [modalName, setModalName] = useState("");
  const [chargeData, setChargeData] = useState<any>();
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
    const data = JSON.parse(localStorage.getItem("___data")!)
    chargesFilter.restaurent_id=data?.restaurant_id
    chargesFilter.type = "all"
    dispatch(chargesList())
  },[chargeState.addChargesCount])

  useEffect(()=>{
    dispatch(groupAndTaxList());
    userBranchFilterValue.type = "all";
    dispatch(userBranchList(userBranchFilterValue));
  },[])

  useEffect(()=>{
    console.log(chargesListItems,"chargesListItems")
    setChargeData(chargesListItems)
  },[chargeState.chargesListCount])

  return (
    <>
      <section className={`${st.pageWrapper}`}>
        <div className={`${st.pageTitle}`}>
        <NavLink to="/manage/manage-more" className={`${st.backBtn}`}>
            <MdArrowBackIos className={`${st.icon}`} /> Back
          </NavLink>
          <div className={`${st.pageTitleRow}`}>
            <div className={`${st.rowTitleLeft}`}>
              <h5>charges</h5>
            </div>
            <div className={`${st.rowTitleRight}`}>
              <button
                className={`btn ${st.themeBtn}`}
                onClick={() => {
                  handleShow("Create charges", true);
                }}
              >
                Create Charges
              </button>
            </div>
          </div>
        </div>

        <div className={`${st.pageWrapperInside}`}>
          <Card>
            <Card.Body className={`${cx.cardBody}`}>
              <Row>
                {
                  chargeData?.map((item:any,index:number)=>{
                    console.log(item,"itemCharges")
                    return(
                      <Col lg={3}>
                      <div className={`${cx.moreOption}`}  onClick={() => {
                            let data = {
                              id:item?.id,
                              name: item?.name,
                              localname: item?.localname,
                              isopenvalue: item?.isopenvalue,
                              type: item?.type,
                              value: item?.value,
                              applyon_ordertype: item?.applyon_ordertype,
                              taxgroup: item?.taxgroup,
                              applyon_branches: item?.applyon_branches,
                              applyon_order: item?.applyon_order,
                              applyon_ordersubtotal: item?.applyon_ordersubtotal
                            }
                            console.log(item?.branches,"item?.branches")
                            dispatch(editChargesFunc(data))
                            dispatch(branchesFunc(item?.branches))
                            handleShow("Edit charges", true);
                          }}>
                        <div
                          className={`${cx.usermore}`}
                         
                        >
                          <div>{item?.name}</div>
                          <div className={`${cx.editRole}`}>SAR {item?.value}</div>
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

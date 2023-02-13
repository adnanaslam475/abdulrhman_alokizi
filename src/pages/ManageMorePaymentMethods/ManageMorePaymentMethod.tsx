import React, { useCallback, useEffect, useState } from "react";
import st from "../../style.module.scss";
import "bootstrap/dist/css/bootstrap.min.css";
import cx from "./ManageMorePaymentMethod.module.scss";

import category from "../../images/category.svg";

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

import Modals from "../../components/Modals/ManageMorePaymentMethodM";
import { NavLink } from "react-router-dom";
import { editPaymentFunc, paymentFilter, paymentList, paymentListItems } from "../../redux_toolkit/reducer/manageMorePaymentApiReducer";
import { useDispatch, useSelector } from "react-redux";

export default function ManageMorePaymentMethod() {
  const paymentState = useSelector((state:any)=>state.manageMorePaymentApiReducer)
  const dispatch = useDispatch();
  const [show, setShow] = useState(false);
  const [modalName, setModalName] = useState("");
  const [paymentData, setPaymentData] = useState<any>()
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
    paymentFilter.type = "all"
    dispatch(paymentList(paymentFilter))
  },[paymentState.addPaymentCount, paymentState.deletePaymentCount])

  useEffect(()=>{
     setPaymentData(paymentListItems)
     console.log(paymentListItems,"listItems")
  },[paymentState.paymentListCount])
  return (
    <>
      <section className={`${st.pageWrapper}`}>
        <div className={`${st.pageTitle}`}>
          <NavLink to="/manage/manage-more" className={`${st.backBtn}`}>
            <MdArrowBackIos className={`${st.icon}`} /> Back
          </NavLink>
          <div className={`${st.pageTitleRow}`}>
            <div className={`${st.rowTitleLeft}`}>
              <h5>Payment Methods</h5>
            </div>
            <div className={`${st.rowTitleRight}`}>
              <button
                className={`btn `}
                onClick={() => {
                  handleShow("sort payment Method", true);
                }}
              >
                <img src={category} className={`${st.icon}`} />
                Sort Payment Methods
              </button>
              <button
                className={`btn ${st.themeBtn}`}
                onClick={() => {
                  handleShow("add payment method", true);
                }}
              >
                Add Payment Methods 
              </button>
            </div>
          </div>
        </div>

        <div className={`${st.pageWrapperInside}`}>
          <Card>
            <Card.Body className={`${cx.cardBody}`}>
              <Row>
                {
                  paymentData?.map((item:any)=>{
                    return (
                      <Col lg={3}
                    className={`${cx.navnewpage}`}
                  >
                    <div className={`${cx.moreOption}`} 
                    onClick={() => {
                      let data = {
                        id:item?.id,
                        name:item?.name,
                        name_localized:item?.name_localized,
                        activestatus: item?.active,
                        open_cash_drawer:item?.open_cash_drawer,
                        code:item?.code
                      }
                      dispatch(editPaymentFunc(data))
                        handleShow("Edit Payment Method", true);
                      }}
                    
                    >
                      <div className={`${cx.usermore}`}>
                        <div>{item?.name}</div>
                      </div>

                      <div className={`${cx.editRole}`}>
                        <div>{item?.name_localized}</div>
                        <div>
                          <button className={`${cx.notUsedBtn}`}> {item?.active} </button>
                        </div>
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

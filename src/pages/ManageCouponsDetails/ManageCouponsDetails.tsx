import React, { useCallback, useState, useEffect } from "react";
import st from "../../style.module.scss";
import "bootstrap/dist/css/bootstrap.min.css";
import cx from "./ManageCouponsDetails.module.scss";
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
import cancel from "../../images/cancel.svg";
import { NavLink, useParams } from "react-router-dom";

import { MdArrowBackIos } from "react-icons/md";
import Modals from "../../components/Modals/ManageCouponsM";
import { couponView, deactivateCoupon, singleCouponDetails } from "../../redux_toolkit/reducer/manageCouponApiReducer";
import { useDispatch, useSelector } from "react-redux";

export default function ManageCouponsDetails() {
  const param = useParams();
  const dispatch = useDispatch();
  const [show, setShow] = useState(false);
  const [modalName, setModalName] = useState("");
  const [couponDetails, setCouponDetails] = useState<any>()
  const singleCouponCount = useSelector(
    (state: any) => state.manageCouponApiReducer.singleCouponCount
  );
  const deactivateCouponCount = useSelector(
    (state: any) => state.manageCouponApiReducer.deactivateCouponCount
  );
  const editCouponCount = useSelector(
    (state: any) => state.manageCouponApiReducer.editCouponCount
  );
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
    if(singleCouponDetails!==undefined)
    setCouponDetails(singleCouponDetails[0])
  },[singleCouponCount])

  useEffect(()=>{
    dispatch(couponView(param?.id))
  },[deactivateCouponCount, editCouponCount])

  return (
    <>
      <section className={`${st.pageWrapper}`}>
        <div className={`${st.pageTitle}`}>
          <NavLink to="/manage/coupons" className={`${st.backBtn}`}>
            <MdArrowBackIos className={`${st.icon}`} /> Back
          </NavLink>
          <div className={`${st.pageTitleRow}`}>
            <div className={`${st.rowTitleLeft}`}>
              <h5>{couponDetails?.name}</h5>
            </div>
            <div className={`${st.rowTitleRight}`}>
              
              <button className={`btn`}  
              onClick={() => {
                handleShow("Deactive Coupon", true);
                dispatch(deactivateCoupon({id:param?.id}))
              }}
              >
                <img src={cancel} className={`${st.icon}`} />
                {couponDetails?.coupan_status === "deactive" ? "Active" : "Deactivate"} Coupon
              </button>
              <button
                className={`btn ${st.themeBtn}`}
                onClick={() => {
                  handleShow("edit Coupons", true);
                }}
              >
                Edit Coupon
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
                    <p>{couponDetails?.name}</p>
                  </Col>
                  <Col lg={6} className={`${cx.formField}`}>
                    <label>Code </label>
                    <p>{couponDetails?.code}</p>
                  </Col>
                  <Col lg={6} className={`${cx.formField}`}>
                    <label>Discount </label>
                    <p>{couponDetails?.discount}</p>
                  </Col>
                  <Col lg={6} className={`${cx.formField}`}>
                    <label>Date </label>
                    <p>{couponDetails?.valid_from} - {couponDetails?.valid_to}</p>
                  </Col>
                  <Col lg={6} className={`${cx.formField}`}>
                    <label>Time</label>
                    <p>{couponDetails?.starttime} - {couponDetails?.endtime}</p>
                  </Col>
                  <Col lg={6} className={`${cx.formField}`}>
                    <label>Maximum User </label>
                    <p>{couponDetails?.maximum_usages} </p>
                  </Col>

                  <Col lg={6} className={`${cx.formField}`}>
                    <label>Total Usage</label>
                    <p>{couponDetails?.value}</p>
                  </Col>
                </Row>
              </div>

            </Card.Body>
          </Card>
        </div>
      </section>

      <Modals show={show} handleClose={handleClose} modalName={modalName} />
    </>
  );
}

import React, { useCallback, useEffect, useState } from "react";
import st from "../../style.module.scss";
import "bootstrap/dist/css/bootstrap.min.css";
import cx from "./ManageDiscounts.module.scss";
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
import { NavLink } from "react-router-dom";

import { MdArrowBackIos } from "react-icons/md";

import Modals from "../../components/Modals/ManageDiscountsM";
import { discountFilterValue, discountList, discountListItems } from "../../redux_toolkit/reducer/manageDiscountApiReducer";
import { useDispatch, useSelector } from "react-redux";

export default function ManageDiscounts() {
  const dispatch = useDispatch();
  const discountListCount:any = useSelector((state:any)=>state.manageDiscountApiReducer.discountListCount)
  const deleteDiscountCount:any = useSelector((state:any)=>state.manageDiscountApiReducer.deleteDiscountCount)
  const [show, setShow] = useState(false);
  const [modalName, setModalName] = useState("");
  const [discountData, setDiscountData] = useState<any[]>([])
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
    discountFilterValue.type = "all";
    dispatch(discountList(discountFilterValue));
  },[deleteDiscountCount])

  useEffect(()=>{
    setDiscountData(discountListItems)
  },[discountListCount])

  return (
    <>
      <section className={`${st.pageWrapper}`}>
        <div className={`${st.pageTitle}`}>
          <div className={`${st.pageTitleRow}`}>
            <div className={`${st.rowTitleLeft}`}>
              <h5>Discount</h5>
            </div>
            <div className={`${st.rowTitleRight}`}>
              <button
                className={`btn ${st.themeBtn}`}
                onClick={() => {
                  handleShow("Create discount", true);
                }}
              >
                Create Discount 
              </button>
            </div>
          </div>
        </div>

        <div className={`${st.pageWrapperInside}`}>
          <Card>
            <Card.Body className={`${cx.cardBody}`}>
            <Row>
                  {
                    discountData?.map((item:any,num:number)=>{
                    return <Col lg={3}>
                    <NavLink to={`/manage/discounts/manage-discount/${item?.id}`} className={`${cx.moreOption}`}>
                    <div className={`${cx.discountmore}`} >
                      <div>{item?.english_name}</div>
                      <div className={`${cx.discountmoreper}`}> {item?.discount_type == "Fixed" ? item?.amount : `${item?.amount}%`} </div>
                    </div>
                  </NavLink>
                  </Col>


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
